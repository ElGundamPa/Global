"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { History, TrendingUp, TrendingDown, Calendar, DollarSign, Search, Filter } from "lucide-react";
import { getTransactions, getTransactionStats, Transaction } from "@/lib/transactions";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function HistoryPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState({ totalTransactions: 0, totalBuys: 0, totalSells: 0, totalAmount: 0 });
  const [filterType, setFilterType] = useState<'all' | 'buy' | 'sell'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const transactionsData = getTransactions();
    setTransactions(transactionsData);
    setStats(getTransactionStats());
  }, []);

  const filteredTransactions = transactions.filter(tx => {
    const typeMatch = filterType === 'all' || tx.type === filterType;
    const searchMatch = searchTerm === '' || 
      tx.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.name.toLowerCase().includes(searchTerm.toLowerCase());
    return typeMatch && searchMatch;
  });

  return (
    <main className="flex-1 overflow-y-auto p-8 bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Historial de Transacciones</h1>
          <p className="text-gray-400">Registro completo de todas tus operaciones</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Total Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-fortune-green/20 to-fortune-electric/20 border border-fortune-green/30 rounded-xl p-6 shadow-lg shadow-fortune-green/10"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm font-medium">Total</span>
              <History className="w-5 h-5 text-fortune-green" />
            </div>
            <div className="text-3xl font-bold text-white">{stats.totalTransactions}</div>
            <div className="text-sm text-gray-400">Transacciones</div>
          </motion.div>

          {/* Buy Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#0a0a0f] border border-white/10 rounded-xl p-6 shadow-lg shadow-white/5"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm font-medium">Compras</span>
              <TrendingUp className="w-5 h-5 text-fortune-green" />
            </div>
            <div className="text-3xl font-bold text-fortune-green">{stats.totalBuys}</div>
            <div className="text-sm text-gray-400">Operaciones</div>
          </motion.div>

          {/* Sell Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#0a0a0f] border border-white/10 rounded-xl p-6 shadow-lg shadow-white/5"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm font-medium">Ventas</span>
              <TrendingDown className="w-5 h-5 text-red-500" />
            </div>
            <div className="text-3xl font-bold text-red-500">{stats.totalSells}</div>
            <div className="text-sm text-gray-400">Operaciones</div>
          </motion.div>

          {/* Total Amount */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#0a0a0f] border border-white/10 rounded-xl p-6 shadow-lg shadow-white/5"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm font-medium">Monto Total</span>
              <DollarSign className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="text-3xl font-bold text-white">${stats.totalAmount.toFixed(2)}</div>
            <div className="text-sm text-gray-400">Operado</div>
          </motion.div>
        </div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#0a0a0f] border border-white/10 rounded-xl p-6 mb-8 shadow-lg shadow-white/5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Buscar por símbolo o nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-fortune-green/50 focus:ring-2 focus:ring-fortune-green/20 transition-all"
              />
            </div>

            {/* Filter by Type */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-fortune-green/50 focus:ring-2 focus:ring-fortune-green/20 transition-all appearance-none"
              >
                <option value="all">Todas las transacciones</option>
                <option value="buy">Solo compras</option>
                <option value="sell">Solo ventas</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Transactions List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-[#0a0a0f] border border-white/10 rounded-xl p-6 shadow-lg shadow-white/5"
        >
          <h2 className="text-xl font-bold text-white mb-6">Transacciones Recientes</h2>

          {filteredTransactions.length === 0 ? (
            <div className="text-center py-12">
              <History className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-400 mb-2">No hay transacciones</h3>
              <p className="text-gray-500">Tus operaciones aparecerán aquí</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTransactions.map((transaction, index) => {
                const isBuy = transaction.type === 'buy';
                const isCompleted = transaction.status === 'completed';

                return (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                    className={`border rounded-lg p-4 hover:bg-white/5 transition-all ${
                      isCompleted 
                        ? isBuy 
                          ? 'border-fortune-green/20 bg-fortune-green/5'
                          : 'border-red-500/20 bg-red-500/5'
                        : 'border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      {/* Left Side: Asset Info */}
                      <div className="flex items-center gap-4">
                        {/* Icon */}
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          isBuy 
                            ? 'bg-fortune-green/20 text-fortune-green'
                            : 'bg-red-500/20 text-red-500'
                        }`}>
                          {isBuy ? (
                            <TrendingUp className="w-6 h-6" />
                          ) : (
                            <TrendingDown className="w-6 h-6" />
                          )}
                        </div>

                        {/* Info */}
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-white font-bold">{transaction.symbol}</h3>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                              isBuy 
                                ? 'bg-fortune-green/20 text-fortune-green'
                                : 'bg-red-500/20 text-red-500'
                            }`}>
                              {isBuy ? 'COMPRA' : 'VENTA'}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm">{transaction.name}</p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {format(new Date(transaction.date), "d 'de' MMMM, yyyy 'a las' HH:mm", { locale: es })}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Side: Transaction Details */}
                      <div className="text-right">
                        <div className="text-white font-bold text-lg mb-1">
                          {isBuy ? '-' : '+'}${transaction.total.toFixed(2)}
                        </div>
                        <div className="text-gray-400 text-sm mb-1">
                          {transaction.quantity} × ${transaction.price.toFixed(2)}
                        </div>
                        <div className={`text-xs font-semibold ${
                          isCompleted ? 'text-fortune-green' : 'text-yellow-500'
                        }`}>
                          {isCompleted ? '✓ Completada' : '⏳ Pendiente'}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </motion.div>
    </main>
  );
}

