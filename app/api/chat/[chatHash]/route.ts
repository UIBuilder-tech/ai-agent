import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { chatHash: string } }
) {
  try {
    const chatConfig = await prisma.agentChat.findUnique({
      where: {
        chatHash: params.chatHash
      }
    });

    if (!chatConfig) {
      return new NextResponse("Chat not found", { status: 404 });
    }

    return NextResponse.json(chatConfig);
  } catch (error) {
    console.error("[CHAT_CONFIG_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}