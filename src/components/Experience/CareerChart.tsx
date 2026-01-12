"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Scatter,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import experienceData from "@/data/experience.json";

// Career level mapping
const levelMap: Record<string, number> = {
  Education: 0,
  Intern: 1,
  Engineer: 2,
  Senior: 3,
  Lead: 4,
  Director: 5,
};

const levelLabels = ["Education", "Intern", "Engineer", "Senior", "Lead", "Director"];

// Generate chart data from experience
function generateChartData() {
  const data: Array<{
    year: number;
    level: number;
    company: string;
    role: string;
    location: string;
    achievements: string[];
    isKenyan: boolean;
    isUS: boolean;
    isMilestone: boolean;
    milestoneLabel?: string;
  }> = [];

  // Add education period
  for (let year = 2011; year <= 2015; year++) {
    data.push({
      year,
      level: 0,
      company: "UMass Lowell",
      role: "B.Sc. Computer Science",
      location: "Lowell, MA",
      achievements:
        year === 2012
          ? ["Google Scholarship"]
          : year === 2013
          ? ["Microsoft Scholarship"]
          : [],
      isKenyan: false,
      isUS: true,
      isMilestone: year === 2012 || year === 2013,
      milestoneLabel: year === 2012 ? "Google Scholar" : year === 2013 ? "MS Scholar" : undefined,
    });
  }

  // Helper to detect US-based positions
  const isUSLocation = (location: string) => {
    const usStates = ["GA", "MA", "WA", "Remote", "Atlanta", "Burlington", "Seattle", "Peachtree", "Littleton"];
    return usStates.some(state => location.includes(state));
  };

  // Add positions (use spread to avoid mutating original array)
  [...experienceData.positions].reverse().forEach((pos) => {
    const startYear = parseInt(pos.startDate.split("-")[0]);
    const endYear = pos.endDate ? parseInt(pos.endDate.split("-")[0]) : 2026;
    const level = levelMap[pos.type] || 2;
    const isKenyan = pos.location.includes("Kenya");
    const isUS = isUSLocation(pos.location) && !isKenyan;

    for (let year = startYear; year <= endYear; year++) {
      // Check if we already have this year
      const existingIndex = data.findIndex((d) => d.year === year);
      if (existingIndex >= 0 && data[existingIndex].level < level) {
        data[existingIndex] = {
          year,
          level,
          company: pos.company,
          role: pos.role,
          location: pos.location,
          achievements: [],
          isKenyan,
          isUS,
          isMilestone: false,
        };
      } else if (existingIndex < 0) {
        data.push({
          year,
          level,
          company: pos.company,
          role: pos.role,
          location: pos.location,
          achievements: [],
          isKenyan,
          isUS,
          isMilestone: false,
        });
      }
    }
  });

  // Sort by year
  data.sort((a, b) => a.year - b.year);

  // Remove duplicates and keep highest level per year
  const uniqueData: typeof data = [];
  data.forEach((d) => {
    const existing = uniqueData.find((u) => u.year === d.year);
    if (!existing) {
      uniqueData.push(d);
    } else if (d.level > existing.level) {
      const idx = uniqueData.indexOf(existing);
      uniqueData[idx] = d;
    }
  });

  return uniqueData;
}

const chartData = generateChartData();

// Custom tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-lg p-4 min-w-[200px] bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-lg">
        <p className="font-bold text-lg text-zinc-900 dark:text-zinc-100">{data.year}</p>
        <p className="text-indigo-600 dark:text-indigo-400 font-medium">{data.company}</p>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm">{data.role}</p>
        <p className="text-zinc-500 dark:text-zinc-400 text-xs flex items-center gap-2 mt-1">
          {data.location}
          {data.isKenyan && (
            <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
              Kenya
            </span>
          )}
          {data.isUS && (
            <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-500" />
              USA
            </span>
          )}
        </p>
        {data.milestoneLabel && (
          <p className="text-amber-600 dark:text-amber-400 text-sm mt-2 font-medium">
            {data.milestoneLabel}
          </p>
        )}
      </div>
    );
  }
  return null;
};

export default function CareerChart() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Theme-aware colors
  const isDark = mounted && resolvedTheme === "dark";
  const textColor = isDark ? "#a1a1aa" : "#52525b";
  const gridColor = isDark ? "#3f3f46" : "#e4e4e7";
  const bgStroke = isDark ? "#18181b" : "#ffffff";

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-center">
                <span className="gradient-text">Career Progression</span>
              </CardTitle>
              <p className="text-center text-muted-foreground">
                From education to leadership - hover over points for details
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <defs>
                      <linearGradient id="levelGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={gridColor}
                      opacity={0.5}
                    />
                    <XAxis
                      dataKey="year"
                      stroke={textColor}
                      tick={{ fill: textColor, fontSize: 12 }}
                      tickLine={{ stroke: gridColor }}
                    />
                    <YAxis
                      domain={[0, 5]}
                      ticks={[0, 1, 2, 3, 4, 5]}
                      tickFormatter={(value) => levelLabels[value] || ""}
                      stroke={textColor}
                      tick={{ fill: textColor, fontSize: 12 }}
                      tickLine={{ stroke: gridColor }}
                      width={80}
                    />
                    <Tooltip content={<CustomTooltip />} />

                    {/* Area fill under the line */}
                    <Area
                      type="monotone"
                      dataKey="level"
                      stroke="none"
                      fill="url(#levelGradient)"
                      fillOpacity={1}
                      connectNulls
                    />

                    {/* Main career line */}
                    <Line
                      type="monotone"
                      dataKey="level"
                      stroke="#6366f1"
                      strokeWidth={3}
                      connectNulls
                      dot={(props: any) => {
                        const { cx, cy, payload } = props;
                        if (payload.isMilestone) {
                          return (
                            <circle
                              key={`milestone-${payload.year}`}
                              cx={cx}
                              cy={cy}
                              r={8}
                              fill="#f59e0b"
                              stroke={bgStroke}
                              strokeWidth={2}
                            />
                          );
                        }
                        if (payload.isKenyan) {
                          return (
                            <circle
                              key={`kenya-${payload.year}`}
                              cx={cx}
                              cy={cy}
                              r={6}
                              fill="#22c55e"
                              stroke={bgStroke}
                              strokeWidth={2}
                            />
                          );
                        }
                        if (payload.isUS) {
                          return (
                            <circle
                              key={`us-${payload.year}`}
                              cx={cx}
                              cy={cy}
                              r={6}
                              fill="#3b82f6"
                              stroke={bgStroke}
                              strokeWidth={2}
                            />
                          );
                        }
                        return (
                          <circle
                            key={`dot-${payload.year}`}
                            cx={cx}
                            cy={cy}
                            r={4}
                            fill="#6366f1"
                            stroke={bgStroke}
                            strokeWidth={2}
                          />
                        );
                      }}
                      activeDot={{ r: 8, strokeWidth: 2 }}
                    />

                    {/* Reference lines for key transitions */}
                    <ReferenceLine
                      x={2015}
                      stroke={textColor}
                      strokeDasharray="3 3"
                      label={{
                        value: "Graduation",
                        position: "top",
                        fill: textColor,
                        fontSize: 10,
                      }}
                    />
                    <ReferenceLine
                      x={2019}
                      stroke={textColor}
                      strokeDasharray="3 3"
                      label={{
                        value: "Kenya",
                        position: "top",
                        fill: "#22c55e",
                        fontSize: 10,
                      }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#3b82f6" }} />
                  <span className="text-zinc-600 dark:text-zinc-400">US-based</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#22c55e" }} />
                  <span className="text-zinc-600 dark:text-zinc-400">Kenya-based</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#f59e0b" }} />
                  <span className="text-zinc-600 dark:text-zinc-400">Milestone</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
