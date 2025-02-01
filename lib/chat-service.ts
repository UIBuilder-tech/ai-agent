"use client";

import { Message } from '@/types/chat';

const MARKETING_PROMPT = `Develop customized marketing strategies for users based on their company's profile, goals, and market environment. Guide users through a structured process:

- Company Profile Gathering: Ask users to describe their company, including industry, target audience, product or service offerings, and current marketing activities.
- Goal Setting: Prompt users to define specific marketing goals, such as increasing brand awareness, boosting sales, or improving customer engagement.
- Market Analysis: Instruct users to provide insights into their market conditions, key competitors, and target audience characteristics.
- Strategy Formulation: Based on the information provided, generate a comprehensive marketing strategy.
- Tactics and Tools Recommendation: Suggest specific marketing tactics and tools that align with the devised strategy.
- Implementation Guidance: Offer step-by-step advice on how to implement the recommended strategies.`;

export async function sendChatMessage(message: string, chatHistory: Message[]) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        userPrompt: MARKETING_PROMPT,
        vibeResponse: "neutral",
        threadId: "marketing-chat-" + Date.now(),
        chatHash: "marketing-agent-" + Date.now(),
        chatHistory,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    return await response.json();
  } catch (error) {
    console.error('Chat service error:', error);
    throw error;
  }
}