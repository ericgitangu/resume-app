"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const STAR_COUNT = 80;

function generateStars(): Star[] {
  return Array.from({ length: STAR_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 5,
  }));
}

export default function StarField() {
  const [stars] = useState<Star[]>(() => generateStars());
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    }
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (containerRef.current && e.touches[0]) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.touches[0].clientX - rect.left) / rect.width) * 100,
        y: ((e.touches[0].clientY - rect.top) / rect.height) * 100,
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [handleMouseMove, handleTouchMove]);

  const getStarBrightness = (star: Star) => {
    const distance = Math.sqrt(
      Math.pow(star.x - mousePos.x, 2) + Math.pow(star.y - mousePos.y, 2)
    );
    const maxDistance = 15;
    if (distance < maxDistance) {
      return 1;
    }
    return 0;
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {stars.map((star) => {
        const isNearCursor = getStarBrightness(star) > 0;
        return (
          <motion.div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: isNearCursor ? [0.9, 1, 0.9] : [0.2, 0.8, 0.2],
              scale: isNearCursor ? [1.2, 1.8, 1.2] : [1, 1.3, 1],
              boxShadow: isNearCursor
                ? [
                    "0 0 4px 2px rgba(255,255,255,0.8)",
                    "0 0 8px 4px rgba(255,255,255,1)",
                    "0 0 4px 2px rgba(255,255,255,0.8)",
                  ]
                : [
                    "0 0 2px 1px rgba(255,255,255,0.3)",
                    "0 0 4px 2px rgba(255,255,255,0.6)",
                    "0 0 2px 1px rgba(255,255,255,0.3)",
                  ],
            }}
            transition={{
              duration: isNearCursor ? 0.8 : star.duration,
              delay: isNearCursor ? 0 : star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div
              className="w-full h-full rounded-full bg-white"
              style={{
                background: isNearCursor
                  ? "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(200,220,255,0.8) 50%, transparent 100%)"
                  : "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(200,220,255,0.5) 50%, transparent 100%)",
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
