import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbconnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

// for login users can accpet and not accept messages

// for the toggling

// for the toggeling post method
export async function POST(request: Request) {
  await dbconnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "not authenticated",
      },
      {
        status: 401,
      }
    );
  }

  const UserId = user._id;
  const { AcceptMessage } = await request.json();

  try {
    const updateduser = await UserModel.findByIdAndUpdate(
      UserId,
      { isAcceptingMessage: AcceptMessage },
      { new: true }
    );
    if (updateduser) {
      return Response.json(
        {
          success: false,
          message: "failed to update accept message to the user",
        },
        {
          status: 401,
        }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Message acceptance status updated Successfully",
        updateduser,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("failed to update accept message to the user");
    return Response.json(
      {
        success: false,
        message: "failed to update accept message to the user",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(request: Request) {
  await dbconnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "not authenticated",
      },
      {
        status: 401,
      }
    );
  }

  const UserId = user._id;

  const foundUser = await UserModel.findById(UserId);
  try {
    if (!foundUser) {
      return Response.json(
        {
          success: false,
          message: "failed to found the user",
        },
        {
          status: 400,
        }
      );
    }
    return Response.json(
      {
        success: false,
        isAcceptingMessages: foundUser.isAcceptingMessage,
      },
      {
        status: 400,
      }
    );
  } catch (error) {
    console.log("failed to update accept message to the user");
    return Response.json(
      {
        success: false,
        message: "Erro in getting acceptance messages",
      },
      {
        status: 500,
      }
    );
  }
}

//////////                                            