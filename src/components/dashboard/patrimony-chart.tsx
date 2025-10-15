"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getPerformanceHistory, getUserBalance } from "@/lib/user-balance";

export function PatrimonyChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const balance = getUserBalance();
    // Generate monthly data for the last 12 months
    const months = ['Nov', 'Dic', 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct'];
    const performanceHistory = getPerformanceHistory();
    
    // Si hay historial real, usarlo; si no, generar datos de ejemplo
    if (performanceHistory.length > 12) {
      const monthlyData = months.map((month, index) => {
        const relevantData = performanceHistory.slice(index * 8, (index + 1) * 8);
        const avgRentaFija = relevantData.reduce((sum, item) => sum + item.portfolioValue * 0.3, 0) / relevantData.length || 0;
        const avgRentaVariable = relevantData.reduce((sum, item) => sum + item.portfolioValue * 0.7, 0) / relevantData.length || 0;
        
        return {
          month,
          rentaFija: avgRentaFija,
          rentaVariable: avgRentaVariable,
        };
      });
      setData(monthlyData);
    } else {
      // Generar datos de ejemplo que muestren crecimiento
      const baseValue = balance.totalInvested || 10000;
      const monthlyData = months.map((month, index) => {
        const growth = (index / months.length) * (balance.totalPortfolioValue - baseValue);
        return {
          month,
          rentaFija: baseValue * 0.3 + growth * 0.3 + (Math.random() - 0.5) * 500,
          rentaVariable: baseValue * 0.7 + growth * 0.7 + (Math.random() - 0.5) * 1000,
        };
      });
      setData(monthlyData);
    }
  }, []); // Solo ejecutar una vez al montar

  const balance = getUserBalance();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0a0a0f] border border-white/20 rounded-lg p-3 shadow-xl">
          <p className="text-white font-semibold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: ${entry.value.toFixed(2)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-[#0a0a0f] border border-white/10 rounded-xl p-6 mb-8 shadow-lg shadow-white/5"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Tus finanzas en pleno vuelo</h2>
        <h3 className="text-lg font-semibold text-gray-300 mb-1">La evolución de tu patrimonio</h3>
        <p className="text-gray-400 text-sm">
          Cada mes es una nueva oportunidad para conquistar tus metas financieras.
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis 
              dataKey="month" 
              stroke="#888"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#888"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />
            <Line 
              type="monotone" 
              dataKey="rentaFija" 
              name="Renta fija"
              stroke="#10b981" 
              strokeWidth={2}
              dot={{ fill: '#10b981', r: 4 }}
              activeDot={{ r: 6 }}
              isAnimationActive={true}
              animationDuration={1000}
            />
            <Line 
              type="monotone" 
              dataKey="rentaVariable" 
              name="Renta variable"
              stroke="#eab308" 
              strokeWidth={2}
              dot={{ fill: '#eab308', r: 4 }}
              activeDot={{ r: 6 }}
              isAnimationActive={true}
              animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Total de inversiones */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 pt-6 border-t border-white/10"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Total de inversiones</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-sm">Renta Variable 2.0</span>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </div>
            <div className="text-2xl font-bold text-white mt-2">
              ${(balance.totalInvested * 0.7).toFixed(2)}
            </div>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-sm">Renta Fija 2.0</span>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-2xl font-bold text-white mt-2">
              ${(balance.totalInvested * 0.3).toFixed(2)}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

