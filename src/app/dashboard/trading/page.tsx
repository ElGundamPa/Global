"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, Activity, DollarSign, Zap, ArrowUpRight, ArrowDownRight, X } from "lucide-react";
import Link from "next/link";
import { getAllAssets, generatePriceUpdate } from "@/lib/mock-data";
import { getUserBalance, recalculatePortfolio } from "@/lib/user-balance";
import { LiveChart } from "@/components/dashboard/live-chart";
import { TradePanel } from "@/components/dashboard/trade-panel";
import type { Asset } from "@/types";

export default function TradingPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [priceChanges, setPriceChanges] = useState<Record<string, 'up' | 'down' | 'neutral'>>({});
  const [isLive, setIsLive] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [balance, setBalance] = useState(getUserBalance());

  // Initialize assets
  useEffect(() => {
    const initialAssets = getAllAssets();
    setAssets(initialAssets);
  }, []);

  // Real-time price updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setAssets(prevAssets => {
        const newChanges: Record<string, 'up' | 'down' | 'neutral'> = {};
        
        const updatedAssets = prevAssets.map(asset => {
          const oldPrice = asset.price;
          const newPrice = generatePriceUpdate(oldPrice);
          const change = newPrice - oldPrice;
          const changePercent = (change / oldPrice) * 100;

          // Track price direction for animation
          if (newPrice > oldPrice) {
            newChanges[asset.id] = 'up';
          } else if (newPrice < oldPrice) {
            newChanges[asset.id] = 'down';
          } else {
            newChanges[asset.id] = 'neutral';
          }

          return {
            ...asset,
            price: newPrice,
            change24h: asset.change24h + change,
            changePercent24h: asset.changePercent24h + changePercent,
          };
        });

        setPriceChanges(newChanges);
        setLastUpdated(new Date());

        // Recalculate portfolio with new prices
        const currentPrices: Record<string, number> = {};
        updatedAssets.forEach(asset => {
          currentPrices[asset.id] = asset.price;
        });
        recalculatePortfolio(currentPrices);
        setBalance(getUserBalance());

        // Update selected asset if any
        if (selectedAsset) {
          const updated = updatedAssets.find(a => a.id === selectedAsset.id);
          if (updated) {
            setSelectedAsset(updated);
          }
        }

        // Clear change indicators after animation
        setTimeout(() => {
          setPriceChanges({});
        }, 500);

        return updatedAssets;
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [isLive, selectedAsset]);

  const handleTradeComplete = () => {
    setBalance(getUserBalance());
  };

  const stockAssets = assets.filter(a => a.type === 'stock');
  const cryptoAssets = assets.filter(a => a.type === 'crypto');
  const forexAssets = assets.filter(a => a.type === 'forex');

  const AssetRow = ({ asset, index }: { asset: Asset; index: number }) => {
    const isPositive = asset.changePercent24h >= 0;
    const priceChange = priceChanges[asset.id];

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.05 * index }}
        className={`border rounded-lg p-4 hover:bg-white/5 transition-all ${
          priceChange === 'up' 
            ? 'border-fortune-green/50 bg-fortune-green/10'
            : priceChange === 'down'
            ? 'border-red-500/50 bg-red-500/10'
            : 'border-white/10'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Left: Asset Info */}
          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-fortune-green/20 to-fortune-electric/20 flex items-center justify-center">
              <span className="text-fortune-green font-bold text-sm">{asset.symbol.slice(0, 2)}</span>
            </div>
            <div>
              <h3 className="text-white font-bold">{asset.symbol}</h3>
              <p className="text-gray-400 text-sm">{asset.name}</p>
            </div>
          </div>

          {/* Center: Price */}
          <div className="flex-1 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={asset.price}
                initial={{ scale: 1.2, color: priceChange === 'up' ? '#00FF87' : priceChange === 'down' ? '#EF4444' : '#FFFFFF' }}
                animate={{ scale: 1, color: '#FFFFFF' }}
                transition={{ duration: 0.3 }}
                className="text-white font-bold text-lg"
              >
                ${asset.price.toFixed(2)}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Change & Action */}
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className={`font-bold ${isPositive ? 'text-fortune-green' : 'text-red-500'}`}>
                {isPositive ? '+' : ''}{asset.change24h.toFixed(2)}
              </div>
              <div className={`text-sm font-semibold flex items-center justify-end gap-1 ${isPositive ? 'text-fortune-green' : 'text-red-500'}`}>
                {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {Math.abs(asset.changePercent24h).toFixed(2)}%
              </div>
            </div>
            <motion.button
              onClick={() => setSelectedAsset(asset)}
              className="px-4 py-2 bg-fortune-green/20 border border-fortune-green/50 text-fortune-green font-semibold rounded-lg hover:bg-fortune-green/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Operar
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <main className="flex-1 overflow-y-auto p-8 bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header with Live Indicator */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold text-white">Trading en Vivo</h1>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center gap-2 px-3 py-1 bg-red-500/20 border border-red-500/50 rounded-full"
              >
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 bg-red-500 rounded-full"
                />
                <span className="text-red-500 text-sm font-bold">EN VIVO</span>
              </motion.div>
            </div>
            <p className="text-gray-400">Precios actualizándose en tiempo real</p>
          </div>

          {/* Balance Display */}
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-xs text-gray-400 mb-1">Balance Disponible</div>
              <div className="text-xl font-bold text-fortune-green">
                ${balance.availableBalance.toFixed(2)}
              </div>
            </div>
            
            {/* Live Toggle */}
            <div className="flex items-center gap-3 pl-6 border-l border-white/10">
              <span className="text-gray-400 text-sm">Actualización</span>
              <button
                onClick={() => setIsLive(!isLive)}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  isLive ? 'bg-fortune-green' : 'bg-gray-600'
                }`}
              >
                <motion.div
                  animate={{ x: isLive ? 28 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-lg"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Market Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-fortune-green/20 to-fortune-electric/20 border border-fortune-green/30 rounded-xl p-6 shadow-lg shadow-fortune-green/10"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm font-medium">Estado del Mercado</span>
              <Activity className="w-5 h-5 text-fortune-green" />
            </div>
            <div className="text-2xl font-bold text-fortune-green">ABIERTO</div>
            <div className="text-sm text-gray-400 mt-1">Operaciones activas</div>
          </motion.div>

          {/* Active Assets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#0a0a0f] border border-white/10 rounded-xl p-6 shadow-lg shadow-white/5"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm font-medium">Activos Activos</span>
              <Zap className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="text-3xl font-bold text-white">{assets.length}</div>
            <div className="text-sm text-gray-400 mt-1">Disponibles para operar</div>
          </motion.div>

          {/* Gainers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#0a0a0f] border border-white/10 rounded-xl p-6 shadow-lg shadow-white/5"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm font-medium">En Alza</span>
              <TrendingUp className="w-5 h-5 text-fortune-green" />
            </div>
            <div className="text-3xl font-bold text-fortune-green">
              {assets.filter(a => a.changePercent24h > 0).length}
            </div>
            <div className="text-sm text-gray-400 mt-1">Activos positivos</div>
          </motion.div>

          {/* Losers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#0a0a0f] border border-white/10 rounded-xl p-6 shadow-lg shadow-white/5"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm font-medium">En Baja</span>
              <TrendingDown className="w-5 h-5 text-red-500" />
            </div>
            <div className="text-3xl font-bold text-red-500">
              {assets.filter(a => a.changePercent24h < 0).length}
            </div>
            <div className="text-sm text-gray-400 mt-1">Activos negativos</div>
          </motion.div>
        </div>

        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Activity className="w-4 h-4 text-fortune-green" />
            </motion.div>
            <span className="text-gray-400 text-sm">
              Última actualización: {lastUpdated.toLocaleTimeString('es-ES')}
            </span>
          </div>
        </motion.div>

        {/* Stocks Section */}
        {stockAssets.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <div className="bg-[#0a0a0f] border border-white/10 rounded-xl p-6 shadow-lg shadow-white/5">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-blue-400" />
                Acciones
              </h2>
              <div className="space-y-3">
                {stockAssets.map((asset, index) => (
                  <AssetRow key={asset.id} asset={asset} index={index} />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Crypto Section */}
        {cryptoAssets.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-8"
          >
            <div className="bg-[#0a0a0f] border border-white/10 rounded-xl p-6 shadow-lg shadow-white/5">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Zap className="w-6 h-6 text-fortune-green" />
                Criptomonedas
              </h2>
              <div className="space-y-3">
                {cryptoAssets.map((asset, index) => (
                  <AssetRow key={asset.id} asset={asset} index={index} />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Forex Section */}
        {forexAssets.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-8"
          >
            <div className="bg-[#0a0a0f] border border-white/10 rounded-xl p-6 shadow-lg shadow-white/5">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Activity className="w-6 h-6 text-purple-400" />
                Divisas (Forex)
              </h2>
              <div className="space-y-3">
                {forexAssets.map((asset, index) => (
                  <AssetRow key={asset.id} asset={asset} index={index} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Trading Modal */}
      <AnimatePresence>
        {selectedAsset && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAsset(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />

            {/* Modal Content */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.3 }}
                className="relative w-full max-w-7xl max-h-[90vh] overflow-y-auto bg-black rounded-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedAsset(null)}
                  className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                  {/* Left: Chart */}
                  <div className="lg:col-span-2">
                    <LiveChart
                      symbol={selectedAsset.symbol}
                      currentPrice={selectedAsset.price}
                      changePercent={selectedAsset.changePercent24h}
                    />
                  </div>

                  {/* Right: Trade Panel */}
                  <div>
                    <TradePanel
                      asset={selectedAsset}
                      onTradeComplete={handleTradeComplete}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}

