// ai integration file
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY!,
// });

// export const runtime = "edge";

// export async function POST(req: Request) {
//   try {
//  const  {message} = await req.json();

//   } catch (error) {
//     if (error instanceof OpenAI.APIError) {
//       const { name, status, headers, message } = error;
//       return NextResponse.json(
//         {
//           name,
//           status,
//           headers,
//           message,
//         },
//         { status }
//       );
//     } else {
//       console.log("unexpected error");
//       throw error;
//     }
//   }
// }
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-4-turbo"),
    messages,
  });

  return result.toDataStreamResponse();
}