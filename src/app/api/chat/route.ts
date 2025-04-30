import { aiFetch } from "@/ai/fetch";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const data = aiFetch({ question: messages });

  return data;
}
