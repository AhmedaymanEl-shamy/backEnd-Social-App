import { z } from "zod";

export const sendMessageSchema = z.object({
    body: z.object({
        sendTo: z.string().min(24).max(24),
        content: z.string().min(1)
    })
});

export type SendMessageDTO = z.infer<typeof sendMessageSchema>["body"];
