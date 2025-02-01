"use client";

import { useState } from "react";
import { Agent, VisualSettings } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface CustomizationFormProps {
  agent: Agent & {
    visualSettings: VisualSettings | null;
  };
}

export function CustomizationForm({ agent }: CustomizationFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    theme: agent.visualSettings?.theme || "light",
    primaryColor: agent.visualSettings?.primaryColor || "#3b82f6",
    isAutoOpen: agent.visualSettings?.isAutoOpen || false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/agents/${agent.id}/customize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        throw new Error("Failed to update settings");
      }

      toast.success("Settings updated successfully");
      router.refresh();
    } catch (error) {
      toast.error("Error updating settings");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-lg shadow">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="theme">Theme</Label>
          <select
            id="theme"
            value={settings.theme}
            onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
            className="w-full rounded-md border border-input bg-background px-3 py-2"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="primaryColor">Primary Color</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              id="primaryColor"
              value={settings.primaryColor}
              onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
              className="w-20 h-10 p-1"
            />
            <Input
              type="text"
              value={settings.primaryColor}
              onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
              className="flex-1"
              placeholder="#3b82f6"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="autoOpen">Auto-open chat window</Label>
          <Switch
            id="autoOpen"
            checked={settings.isAutoOpen}
            onCheckedChange={(checked:any) => setSettings({ ...settings, isAutoOpen: checked })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Preview</h3>
        <div
          className="p-4 rounded-lg"
          style={{
            backgroundColor: settings.theme === "dark" ? "#1a1a1a" : "#ffffff",
            color: settings.theme === "dark" ? "#ffffff" : "#000000",
            border: "1px solid #e5e7eb",
          }}
        >
          <div
            className="w-full h-12 rounded-lg mb-4"
            style={{ backgroundColor: settings.primaryColor }}
          />
          <p className="text-sm">
            This is how your chat interface will look with the selected theme and colors.
          </p>
        </div>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}