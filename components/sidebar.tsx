import { BarChart, MessageSquare, Users, BookOpen, Paintbrush, Settings, Code2, Plus, Eye } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type React from "react" // Added import for React

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("pb-12 min-h-screen w-60 border-r", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">My AI Agents</h2>
          <div className="space-y-1">
            <Button variant="secondary" className="w-full justify-start gap-2">
              <Eye className="h-4 w-4" />
              View AI Agent
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <BarChart className="h-4 w-4" />
              Analytics
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <MessageSquare className="h-4 w-4" />
              Messages
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Users className="h-4 w-4" />
              Leads
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Configuration</h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <BookOpen className="h-4 w-4" />
              Training sources
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Paintbrush className="h-4 w-4" />
              Visual Look
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Code2 className="h-4 w-4" />
              Embedded on site
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Plus className="h-4 w-4" />
              Add-ons
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

