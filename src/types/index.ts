/**
 * Type definitions for Fortune Global platform
 */

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
}

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  type: "stock" | "crypto" | "forex";
  price: number;
  change24h: number;
  changePercent24h: number;
  volume24h: number;
  marketCap?: number;
  high24h: number;
  low24h: number;
  lastUpdated: Date;
}

export interface PortfolioAsset {
  id: string;
  asset: Asset;
  quantity: number;
  avgBuyPrice: number;
  currentValue: number;
  totalInvested: number;
  profitLoss: number;
  profitLossPercent: number;
}

export interface Portfolio {
  userId: string;
  totalValue: number;
  dailyChange: number;
  dailyChangePercent: number;
  assets: PortfolioAsset[];
  allocation: {
    stocks: number;
    crypto: number;
    forex: number;
  };
}

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  source: string;
  publishedAt: Date;
  category: "stocks" | "crypto" | "forex" | "economy" | "general";
}

export interface MarketData {
  symbol: string;
  timestamp: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface ChartDataPoint {
  time: string;
  value: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export type MarketType = "stocks" | "crypto" | "forex";

export type TimeRange = "1D" | "1W" | "1M" | "3M" | "1Y" | "ALL";




