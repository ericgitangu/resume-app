import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  ExternalHyperlink,
  BorderStyle,
} from "docx";
import resume from "@/data/resume.json";
import experience from "@/data/experience.json";
import projects from "@/data/projects.json";
import skills from "@/data/skills.json";

// Word document built from src/data/*.json — single source of truth.

function fmtDate(s: string): string {
  if (!s) return "";
  const [y, m] = s.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return m ? `${months[parseInt(m, 10) - 1]} ${y}` : y;
}

function sectionHeader(text: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({ text: text.toUpperCase(), bold: true, size: 22, characterSpacing: 30 }),
    ],
    spacing: { before: 220, after: 80 },
    border: {
      bottom: { color: "555555", space: 1, style: BorderStyle.SINGLE, size: 4 },
    },
  });
}

function bullet(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, size: 19 })],
    bullet: { level: 0 },
    spacing: { after: 30 },
  });
}

function body(text: string, opts: { italic?: boolean; bold?: boolean } = {}): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, size: 19, italics: opts.italic, bold: opts.bold })],
    spacing: { after: 60 },
  });
}

export async function buildResumeDocxBuffer(): Promise<Buffer> {
  const positions = [...experience.positions].sort((a, b) =>
    a.startDate < b.startDate ? 1 : -1,
  );
  const featuredProjects = projects.projects.filter((p) => p.featured).slice(0, 8);

  const children: Paragraph[] = [];

  // Header
  children.push(
    new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [new TextRun({ text: resume.name, bold: true, size: 40 })],
    }),
    new Paragraph({
      children: [new TextRun({ text: resume.title, size: 22, color: "444444" })],
      spacing: { after: 40 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: `${resume.location.primary} · `, size: 18, color: "555555" }),
        new ExternalHyperlink({
          link: `mailto:${resume.contact.email}`,
          children: [new TextRun({ text: resume.contact.email, size: 18, color: "1A4EA3", underline: {} })],
        }),
        new TextRun({ text: ` · ${resume.contact.phone.primary} · `, size: 18, color: "555555" }),
        new ExternalHyperlink({
          link: resume.contact.linkedin,
          children: [new TextRun({ text: "linkedin.com/in/ericgitangu", size: 18, color: "1A4EA3", underline: {} })],
        }),
        new TextRun({ text: " · ", size: 18, color: "555555" }),
        new ExternalHyperlink({
          link: resume.contact.github,
          children: [new TextRun({ text: "github.com/ericgitangu", size: 18, color: "1A4EA3", underline: {} })],
        }),
      ],
      spacing: { after: 200 },
    }),
  );

  // Summary
  children.push(sectionHeader("Professional Summary"));
  children.push(body(resume.summary));

  // Experience
  children.push(sectionHeader("Experience"));
  for (const p of positions) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: `${p.role} — ${p.company}`, bold: true, size: 21 }),
          new TextRun({
            text: `   ${fmtDate(p.startDate)} – ${p.current ? "Present" : fmtDate(p.endDate)} · ${p.location}`,
            size: 18,
            color: "555555",
          }),
        ],
        spacing: { before: 120, after: 30 },
      }),
    );
    children.push(body(p.description, { italic: true }));
    for (const a of p.achievements) children.push(bullet(a));
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: "Stack: ", bold: true, size: 17, color: "555555" }),
          new TextRun({ text: p.technologies.join(" · "), size: 17, color: "1A4EA3" }),
        ],
        spacing: { after: 80 },
      }),
    );
  }

  // Projects
  children.push(sectionHeader("Selected Projects"));
  for (const proj of featuredProjects) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: proj.name, bold: true, size: 21 }),
          ...(proj.demo
            ? [
                new TextRun({ text: " · ", size: 19 }),
                new ExternalHyperlink({
                  link: proj.demo,
                  children: [
                    new TextRun({ text: proj.demo.replace(/^https?:\/\//, ""), size: 19, color: "1A4EA3", underline: {} }),
                  ],
                }),
              ]
            : []),
        ],
        spacing: { before: 80, after: 20 },
      }),
    );
    children.push(body(proj.description));
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: proj.technologies.slice(0, 10).join(" · "), size: 17, color: "1A4EA3" }),
        ],
        spacing: { after: 60 },
      }),
    );
  }

  // Skills
  children.push(sectionHeader("Core Technical Skills"));
  for (const cat of skills.categories) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: `${cat.name}: `, bold: true, size: 19 }),
          new TextRun({ text: cat.skills.map((s) => s.name).join(" · "), size: 19 }),
        ],
        spacing: { after: 60 },
      }),
    );
  }

  // Education
  if (experience.education?.length) {
    children.push(sectionHeader("Education"));
    for (const e of experience.education) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: e.degree, bold: true, size: 20 }),
            ...(e.minor ? [new TextRun({ text: ` · Minor: ${e.minor}`, size: 20 })] : []),
            new TextRun({ text: ` — ${e.institution}`, size: 20 }),
            new TextRun({
              text: `   ${fmtDate(e.startDate)} – ${fmtDate(e.endDate)}`,
              size: 17,
              color: "555555",
            }),
          ],
          spacing: { after: 40 },
        }),
      );
      for (const h of e.honors ?? []) children.push(bullet(h));
    }
  }

  // Achievements
  if (experience.achievements?.length) {
    children.push(sectionHeader("Certifications & Open Source"));
    for (const a of experience.achievements) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${a.title}: `, bold: true, size: 19 }),
            new TextRun({ text: a.description, size: 19 }),
          ],
          bullet: { level: 0 },
          spacing: { after: 40 },
        }),
      );
    }
  }

  const doc = new Document({
    creator: resume.name,
    title: `${resume.name} — Resume`,
    description: resume.title,
    styles: {
      default: {
        document: { run: { font: "Calibri", size: 19 } },
      },
    },
    sections: [
      {
        properties: { page: { margin: { top: 720, right: 720, bottom: 720, left: 720 } } },
        children,
      },
    ],
  });

  return Packer.toBuffer(doc) as Promise<Buffer>;
}
