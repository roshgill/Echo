'use server';

import { neon } from '@neondatabase/serverless';

interface Conversation {
  conversationid: string;
  conversationname: string;
}

export async function connectNeonDatabase() {
  const sql = neon(`${process.env.DATABASE_URL}`);
  await sql(`INSERT INTO comments (post_id, user_id, comment_text, created_at)
    VALUES (2, 3, 'This is another sample comment.', NOW())`);
}

// Save conversation and its title to the database
export async function saveConversation(conversationId: string, conversationTitle: string) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    await sql`
      INSERT INTO conversations (conversationId, conversationName)
      VALUES (${conversationId}, ${conversationTitle})
    `;
  } catch (error) {
    console.error('Database error:', error);
  }
}

// Take in messages array and store each message in the database (with conversationId as foreign key)
export async function storeMessages(conversationId: string, messages: {
  messageId: number, 
  messageContent: string, 
  messageRole: string,
  timestamp: string
}[]) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    for (const message of messages) {
      await sql`
        INSERT INTO messages (conversationId, messageId, messageContent, messageRole, timestamp)
        VALUES (${conversationId}, ${message.messageId}, ${message.messageContent}, ${message.messageRole}, ${message.timestamp})
      `;
    }
  } catch (error) {
    console.error('Database error:', error);
  }
}

// Retrieve conversation Ids and titles from the database
export async function getConversationIds() {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const conversations = await sql`
      SELECT 
        conversationId,
        conversationName
      FROM conversations
      ORDER BY conversationId DESC
    `;
    return conversations;
  } catch (error) {
    console.error('Database error:', error);
    return [];
  }
}

// Retrieve messages from the database based on conversationId
export async function getMessages(conversationId: string) {
  try {
    console.log('conversationId:', conversationId);
    const sql = neon(`${process.env.DATABASE_URL}`);
    const messages = await sql`
      SELECT messageId, messageContent, messageRole, timestamp
      FROM messages
      WHERE conversationId = ${conversationId}
      ORDER BY timestamp DESC
    `;
    return messages;

  } catch (error) {
    console.error('Database error:', error);
    return [];
  }
}