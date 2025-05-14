import { memo, useCallback, useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  language?: string;
  value: string;
}

const CopyButton = memo(
  ({ copied, onClick }: { copied: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className="flex items-center gap-1 hover:text-foreground transition-colors"
      aria-label="Copiar código"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" />
          <span>Copiado</span>
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          <span>Copiar</span>
        </>
      )}
    </button>
  ),
);
CopyButton.displayName = "CopyButton";

export function MarkdownCode({ language, value }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch (error) {
      console.error("Error al copiar:", error);
    }
  }, [value]);

  return (
    <div className="relative my-4 rounded-md w-full max-w-full">
      {language && (
        <div className="flex items-center justify-between px-4 py-1.5 bg-secondary/30 text-xs text-muted-foreground">
          <span>{language}</span>
          <CopyButton copied={copied} onClick={handleCopy} />
        </div>
      )}

      <div className="overflow-x-auto max-w-full">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          showLineNumbers={false}
          customStyle={{
            margin: 0,
            borderRadius: "0 0 0.375rem 0.375rem",
            fontSize: "0.95em",
            padding: "1em",
            maxWidth: "100%",
            minWidth: "auto",
          }}
          wrapLongLines={false}
          wrapLines={false}
        >
          {value}
        </SyntaxHighlighter>
      </div>

      <style jsx global>{`
        pre {
          white-space: pre !important;
          overflow-x: auto !important;
          max-width: 100% !important;
        }

        .overflow-x-auto::-webkit-scrollbar {
          height: 6px;
        }

        .overflow-x-auto::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 3px;
        }

        .overflow-x-auto::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 3px;
        }

        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
}
