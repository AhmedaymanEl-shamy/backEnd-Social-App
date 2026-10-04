// main function for the app
import express from "express";
import type { Request, Response, NextFunction } from "express";
import { authRoute, commentRoute, postRoute, friendRoute, userRoute, chatRoute, messageRoute, notificationRoute } from "./modules";
import { BadRequestException, NotFoundException } from "./common";
import { connctDB } from "./DB/connection";
import { redisConnect } from "./DB/redis.connect";
import { s3CloudProvider } from "./common/cloud/s3/init";
import { pipeline } from "node:stream";
import { promisify } from "node:util";
import { firebasePushNotificationProvider } from "./common/notification/firebase/init";
import cors from "cors";
import { createHandler } from "graphql-http/lib/use/express";
import { GraphQLObjectType, GraphQLSchema, GraphQLError } from "graphql";
import { userGQLQuery } from "./modules/user/graphql/user.query";
import { postQuery } from "./modules/post/graphql/post.query";
import { postMutation } from "./modules/post/graphql/post.mutation";
import { commentQuery } from "./modules/comment/graphql/comment.query";
import { commentMutation } from "./modules/comment/graphql/comment.mutation";
import { friendRequestQuery } from "./modules/friend/graphql/friend-request.query";
const pipelinePromise = promisify(pipeline);

export function bootstrap() {
    const app = express();
    const port = 3000;
    app.use('/uploads/*paths', async (req: Request, res: Response, next: NextFunction) => {
        let key = (req.params.paths as string[]).join('/')
        const fileExist = await s3CloudProvider.getFile(key)
        if (!fileExist) {
            throw new NotFoundException('File doesn\'t exist');
        }
        await pipelinePromise(fileExist, res);
    })
    connctDB()
    redisConnect()
    app.use(cors({ origin: "*" }))
    app.use(express.json());
    //test send-notification
    app.post('/send-notification', async (req: Request, res: Response, next: NextFunction) => {
        let fcmToken = req.body.token;
        console.log({ fcmToken });
        await firebasePushNotificationProvider.send(fcmToken, {
            title: "Hello, World",
            body: "this is the test notification"
        })
        res.sendStatus(204)
    })
    // routing app
    const rootQuery = new GraphQLObjectType({
        name: "RootQuery",
        fields: {
            ...userGQLQuery,
            ...postQuery,
            ...commentQuery,
            ...friendRequestQuery
        }
    });

    const rootMutation = new GraphQLObjectType({
        name: "RootMutation",
        fields: {
            ...postMutation,
            ...commentMutation
        }
    });

    const schema = new GraphQLSchema({
        query: rootQuery,
        mutation: rootMutation
    });

    app.all("/graphql", createHandler({
        schema,
        context: async (request: any) => {
            const auth = request.headers.authorization;
            let userId = null;
            if (auth && auth.startsWith("Bearer ")) {
                try {
                    const token = auth.split(" ")[1];
                    const { verifyToken } = await import("./common/utils/jwt.utils");
                    const payload = verifyToken(token) as { id: string, role: number };
                    userId = payload.id;
                } catch (err) {

                }
            }
            return { headers: request.headers, userId };
        },
        formatError: (error: unknown) => {
            const err = error as Error & { cause?: number };
            return { message: err.message, success: false, statuscode: err.cause || 500 } as unknown as GraphQLError;
        }
    }));

    app.use("/api/auth", authRoute)
    app.use("/post", postRoute)
    app.use("/comment", commentRoute)
    app.use("/friend", friendRoute)
    app.use("/user", userRoute)
    app.use("/chat", chatRoute)
    app.use("/message", messageRoute)
    app.use("/notification", notificationRoute)

    //global error handler
    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
        return res.status(error.cause as number || 500).json({
            message: error.message,
            success: false,
            details: error instanceof BadRequestException ? error.details : undefined
        });
    })


    app.listen(port, () => {
        console.log("App is running at port " + port);
    });
}
