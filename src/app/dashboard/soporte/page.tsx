"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Headphones, Mail, User, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { isAuthenticated, getCurrentUser } from "@/lib/auth";

export default function SoportePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login");
      return;
    }

    const user = getCurrentUser();
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name,
        email: user.email,
      }));
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setLoading(false);
    setShowSuccess(true);

    // Reset message after showing success
    setTimeout(() => {
      setShowSuccess(false);
      setFormData(prev => ({ ...prev, message: "", subject: "general" }));
    }, 3000);
  };

  const subjects = [
    { value: "general", label: "Consulta general" },
    { value: "technical", label: "Soporte técnico" },
    { value: "account", label: "Problemas de cuenta" },
    { value: "transactions", label: "Transacciones" },
    { value: "other", label: "Otro" },
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
            <h1 className="text-white text-2xl font-bold mb-1">Centro de Soporte</h1>
            <p className="text-gray-400 text-sm">Estamos aquí para ayudarte</p>
          </motion.div>
        </header>

        {/* Content */}
        <div className="p-8 max-w-3xl mx-auto">
          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#0a0a0f] border border-white/10 rounded-xl p-4 text-center hover:border-fortune-green/30 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-fortune-green/20 flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-fortune-green" />
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">Email</h3>
              <p className="text-gray-400 text-xs">support@globalgroup.com</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#0a0a0f] border border-white/10 rounded-xl p-4 text-center hover:border-fortune-electric/30 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-fortune-electric/20 flex items-center justify-center mx-auto mb-3">
                <Headphones className="w-6 h-6 text-fortune-electric" />
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">Chat en vivo</h3>
              <p className="text-gray-400 text-xs">Disponible 24/7</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#0a0a0f] border border-white/10 rounded-xl p-4 text-center hover:border-yellow-500/30 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="w-6 h-6 text-yellow-500" />
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">Tiempo de respuesta</h3>
              <p className="text-gray-400 text-xs">Menos de 24 horas</p>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#0a0a0f] border border-white/10 rounded-2xl p-8"
          >
            <h2 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
              <Headphones className="w-6 h-6 text-fortune-green" />
              Envíanos un mensaje
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nombre
                </label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-fortune-green transition-colors" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-fortune-green/50 focus:ring-2 focus:ring-fortune-green/20 transition-all"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Correo electrónico
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-fortune-green transition-colors" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-fortune-green/50 focus:ring-2 focus:ring-fortune-green/20 transition-all"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Subject Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tipo de solicitud
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-fortune-green/50 focus:ring-2 focus:ring-fortune-green/20 transition-all cursor-pointer"
                  disabled={loading}
                >
                  {subjects.map(subject => (
                    <option key={subject.value} value={subject.value} className="bg-[#0a0a0f]">
                      {subject.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mensaje
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-fortune-green/50 focus:ring-2 focus:ring-fortune-green/20 transition-all resize-none"
                  placeholder="Describe tu consulta o problema..."
                  required
                  disabled={loading}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-fortune-green to-fortune-electric text-black rounded-lg font-semibold hover:shadow-xl hover:shadow-fortune-green/50 transition-all relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={!loading ? { scale: 1.02, y: -2 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Send className="w-5 h-5" />
                    </motion.div>
                    <span className="relative z-10">Enviando...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span className="relative z-10">Enviar mensaje</span>
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
              <div className="bg-[#0a0a0f] border border-fortune-green/30 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl shadow-fortune-green/20">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 rounded-full bg-fortune-green/20 flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle2 className="w-10 h-10 text-fortune-green" />
                </motion.div>
                <h3 className="text-white text-2xl font-bold mb-2">¡Mensaje enviado!</h3>
                <p className="text-gray-400 text-sm">
                  Tu solicitud ha sido recibida. Nuestro equipo te responderá pronto.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

