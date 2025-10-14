"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "@/components/dashboard/sidebar";
import { ArrowUpFromLine, DollarSign, CreditCard, Building2, Wallet, CheckCircle2, AlertCircle } from "lucide-react";
import { isAuthenticated } from "@/lib/auth";

export default function DepositoPage() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const [balance, setBalance] = useState(14155.61); // Simulated balance

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const depositAmount = parseFloat(amount);

    // Validations
    if (!depositAmount || depositAmount <= 0) {
      setError("Por favor ingresa un monto válido");
      return;
    }

    if (depositAmount < 10) {
      setError("El monto mínimo de depósito es $10");
      return;
    }

    if (depositAmount > 50000) {
      setError("El monto máximo de depósito es $50,000");
      return;
    }

    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Update balance
    setBalance(prev => prev + depositAmount);

    setLoading(false);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      setAmount("");
      setMethod("card");
    }, 3000);
  };

  const methods = [
    { value: "card", label: "Tarjeta de crédito/débito", icon: CreditCard, desc: "Procesamiento instantáneo", fee: "2.9%" },
    { value: "bank", label: "Transferencia bancaria", icon: Building2, desc: "Sin comisiones (1-2 días hábiles)", fee: "0%" },
    { value: "wallet", label: "Billetera digital", icon: Wallet, desc: "Procesamiento rápido", fee: "1.5%" },
  ];

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-sm border-b border-white/5 px-8 py-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-white text-2xl font-bold mb-1">Depositar Fondos</h1>
            <p className="text-gray-400 text-sm">Recarga tu cuenta de forma segura</p>
          </motion.div>
        </header>

        {/* Content */}
        <div className="p-8 max-w-3xl mx-auto">
          {/* Balance Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-fortune-electric/10 to-fortune-green/10 border border-fortune-electric/30 rounded-2xl p-6 mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Saldo actual</p>
                <motion.h2 
                  className="text-white text-4xl font-bold"
                  key={balance}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                >
                  ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </motion.h2>
              </div>
              <motion.div
                className="w-16 h-16 rounded-full bg-gradient-to-br from-fortune-electric to-fortune-green flex items-center justify-center"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <DollarSign className="w-8 h-8 text-black" />
              </motion.div>
            </div>
          </motion.div>

          {/* Deposit Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#0a0a0f] border border-white/10 rounded-2xl p-8"
          >
            <h3 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
              <ArrowUpFromLine className="w-6 h-6 text-fortune-electric" />
              Realizar depósito
            </h3>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-400"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Amount Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Monto a depositar
                </label>
                <div className="relative group">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-fortune-electric transition-colors" />
                  <input
                    type="number"
                    step="0.01"
                    min="10"
                    max="50000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-lg text-white text-xl font-semibold focus:outline-none focus:border-fortune-electric/50 focus:ring-2 focus:ring-fortune-electric/20 transition-all"
                    placeholder="0.00"
                    required
                    disabled={loading}
                  />
                </div>
                <p className="text-gray-500 text-xs mt-2">Mínimo: $10.00 • Máximo: $50,000.00</p>
              </div>

              {/* Quick Amount Buttons */}
              <div className="flex gap-2">
                {[100, 500, 1000, 5000].map((quickAmount) => (
                  <motion.button
                    key={quickAmount}
                    type="button"
                    onClick={() => setAmount(quickAmount.toString())}
                    className="flex-1 px-4 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-lg text-sm font-medium hover:bg-fortune-electric/10 hover:border-fortune-electric/30 hover:text-fortune-electric transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={loading}
                  >
                    ${quickAmount}
                  </motion.button>
                ))}
              </div>

              {/* Method Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Método de pago
                </label>
                <div className="space-y-3">
                  {methods.map((m) => {
                    const Icon = m.icon;
                    return (
                      <motion.label
                        key={m.value}
                        className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          method === m.value
                            ? "bg-fortune-electric/10 border-fortune-electric"
                            : "bg-white/5 border-white/10 hover:border-fortune-electric/30"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <input
                          type="radio"
                          name="method"
                          value={m.value}
                          checked={method === m.value}
                          onChange={(e) => setMethod(e.target.value)}
                          className="mt-1"
                          disabled={loading}
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <Icon className={`w-5 h-5 ${method === m.value ? 'text-fortune-electric' : 'text-gray-400'}`} />
                              <span className={`font-semibold ${method === m.value ? 'text-white' : 'text-gray-300'}`}>
                                {m.label}
                              </span>
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded ${
                              m.fee === "0%" 
                                ? "bg-fortune-green/20 text-fortune-green" 
                                : "bg-yellow-500/20 text-yellow-400"
                            }`}>
                              {m.fee === "0%" ? "Sin comisión" : `Comisión ${m.fee}`}
                            </span>
                          </div>
                          <p className="text-gray-400 text-xs">{m.desc}</p>
                        </div>
                      </motion.label>
                    );
                  })}
                </div>
              </div>

              {/* Total Amount Display */}
              {amount && parseFloat(amount) > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-fortune-electric/10 border border-fortune-electric/30 rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Monto a depositar</span>
                    <span className="text-white font-semibold">${parseFloat(amount).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Comisión</span>
                    <span className="text-yellow-400 font-semibold">
                      {method === "bank" ? "$0.00" : `$${(parseFloat(amount) * (method === "card" ? 0.029 : 0.015)).toFixed(2)}`}
                    </span>
                  </div>
                  <div className="border-t border-white/10 pt-2 flex items-center justify-between">
                    <span className="text-white font-semibold">Total a pagar</span>
                    <span className="text-fortune-electric text-xl font-bold">
                      ${(parseFloat(amount) * (1 + (method === "bank" ? 0 : method === "card" ? 0.029 : 0.015))).toFixed(2)}
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-fortune-electric to-fortune-green text-black rounded-lg font-semibold hover:shadow-xl hover:shadow-fortune-electric/50 transition-all relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={!loading ? { scale: 1.02, y: -2 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <ArrowUpFromLine className="w-5 h-5" />
                    </motion.div>
                    <span className="relative z-10">Procesando depósito...</span>
                  </>
                ) : (
                  <>
                    <ArrowUpFromLine className="w-5 h-5" />
                    <span className="relative z-10">Confirmar depósito</span>
                  </>
                )}
                {!loading && (
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </main>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-[#0a0a0f] border border-fortune-electric/30 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl shadow-fortune-electric/20">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 rounded-full bg-fortune-electric/20 flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle2 className="w-10 h-10 text-fortune-electric" />
                </motion.div>
                <h3 className="text-white text-2xl font-bold mb-2">¡Depósito exitoso!</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Tu depósito ha sido procesado correctamente.
                </p>
                <div className="bg-fortune-electric/10 border border-fortune-electric/30 rounded-lg p-4 mb-4">
                  <p className="text-gray-400 text-xs mb-1">Monto depositado</p>
                  <p className="text-fortune-electric text-3xl font-bold">
                    ${parseFloat(amount || "0").toFixed(2)}
                  </p>
                </div>
                <div className="bg-fortune-green/10 border border-fortune-green/30 rounded-lg p-4">
                  <p className="text-gray-400 text-xs mb-1">Nuevo saldo</p>
                  <p className="text-fortune-green text-2xl font-bold">
                    ${balance.toFixed(2)}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

