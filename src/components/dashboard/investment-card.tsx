"use client";

import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface InvestmentCardProps {
  title: string;
  minInvestment: string;
  balance: string;
  badge?: string;
  badgeColor?: string;
  variant?: "green" | "yellow";
}

export function InvestmentCard({
  title,
  minInvestment,
  balance,
  badge,
  badgeColor = "bg-green-500",
  variant = "green",
}: InvestmentCardProps) {
  const [pathOffset, setPathOffset] = useState(0);
  const bgColor = variant === "green" ? "from-green-900/20 to-green-950/20" : "from-yellow-900/20 to-yellow-950/20";
  const borderColor = variant === "green" ? "border-green-500/30" : "border-yellow-500/30";
  const buttonBorder = variant === "green" ? "border-green-500/50" : "border-yellow-500/50";
  const buttonHover = variant === "green" ? "hover:bg-green-500/10" : "hover:bg-yellow-500/10";
  const graphColor = variant === "green" ? "#00FF87" : "#FFD700";
  
  // Animated graph points for different variants
  const graphPoints = variant === "green" 
    ? "0,40 15,38 30,35 45,30 60,28 75,25 90,22 105,20"
    : "0,35 15,32 30,36 45,28 60,30 75,25 90,27 105,22";

  useEffect(() => {
    const interval = setInterval(() => {
      setPathOffset((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-br ${bgColor} border ${borderColor} rounded-2xl p-6 relative overflow-hidden group hover:shadow-lg hover:shadow-${variant === "green" ? "green" : "yellow"}-500/20 transition-all duration-300`}
    >
      {/* Animated background decoration */}
      <div className="absolute bottom-0 right-0 w-48 h-32 opacity-20">
        <svg viewBox="0 0 120 50" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`gradient-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={graphColor} stopOpacity="0.2" />
              <stop offset="100%" stopColor={graphColor} stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <motion.path
            d={`M ${graphPoints} L 105,50 L 0,50 Z`}
            fill={`url(#gradient-${variant})`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.polyline
            points={graphPoints}
            fill="none"
            stroke={graphColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          {/* Animated dots on the line */}
          {[0, 15, 30, 45, 60, 75, 90, 105].map((x, i) => {
            const points = graphPoints.split(' ').map(p => p.split(',').map(Number));
            const y = points[i] ? points[i][1] : 20;
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r="1.5"
                fill={graphColor}
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.5, delay: 2 + i * 0.1 }}
              />
            );
          })}
        </svg>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div>
          <h3 className={`text-${variant === "green" ? "green" : "yellow"}-400 text-lg font-bold mb-1`}>{title}</h3>
          <p className="text-gray-400 text-xs">{minInvestment}</p>
        </div>
        {badge && (
          <motion.span 
            className={`${badgeColor} text-white text-[10px] font-medium px-2 py-1 rounded`}
            whileHover={{ scale: 1.05 }}
          >
            {badge}
          </motion.span>
        )}
      </div>

      {/* Balance */}
      <motion.div 
        className="mb-6 relative z-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="text-white text-3xl font-bold">{balance}</div>
      </motion.div>

      {/* Button */}
      <motion.button 
        className={`w-full bg-transparent border-2 ${buttonBorder} ${buttonHover} text-white py-2.5 rounded-lg text-sm font-semibold transition-all relative z-10 overflow-hidden group/btn`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="relative z-10">Invertir</span>
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${variant === "green" ? "from-green-500/20 to-green-600/20" : "from-yellow-500/20 to-yellow-600/20"}`}
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.5 }}
        />
      </motion.button>
    </motion.div>
  );
}

