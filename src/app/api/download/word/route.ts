import { NextResponse } from "next/server";
import { buildResumeDocxBuffer } from "@/lib/resume-docx";
import resume from "@/data/resume.json";

// Dynamically render the resume DOCX from src/data/*.json so edits to the
// resume / experience / projects / skills data propagate on the next request.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const buffer = await buildResumeDocxBuffer();
    const filename = `${resume.name.replace(/\s+/g, "_")}_Resume.docx`;

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Length": buffer.length.toString(),
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "public, max-age=300, must-revalidate",
        "X-File-Size": buffer.length.toString(),
        "X-File-Name": filename,
        "X-File-Type": "docx",
        "X-Generated-At": new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("DOCX render error:", error);
    return new NextResponse(
      JSON.stringify({
        error: "Render failed",
        message: error instanceof Error ? error.message : "Unknown error rendering resume DOCX.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
