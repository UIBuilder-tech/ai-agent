import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import fs from 'fs';
import FormData from 'form-data';
import os from 'os';
import path from 'path';

// Helper function to validate response
async function handleApiResponse(response, operation) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(`${operation} failed: ${JSON.stringify(data)}`);
  }
  return data;
}

// Function to create form data boundary
function generateBoundary() {
  return '----WebKitFormBoundary' + Math.random().toString(36).slice(2);
}

// Function to create multipart form data manually
function createFormData(content, filename, boundary) {
  const fileContent = Buffer.from(content);
  
  const formData = [
    `--${boundary}`,
    'Content-Disposition: form-data; name="purpose"',
    '',
    'assistants',
    `--${boundary}`,
    `Content-Disposition: form-data; name="file"; filename="${filename}"`,
    'Content-Type: text/plain',
    '',
    content,
    `--${boundary}--`
  ].join('\r\n');

  return Buffer.from(formData);
}

// Function to upload a file to OpenAI
async function uploadFile(content, filename = 'training_data.txt') {
  try {
    const boundary = generateBoundary();
    const formData = createFormData(content, filename, boundary);
console.log("formdata---->", formData)
    const response = await fetch('https://api.openai.com/v1/files', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPEN_AI_KEY}`,
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': formData.length.toString()
      },
      body: formData
    });

    const fileData = await handleApiResponse(response, 'File upload');
    console.log("FILE---->",fileData)
    return fileData.id;

  } catch (error) {
    console.error('File Upload Error:', error);
    throw error;
  }
}

// API route handler
export async function POST(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { type, content, filename,name } = await req.json();

    // Validate agent existence
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

    console.log("Uploading file...");
    const fileId = await uploadFile(content, filename);
    console.log("CREATED FILE IF---->",fileId)
    console.log("Creating assistant...");
    const assistantResponse = await fetch("https://api.openai.com/v1/assistants", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPEN_AI_KEY}`,
        "Content-Type": "application/json",
        "OpenAI-Beta": "assistants=v2"
      },
      body: JSON.stringify({
        name: name,
        instructions: "You are an AI assistant trained on specific knowledge provided by the user. Only answer questions based on the provided training data and do not make up information. If you do not know the answer, say 'I do not have enough information to answer that.'.",
        // tools: [{ type: "retrieval" }], // Corrected tool type
        model: "gpt-4o",
        // file_ids: [fileId],
        tools :[{"type": "code_interpreter"}],
        tool_resources :{ "code_interpreter": {"file_ids": [fileId]}}
      })
    });

    const assistantData = await assistantResponse.json();
    console.log("Assistant Response----->", assistantData);

    if (!assistantData.id) throw new Error("Assistant creation failed: " + JSON.stringify(assistantData));

    // Update only existing fields in the agent
    const updateData = {
      status: 'awaiting_message' // Reset status after completion
    };

    // Only add fields that exist in assistantData
    if (assistantData.id) updateData.assistantId = assistantData.id;
    if (assistantData.name) updateData.name = assistantData.name;
    if (assistantData.model) updateData.model = assistantData.model;
    if (assistantData.instructions) updateData.instructions = assistantData.instructions;

    // Update agent with new data
    const updatedAgent = await prisma.agent.update({
      where: { id: params.agentId },
      data: updateData
    });

    return NextResponse.json({ success: true, assistant: assistantData, agent: updatedAgent });
  } catch (error) {
    console.error("[AGENT_TRAIN]", error);
    return new NextResponse(`Internal Error: ${error.message}`, { status: 500 });
  }
}
