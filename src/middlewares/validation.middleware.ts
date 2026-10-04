import type {Request, Response, NextFunction} from "express";
import {ZodObject} from "zod";
import {BadRequestException} from "../common";

export const isValid = (schema: ZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const result = await schema.safeParseAsync(req.body)
        if (result.success == false) {
            const errorDetails = result.error.issues.map((issue) => ({
                path: issue.path[0] as string,
                message: issue.message
            }))
            throw new BadRequestException('validation error', errorDetails)
        }
        
        next()
    }

}