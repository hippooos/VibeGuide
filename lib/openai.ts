import OpenAI from "openai";

export const openai = new OpenAI({
  baseURL: "https://api.deepseek.com/v1",
  apiKey: process.env.DEEPSEEK_API_KEY,
});

export const AI_MODEL = "deepseek-chat";
