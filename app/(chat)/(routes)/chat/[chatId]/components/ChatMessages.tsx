"use client";

import { Companion, Message } from "@prisma/client";
import { ChatMessage, ChatMessageProps } from "./ChatMessage";
import { useEffect, useRef, useState } from "react";

interface ChatMessagesProps {
  companion: Companion;
  isLoading: boolean;
  message: ChatMessageProps[];
}

const ChatMessages = ({ companion, isLoading, message }: ChatMessagesProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [fakeLoading, setFakeLoading] = useState(
    message.length === 0 ? true : false
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message.length]);

  return (
    <div className="flex-1 overflow-y-auto  pr-4">
      <ChatMessage
        isLoading={fakeLoading}
        src={companion.src}
        role={"system"}
        content={`Hello, I am ${companion.name}, ${companion.description}`}
      />
      {message.map((message, index) => (
        <ChatMessage
          key={index}
          role={message.role}
          content={message.content}
          src={companion.src}
        />
      ))}
      {isLoading && <ChatMessage role="system" src={companion.src} isLoading />}
      <div ref={scrollRef} />
    </div>
  );
};

export default ChatMessages;
