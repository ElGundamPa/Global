"use client";

import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";

export function ProgressChart() {
  const percentage = 53;
  const circumference = 2 * Math.PI * 80;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-[#0a0a0f] border border-white/5 rounded-2xl p-6 hover:border-yellow-500/30 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-white text-base font-semibold">Tu progreso financiero</h3>
        <motion.button 
          className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MoreHorizontal className="w-5 h-5" />
        </motion.button>
      </div>

      <p className="text-gray-400 text-xs mb-6">
        Rendimiento acumulado de Renta fija y Renta variable
      </p>

      <div className="flex items-center gap-8">
        {/* Chart */}
        <div className="relative w-48 h-48">
          {/* Circular progress */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#1a1a1f"
              strokeWidth="20"
            />
            {/* Animated Progress circle */}
            <motion.circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="20"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              strokeLinecap="round"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#FFA500" />
              </linearGradient>
            </defs>
          </svg>
          {/* Center text with animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              className="text-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              <motion.div 
                className="text-yellow-500 text-5xl font-bold"
                initial={{ y: 10 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3, delay: 1.7 }}
              >
                %{percentage}
              </motion.div>
            </motion.div>
          </div>
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%)",
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <motion.div 
            className="mb-6"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="text-gray-400 text-xs mb-1">Últimos</div>
            <motion.div 
              className="text-white text-4xl font-bold mb-1"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              6 Meses
            </motion.div>
            <div className="text-gray-400 text-xs mt-3">Ganancias:</div>
            <motion.div 
              className="text-green-500 text-xl font-semibold"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              +$22,840.24 USD
            </motion.div>
          </motion.div>

          {/* Legend */}
          <motion.div 
            className="flex items-center gap-4 text-xs"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            <div className="flex items-center gap-2">
              <motion.div 
                className="w-3 h-3 rounded-full bg-yellow-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
              />
              <span className="text-gray-400">Renta fija</span>
            </div>
            <div className="flex items-center gap-2">
              <motion.div 
                className="w-3 h-3 rounded-full bg-green-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 2, delay: 0.3 }}
              />
              <span className="text-gray-400">Renta Variable</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

