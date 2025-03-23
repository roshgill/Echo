import { ReadConversation } from "@/components/read-conversation";

interface PageProps {
    params: {
        id: string;
    };
}

export default async function Page({ 
    params
}: PageProps) {
    return (
        <div className="container mx-auto p-4">
            <ReadConversation conversationId={params.id} />
        </div>
    );
}
