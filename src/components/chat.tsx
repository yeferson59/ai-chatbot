"use client";

import { useChat } from "@ai-sdk/react";
import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import type { Components } from "react-markdown";
import { MarkdownCode } from "./markdown-code"; // Asegúrate de importar tu componente mejorado

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

  // Auto-scroll al último mensaje
  useEffect(() => {
    if (messagesEndRef.current && scrollAreaRef.current) {
      setTimeout(() => {
        scrollAreaRef.current!.scrollTop = scrollAreaRef.current!.scrollHeight;
      }, 0);
    }
  }, [messages.length]);

  // Componentes de Markdown
  const markdownComponents: Components = {
    h1: ({ children }) => (
      <h1 className="text-xl font-bold my-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-lg font-bold my-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-md font-bold my-2">{children}</h3>
    ),
    p: ({ children }) => <p className="my-2 break-words">{children}</p>,
    ul: ({ children }) => <ul className="list-disc pl-5 my-2">{children}</ul>,
    ol: ({ children }) => (
      <ol className="list-decimal pl-5 my-2">{children}</ol>
    ),
    li: ({ children }) => <li className="my-1">{children}</li>,
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-primary hover:underline break-all"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary/30 pl-4 italic my-2">
        {children}
      </blockquote>
    ),
    code: ({ className, children }) => {
      // Extraer el lenguaje
      const language = className?.replace("language-", "") || undefined;
      const value = String(children).replace(/\n$/, "");

      const isMultiline = !!className; // Si tiene className, es bloque multi-línea

      return isMultiline ? (
        <MarkdownCode language={language} value={value} />
      ) : (
        <code className="bg-secondary/30 px-1 py-0.5 rounded text-sm">
          {children}
        </code>
      );
    },
    table: ({ children }) => (
      <div className="overflow-x-auto my-4">
        <table className="min-w-full divide-y divide-border">{children}</table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-secondary/10">{children}</thead>
    ),
    th: ({ children }) => (
      <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-3 py-2 whitespace-nowrap">{children}</td>
    ),
  };

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
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-center text-muted-foreground">
                <div className="max-w-md p-6 rounded-xl bg-secondary/10 backdrop-blur-sm">
                  <p className="text-xl font-medium mb-2">
                    ¡Bienvenido al chat!
                  </p>
                  <p className="text-sm">
                    Escribe un mensaje para comenzar la conversación.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} min-w-0`}
                  >
                    <div className="flex items-start max-w-[80%] space-x-2 min-w-0">
                      {message.role !== "user" && (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-medium text-primary">
                          AI
                        </div>
                      )}
                      <div
                        className={`p-3 rounded-lg shadow-sm overflow-hidden ${
                          message.role === "user"
                            ? "bg-primary/10 text-foreground border border-primary/20"
                            : "bg-secondary/20 text-foreground border border-secondary/20"
                        }`}
                      >
                        {message.role === "user" ? (
                          <p className="text-sm whitespace-pre-wrap break-words">
                            {message.content}
                          </p>
                        ) : (
                          <div className="markdown-content text-sm w-full max-w-full overflow-hidden break-words">
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={markdownComponents}
                            >
                              {message.content}
                            </ReactMarkdown>
                          </div>
                        )}
                      </div>
                      {message.role === "user" && (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary/20 text-sm font-medium text-foreground">
                          Tú
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {status === "streaming" && (
                  <div className="flex justify-start">
                    <div className="flex items-start max-w-[80%] space-x-2">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-medium text-primary">
                        AI
                      </div>
                      <div className="p-3 rounded-lg bg-secondary/20 text-foreground border border-secondary/20 shadow-sm">
                        <div className="flex space-x-1">
                          <div
                            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          />
                          <div
                            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          />
                          <div
                            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {error && (
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
                        onClick={() => reload()}
                        className="mt-2 bg-destructive/80 hover:bg-destructive text-white font-medium py-1 px-3 rounded-md text-xs transition-colors"
                      >
                        Reintentar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <CardFooter className="border-t border-border/40 p-4 bg-card/95">
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Escribe tu mensaje..."
              className="flex-grow bg-background/50 border-border/50 text-foreground placeholder-muted-foreground focus:ring-primary/30 focus:border-primary/30 rounded-lg shadow-sm"
              disabled={status === "streaming"}
            />
            <Button
              type="submit"
              disabled={status === "streaming" || !input.trim()}
              size="icon"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>

      {/* Estilos globales para el chat */}
      <style jsx global>{`
        /* Asegurar que el contenido de markdown no cause desbordamiento horizontal */
        .markdown-content {
          max-width: 100%;
          overflow-wrap: break-word;
          word-wrap: break-word;
          word-break: break-word;
          hyphens: auto;
        }

        /* Asegurar que los bloques no markdown no desborden */
        .markdown-content > *:not(pre) {
          max-width: 100%;
          overflow-wrap: break-word;
        }

        /* Estilos específicos para los bloques de código */
        .markdown-content pre {
          max-width: 100%;
          overflow-x: auto;
        }
      `}</style>
    </div>
  );
}
