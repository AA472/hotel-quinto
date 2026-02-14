"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect, type FormEvent } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

const WELCOME =
  "Hi! I'm the Hotel Quinto assistant. Ask me anything about our rooms, experiences, location, or booking.\n\nHola! Soy el asistente de Hotel Quinto. Pregúntame sobre habitaciones, experiencias, ubicación o reservas.";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat();

  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const text = input.trim();
    setInput("");
    sendMessage({ text });
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-amber-700 hover:bg-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-105"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:w-[380px] h-[100dvh] sm:h-[520px] bg-white sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-stone-200">
          {/* Header */}
          <div className="bg-[#1a3c34] px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-700/20 flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-amber-400" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Hotel Quinto</p>
                <p className="text-emerald-300/70 text-xs">Virtual Concierge</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/60 hover:text-white transition-colors p-1"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-stone-50">
            {/* Static welcome message */}
            <div className="flex justify-start">
              <div className="max-w-[85%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap bg-white text-stone-700 rounded-2xl rounded-bl-md border border-stone-200 shadow-sm">
                {WELCOME}
              </div>
            </div>

            {/* Dynamic messages */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-amber-700 text-white rounded-2xl rounded-br-md"
                      : "bg-white text-stone-700 rounded-2xl rounded-bl-md border border-stone-200 shadow-sm"
                  }`}
                >
                  {msg.parts
                    .filter((p): p is { type: "text"; text: string } => p.type === "text")
                    .map((p) => p.text)
                    .join("")}
                </div>
              </div>
            ))}

            {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex justify-start">
                <div className="bg-white text-stone-400 rounded-2xl rounded-bl-md border border-stone-200 shadow-sm px-4 py-3">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={onSubmit}
            className="border-t border-stone-200 px-3 py-3 bg-white flex items-center gap-2 shrink-0"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about rooms, booking..."
              className="flex-1 px-3 py-2.5 text-sm bg-stone-100 rounded-xl border-0 outline-none focus:ring-2 focus:ring-amber-700/30 placeholder:text-stone-400"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-10 h-10 rounded-xl bg-amber-700 hover:bg-amber-600 disabled:bg-stone-300 text-white flex items-center justify-center transition-colors shrink-0"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
