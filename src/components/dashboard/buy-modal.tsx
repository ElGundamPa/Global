"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, TrendingDown, ShoppingCart } from "lucide-react";
import { Asset } from "@/lib/assets-data";
import { addToPortfolio } from "@/lib/portfolio";

interface BuyModalProps {
  asset: Asset | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BuyModal({ asset, isOpen, onClose }: BuyModalProps) {
  const [quantity, setQuantity] = useState<string>("1");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!asset) return null;

  const isPositive = asset.changePercent >= 0;
  const totalCost = Number(quantity) * asset.price;

  const handlePurchase = async () => {
    const qty = Number(quantity);
    
    if (!qty || qty <= 0) {
      alert("Por favor ingresa una cantidad válida");
      return;
    }

    setLoading(true);

    // Simulate API call
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
        onClose();
      }, 1500);
    } else {
      alert(result.message);
    }

    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#0a0a0f] border border-fortune-green/30 rounded-2xl p-6 w-full max-w-md shadow-2xl shadow-fortune-green/20">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-fortune-green to-fortune-electric flex items-center justify-center"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <ShoppingCart className="w-6 h-6 text-black" />
                  </motion.div>
                  <div>
                    <h3 className="text-white text-xl font-bold">Comprar Activo</h3>
                    <p className="text-gray-400 text-sm">Confirma tu compra</p>
                  </div>
                </div>
                <motion.button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Asset Info */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white/5 rounded-xl p-4 mb-6 border border-white/10"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-bold text-lg">{asset.symbol}</span>
                      <span className="text-gray-500 text-sm">—</span>
                      <span className="text-gray-400 text-sm">{asset.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.div 
                        className={`flex items-center gap-1 ${isPositive ? 'text-green-500' : 'text-red-500'} text-xs font-semibold`}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {isPositive ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        <span>{isPositive ? '+' : ''}{asset.changePercent.toFixed(2)}%</span>
                      </motion.div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold text-2xl">
                      ${asset.price.toLocaleString('en-US', { 
                        minimumFractionDigits: asset.type === 'currency' ? 4 : 2,
                        maximumFractionDigits: asset.type === 'currency' ? 4 : 2 
                      })}
                    </div>
                    <div className={`${isPositive ? 'text-green-500' : 'text-red-500'} text-xs font-medium`}>
                      {isPositive ? '+' : ''}{asset.change.toFixed(2)}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Quantity Input */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-300 mb-2">
                  Cantidad
                </label>
                <div className="relative">
                  <input
                    id="quantity"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-fortune-green/50 focus:ring-2 focus:ring-fortune-green/20 transition-all duration-300"
                    placeholder="Ingresa la cantidad"
                    disabled={loading || success}
                  />
                </div>
              </motion.div>

              {/* Total Cost */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-r from-fortune-green/10 to-fortune-electric/10 border border-fortune-green/30 rounded-xl p-4 mb-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Costo Total:</span>
                  <span className="text-white font-bold text-2xl">
                    ${totalCost.toLocaleString('en-US', { 
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2 
                    })}
                  </span>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex gap-3"
              >
                <motion.button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/20 text-white rounded-lg font-semibold hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading || success}
                >
                  Cancelar
                </motion.button>
                <motion.button
                  onClick={handlePurchase}
                  className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all relative overflow-hidden ${
                    success 
                      ? "bg-green-600 border-2 border-green-500" 
                      : "bg-gradient-to-r from-fortune-green to-fortune-electric border-2 border-fortune-green/50 hover:border-fortune-green"
                  }`}
                  whileHover={!loading && !success ? { scale: 1.02 } : {}}
                  whileTap={!loading && !success ? { scale: 0.98 } : {}}
                  disabled={loading || success}
                >
                  <span className="relative z-10 text-black">
                    {loading ? "Procesando..." : success ? "¡Comprado! ✓" : "Confirmar Compra"}
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
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

