import { ChatInterface } from "@/components/chat-interface";
import { HeroPage } from "@/components/hero-page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="">
        <HeroPage />
      </div>
    </main>
  );
}