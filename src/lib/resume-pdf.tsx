/* eslint-disable jsx-a11y/alt-text */
import { Document, Page, Text, View, StyleSheet, Link, Font } from "@react-pdf/renderer";
import { existsSync } from "node:fs";
import { join } from "node:path";

// Geist (the face the site itself ships via next/font) for the PDF body; Geist Mono for technology tags.
// Static weights only: react-pdf cannot use variable fonts. Files live in public/fonts (see scripts/gen-resume.mts).
const FONT_DIR = join(process.cwd(), "public", "fonts");
const fontFile = (base: string) => {
  for (const ext of ["otf", "ttf"]) {
    const p = join(FONT_DIR, `${base}.${ext}`);
    if (existsSync(p)) return p;
  }
  return null;
};
const geist = [
  { base: "Geist-Regular", fontWeight: 400 },
  { base: "Geist-Medium", fontWeight: 500 },
  { base: "Geist-SemiBold", fontWeight: 600 },
  { base: "Geist-Bold", fontWeight: 700 },
]
  .map((w) => ({ src: fontFile(w.base), fontWeight: w.fontWeight }))
  .filter((w): w is { src: string; fontWeight: number } => Boolean(w.src));
const geistMono = [
  { base: "GeistMono-Regular", fontWeight: 400 },
  { base: "GeistMono-Medium", fontWeight: 500 },
]
  .map((w) => ({ src: fontFile(w.base), fontWeight: w.fontWeight }))
  .filter((w): w is { src: string; fontWeight: number } => Boolean(w.src));
const HAS_GEIST = geist.length === 4;
// Under tsx the generator script and this module can resolve two copies of @react-pdf/renderer, each with its own
// font registry. Register on whichever instance will render: this module's, and the caller's via registerResumeFonts.
export function registerResumeFonts(api: typeof Font): void {
  if (HAS_GEIST) api.register({ family: "Geist", fonts: geist });
  if (geistMono.length) api.register({ family: "Geist Mono", fonts: geistMono });
  api.registerHyphenationCallback((word) => [word]);
}
registerResumeFonts(Font);
const SANS = HAS_GEIST ? "Geist" : "Helvetica";
const SANS_BOLD = HAS_GEIST ? "Geist" : "Helvetica-Bold";
const MONO = geistMono.length ? "Geist Mono" : SANS;
const BOLD = HAS_GEIST ? { fontFamily: SANS, fontWeight: 700 as const } : { fontFamily: SANS_BOLD };
const SEMI = HAS_GEIST ? { fontFamily: SANS, fontWeight: 600 as const } : { fontFamily: SANS_BOLD };
import resume from "@/data/resume.json";
import experience from "@/data/experience.json";
import projects from "@/data/projects.json";
import skills from "@/data/skills.json";

// Single source of truth for the downloadable PDF — pulls from src/data/*.json
// so any edit to resume/experience/projects/skills propagates on next request.

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 9, fontFamily: SANS, color: "#111", lineHeight: 1.22 },
  name: { fontSize: 22, ...BOLD, lineHeight: 1.15, marginBottom: 3 },
  title: { fontSize: 12, ...SEMI, color: "#1a1a1a", marginBottom: 5, letterSpacing: 0.1 },
  contactRow: { flexDirection: "row", flexWrap: "wrap", fontSize: 8.5, color: "#444", marginBottom: 10 },
  contactItem: { marginRight: 10 },
  link: { color: "#1a4ea3", textDecoration: "none" },
  sectionHeader: {
    fontSize: 10.5,
    ...SEMI,
    textTransform: "uppercase",
    letterSpacing: 1.1,
    borderBottomWidth: 0.6,
    borderBottomColor: "#444",
    paddingBottom: 2,
    marginTop: 10,
    marginBottom: 5,
  },
  summary: { marginBottom: 6, textAlign: "justify" },
  jobHeader: { flexDirection: "row", justifyContent: "space-between", marginTop: 5 },
  jobTitle: { ...BOLD, fontSize: 10, flex: 1, paddingRight: 10 },
  jobDates: { fontSize: 8.5, color: "#555", flexShrink: 0 },
  jobMeta: { fontSize: 9, color: "#444", marginBottom: 2 },
  jobDescription: { fontSize: 9, color: "#222", marginBottom: 3, fontWeight: 500 },
  bullet: { flexDirection: "row", marginBottom: 1.5 },
  bulletDot: { width: 8 },
  bulletText: { flex: 1, fontSize: 9 },
  techRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 2, marginBottom: 4 },
  techPill: {
    fontFamily: MONO,
    fontSize: 7.5,
    paddingHorizontal: 4,
    paddingVertical: 1,
    backgroundColor: "#eef2f7",
    color: "#1a4ea3",
    marginRight: 3,
    marginBottom: 2,
    borderRadius: 2,
  },
  projectName: { ...BOLD, fontSize: 10 },
  projectDesc: { fontSize: 9, marginBottom: 2 },
  skillCategory: { marginBottom: 4 },
  skillCategoryName: { fontSize: 9.5, ...BOLD, marginBottom: 1 },
  skillList: { fontSize: 9, color: "#222" },
});

function fmtDate(s: string): string {
  if (!s) return "";
  const [y, m] = s.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return m ? `${months[parseInt(m, 10) - 1]} ${y}` : y;
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.bullet}>
      <Text style={styles.bulletDot}>•</Text>
      <Text style={styles.bulletText}>{children}</Text>
    </View>
  );
}

// Print-only trims: the site keeps every category; the two-to-three-page PDF drops breadth-only ones.
const RESUME_SKIP_SKILL_CATEGORIES = new Set(["Web3 & Blockchain", ".NET / Microsoft Platform", "Observability", "Domains"]);

export function ResumeDocument() {
  const positions = [...experience.positions].sort((a, b) =>
    a.startDate < b.startDate ? 1 : -1,
  );
  const featuredProjects = projects.projects.filter((p) => p.featured).slice(0, 8);

  return (
    <Document
      title={`${resume.name}, Resume`}
      author={resume.name}
      subject={resume.title}
      keywords={resume.highlights.join(", ")}
      creator="resume.ericgitangu.com"
    >
      <Page size="LETTER" style={styles.page} wrap>
        {/* Header */}
        <Text style={styles.name}>{resume.name}</Text>
        <Text style={styles.title}>{resume.title}</Text>
        <View style={styles.contactRow}>
          <Text style={styles.contactItem}>{resume.location.primary}</Text>
          <Text style={styles.contactItem}>·</Text>
          <Link src={`mailto:${resume.contact.email}`} style={[styles.contactItem, styles.link]}>
            {resume.contact.email}
          </Link>
          {resume.contact.emailSecondary ? (
            <>
              <Text style={styles.contactItem}>·</Text>
              <Link src={`mailto:${resume.contact.emailSecondary}`} style={[styles.contactItem, styles.link]}>
                {resume.contact.emailSecondary}
              </Link>
            </>
          ) : null}
          <Text style={styles.contactItem}>·</Text>
          <Text style={styles.contactItem}>{resume.contact.phone.primary}</Text>
          <Text style={styles.contactItem}>·</Text>
          <Link src={resume.contact.linkedin} style={[styles.contactItem, styles.link]}>
            linkedin.com/in/ericgitangu
          </Link>
          <Text style={styles.contactItem}>·</Text>
          <Link src={resume.contact.github} style={[styles.contactItem, styles.link]}>
            github.com/ericgitangu
          </Link>
          <Text style={styles.contactItem}>·</Text>
          <Link src={resume.resumeUrl} style={[styles.contactItem, styles.link]}>
            resume.ericgitangu.com
          </Link>
        </View>

        {/* Summary */}
        <Text style={styles.sectionHeader}>Professional Summary</Text>
        <Text style={styles.summary}>{resume.summary}</Text>

        {/* Experience */}
        <Text style={styles.sectionHeader}>Experience</Text>
        {positions.map((p) => (
          <View key={p.id} wrap={false}>
            <View style={styles.jobHeader}>
              <Text style={styles.jobTitle}>
                {p.role}, {p.company}
              </Text>
              <Text style={styles.jobDates}>
                {fmtDate(p.startDate)} – {p.current ? "Present" : fmtDate(p.endDate)}
              </Text>
            </View>
            <Text style={styles.jobMeta}>{p.location}</Text>
            {p.description ? <Text style={styles.jobDescription}>{p.description}</Text> : null}
            {p.achievements.map((a, i) => (
              <Bullet key={i}>{a}</Bullet>
            ))}
            {p.technologies.length ? <View style={styles.techRow}>
              {p.technologies.slice(0, 10).map((t, i) => (
                <Text key={i} style={styles.techPill}>
                  {t}
                </Text>
              ))}
            </View> : null}
          </View>
        ))}

        {/* Projects */}
        <Text style={styles.sectionHeader}>Selected Projects</Text>
        {featuredProjects.map((proj) => (
          <View key={proj.id} wrap={false} style={{ marginBottom: 4 }}>
            <Text style={styles.projectName}>
              {proj.name}
              {proj.demo ? <Text style={{ fontWeight: "normal", color: "#1a4ea3" }}> · {proj.demo.replace(/^https?:\/\//, "")}</Text> : null}
            </Text>
            <Text style={styles.projectDesc}>{proj.description}</Text>
            <View style={styles.techRow}>
              {proj.technologies.slice(0, 10).map((t, i) => (
                <Text key={i} style={styles.techPill}>
                  {t}
                </Text>
              ))}
            </View>
          </View>
        ))}

        {/* Skills */}
        <Text style={styles.sectionHeader} break>Core Technical Skills</Text>
        {skills.categories.filter((cat) => !RESUME_SKIP_SKILL_CATEGORIES.has(cat.name)).map((cat) => (
          <View key={cat.name} style={styles.skillCategory} wrap={false}>
            <Text style={styles.skillCategoryName}>{cat.name}</Text>
            <Text style={styles.skillList}>{cat.skills.slice(0, 16).map((s) => s.name).join(" · ")}</Text>
          </View>
        ))}

        {/* Education — wrapped so the heading never strands at a page foot */}
        {experience.education?.length ? (
          <View wrap={false}>
            <Text style={styles.sectionHeader}>Education, Certifications and Open Source</Text>
            {experience.education.map((e) => (
              <View key={e.id} wrap={false} style={{ marginBottom: 3 }}>
                <Text style={{ ...BOLD, fontSize: 10 }}>
                  {e.degree}
                  {e.minor ? `, minor in ${e.minor}` : ""}, {e.institution}
                </Text>
                <Text style={{ fontSize: 8.5, color: "#555" }}>
                  {fmtDate(e.startDate)} – {fmtDate(e.endDate)}
                </Text>
                {e.honors?.map((h, i) => (
                  <Bullet key={i}>{h}</Bullet>
                ))}
              </View>
            ))}
            {experience.achievements.map((a) => (
              <Bullet key={a.id}>
                <Text style={{ ...BOLD }}>{a.title}: </Text>
                {a.description}
              </Bullet>
            ))}
          </View>
        ) : null}
      </Page>
    </Document>
  );
}
