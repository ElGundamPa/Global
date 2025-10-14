"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from "recharts";

interface InteractiveChartProps {
  data: { timestamp: number; price: number }[];
  currentPrice: number;
  changePercent: number;
  symbol: string;
}

type Timeframe = '1D' | '1W' | '1M' | '3M' | 'YTD' | '1Y' | '5Y' | 'ALL';

export function InteractiveChart({ data, currentPrice, changePercent, symbol }: InteractiveChartProps) {
  const [hoveredPrice, setHoveredPrice] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>('1D');

  const displayPrice = hoveredPrice !== null ? hoveredPrice : currentPrice;
  const isPositive = hoveredPrice !== null 
    ? hoveredPrice >= data[0].price 
    : changePercent >= 0;
  
  const priceColor = isPositive ? "#00FF87" : "#EF4444";

  const timeframes: Timeframe[] = ['1D', '1W', '1M', '3M', 'YTD', '1Y', '5Y', 'ALL'];

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('en-US', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    })}`;
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    if (selectedTimeframe === '1D') {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload[0]) {
      const price = payload[0].value;
      setHoveredPrice(price);
      return null;
    }
    return null;
  };

  const handleMouseLeave = () => {
    setHoveredPrice(null);
    setHoveredIndex(null);
  };

  return (
    <div className="bg-[#0a0a0f] border border-white/10 rounded-2xl p-6">
      {/* Price Display */}
      <motion.div 
        className="mb-6"
        key={displayPrice}
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
      >
        <motion.div 
          className="text-5xl font-bold mb-2"
          style={{ color: priceColor }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 0.2 }}
        >
          {formatPrice(displayPrice)}
        </motion.div>
        <div className={`flex items-center gap-2 text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span className="font-semibold">
            {isPositive ? '+' : ''}{hoveredPrice !== null 
              ? ((hoveredPrice - data[0].price) / data[0].price * 100).toFixed(2)
              : changePercent.toFixed(2)}%
          </span>
          <span className="text-gray-400">
            {hoveredIndex !== null 
              ? formatTime(data[hoveredIndex].timestamp)
              : 'Today'}
          </span>
        </div>
      </motion.div>

      {/* Chart */}
      <div className="h-80 mb-6" onMouseLeave={handleMouseLeave}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            onMouseMove={(e: any) => {
              if (e && e.activeTooltipIndex !== undefined) {
                setHoveredIndex(e.activeTooltipIndex);
              }
            }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop 
                  offset="5%" 
                  stopColor={priceColor} 
                  stopOpacity={0.3}
                />
                <stop 
                  offset="95%" 
                  stopColor={priceColor} 
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="timestamp" 
              hide
            />
            <YAxis 
              domain={['auto', 'auto']}
              hide
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{
                stroke: priceColor,
                strokeWidth: 1,
                strokeDasharray: '5 5',
              }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke={priceColor}
              strokeWidth={2}
              fill="url(#colorPrice)"
              dot={false}
              activeDot={{
                r: 6,
                fill: priceColor,
                stroke: '#0a0a0f',
                strokeWidth: 2,
              }}
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Timeframe Selector */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {timeframes.map((tf) => (
          <motion.button
            key={tf}
            onClick={() => setSelectedTimeframe(tf)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
              selectedTimeframe === tf
                ? 'bg-fortune-green/20 text-fortune-green border-2 border-fortune-green'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border-2 border-transparent'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tf}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

