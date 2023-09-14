"use client";

import { FC } from "react";
import { Companion, Message } from "@prisma/client";

import ChatHeader from "@/components/chat-header";
import ChatForm from "@/components/chat-form";
import ChatMessages from "@/components/chat-messages";

type ChatClientProps = {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
};

const ChatClient: FC<ChatClientProps> = ({ companion }) => {
  return (
    <div className="flex h-full flex-col space-y-2 p-4">
      <ChatHeader companion={companion} />

      <ChatMessages />

      <ChatForm />
    </div>
  );
};

export default ChatClient;
