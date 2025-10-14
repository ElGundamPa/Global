"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

interface LiveChartProps {
  symbol: string;
  currentPrice: number;
  changePercent: number;
}

type TimeRange = '1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL';

const timeRanges: TimeRange[] = ['1D', '1W', '1M', '3M', '1Y', 'ALL'];

export function LiveChart({ symbol, currentPrice, changePercent }: LiveChartProps) {
  const [data, setData] = useState<{ time: number; price: number }[]>([]);
  const [activeRange, setActiveRange] = useState<TimeRange>('1D');
  const [hoverPrice, setHoverPrice] = useState<number | null>(null);
  const [hoverTime, setHoverTime] = useState<number | null>(null);

  const generateData = useCallback((range: TimeRange, price: number) => {
    let points = 0;
    let intervalMs = 0;

    switch (range) {
      case '1D':
        points = 78;
        intervalMs = 5 * 60 * 1000;
        break;
      case '1W':
        points = 168;
        intervalMs = 60 * 60 * 1000;
        break;
      case '1M':
        points = 30;
        intervalMs = 24 * 60 * 60 * 1000;
        break;
      case '3M':
        points = 90;
        intervalMs = 24 * 60 * 60 * 1000;
        break;
      case '1Y':
        points = 252;
        intervalMs = 24 * 60 * 60 * 1000;
        break;
      case 'ALL':
        points = 500;
        intervalMs = 24 * 60 * 60 * 1000;
        break;
    }

    const now = Date.now();
    const newData: { time: number; price: number }[] = [];
    let currentPrice = price * 0.9;

    for (let i = 0; i < points; i++) {
      const volatility = price * 0.015;
      const change = (Math.random() - 0.48) * volatility;
      currentPrice = Math.max(currentPrice + change, price * 0.5);
      
      newData.push({
        time: now - (points - i) * intervalMs,
        price: Number(currentPrice.toFixed(2)),
      });
    }

    // Ensure last point is current price
    newData[newData.length - 1].price = price;

    return newData;
  }, []);

  useEffect(() => {
    const newData = generateData(activeRange, currentPrice);
    setData(newData);
  }, [activeRange, currentPrice, generateData]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        if (prevData.length === 0) return prevData;
        
        const lastPrice = prevData[prevData.length - 1].price;
        const volatility = currentPrice * 0.005;
        const change = (Math.random() - 0.5) * volatility;
        const newPrice = Number((lastPrice + change).toFixed(2));
        
        const newData = [...prevData.slice(1), {
          time: Date.now(),
          price: newPrice,
        }];
        
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentPrice]);

  const handleMouseMove = (e: any) => {
    if (e.activePayload && e.activePayload.length > 0) {
      const payload = e.activePayload[0].payload;
      setHoverPrice(payload.price);
      setHoverTime(payload.time);
    }
  };

  const handleMouseLeave = () => {
    setHoverPrice(null);
    setHoverTime(null);
  };

  const displayPrice = hoverPrice !== null ? hoverPrice : (data.length > 0 ? data[data.length - 1].price : currentPrice);
  const firstPrice = data.length > 0 ? data[0].price : currentPrice;
  const priceChange = displayPrice - firstPrice;
  const percentChange = (priceChange / firstPrice) * 100;
  const isPositive = percentChange >= 0;
  const chartColor = isPositive ? '#00FF87' : '#EF4444';

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    if (activeRange === '1D') {
      return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-[#0a0a0f] border border-white/10 rounded-xl p-6 shadow-lg shadow-white/5">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-sm text-gray-400 mb-1">{symbol}</h2>
          <motion.div
            key={displayPrice}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            className="text-4xl font-bold text-white mb-2"
          >
            ${displayPrice.toFixed(2)}
          </motion.div>
          <div className={`flex items-center gap-2 text-lg font-semibold ${
            isPositive ? 'text-fortune-green' : 'text-red-500'
          }`}>
            {isPositive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
            {isPositive ? '+' : ''}{priceChange.toFixed(2)} ({isPositive ? '+' : ''}{percentChange.toFixed(2)}%)
            {hoverTime && (
              <span className="text-sm text-gray-400 ml-2">
                {formatTime(hoverTime)}
              </span>
            )}
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg">
          {timeRanges.map((range) => (
            <motion.button
              key={range}
              onClick={() => setActiveRange(range)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                activeRange === range
                  ? 'bg-fortune-green text-black shadow-lg shadow-fortune-green/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {range}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-80 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <defs>
              <linearGradient id={`gradient-${symbol}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              hide
            />
            <YAxis
              domain={['dataMin - 5', 'dataMax + 5']}
              hide
            />
            <Tooltip
              cursor={{
                stroke: chartColor,
                strokeWidth: 1,
                strokeDasharray: '3 3',
              }}
              content={() => null}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke={chartColor}
              strokeWidth={2}
              fill={`url(#gradient-${symbol})`}
              isAnimationActive={true}
              animationDuration={300}
              animationEasing="ease-out"
              dot={false}
              activeDot={{
                r: 5,
                fill: chartColor,
                stroke: '#0a0a0f',
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Market Info */}
      <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
        <div>
          <div className="text-xs text-gray-400 mb-1">Apertura</div>
          <div className="text-sm font-semibold text-white">
            ${firstPrice.toFixed(2)}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-1">Máximo</div>
          <div className="text-sm font-semibold text-white">
            ${Math.max(...data.map(d => d.price)).toFixed(2)}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-1">Mínimo</div>
          <div className="text-sm font-semibold text-white">
            ${Math.min(...data.map(d => d.price)).toFixed(2)}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-1">Rango</div>
          <div className="text-sm font-semibold text-white">
            ${(Math.max(...data.map(d => d.price)) - Math.min(...data.map(d => d.price))).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}

