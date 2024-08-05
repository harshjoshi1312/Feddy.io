import dbconnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
import { usrernameValidation } from "@/schemas/signupSchema";
import { use } from "react";

// fast type of functionality in which you can check that
// username is availabel or not

export async function POST(request: Request) {
  await dbconnect();
  try {
    const { username, code } = await request.json();
    const decodedUrl = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodedUrl });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 500 }
      );
    }

    const isCodeValid = user.verifycode === code;
    const iscodeNotExpired = new Date(user.verifycodeExpiry) > new Date();

    if (isCodeValid && iscodeNotExpired) {
      user.isVerified = true;
      await user.save();
      return Response.json(
        {
          success: false,
          message: "account verified successfully",
        },
        { status: 200 }
      );
    } else if (!iscodeNotExpired) {
      return Response.json(
        {
          success: false,
          message: "verification code is expired please signup again ",
        },
        { status: 400 }
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "Incorrect Verification code",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("verifyning user", error);
    return Response.json(
      {
        success: false,
        message: "error checking user",
      },
      { status: 500 }
    );
  }
}
