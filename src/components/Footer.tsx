"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Plane } from "lucide-react";
import resumeData from "@/data/resume.json";

const titles = ["Lead", "Architect"];

export default function Footer() {
  return (
    <footer className="py-8 px-4 sm:px-6 border-t border-border">
      <div className="container mx-auto max-w-6xl text-center text-muted-foreground text-sm">
        <AnimatedTitle />

        <div className="mt-3 flex justify-center">
          <AnimatedFooterLocation
            locations={[resumeData.location.primary, resumeData.location.secondary]}
            phones={[resumeData.contact.phone.primary, resumeData.contact.phone.secondary]}
          />
        </div>

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
  );
}

function AnimatedFooterLocation({ locations, phones }: { locations: string[]; phones: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % locations.length);
        setIsTransitioning(false);
      }, 1200);
    }, 4000);

    return () => clearInterval(interval);
  }, [locations.length]);

  return (
    <div className="inline-flex flex-row items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-secondary/30 text-muted-foreground relative overflow-hidden text-xs sm:text-sm">
      {/* Location */}
      <div className="flex items-center gap-1.5 relative">
        <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary/70 flex-shrink-0" />
        <div className="relative min-w-[80px] sm:min-w-[100px] h-4 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={`loc-${currentIndex}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute whitespace-nowrap"
            >
              {locations[currentIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Divider */}
      <div className="w-px h-3 bg-border/50" />

      {/* Phone */}
      <div className="flex items-center gap-1.5 relative">
        <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary/70 flex-shrink-0" />
        <div className="relative min-w-[105px] sm:min-w-[130px] h-4 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={`phone-${currentIndex}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute whitespace-nowrap"
            >
              {phones[currentIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Flying plane */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{
              x: "100%",
              opacity: [0, 1, 1, 0],
              y: [0, -8, -8, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
              opacity: { times: [0, 0.15, 0.85, 1] }
            }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
          >
            <Plane className="w-4 h-4 text-primary/70 drop-shadow-sm" style={{ transform: "rotate(-35deg)" }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AnimatedTitle() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % titles.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <p className="font-medium">
      Eric Gitangu - Software Engineering{" "}
      <span className="relative inline-block min-w-[75px]">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="inline-block"
            style={{
              background: currentIndex === 0
                ? "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)"
                : "linear-gradient(135deg, #06b6d4 0%, #0ea5e9 50%, #3b82f6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {titles[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </span>
    </p>
  );
}
