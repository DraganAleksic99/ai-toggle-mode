"use client";

import { Message, useChat } from "ai/react";
import { useTheme } from "next-themes";
import { useRef, useEffect } from "react";

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { setTheme } = useTheme();
  const { messages, input, handleSubmit, handleInputChange } = useChat({
    maxToolRoundtrips: 5,
    async onToolCall({ toolCall }) {
      if (toolCall.toolName === "toggleMode") {
        // @ts-ignore
        setTheme(toolCall.args.mode as string);
        return "Mode has been set";
      }
    },
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col gap-5 xl:w-1/2 mx-auto px-20">
      {messages?.filter(m => m.content )?.map((m: Message) => (
        <div key={m.id} className="w-fit bg-slate-300 dark:bg-slate-600 rounded-lg p-2 px-3">
          <strong className="mr-2">{m.role}:</strong>
          {m.content}
          <br />
        </div>
      ))}

      <form onSubmit={handleSubmit} className="my-6">
        <input
          ref={inputRef}
          value={input}
          onChange={handleInputChange}
          className="border border-black rounded-full p-1 px-3 w-full"
          placeholder="Send a message."
        />
      </form>
    </div>
    </main>
  );
}
