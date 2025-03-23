"use client";

import { useRouter } from "next/navigation";
import { encode } from "punycode";

interface Conversation {
    conversationId: string;
    conversationName: string;
}

export function ConversationGrid({ conversations }: { conversations: Conversation[] }) {
    const router = useRouter();

    const handleConversationClick = (conversationId: string) => {
        router.push(`/conversation/${conversationId}`);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {conversations.map((conv) => (
                    <div
                        key={conv.conversationId}
                        className="p-6 bg-white/10 rounded-lg cursor-pointer hover:bg-white/20 transition-all"
                        onClick={() => handleConversationClick(conv.conversationId)}
                    >
                        <h3 className="text-white text-lg font-semibold text-center">
                            {conv.conversationName}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    );
}
