"use client";

import { Facebook, Linkedin, Twitter, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ShareButtonsProps {
  title: string;
  description: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export function ShareButtons({ title, description, socialLinks }: ShareButtonsProps) {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      {socialLinks.facebook && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => window.open(socialLinks.facebook, "_blank")}
        >
          <Facebook className="h-5 w-5" />
        </Button>
      )}
      {socialLinks.twitter && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => window.open(socialLinks.twitter, "_blank")}
        >
          <Twitter className="h-5 w-5" />
        </Button>
      )}
      {socialLinks.linkedin && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => window.open(socialLinks.linkedin, "_blank")}
        >
          <Linkedin className="h-5 w-5" />
        </Button>
      )}
      <Button
        variant="ghost"
        size="icon"
        onClick={copyToClipboard}
      >
        <LinkIcon className="h-5 w-5" />
      </Button>
    </div>
  );
}