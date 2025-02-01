import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const API = process.env.OPENAI_API_KEY
export async function POST(
  req: Request,
  { params }: { params: { agentId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { type, content, filename, size } = await req.json();

    const agent = await prisma.agent.findUnique({
      where: {
        id: params.agentId,
        userId: session.user.id,
      },
    });

    if (!agent) {
      return new NextResponse('Agent not found', { status: 404 });
    }

    // Update agent status
    await prisma.agent.update({
      where: { id: params.agentId },
      data: { status: 'in_progress' }
    });

    // Create training data record
    const trainingData = await prisma.trainingData.create({
      data: {
        agentId: params.agentId,
        type,
        content,
        filename,
        size,
        characterCount: content.length,
        status: 'processing'
      }
    });

    const payload = JSON.stringify({
      name: "Math Tutor",
      instructions: "You are a personal math tutor. Write and run code to answer math questions.",
      tools: [{ type: "code_interpreter" }],
      model: "gpt-4o"
  
    })

    console.log("PAYLOAD--->",payload)

    // Process with OpenAI
    fetch("https://api.openai.com/v1/assistants",{
      method:"POST",
      headers:{
      "Authorization": `Bearer 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`,
      "Content-Type": "application/json",
      'OpenAI-Beta': 'assistants=v2'
      },
      body:JSON.stringify({
        "instructions": "You are a personal math tutor. When asked a question, write and run Python code to answer the question.",
        "name": "Math Tutor",
        "tools": [{"type": "code_interpreter"}],
        "model": "gpt-4o"
      })
    }) .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

    // Process with OpenAI
  //  openai.chat.completions.create({
  //     model: "gpt-4o-mini",
  //     messages: [
  //       {
  //         role: "system",
  //         content: "You are an AI assistant being trained with new information. Process and acknowledge the following content."
  //       },
  //       {
  //         role: "user",
  //         content: content
  //       }
  //     ]
  //   }) .then(response => response.json())
  //   .then(data => console.log(data))
  //   .catch(error => console.error('Error:', error));
  //   console.log("")

// console.log("ASSISTANT--->",assistant)

    // Update training data status
    await prisma.trainingData.update({
      where: { id: trainingData.id },
      data: { status: 'processed' }
    });

    // Update agent status
    await prisma.agent.update({
      where: { id: params.agentId },
      data: { status: 'awaiting_message' }
    });

    return NextResponse.json({ 
      success: true,
      message: "Training data processed successfully"
    });
  } catch (error) {
    console.error('[AGENT_TRAIN]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}