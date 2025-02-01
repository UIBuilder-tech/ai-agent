import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const agents = await prisma.discoverAgent.findMany({
      where: {
        published: true,
        status: "approved"
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json(agents);
  } catch (error) {
    console.error("[DISCOVER_GET_ALL_CHATS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}