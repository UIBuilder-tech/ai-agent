"use client";

import { useState } from 'react';
import { SendHorizontal, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar } from '@/components/ui/avatar';
import { Alert } from '@/components/ui/alert';
import { Message } from '@/types/chat';
import { sendChatMessage } from '@/lib/chat-service';

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: [{ text: { value: "Hello! I'm your AI marketing strategist. Tell me about your company and marketing goals, and I'll help you develop effective strategies." } }],
  created_at: new Date().toLocaleString(),
};

export function MarketingChat() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: [{ text: { value: input } }],
      created_at: new Date().toLocaleString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await sendChatMessage(input, messages);
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: [{ text: { value: response.message } }],
        created_at: new Date().toLocaleString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      setError('Failed to get response. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto w-full p-4">
      <div className="flex items-center space-x-4 p-4 bg-white rounded-t-lg border-b">
        <Avatar className="h-10 w-10">
          <div className="bg-primary text-primary-foreground rounded-full w-full h-full flex items-center justify-center">
            M
          </div>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold">Marketing Assistant</h2>
          <p className="text-sm text-muted-foreground">Your AI marketing strategist</p>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4 bg-white">
        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </Alert>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start space-x-4",
                message.role === 'user' ? "justify-end" : "justify-start"
              )}
            >
              {message.role === 'assistant' && (
                <Avatar className="h-8 w-8 mt-1">
                  <div className="bg-primary text-primary-foreground rounded-full w-full h-full flex items-center justify-center text-sm">
                    M
                  </div>
                </Avatar>
              )}
              <div
                className={cn(
                  "rounded-lg p-4 max-w-[80%]",
                  message.role === 'user'
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {message.content[0].text.value}
              </div>
              {message.role === 'user' && (
                <Avatar className="h-8 w-8 mt-1">
                  <div className="bg-secondary text-secondary-foreground rounded-full w-full h-full flex items-center justify-center text-sm">
                    U
                  </div>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center space-x-2 text-muted-foreground">
              <div className="animate-pulse">●</div>
              <div className="animate-pulse animation-delay-200">●</div>
              <div className="animate-pulse animation-delay-400">●</div>
            </div>
          )}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-4 bg-white rounded-b-lg border-t">
        <div className="flex space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 min-h-[60px] resize-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <Button 
            type="submit" 
            size="icon"
            disabled={isLoading || !input.trim()}
          >
            <SendHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
}