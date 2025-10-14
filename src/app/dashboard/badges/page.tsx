"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, Lock, Trophy, Star, Sparkles } from "lucide-react";
import { getBadges, getBadgeStats, Badge } from "@/lib/badges";

export default function BadgesPage() {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [stats, setStats] = useState({ total: 0, unlocked: 0, locked: 0, percentage: 0 });
  const [filterCategory, setFilterCategory] = useState<Badge['category'] | 'all'>('all');
  const [filterRarity, setFilterRarity] = useState<Badge['rarity'] | 'all'>('all');

  useEffect(() => {
    const badgesData = getBadges();
    setBadges(badgesData);
    setStats(getBadgeStats());
  }, []);

  const filteredBadges = badges.filter(badge => {
    const categoryMatch = filterCategory === 'all' || badge.category === filterCategory;
    const rarityMatch = filterRarity === 'all' || badge.rarity === filterRarity;
    return categoryMatch && rarityMatch;
  });

  const rarityColors = {
    common: 'from-gray-500 to-gray-600',
    rare: 'from-blue-500 to-blue-600',
    epic: 'from-purple-500 to-purple-600',
    legendary: 'from-yellow-500 to-orange-600',
  };

  const rarityLabels = {
    common: 'Común',
    rare: 'Raro',
    epic: 'Épico',
    legendary: 'Legendario',
  };

  const categoryLabels = {
    trading: 'Trading',
    portfolio: 'Portafolio',
    learning: 'Aprendizaje',
    social: 'Social',
    special: 'Especial',
  };

  return (
    <main className="flex-1 overflow-y-auto p-8 bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Emblemas y Logros</h1>
          <p className="text-gray-400">Desbloquea emblemas mientras mejoras como inversor</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Total Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-fortune-green/20 to-fortune-electric/20 border border-fortune-green/30 rounded-xl p-6 shadow-lg shadow-fortune-green/10"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm font-medium">Total de Emblemas</span>
              <Award className="w-5 h-5 text-fortune-green" />
            </div>
            <div className="text-3xl font-bold text-white">{stats.total}</div>
          </motion.div>

          {/* Unlocked */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#0a0a0f] border border-white/10 rounded-xl p-6 shadow-lg shadow-white/5"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm font-medium">Desbloqueados</span>
              <Trophy className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="text-3xl font-bold text-yellow-500">{stats.unlocked}</div>
          </motion.div>

          {/* Locked */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#0a0a0f] border border-white/10 rounded-xl p-6 shadow-lg shadow-white/5"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm font-medium">Bloqueados</span>
              <Lock className="w-5 h-5 text-gray-500" />
            </div>
            <div className="text-3xl font-bold text-gray-400">{stats.locked}</div>
          </motion.div>

          {/* Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#0a0a0f] border border-white/10 rounded-xl p-6 shadow-lg shadow-white/5"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm font-medium">Progreso</span>
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-white">{stats.percentage.toFixed(0)}%</div>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#0a0a0f] border border-white/10 rounded-xl p-6 mb-8 shadow-lg shadow-white/5"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-white font-semibold">Progreso General</span>
            <span className="text-gray-400 text-sm">{stats.unlocked} / {stats.total}</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-4 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${stats.percentage}%` }}
              transition={{ duration: 1, delay: 0.6 }}
              className="bg-gradient-to-r from-fortune-green to-fortune-electric h-full rounded-full"
            />
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-[#0a0a0f] border border-white/10 rounded-xl p-6 mb-8 shadow-lg shadow-white/5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Categoría</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value as any)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-fortune-green/50 focus:ring-2 focus:ring-fortune-green/20 transition-all"
              >
                <option value="all">Todas</option>
                <option value="trading">Trading</option>
                <option value="portfolio">Portafolio</option>
                <option value="learning">Aprendizaje</option>
                <option value="social">Social</option>
                <option value="special">Especial</option>
              </select>
            </div>

            {/* Rarity Filter */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Rareza</label>
              <select
                value={filterRarity}
                onChange={(e) => setFilterRarity(e.target.value as any)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-fortune-green/50 focus:ring-2 focus:ring-fortune-green/20 transition-all"
              >
                <option value="all">Todas</option>
                <option value="common">Común</option>
                <option value="rare">Raro</option>
                <option value="epic">Épico</option>
                <option value="legendary">Legendario</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBadges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              className={`relative bg-[#0a0a0f] border rounded-xl p-6 shadow-lg overflow-hidden ${
                badge.unlocked
                  ? 'border-fortune-green/30 shadow-fortune-green/10'
                  : 'border-white/10 shadow-white/5'
              }`}
            >
              {/* Background Gradient */}
              {badge.unlocked && (
                <div className={`absolute inset-0 bg-gradient-to-br ${badge.color} opacity-10`} />
              )}

              {/* Lock Overlay */}
              {!badge.unlocked && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10">
                  <Lock className="w-12 h-12 text-gray-600" />
                </div>
              )}

              <div className="relative z-20">
                {/* Badge Icon */}
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${
                  badge.unlocked ? badge.color : 'from-gray-700 to-gray-800'
                } flex items-center justify-center text-3xl shadow-lg`}>
                  {badge.icon}
                </div>

                {/* Badge Info */}
                <div className="text-center mb-3">
                  <h3 className="text-white font-bold mb-1">{badge.name}</h3>
                  <p className="text-gray-400 text-xs mb-2">{badge.description}</p>
                  
                  {/* Rarity Badge */}
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r ${rarityColors[badge.rarity]} text-white text-xs font-semibold`}>
                    <Star className="w-3 h-3" />
                    {rarityLabels[badge.rarity]}
                  </div>
                </div>

                {/* Progress Bar (for locked badges) */}
                {!badge.unlocked && (
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-400 text-xs">Progreso</span>
                      <span className="text-gray-400 text-xs">{badge.progress}%</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-fortune-green to-fortune-electric h-full rounded-full transition-all duration-500"
                        style={{ width: `${badge.progress}%` }}
                      />
                    </div>
                    <p className="text-gray-500 text-xs mt-2">{badge.requirement}</p>
                  </div>
                )}

                {/* Unlocked Date */}
                {badge.unlocked && badge.unlockedDate && (
                  <div className="mt-4 text-center">
                    <p className="text-fortune-green text-xs">
                      Desbloqueado el {new Date(badge.unlockedDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                )}
              </div>

              {/* Shine Effect for Unlocked Badges */}
              {badge.unlocked && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {filteredBadges.length === 0 && (
          <div className="text-center py-12">
            <Award className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-400 mb-2">No se encontraron emblemas</h3>
            <p className="text-gray-500">Intenta con otros filtros</p>
          </div>
        )}
      </motion.div>
    </main>
  );
}

