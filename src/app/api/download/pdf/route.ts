import { NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";

export async function GET() {
  try {
    const pdfPath = path.join(process.cwd(), "public", "Eric_Gitangu_Resume.pdf");

    if (!fs.existsSync(pdfPath)) {
      return new NextResponse(
        JSON.stringify({ error: "Resume PDF not available", message: "Please contact Eric directly." }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const fileBuffer = fs.readFileSync(pdfPath);
    const stats = fs.statSync(pdfPath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Length": stats.size.toString(),
        "Content-Disposition": 'attachment; filename="Eric_Gitangu_Resume.pdf"',
        "Cache-Control": "public, max-age=3600",
        "X-File-Size": stats.size.toString(),
        "X-File-Name": "Eric_Gitangu_Resume.pdf",
        "X-File-Type": "pdf",
      },
    });
  } catch (error) {
    console.error("PDF download error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Download failed", message: "An error occurred while downloading the resume." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
