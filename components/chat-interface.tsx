"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";

interface Message {
  role: "user" | "assistant"
  content: string
  createdAt: string
  threadId?: string
}

interface ChatInterfaceProps {
  agentId: string;
}

export function ChatInterface({ agentId }: ChatInterfaceProps) {
  // const { data: session } = useSession()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [threadId, setThreadId] = useState<string | null>(null)
  const [agentName, setAgentName] = useState<string>("")

  useEffect(() => {
    const initializeChat = async () => {
      console.log("IN HERERER")
      console.log("agentId",agentId)
      try {
        const response = await fetch(`/api/agents/${agentId}/chat/initialize`, {
          method: "POST",
        })
        if (!response.ok) throw new Error("Failed to initialize chat")
        const data = await response.json()
        setThreadId(data.threadId)
        setAgentName(data.agentName)
        setMessages([
          {
            role: "assistant",
            content: `Hello! I'm ${data.agentName}. How can I help you today?`,
            createdAt: new Date().toISOString(),
          },
        ])
      } catch (error) {
        console.error("Error initializing chat:", error)
      }
    }

    // if (session?.user) {
      initializeChat()
    // }
  }, [agentId])

  const sendMessage = async () => {
    if (!input.trim() || isLoading || !threadId) return

    const userMessage: Message = {
      role: "user",
      content: input,
      createdAt: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch(`/api/agents/${agentId}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          threadId,
        }),
      })

      if (!response.ok) throw new Error("Failed to send message")

      const data = await response.json()
      const assistantMessage: Message = {
        role: "assistant",
        content: data.message,
        createdAt: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // useEffect(() => {
  //   const loadMessages = async () => {
  //     if (!threadId) return

  //     try {
  //       const response = await fetch(`/api/agents/${agentId}/chat?threadId=${threadId}`)
  //       if (!response.ok) throw new Error("Failed to load messages")

  //       const data = await response.json()
  //       setMessages(data)
  //     } catch (error) {
  //       console.error("Error loading messages:", error)
  //     }
  //   }

  //   loadMessages()
  // }, [threadId, agentId])

  console.log("threadId, agentId",threadId, agentId)

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex items-start gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
              <Avatar className="h-8 w-8">
                <div
                  className={`w-full h-full flex items-center justify-center ${
                    message.role === "user" ? "bg-primary" : "bg-secondary"
                  }`}
                >
                  {message.role === "user" ? "U" : "A"}
                </div>
              </Avatar>
              <div
                className={`rounded-lg p-3 max-w-[80%] ${
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center space-x-2 text-gray-400">
              <div className="animate-bounce">●</div>
              <div className="animate-bounce delay-100">●</div>
              <div className="animate-bounce delay-200">●</div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="min-h-[60px]"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                sendMessage()
              }
            }}
          />
          <Button onClick={sendMessage} disabled={isLoading || !input.trim() || !threadId} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}