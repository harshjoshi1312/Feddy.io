import { z } from "zod";

export const MessageSchema = z.object({
  content: z
    .string()
    .min(10, { message: "content should be at least 10 chars" })
    .max(300, { message: "content must be at less than 300 chars" }),
});
