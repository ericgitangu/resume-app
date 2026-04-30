import resume from "@/data/resume.json";
import experience from "@/data/experience.json";
import projects from "@/data/projects.json";
import skills from "@/data/skills.json";

// JSON-LD Person + ProfilePage schema for Google rich results.
// All values pulled from src/data/*.json so the schema stays in sync with
// the visible page content — Google penalises divergence.

export function personSchema() {
  const allTechSkills = skills.categories
    .flatMap((c) => c.skills.map((s) => s.name))
    .filter((s, i, a) => a.indexOf(s) === i);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: resume.name,
    alternateName: resume.nickname ?? undefined,
    jobTitle: resume.title,
    description: resume.summary,
    url: "https://resume.ericgitangu.com",
    image: "https://resume.ericgitangu.com/og.png",
    email: resume.contact.email,
    telephone: resume.contact.phone.primary,
    address: {
      "@type": "PostalAddress",
      addressLocality: resume.location.primary.split(",")[0]?.trim(),
      addressCountry: resume.location.primary.split(",").pop()?.trim(),
    },
    sameAs: [
      resume.contact.linkedin,
      resume.contact.github,
      resume.contact.portfolio,
    ].filter(Boolean),
    knowsAbout: allTechSkills,
    knowsLanguage: ["en", "sw"],
    nationality: { "@type": "Country", name: "Kenya" },
    alumniOf: experience.education?.map((e) => ({
      "@type": "CollegeOrUniversity",
      name: e.institution,
      sameAs: "https://www.uml.edu",
    })),
    hasOccupation: experience.positions.map((p) => ({
      "@type": "Occupation",
      name: p.role,
      occupationLocation: { "@type": "Place", name: p.location },
      hiringOrganization: { "@type": "Organization", name: p.company },
      occupationalCategory: p.type,
      skills: p.technologies.join(", "),
      description: p.description,
    })),
    award: [
      `${resume.certificationsCount}+ validated technical certifications across AWS, Azure, GCP, AI/ML, and security`,
      "Founded Deveric mentorship initiative — 15+ engineers mentored",
      "Microsoft Scholarship Recipient (2012-2013)",
      "Google Scholarship Recipient (2011-2012)",
      "Omicron Delta Kappa National Leadership Honor Society",
    ],
    workExample: projects.projects
      .filter((p) => p.featured)
      .slice(0, 8)
      .map((p) => ({
        "@type": "SoftwareSourceCode",
        name: p.name,
        description: p.description,
        codeRepository: p.github ?? undefined,
        url: p.demo ?? p.github ?? undefined,
        programmingLanguage: p.technologies.slice(0, 5),
      })),
  };
}

export function profilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: "2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    mainEntity: {
      "@type": "Person",
      name: resume.name,
      url: "https://resume.ericgitangu.com",
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      contentUrl: "https://resume.ericgitangu.com/og.png",
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${resume.name} — Resume`,
    alternateName: resume.title,
    url: "https://resume.ericgitangu.com",
    description: resume.summary,
    inLanguage: "en-US",
    author: { "@type": "Person", name: resume.name },
    potentialAction: {
      "@type": "DownloadAction",
      target: [
        "https://resume.ericgitangu.com/api/download/pdf",
        "https://resume.ericgitangu.com/api/download/word",
      ],
    },
  };
}

export function combinedSchema() {
  return [personSchema(), profilePageSchema(), websiteSchema()];
}
