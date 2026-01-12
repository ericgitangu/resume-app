import Hero from "@/components/Hero";
import Summary from "@/components/Summary";
import Navigation from "@/components/Navigation";
import Timeline from "@/components/Experience/Timeline";
import CareerChart from "@/components/Experience/CareerChart";
import Skills from "@/components/Skills";
import ProjectGrid from "@/components/Projects/ProjectGrid";
import CertWall from "@/components/Certifications/CertWall";
import ChatWidget from "@/components/Chatbot/ChatWidget";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <Hero />
        <Summary />
        <CareerChart />
        <Timeline />
        <Skills />
        <ProjectGrid />
        <CertWall />

        {/* Footer */}
        <footer className="py-8 px-4 sm:px-6 border-t border-border">
          <div className="container mx-auto max-w-6xl text-center text-muted-foreground text-sm">
            <p className="font-medium">Eric Gitangu - Senior Software Engineer</p>
            <p className="mt-1">Nairobi, Kenya / Kennesaw, GA, USA</p>
            <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs">
              <a
                href="https://linkedin.com/in/ericgitangu"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/ericgitangu"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://developer.ericgitangu.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                Portfolio
              </a>
            </div>
          </div>
        </footer>
      </main>
      <ChatWidget />
    </>
  );
}
