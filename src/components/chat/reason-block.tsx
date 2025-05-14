import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export const ReasoningBlock = ({
  details,
}: {
  details: (
    | { type: "text"; text: string; signature?: string }
    | { type: "redacted"; data: string }
  )[];
}) => {
  const [collapsed, setCollapsed] = useState(true);
  const MAX_LINES = 6;

  const visibleDetails = collapsed ? details.slice(0, MAX_LINES) : details;
  const hiddenLinesCount = details.length - MAX_LINES;
  const hasHiddenContent = collapsed && hiddenLinesCount > 0;

  return (
    <div className="bg-muted/20 border-l-4 border-primary/50 px-4 py-2 my-2 rounded-md text-sm font-mono whitespace-pre-wrap text-muted-foreground">
      <div className="flex items-center justify-between mb-1">
        <div className="font-semibold text-primary">Razonamiento:</div>
        {details.length > MAX_LINES && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-xs text-primary hover:underline flex items-center"
          >
            {collapsed ? (
              <>
                Mostrar más <ChevronDown className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                Mostrar menos <ChevronUp className="ml-1 h-4 w-4" />
              </>
            )}
          </button>
        )}
      </div>

      {visibleDetails.map((detail, i) => (
        <div key={i}>
          {detail.type === "text" ? detail.text : "<contenido oculto>"}
        </div>
      ))}

      {hasHiddenContent && (
        <div className="text-xs italic text-muted-foreground mt-1">
          ({hiddenLinesCount} líneas ocultas)
        </div>
      )}
    </div>
  );
};
