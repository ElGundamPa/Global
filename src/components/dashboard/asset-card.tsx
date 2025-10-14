"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import Link from "next/link";
import { Asset } from "@/lib/assets-data";

interface AssetCardProps {
  asset: Asset;
  onBuy: (asset: Asset) => void;
  index: number;
}

export function AssetCard({ asset, onBuy, index }: AssetCardProps) {
  const isPositive = asset.changePercent >= 0;
  const changeColor = isPositive ? "text-green-500" : "text-red-500";
  const bgGradient = isPositive 
    ? "from-green-500/5 to-transparent" 
    : "from-red-500/5 to-transparent";

  // Get min and max for chart scaling
  const minPrice = Math.min(...asset.chartData);
  const maxPrice = Math.max(...asset.chartData);
  const priceRange = maxPrice - minPrice || 1;

  // Generate SVG path for chart
  const generatePath = () => {
    const width = 120;
    const height = 40;
    const points = asset.chartData.map((price, i) => {
      const x = (i / (asset.chartData.length - 1)) * width;
      const y = height - ((price - minPrice) / priceRange) * height;
      return `${x},${y}`;
    });
    return `M ${points.join(' L ')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-[#0a0a0f] border border-white/10 rounded-xl p-4 hover:border-fortune-green/30 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-white font-bold text-sm">{asset.symbol}</span>
            <span className="text-gray-500 text-xs">—</span>
            <span className="text-gray-400 text-xs truncate">{asset.name}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <motion.div 
              className={`flex items-center gap-1 ${changeColor} text-xs font-semibold`}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              {isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>{isPositive ? '+' : ''}{asset.changePercent.toFixed(2)}%</span>
            </motion.div>
            
            <div className="text-white font-bold text-lg">
              ${asset.price.toLocaleString('en-US', { 
                minimumFractionDigits: asset.type === 'currency' ? 4 : 2,
                maximumFractionDigits: asset.type === 'currency' ? 4 : 2 
              })}
            </div>
            
            <div className={`${changeColor} text-xs font-medium`}>
              {isPositive ? '+' : ''}{asset.change.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Mini chart */}
        <div className="w-32 h-12 ml-4">
          <svg viewBox="0 0 120 40" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`gradient-${asset.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop 
                  offset="0%" 
                  stopColor={isPositive ? "#00FF87" : "#EF4444"} 
                  stopOpacity="0.3" 
                />
                <stop 
                  offset="100%" 
                  stopColor={isPositive ? "#00FF87" : "#EF4444"} 
                  stopOpacity="0.05" 
                />
              </linearGradient>
            </defs>
            
            {/* Area under the line */}
            <motion.path
              d={`${generatePath()} L 120,40 L 0,40 Z`}
              fill={`url(#gradient-${asset.id})`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: index * 0.05 }}
            />
            
            {/* Line */}
            <motion.path
              d={generatePath()}
              fill="none"
              stroke={isPositive ? "#00FF87" : "#EF4444"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: index * 0.05, ease: "easeInOut" }}
            />
          </svg>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <Link href={`/dashboard/asset/${asset.id}`} className="flex-1">
          <motion.button
            className="w-full bg-white/5 border-2 border-white/20 text-white py-2 rounded-lg text-sm font-semibold hover:border-fortune-electric/50 hover:bg-fortune-electric/10 transition-all"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            Ver detalle
          </motion.button>
        </Link>
        <motion.button
          onClick={() => onBuy(asset)}
          className="flex-1 bg-gradient-to-r from-fortune-green/20 to-fortune-electric/20 border-2 border-fortune-green/50 text-white py-2 rounded-lg text-sm font-semibold hover:border-fortune-green transition-all relative overflow-hidden group/btn"
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10">Comprar</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-fortune-green/10 to-fortune-electric/10"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.5 }}
          />
        </motion.button>
      </div>
    </motion.div>
  );
}

