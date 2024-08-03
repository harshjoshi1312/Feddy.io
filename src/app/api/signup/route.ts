// first api in nextjs
import dbconnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

import { sendVerifiationEmail } from "@/helpers/sendVarificationEmail";

export async function POST(request: Request) {
  await dbconnect();

  try {
    const { username, email, password } = await request.json();
    const existingUServerifiedbyUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingUServerifiedbyUsername) {
      return Response.json(
        {
          success: true,
          message: "username is already taken",
        },
        { status: 400 }
      );
    }

    const verifycode = Math.floor(100000 + Math.random() * 900000).toString();

    const existinguserByEmail = await UserModel.findOne({ email });
    if (existinguserByEmail) {
      if (existinguserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "user already exists with email",
          },
          { status: 500 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existinguserByEmail.password = hashedPassword;
        existinguserByEmail.verifycode = verifycode;
        existinguserByEmail.verifycodeExpiry = new Date(Date.now() + 3600000);
        await existinguserByEmail.save();
      }
    } else {
      const hashedpassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newuser = new UserModel({
        username,
        email,
        password: hashedpassword,
        verifycode,
        verifycodeExpiry: expiryDate,
        isAcceptingMessage: true,
        isVerified: false,
        message: [],
      });

      await newuser.save();
    }

    //send varification email
    const emailresponse = await sendVerifiationEmail(
      email,
      username,
      verifycode
    );
    if (!emailresponse.sucess) {
      return Response.json(
        {
          success: false,
          message: emailresponse.message,
        },
        { status: 500 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "User registered Successfully, Please verify your email",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("error registered error", error);
    return Response.json(
      {
        sucess: false,
        message: "Error registering user",
      },
      {
        status: 500,
      }
    );
  }
}
