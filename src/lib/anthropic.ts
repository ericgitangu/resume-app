import Anthropic from "@anthropic-ai/sdk";

// Only create client if API key is available (not during build)
export const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null;

export const CHAT_MODEL = "claude-sonnet-4-20250514";
