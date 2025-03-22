import { ChatInterface } from "@/components/chat-interface";
import { HeroPage } from "@/components/hero-page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <div className="flex flex-grow gap-2 pt-4">
        <HeroPage />
      </div>
    </main>
  );
}