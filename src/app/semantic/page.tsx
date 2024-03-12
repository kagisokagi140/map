"use client";

import { useChat } from "ai/react";

const tweets = [
  {
    id: 1,
    text: "Avoid route 101, there's a major accident causing heavy traffic.",
    category: "accident",
  },
  {
    id: 2,
    text: "Protesters have blocked off Main Street. Find an alternate route.",
    category: "riots",
  },
  {
    id: 3,
    text: "Due to roadblocks on Highway 5, expect significant delays.",
    category: "roadblocks",
  },
  {
    id: 4,
    text: "Route 66 is clear and fast today, no issues reported.",
    category: "none",
  },
  {
    id: 5,
    text: "Heavy police presence on Oak Avenue, possibly due to a protest. Take caution.",
    category: "riots",
  },
  {
    id: 6,
    text: "Accident on the intersection of Elm and Maple, traffic backed up for miles.",
    category: "accident",
  },
];

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === "user" ? "User: " : "AI: "}

          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input + tweets[3].text}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
