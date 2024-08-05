import UserModel from "@/model/User";
import dbconnect from "@/lib/dbConnect";
import { Message } from "@/model/User";

export async function POST(request: Request) {
  await dbconnect();

  const { username, content } = await request.json();
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User Not Found",
        },
        {
          status: 404,
        }
      );
    }

    // is User accepting the Messages
    if (!user.isAcceptingMessage) {
      return Response.json(
        {
          success: false,
          message: "User is not accepting messages",
        },
        {
          status: 404,
        }
      );
    }

    const newMessage = { content, createdAt: new Date() };
    user.message.push(newMessage as Message);
    await user.save();
    return Response.json(
      {
        success: true,
        message: "message sent succesfully",
      },
      {
        status: 404,
      }
    );
  } catch (error) {
    console.log("error adding messages");
    return Response.json(
      {
        success: false,
        message: "internal server Error",
      },
      { status: 500 }
    );
  }
}
