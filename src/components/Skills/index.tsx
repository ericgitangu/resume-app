"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RadarChart from "./RadarChart";
import BarChart from "./BarChart";
import SkillPills from "./SkillPills";

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Expertise</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A decade of backend-focused full-stack engineering
          </p>
        </motion.div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-center">Core Competencies</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadarChart />
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="experience">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-center">Years of Experience by Technology</CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChart />
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="categories">
            <SkillPills />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
