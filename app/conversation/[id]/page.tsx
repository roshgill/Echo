import { ReadConversation } from "@/components/read-conversation";

type PageProps = {
    params: {
        id: string;
    };
    searchParams: { [key: string]: string | string[] | undefined };
};

export default async function ConversationPage({ 
    params,
    searchParams 
}: PageProps) {
    return (
        <div className="container mx-auto p-4">
            <ReadConversation conversationId={params.id} />
        </div>
    );
}
