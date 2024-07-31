import { Message } from "@/model/User";


export interface ApiResponse {
  sucess: boolean;
  message: string;
  isAccesptingMessages?: boolean;
  messages?: Array<Message>
}
