"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

type MarketTab = "stocks" | "crypto" | "forex";

interface MarketAsset {
  symbol: string;
  name: string;
  price: string;
  change: number;
  changePercent: number;
  data: { value: number }[];
}

const marketData: Record<MarketTab, MarketAsset[]> = {
  stocks: [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: "$178.72",
      change: 2.45,
      changePercent: 1.39,
      data: [{ value: 175 }, { value: 176 }, { value: 174 }, { value: 177 }, { value: 179 }, { value: 178 }, { value: 178.72 }],
    },
    {
      symbol: "TSLA",
      name: "Tesla Inc.",
      price: "$242.15",
      change: -3.82,
      changePercent: -1.55,
      data: [{ value: 248 }, { value: 246 }, { value: 247 }, { value: 244 }, { value: 243 }, { value: 241 }, { value: 242.15 }],
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corp.",
      price: "$405.89",
      change: 5.23,
      changePercent: 1.31,
      data: [{ value: 400 }, { value: 402 }, { value: 401 }, { value: 404 }, { value: 406 }, { value: 407 }, { value: 405.89 }],
    },
  ],
  crypto: [
    {
      symbol: "BTC",
      name: "Bitcoin",
      price: "$67,234.50",
      change: 1842.30,
      changePercent: 2.82,
      data: [{ value: 65000 }, { value: 66000 }, { value: 65500 }, { value: 67000 }, { value: 68000 }, { value: 67500 }, { value: 67234.5 }],
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      price: "$3,456.80",
      change: 89.20,
      changePercent: 2.65,
      data: [{ value: 3350 }, { value: 3380 }, { value: 3360 }, { value: 3420 }, { value: 3480 }, { value: 3450 }, { value: 3456.8 }],
    },
    {
      symbol: "SOL",
      name: "Solana",
      price: "$142.35",
      change: -2.15,
      changePercent: -1.49,
      data: [{ value: 145 }, { value: 144 }, { value: 143 }, { value: 142 }, { value: 141 }, { value: 143 }, { value: 142.35 }],
    },
  ],
  forex: [
    {
      symbol: "EUR/USD",
      name: "Euro / US Dollar",
      price: "1.0875",
      change: 0.0023,
      changePercent: 0.21,
      data: [{ value: 1.085 }, { value: 1.086 }, { value: 1.0855 }, { value: 1.087 }, { value: 1.088 }, { value: 1.0872 }, { value: 1.0875 }],
    },
    {
      symbol: "GBP/USD",
      name: "British Pound / US Dollar",
      price: "1.2654",
      change: -0.0015,
      changePercent: -0.12,
      data: [{ value: 1.267 }, { value: 1.266 }, { value: 1.2665 }, { value: 1.265 }, { value: 1.264 }, { value: 1.2658 }, { value: 1.2654 }],
    },
    {
      symbol: "USD/JPY",
      name: "US Dollar / Japanese Yen",
      price: "149.82",
      change: 0.45,
      changePercent: 0.30,
      data: [{ value: 149 }, { value: 149.5 }, { value: 149.2 }, { value: 149.8 }, { value: 150 }, { value: 149.9 }, { value: 149.82 }],
    },
  ],
};

export function Markets() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState<MarketTab>("stocks");

  const tabs = [
    { id: "stocks" as MarketTab, label: "Acciones", emoji: "📈" },
    { id: "crypto" as MarketTab, label: "Criptomonedas", emoji: "₿" },
    { id: "forex" as MarketTab, label: "Divisas", emoji: "💱" },
  ];

  return (
    <section
      ref={ref}
      id="markets"
      className="relative py-24 md:py-32 bg-gradient-to-b from-fortune-black via-fortune-blue-dark to-fortune-black overflow-hidden"
    >
      {/* Fondo animado */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-fortune-electric/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-fortune-green/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Mercados en Tiempo Real
          </h2>
          <p className="text-base text-gray-400 max-w-2xl mx-auto">
            Monitorea los principales activos globales con datos actualizados al instante.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="glass-morphism rounded-2xl p-2 inline-flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-fortune-green to-fortune-electric text-fortune-black shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span className="mr-2">{tab.emoji}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Market cards */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {marketData[activeTab].map((asset, index) => (
              <motion.div
                key={asset.symbol}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="glass-morphism-strong rounded-2xl p-6 hover-lift group">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {asset.symbol}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {asset.name}
                      </p>
                    </div>
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-lg ${
                      asset.change >= 0 
                        ? 'bg-fortune-green/20 text-fortune-green' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {asset.change >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="text-sm font-semibold">
                        {asset.changePercent >= 0 ? '+' : ''}
                        {asset.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-white mb-1">
                      {asset.price}
                    </div>
                    <div className={`text-sm ${asset.change >= 0 ? 'text-fortune-green' : 'text-red-400'}`}>
                      {asset.change >= 0 ? '+' : ''}
                      {asset.change.toFixed(2)}
                    </div>
                  </div>

                  {/* Mini chart */}
                  <div className="h-20 -mx-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={asset.data}>
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke={asset.change >= 0 ? "#00FF87" : "#ef4444"}
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="glass-morphism rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              ¿Listo para acceder a todos los mercados?
            </h3>
            <p className="text-gray-400 mb-6">
              Crea tu cuenta y empieza a invertir en acciones, criptomonedas y divisas desde $500
            </p>
            <motion.a
              href="/auth/signup"
              whileHover={{ scale: 1.05 }}
              className="inline-block px-8 py-4 bg-gradient-to-r from-fortune-green to-fortune-electric rounded-xl text-fortune-black font-semibold shadow-lg shadow-fortune-green/30 hover:shadow-fortune-green/50 transition-all"
            >
              Comenzar a invertir
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


