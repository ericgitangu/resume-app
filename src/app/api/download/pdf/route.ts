import { createElement } from "react";
import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { ResumeDocument } from "@/lib/resume-pdf";
import resume from "@/data/resume.json";

// Dynamically render the resume PDF from src/data/*.json so edits to the
// resume / experience / projects / skills data propagate on the next request.
// No more stale static file in public/.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const buffer = await renderToBuffer(createElement(ResumeDocument));
    const filename = `${resume.name.replace(/\s+/g, "_")}_Resume.pdf`;

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Length": buffer.length.toString(),
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "public, max-age=300, must-revalidate",
        "X-File-Size": buffer.length.toString(),
        "X-File-Name": filename,
        "X-File-Type": "pdf",
        "X-Generated-At": new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("PDF render error:", error);
    return new NextResponse(
      JSON.stringify({
        error: "Render failed",
        message: error instanceof Error ? error.message : "Unknown error rendering resume PDF.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
