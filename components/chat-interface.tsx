"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FlashcardPanel } from "@/components/flashcard-panel";
import { StreamData, streamReader } from "@/lib/utils";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

import { useChat } from '@ai-sdk/react';
import { saveConversation, storeMessages } from "@/app/actions/database";

// import { getConversationCount, getAndIncrementConversationCount, getCardsCount, getAndIncrementCardsCount } from "@/app/actions/database";

// Message class to represent chat messages
interface Message {
  id: string;
  content: string;
  role: "user" | "assistant" | "system" | "data";
  // timestamp: Date;  // Add timestamp field
}

// Interface for AI SDK messages (matches what useChat provides)
interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant" | "system" | "data";
}

// Interface for database storage
interface DatabaseMessage {
  messageId: number;
  messageContent: string;
  messageRole: string;
  timestamp: string;
  conversationId?: string;
}

// ChatInterface component to render chat interface + functionality
export function ChatInterface() {
  const router = useRouter();
  // const [conversationCount, setConversationCount] = useState<number | null>(null);
  // const [cardsCount, setCardsCount] = useState<number | null>(null);
  // const [hasIncrementedCount, setHasIncrementedCount] = useState(false);
  
  //setMessages is a function to update the messages state
  //useState is a hook to manage state in functional components
  // const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamedContent, setStreamedContent] = useState("");
  // useRef is a hook to store mutable values that persist across renders
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, handleSubmit: originalHandleSubmit } = useChat();
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, streamedContent]);


  const generateUniqueId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    originalHandleSubmit(e);
  };

  const handlePostToPublic = async () => {
    if (!messages || messages.length === 0) {
      alert('Cannot post an empty conversation!');
      return;
    }

    if (!title.trim()) {
      alert('Please enter a title for your conversation!');
      return;
    }

    const baseTimestamp = new Date();
    
    // Convert ChatMessage to DatabaseMessage with precise ordering
    const formattedMessages: DatabaseMessage[] = messages.map((msg, index) => {
      // Add milliseconds offset to ensure strict ordering
      const timestamp = new Date(baseTimestamp.getTime() + index);
      
      return {
        messageId: index + 1,
        messageContent: msg.content,
        messageRole: msg.role,
        timestamp: timestamp.toISOString(),
        // sequence: index // Optional: add sequence field if you want to ensure order independent of timestamp
      };
    });
  
    try {
      const conversationId = generateUniqueId();
      await saveConversation(conversationId, title.trim());
      await storeMessages(conversationId, formattedMessages);
      alert('Conversation posted successfully!');
      // Reset the chat - this depends on your useChat implementation
      window.location.reload(); // Simple reset solution
    } catch (error) {
      console.error('Failed to store conversation:', error);
      alert('Failed to post conversation');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <div className="space-y-4 w-full px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Echo: Share your conversations publicly
        </h1>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter conversation title..."
            className="px-3 py-1 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <Button 
            onClick={() => window.location.href = '/'}
            className="bg-secondary text-secondary-foreground"
          >
            Home
          </Button>
          <Button 
            onClick={handlePostToPublic}
            className="bg-primary text-primary-foreground"
          >
            Post to Public
          </Button>
        </div>
      </div>

      <div className="grid w-full gap-2">
        <div className="bg-card text-card-foreground shadow-sm flex h-[calc(100vh-13rem)] flex-col p-3">
          <ScrollArea className="flex-1 pr-3" ref={scrollAreaRef}>
            <div className="flex flex-col gap-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted prose prose-sm dark:prose-invert max-w-none"
                    } max-w-[80%]`}
                  >
                    {message.role === "assistant" ? (
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    ) : (
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <form onSubmit={handleSubmit} className="sticky bottom-0 mt-3 flex gap-3">
            <Textarea
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="min-h-[32px] flex-1 resize-none p-1 pl-4 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-med"
            />
            <Button 
              type="submit" 
              disabled={isLoading} 
              className="px-4"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}