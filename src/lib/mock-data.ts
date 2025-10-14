import type { Asset, NewsArticle, Testimonial, Service, Portfolio, PortfolioAsset } from "@/types";

/**
 * Mock data for Fortune Global platform
 * This simulates real-time market data for demonstration purposes
 */

// Mock Stock Assets
export const mockStocks: Asset[] = [
  {
    id: "aapl",
    symbol: "AAPL",
    name: "Apple Inc.",
    type: "stock",
    price: 178.72,
    change24h: 2.45,
    changePercent24h: 1.39,
    volume24h: 52847382,
    marketCap: 2780000000000,
    high24h: 179.23,
    low24h: 176.12,
    lastUpdated: new Date(),
  },
  {
    id: "tsla",
    symbol: "TSLA",
    name: "Tesla, Inc.",
    type: "stock",
    price: 242.84,
    change24h: -3.21,
    changePercent24h: -1.30,
    volume24h: 98234512,
    marketCap: 771000000000,
    high24h: 246.55,
    low24h: 241.30,
    lastUpdated: new Date(),
  },
  {
    id: "msft",
    symbol: "MSFT",
    name: "Microsoft Corporation",
    type: "stock",
    price: 378.91,
    change24h: 4.67,
    changePercent24h: 1.25,
    volume24h: 23847293,
    marketCap: 2820000000000,
    high24h: 380.22,
    low24h: 375.84,
    lastUpdated: new Date(),
  },
  {
    id: "amzn",
    symbol: "AMZN",
    name: "Amazon.com, Inc.",
    type: "stock",
    price: 151.94,
    change24h: 1.83,
    changePercent24h: 1.22,
    volume24h: 45283749,
    marketCap: 1570000000000,
    high24h: 152.67,
    low24h: 150.23,
    lastUpdated: new Date(),
  },
  {
    id: "googl",
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    type: "stock",
    price: 139.67,
    change24h: 0.92,
    changePercent24h: 0.66,
    volume24h: 28374829,
    marketCap: 1750000000000,
    high24h: 140.45,
    low24h: 138.90,
    lastUpdated: new Date(),
  },
  {
    id: "nvda",
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    type: "stock",
    price: 495.22,
    change24h: 8.34,
    changePercent24h: 1.71,
    volume24h: 38472938,
    marketCap: 1220000000000,
    high24h: 497.88,
    low24h: 488.90,
    lastUpdated: new Date(),
  },
];

// Mock Crypto Assets
export const mockCrypto: Asset[] = [
  {
    id: "btc",
    symbol: "BTC",
    name: "Bitcoin",
    type: "crypto",
    price: 43287.52,
    change24h: 1247.83,
    changePercent24h: 2.97,
    volume24h: 28473829473,
    marketCap: 847000000000,
    high24h: 43890.23,
    low24h: 42156.78,
    lastUpdated: new Date(),
  },
  {
    id: "eth",
    symbol: "ETH",
    name: "Ethereum",
    type: "crypto",
    price: 2287.43,
    change24h: -34.21,
    changePercent24h: -1.47,
    volume24h: 12847392847,
    marketCap: 275000000000,
    high24h: 2324.67,
    low24h: 2265.89,
    lastUpdated: new Date(),
  },
  {
    id: "sol",
    symbol: "SOL",
    name: "Solana",
    type: "crypto",
    price: 98.76,
    change24h: 4.23,
    changePercent24h: 4.48,
    volume24h: 2847392847,
    marketCap: 42000000000,
    high24h: 99.87,
    low24h: 95.23,
    lastUpdated: new Date(),
  },
  {
    id: "xrp",
    symbol: "XRP",
    name: "Ripple",
    type: "crypto",
    price: 0.6234,
    change24h: 0.0123,
    changePercent24h: 2.01,
    volume24h: 1847392847,
    marketCap: 33000000000,
    high24h: 0.6345,
    low24h: 0.6123,
    lastUpdated: new Date(),
  },
  {
    id: "ada",
    symbol: "ADA",
    name: "Cardano",
    type: "crypto",
    price: 0.4567,
    change24h: -0.0089,
    changePercent24h: -1.91,
    volume24h: 847392847,
    marketCap: 16000000000,
    high24h: 0.4678,
    low24h: 0.4489,
    lastUpdated: new Date(),
  },
];

// Mock Forex Assets
export const mockForex: Asset[] = [
  {
    id: "eurusd",
    symbol: "EUR/USD",
    name: "Euro to US Dollar",
    type: "forex",
    price: 1.0876,
    change24h: 0.0012,
    changePercent24h: 0.11,
    volume24h: 5847392847392,
    high24h: 1.0889,
    low24h: 1.0856,
    lastUpdated: new Date(),
  },
  {
    id: "gbpusd",
    symbol: "GBP/USD",
    name: "British Pound to US Dollar",
    type: "forex",
    price: 1.2634,
    change24h: -0.0023,
    changePercent24h: -0.18,
    volume24h: 3847392847392,
    high24h: 1.2667,
    low24h: 1.2612,
    lastUpdated: new Date(),
  },
  {
    id: "usdjpy",
    symbol: "USD/JPY",
    name: "US Dollar to Japanese Yen",
    type: "forex",
    price: 149.87,
    change24h: 0.34,
    changePercent24h: 0.23,
    volume24h: 4847392847392,
    high24h: 150.23,
    low24h: 149.45,
    lastUpdated: new Date(),
  },
];

// Mock News Articles
export const mockNews: NewsArticle[] = [
  {
    id: "1",
    title: "Apple presenta nuevos avances en inteligencia artificial para sus dispositivos",
    description: "La compañía tecnológica anuncia importantes mejoras en sus capacidades de IA, impulsando el precio de sus acciones.",
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=800&q=80",
    source: "TechNews",
    publishedAt: new Date(Date.now() - 3600000),
    category: "stocks",
  },
  {
    id: "2",
    title: "Bitcoin alcanza nuevo máximo mensual mientras instituciones aumentan inversión",
    description: "El mercado cripto muestra señales alcistas con un volumen de trading sin precedentes.",
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80",
    source: "CryptoDaily",
    publishedAt: new Date(Date.now() - 7200000),
    category: "crypto",
  },
  {
    id: "3",
    title: "Fed mantiene tasas de interés: Impacto en mercados globales",
    description: "La Reserva Federal decide mantener su política monetaria actual, generando volatilidad en Forex.",
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    source: "Financial Times",
    publishedAt: new Date(Date.now() - 10800000),
    category: "economy",
  },
  {
    id: "4",
    title: "Tesla supera expectativas de producción en Q4",
    description: "El fabricante de vehículos eléctricos reporta cifras récord de producción y entregas.",
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80",
    source: "Bloomberg",
    publishedAt: new Date(Date.now() - 14400000),
    category: "stocks",
  },
  {
    id: "5",
    title: "Ethereum completa actualización importante mejorando escalabilidad",
    description: "La red implementa cambios clave que reducen costos de transacción y mejoran velocidad.",
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
    source: "CoinDesk",
    publishedAt: new Date(Date.now() - 18000000),
    category: "crypto",
  },
  {
    id: "6",
    title: "Mercados asiáticos cierran con ganancias mixtas",
    description: "Análisis de los principales índices bursátiles de Asia y su impacto en mercados occidentales.",
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80",
    source: "Reuters",
    publishedAt: new Date(Date.now() - 21600000),
    category: "general",
  },
];

// Mock Testimonials
export const mockTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Carlos Rodríguez",
    role: "Inversionista",
    company: "Tech Ventures SA",
    content: "Fortune Global transformó mi forma de invertir. La plataforma es intuitiva y los análisis en tiempo real son invaluables.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    rating: 5,
  },
  {
    id: "2",
    name: "María González",
    role: "Trader Profesional",
    company: "Independent",
    content: "Excelente herramienta para trading. Los datos en tiempo real y la interfaz moderna hacen que operar sea un placer.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    rating: 5,
  },
  {
    id: "3",
    name: "Juan Pérez",
    role: "Director Financiero",
    company: "Global Investments",
    content: "La mejor plataforma de trading que he usado. Recomendada para profesionales y principiantes por igual.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juan",
    rating: 5,
  },
];

// Mock Services
export const mockServices: Service[] = [
  {
    id: "1",
    title: "Academia de Trading",
    description: "Aprende a operar en mercados financieros con cursos profesionales y mentorías personalizadas.",
    icon: "GraduationCap",
    features: [
      "Cursos desde básico hasta avanzado",
      "Sesiones en vivo con traders profesionales",
      "Certificación oficial",
      "Acceso de por vida al material",
    ],
  },
  {
    id: "2",
    title: "Análisis e Insights",
    description: "Recibe análisis expertos y señales de trading basadas en IA y análisis técnico avanzado.",
    icon: "TrendingUp",
    features: [
      "Señales de trading diarias",
      "Análisis técnico profesional",
      "Reportes de mercado semanales",
      "Alertas en tiempo real",
    ],
  },
  {
    id: "3",
    title: "Señales de Crypto",
    description: "Mantente al día con las mejores oportunidades en el mercado de criptomonedas.",
    icon: "Bitcoin",
    features: [
      "Señales de compra/venta",
      "Análisis on-chain",
      "Alertas de precio",
      "Indicadores personalizados",
    ],
  },
  {
    id: "4",
    title: "Consultoría Financiera",
    description: "Asesoría personalizada para optimizar tu portafolio y estrategias de inversión.",
    icon: "Users",
    features: [
      "Sesiones 1-a-1 con expertos",
      "Análisis de portafolio",
      "Estrategias personalizadas",
      "Seguimiento mensual",
    ],
  },
];

// Mock Portfolio Data
export function getMockPortfolio(userId: string): Portfolio {
  const portfolioAssets: PortfolioAsset[] = [
    {
      id: "p1",
      asset: mockStocks[0], // AAPL
      quantity: 50,
      avgBuyPrice: 172.50,
      currentValue: 8936.00,
      totalInvested: 8625.00,
      profitLoss: 311.00,
      profitLossPercent: 3.61,
    },
    {
      id: "p2",
      asset: mockCrypto[0], // BTC
      quantity: 0.5,
      avgBuyPrice: 40000.00,
      currentValue: 21643.76,
      totalInvested: 20000.00,
      profitLoss: 1643.76,
      profitLossPercent: 8.22,
    },
    {
      id: "p3",
      asset: mockStocks[1], // TSLA
      quantity: 25,
      avgBuyPrice: 235.00,
      currentValue: 6071.00,
      totalInvested: 5875.00,
      profitLoss: 196.00,
      profitLossPercent: 3.34,
    },
    {
      id: "p4",
      asset: mockCrypto[1], // ETH
      quantity: 10,
      avgBuyPrice: 2200.00,
      currentValue: 22874.30,
      totalInvested: 22000.00,
      profitLoss: 874.30,
      profitLossPercent: 3.97,
    },
  ];

  const totalValue = portfolioAssets.reduce((sum, asset) => sum + asset.currentValue, 0);
  const totalInvested = portfolioAssets.reduce((sum, asset) => sum + asset.totalInvested, 0);
  const dailyChange = totalValue - totalInvested;
  const dailyChangePercent = (dailyChange / totalInvested) * 100;

  return {
    userId,
    totalValue,
    dailyChange,
    dailyChangePercent,
    assets: portfolioAssets,
    allocation: {
      stocks: 25.5,
      crypto: 72.3,
      forex: 2.2,
    },
  };
}

// Function to generate random price movement for live updates
export function generatePriceUpdate(currentPrice: number): number {
  const changePercent = (Math.random() - 0.5) * 0.02; // ±1% change
  return Number((currentPrice * (1 + changePercent)).toFixed(2));
}

// Get all assets
export function getAllAssets(): Asset[] {
  return [...mockStocks, ...mockCrypto, ...mockForex];
}

// Get assets by type
export function getAssetsByType(type: "stock" | "crypto" | "forex"): Asset[] {
  return getAllAssets().filter((asset) => asset.type === type);
}




