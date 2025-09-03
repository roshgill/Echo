# Echo

**Share your AI conversations with the world**

Echo is a modern web platform where you can have conversations with GPT-4o and share the interesting ones publicly for others to discover and learn from. Think of it as a social network for AI conversations.

## What is Echo?

Echo lets you:
- Chat with OpenAI's GPT-4o in a clean, modern interface
- Save your conversations with custom titles
- Share your best conversations publicly
- Browse and read conversations shared by others
- Discover interesting AI interactions from the community

Whether you're exploring creative ideas, learning new concepts, or solving problems with AI, Echo makes it easy to preserve and share those valuable conversations.

## Key Features

- **AI Chat Interface**: Powered by GPT-4o with streaming responses
- **Conversation Management**: Save chats with custom titles and timestamps  
- **Public Sharing**: Post conversations to a public feed for others to explore
- **Browse Conversations**: Discover interesting AI conversations from other users
- **Responsive Design**: Works great on desktop and mobile devices
- **Real-time Updates**: See conversations as they happen with streaming responses

## Technology Stack

Echo is built with modern web technologies:

**Frontend:**
- **Next.js 14** - React framework for production
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - High-quality, accessible UI components

**Backend & AI:**
- **OpenAI GPT-4o** - Latest AI model via AI SDK
- **Neon Database** - Serverless PostgreSQL for storing conversations
- **Vercel AI SDK** - Streaming AI responses and chat management

**Key Libraries:**
- `@ai-sdk/openai` - OpenAI integration
- `@ai-sdk/react` - React hooks for AI interactions
- `react-markdown` - Markdown rendering for AI responses
- Various Radix UI components for the interface

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key
- Neon Database connection string

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/roshgill/Echo.git
   cd Echo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   DATABASE_URL=your_neon_database_connection_string
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to start using Echo

## Code Structure

The project follows Next.js 14 conventions with a clean, modular structure:

### Core Components

**`/app`** - Next.js App Router structure
- `page.tsx` - Home page showing public conversations
- `chat-interface/` - Main chat interface for talking with GPT-4o
- `conversation/[id]/` - Individual conversation viewer
- `api/chat/` - AI chat API endpoint using OpenAI SDK

**`/components`** - Reusable React components  
- `hero-page.tsx` - Landing page with conversation grid
- `chat-interface.tsx` - Main chat UI with streaming messages
- `conversation-grid.tsx` - Grid layout for browsing conversations
- `ui/` - Radix UI component library setup

**`/app/actions`** - Server actions for database operations
- `database.ts` - All database queries (save/retrieve conversations and messages)

### How it Works

1. **Chat Flow**: Users type messages → sent to `/api/chat` → OpenAI processes → streaming response back to UI
2. **Saving**: Conversations stored in Neon DB with unique IDs and timestamps
3. **Sharing**: Users can post conversations publicly with titles
4. **Browsing**: Public conversations displayed in a responsive grid on the home page

### Database Schema

The app uses two main tables:
- **conversations** - Stores conversation metadata (ID, title, timestamp)
- **messages** - Stores individual messages linked to conversations (content, role, timestamp)

## Usage

1. **Start a Chat**: Click "New Chat" to begin a conversation with GPT-4o
2. **Have a Conversation**: Type your message and get AI responses in real-time
3. **Save & Share**: Add a title and click "Post to Public" to share your conversation
4. **Explore**: Browse the home page to discover conversations shared by others
5. **Read**: Click any conversation card to read the full chat history

## Contributing

This project is open for contributions. Feel free to submit issues, feature requests, or pull requests to help make Echo better for everyone.

## License

Open source - check the repository for license details.
