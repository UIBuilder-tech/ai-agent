"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CreateAgentForm } from "@/components/create-agent-form";

interface CreateAgentDialogProps {
  children: React.ReactNode;
}

export function CreateAgentDialog({ children }: CreateAgentDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create AI Agent</DialogTitle>
        </DialogHeader>
        <CreateAgentForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}