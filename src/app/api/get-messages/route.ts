// give me all messages which are availabel
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbconnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";

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

  // convert user in string to mongoose is
  // Aggregation PipeLine
  const UserId = new mongoose.Types.ObjectId(user._id);
  try {
    const user = await UserModel.aggregate([
      { $match: { id: UserId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ])
    if (!user || user.length ===0 ) {
        return Response.json(
            {
                success: false,
                message : "not uthenticated"
            },
            { status : 401}
        )
    }
      return Response.json(
        {
          success: true,
          messages: user[0].messages
        },
        { status: 401 }
      );
  } catch (error) {
     console.error("messages get issues", error);
     return Response.json(
       {
         success: false,
         message: "error message getting",
       },
       { status: 500 }
     );
  }
}
