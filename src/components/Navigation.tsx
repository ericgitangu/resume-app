"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Monitor } from "lucide-react";
import DownloadButton from "@/components/DownloadButton";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cycleTheme = () => {
    if (theme === "system") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("system");
    }
  };

  const ThemeIcon = () => {
    if (!mounted) return <Monitor className="w-4 h-4" />;
    if (theme === "system") return <Monitor className="w-4 h-4" />;
    if (theme === "light") return <Sun className="w-4 h-4" />;
    return <Moon className="w-4 h-4" />;
  };

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Desktop & Mobile Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "glass shadow-lg" : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Name */}
            <a
              href="#"
              className="flex items-center gap-2 text-lg sm:text-xl font-bold"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <img
                src="/favicon.png"
                alt="Eric Gitangu"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="gradient-text">Eric Gitangu</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={cycleTheme}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50"
                aria-label="Toggle theme"
                title={mounted ? `Theme: ${theme}` : "Toggle theme"}
              >
                <ThemeIcon />
              </button>
              <DownloadButton variant="default" />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-secondary/50 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-card border-l border-border z-50 md:hidden"
            >
              <div className="p-6">
                <div className="flex justify-end mb-8">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleNavClick(item.href)}
                      className="w-full text-left px-4 py-3 text-lg rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 space-y-3"
                >
                  <DownloadButton variant="mobile" />
                  <button
                    onClick={cycleTheme}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm rounded-lg border border-border hover:bg-secondary/50 transition-colors"
                  >
                    <ThemeIcon />
                    <span>{mounted ? (theme === "system" ? "System" : theme === "light" ? "Light" : "Dark") : "Theme"}</span>
                  </button>
                </motion.div>

                {/* Contact info in mobile menu */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 pt-8 border-t border-border"
                >
                  <p className="text-sm text-muted-foreground mb-2">Contact</p>
                  <a
                    href="mailto:developer.ericgitangu@gmail.com"
                    className="text-sm text-primary hover:underline block mb-1"
                  >
                    developer.ericgitangu@gmail.com
                  </a>
                  <a
                    href="tel:+254708078997"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    +254 708 078 997
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
