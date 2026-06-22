// Regenerate the static downloadable resume artifacts from the app's OWN generators
// (same code = identical theme), now reflecting the updated experience data
// (Moovn current, Ignite Energy Access ended Jan 2026). Run: `tsx scripts/gen-resume.mts`.
import { writeFileSync } from "node:fs";
import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";

// Dynamic imports avoid a tsx ESM static-link quirk with the .tsx PDF module.
const { buildResumeDocxBuffer } = await import("@/lib/resume-docx");
const docx = await buildResumeDocxBuffer();
writeFileSync("public/Eric_Gitangu_Resume.docx", docx);
console.log("✓ public/Eric_Gitangu_Resume.docx", docx.length, "bytes");

const pdfMod = await import("@/lib/resume-pdf");
const pdf = await renderToBuffer(React.createElement(pdfMod.ResumeDocument));
writeFileSync("public/Eric_Gitangu_Resume.pdf", pdf);
console.log("✓ public/Eric_Gitangu_Resume.pdf", pdf.length, "bytes");
