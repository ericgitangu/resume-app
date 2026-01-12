import Hero from "@/components/Hero";
import Summary from "@/components/Summary";
import Navigation from "@/components/Navigation";
import Timeline from "@/components/Experience/Timeline";
import CareerChart from "@/components/Experience/CareerChart";
import Skills from "@/components/Skills";
import ProjectGrid from "@/components/Projects/ProjectGrid";
import CertWall from "@/components/Certifications/CertWall";
import ChatWidget from "@/components/Chatbot/ChatWidget";
import StarField from "@/components/StarField";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <StarField />
      <Navigation />
      <main className="min-h-screen">
        <Hero />
        <Summary />
        <CareerChart />
        <Timeline />
        <Skills />
        <ProjectGrid />
        <CertWall />
        <Footer />
      </main>
      <ChatWidget />
    </>
  );
}
