"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, TrendingUp, Briefcase, DollarSign, PieChart } from "lucide-react";
import Link from "next/link";
import { getPortfolio, PortfolioItem, calculatePortfolioValue } from "@/lib/portfolio";
import { getAssetById } from "@/lib/assets-data";
import { getAllAssets } from "@/lib/mock-data";
import { TradingAssetsCards } from "@/components/dashboard/trading-assets-cards";
import { CircularProgress } from "@/components/dashboard/circular-progress";

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [totalInvested, setTotalInvested] = useState(0);
  const [profitLoss, setProfitLoss] = useState(0);
  const [profitLossPercent, setProfitLossPercent] = useState(0);
  const [allocation, setAllocation] = useState({ stocks: 0, crypto: 0, currency: 0 });

  useEffect(() => {
    const portfolioData = getPortfolio();
    setPortfolio(portfolioData);

    // Calculate totals
    const allAssets = getAllAssets();
    const currentPrices: Record<string, number> = {};
    
    allAssets.forEach(asset => {
      currentPrices[asset.id] = asset.price;
    });

    const totalCurrentValue = calculatePortfolioValue(currentPrices);
    const totalInvestedAmount = portfolioData.reduce((sum, item) => sum + item.totalCost, 0);
    const pl = totalCurrentValue - totalInvestedAmount;
    const plPercent = totalInvestedAmount > 0 ? (pl / totalInvestedAmount) * 100 : 0;

    setTotalValue(totalCurrentValue);
    setTotalInvested(totalInvestedAmount);
    setProfitLoss(pl);
    setProfitLossPercent(plPercent);

    // Calculate allocation
    let stocksValue = 0, cryptoValue = 0, currencyValue = 0;
    
    portfolioData.forEach(item => {
      const currentPrice = currentPrices[item.assetId] || item.purchasePrice;
      const value = item.quantity * currentPrice;
      
      if (item.type === 'stock') stocksValue += value;
      else if (item.type === 'crypto') cryptoValue += value;
      else if (item.type === 'currency') currencyValue += value;
    });

    const total = stocksValue + cryptoValue + currencyValue;
    
    setAllocation({
      stocks: total > 0 ? (stocksValue / total) * 100 : 0,
      crypto: total > 0 ? (cryptoValue / total) * 100 : 0,
      currency: total > 0 ? (currencyValue / total) * 100 : 0,
    });
  }, []);

  const isPositive = profitLoss >= 0;

  // Get top 6 assets for trading cards
  const allAssets = getAllAssets();
  const topAssets = allAssets.slice(0, 6).map(asset => ({
    symbol: asset.symbol,
    name: asset.name,
    price: asset.price,
    change: asset.change24h,
    changePercent: asset.changePercent24h,
    chartData: Array.from({ length: 20 }, (_, i) => 
      asset.price + (Math.random() - 0.5) * (asset.price * 0.1)
    ),
  }));

  return (
    <main className="flex-1 overflow-y-auto p-8 bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Portafolio</h1>
            <p className="text-gray-400">Seguimiento de tus inversiones y rendimiento</p>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-green-600/20 border border-green-500/50 text-green-400 text-xs font-semibold rounded-lg hover:bg-green-600/30 transition-all"
            >
              Renta fija
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-yellow-600/20 border border-yellow-500/50 text-yellow-400 text-xs font-semibold rounded-lg hover:bg-yellow-600/30 transition-all"
            >
              Renta variable 2.0
            </motion.button>
          </div>
        </div>

        {/* Trading Assets Cards */}
        <TradingAssetsCards assets={topAssets} />

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Value */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-fortune-green/20 to-fortune-electric/20 border border-fortune-green/30 rounded-xl p-6 shadow-lg shadow-fortune-green/10"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm font-medium">Valor Total</span>
              <DollarSign className="w-5 h-5 text-fortune-green" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              ${totalValue.toFixed(2)}
            </div>
            <div className={`text-sm font-medium ${isPositive ? "text-fortune-green" : "text-red-500"}`}>
              {isPositive ? "↑" : "↓"} ${Math.abs(profitLoss).toFixed(2)} ({Math.abs(profitLossPercent).toFixed(2)}%)
            </div>
          </motion.div>

          {/* Total Invested */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#0a0a0f] border border-white/10 rounded-xl p-6 shadow-lg shadow-white/5"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm font-medium">Total Invertido</span>
              <Briefcase className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              ${totalInvested.toFixed(2)}
            </div>
            <div className="text-sm text-gray-400">
              Capital inicial
            </div>
          </motion.div>

          {/* Profit/Loss */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#0a0a0f] border border-white/10 rounded-xl p-6 shadow-lg shadow-white/5"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm font-medium">Ganancia/Pérdida</span>
              {isPositive ? (
                <ArrowUpRight className="w-5 h-5 text-fortune-green" />
              ) : (
                <ArrowDownRight className="w-5 h-5 text-red-500" />
              )}
            </div>
            <div className={`text-3xl font-bold mb-1 ${isPositive ? "text-fortune-green" : "text-red-500"}`}>
              {isPositive ? "+" : ""}${profitLoss.toFixed(2)}
            </div>
            <div className={`text-sm font-medium ${isPositive ? "text-fortune-green" : "text-red-500"}`}>
              {isPositive ? "+" : ""}{profitLossPercent.toFixed(2)}%
            </div>
          </motion.div>

          {/* Assets Count */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#0a0a0f] border border-white/10 rounded-xl p-6 shadow-lg shadow-white/5"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm font-medium">Activos</span>
              <PieChart className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {portfolio.length}
            </div>
            <div className="text-sm text-gray-400">
              En portafolio
            </div>
          </motion.div>
        </div>

        {/* Financial Progress and Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Tu progreso financiero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#0a0a0f] border border-white/10 rounded-xl p-6 shadow-lg shadow-white/5"
          >
            <h2 className="text-xl font-bold text-white mb-2">Tu progreso financiero</h2>
            <p className="text-gray-400 text-sm mb-4">
              Rendimiento acumulado de Renta fija y Renta variable
            </p>
            <div className="flex items-center gap-4 mb-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-300">Renta fija</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-300">Renta variable</span>
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-400 text-sm">Últimos 6 meses</p>
                <p className="text-white text-lg font-semibold">
                  Ganancias: ${profitLoss.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <CircularProgress 
                  percentage={Math.abs(profitLossPercent)} 
                  size={160}
                  strokeWidth={12}
                  color={isPositive ? "#00FF87" : "#EF4444"}
                />
              </div>
            </div>
          </motion.div>

          {/* Beneficios activos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-[#0a0a0f] border border-white/10 rounded-xl p-6 shadow-lg shadow-white/5"
          >
            <h2 className="text-xl font-bold text-white mb-2">Beneficios activos</h2>
            <p className="text-gray-400 text-sm mb-6">
              Observa en tiempo real cómo tus inversiones generan ganancias. Estos son tus beneficios actuales.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-3xl font-bold text-white mb-2">
                  ${(profitLoss * 0.6).toFixed(2)}
                </div>
                <div className={`text-sm font-semibold ${isPositive ? 'text-fortune-green' : 'text-red-400'}`}>
                  {isPositive ? '↑' : '↓'}{Math.abs(profitLossPercent * 0.6).toFixed(2)}%
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">
                  ${(profitLoss * 0.4).toFixed(2)}
                </div>
                <div className={`text-sm font-semibold ${isPositive ? 'text-fortune-green' : 'text-red-400'}`}>
                  {isPositive ? '↑' : '↓'}{Math.abs(profitLossPercent * 0.4).toFixed(2)}%
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Allocation Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-[#0a0a0f] border border-white/10 rounded-xl p-6 mb-8 shadow-lg shadow-white/5"
        >
          <h2 className="text-xl font-bold text-white mb-6">Distribución del Portafolio</h2>
          
          <div className="space-y-4">
            {/* Stocks */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300 text-sm font-medium">Acciones</span>
                <span className="text-white font-semibold">{allocation.stocks.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${allocation.stocks}%` }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="bg-gradient-to-r from-blue-500 to-blue-400 h-full rounded-full"
                />
              </div>
            </div>

            {/* Crypto */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300 text-sm font-medium">Criptomonedas</span>
                <span className="text-white font-semibold">{allocation.crypto.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${allocation.crypto}%` }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="bg-gradient-to-r from-fortune-green to-fortune-electric h-full rounded-full"
                />
              </div>
            </div>

            {/* Currency */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300 text-sm font-medium">Divisas</span>
                <span className="text-white font-semibold">{allocation.currency.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${allocation.currency}%` }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="bg-gradient-to-r from-purple-500 to-pink-400 h-full rounded-full"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Assets List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-[#0a0a0f] border border-white/10 rounded-xl p-6 shadow-lg shadow-white/5"
        >
          <h2 className="text-xl font-bold text-white mb-6">Activos en Portafolio</h2>
          
          {portfolio.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-400 mb-2">Tu portafolio está vacío</h3>
              <p className="text-gray-500 mb-6">Comienza a invertir para ver tus activos aquí</p>
              <Link
                href="/dashboard/compra"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-fortune-green to-fortune-electric text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-fortune-green/50 transition-all"
              >
                <TrendingUp className="w-4 h-4" />
                Explorar activos
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-white/10">
                    <th className="pb-3 text-gray-400 text-sm font-medium">Activo</th>
                    <th className="pb-3 text-gray-400 text-sm font-medium">Cantidad</th>
                    <th className="pb-3 text-gray-400 text-sm font-medium">Precio Compra</th>
                    <th className="pb-3 text-gray-400 text-sm font-medium">Precio Actual</th>
                    <th className="pb-3 text-gray-400 text-sm font-medium">Valor Total</th>
                    <th className="pb-3 text-gray-400 text-sm font-medium">Ganancia/Pérdida</th>
                    <th className="pb-3 text-gray-400 text-sm font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio.map((item, index) => {
                    const asset = getAssetById(item.assetId.toUpperCase());
                    const currentPrice = asset?.price || item.purchasePrice;
                    const currentValue = item.quantity * currentPrice;
                    const pl = currentValue - item.totalCost;
                    const plPercent = (pl / item.totalCost) * 100;
                    const isProfitable = pl >= 0;

                    return (
                      <motion.tr
                        key={item.assetId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fortune-green/20 to-fortune-electric/20 flex items-center justify-center">
                              <span className="text-fortune-green font-bold text-sm">{item.symbol.slice(0, 2)}</span>
                            </div>
                            <div>
                              <div className="text-white font-semibold">{item.symbol}</div>
                              <div className="text-gray-400 text-xs">{item.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 text-white">{item.quantity}</td>
                        <td className="py-4 text-white">${item.purchasePrice.toFixed(2)}</td>
                        <td className="py-4 text-white">${currentPrice.toFixed(2)}</td>
                        <td className="py-4 text-white font-semibold">${currentValue.toFixed(2)}</td>
                        <td className="py-4">
                          <div className={`font-semibold ${isProfitable ? "text-fortune-green" : "text-red-500"}`}>
                            {isProfitable ? "+" : ""}${pl.toFixed(2)}
                          </div>
                          <div className={`text-xs ${isProfitable ? "text-fortune-green" : "text-red-500"}`}>
                            {isProfitable ? "+" : ""}{plPercent.toFixed(2)}%
                          </div>
                        </td>
                        <td className="py-4">
                          <Link
                            href={`/dashboard/asset/${item.assetId}`}
                            className="text-fortune-green hover:text-fortune-electric transition-colors text-sm font-medium"
                          >
                            Ver detalle
                          </Link>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </motion.div>
    </main>
  );
}

