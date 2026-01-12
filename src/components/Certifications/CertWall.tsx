"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Award, ExternalLink } from "lucide-react";
import certData from "@/data/certifications.json";

const categoryIcons: Record<string, string> = {
  "Blockchain & Web3": "bg-orange-500/20 text-orange-400",
  "Backend & Full-Stack": "bg-green-500/20 text-green-400",
  "Cloud & DevOps": "bg-purple-500/20 text-purple-400",
  "Data Engineering & AI/ML": "bg-pink-500/20 text-pink-400",
  "Programming Languages": "bg-blue-500/20 text-blue-400",
  Security: "bg-red-500/20 text-red-400",
};

export default function CertWall() {
  return (
    <section id="certifications" className="py-20 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Certifications</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {certData.totalCount}+ certifications across cloud, backend, blockchain, and AI/ML
          </p>
        </motion.div>

        {/* Featured certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <h3 className="text-lg font-semibold mb-4 text-center">Featured</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {certData.featured.map((cert) => (
              <Badge key={cert} className="px-3 py-1">
                <Award className="w-3 h-3 mr-1" />
                {cert}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Accordion by category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="glass">
            <CardContent className="p-6">
              <Accordion type="multiple" className="w-full">
                {certData.categories.map((category, catIndex) => (
                  <AccordionItem key={category.name} value={category.name}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            categoryIcons[category.name] || "bg-gray-500/20 text-gray-400"
                          }`}
                        >
                          <Award className="w-4 h-4" />
                        </div>
                        <span className="font-medium">{category.name}</span>
                        <Badge variant="secondary" className="ml-2">
                          {category.certifications.length}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid md:grid-cols-2 gap-3 pt-2">
                        {category.certifications.map((cert, certIndex) => (
                          <motion.div
                            key={cert.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: certIndex * 0.05 }}
                            className="flex items-start gap-2 p-3 rounded-lg bg-background/50"
                          >
                            <div className="flex-1">
                              <p className="font-medium text-sm">{cert.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {cert.issuer} - {cert.year}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>

        {/* Link to LinkedIn */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-8"
        >
          <a
            href="https://linkedin.com/in/ericgitangu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            View all {certData.totalCount}+ certifications on LinkedIn
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
