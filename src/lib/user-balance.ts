/**
 * User balance and global statistics management
 */

export interface UserBalance {
  availableBalance: number;
  totalPortfolioValue: number;
  totalInvested: number;
  totalProfitLoss: number;
  profitLossPercent: number;
  totalOperations: number;
  lastUpdated: string;
}

export interface PerformanceHistory {
  timestamp: number;
  portfolioValue: number;
}

const BALANCE_KEY = 'fortune_user_balance';
const PERFORMANCE_KEY = 'fortune_performance_history';
const INITIAL_BALANCE = 10000;

/**
 * Initialize user balance if not exists
 */
export function initializeBalance(): UserBalance {
  const balance: UserBalance = {
    availableBalance: INITIAL_BALANCE,
    totalPortfolioValue: INITIAL_BALANCE,
    totalInvested: 0,
    totalProfitLoss: 0,
    profitLossPercent: 0,
    totalOperations: 0,
    lastUpdated: new Date().toISOString(),
  };
  
  localStorage.setItem(BALANCE_KEY, JSON.stringify(balance));
  
  // Initialize performance history
  const performanceHistory: PerformanceHistory[] = [{
    timestamp: Date.now(),
    portfolioValue: INITIAL_BALANCE,
  }];
  localStorage.setItem(PERFORMANCE_KEY, JSON.stringify(performanceHistory));
  
  return balance;
}

/**
 * Get user balance
 */
export function getUserBalance(): UserBalance {
  try {
    const balanceStr = localStorage.getItem(BALANCE_KEY);
    if (!balanceStr) {
      return initializeBalance();
    }
    return JSON.parse(balanceStr);
  } catch (error) {
    console.error('Error reading user balance:', error);
    return initializeBalance();
  }
}

/**
 * Update user balance
 */
export function updateUserBalance(balance: Partial<UserBalance>): void {
  try {
    const currentBalance = getUserBalance();
    const updatedBalance: UserBalance = {
      ...currentBalance,
      ...balance,
      lastUpdated: new Date().toISOString(),
    };
    
    localStorage.setItem(BALANCE_KEY, JSON.stringify(updatedBalance));
    
    // Update performance history
    updatePerformanceHistory(updatedBalance.totalPortfolioValue);
  } catch (error) {
    console.error('Error updating user balance:', error);
  }
}

/**
 * Execute a buy operation
 */
export function executeBuy(amount: number): { success: boolean; message: string } {
  try {
    const balance = getUserBalance();
    
    if (amount <= 0) {
      return { success: false, message: 'Cantidad inválida' };
    }
    
    if (amount > balance.availableBalance) {
      return { success: false, message: 'Balance insuficiente' };
    }
    
    updateUserBalance({
      availableBalance: balance.availableBalance - amount,
      totalInvested: balance.totalInvested + amount,
      totalOperations: balance.totalOperations + 1,
    });
    
    return { success: true, message: 'Compra exitosa' };
  } catch (error) {
    console.error('Error executing buy:', error);
    return { success: false, message: 'Error al ejecutar la compra' };
  }
}

/**
 * Execute a sell operation
 */
export function executeSell(amount: number): { success: boolean; message: string } {
  try {
    const balance = getUserBalance();
    
    if (amount <= 0) {
      return { success: false, message: 'Cantidad inválida' };
    }
    
    updateUserBalance({
      availableBalance: balance.availableBalance + amount,
      totalOperations: balance.totalOperations + 1,
    });
    
    return { success: true, message: 'Venta exitosa' };
  } catch (error) {
    console.error('Error executing sell:', error);
    return { success: false, message: 'Error al ejecutar la venta' };
  }
}

/**
 * Calculate and update portfolio value
 */
export function recalculatePortfolio(currentPrices: Record<string, number>): void {
  try {
    // Get portfolio
    const portfolioStr = localStorage.getItem('fortune_portfolio');
    const portfolio = portfolioStr ? JSON.parse(portfolioStr) : [];
    
    // Calculate current portfolio value
    let portfolioValue = 0;
    let totalCost = 0;
    
    portfolio.forEach((item: any) => {
      const currentPrice = currentPrices[item.assetId] || item.purchasePrice;
      portfolioValue += item.quantity * currentPrice;
      totalCost += item.totalCost;
    });
    
    const balance = getUserBalance();
    const totalPortfolioValue = balance.availableBalance + portfolioValue;
    const profitLoss = portfolioValue - totalCost;
    const profitLossPercent = totalCost > 0 ? (profitLoss / totalCost) * 100 : 0;
    
    updateUserBalance({
      totalPortfolioValue,
      totalProfitLoss: profitLoss,
      profitLossPercent,
    });
  } catch (error) {
    console.error('Error recalculating portfolio:', error);
  }
}

/**
 * Get performance history
 */
export function getPerformanceHistory(): PerformanceHistory[] {
  try {
    const historyStr = localStorage.getItem(PERFORMANCE_KEY);
    if (!historyStr) {
      const initialHistory: PerformanceHistory[] = [{
        timestamp: Date.now(),
        portfolioValue: INITIAL_BALANCE,
      }];
      localStorage.setItem(PERFORMANCE_KEY, JSON.stringify(initialHistory));
      return initialHistory;
    }
    return JSON.parse(historyStr);
  } catch (error) {
    console.error('Error reading performance history:', error);
    return [];
  }
}

/**
 * Update performance history
 */
function updatePerformanceHistory(portfolioValue: number): void {
  try {
    const history = getPerformanceHistory();
    const now = Date.now();
    const lastEntry = history[history.length - 1];
    
    // Only add if more than 5 minutes passed or significant change
    if (!lastEntry || now - lastEntry.timestamp > 5 * 60 * 1000 || 
        Math.abs(portfolioValue - lastEntry.portfolioValue) > portfolioValue * 0.01) {
      history.push({
        timestamp: now,
        portfolioValue,
      });
      
      // Keep last 100 entries
      if (history.length > 100) {
        history.shift();
      }
      
      localStorage.setItem(PERFORMANCE_KEY, JSON.stringify(history));
    }
  } catch (error) {
    console.error('Error updating performance history:', error);
  }
}

/**
 * Get top performing assets
 */
export function getTopPerformingAssets(currentPrices: Record<string, number>): Array<{
  symbol: string;
  name: string;
  profitLoss: number;
  profitLossPercent: number;
}> {
  try {
    const portfolioStr = localStorage.getItem('fortune_portfolio');
    const portfolio = portfolioStr ? JSON.parse(portfolioStr) : [];
    
    const performingAssets = portfolio.map((item: any) => {
      const currentPrice = currentPrices[item.assetId] || item.purchasePrice;
      const currentValue = item.quantity * currentPrice;
      const profitLoss = currentValue - item.totalCost;
      const profitLossPercent = (profitLoss / item.totalCost) * 100;
      
      return {
        symbol: item.symbol,
        name: item.name,
        profitLoss,
        profitLossPercent,
      };
    });
    
    // Sort by profit loss percent and return top 3
    return performingAssets
      .sort((a, b) => b.profitLossPercent - a.profitLossPercent)
      .slice(0, 3);
  } catch (error) {
    console.error('Error getting top performing assets:', error);
    return [];
  }
}

/**
 * Get portfolio distribution
 */
export function getPortfolioDistribution(currentPrices: Record<string, number>): Array<{
  name: string;
  value: number;
  percentage: number;
}> {
  try {
    const portfolioStr = localStorage.getItem('fortune_portfolio');
    const portfolio = portfolioStr ? JSON.parse(portfolioStr) : [];
    
    const distribution: Record<string, number> = {};
    let totalValue = 0;
    
    portfolio.forEach((item: any) => {
      const currentPrice = currentPrices[item.assetId] || item.purchasePrice;
      const value = item.quantity * currentPrice;
      distribution[item.symbol] = (distribution[item.symbol] || 0) + value;
      totalValue += value;
    });
    
    return Object.entries(distribution).map(([name, value]) => ({
      name,
      value,
      percentage: totalValue > 0 ? (value / totalValue) * 100 : 0,
    }));
  } catch (error) {
    console.error('Error getting portfolio distribution:', error);
    return [];
  }
}

/**
 * Reset balance (for testing)
 */
export function resetBalance(): void {
  localStorage.removeItem(BALANCE_KEY);
  localStorage.removeItem(PERFORMANCE_KEY);
  initializeBalance();
}

