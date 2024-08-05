import dbconnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
import { usrernameValidation } from "@/schemas/signupSchema";

// fast type of functionality in which you can check that
// username is availabel or not

const UsernameQuerySchema = z.object({
  username: usrernameValidation,
});

export async function GET(request: Request) {

  await dbconnect();
  try {
    const { searchParams } = new URL(request.url);
    const QueryParam = {
      username: searchParams.get("username"),
    };
    // validate with  zod
    const result = UsernameQuerySchema.safeParse(QueryParam);
    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message: "invalid query parameter",
        },
        { status: 400 }
      );
    }

    const { username } = result.data;

    const existingVerifieduser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifieduser) {
      return Response.json(
        {
          success: false,
          message: "username is already taken",
        },
        { status: 400 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "username is available",
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("error checking username", error);
    return Response.json(
      {
        success: false,
        message: "error checking username",
      },
      { status: 500 }
    );
  }
}
