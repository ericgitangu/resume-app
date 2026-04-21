import resumeData from "@/data/resume.json";
import experienceData from "@/data/experience.json";
import skillsData from "@/data/skills.json";
import certsData from "@/data/certifications.json";
import projectsData from "@/data/projects.json";

// Build comprehensive context from all resume data
export function buildResumeContext(): string {
  const sections: string[] = [];

  // Basic info
  sections.push(`
## About Eric Gitangu
Name: ${resumeData.name} (${resumeData.nickname})
Title: ${resumeData.title} - ${resumeData.subtitle}
Location: ${resumeData.location.primary} (also ${resumeData.location.secondary})
Phone: ${resumeData.contact.phone}
Email: ${resumeData.contact.email}
LinkedIn: ${resumeData.contact.linkedin}
GitHub: ${resumeData.contact.github}
Portfolio: ${resumeData.contact.portfolio}

Years of Experience: ${resumeData.yearsOfExperience}+
Total Certifications: ${resumeData.certificationsCount}+

Summary: ${resumeData.summary}

Key Highlights:
${resumeData.highlights.map((h) => `- ${h}`).join("\n")}
`);

  // Work Experience
  sections.push(`
## Work Experience

${experienceData.positions
  .map(
    (pos) => `
### ${pos.company}
Role: ${pos.role}
Location: ${pos.location}
Period: ${pos.startDate} to ${pos.current ? "Present" : pos.endDate}
Type: ${pos.type}

Description: ${pos.description}

Achievements:
${pos.achievements.map((a) => `- ${a}`).join("\n")}

Technologies: ${pos.technologies.join(", ")}
`
  )
  .join("\n")}
`);

  // Education
  sections.push(`
## Education

${experienceData.education
  .map(
    (edu) => `
### ${edu.institution}
Degree: ${edu.degree}
Minor: ${edu.minor}
Period: ${edu.startDate} to ${edu.endDate}

Honors:
${edu.honors.map((h) => `- ${h}`).join("\n")}
`
  )
  .join("\n")}
`);

  // Achievements
  if (experienceData.achievements) {
    sections.push(`
## Honors & Achievements

${experienceData.achievements
  .map(
    (a: { title: string; description: string }) => `
### ${a.title}
${a.description}
`
  )
  .join("\n")}
`);
  }

  // Skills
  sections.push(`
## Technical Skills

${skillsData.categories
  .map(
    (cat) => `
### ${cat.name}
${cat.skills
  .map(
    (s) =>
      `- ${s.name}: ${s.level}% proficiency, ${s.years} years experience${
        s.certifications.length > 0
          ? ` (Certifications: ${s.certifications.join(", ")})`
          : ""
      }`
  )
  .join("\n")}
`
  )
  .join("\n")}
`);

  // Certifications
  sections.push(`
## Certifications (${certsData.totalCount}+ total)

Featured: ${certsData.featured.join(", ")}

${certsData.categories
  .map(
    (cat) => `
### ${cat.name}
${cat.certifications.map((c) => `- ${c.name} (${c.issuer}, ${c.year})`).join("\n")}
`
  )
  .join("\n")}
`);

  // Projects
  sections.push(`
## Notable Projects

${projectsData.projects
  .map(
    (p) => `
### ${p.name}
Category: ${p.category}
Year: ${p.year}
Description: ${p.description}
${p.longDescription ? `Details: ${p.longDescription}` : ""}
Technologies: ${p.technologies.join(", ")}
${p.github ? `GitHub: ${p.github}` : ""}
${p.demo ? `Demo: ${p.demo}` : ""}
${p.featured ? "(Featured Project)" : ""}
`
  )
  .join("\n")}
`);

  return sections.join("\n---\n");
}

// System prompt for the AI assistant
export const SYSTEM_PROMPT = `You are an AI assistant representing Eric Gitangu's professional profile. You help recruiters, hiring managers, and anyone interested learn about Eric's background, skills, experience, and qualifications.

Your role is to:
1. Answer questions about Eric's work experience, skills, and qualifications
2. Highlight relevant experience when asked about specific technologies or domains
3. Be helpful, professional, and accurate
4. If you don't know something specific about Eric, say so honestly
5. Direct people to Eric's LinkedIn, GitHub, or portfolio for more details when appropriate

Key facts to remember:
- Eric is a Software Engineering Lead / Architect specializing in distributed systems and AI/ML
- 10+ years of full-stack development experience with deep backend and architecture expertise
- Currently based in Nairobi, Kenya (also has US presence in Georgia)
- Deep expertise in CQRS, event sourcing, hexagonal/ports-and-adapters architecture, and saga orchestration
- Founded Vishnu Systems: ML security platform for SiMD/SaMD medical devices (HIPAA-compliant)
- Led QA & Engineering at Ignite/ENGIE Energy Access across 7 African markets (PAYG solar)
- Built government-scale digital addressing at Baw Bab for 2.3M Nairobi residents
- Polyglot across Python, Java, Rust, TypeScript, Go, Kotlin, Swift, and Clojure
- Holds 80+ professional certifications across AWS, Azure, GCP, AI/ML, blockchain, and security
- Founded Deveric mentorship initiative (15+ engineers mentored, 6+ advanced to senior/lead)
- CodePath.org Volunteer Student Teacher (Advanced TIP103, May–Aug 2024)
- 20+ production-ready open source repositories on GitHub
- Education: B.Sc. in Computer Science from UMass Lowell with Microsoft and Google scholarships, Dean's List, ODK Honor Society

Be conversational but professional. If asked about something outside Eric's professional profile, politely redirect to professional topics.`;

// Get context for a specific query (could be enhanced with embeddings for larger datasets)
export function getRelevantContext(): string {
  return buildResumeContext();
}
