"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Globe, Mail, MapPin, MessageCircle } from "lucide-react";
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16 sm:py-20 pt-24 sm:pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-secondary/50 text-secondary-foreground mb-6 sm:mb-8"
          >
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-medium">{resumeData.location.primary}</span>
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
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
        </div>
      </motion.div>
    </section>
  );
}

// TypeWriter component
function TypeWriter({ words }: { words: string[] }) {
  return (
    <motion.div className="text-lg sm:text-2xl md:text-3xl font-semibold text-foreground/80">
      {words.map((word, index) => (
        <motion.span
          key={word}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: index * 3,
            repeat: Infinity,
            repeatDelay: words.length * 3 - 0.5,
          }}
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            animationDelay: `${index * 3}s`,
          }}
        >
          <motion.span
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 3 + 2.5,
              repeat: Infinity,
              repeatDelay: words.length * 3 - 0.5,
            }}
          >
            {word}
          </motion.span>
        </motion.span>
      ))}
    </motion.div>
  );
}
