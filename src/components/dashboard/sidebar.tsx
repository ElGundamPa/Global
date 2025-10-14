"use client";

import { useState, useEffect } from "react";
import { LayoutDashboard, Briefcase, Award, History, TrendingUp, LogOut, User, ShoppingCart, UserCircle, HeadphonesIcon, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getCurrentUser, logoutUser } from "@/lib/auth";
import { getUserBalance } from "@/lib/user-balance";
import { motion } from "framer-motion";

const menuItems = [
  { id: "panel", label: "Panel", icon: LayoutDashboard, href: "/dashboard" },
  { id: "compra", label: "Compra", icon: ShoppingCart, href: "/dashboard/compra" },
  { id: "informacion", label: "Información personal", icon: UserCircle, href: "/dashboard/informacion" },
  { id: "soporte", label: "Soporte", icon: HeadphonesIcon, href: "/dashboard/soporte" },
  { id: "retirar", label: "Retirar", icon: ArrowDownToLine, href: "/dashboard/retirar" },
  { id: "deposito", label: "Depósito", icon: ArrowUpFromLine, href: "/dashboard/deposito" },
  { id: "portafolio", label: "Portafolio", icon: Briefcase, href: "/dashboard/portfolio" },
  { id: "emblemas", label: "Emblemas", icon: Award, href: "/dashboard/badges" },
  { id: "historial", label: "Historial", icon: History, href: "/dashboard/history" },
  { id: "trading", label: "Trading en vivo", icon: TrendingUp, href: "/dashboard/trading", badge: "•", badgeColor: "bg-red-500" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [userName, setUserName] = useState("Usuario");
  const [balance, setBalance] = useState(getUserBalance());

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      // Get first name only
      const firstName = user.name.split(' ')[0];
      setUserName(firstName);
    }

    // Update balance every 3 seconds
    const interval = setInterval(() => {
      setBalance(getUserBalance());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logoutUser();
    router.push("/auth/login");
  };

  return (
    <aside className="w-64 bg-[#0a0a0f] border-r border-white/5 flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-2">
          <motion.div 
            className="w-8 h-8 bg-gradient-to-br from-fortune-green to-fortune-electric rounded-lg"
            animate={{
              boxShadow: [
                "0 0 10px rgba(0, 255, 135, 0.3)",
                "0 0 20px rgba(0, 255, 135, 0.5)",
                "0 0 10px rgba(0, 255, 135, 0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="flex flex-col">
            <span className="text-white font-bold text-lg leading-none">GLOBAL</span>
            <span className="text-fortune-green text-xs font-semibold leading-none">GROUP</span>
          </div>
        </div>
      </div>

      {/* Balance */}
      <div className="p-6 space-y-1">
        <div className="flex items-center gap-2 text-gray-400 text-xs">
          <div className="w-4 h-4 flex items-center justify-center">👁️</div>
          <span>Saldo disponible:</span>
        </div>
        <motion.div 
          key={balance.availableBalance}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          className="text-white text-2xl font-semibold"
        >
          ${balance.availableBalance.toFixed(2)}
        </motion.div>
        <div className="text-gray-500 text-xs">Valor del portafolio:</div>
        <motion.div 
          key={balance.totalPortfolioValue}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          className="text-gray-400 text-sm"
        >
          ${balance.totalPortfolioValue.toFixed(2)}
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.id === "panel" && pathname === "/dashboard");
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-300 relative group ${
                isActive
                  ? "bg-gradient-to-r from-fortune-green/20 to-fortune-electric/20 text-white border-l-2 border-fortune-green"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
              {item.badge && (
                <motion.span 
                  className={`ml-auto w-2 h-2 ${item.badgeColor} rounded-full`}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Market Status */}
      <div className="px-6 py-4 border-t border-white/5">
        <motion.div 
          className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-xs font-medium">Mercado en pausa</span>
            <div className="w-10 h-10 relative">
              {/* Animated circular progress */}
              <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#333"
                  strokeWidth="2"
                />
                <motion.circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#00FF87"
                  strokeWidth="2"
                  strokeDasharray="100"
                  initial={{ strokeDashoffset: 25 }}
                  animate={{ strokeDashoffset: [25, 0, 25] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </svg>
              {/* Clock icon in center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  className="text-fortune-green text-xs"
                >
                  ⏰
                </motion.div>
              </div>
            </div>
          </div>
          <div className="text-white text-xs mb-1 leading-relaxed">
            Hoy la Bolsa de Valores de Nueva York estará cerrada.
          </div>
          <div className="text-gray-500 text-[10px] mb-2">
            El próximo día laborable será después de
          </div>
          <motion.div 
            className="flex items-center justify-center mt-3 text-xs bg-fortune-green/10 border border-fortune-green/30 rounded-lg py-2 px-3"
            animate={{ 
              boxShadow: [
                "0 0 5px rgba(0, 255, 135, 0.2)",
                "0 0 10px rgba(0, 255, 135, 0.4)",
                "0 0 5px rgba(0, 255, 135, 0.2)",
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-fortune-green font-mono font-bold">0D 11H 38M 23S</span>
          </motion.div>
        </motion.div>
      </div>

      {/* User */}
      <div className="p-4 border-t border-white/5 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-fortune-green to-fortune-electric flex items-center justify-center shadow-lg shadow-fortune-green/30">
          <User className="w-4 h-4 text-black" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-white text-sm font-medium truncate">{userName}</div>
          <div className="text-gray-500 text-xs">Inversor</div>
        </div>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLogout}
          className="text-gray-400 hover:text-fortune-green transition-colors p-2 hover:bg-white/5 rounded-lg"
          title="Cerrar sesión"
        >
          <LogOut className="w-4 h-4" />
        </motion.button>
      </div>
    </aside>
  );
}

