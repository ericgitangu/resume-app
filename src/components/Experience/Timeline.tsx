"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import experienceData from "@/data/experience.json";

const roleColors: Record<string, string> = {
  Director: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Lead: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Senior: "bg-green-500/20 text-green-400 border-green-500/30",
  Engineer: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Intern: "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

export default function Timeline() {
  return (
    <section id="experience" className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A journey through fintech, telecom, and enterprise platforms
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />

          <Accordion type="single" collapsible className="space-y-6">
            {experienceData.positions.map((position, index) => (
              <motion.div
                key={position.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative ${
                  index % 2 === 0 ? "md:pr-[50%] md:text-right" : "md:pl-[50%]"
                }`}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary border-4 border-background md:-translate-x-1/2 top-6 z-10`}
                />

                <div className={`ml-10 md:ml-0 ${index % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}>
                  <AccordionItem value={position.id} className="border-none">
                    <Card className="glass">
                      <AccordionTrigger className="hover:no-underline p-0">
                        <CardContent className="p-6 w-full">
                          <div className={`flex flex-col gap-2 ${index % 2 === 0 ? "md:items-end" : "md:items-start"} items-start`}>
                            {/* Role badge */}
                            <Badge className={roleColors[position.type] || roleColors.Engineer}>
                              {position.type}
                            </Badge>

                            {/* Company & Role */}
                            <h3 className="text-lg font-semibold">{position.company}</h3>
                            <p className="text-primary font-medium">{position.role}</p>

                            {/* Meta info */}
                            <div className={`flex flex-wrap gap-3 text-sm text-muted-foreground ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {formatDate(position.startDate)} - {position.current ? "Present" : formatDate(position.endDate!)}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {position.location}
                              </span>
                            </div>

                            {/* Kenya badge for Africa roles */}
                            {position.location.includes("Kenya") && (
                              <Badge variant="outline" className="border-green-500/50 text-green-400">
                                Africa
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </AccordionTrigger>

                      <AccordionContent>
                        <CardContent className="pt-0 px-6 pb-6">
                          <div className={`space-y-4 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                            <p className="text-muted-foreground">{position.description}</p>

                            <div>
                              <h4 className="font-medium mb-2">Key Achievements</h4>
                              <ul className={`space-y-1 text-sm text-muted-foreground ${index % 2 === 0 ? "md:list-none" : "list-disc list-inside"}`}>
                                {position.achievements.map((achievement, i) => (
                                  <li key={i}>{achievement}</li>
                                ))}
                              </ul>
                            </div>

                            <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                              {position.technologies.map((tech) => (
                                <Badge key={tech} variant="secondary" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </AccordionContent>
                    </Card>
                  </AccordionItem>
                </div>
              </motion.div>
            ))}
          </Accordion>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="relative md:pr-[50%] md:text-right mt-6"
          >
            <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-accent border-4 border-background md:-translate-x-1/2 top-6 z-10" />
            <div className="ml-10 md:ml-0 md:mr-8">
              <Card className="glass">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-2 md:items-end items-start">
                    <Badge className="bg-accent/20 text-accent border-accent/30">Education</Badge>
                    <h3 className="text-lg font-semibold">{experienceData.education[0].institution}</h3>
                    <p className="text-primary font-medium">{experienceData.education[0].degree}</p>
                    <p className="text-muted-foreground text-sm">Minor: {experienceData.education[0].minor}</p>
                    <div className="flex flex-wrap gap-2 md:justify-end mt-2">
                      {experienceData.education[0].honors.map((honor) => (
                        <Badge key={honor} variant="outline" className="text-xs">
                          {honor}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}
