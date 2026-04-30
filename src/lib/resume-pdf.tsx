/* eslint-disable jsx-a11y/alt-text */
import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";
import resume from "@/data/resume.json";
import experience from "@/data/experience.json";
import projects from "@/data/projects.json";
import skills from "@/data/skills.json";

// Single source of truth for the downloadable PDF — pulls from src/data/*.json
// so any edit to resume/experience/projects/skills propagates on next request.

const styles = StyleSheet.create({
  page: { padding: 36, fontSize: 9.5, fontFamily: "Helvetica", color: "#111", lineHeight: 1.35 },
  name: { fontSize: 20, fontFamily: "Helvetica-Bold", marginBottom: 2 },
  title: { fontSize: 11, color: "#444", marginBottom: 4 },
  contactRow: { flexDirection: "row", flexWrap: "wrap", fontSize: 8.5, color: "#444", marginBottom: 10 },
  contactItem: { marginRight: 10 },
  link: { color: "#1a4ea3", textDecoration: "none" },
  sectionHeader: {
    fontSize: 10.5,
    fontFamily: "Helvetica-Bold",
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
  jobTitle: { fontFamily: "Helvetica-Bold", fontSize: 10 },
  jobDates: { fontSize: 8.5, color: "#555" },
  jobMeta: { fontSize: 9, color: "#444", marginBottom: 2 },
  jobDescription: { fontSize: 9, color: "#222", marginBottom: 3, fontStyle: "italic" },
  bullet: { flexDirection: "row", marginBottom: 1.5 },
  bulletDot: { width: 8 },
  bulletText: { flex: 1, fontSize: 9 },
  techRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 2, marginBottom: 4 },
  techPill: {
    fontSize: 7.5,
    paddingHorizontal: 4,
    paddingVertical: 1,
    backgroundColor: "#eef2f7",
    color: "#1a4ea3",
    marginRight: 3,
    marginBottom: 2,
    borderRadius: 2,
  },
  projectName: { fontFamily: "Helvetica-Bold", fontSize: 10 },
  projectDesc: { fontSize: 9, marginBottom: 2 },
  skillCategory: { marginBottom: 4 },
  skillCategoryName: { fontSize: 9.5, fontFamily: "Helvetica-Bold", marginBottom: 1 },
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

export function ResumeDocument() {
  const positions = [...experience.positions].sort((a, b) =>
    a.startDate < b.startDate ? 1 : -1,
  );
  const featuredProjects = projects.projects.filter((p) => p.featured).slice(0, 8);

  return (
    <Document
      title={`${resume.name} — Resume`}
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
                {p.role} — {p.company}
              </Text>
              <Text style={styles.jobDates}>
                {fmtDate(p.startDate)} – {p.current ? "Present" : fmtDate(p.endDate)}
              </Text>
            </View>
            <Text style={styles.jobMeta}>{p.location}</Text>
            <Text style={styles.jobDescription}>{p.description}</Text>
            {p.achievements.map((a, i) => (
              <Bullet key={i}>{a}</Bullet>
            ))}
            <View style={styles.techRow}>
              {p.technologies.map((t, i) => (
                <Text key={i} style={styles.techPill}>
                  {t}
                </Text>
              ))}
            </View>
          </View>
        ))}

        {/* Projects */}
        <Text style={styles.sectionHeader} break>Selected Projects</Text>
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
        <Text style={styles.sectionHeader}>Core Technical Skills</Text>
        {skills.categories.map((cat) => (
          <View key={cat.name} style={styles.skillCategory} wrap={false}>
            <Text style={styles.skillCategoryName}>{cat.name}</Text>
            <Text style={styles.skillList}>{cat.skills.map((s) => s.name).join(" · ")}</Text>
          </View>
        ))}

        {/* Education */}
        {experience.education?.length ? (
          <>
            <Text style={styles.sectionHeader}>Education</Text>
            {experience.education.map((e) => (
              <View key={e.id} wrap={false} style={{ marginBottom: 3 }}>
                <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 10 }}>
                  {e.degree}
                  {e.minor ? ` · Minor: ${e.minor}` : ""} — {e.institution}
                </Text>
                <Text style={{ fontSize: 8.5, color: "#555" }}>
                  {fmtDate(e.startDate)} – {fmtDate(e.endDate)}
                </Text>
                {e.honors?.map((h, i) => (
                  <Bullet key={i}>{h}</Bullet>
                ))}
              </View>
            ))}
          </>
        ) : null}

        {/* Achievements */}
        {experience.achievements?.length ? (
          <>
            <Text style={styles.sectionHeader}>Certifications & Open Source</Text>
            {experience.achievements.map((a) => (
              <Bullet key={a.id}>
                <Text style={{ fontFamily: "Helvetica-Bold" }}>{a.title}: </Text>
                {a.description}
              </Bullet>
            ))}
          </>
        ) : null}
      </Page>
    </Document>
  );
}
