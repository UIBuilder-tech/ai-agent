"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface AgentCardProps {
  agent: {
    title: string;
    slug: string;
    description: string;
    profileAvatar: string;
    username: string;
    countMessages: number;
  };
}

export function AgentCard({ agent }: AgentCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square relative">
        <Image
          src={agent.profileAvatar}
          alt={agent.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold mb-2 line-clamp-1">{agent.title}</h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {agent.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-500">{agent.countMessages}</span>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href={`/discover/chat/${agent.slug}`}>
              View AI Agent
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}