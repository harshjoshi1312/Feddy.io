import { z } from "zod";

export const usrernameValidation = z
  .string()
  .min(2, "usernmae must be atlest 2 chars")
  .max(20, "less than 20 chars ");

export const signupSchema = z.object({
  username: usrernameValidation,
  email: z.string().email({ message: "Invalid email password" }),
  password: z.string().min(6, { message: "password must be atlest 6 chars" }),
});
