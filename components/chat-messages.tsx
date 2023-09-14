"use client";

import { ElementRef, FC, useEffect, useRef, useState } from "react";
import { Companion } from "@prisma/client";

import ChatMessage, { ChatMessageProps } from "@/components/chat-message";

type ChatMessagesProps = {
  isLoading: boolean;
  companion: Companion;
  messages: ChatMessageProps[];
};

const ChatMessages: FC<ChatMessagesProps> = ({
  isLoading,
  companion,
  messages = [],
}) => {
  const scrollRef = useRef<ElementRef<"div">>(null);

  const [fakeLoading, setFakeLoading] = useState(
    messages.length === 0 ? true : false,
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage
        isLoading={fakeLoading}
        src={companion.src}
        role="system"
        content={`Hello I'm ${companion.name}, ${companion.description}`}
      />

      {messages.map((message) => {
        return (
          <ChatMessage
            key={message.content}
            src={companion.src}
            content={message.content}
            role={message.role}
          />
        );
      })}

      {isLoading && <ChatMessage src={companion.src} role="system" isLoading />}

      <div ref={scrollRef} />
    </div>
  );
};

export default ChatMessages;
