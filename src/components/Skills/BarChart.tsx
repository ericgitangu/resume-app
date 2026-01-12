"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import {
  BarChart as RechartsBar,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import skillsData from "@/data/skills.json";

// Flatten all skills and sort by years
const allSkills = skillsData.categories
  .flatMap((cat) => cat.skills)
  .sort((a, b) => b.years - a.years)
  .slice(0, 12);

// Explicit chart colors that work in both themes
const chartColors = [
  "#6366f1", // indigo
  "#14b8a6", // teal
  "#22c55e", // green
  "#f59e0b", // amber
  "#ec4899", // pink
];

export default function BarChart() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Theme-aware colors
  const isDark = mounted && resolvedTheme === "dark";
  const textColor = isDark ? "#a1a1aa" : "#52525b";
  const gridColor = isDark ? "#3f3f46" : "#e4e4e7";
  const bgColor = isDark ? "#27272a" : "#ffffff";
  const borderColor = isDark ? "#3f3f46" : "#e4e4e7";
  const mutedBg = isDark ? "rgba(63, 63, 70, 0.3)" : "rgba(228, 228, 231, 0.3)";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="h-[350px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBar
          data={allSkills}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} opacity={0.5} />
          <XAxis
            type="number"
            domain={[0, 10]}
            tick={{ fill: textColor, fontSize: 12 }}
            tickLine={{ stroke: gridColor }}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: textColor, fontSize: 12 }}
            tickLine={{ stroke: gridColor }}
            width={60}
          />
          <Tooltip
            cursor={{ fill: mutedBg }}
            contentStyle={{
              backgroundColor: bgColor,
              border: `1px solid ${borderColor}`,
              borderRadius: "8px",
              color: isDark ? "#fafafa" : "#18181b",
            }}
            labelStyle={{ color: isDark ? "#fafafa" : "#18181b" }}
            formatter={(value) => [`${value} years`, "Experience"]}
          />
          <Bar dataKey="years" radius={[0, 4, 4, 0]}>
            {allSkills.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
            ))}
          </Bar>
        </RechartsBar>
      </ResponsiveContainer>
    </motion.div>
  );
}
