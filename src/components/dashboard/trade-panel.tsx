"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, TrendingDown, DollarSign, AlertCircle, CheckCircle2 } from "lucide-react";
import { executeBuy, executeSell, getUserBalance } from "@/lib/user-balance";
import { buyAsset } from "@/lib/portfolio";
import { addTransaction } from "@/lib/transactions";
import type { Asset } from "@/types";

interface TradePanelProps {
  asset: Asset;
  onTradeComplete?: () => void;
}

export function TradePanel({ asset, onTradeComplete }: TradePanelProps) {
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [quantity, setQuantity] = useState<number>(1);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stopLoss, setStopLoss] = useState<string>('');
  const [takeProfit, setTakeProfit] = useState<string>('');
  const [leverage, setLeverage] = useState<string>('X1');

  const balance = getUserBalance();
  const estimatedTotal = quantity * asset.price;
  const commission = 0; // Free commission
  const sharesReceived = quantity;

  const handleQuickAdd = (amount: number) => {
    setQuantity(prev => Math.max(0, prev + amount));
  };

  const handleMax = () => {
    if (tradeType === 'buy') {
      const maxQuantity = Math.floor(balance.availableBalance / asset.price);
      setQuantity(maxQuantity);
    }
  };

  const handleTrade = async () => {
    setIsProcessing(true);
    setMessage(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API call

      if (tradeType === 'buy') {
        const result = executeBuy(estimatedTotal);
        if (result.success) {
          // Add to portfolio
          buyAsset(asset, quantity);
          
          setMessage({ type: 'success', text: `✓ Compraste ${quantity} ${asset.symbol} por $${estimatedTotal.toFixed(2)}` });
          setQuantity(1);
          onTradeComplete?.();
        } else {
          setMessage({ type: 'error', text: result.message });
        }
      } else {
        // For sell, we need to check if user has the asset
        const result = executeSell(estimatedTotal);
        if (result.success) {
          // Add transaction
          addTransaction({
            assetId: asset.id,
            symbol: asset.symbol,
            name: asset.name,
            type: 'sell',
            quantity,
            price: asset.price,
            total: estimatedTotal,
          });
          
          setMessage({ type: 'success', text: `✓ Vendiste ${quantity} ${asset.symbol} por $${estimatedTotal.toFixed(2)}` });
          setQuantity(1);
          onTradeComplete?.();
        } else {
          setMessage({ type: 'error', text: result.message });
        }
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al procesar la operación' });
    } finally {
      setIsProcessing(false);
    }
  };

  const isBuy = tradeType === 'buy';
  const canTrade = quantity > 0 && (isBuy ? estimatedTotal <= balance.availableBalance : true);

  return (
    <div className="bg-[#0a0a0f] border border-white/10 rounded-xl p-6 shadow-lg shadow-white/5 h-fit sticky top-8">
      <h3 className="text-xl font-bold text-white mb-6">Operar {asset.symbol}</h3>

      {/* Trade Type Toggle */}
      <div className="grid grid-cols-2 gap-2 mb-6 p-1 bg-white/5 rounded-lg">
        <motion.button
          onClick={() => setTradeType('buy')}
          className={`py-2 rounded-md font-semibold transition-all ${
            isBuy
              ? 'bg-fortune-green text-black shadow-lg shadow-fortune-green/30'
              : 'text-gray-400 hover:text-white'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Comprar
          </div>
        </motion.button>
        <motion.button
          onClick={() => setTradeType('sell')}
          className={`py-2 rounded-md font-semibold transition-all ${
            !isBuy
              ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
              : 'text-gray-400 hover:text-white'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-center gap-2">
            <TrendingDown className="w-4 h-4" />
            Vender
          </div>
        </motion.button>
      </div>

      {/* Amount Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Ingresa el monto que deseas {isBuy ? 'comprar' : 'vender'}
        </label>
        <div className="relative">
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-lg font-semibold placeholder:text-gray-500 focus:outline-none focus:border-fortune-green/50 focus:ring-2 focus:ring-fortune-green/20 transition-all pr-16"
            min="0"
            step="0.01"
            placeholder="USD $"
          />
          <button
            onClick={handleMax}
            className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-fortune-green/20 border border-fortune-green/50 text-fortune-green text-xs font-bold rounded hover:bg-fortune-green/30 transition-all"
          >
            MAX
          </button>
        </div>
      </div>

      {/* USD Available */}
      <div className="mb-6 text-sm text-gray-400">
        USD disponibles: <span className="text-fortune-green font-semibold">${balance.availableBalance.toFixed(2)}</span>
      </div>

      {/* Stop Loss */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
          Stop Loss
          <span className="text-xs text-gray-500">(Opcional)</span>
        </label>
        <div className="relative">
          <input
            type="number"
            value={stopLoss}
            onChange={(e) => setStopLoss(e.target.value)}
            className="w-full px-4 py-2.5 bg-white/5 border border-red-500/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all"
            placeholder="%"
            min="0"
            max="100"
          />
        </div>
      </div>

      {/* Leverage */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Apalancamiento
        </label>
        <select
          value={leverage}
          onChange={(e) => setLeverage(e.target.value)}
          className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-fortune-green/50 focus:ring-2 focus:ring-fortune-green/20 transition-all appearance-none cursor-pointer"
        >
          <option value="X1">X1</option>
          <option value="X2">X2</option>
          <option value="X5">X5</option>
          <option value="X10">X10</option>
          <option value="X20">X20</option>
        </select>
      </div>

      {/* Take Profit */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
          Take Profit
          <span className="text-xs text-gray-500">(Opcional)</span>
        </label>
        <div className="relative">
          <input
            type="number"
            value={takeProfit}
            onChange={(e) => setTakeProfit(e.target.value)}
            className="w-full px-4 py-2.5 bg-white/5 border border-fortune-green/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-fortune-green/50 focus:ring-2 focus:ring-fortune-green/20 transition-all"
            placeholder="%"
            min="0"
            max="1000"
          />
        </div>
      </div>

      {/* Shares Received */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Acciones que recibirás
        </label>
        <div className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white font-semibold">
          {sharesReceived.toFixed(4)}
        </div>
      </div>

      {/* Summary */}
      <div className="space-y-3 mb-6 pt-4 border-t border-white/10">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Precio por unidad</span>
          <span className="text-white font-semibold">${asset.price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Comisión</span>
          <span className="text-fortune-green font-semibold">$0.00</span>
        </div>
        {stopLoss && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Stop Loss</span>
            <span className="text-red-400 font-semibold">-{stopLoss}%</span>
          </div>
        )}
        {takeProfit && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Take Profit</span>
            <span className="text-fortune-green font-semibold">+{takeProfit}%</span>
          </div>
        )}
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Apalancamiento</span>
          <span className="text-blue-400 font-semibold">{leverage}</span>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-white/10">
          <span className="text-white font-semibold">Total Estimado</span>
          <span className="text-white font-bold text-lg">${estimatedTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Message */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-4 p-3 rounded-lg flex items-start gap-2 text-sm ${
            message.type === 'success'
              ? 'bg-fortune-green/10 border border-fortune-green/30 text-fortune-green'
              : 'bg-red-500/10 border border-red-500/30 text-red-400'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          )}
          <span>{message.text}</span>
        </motion.div>
      )}

      {/* Trade Button */}
      <motion.button
        onClick={handleTrade}
        disabled={!canTrade || isProcessing}
        className={`w-full py-3 rounded-lg font-bold text-lg transition-all ${
          isBuy
            ? 'bg-gradient-to-r from-fortune-green to-fortune-electric text-black hover:shadow-xl hover:shadow-fortune-green/50'
            : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-xl hover:shadow-red-500/50'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
        whileHover={canTrade ? { scale: 1.02, y: -2 } : {}}
        whileTap={canTrade ? { scale: 0.98 } : {}}
      >
        {isProcessing ? (
          <div className="flex items-center justify-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
            />
            Procesando...
          </div>
        ) : (
          `${isBuy ? 'Comprar' : 'Vender'} ${asset.symbol}`
        )}
      </motion.button>

      {!canTrade && quantity > 0 && isBuy && (
        <p className="mt-3 text-center text-red-400 text-xs">
          Balance insuficiente para esta operación
        </p>
      )}
    </div>
  );
}

