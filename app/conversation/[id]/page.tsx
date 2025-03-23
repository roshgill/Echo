import { ReadConversation } from "@/components/read-conversation";

type Props = {
    params: { id: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}

// Add proper Next.js page typing
export default async function Page({ params }: Props) {
    return (
        <div className="container mx-auto p-4">
            <ReadConversation conversationId={params.id} />
        </div>
    );
}