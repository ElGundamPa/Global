"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Eye, Sparkles } from "lucide-react";
import { getUserBalance } from "@/lib/user-balance";
import { LineChart, Line, ResponsiveContainer } from "recharts";

export function EarningsCards() {
  const [balance, setBalance] = useState(getUserBalance());
  const [last24h, setLast24h] = useState(0);

  useEffect(() => {
    setBalance(getUserBalance());
    
    // Simulate 24h change (en producción vendría de la API)
    const mockChange = balance.totalProfitLoss * 0.1; // 10% del profit total
    setLast24h(mockChange);
  }, [balance.totalProfitLoss]);

  // Generate mini chart data
  const generateMiniChartData = (isPositive: boolean) => {
    const points = 12;
    const data = [];
    let value = 50;
    
    for (let i = 0; i < points; i++) {
      const change = (Math.random() - (isPositive ? 0.3 : 0.7)) * 10;
      value = Math.max(20, Math.min(80, value + change));
      data.push({ value });
    }
    
    return data;
  };

  const totalEarningsData = generateMiniChartData(balance.totalProfitLoss >= 0);
  const last24hData = generateMiniChartData(last24h >= 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Tus Ganancias Totales */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-xl p-6 shadow-lg relative overflow-hidden group"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-5 h-5 text-blue-400" />
            <h3 className="text-white font-semibold">Tus Ganancias Totales</h3>
          </div>
          <div className={`text-3xl font-bold mb-2 ${balance.totalProfitLoss >= 0 ? 'text-fortune-green' : 'text-red-400'}`}>
            ${Math.abs(balance.totalProfitLoss).toFixed(2)}
          </div>
          <p className="text-gray-400 text-xs">
            ¡Mira todo lo que has logrado desde que empezaste!
          </p>
        </div>

        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>

      {/* Mira cómo crece tu dinero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-fortune-green/10 to-fortune-electric/10 border border-fortune-green/20 rounded-xl p-6 shadow-lg relative overflow-hidden group"
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-white font-semibold mb-1">¡Mira cómo crece tu dinero!</h3>
              <div className={`text-2xl font-bold ${last24h >= 0 ? 'text-fortune-green' : 'text-red-400'}`}>
                {last24h >= 0 ? '+' : ''}${last24h.toFixed(2)}
              </div>
              <p className="text-gray-400 text-xs mt-1">En las últimas 24hs</p>
            </div>
            <div className="w-20 h-16">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={last24hData}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={last24h >= 0 ? "#00FF87" : "#EF4444"}
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-2 text-fortune-green text-xs font-semibold hover:text-fortune-electric transition-colors"
          >
            Ver detalles →
          </motion.button>
        </div>

        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-fortune-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>

      {/* Inversión en Renta Variable 2.0 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-xl p-6 shadow-lg relative overflow-hidden group"
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-white font-semibold text-sm mb-1">
                Tu inversión en Renta Variable 2.0 impulsada por IA generó un
              </h3>
              <div className={`text-2xl font-bold ${balance.profitLossPercent >= 0 ? 'text-fortune-green' : 'text-red-400'}`}>
                {balance.profitLossPercent >= 0 ? '↑' : '↓'}{Math.abs(balance.profitLossPercent).toFixed(2)}%
              </div>
              <p className="text-gray-400 text-xs mt-1">En las últimas 24hs</p>
            </div>
            <div className="w-20 h-16">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={totalEarningsData}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={balance.profitLossPercent >= 0 ? "#00FF87" : "#EF4444"}
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-2 text-purple-400 text-xs font-semibold hover:text-purple-300 transition-colors"
          >
            Ver detalles →
          </motion.button>
        </div>

        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>
    </div>
  );
}

