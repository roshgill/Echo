"use client";

import { getConversationIds, getMessages } from "@/app/actions/database";
import { useEffect, useState } from "react";
import { ConversationGrid } from "./conversation-grid";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Message {
    messageId: number;
    messageContent: string;
    messageRole: string;
    timestamp: string;
}

interface Conversation {
    conversationId: string;
    conversationName: string;
}

export function HeroPage() {
    const router = useRouter();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    
    useEffect(() => {
        async function fetchData() {
          try {
            const convArray = await getConversationIds();
            if (Array.isArray(convArray)) {
              const mappedConversations = convArray.map(conv => ({
                conversationId: conv.conversationid,
                conversationName: conv.conversationname,
              }));
              
              setConversations(mappedConversations);
              console.log("Conversations loaded:", mappedConversations);

            } else {
              console.log("No conversations found or invalid format");
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
        fetchData();
    }, []);

    return (
        <div className="min-h-screen">
            <div className="text-center py-12">
                <div className="flex justify-between items-center max-w-7xl mx-auto px-4">
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold text-black">
                            ECHO
                        </h1>
                        <p className="mt-2 text-gray-400">
                            Share your AI convos
                        </p>
                    </div>
                    <Button 
                        onClick={() => router.push('/chat-interface')}
                        className="bg-primary text-black"
                    >
                        New Chat
                    </Button>
                </div>
            </div>
            
            <ConversationGrid conversations={conversations} />
        </div>
    );
}