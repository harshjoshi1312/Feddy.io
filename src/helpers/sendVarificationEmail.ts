import { resend } from "@/lib/resend";

import { EmailTemplate } from "../../emails/varificationemail";

import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerifiationEmail(
  email: string,
  username: string,
  verifycode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "verification code",
      react: EmailTemplate({ username, otp: verifycode }),
    });
    return { sucess: true, message: "used  to send verification email" };
  } catch (emailerror) {
    console.error("error send vrification email", emailerror);
    return { sucess: false, message: "faile to send verification email" };
  }
}



// add resend
// email template on the outside box
// helper function for the send varification emails
// types folder sucess message check for the apis