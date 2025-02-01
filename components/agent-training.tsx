"use client";

import { useState } from "react";
import { Agent, TrainingData } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface AgentTrainingProps {
  agent: Agent & {
    trainingData: TrainingData[];
  };
}

export function AgentTraining({ agent }: AgentTrainingProps) {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTextSubmit = async () => {
    if (!text.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/agents/${agent.id}/train`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "text",
          content: text,
          filename: "manual-input.txt",
          size: text.length
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit training data");
      }

      toast.success("Training data submitted successfully");
      setText("");
    } catch (error) {
      toast.error("Error submitting training data");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
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
          />
          <Button
            onClick={handleTextSubmit}
            disabled={isSubmitting || !text.trim()}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
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