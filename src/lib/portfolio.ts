/**
 * Portfolio management with localStorage
 */

export interface PortfolioItem {
  assetId: string;
  symbol: string;
  name: string;
  type: 'stock' | 'crypto' | 'currency';
  quantity: number;
  purchasePrice: number;
  purchaseDate: string;
  totalCost: number;
}

const PORTFOLIO_KEY = 'fortune_portfolio';

/**
 * Get all portfolio items
 */
export function getPortfolio(): PortfolioItem[] {
  try {
    const portfolioStr = localStorage.getItem(PORTFOLIO_KEY);
    return portfolioStr ? JSON.parse(portfolioStr) : [];
  } catch (error) {
    console.error('Error reading portfolio:', error);
    return [];
  }
}

/**
 * Add an asset to portfolio
 */
export function addToPortfolio(item: Omit<PortfolioItem, 'purchaseDate' | 'totalCost'>): { success: boolean; message: string } {
  try {
    const portfolio = getPortfolio();
    
    // Check if asset already exists
    const existingIndex = portfolio.findIndex(p => p.assetId === item.assetId);
    
    const totalCost = item.quantity * item.purchasePrice;
    const newItem: PortfolioItem = {
      ...item,
      purchaseDate: new Date().toISOString(),
      totalCost,
    };
    
    if (existingIndex >= 0) {
      // Update existing item (add quantities)
      const existing = portfolio[existingIndex];
      portfolio[existingIndex] = {
        ...existing,
        quantity: existing.quantity + item.quantity,
        totalCost: existing.totalCost + totalCost,
        purchaseDate: new Date().toISOString(), // Update to latest purchase
      };
    } else {
      // Add new item
      portfolio.push(newItem);
    }
    
    localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(portfolio));
    
    return { success: true, message: 'Activo agregado al portafolio exitosamente' };
  } catch (error) {
    console.error('Error adding to portfolio:', error);
    return { success: false, message: 'Error al agregar al portafolio' };
  }
}

/**
 * Remove an asset from portfolio
 */
export function removeFromPortfolio(assetId: string): { success: boolean; message: string } {
  try {
    const portfolio = getPortfolio();
    const filtered = portfolio.filter(item => item.assetId !== assetId);
    
    localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(filtered));
    
    return { success: true, message: 'Activo eliminado del portafolio' };
  } catch (error) {
    console.error('Error removing from portfolio:', error);
    return { success: false, message: 'Error al eliminar del portafolio' };
  }
}

/**
 * Get portfolio item by asset ID
 */
export function getPortfolioItem(assetId: string): PortfolioItem | undefined {
  const portfolio = getPortfolio();
  return portfolio.find(item => item.assetId === assetId);
}

/**
 * Calculate portfolio value
 */
export function calculatePortfolioValue(currentPrices: Record<string, number>): number {
  const portfolio = getPortfolio();
  
  return portfolio.reduce((total, item) => {
    const currentPrice = currentPrices[item.assetId] || item.purchasePrice;
    return total + (item.quantity * currentPrice);
  }, 0);
}

/**
 * Clear portfolio
 */
export function clearPortfolio(): void {
  localStorage.removeItem(PORTFOLIO_KEY);
}

/**
 * Buy an asset (convenience function that combines addToPortfolio and transaction logging)
 */
export function buyAsset(asset: { id: string; symbol: string; name: string; price: number }, quantity: number): boolean {
  try {
    if (quantity <= 0 || !asset) {
      return false;
    }

    // Add to portfolio
    const portfolioItem: Omit<PortfolioItem, 'purchaseDate' | 'totalCost'> = {
      assetId: asset.id.toLowerCase(),
      symbol: asset.symbol,
      name: asset.name,
      type: determineAssetType(asset.symbol),
      quantity,
      purchasePrice: asset.price,
    };

    const result = addToPortfolio(portfolioItem);
    
    if (result.success) {
      // Also log the transaction
      try {
        // Import transaction logging dynamically to avoid circular dependencies
        const TRANSACTIONS_KEY = 'fortune_transactions';
        const transactionsStr = localStorage.getItem(TRANSACTIONS_KEY);
        const transactions = transactionsStr ? JSON.parse(transactionsStr) : [];
        
        const newTransaction = {
          id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          assetId: asset.id.toLowerCase(),
          symbol: asset.symbol,
          name: asset.name,
          type: 'buy',
          quantity,
          price: asset.price,
          total: quantity * asset.price,
          date: new Date().toISOString(),
          status: 'completed',
        };
        
        transactions.unshift(newTransaction);
        localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
      } catch (error) {
        console.error('Error logging transaction:', error);
        // Don't fail the purchase if transaction logging fails
      }
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error buying asset:', error);
    return false;
  }
}

/**
 * Determine asset type from symbol
 */
function determineAssetType(symbol: string): 'stock' | 'crypto' | 'currency' {
  const cryptoSymbols = ['BTC', 'ETH', 'BNB', 'SOL', 'ADA', 'XRP', 'DOT'];
  const forexSymbols = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD', 'USD/CAD', 'USD/MXN'];
  
  if (cryptoSymbols.includes(symbol.toUpperCase())) {
    return 'crypto';
  } else if (forexSymbols.some(fx => symbol.includes('USD') || symbol.includes('/'))) {
    return 'currency';
  } else {
    return 'stock';
  }
}

