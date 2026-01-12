"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import {
  RadarChart as RechartsRadar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import skillsData from "@/data/skills.json";

export default function RadarChart() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Theme-aware colors
  const isDark = mounted && resolvedTheme === "dark";
  const textColor = isDark ? "#a1a1aa" : "#52525b";
  const gridColor = isDark ? "#3f3f46" : "#e4e4e7";
  const primaryColor = "#6366f1";
  const bgColor = isDark ? "#27272a" : "#ffffff";
  const borderColor = isDark ? "#3f3f46" : "#e4e4e7";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="h-[350px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadar cx="50%" cy="50%" outerRadius="80%" data={skillsData.radarData}>
          <PolarGrid stroke={gridColor} />
          <PolarAngleAxis
            dataKey="skill"
            tick={{ fill: textColor, fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: textColor, fontSize: 10 }}
          />
          <Radar
            name="Proficiency"
            dataKey="value"
            stroke={primaryColor}
            fill={primaryColor}
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: bgColor,
              border: `1px solid ${borderColor}`,
              borderRadius: "8px",
              color: isDark ? "#fafafa" : "#18181b",
            }}
            labelStyle={{ color: isDark ? "#fafafa" : "#18181b" }}
          />
        </RechartsRadar>
      </ResponsiveContainer>
    </motion.div>
  );
}
