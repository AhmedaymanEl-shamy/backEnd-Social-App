import { z } from "zod";

export const deleteCommentSchema = z.object({
    id: z.string().length(24, "Invalid ID format")
});
