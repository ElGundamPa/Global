"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "@/components/dashboard/sidebar";
import { AssetCard } from "@/components/dashboard/asset-card";
import { BuyModal } from "@/components/dashboard/buy-modal";
import { Search, TrendingUp, Bitcoin, DollarSign } from "lucide-react";
import { isAuthenticated } from "@/lib/auth";
import { Asset, allAssets, getAssetsByType } from "@/lib/assets-data";

type CategoryType = 'all' | 'stock' | 'crypto' | 'currency';

/**
 * Compra Page - Buy assets (stocks, crypto, currencies)
 */
export default function CompraPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayedAssets, setDisplayedAssets] = useState<Asset[]>(allAssets);

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login");
    }
  }, [router]);

  // Filter assets based on category and search
  useEffect(() => {
    let filtered = selectedCategory === 'all' 
      ? allAssets 
      : getAssetsByType(selectedCategory);

    if (searchQuery) {
      filtered = filtered.filter(asset => 
        asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setDisplayedAssets(filtered);
  }, [selectedCategory, searchQuery]);

  const handleBuyClick = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsModalOpen(true);
  };

  const categories = [
    { id: 'all' as CategoryType, label: 'Todos', icon: TrendingUp, count: allAssets.length },
    { id: 'stock' as CategoryType, label: 'Acciones', icon: TrendingUp, count: getAssetsByType('stock').length },
    { id: 'crypto' as CategoryType, label: 'Criptomonedas', icon: Bitcoin, count: getAssetsByType('crypto').length },
    { id: 'currency' as CategoryType, label: 'Divisas', icon: DollarSign, count: getAssetsByType('currency').length },
  ];

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-sm border-b border-white/5 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-white text-2xl font-bold mb-1"
              >
                Compra de Activos
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-gray-400 text-sm"
              >
                Explora y compra acciones, criptomonedas y divisas
              </motion.p>
            </div>

            {/* Search */}
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar activos..."
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-fortune-green/50 focus:border-fortune-green/30 transition-all"
              />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {/* Category Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex gap-3 mb-8"
          >
            {categories.map((category, index) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              
              return (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all relative overflow-hidden group ${
                    isActive
                      ? "bg-gradient-to-r from-fortune-green/20 to-fortune-electric/20 border-2 border-fortune-green text-white"
                      : "bg-white/5 border-2 border-white/10 text-gray-400 hover:border-fortune-green/30 hover:text-white"
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-fortune-green' : ''}`} />
                  <span>{category.label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    isActive 
                      ? "bg-fortune-green/20 text-fortune-green" 
                      : "bg-white/10 text-gray-500"
                  }`}>
                    {category.count}
                  </span>
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-fortune-green/10 to-fortune-electric/10"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Assets Grid */}
          {displayedAssets.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4"
            >
              {displayedAssets.map((asset, index) => (
                <AssetCard
                  key={asset.id}
                  asset={asset}
                  onBuy={handleBuyClick}
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="text-gray-400 text-lg mb-2">No se encontraron activos</div>
              <div className="text-gray-500 text-sm">
                Intenta con otros términos de búsqueda
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Buy Modal */}
      <BuyModal
        asset={selectedAsset}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

