import { NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";

export async function GET() {
  try {
    const docPath = path.join(process.cwd(), "public", "Eric_Gitangu_Resume.docx");

    if (!fs.existsSync(docPath)) {
      return new NextResponse(
        JSON.stringify({ error: "Resume Word document not available", message: "Please contact Eric directly." }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const fileBuffer = fs.readFileSync(docPath);
    const stats = fs.statSync(docPath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Length": stats.size.toString(),
        "Content-Disposition": 'attachment; filename="Eric_Gitangu_Resume.docx"',
        "Cache-Control": "public, max-age=3600",
        "X-File-Size": stats.size.toString(),
        "X-File-Name": "Eric_Gitangu_Resume.docx",
        "X-File-Type": "word",
      },
    });
  } catch (error) {
    console.error("Word download error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Download failed", message: "An error occurred while downloading the resume." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
