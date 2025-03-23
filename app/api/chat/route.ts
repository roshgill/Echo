import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { generateObject } from 'ai';
import { z } from 'zod';

export async function POST(req: Request) {
  const { messages, flashcardsList } = await req.json();

  if(!flashcardsList) {
    const result = streamText({
      model: openai('gpt-4o'),
      messages
    });
    return result.toDataStreamResponse();
  }
  else {

    // Build a prompt that includes the existing flashcards list.
    const prompt = `Current Conversation: ${JSON.stringify(messages)} | Currently created flashcards: ${JSON.stringify(
      flashcardsList
    )}`;

    // const prompt = 'Analyse the conversation and the already created flashcards. Return new flashcards that correspond to the current back and forth.';

    const result = await generateObject({
      model: openai('gpt-4o'),
      system: `Analyze the provided conversation and return a new title description of the conversation in less than 10 words. Make each one viral worthy. Don't be corny though.`,
      prompt: prompt,
      schema: z.object({
        flashcards: z.array(
          z.object({
            front: z.string().describe('Cloze flashcard front. Use {{c1::...}} to hide the term or phrase.'),
            //back: z.string().describe('Back of the flashcard.'),
            reason: z.string().describe('Reason for creation of flashcard. This could be the context or the conversation that led to the creation of the flashcard. Keep it very brief.'),
          }),
        ),
      }),
    });
    return result.toJsonResponse();
  }

}