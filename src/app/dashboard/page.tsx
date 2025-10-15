"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";
import { InvestmentCard } from "@/components/dashboard/investment-card";
import { HarvestCard } from "@/components/dashboard/harvest-card";
import { ProgressChart } from "@/components/dashboard/progress-chart";
import { InvestmentsTable } from "@/components/dashboard/investments-table";
import { GlobalStats } from "@/components/dashboard/global-stats";
import { EarningsCards } from "@/components/dashboard/earnings-cards";
import { PatrimonyChart } from "@/components/dashboard/patrimony-chart";
import { Search, Settings, Sun } from "lucide-react";
import { getCurrentUser, isAuthenticated } from "@/lib/auth";
import { motion } from "framer-motion";

/**
 * Dashboard Page - Investment platform dashboard
 */
export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated()) {
      router.push("/auth/login");
      return;
    }

    // Get user data
    const user = getCurrentUser();
    if (user) {
      const firstName = user.name.split(' ')[0];
      setUserName(firstName);
    }

    // Set greeting based on time
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Buenos días");
    } else if (hour < 19) {
      setGreeting("Buenas tardes");
    } else {
      setGreeting("Buenas noches");
    }
  }, [router]);

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-sm border-b border-white/5 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-fortune-green/50 focus:border-fortune-green/30 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-400 hover:text-fortune-green transition-colors hover:bg-white/5 rounded-lg">
                <Sun className="w-5 h-5" />
              </button>
              <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-fortune-green/50 hover:border-fortune-green/30 transition-all cursor-pointer">
                <option>🇪🇸 Español</option>
                <option>🇺🇸 English</option>
              </select>
              <button className="p-2 text-gray-400 hover:text-fortune-green transition-colors hover:bg-white/5 rounded-lg">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Welcome Message */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-white text-3xl font-bold mb-2">
              {greeting}, <span className="bg-gradient-to-r from-fortune-green to-fortune-electric bg-clip-text text-transparent">{userName}</span>
            </h1>
            <p className="text-gray-400 text-sm">
              Bienvenido a tu panel de inversiones
            </p>
          </motion.div>

          {/* Global Statistics */}
          <GlobalStats />

          {/* Earnings Cards */}
          <EarningsCards />

          {/* Patrimony Chart */}
          <PatrimonyChart />

          {/* Wallet Section */}
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-white text-2xl font-semibold">Cartera de inversión</h2>
                <p className="text-gray-400 text-sm mt-1">
                  Tus inversiones en Renta Fija 2.0 y Renta Variable 2.0
                </p>
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-green-600/20 border border-green-500/50 text-green-400 text-xs font-semibold rounded-lg hover:bg-green-600/30 transition-all"
                >
                  Renta Fija 2.0
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-yellow-600/20 border border-yellow-500/50 text-yellow-400 text-xs font-semibold rounded-lg hover:bg-yellow-600/30 transition-all"
                >
                  Renta Variable 2.0
                </motion.button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Investment Cards */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <InvestmentCard
                  title="Renta Variable 2.0"
                  minInvestment="Inicia tu inversión desde $500 USD"
                  balance="$40,516.00"
                  variant="yellow"
                  badge="Renta Variable 2.0"
                  badgeColor="bg-yellow-600"
                />
                <InvestmentCard
                  title="Renta Fija 2.0"
                  minInvestment="Inicia tu inversión desde solo $50 USD"
                  balance="$1,500.00"
                  badge="Renta Fija 2.0"
                  badgeColor="bg-green-600"
                />
              </div>

              {/* Harvest Card */}
              <div>
                <HarvestCard />
              </div>
            </div>
          </motion.div>

          {/* Progress Chart */}
          <div className="mb-6">
            <ProgressChart />
          </div>

          {/* Investments Table */}
          <div className="mb-6">
            <InvestmentsTable />
          </div>

          {/* Ver más button */}
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-fortune-green/20 to-fortune-electric/20 border-2 border-fortune-green/50 text-white font-semibold rounded-lg hover:border-fortune-green transition-all relative overflow-hidden group"
            >
              <span className="relative z-10">Ver más</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-fortune-green/10 to-fortune-electric/10"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
            </motion.button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

