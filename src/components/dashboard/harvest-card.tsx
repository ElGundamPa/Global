"use client";

import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface BenefitItem {
  label: string;
  amount: string;
  percentage: string;
  isPositive: boolean;
}

const benefits: BenefitItem[] = [
  { label: "Renta Fija 2.0", amount: "$24,715.71", percentage: "61%", isPositive: true },
  { label: "Renta Variable 2.0", amount: "$138.10", percentage: "9.21%", isPositive: true },
];

export function HarvestCard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-[#0a0a0f] border border-white/5 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-white text-lg font-semibold mb-1 flex items-center gap-2">
            Tu Cosecha Financiera 
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              🌱
            </motion.span>
          </h3>
          <p className="text-gray-400 text-xs">
            ¡Mira todo lo que has logrado<br />desde que empezaste!
          </p>
        </div>
      </div>

      {/* Animated graph */}
      <div className="mb-4 h-20 relative">
        <svg viewBox="0 0 200 80" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="harvest-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 0,60 Q 25,55 50,50 T 100,40 T 150,30 T 200,20 L 200,80 L 0,80 Z"
            fill="url(#harvest-gradient)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path
            d="M 0,60 Q 25,55 50,50 T 100,40 T 150,30 T 200,20"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* Balance */}
      <motion.div 
        className="mb-6"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="text-white text-4xl font-bold mb-2">$25,436.81</div>
        <motion.div 
          className="flex items-center gap-1 text-green-500 text-sm"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <TrendingUp className="w-4 h-4" />
          <span className="font-medium">↑52.32%</span>
        </motion.div>
      </motion.div>

      {/* Withdraw Button */}
      <motion.button 
        className="w-full bg-blue-600/20 border-2 border-blue-500/50 hover:bg-blue-600/30 text-white py-3 rounded-lg text-sm font-semibold transition-all relative overflow-hidden group mb-6"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="relative z-10">Retirar</span>
        <motion.div
          className="absolute inset-0 bg-blue-500/20"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.5 }}
        />
      </motion.button>

      {/* Benefits Section */}
      <div className="border-t border-white/5 pt-6">
        <h4 className="text-white text-sm font-semibold mb-2">Beneficios activos</h4>
        <p className="text-gray-400 text-xs mb-4">
          Observa en tiempo real cómo tus inversiones generan ganancias. Estos son tus beneficios actuales.
        </p>

        <div className="space-y-4">
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index} 
              className="space-y-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-xs">{benefit.label}</span>
                <motion.span 
                  className={`text-xs font-semibold px-2 py-1 rounded ${
                    index === 0 ? "bg-yellow-500/20 text-yellow-400" : "bg-green-500/20 text-green-400"
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
                >
                  ↑{benefit.percentage}
                </motion.span>
              </div>
              <div className="text-white text-xl font-bold">{benefit.amount}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

