/**
 * Badge/Achievement system
 */

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'trading' | 'portfolio' | 'learning' | 'social' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  requirement: string;
  progress: number; // 0-100
  unlocked: boolean;
  unlockedDate?: string;
  color: string;
}

const BADGES_KEY = 'fortune_badges';

// Define all available badges
const allBadges: Omit<Badge, 'progress' | 'unlocked' | 'unlockedDate'>[] = [
  // Trading Badges
  {
    id: 'first_trade',
    name: 'Primera Transacción',
    description: 'Completa tu primera operación',
    icon: '🎯',
    category: 'trading',
    rarity: 'common',
    requirement: 'Realizar 1 transacción',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'trader_10',
    name: 'Trader Activo',
    description: 'Completa 10 transacciones',
    icon: '📈',
    category: 'trading',
    rarity: 'common',
    requirement: 'Realizar 10 transacciones',
    color: 'from-green-500 to-green-600',
  },
  {
    id: 'trader_50',
    name: 'Trader Experimentado',
    description: 'Completa 50 transacciones',
    icon: '💹',
    category: 'trading',
    rarity: 'rare',
    requirement: 'Realizar 50 transacciones',
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 'trader_100',
    name: 'Maestro del Trading',
    description: 'Completa 100 transacciones',
    icon: '👑',
    category: 'trading',
    rarity: 'epic',
    requirement: 'Realizar 100 transacciones',
    color: 'from-yellow-500 to-orange-600',
  },
  
  // Portfolio Badges
  {
    id: 'diversified_5',
    name: 'Diversificación Básica',
    description: 'Ten 5 activos diferentes en tu portafolio',
    icon: '🌟',
    category: 'portfolio',
    rarity: 'common',
    requirement: '5 activos diferentes',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    id: 'diversified_10',
    name: 'Portafolio Diversificado',
    description: 'Ten 10 activos diferentes en tu portafolio',
    icon: '💎',
    category: 'portfolio',
    rarity: 'rare',
    requirement: '10 activos diferentes',
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    id: 'crypto_king',
    name: 'Rey de las Criptos',
    description: 'Invierte en 5 criptomonedas diferentes',
    icon: '₿',
    category: 'portfolio',
    rarity: 'rare',
    requirement: '5 criptomonedas diferentes',
    color: 'from-fortune-green to-fortune-electric',
  },
  {
    id: 'stock_master',
    name: 'Maestro de Acciones',
    description: 'Invierte en 5 acciones diferentes',
    icon: '📊',
    category: 'portfolio',
    rarity: 'rare',
    requirement: '5 acciones diferentes',
    color: 'from-blue-500 to-purple-600',
  },
  
  // Value Badges
  {
    id: 'investor_1k',
    name: 'Inversor Novato',
    description: 'Alcanza $1,000 en tu portafolio',
    icon: '💰',
    category: 'portfolio',
    rarity: 'common',
    requirement: 'Portafolio de $1,000',
    color: 'from-green-500 to-emerald-600',
  },
  {
    id: 'investor_10k',
    name: 'Inversor Serio',
    description: 'Alcanza $10,000 en tu portafolio',
    icon: '💸',
    category: 'portfolio',
    rarity: 'rare',
    requirement: 'Portafolio de $10,000',
    color: 'from-yellow-500 to-yellow-600',
  },
  {
    id: 'investor_50k',
    name: 'Inversor Profesional',
    description: 'Alcanza $50,000 en tu portafolio',
    icon: '🏆',
    category: 'portfolio',
    rarity: 'epic',
    requirement: 'Portafolio de $50,000',
    color: 'from-orange-500 to-red-600',
  },
  {
    id: 'investor_100k',
    name: 'Ballena Inversora',
    description: 'Alcanza $100,000 en tu portafolio',
    icon: '🐋',
    category: 'portfolio',
    rarity: 'legendary',
    requirement: 'Portafolio de $100,000',
    color: 'from-purple-600 to-pink-600',
  },
  
  // Special Badges
  {
    id: 'early_bird',
    name: 'Madrugador',
    description: 'Opera durante las primeras horas del mercado',
    icon: '🌅',
    category: 'special',
    rarity: 'rare',
    requirement: 'Operar entre 6am-9am',
    color: 'from-orange-500 to-yellow-500',
  },
  {
    id: 'night_owl',
    name: 'Ave Nocturna',
    description: 'Opera durante las últimas horas del mercado',
    icon: '🦉',
    category: 'special',
    rarity: 'rare',
    requirement: 'Operar entre 8pm-12am',
    color: 'from-indigo-600 to-purple-700',
  },
  {
    id: 'profit_master',
    name: 'Maestro de Ganancias',
    description: 'Obtén más de 20% de ganancia en tu portafolio',
    icon: '🚀',
    category: 'portfolio',
    rarity: 'epic',
    requirement: '+20% de ganancia',
    color: 'from-fortune-green to-emerald-500',
  },
  {
    id: 'diamond_hands',
    name: 'Manos de Diamante',
    description: 'Mantén un activo por más de 30 días',
    icon: '💎',
    category: 'trading',
    rarity: 'rare',
    requirement: 'Mantener activo 30+ días',
    color: 'from-cyan-500 to-blue-600',
  },
];

/**
 * Initialize badges for a new user
 */
function initializeBadges(): Badge[] {
  return allBadges.map(badge => ({
    ...badge,
    progress: 0,
    unlocked: false,
  }));
}

/**
 * Get all badges
 */
export function getBadges(): Badge[] {
  try {
    const badgesStr = localStorage.getItem(BADGES_KEY);
    if (!badgesStr) {
      const initialBadges = initializeBadges();
      localStorage.setItem(BADGES_KEY, JSON.stringify(initialBadges));
      return initialBadges;
    }
    return JSON.parse(badgesStr);
  } catch (error) {
    console.error('Error reading badges:', error);
    return initializeBadges();
  }
}

/**
 * Update badge progress
 */
export function updateBadgeProgress(badgeId: string, progress: number): void {
  try {
    const badges = getBadges();
    const badgeIndex = badges.findIndex(b => b.id === badgeId);
    
    if (badgeIndex >= 0) {
      badges[badgeIndex].progress = Math.min(100, progress);
      
      // Unlock badge if progress reaches 100%
      if (badges[badgeIndex].progress >= 100 && !badges[badgeIndex].unlocked) {
        badges[badgeIndex].unlocked = true;
        badges[badgeIndex].unlockedDate = new Date().toISOString();
      }
      
      localStorage.setItem(BADGES_KEY, JSON.stringify(badges));
    }
  } catch (error) {
    console.error('Error updating badge progress:', error);
  }
}

/**
 * Unlock a badge
 */
export function unlockBadge(badgeId: string): void {
  try {
    const badges = getBadges();
    const badgeIndex = badges.findIndex(b => b.id === badgeId);
    
    if (badgeIndex >= 0 && !badges[badgeIndex].unlocked) {
      badges[badgeIndex].unlocked = true;
      badges[badgeIndex].progress = 100;
      badges[badgeIndex].unlockedDate = new Date().toISOString();
      
      localStorage.setItem(BADGES_KEY, JSON.stringify(badges));
    }
  } catch (error) {
    console.error('Error unlocking badge:', error);
  }
}

/**
 * Get unlocked badges
 */
export function getUnlockedBadges(): Badge[] {
  const badges = getBadges();
  return badges.filter(b => b.unlocked);
}

/**
 * Get badges by category
 */
export function getBadgesByCategory(category: Badge['category']): Badge[] {
  const badges = getBadges();
  return badges.filter(b => b.category === category);
}

/**
 * Get badge statistics
 */
export function getBadgeStats() {
  const badges = getBadges();
  const unlocked = badges.filter(b => b.unlocked).length;
  const total = badges.length;
  const percentage = (unlocked / total) * 100;
  
  return {
    total,
    unlocked,
    locked: total - unlocked,
    percentage,
  };
}

/**
 * Check and update badges based on current state
 */
export function checkBadgeProgress(params: {
  transactionCount?: number;
  portfolioValue?: number;
  portfolioCount?: number;
  cryptoCount?: number;
  stockCount?: number;
  profitPercent?: number;
}): void {
  const badges = getBadges();
  
  // Trading badges
  if (params.transactionCount !== undefined) {
    if (params.transactionCount >= 1) {
      updateBadgeProgress('first_trade', 100);
    }
    if (params.transactionCount >= 10) {
      updateBadgeProgress('trader_10', 100);
    }
    if (params.transactionCount >= 50) {
      updateBadgeProgress('trader_50', 100);
    }
    if (params.transactionCount >= 100) {
      updateBadgeProgress('trader_100', 100);
    }
  }
  
  // Portfolio diversity badges
  if (params.portfolioCount !== undefined) {
    if (params.portfolioCount >= 5) {
      updateBadgeProgress('diversified_5', 100);
    }
    if (params.portfolioCount >= 10) {
      updateBadgeProgress('diversified_10', 100);
    }
  }
  
  if (params.cryptoCount !== undefined && params.cryptoCount >= 5) {
    updateBadgeProgress('crypto_king', 100);
  }
  
  if (params.stockCount !== undefined && params.stockCount >= 5) {
    updateBadgeProgress('stock_master', 100);
  }
  
  // Value badges
  if (params.portfolioValue !== undefined) {
    if (params.portfolioValue >= 1000) {
      updateBadgeProgress('investor_1k', 100);
    }
    if (params.portfolioValue >= 10000) {
      updateBadgeProgress('investor_10k', 100);
    }
    if (params.portfolioValue >= 50000) {
      updateBadgeProgress('investor_50k', 100);
    }
    if (params.portfolioValue >= 100000) {
      updateBadgeProgress('investor_100k', 100);
    }
  }
  
  // Profit badges
  if (params.profitPercent !== undefined && params.profitPercent >= 20) {
    updateBadgeProgress('profit_master', 100);
  }
}

