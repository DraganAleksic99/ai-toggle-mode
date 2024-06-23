import { convertToCoreMessages, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    const result = await streamText({
        model: openai("gpt-3.5-turbo"),
        messages: convertToCoreMessages(messages),
        tools: {
            toggleMode: {
                description: `
                    Toggle between light and dark mode. Always call this tool when
                     the user asks to set the light or dark mode. Call this tool if
                     the user simply prompts "dark mode" or "light mode"`,
                parameters: z.object({
                    mode: z.enum(["light", "dark", "system"]),
                }),
            }
        }
    });

    return result.toAIStreamResponse();
}