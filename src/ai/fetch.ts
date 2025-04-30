import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { Message, streamText } from "ai";
import { model, openRouterToken } from "@/config/env.config";

export const aiFetch = async ({
  question,
  modelName = model,
}: {
  question: Message[];
  modelName?: string;
}) => {
  const openrouter = createOpenRouter({
    apiKey: openRouterToken,
  });
  const response = streamText({
    model: openrouter(modelName),
    messages: question,
  });
  return response.toDataStreamResponse();
};
