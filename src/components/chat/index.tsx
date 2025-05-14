"use client";

import { useMemo, useRef, memo } from "react";
import { useChat } from "@ai-sdk/react";
import { MemoizedInput } from "@/components/ui/input";
import { MemoizedButton } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { markdownComponents } from "@/utils/markdownUtils";
import { useScrollToBottom } from "@/hooks/useChat";
import type { UIMessage } from "ai";
import { ReasoningBlock } from "./reason-block";

// Componentes memorizados para mejorar el rendimiento
const WelcomeMessage = memo(function WelcomeMessage() {
  return (
    <div className="flex items-center justify-center h-full text-center text-muted-foreground">
      <div className="max-w-md p-6 rounded-xl bg-secondary/10 backdrop-blur-sm">
        <p className="text-xl font-medium mb-2">¡Bienvenido al chat!</p>
        <p className="text-sm">
          Escribe un mensaje para comenzar la conversación.
        </p>
      </div>
    </div>
  );
});

const ChatMessage = memo(function ChatMessage({
  message,
}: {
  message: UIMessage;
}) {
  const isUser = message.role === "user";

  const renderPart = (part: (typeof message.parts)[0], index: number) => {
    if (part.type === "text") {
      return (
        <ReactMarkdown
          key={index}
          remarkPlugins={[remarkGfm]}
          components={markdownComponents}
        >
          {part.text}
        </ReactMarkdown>
      );
    }

    if (part.type === "reasoning") {
      return <ReasoningBlock key={index} details={part.details} />;
    }

    return null;
  };

  const messageContent = message.parts ? (
    message.parts.map(renderPart)
  ) : (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
      {message.content}
    </ReactMarkdown>
  );

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} min-w-0`}>
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-medium text-primary">
          AI
        </div>
      )}
      <div
        className={`p-3 rounded-lg shadow-sm overflow-hidden max-w-[80%] ${
          isUser
            ? "bg-primary/10 text-foreground border border-primary/20"
            : "bg-secondary/20 text-foreground border border-secondary/20"
        }`}
      >
        {messageContent}
      </div>
      {isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary/20 text-sm font-medium text-foreground">
          Tú
        </div>
      )}
    </div>
  );
});

const LoadingIndicator = () => (
  <div className="flex justify-start">
    <div className="flex items-start max-w-[80%] space-x-2">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-medium text-primary">
        AI
      </div>
      <div className="p-3 rounded-lg bg-secondary/20 text-foreground border border-secondary/20 shadow-sm">
        <div className="flex space-x-1">
          {[0, 150, 300].map((delay) => (
            <div
              key={delay}
              className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ErrorMessage = ({ onRetry }: { onRetry: () => void }) => (
  <div className="flex justify-center my-4">
    <div
      className="bg-destructive/10 border border-destructive/30 text-destructive-foreground px-4 py-3 rounded-lg relative shadow-sm"
      role="alert"
    >
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">
        Ocurrió un error al procesar tu mensaje.
      </span>
      <button
        type="button"
        onClick={onRetry}
        className="mt-2 bg-destructive/80 hover:bg-destructive text-white font-medium py-1 px-3 rounded-md text-xs transition-colors"
      >
        Reintentar
      </button>
    </div>
  </div>
);

export function Chat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    error,
    reload,
    status,
  } = useChat({});

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Usar directamente los mensajes del hook principal
  useScrollToBottom(scrollAreaRef, messagesEndRef, messages);

  // Memorizar el contenido de mensajes para prevenir renderizados innecesarios
  const messageContent = useMemo(() => {
    if (messages.length === 0) return <WelcomeMessage />;

    return (
      <div className="space-y-6">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
    );
  }, [messages]);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <Card className="w-full max-w-3xl h-[70vh] flex flex-col rounded-xl overflow-hidden border-border/50 shadow-lg">
        <CardHeader className="border-b border-border/40 py-4 bg-card/95">
          <CardTitle className="text-xl font-medium">Chat con IA</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow p-0 relative bg-background/50 min-w-0 overflow-hidden">
          <div
            ref={scrollAreaRef}
            className="h-full overflow-y-auto p-4 scrollbar-thin min-w-0"
            style={{
              maxHeight: "calc(70vh - 130px)",
              scrollbarWidth: "thin",
              scrollbarColor: "var(--border) var(--background)",
            }}
          >
            {messageContent}
            {status === "streaming" && <LoadingIndicator />}
            {error && <ErrorMessage onRetry={reload} />}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <CardFooter className="border-t border-border/40 p-4 bg-card/95">
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <MemoizedInput
              value={input}
              onChange={handleInputChange}
              placeholder="Escribe tu mensaje..."
              className="flex-grow bg-background/50 border-border/50 text-foreground placeholder-muted-foreground focus:ring-primary/30 focus:border-primary/30 rounded-lg shadow-sm"
              disabled={status === "streaming"}
            />
            <MemoizedButton
              type="submit"
              disabled={status === "streaming" || !input.trim()}
              size="icon"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-sm"
            >
              <Send className="h-4 w-4" />
            </MemoizedButton>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
