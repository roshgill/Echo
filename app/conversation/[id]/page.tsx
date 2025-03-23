import { ReadConversation } from "@/components/read-conversation";

export default function ConversationPage({ params }: { params: { id: string } }) {
    return <ReadConversation conversationId={params.id} />;
}
