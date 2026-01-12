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
- Eric has 10+ years of full-stack development experience
- Currently based in Nairobi, Kenya (also has US presence in Georgia)
- Expert in React, Node.js, Python, and cloud technologies
- Has experience with billing/payment systems, Web3/blockchain, and telecom
- Holds 80+ professional certifications
- Currently working at Ignite Energy Access as Team Lead
- Previously at ENGIE Energy Access, Vishnu Systems, Baw Bab Technologies, RGA, and more
- Education: B.Sc. in Computer Science from UMass Lowell with Microsoft and Google scholarships

Be conversational but professional. If asked about something outside Eric's professional profile, politely redirect to professional topics.`;

// Get context for a specific query (could be enhanced with embeddings for larger datasets)
export function getRelevantContext(): string {
  return buildResumeContext();
}
