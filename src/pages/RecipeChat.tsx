import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ───────────────────────────────────────────────────────────────────

type Role = "user" | "model";

type Message = {
  id: string;
  role: Role;
  content: string;
};

// ─── Constants ───────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are Ember, an expert chef and culinary guide. You help users discover recipes, cooking techniques, food pairings, and culinary traditions from around the world.

Be warm, enthusiastic, and knowledgeable. Keep responses concise but useful. Use emojis occasionally to add personality. When sharing recipes, format them clearly with ingredients and steps.`;

const SUGGESTED_PROMPTS = [
  "Give me a quick 30-minute pasta recipe",
  "What are the best spices for grilling chicken?",
  "Teach me how to make sushi at home",
  "What's a classic French dish I should learn?",
  "How do I make the perfect chocolate lava cake?",
];

const LS_KEY = "charcoal_gemini_key";

// ─── RecipeChat page ──────────────────────────────────────────────────────────

export default function RecipeChat() {
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(
    () => localStorage.getItem(LS_KEY) ?? "",
  );
  const [keyDraft, setKeyDraft] = useState("");
  const [showKeyInput, setShowKeyInput] = useState(
    !localStorage.getItem(LS_KEY),
  );
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-populate from ?q= param (e.g. from Explore page)
  useEffect(() => {
    const q = searchParams.get("q");
    if (q && apiKey) {
      sendMessage(q);
    } else if (q) {
      setInput(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function saveKey() {
    const trimmed = keyDraft.trim();
    if (!trimmed) return;
    localStorage.setItem(LS_KEY, trimmed);
    setApiKey(trimmed);
    setShowKeyInput(false);
    setKeyDraft("");
  }

  function clearKey() {
    localStorage.removeItem(LS_KEY);
    setApiKey("");
    setShowKeyInput(true);
    setMessages([]);
  }

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading || !apiKey) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Build history for Gemini — previous messages + current user message
    const history = [...messages, userMsg].map((m) => ({
      role: m.role,
      parts: [{ text: m.content }],
    }));

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: SYSTEM_PROMPT }],
            },
            contents: history,
          }),
        },
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(
          (err as { error?: { message?: string } }).error?.message ??
            `HTTP ${res.status}`,
        );
      }

      const data = (await res.json()) as {
        candidates?: { content?: { parts?: { text?: string }[] } }[];
      };

      const replyText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ??
        "Sorry, I couldn't generate a response.";

      const modelMsg: Message = {
        id: crypto.randomUUID(),
        role: "model",
        content: replyText,
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Unknown error";
      const errorMsg: Message = {
        id: crypto.randomUUID(),
        role: "model",
        content: `⚠️ Error: ${errMsg}. Please check your API key and try again.`,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 65px)" }}>
      {/* ── API key setup banner ── */}
      <AnimatePresence>
        {showKeyInput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-border bg-card/60 px-4 py-3 backdrop-blur-sm"
          >
            <div className="mx-auto max-w-2xl flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon icon="ph:key" width={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">
                    Google Gemini API key required
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Your key is stored only in your browser.{" "}
                    <a
                      href="https://aistudio.google.com/apikey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Get a free key →
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  type="password"
                  placeholder="AIzaSy…"
                  value={keyDraft}
                  onChange={(e) => setKeyDraft(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && saveKey()}
                  className="flex-1 h-9 rounded-lg border border-border bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  autoComplete="off"
                />
                <button
                  onClick={saveKey}
                  disabled={!keyDraft.trim()}
                  className="h-9 px-4 text-xs font-medium rounded-lg bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                  Save
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Chat area ── */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-2xl flex flex-col gap-4">
          {/* Empty state */}
          {!hasMessages && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center text-center gap-6 py-16"
            >
              <div className="relative">
                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-40 w-40 rounded-full bg-primary/20 blur-3xl"
                  aria-hidden
                />
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card shadow-[0_0_0_4px_hsl(var(--primary)/0.08)]">
                  <Icon
                    icon="ph:chef-hat"
                    className="text-primary"
                    width={32}
                  />
                </div>
              </div>
              <div>
                <h2 className="font-heading text-2xl font-semibold">
                  Meet Ember
                </h2>
                <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                  Your AI culinary guide. Ask me for recipes, cooking tips, or
                  food inspiration from around the world.
                </p>
              </div>

              {/* Suggested prompts */}
              {apiKey && (
                <div className="flex flex-col gap-2 w-full max-w-md">
                  <p className="text-xs text-muted-foreground">Try asking…</p>
                  <div className="flex flex-col gap-2">
                    {SUGGESTED_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => sendMessage(prompt)}
                        className="text-left rounded-xl border border-border bg-card px-4 py-2.5 text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {!apiKey && (
                <p className="text-xs text-muted-foreground">
                  Add your API key above to start chatting.
                </p>
              )}
            </motion.div>
          )}

          {/* Messages */}
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar */}
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-primary"
                }`}
              >
                {msg.role === "user" ? (
                  <Icon icon="ph:user" width={16} />
                ) : (
                  <Icon icon="ph:chef-hat" width={16} />
                )}
              </div>

              {/* Bubble */}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                    : "bg-card border border-border text-foreground rounded-tl-sm"
                }`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}

          {/* Loading indicator */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-card border border-border text-primary">
                <Icon icon="ph:chef-hat" width={16} />
              </div>
              <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-border bg-card px-4 py-3">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* ── Input bar ── */}
      <div className="border-t border-border bg-background/80 backdrop-blur-xl px-4 py-3">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                apiKey
                  ? "Ask Ember anything about food…"
                  : "Add your API key to start chatting"
              }
              disabled={!apiKey || loading}
              className="flex-1 resize-none rounded-xl border border-border bg-card px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 max-h-32 overflow-y-auto"
              style={{ minHeight: "42px" }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading || !apiKey}
              className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              <Icon icon="ph:paper-plane-tilt" width={18} />
            </button>
          </div>

          {/* Footer row: key management */}
          <div className="mt-1.5 flex items-center justify-between px-0.5">
            <p className="text-[10px] text-muted-foreground">
              Shift+Enter for new line · Enter to send
            </p>
            {apiKey && (
              <button
                onClick={() => setShowKeyInput((v) => !v)}
                className="text-[10px] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                <Icon icon="ph:key" width={10} />
                {showKeyInput ? "Hide key" : "Change key"}
              </button>
            )}
            {apiKey && !showKeyInput && (
              <button
                onClick={clearKey}
                className="text-[10px] text-muted-foreground hover:text-foreground transition-colors ml-2"
              >
                Clear key
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
