"use client";

import { FC } from "react";
import { useTheme } from "next-themes";
import { BeatLoader } from "react-spinners";
import { Copy } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import BotAvatar from "@/components/bot-avatar";
import UserAvatar from "@/components/user-avatar";

import { cn } from "@/lib/utils";

export type ChatMessageProps = {
  role: "system" | "user";
  content?: string;
  isLoading?: boolean;
  src?: string;
};

const ChatMessage: FC<ChatMessageProps> = ({
  role,
  content,
  isLoading,
  src,
}) => {
  const { toast } = useToast();
  const { theme } = useTheme();

  const copy = () => {
    if (!content) return;

    navigator.clipboard.writeText(content);

    toast({
      description: "Message copied to clipboard",
      duration: 3000,
    });
  };

  return (
    <div
      className={cn(
        "group flex w-full items-start gap-x-3 py-4",
        role === "user" && "justify-end",
      )}
    >
      {role !== "user" && src && <BotAvatar src={src} />}

      <div className="max-w-sm rounded-md bg-primary/10 px-4 py-2 text-sm">
        {isLoading ? (
          <BeatLoader color={theme === "light" ? "black" : "white"} size={5} />
        ) : (
          content
        )}
      </div>

      {role === "user" && <UserAvatar />}

      {role !== "user" && !isLoading && (
        <Button
          onClick={copy}
          className="opacity-0 transition group-hover:opacity-100"
          variant="ghost"
          size="icon"
        >
          <Copy className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default ChatMessage;
