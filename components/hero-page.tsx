"use client";

import {getConversationIds, getMessages} from "@/app/actions/database";
import { useEffect, useState } from "react";

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
    // const [databaseConversations, setDatabaseConversation] = useState<Conversation | null>(null);
    // const [messages, setMessages] = useState<Message[]>([]);
    
    useEffect(() => {
        async function fetchData() {
          try {
            const conv = await getConversationIds();
            console.log("Database Conversation:", conv);
      
            if (conv && !Array.isArray(conv)) {
              // Map lower-case keys to your expected camelCase keys
              const mappedConversation: Conversation = {
                conversationId: conv.conversationid,
                conversationName: conv.conversationname,
              };
      
              console.log("Conversation found:", mappedConversation);
              const messages = await getMessages(mappedConversation.conversationId);
              console.log("Database Messages:", messages);
            } else {
              console.log("No conversation found.");
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
        fetchData();
      }, []);
    
    return (
        <div>
            <h1>Hero Page</h1>
        </div>
    );
}