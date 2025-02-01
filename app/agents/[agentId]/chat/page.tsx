import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { TrainingStats } from "@/components/training-stats"
import { ChatInterface } from "@/components/chat-interface"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PartyPopperIcon as Party } from "lucide-react"

export default function ChatPage({ params }: { params: { agentId: string } }) {
    console.log("agentId",params.agentId)
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <Sidebar />
        <div className="flex-1 grid grid-cols-3 gap-6 p-6">
          <div className="col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Party className="h-6 w-6 text-blue-500" />
                  <CardTitle>Hooray!</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Your chat has been trained and is ready to amaze!</p>
                <p className="text-sm text-muted-foreground">
                  Subscribe for a boost in training, messaging, lead generation capabilities and more.
                </p>
                <Button>SUBSCRIBE FROM $19</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Test AI Agent</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Experience the appearance and functionality of your AI Agent by testing it with various questions.
                </p>
              </CardHeader>
              <CardContent>
                <ChatInterface agentId={params.agentId} />
              </CardContent>
            </Card>
          </div>

          <div className="col-span-1">
            <TrainingStats />
          </div>
        </div>
      </div>
    </div>
  )
}

