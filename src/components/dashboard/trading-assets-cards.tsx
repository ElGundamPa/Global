"use client";

import { motion } from "framer-motion";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface AssetCardProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  chartData: number[];
}

export function TradingAssetsCards({ assets }: { assets: AssetCardProps[] }) {
  const generateChartData = (values: number[]) => {
    return values.map(value => ({ value }));
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">Tus inversiones en trading</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {assets.map((asset, index) => {
          const isPositive = asset.changePercent >= 0;
          const chartData = generateChartData(asset.chartData);

          return (
            <motion.div
              key={asset.symbol}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * index }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-[#0a0a0f] border border-white/10 rounded-xl p-4 shadow-lg hover:border-fortune-green/30 transition-all cursor-pointer group"
            >
              <div className="mb-3">
                <h3 className="text-white font-bold text-sm mb-1">{asset.symbol}</h3>
                <p className="text-gray-500 text-xs">{asset.name}</p>
              </div>

              <div className="mb-2">
                <div className="text-white font-bold text-lg">
                  {asset.price.toLocaleString('en-US', { 
                    style: 'decimal',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2 
                  })}
                </div>
                <div className={`text-xs font-semibold ${isPositive ? 'text-fortune-green' : 'text-red-400'}`}>
                  {isPositive ? '+' : ''}{asset.changePercent.toFixed(2)}%
                </div>
              </div>

              <div className="h-12">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke={isPositive ? "#00FF87" : "#EF4444"}
                      strokeWidth={1.5}
                      dot={false}
                      isAnimationActive={true}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Table Headers */}
      <div className="grid grid-cols-5 gap-4 px-4 py-2 border-t border-b border-white/10 text-gray-400 text-sm font-medium">
        <div>Posiciones</div>
        <div>Unidades</div>
        <div>G/P</div>
        <div>Valor</div>
        <div>Mercado</div>
      </div>
    </div>
  );
}

