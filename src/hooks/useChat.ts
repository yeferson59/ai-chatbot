import { useEffect, useCallback } from "react";

export const useScrollToBottom = (
  scrollAreaRef: React.RefObject<HTMLDivElement | null>,
  messagesEndRef: React.RefObject<HTMLDivElement | null>,
  messages: { id: string }[],
): void => {
  const handleScrollToBottom = useCallback((): void => {
    if (scrollAreaRef.current?.scrollHeight && messagesEndRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [scrollAreaRef, messagesEndRef]);

  useEffect(() => {
    const rafId = requestAnimationFrame(handleScrollToBottom);
    return () => cancelAnimationFrame(rafId);
  }, [messages.length, handleScrollToBottom]);
};
