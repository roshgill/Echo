"use client";

import { getMessages } from "@/app/actions/database";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Message {
    messageId: number;
    messageContent: string;
    messageRole: string;
    timestamp: string;
}

export function ReadConversation({ conversationId }: { conversationId: string }) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchMessages() {
            try {
                const fetchedMessages = await getMessages(conversationId);
                console.log("Fetched messages:", fetchedMessages);
                // Ensure all messages have required properties
                const validMessages = fetchedMessages.map((msg, index) => ({
                    messageId: msg.messageid || index,
                    messageContent: msg.messagecontent || '',
                    messageRole: msg.messagerole || 'assistant',
                    timestamp: msg.timestamp || new Date().toISOString()
                }));
                setMessages(validMessages);
            } catch (error) {
                console.error("Error fetching messages:", error);
                setMessages([]);
            } finally {
                setLoading(false);
            }
        }

        fetchMessages();
    }, [conversationId]);

    if (loading) {
        return (
            <div>
                <div>Loading conversation...</div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-end items-center p-4 space-x-2">
                <Button 
                    onClick={() => window.location.href = '/'}
                    className="bg-secondary text-secondary-foreground"
                >
                    Home
                </Button>
                <Button 
                    onClick={() => router.push('/chat-interface')}
                    className="bg-primary text-primary-foreground"
                >
                    New Chat
                </Button>
            </div>
            <div className="space-y-6"> {/* Added space-y-6 for vertical spacing */}
                {[...messages].reverse().map((message) => (
                    <div key={message.messageId}>
                        <div>
                            {(message.messageRole || 'ASSISTANT').toUpperCase()}
                        </div>
                        <div>
                            {message.messageContent || 'No content available'}
                        </div>
                        <div>
                            {new Date(message.timestamp || Date.now()).toLocaleString()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
