"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Globe, Mail, MapPin, MessageCircle, Plane, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import resumeData from "@/data/resume.json";

const socialLinks = [
  { icon: Linkedin, href: resumeData.contact.linkedin, label: "LinkedIn" },
  { icon: Github, href: resumeData.contact.github, label: "GitHub" },
  { icon: Globe, href: resumeData.contact.portfolio, label: "Portfolio" },
  { icon: Mail, href: `mailto:${resumeData.contact.email}`, label: "Email" },
];

const roles = [
  "Full-Stack Engineer",
  "Cloud Architect",
  "Tech Lead",
  "AI/ML Engineer",
  "Web3 Developer",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-start justify-center overflow-hidden pt-20 sm:pt-24 md:pt-28">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated Location badge with plane */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 sm:mb-8"
          >
            <AnimatedLocation
              locations={[resumeData.location.primary, resumeData.location.secondary]}
              phones={[resumeData.contact.phone.primary, resumeData.contact.phone.secondary]}
            />
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-3 sm:mb-4"
          >
            <span className="gradient-text">{resumeData.name}</span>
          </motion.h1>

          {/* Title with typing effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-10 sm:h-12 mb-4 sm:mb-6"
          >
            <TypeWriter words={roles} />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-2"
          >
            {resumeData.tagline}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center gap-6 sm:gap-8 mb-8 sm:mb-10"
          >
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary">{resumeData.yearsOfExperience}+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary">{resumeData.certificationsCount}+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Certifications</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4 sm:px-0"
          >
            <Button
              size="lg"
              className="gap-2 w-full sm:w-auto"
              onClick={() => window.dispatchEvent(new CustomEvent("openChat"))}
            >
              <MessageCircle className="w-5 h-5" />
              Talk to my AI
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
              <a href="#experience">View Experience</a>
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center gap-3 sm:gap-4"
          >
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 sm:p-3 rounded-full bg-secondary/50 hover:bg-secondary text-secondary-foreground transition-colors"
                aria-label={link.label}
              >
                <link.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            ))}
          </motion.div>

          {/* Scroll indicator - inline with content for visibility */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{
              opacity: { duration: 0.5, delay: 0.8 },
              y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            }}
            className="mt-6 sm:mt-8 flex flex-col items-center gap-2"
          >
            <span className="text-xs text-muted-foreground/70">Scroll to explore</span>
            <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/40 flex justify-center pt-2">
              <motion.div
                className="w-1.5 h-2.5 rounded-full bg-primary/60"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// TypeWriter component with smooth, readable animations
function TypeWriter({ words }: { words: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 3500); // 3.5 seconds per word: 0.5s fade in + 2.5s visible + 0.5s fade out

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="text-lg sm:text-2xl md:text-3xl font-semibold text-foreground/80 relative h-10 sm:h-12">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

// Animated location component with plane flying between cities
function AnimatedLocation({ locations, phones }: { locations: string[]; phones: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      // After plane animation completes, switch location
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % locations.length);
        setIsTransitioning(false);
      }, 1500); // Plane flight duration
    }, 5000); // Switch every 5 seconds

    return () => clearInterval(interval);
  }, [locations.length]);

  return (
    <div className="inline-flex flex-row items-center gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-secondary/50 text-secondary-foreground relative overflow-hidden">
      {/* Location section */}
      <div className="flex items-center gap-1.5 relative">
        <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
        <div className="relative min-w-[85px] sm:min-w-[110px] h-5 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={`loc-${currentIndex}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="text-xs sm:text-sm font-medium absolute whitespace-nowrap"
            >
              {locations[currentIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Divider */}
      <div className="w-px h-4 bg-border/50" />

      {/* Phone section */}
      <div className="flex items-center gap-1.5 relative">
        <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
        <div className="relative min-w-[115px] sm:min-w-[140px] h-5 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={`phone-${currentIndex}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="text-xs sm:text-sm font-medium absolute whitespace-nowrap"
            >
              {phones[currentIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Flying plane animation */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{
              x: "100%",
              opacity: [0, 1, 1, 0],
              y: [0, -12, -12, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              opacity: { times: [0, 0.15, 0.85, 1] }
            }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
          >
            <Plane className="w-5 h-5 sm:w-6 sm:h-6 text-primary drop-shadow-md" style={{ transform: "rotate(-35deg)" }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contrail effect behind plane */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{
              scaleX: [0, 1, 1],
              opacity: [0, 0.4, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              opacity: { times: [0, 0.5, 1] }
            }}
            className="absolute inset-y-0 left-0 right-0 flex items-center pointer-events-none"
            style={{ top: "calc(50% - 6px)" }}
          >
            <div className="h-[2px] w-full bg-gradient-to-r from-primary/30 via-primary/20 to-transparent rounded-full" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
