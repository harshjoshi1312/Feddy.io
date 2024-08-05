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
        
    }
  } catch (error) {}
}

// 35.20 next js aggregation pipeline applied succesfully
