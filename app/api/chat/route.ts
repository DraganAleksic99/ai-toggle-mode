import { convertToCoreMessages, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    const result = await streamText({
        model: openai("gpt-3.5-turbo-0125"),
        messages: convertToCoreMessages(messages),
        tools: {
            toggleMode: {
                description: `
                    Toggle between light, dark and system mode. Always call this tool when
                     the user asks to set the light, dark or system mode. Call this tool if
                     the user simply prompts "dark mode", "light mode" or "system mode". If
                     the user asks you to do anything else regarding this task, explain why
                     you can't do that.`,
                parameters: z.object({
                    mode: z.enum(["light", "dark", "system"]),
                }),
            },
            clearMessages: {
                description: `
                    Clear messages from chat. Always call this tool when the user asks you
                    to clear messages from the chat. Call this tool if the user simply prompts
                    "clear". If the user asks you to do anything else regarding this task, explain
                    why you can't do that.`,
                parameters: z.object({}),
            }
        }
    });

    return result.toAIStreamResponse();
}