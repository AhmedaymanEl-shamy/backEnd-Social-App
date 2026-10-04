import { z } from "zod";

export const userIdParamSchema = z.object({
    userId: z.string().length(24, "Invalid user ID format")
});

export const requestIdParamSchema = z.object({
    requestId: z.string().length(24, "Invalid request ID format")
});
