/**
 * Transaction history management with localStorage
 */

export interface Transaction {
  id: string;
  assetId: string;
  symbol: string;
  name: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  total: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

const TRANSACTIONS_KEY = 'fortune_transactions';

/**
 * Get all transactions
 */
export function getTransactions(): Transaction[] {
  try {
    const transactionsStr = localStorage.getItem(TRANSACTIONS_KEY);
    return transactionsStr ? JSON.parse(transactionsStr) : [];
  } catch (error) {
    console.error('Error reading transactions:', error);
    return [];
  }
}

/**
 * Add a new transaction
 */
export function addTransaction(transaction: Omit<Transaction, 'id' | 'date' | 'status'>): Transaction {
  try {
    const transactions = getTransactions();
    
    const newTransaction: Transaction = {
      ...transaction,
      id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      date: new Date().toISOString(),
      status: 'completed',
    };
    
    transactions.unshift(newTransaction); // Add to beginning
    
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
    
    return newTransaction;
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw error;
  }
}

/**
 * Get transactions by asset
 */
export function getTransactionsByAsset(assetId: string): Transaction[] {
  const transactions = getTransactions();
  return transactions.filter(tx => tx.assetId === assetId);
}

/**
 * Get transactions by type
 */
export function getTransactionsByType(type: 'buy' | 'sell'): Transaction[] {
  const transactions = getTransactions();
  return transactions.filter(tx => tx.type === type);
}

/**
 * Clear all transactions
 */
export function clearTransactions(): void {
  localStorage.removeItem(TRANSACTIONS_KEY);
}

/**
 * Get total invested amount
 */
export function getTotalInvested(): number {
  const transactions = getTransactions();
  return transactions
    .filter(tx => tx.type === 'buy' && tx.status === 'completed')
    .reduce((total, tx) => total + tx.total, 0);
}

/**
 * Get transaction statistics
 */
export function getTransactionStats() {
  const transactions = getTransactions();
  
  const totalBuys = transactions.filter(tx => tx.type === 'buy').length;
  const totalSells = transactions.filter(tx => tx.type === 'sell').length;
  const totalAmount = transactions
    .filter(tx => tx.status === 'completed')
    .reduce((total, tx) => total + tx.total, 0);
  
  return {
    totalTransactions: transactions.length,
    totalBuys,
    totalSells,
    totalAmount,
  };
}

