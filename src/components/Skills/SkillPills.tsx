"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import skillsData from "@/data/skills.json";

const categoryColors: Record<string, string> = {
  Frontend: "bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30",
  Backend: "bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30",
  Databases: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/30",
  "Cloud & DevOps": "bg-purple-500/20 text-purple-400 border-purple-500/30 hover:bg-purple-500/30",
  "Web3 & Blockchain": "bg-orange-500/20 text-orange-400 border-orange-500/30 hover:bg-orange-500/30",
  "AI/ML": "bg-pink-500/20 text-pink-400 border-pink-500/30 hover:bg-pink-500/30",
};

function getProficiencyLabel(level: number): string {
  if (level >= 90) return "Expert";
  if (level >= 75) return "Advanced";
  if (level >= 60) return "Proficient";
  return "Intermediate";
}

export default function SkillPills() {
  return (
    <TooltipProvider>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillsData.categories.map((category, catIndex) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: catIndex * 0.1 }}
          >
            <Card className="glass h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Tooltip key={skill.name}>
                      <TooltipTrigger asChild>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                        >
                          <Badge
                            variant="outline"
                            className={`cursor-pointer transition-colors ${
                              categoryColors[category.name] || ""
                            }`}
                          >
                            {skill.name}
                            <span className="ml-1 text-xs opacity-70">{skill.level}%</span>
                          </Badge>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <div className="space-y-1">
                          <p className="font-semibold">{skill.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {getProficiencyLabel(skill.level)} - {skill.years} years
                          </p>
                          {skill.certifications.length > 0 && (
                            <div className="text-xs text-muted-foreground">
                              <p className="font-medium">Certifications:</p>
                              <ul className="list-disc list-inside">
                                {skill.certifications.map((cert) => (
                                  <li key={cert}>{cert}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </TooltipProvider>
  );
}
