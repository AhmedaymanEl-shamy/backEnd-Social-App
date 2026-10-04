"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = bootstrap;
// main function for the app
const express_1 = __importDefault(require("express"));
const modules_1 = require("./modules");
const common_1 = require("./common");
const connection_1 = require("./DB/connection");
const redis_connect_1 = require("./DB/redis.connect");
const init_1 = require("./common/cloud/s3/init");
const node_stream_1 = require("node:stream");
const node_util_1 = require("node:util");
const init_2 = require("./common/notification/firebase/init");
const cors_1 = __importDefault(require("cors"));
const express_2 = require("graphql-http/lib/use/express");
const graphql_1 = require("graphql");
const user_query_1 = require("./modules/user/graphql/user.query");
const post_query_1 = require("./modules/post/graphql/post.query");
const post_mutation_1 = require("./modules/post/graphql/post.mutation");
const comment_query_1 = require("./modules/comment/graphql/comment.query");
const comment_mutation_1 = require("./modules/comment/graphql/comment.mutation");
const friend_request_query_1 = require("./modules/friend/graphql/friend-request.query");
const pipelinePromise = (0, node_util_1.promisify)(node_stream_1.pipeline);
function bootstrap() {
    const app = (0, express_1.default)();
    const port = 3000;
    app.use('/uploads/*paths', async (req, res, next) => {
        let key = req.params.paths.join('/');
        const fileExist = await init_1.s3CloudProvider.getFile(key);
        if (!fileExist) {
            throw new common_1.NotFoundException('File doesn\'t exist');
        }
        await pipelinePromise(fileExist, res);
    });
    (0, connection_1.connctDB)();
    (0, redis_connect_1.redisConnect)();
    app.use((0, cors_1.default)({ origin: "*" }));
    app.use(express_1.default.json());
    //test send-notification
    app.post('/send-notification', async (req, res, next) => {
        let fcmToken = req.body.token;
        console.log({ fcmToken });
        await init_2.firebasePushNotificationProvider.send(fcmToken, {
            title: "Hello, World",
            body: "this is the test notification"
        });
        res.sendStatus(204);
    });
    // routing app
    const rootQuery = new graphql_1.GraphQLObjectType({
        name: "RootQuery",
        fields: {
            ...user_query_1.userGQLQuery,
            ...post_query_1.postQuery,
            ...comment_query_1.commentQuery,
            ...friend_request_query_1.friendRequestQuery
        }
    });
    const rootMutation = new graphql_1.GraphQLObjectType({
        name: "RootMutation",
        fields: {
            ...post_mutation_1.postMutation,
            ...comment_mutation_1.commentMutation
        }
    });
    const schema = new graphql_1.GraphQLSchema({
        query: rootQuery,
        mutation: rootMutation
    });
    app.all("/graphql", (0, express_2.createHandler)({
        schema,
        context: async (request) => {
            const auth = request.headers.authorization;
            let userId = null;
            if (auth && auth.startsWith("Bearer ")) {
                try {
                    const token = auth.split(" ")[1];
                    // dynamically import to avoid circular dependency issues at the top level if any
                    const { verifyToken } = await Promise.resolve().then(() => __importStar(require("./common/utils/jwt.utils")));
                    const payload = verifyToken(token);
                    userId = payload.id;
                }
                catch (err) {
                    // Invalid token, leave userId null
                }
            }
            return { headers: request.headers, userId };
        },
        formatError: (error) => {
            const err = error;
            return { message: err.message, success: false, statuscode: err.cause || 500 };
        }
    }));
    app.use("/api/auth", modules_1.authRoute);
    app.use("/post", modules_1.postRoute);
    app.use("/comment", modules_1.commentRoute);
    app.use("/friend", modules_1.friendRoute);
    app.use("/user", modules_1.userRoute);
    app.use("/chat", modules_1.chatRoute);
    app.use("/message", modules_1.messageRoute);
    app.use("/notification", modules_1.notificationRoute);
    //global error handler
    app.use((error, req, res, next) => {
        return res.status(error.cause || 500).json({
            message: error.message,
            success: false,
            details: error instanceof common_1.BadRequestException ? error.details : undefined
        });
    });
    app.listen(port, () => {
        console.log("App is running at port " + port);
    });
}
