import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request, { params }: { params: { agentId: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
console.log("params.agentI--->",params.agentId,"session.user.id",session.user.id)
    // Validate agentId is a valid ObjectId
    // if (!/^[0-9a-fA-F]{24}$/.test(params.agentId)) {
    //   return new NextResponse("Invalid agent ID", { status: 400 })
    // }
    console.log("HERER")
    const agent = await prisma.agent.findFirst({
      where: {
        id: params.agentId,
        userId: session.user.id,
      },
      select: {
        assistantId: true,
        id: true,
        name: true,
      },
    })
console.log("agent---->",agent)
    if (!agent) {
      return new NextResponse("Agent not found", { status: 404 })
    }

    if (!agent.assistantId) {
      return new NextResponse("Agent not configured with an assistant", { status: 400 })
    }

    // Create a new thread
    const response = await fetch("https://api.openai.com/v1/threads", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
        "Content-Type": "application/json",
        "OpenAI-Beta": "assistants=v2",
      },
      body: JSON.stringify({}),
    })

    if (!response.ok) {
      throw new Error(`Failed to create thread: ${response.statusText}`)
    }

    const openaiThread = await response.json()

    // Store thread in database
    const thread = await prisma.thread.create({
      data: {
        threadId: openaiThread.id,
        userId: session.user.id,
        agentId: agent.id,
      },
    })

    return NextResponse.json({
      threadId: thread.threadId,
      agentName: agent.name,
    })
  } catch (error) {
    console.error("[CHAT_INITIALIZE_ERROR]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

