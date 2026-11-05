import OpenAI from "openai";

let client: OpenAI | null = null;

export function getOpenAIClient(): OpenAI {
  if (!client) {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      throw new Error("DEEPSEEK_API_KEY is required for AI requests");
    }

    client = new OpenAI({
      baseURL: "https://api.deepseek.com/v1",
      apiKey,
    });
  }

  return client;
}

export const AI_MODEL = "deepseek-chat";
