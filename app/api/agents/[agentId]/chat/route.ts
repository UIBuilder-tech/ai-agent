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

    const body = await req.json()
    const { message, threadId } = body

    if (!threadId) {
      return new NextResponse("Thread ID is required", { status: 400 })
    }

    // Validate agentId is a valid ObjectId
    // if (!/^[0-9a-fA-F]{24}$/.test(params.agentId)) {
    //   return new NextResponse("Invalid agent ID", { status: 400 })
    // }

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

    if (!agent) {
      return new NextResponse("Agent not found", { status: 404 })
    }

    if (!agent.assistantId) {
      return new NextResponse("Agent not configured with an assistant", { status: 400 })
    }

    // Verify the thread belongs to the user and agent
    const thread = await prisma.thread.findFirst({
      where: {
        threadId,
        userId: session.user.id,
        agentId: agent.id,
      },
    })

    if (!thread) {
      return new NextResponse("Thread not found or unauthorized", { status: 404 })
    }

    // Create message in OpenAI thread
    const messageResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
        "Content-Type": "application/json",
        "OpenAI-Beta": "assistants=v2",
      },
      body: JSON.stringify({ role: "user", content: message }),
    })

    if (!messageResponse.ok) {
      throw new Error(`Failed to create message: ${messageResponse.statusText}`)
    }

    const openaiMessage = await messageResponse.json()

    // Store message in database
    await prisma.message.create({
      data: {
        agentId: agent.id,
        content: message,
        role: "user",
        threadId: thread.threadId,
        messageId: openaiMessage.id,
      },
    })

    // Create a run with the assistant
    const runResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
        "Content-Type": "application/json",
        "OpenAI-Beta": "assistants=v2",
      },
      body: JSON.stringify({ assistant_id: agent.assistantId }),
    })

    if (!runResponse.ok) {
      throw new Error(`Failed to create run: ${runResponse.statusText}`)
    }

    const run = await runResponse.json()

    // Poll for the run completion
    let response
    while (true) {
      const runStatusResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs/${run.id}`, {
        headers: {
          Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
          "OpenAI-Beta": "assistants=v2",
        },
      })

      if (!runStatusResponse.ok) {
        throw new Error(`Failed to get run status: ${runStatusResponse.statusText}`)
      }

      const runStatus = await runStatusResponse.json()

      if (runStatus.status === "completed") {
        // Get the assistant's messages
        const messagesResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
          headers: {
            Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
            "OpenAI-Beta": "assistants=v2",
          },
        })

        if (!messagesResponse.ok) {
          throw new Error(`Failed to get messages: ${messagesResponse.statusText}`)
        }

        const messages = await messagesResponse.json()

        // Get the latest assistant message
        const lastMessage = messages.data.filter((msg) => msg.role === "assistant")[0]

        if (lastMessage && lastMessage.content[0].type === "text") {
          response = lastMessage.content[0].text.value

          // Store assistant message in database
          await prisma.message.create({
            data: {
              agentId: agent.id,
              content: response,
              role: "assistant",
              threadId: thread.threadId,
              messageId: lastMessage.id,
            },
          })
          break
        }
      } else if (runStatus.status === "failed") {
        throw new Error("Run failed")
      }

      // Wait before polling again
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    return NextResponse.json({
      message: response,
      threadId: thread.threadId,
    })
  } catch (error) {
    console.error("[CHAT_ERROR]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

// Keep the GET method as it is

