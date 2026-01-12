import { anthropic, CHAT_MODEL } from "@/lib/anthropic";
import { SYSTEM_PROMPT, getRelevantContext } from "@/lib/rag";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    if (!anthropic) {
      return new Response("Anthropic API key not configured", { status: 503 });
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response("Invalid messages format", { status: 400 });
    }

    // Get resume context
    const context = getRelevantContext();

    // Build system prompt with context
    const systemPrompt = `${SYSTEM_PROMPT}\n\n---\n\nHere is Eric's complete professional profile for reference:\n\n${context}`;

    // Convert messages to Anthropic format (role: user/assistant only)
    const anthropicMessages = messages.map((msg: { role: string; content: string }) => ({
      role: (msg.role === "user" ? "user" : "assistant") as "user" | "assistant",
      content: msg.content,
    }));

    // Create streaming response with Claude
    const response = await anthropic.messages.stream({
      model: CHAT_MODEL,
      max_tokens: 1000,
      system: systemPrompt,
      messages: anthropicMessages,
    });

    // Convert to readable stream
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        for await (const event of response) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
