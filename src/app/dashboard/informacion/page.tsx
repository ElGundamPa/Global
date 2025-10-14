"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "@/components/dashboard/sidebar";
import { User, Mail, Edit2, Save, X } from "lucide-react";
import { isAuthenticated, getCurrentUser } from "@/lib/auth";

export default function InformacionPage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });
  const [editedData, setEditedData] = useState({
    name: "",
    email: "",
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login");
      return;
    }

    const user = getCurrentUser();
    if (user) {
      setUserData({ name: user.name, email: user.email });
      setEditedData({ name: user.name, email: user.email });
    }
  }, [router]);

  const handleSave = () => {
    // Update user data in localStorage
    const currentUser = getCurrentUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...editedData };
      localStorage.setItem('fortune_current_user', JSON.stringify(updatedUser));
      setUserData(editedData);
      setSuccess(true);
      setIsEditing(false);
      
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  const handleCancel = () => {
    setEditedData(userData);
    setIsEditing(false);
  };

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
            <h1 className="text-white text-2xl font-bold mb-1">Información Personal</h1>
            <p className="text-gray-400 text-sm">Gestiona tus datos personales</p>
          </motion.div>
        </header>

        {/* Content */}
        <div className="p-8 max-w-3xl mx-auto">
          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3 text-green-400"
            >
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">✓</div>
              <span className="text-sm font-medium">Información actualizada exitosamente</span>
            </motion.div>
          )}

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#0a0a0f] border border-white/10 rounded-2xl p-8"
          >
            {/* Avatar Section */}
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/10">
              <motion.div
                className="w-24 h-24 rounded-full bg-gradient-to-br from-fortune-green to-fortune-electric flex items-center justify-center shadow-lg shadow-fortune-green/30"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <User className="w-12 h-12 text-black" />
              </motion.div>
              <div>
                <h2 className="text-white text-2xl font-bold mb-1">{userData.name}</h2>
                <p className="text-gray-400 text-sm">Inversor Global Group</p>
              </div>
            </div>

            {/* Information Fields */}
            <div className="space-y-6">
              {/* Name Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nombre completo
                </label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-fortune-green transition-colors" />
                  <input
                    type="text"
                    value={isEditing ? editedData.name : userData.name}
                    onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                    disabled={!isEditing}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-fortune-green/50 focus:ring-2 focus:ring-fortune-green/20 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Correo electrónico
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-fortune-green transition-colors" />
                  <input
                    type="email"
                    value={isEditing ? editedData.email : userData.email}
                    onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                    disabled={!isEditing}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-fortune-green/50 focus:ring-2 focus:ring-fortune-green/20 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex gap-3"
            >
              {!isEditing ? (
                <motion.button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-fortune-green/20 to-fortune-electric/20 border-2 border-fortune-green/50 text-white rounded-lg font-semibold hover:border-fortune-green transition-all relative overflow-hidden group"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Edit2 className="w-5 h-5" />
                  <span className="relative z-10">Editar información</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-fortune-green/10 to-fortune-electric/10"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.button>
              ) : (
                <>
                  <motion.button
                    onClick={handleCancel}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border-2 border-white/20 text-white rounded-lg font-semibold hover:bg-white/10 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <X className="w-5 h-5" />
                    Cancelar
                  </motion.button>
                  <motion.button
                    onClick={handleSave}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-fortune-green to-fortune-electric text-black rounded-lg font-semibold hover:shadow-xl hover:shadow-fortune-green/50 transition-all relative overflow-hidden"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Save className="w-5 h-5" />
                    <span className="relative z-10">Guardar cambios</span>
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.button>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

