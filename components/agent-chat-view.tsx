"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface AgentChatViewProps {
  config: {
    name: string;
    startingMessage: string;
    botName: string;
    color: string;
    leadForm: {
      buttonText: string;
      thankYouMessage: string;
      descriptionMessage: string;
      namePlaceholderText: string;
      emailPlaceholderText: string;
      phonePlaceholderText: string;
    };
  };
}

export function AgentChatView({ config }: AgentChatViewProps) 
{
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: config.startingMessage,
      timestamp: new Date().toISOString()
    }
  ]);
  console.log("config",config)
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadFormData, setLeadFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      const data = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.message,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Show lead form after a few messages
      if (messages.length >= 3 && !showLeadForm) {
        setShowLeadForm(true);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle lead submission
    setShowLeadForm(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: "600px" }}>
      <div className="p-4 border-b flex items-center space-x-3">
        <Avatar>
          <div className="w-full h-full flex items-center justify-center bg-primary">
            {config.botName[0]}
          </div>
        </Avatar>
        <div>
          <h3 className="font-semibold">{config.name}</h3>
          <p className="text-sm text-gray-500">Online</p>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4" style={{ height: "calc(100% - 140px)" }}>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                message.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <Avatar className="h-8 w-8">
                <div className={`w-full h-full flex items-center justify-center ${
                  message.role === "user" ? "bg-primary" : "bg-secondary"
                }`}>
                  {message.role === "user" ? "U" : "A"}
                </div>
              </Avatar>
              <div
                className={`rounded-lg p-3 max-w-[80%] ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary"
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

      {showLeadForm ? (
        <form onSubmit={handleLeadSubmit} className="p-4 border-t">
          <div className="space-y-4">
            <Input
              placeholder={config.leadForm.namePlaceholderText}
              value={leadFormData.name}
              onChange={e => setLeadFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
            <Input
              type="email"
              placeholder={config.leadForm.emailPlaceholderText}
              value={leadFormData.email}
              onChange={e => setLeadFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
            <Input
              type="tel"
              placeholder={config.leadForm.phonePlaceholderText}
              value={leadFormData.phone}
              onChange={e => setLeadFormData(prev => ({ ...prev, phone: e.target.value }))}
            />
            <Button type="submit" className="w-full">
              {config.leadForm.buttonText}
            </Button>
          </div>
        </form>
      ) : (
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="min-h-[60px]"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <Button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}