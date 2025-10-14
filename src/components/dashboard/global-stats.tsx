"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Activity, Briefcase, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { getUserBalance, getTopPerformingAssets, getPerformanceHistory, recalculatePortfolio } from "@/lib/user-balance";
import { getAllAssets } from "@/lib/mock-data";
import { LineChart, Line, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

export function GlobalStats() {
  const [balance, setBalance] = useState(getUserBalance());
  const [topAssets, setTopAssets] = useState<any[]>([]);
  const [performanceData, setPerformanceData] = useState<any[]>([]);

  useEffect(() => {
    // Get current prices for calculations
    const assets = getAllAssets();
    const currentPrices: Record<string, number> = {};
    assets.forEach(asset => {
      currentPrices[asset.id] = asset.price;
    });

    // Recalculate portfolio
    recalculatePortfolio(currentPrices);
    
    // Update state
    setBalance(getUserBalance());
    setTopAssets(getTopPerformingAssets(currentPrices));
    setPerformanceData(getPerformanceHistory());
  }, []);

  const isPositive = balance.totalProfitLoss >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
    >
      {/* Portfolio Value Card */}
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        className="bg-gradient-to-br from-fortune-green/20 to-fortune-electric/20 border border-fortune-green/30 rounded-xl p-6 shadow-lg shadow-fortune-green/10"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-gray-300 text-sm font-medium mb-1">Valor Total del Portafolio</div>
            <motion.div
              key={balance.totalPortfolioValue}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="text-3xl font-bold text-white mb-2"
            >
              ${balance.totalPortfolioValue.toFixed(2)}
            </motion.div>
            <div className={`flex items-center gap-1 text-sm font-semibold ${
              isPositive ? 'text-fortune-green' : 'text-red-500'
            }`}>
              {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {isPositive ? '+' : ''}{balance.totalProfitLoss.toFixed(2)} ({isPositive ? '+' : ''}{balance.profitLossPercent.toFixed(2)}%)
            </div>
          </div>
          <div className="w-12 h-12 bg-fortune-green/20 rounded-full flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-fortune-green" />
          </div>
        </div>

        {/* Mini Performance Chart */}
        {performanceData.length > 1 && (
          <div className="h-20 -mx-2 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <Line
                  type="monotone"
                  dataKey="portfolioValue"
                  stroke="#00FF87"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={true}
                  animationDuration={1000}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </motion.div>

      {/* Available Balance & Stats */}
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        className="bg-[#0a0a0f] border border-white/10 rounded-xl p-6 shadow-lg shadow-white/5"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="text-gray-300 text-sm font-medium mb-1">Balance Disponible</div>
            <div className="text-3xl font-bold text-white">
              ${balance.availableBalance.toFixed(2)}
            </div>
          </div>
          <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-blue-400" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-white/10">
            <span className="text-gray-400 text-sm">Total Invertido</span>
            <span className="text-white font-semibold">${balance.totalInvested.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Total Operaciones</span>
            <span className="text-white font-semibold">{balance.totalOperations}</span>
          </div>
        </div>
      </motion.div>

      {/* Top Performing Assets */}
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        className="bg-[#0a0a0f] border border-white/10 rounded-xl p-6 shadow-lg shadow-white/5"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-gray-300 text-sm font-medium mb-1">Top Activos</div>
            <div className="text-xs text-gray-500">Mejor rendimiento</div>
          </div>
          <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-purple-400" />
          </div>
        </div>

        {topAssets.length > 0 ? (
          <div className="space-y-3">
            {topAssets.map((asset, index) => {
              const isPositive = asset.profitLoss >= 0;
              return (
                <motion.div
                  key={asset.symbol}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-fortune-green/20 to-fortune-electric/20 flex items-center justify-center">
                      <span className="text-fortune-green font-bold text-xs">{asset.symbol.slice(0, 2)}</span>
                    </div>
                    <div>
                      <div className="text-white text-sm font-semibold">{asset.symbol}</div>
                      <div className="text-gray-500 text-xs">{asset.name}</div>
                    </div>
                  </div>
                  <div className={`text-right ${isPositive ? 'text-fortune-green' : 'text-red-500'}`}>
                    <div className="text-sm font-bold">
                      {isPositive ? '+' : ''}{asset.profitLossPercent.toFixed(1)}%
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="text-gray-500 text-sm">No hay activos aún</div>
            <div className="text-gray-600 text-xs mt-1">Comienza a invertir</div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

