"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "@/components/dashboard/sidebar";
import { InteractiveChart } from "@/components/dashboard/interactive-chart";
import { ArrowLeft, TrendingUp, DollarSign, Building2, Users, MapPin, Calendar, Newspaper, ExternalLink } from "lucide-react";
import Link from "next/link";
import { isAuthenticated } from "@/lib/auth";
import { getAssetById, generateHistoricalData } from "@/lib/assets-data";
import { addToPortfolio } from "@/lib/portfolio";

export default function AssetDetailPage() {
  const router = useRouter();
  const params = useParams();
  const assetId = params?.id as string;

  const [asset, setAsset] = useState(getAssetById(assetId));
  const [quantity, setQuantity] = useState("1");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [chartData, setChartData] = useState<{ timestamp: number; price: number }[]>([]);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login");
      return;
    }

    if (!asset) {
      router.push("/dashboard/compra");
      return;
    }

    // Generate chart data
    const data = generateHistoricalData(asset.price, '1D');
    setChartData(data);
  }, [router, asset]);

  if (!asset) return null;

  const handleBuy = async () => {
    const qty = parseFloat(quantity);
    if (!qty || qty <= 0) {
      alert("Por favor ingresa una cantidad válida");
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    const result = addToPortfolio({
      assetId: asset.id,
      symbol: asset.symbol,
      name: asset.name,
      type: asset.type,
      quantity: qty,
      purchasePrice: asset.price,
    });

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setQuantity("1");
      }, 2000);
    }

    setLoading(false);
  };

  const estimatedCost = parseFloat(quantity || "0") * asset.price;
  const isPositive = asset.changePercent >= 0;

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-sm border-b border-white/5 px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/compra">
              <motion.button
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowLeft className="w-5 h-5 text-gray-400" />
              </motion.button>
            </Link>
            <div>
              <h1 className="text-white text-2xl font-bold flex items-center gap-2">
                {asset.name}
                <span className="text-gray-500 text-lg font-normal">— {asset.symbol}</span>
              </h1>
              <p className={`text-sm font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {isPositive ? '+' : ''}{asset.changePercent.toFixed(2)}% Today
              </p>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Interactive Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <InteractiveChart
                  data={chartData}
                  currentPrice={asset.price}
                  changePercent={asset.changePercent}
                  symbol={asset.symbol}
                />
              </motion.div>

              {/* About Section */}
              {asset.description && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-[#0a0a0f] border border-white/10 rounded-2xl p-6"
                >
                  <h2 className="text-white text-xl font-bold mb-4">Acerca de {asset.name}</h2>
                  <p className="text-gray-400 leading-relaxed">{asset.description}</p>
                </motion.div>
              )}

              {/* Company Info */}
              {asset.type === 'stock' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-[#0a0a0f] border border-white/10 rounded-2xl p-6"
                >
                  <h2 className="text-white text-xl font-bold mb-6">Información de la empresa</h2>
                  <div className="grid grid-cols-2 gap-6">
                    {asset.ceo && (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-fortune-green/20 flex items-center justify-center flex-shrink-0">
                          <Users className="w-5 h-5 text-fortune-green" />
                        </div>
                        <div>
                          <div className="text-gray-400 text-xs">CEO</div>
                          <div className="text-white font-semibold">{asset.ceo}</div>
                        </div>
                      </div>
                    )}
                    {asset.employees && (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-fortune-electric/20 flex items-center justify-center flex-shrink-0">
                          <Users className="w-5 h-5 text-fortune-electric" />
                        </div>
                        <div>
                          <div className="text-gray-400 text-xs">Empleados</div>
                          <div className="text-white font-semibold">{asset.employees}</div>
                        </div>
                      </div>
                    )}
                    {asset.headquarters && (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-5 h-5 text-yellow-500" />
                        </div>
                        <div>
                          <div className="text-gray-400 text-xs">Sede</div>
                          <div className="text-white font-semibold">{asset.headquarters}</div>
                        </div>
                      </div>
                    )}
                    {asset.founded && (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 text-purple-500" />
                        </div>
                        <div>
                          <div className="text-gray-400 text-xs">Fundada</div>
                          <div className="text-white font-semibold">{asset.founded}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Key Statistics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-[#0a0a0f] border border-white/10 rounded-2xl p-6"
              >
                <h2 className="text-white text-xl font-bold mb-6">Estadísticas clave</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {asset.marketCap && (
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="text-gray-400 text-xs mb-1">Market Cap</div>
                      <div className="text-white font-bold">{asset.marketCap}</div>
                    </div>
                  )}
                  {asset.peRatio && (
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="text-gray-400 text-xs mb-1">P/E Ratio</div>
                      <div className="text-white font-bold">{asset.peRatio}</div>
                    </div>
                  )}
                  {asset.dividendYield && (
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="text-gray-400 text-xs mb-1">Dividend Yield</div>
                      <div className="text-white font-bold">{asset.dividendYield}</div>
                    </div>
                  )}
                  {asset.volume && (
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="text-gray-400 text-xs mb-1">Volume</div>
                      <div className="text-white font-bold">{asset.volume}</div>
                    </div>
                  )}
                  {asset.dayHigh && asset.dayLow && (
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="text-gray-400 text-xs mb-1">Day Range</div>
                      <div className="text-white font-bold text-sm">
                        ${asset.dayLow} - ${asset.dayHigh}
                      </div>
                    </div>
                  )}
                  {asset.week52High && asset.week52Low && (
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="text-gray-400 text-xs mb-1">52 Week Range</div>
                      <div className="text-white font-bold text-sm">
                        ${asset.week52Low} - ${asset.week52High}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* News Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-[#0a0a0f] border border-white/10 rounded-2xl p-6"
              >
                <h2 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
                  <Newspaper className="w-6 h-6 text-fortune-green" />
                  Últimas noticias
                </h2>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <motion.a
                      key={i}
                      href="#"
                      className="block p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all group"
                      whileHover={{ scale: 1.02, x: 4 }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-white font-semibold mb-1 group-hover:text-fortune-green transition-colors">
                            {asset.name} anuncia nuevos desarrollos en su estrategia de crecimiento
                          </h3>
                          <p className="text-gray-400 text-sm mb-2">
                            La compañía reveló sus planes para el próximo trimestre con expectativas positivas...
                          </p>
                          <div className="text-gray-500 text-xs">Hace 2 horas • Bloomberg</div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-fortune-green transition-colors flex-shrink-0" />
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Buy Panel (Sidebar) */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-[#0a0a0f] border border-white/10 rounded-2xl p-6 sticky top-24"
              >
                <h2 className="text-white text-xl font-bold mb-6">Buy {asset.symbol}</h2>

                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm text-center"
                  >
                    ✓ Compra exitosa
                  </motion.div>
                )}

                <div className="space-y-4">
                  {/* Quantity Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Cantidad
                    </label>
                    <input
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-lg font-semibold focus:outline-none focus:border-fortune-green/50 focus:ring-2 focus:ring-fortune-green/20 transition-all"
                      disabled={loading}
                    />
                  </div>

                  {/* Summary */}
                  <div className="space-y-3 py-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Market Price</span>
                      <span className="text-white font-semibold">
                        ${asset.price.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Commissions</span>
                      <span className="text-green-500 font-semibold">$0.00</span>
                    </div>
                    <div className="border-t border-white/10 pt-3 flex items-center justify-between">
                      <span className="text-white font-semibold">Estimated Cost</span>
                      <span className="text-white font-bold text-lg">
                        ${estimatedCost.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Buy Button */}
                  <motion.button
                    onClick={handleBuy}
                    disabled={loading || success}
                    className="w-full px-6 py-4 bg-gradient-to-r from-fortune-green to-fortune-electric text-black rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-fortune-green/50 transition-all relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={!loading && !success ? { scale: 1.02, y: -2 } : {}}
                    whileTap={!loading && !success ? { scale: 0.98 } : {}}
                  >
                    <span className="relative z-10">
                      {loading ? "Procesando..." : success ? "¡Comprado!" : "Comprar"}
                    </span>
                    {!loading && !success && (
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

