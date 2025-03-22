import { useEffect, useState } from 'react';

interface MarqueeProps {
  conversations: { conversationId: string; conversationName: string; }[];
}

export function ConversationMarquee({ conversations }: MarqueeProps) {
  // Duplicate the items to create seamless loop
  const duplicatedItems = [...conversations, ...conversations];

  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {duplicatedItems.map((conv, index) => (
          <div key={`${conv.conversationId}-${index}`} className="conversation-box">
            {conv.conversationName}
          </div>
        ))}
      </div>
      <style jsx>{`
        .marquee-container {
          width: 100%;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.05);
          padding: 1rem 0;
        }

        .marquee-content {
          display: flex;
          animation: scroll 40s linear infinite;
          gap: 2rem;
        }

        .conversation-box {
          background: white;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          white-space: nowrap;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
