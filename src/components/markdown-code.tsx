import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  language?: string;
  value: string;
}

export function MarkdownCode({ language, value }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch (error) {
      console.error("Error al copiar:", error);
    }
  };

  return (
    <div className="relative my-4 rounded-md w-full max-w-full">
      {language && (
        <div className="flex items-center justify-between px-4 py-1.5 bg-secondary/30 text-xs text-muted-foreground">
          <span>{language}</span>
          <button
            onClick={handleCopy}
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
        </div>
      )}

      {/* Contenedor con ancho máximo y scroll interno */}
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
            // Asegurar que el contenido tenga un ancho apropiado
            // para que el scroll funcione correctamente
            maxWidth: "100%",
            minWidth: "auto",
          }}
          wrapLongLines={false} // Importante: NO envolver líneas largas
          wrapLines={false} // No forzar wrap en líneas
        >
          {value}
        </SyntaxHighlighter>
      </div>

      {/* Estilos globales específicos para los bloques de código */}
      <style jsx global>{`
        /* Asegurar que los bloques pre dentro de SyntaxHighlighter no rompan el layout */
        pre {
          white-space: pre !important;
          overflow-x: auto !important;
          max-width: 100% !important;
        }

        /* Estilos para la barra de scroll */
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
