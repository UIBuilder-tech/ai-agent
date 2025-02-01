"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Agent, TrainingData } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface AgentTrainingProps {
  agent: Agent & {
    trainingData: TrainingData[];
  };
}

export function AgentTraining({ agent }: AgentTrainingProps) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState<string>("");

  const handleTextSubmit = async () => {
    if (!text.trim()) return;

    setIsSubmitting(true);
    setTrainingProgress("Uploading training data...");

    try {
      const response = await fetch(`/api/agents/${agent.id}/train`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "text",
          content: text,
          filename: "manual-input.txt",
          size: text.length,
          name:agent?.displayName
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit training data");
      }
console.log("RESPONSE---->", response)
      const data = await response.json();
      console.log("data---->", data)
      
      if (data.success) {
        toast.success("Training completed successfully");
        // Navigate to the chat view
        router.push(`/agents/${agent.id}/chat`);
      } else {
        throw new Error("Training failed");
      }

    } catch (error) {
      toast.error("Error during training process");
    } finally {
      setIsSubmitting(false);
      setTrainingProgress("");
    }
  };
console.log("IN HEREEEEEE")
  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Training Progress Indicator */}
      {isSubmitting || trainingProgress?.length > 0 && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <h3 className="text-lg font-medium">Training in Progress</h3>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-center text-muted-foreground">
                {trainingProgress}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      )}

      <Tabs defaultValue="text" className="space-y-6">
        <TabsList>
          <TabsTrigger value="text">Text Input</TabsTrigger>
          <TabsTrigger value="file">File Upload</TabsTrigger>
          <TabsTrigger value="history">Training History</TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="space-y-4">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter training data..."
            className="min-h-[200px]"
            disabled={isSubmitting}
          />
          <Button
            onClick={handleTextSubmit}
            disabled={isSubmitting || !text.trim()}
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Training...</span>
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </TabsContent>

        <TabsContent value="file">
          <FileUpload agentId={agent.id} />
        </TabsContent>

        <TabsContent value="history">
          <div className="space-y-4">
            {agent.trainingData.map((data) => (
              <div
                key={data.id}
                className="p-4 border rounded-lg"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">{data.filename || "Text Input"}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(data.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    data.status === "processed" 
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {data.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {data.characterCount} characters
                </p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}