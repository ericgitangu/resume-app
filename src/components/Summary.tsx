"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import resumeData from "@/data/resume.json";

export default function Summary() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A decade of building scalable systems across fintech, telecom, and enterprise platforms
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Summary Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="glass h-full">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 gradient-text">Professional Summary</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {resumeData.summary}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Highlights Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="glass h-full">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 gradient-text">Key Highlights</h3>
                <ul className="space-y-3">
                  {resumeData.highlights.map((highlight, index) => (
                    <motion.li
                      key={highlight}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{highlight}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Years Experience", value: "10+" },
            { label: "Certifications", value: "80+" },
            { label: "Technologies", value: "50+" },
            { label: "Projects", value: "30+" },
          ].map((stat, index) => (
            <Card key={stat.label} className="text-center p-6">
              <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </motion.div>

        {/* Tech Stack Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <h3 className="text-lg font-semibold mb-4">Primary Tech Stack</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Python",
              "Node.js",
              "Java",
              "PostgreSQL",
              "MongoDB",
              "Redis",
              "Kafka",
              "AWS",
              "Kubernetes",
              "Docker",
              "React",
              "TypeScript",
            ].map((tech) => (
              <Badge key={tech} variant="secondary" className="px-3 py-1">
                {tech}
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
