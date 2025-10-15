"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, Activity, DollarSign, Zap, ArrowUpRight, ArrowDownRight, X } from "lucide-react";
import Link from "next/link";
import { getAllAssets, generatePriceUpdate } from "@/lib/mock-data";
import { getUserBalance, recalculatePortfolio } from "@/lib/user-balance";
import { LiveChart } from "@/components/dashboard/live-chart";
import { TradePanel } from "@/components/dashboard/trade-panel";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import type { Asset } from "@/types";

export default function TradingPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [priceChanges, setPriceChanges] = useState<Record<string, 'up' | 'down' | 'neutral'>>({});
  const [isLive, setIsLive] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [balance, setBalance] = useState(getUserBalance());
  const [activeFilter, setActiveFilter] = useState<'all' | 'indices' | 'stocks' | 'crypto'>('all');
  const [searchTerm, setSearchTerm] = useState('');

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

  // Filter assets based on active filter and search
  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         asset.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;

    if (activeFilter === 'all') return true;
    if (activeFilter === 'stocks') return asset.type === 'stock';
    if (activeFilter === 'crypto') return asset.type === 'crypto';
    if (activeFilter === 'indices') return asset.type === 'forex'; // Usando forex como índices
    
    return true;
  });

  // Generate sparkline data for each asset
  const generateSparklineData = (price: number) => {
    return Array.from({ length: 20 }, (_, i) => {
      const variation = (Math.random() - 0.5) * (price * 0.05);
      return price + variation;
    });
  };

  const AssetTableRow = ({ asset, index }: { asset: Asset; index: number }) => {
    const isPositive = asset.changePercent24h >= 0;
    const priceChange = priceChanges[asset.id];
    const sparklineData = generateSparklineData(asset.price).map(value => ({ value }));

    // Generar logo basado en el símbolo
    const getAssetLogo = (symbol: string) => {
      const colors = ['#00FF87', '#00D9FF', '#8B5CF6', '#EF4444', '#F59E0B', '#10B981'];
      const bgColor = colors[Math.floor(Math.random() * colors.length)];
      
      return (
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-sm"
          style={{ backgroundColor: `${bgColor}40`, border: `2px solid ${bgColor}80` }}
        >
          {symbol.slice(0, 2)}
        </div>
      );
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.03 * index }}
        className={`grid grid-cols-[120px,80px,120px,140px,1fr,80px] gap-4 px-6 py-4 border-b border-white/10 hover:bg-white/5 transition-all cursor-pointer ${
          priceChange === 'up' 
            ? 'bg-fortune-green/5'
            : priceChange === 'down'
            ? 'bg-red-500/5'
            : ''
        }`}
        onClick={() => setSelectedAsset(asset)}
      >
        {/* Compra */}
        <div className="flex items-center gap-3">
          <motion.button
            className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/50 text-blue-400 text-xs font-bold hover:bg-blue-500/30 transition-all flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedAsset(asset);
            }}
          >
            C
          </motion.button>
          <AnimatePresence mode="wait">
            <motion.div
              key={asset.price}
              initial={{ scale: 1.1, color: priceChange === 'up' ? '#00FF87' : priceChange === 'down' ? '#EF4444' : '#FFFFFF' }}
              animate={{ scale: 1, color: '#FFFFFF' }}
              transition={{ duration: 0.3 }}
              className="text-white font-semibold text-sm"
            >
              ${asset.price.toFixed(2)}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Posiciones */}
        <div className="flex items-center justify-center">
          <span className="text-gray-400 text-sm">0</span>
        </div>

        {/* 1D (Daily Change) */}
        <div className="flex flex-col justify-center">
          <div className={`font-semibold text-sm ${isPositive ? 'text-fortune-green' : 'text-red-500'}`}>
            ${asset.price.toFixed(2)}
          </div>
          <div className={`text-xs font-semibold flex items-center gap-1 ${isPositive ? 'text-fortune-green' : 'text-red-500'}`}>
            {isPositive ? '↑' : '↓'}
            {Math.abs(asset.changePercent24h).toFixed(2)}%
          </div>
        </div>

        {/* Gráfico (Sparkline) */}
        <div className="flex items-center">
          <ResponsiveContainer width="100%" height={40}>
            <LineChart data={sparklineData}>
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

        {/* Mercado (Asset Name) */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <h3 className="text-white font-semibold text-sm">{asset.name}</h3>
            <p className="text-gray-500 text-xs">{asset.symbol}</p>
          </div>
        </div>

        {/* Logo */}
        <div className="flex items-center justify-end">
          {getAssetLogo(asset.symbol)}
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

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6 flex items-center gap-4"
        >
          {/* Search Bar */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Buscar activos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-fortune-green/50 focus:ring-2 focus:ring-fortune-green/20 transition-all"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            <motion.button
              onClick={() => setActiveFilter('indices')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                activeFilter === 'indices'
                  ? 'bg-fortune-green/20 border border-fortune-green/50 text-fortune-green'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Índices
            </motion.button>
            <motion.button
              onClick={() => setActiveFilter('stocks')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                activeFilter === 'stocks'
                  ? 'bg-fortune-green/20 border border-fortune-green/50 text-fortune-green'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              Acciones
            </motion.button>
            <motion.button
              onClick={() => setActiveFilter('crypto')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                activeFilter === 'crypto'
                  ? 'bg-fortune-green/20 border border-fortune-green/50 text-fortune-green'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              Crypto
            </motion.button>
            {activeFilter !== 'all' && (
              <motion.button
                onClick={() => setActiveFilter('all')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-2 rounded-lg text-sm font-semibold bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500/30 transition-all"
              >
                Limpiar
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Assets Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-[#0a0a0f] border border-white/10 rounded-xl shadow-lg shadow-white/5 overflow-hidden mb-8"
        >
          {/* Table Header */}
          <div className="grid grid-cols-[120px,80px,120px,140px,1fr,80px] gap-4 px-6 py-4 border-b border-white/10 bg-white/5">
            <div className="text-gray-400 text-sm font-semibold">Compra</div>
            <div className="text-gray-400 text-sm font-semibold text-center">Posiciones</div>
            <div className="text-gray-400 text-sm font-semibold">1D</div>
            <div className="text-gray-400 text-sm font-semibold">Gráfico</div>
            <div className="text-gray-400 text-sm font-semibold">Mercado</div>
            <div className="text-gray-400 text-sm font-semibold text-right">Logo</div>
          </div>

          {/* Table Body */}
          <div>
            {filteredAssets.length > 0 ? (
              filteredAssets.map((asset, index) => (
                <AssetTableRow key={asset.id} asset={asset} index={index} />
              ))
            ) : (
              <div className="text-center py-20">
                <div className="text-gray-500 text-lg mb-2">No se encontraron activos</div>
                <div className="text-gray-600 text-sm">Intenta ajustar los filtros o la búsqueda</div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
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

