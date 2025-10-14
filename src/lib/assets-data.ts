/**
 * Simulated market data for assets (stocks, crypto, currencies)
 */

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  type: 'stock' | 'crypto' | 'currency';
  price: number;
  change: number;
  changePercent: number;
  chartData: number[];
  // Additional details
  description?: string;
  ceo?: string;
  employees?: string;
  headquarters?: string;
  founded?: string;
  marketCap?: string;
  peRatio?: string;
  dividendYield?: string;
  volume?: string;
  dayHigh?: number;
  dayLow?: number;
  week52High?: number;
  week52Low?: number;
}

// Generate random chart data
function generateChartData(baseValue: number, points: number = 20): number[] {
  const data: number[] = [];
  let current = baseValue;
  
  for (let i = 0; i < points; i++) {
    const volatility = baseValue * 0.02; // 2% volatility
    const change = (Math.random() - 0.5) * volatility;
    current = current + change;
    data.push(Number(current.toFixed(2)));
  }
  
  return data;
}

// Stocks (Acciones)
const stocks: Asset[] = [
  {
    id: 'AAPL',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    type: 'stock',
    price: 178.72,
    change: 2.45,
    changePercent: 1.39,
    chartData: generateChartData(178.72),
    description: 'Apple Inc. diseña, fabrica y comercializa smartphones, computadoras personales, tablets, wearables y accesorios en todo el mundo. La compañía también vende varios servicios relacionados.',
    ceo: 'Tim Cook',
    employees: '164,000',
    headquarters: 'Cupertino, California',
    founded: '1976',
    marketCap: '$2.89T',
    peRatio: '29.87',
    dividendYield: '0.52%',
    volume: '52.4M',
    dayHigh: 180.25,
    dayLow: 176.50,
    week52High: 199.62,
    week52Low: 124.17,
  },
  {
    id: 'TSLA',
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    type: 'stock',
    price: 242.15,
    change: -3.82,
    changePercent: -1.55,
    chartData: generateChartData(242.15),
    description: 'Tesla Inc. diseña, desarrolla, fabrica y vende vehículos eléctricos y sistemas de generación y almacenamiento de energía en Estados Unidos, China y a nivel internacional.',
    ceo: 'Elon Musk',
    employees: '127,855',
    headquarters: 'Austin, Texas',
    founded: '2003',
    marketCap: '$768.5B',
    peRatio: '76.34',
    dividendYield: '0.00%',
    volume: '98.7M',
    dayHigh: 245.80,
    dayLow: 239.90,
    week52High: 299.29,
    week52Low: 101.81,
  },
  {
    id: 'MSFT',
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    type: 'stock',
    price: 405.89,
    change: 5.23,
    changePercent: 1.31,
    chartData: generateChartData(405.89),
    description: 'Microsoft Corporation desarrolla, licencia y soporta software, servicios, dispositivos y soluciones en todo el mundo. Los productos incluyen sistemas operativos, aplicaciones de productividad, soluciones empresariales y servicios en la nube.',
    ceo: 'Satya Nadella',
    employees: '221,000',
    headquarters: 'Redmond, Washington',
    founded: '1975',
    marketCap: '$3.02T',
    peRatio: '36.45',
    dividendYield: '0.72%',
    volume: '24.8M',
    dayHigh: 408.50,
    dayLow: 402.10,
    week52High: 420.82,
    week52Low: 309.45,
  },
  {
    id: 'GOOGL',
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    type: 'stock',
    price: 139.85,
    change: 1.92,
    changePercent: 1.39,
    chartData: generateChartData(139.85),
    description: 'Alphabet Inc. ofrece varios productos y plataformas en Estados Unidos, Europa, Medio Oriente, África, Asia-Pacífico y las Américas. Opera a través de Google Services, Google Cloud y otros segmentos.',
    ceo: 'Sundar Pichai',
    employees: '182,502',
    headquarters: 'Mountain View, California',
    founded: '1998',
    marketCap: '$1.76T',
    peRatio: '26.89',
    dividendYield: '0.00%',
    volume: '28.3M',
    dayHigh: 141.20,
    dayLow: 138.50,
    week52High: 153.78,
    week52Low: 101.88,
  },
  {
    id: 'AMZN',
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    type: 'stock',
    price: 145.32,
    change: -2.18,
    changePercent: -1.48,
    chartData: generateChartData(145.32),
    description: 'Amazon.com, Inc. se dedica al comercio minorista en línea en América del Norte e internacionalmente. Opera a través de tres segmentos: América del Norte, Internacional y Amazon Web Services (AWS).',
    ceo: 'Andy Jassy',
    employees: '1,541,000',
    headquarters: 'Seattle, Washington',
    founded: '1994',
    marketCap: '$1.51T',
    peRatio: '58.94',
    dividendYield: '0.00%',
    volume: '45.2M',
    dayHigh: 147.80,
    dayLow: 143.90,
    week52High: 161.72,
    week52Low: 88.12,
  },
  {
    id: 'NVDA',
    symbol: 'NVDA',
    name: 'NVIDIA Corp.',
    type: 'stock',
    price: 498.55,
    change: 8.76,
    changePercent: 1.79,
    chartData: generateChartData(498.55),
    description: 'NVIDIA Corporation opera como una empresa de computación visual en todo el mundo. Opera en dos segmentos, GPU y Tegra Processor. La compañía ofrece productos de computación y redes.',
    ceo: 'Jensen Huang',
    employees: '26,196',
    headquarters: 'Santa Clara, California',
    founded: '1993',
    marketCap: '$1.22T',
    peRatio: '108.23',
    dividendYield: '0.03%',
    volume: '42.8M',
    dayHigh: 502.30,
    dayLow: 493.50,
    week52High: 502.66,
    week52Low: 108.13,
  },
  {
    id: 'META',
    symbol: 'META',
    name: 'Meta Platforms Inc.',
    type: 'stock',
    price: 312.44,
    change: 4.25,
    changePercent: 1.38,
    chartData: generateChartData(312.44),
    description: 'Meta Platforms, Inc. desarrolla productos que permiten a las personas conectarse y compartir con amigos y familia a través de dispositivos móviles, computadoras personales, dispositivos de realidad virtual y en el hogar en todo el mundo.',
    ceo: 'Mark Zuckerberg',
    employees: '67,317',
    headquarters: 'Menlo Park, California',
    founded: '2004',
    marketCap: '$812.3B',
    peRatio: '28.56',
    dividendYield: '0.00%',
    volume: '19.4M',
    dayHigh: 315.80,
    dayLow: 308.90,
    week52High: 353.96,
    week52Low: 88.09,
  },
];

// Cryptocurrencies (Criptomonedas)
const cryptos: Asset[] = [
  {
    id: 'BTC',
    symbol: 'BTC',
    name: 'Bitcoin',
    type: 'crypto',
    price: 43256.78,
    change: 892.34,
    changePercent: 2.11,
    chartData: generateChartData(43256.78),
  },
  {
    id: 'ETH',
    symbol: 'ETH',
    name: 'Ethereum',
    type: 'crypto',
    price: 2287.45,
    change: -45.67,
    changePercent: -1.96,
    chartData: generateChartData(2287.45),
  },
  {
    id: 'BNB',
    symbol: 'BNB',
    name: 'Binance Coin',
    type: 'crypto',
    price: 312.89,
    change: 12.34,
    changePercent: 4.11,
    chartData: generateChartData(312.89),
  },
  {
    id: 'SOL',
    symbol: 'SOL',
    name: 'Solana',
    type: 'crypto',
    price: 98.76,
    change: 5.43,
    changePercent: 5.82,
    chartData: generateChartData(98.76),
  },
  {
    id: 'ADA',
    symbol: 'ADA',
    name: 'Cardano',
    type: 'crypto',
    price: 0.54,
    change: -0.02,
    changePercent: -3.57,
    chartData: generateChartData(0.54),
  },
  {
    id: 'XRP',
    symbol: 'XRP',
    name: 'Ripple',
    type: 'crypto',
    price: 0.62,
    change: 0.03,
    changePercent: 5.08,
    chartData: generateChartData(0.62),
  },
  {
    id: 'DOT',
    symbol: 'DOT',
    name: 'Polkadot',
    type: 'crypto',
    price: 7.23,
    change: -0.15,
    changePercent: -2.03,
    chartData: generateChartData(7.23),
  },
];

// Currencies (Divisas)
const currencies: Asset[] = [
  {
    id: 'EURUSD',
    symbol: 'EUR/USD',
    name: 'Euro / Dólar',
    type: 'currency',
    price: 1.0842,
    change: 0.0023,
    changePercent: 0.21,
    chartData: generateChartData(1.0842),
  },
  {
    id: 'GBPUSD',
    symbol: 'GBP/USD',
    name: 'Libra / Dólar',
    type: 'currency',
    price: 1.2678,
    change: -0.0045,
    changePercent: -0.35,
    chartData: generateChartData(1.2678),
  },
  {
    id: 'USDJPY',
    symbol: 'USD/JPY',
    name: 'Dólar / Yen',
    type: 'currency',
    price: 149.84,
    change: 0.56,
    changePercent: 0.38,
    chartData: generateChartData(149.84),
  },
  {
    id: 'AUDUSD',
    symbol: 'AUD/USD',
    name: 'Dólar Australiano / Dólar',
    type: 'currency',
    price: 0.6523,
    change: 0.0012,
    changePercent: 0.18,
    chartData: generateChartData(0.6523),
  },
  {
    id: 'USDCAD',
    symbol: 'USD/CAD',
    name: 'Dólar / Dólar Canadiense',
    type: 'currency',
    price: 1.3542,
    change: -0.0021,
    changePercent: -0.15,
    chartData: generateChartData(1.3542),
  },
  {
    id: 'USDMXN',
    symbol: 'USD/MXN',
    name: 'Dólar / Peso Mexicano',
    type: 'currency',
    price: 17.23,
    change: 0.08,
    changePercent: 0.47,
    chartData: generateChartData(17.23),
  },
];

export const allAssets: Asset[] = [...stocks, ...cryptos, ...currencies];

export function getAssetsByType(type: 'stock' | 'crypto' | 'currency'): Asset[] {
  return allAssets.filter(asset => asset.type === type);
}

export function getAssetById(id: string): Asset | undefined {
  return allAssets.find(asset => asset.id === id);
}

// Generate historical chart data for different timeframes
export function generateHistoricalData(
  currentPrice: number,
  timeframe: '1D' | '1W' | '1M' | '3M' | 'YTD' | '1Y' | '5Y' | 'ALL'
): { timestamp: number; price: number }[] {
  const now = Date.now();
  const data: { timestamp: number; price: number }[] = [];
  
  let points: number;
  let intervalMs: number;
  
  switch (timeframe) {
    case '1D':
      points = 78; // 5-minute intervals for 6.5 hours (trading day)
      intervalMs = 5 * 60 * 1000;
      break;
    case '1W':
      points = 35; // 5 days, 7 points per day
      intervalMs = 2 * 60 * 60 * 1000;
      break;
    case '1M':
      points = 30; // Daily data for 1 month
      intervalMs = 24 * 60 * 60 * 1000;
      break;
    case '3M':
      points = 90; // Daily data for 3 months
      intervalMs = 24 * 60 * 60 * 1000;
      break;
    case 'YTD':
      points = 180; // ~6 months
      intervalMs = 24 * 60 * 60 * 1000;
      break;
    case '1Y':
      points = 252; // Trading days in a year
      intervalMs = 24 * 60 * 60 * 1000;
      break;
    case '5Y':
      points = 260; // Weekly data for 5 years
      intervalMs = 7 * 24 * 60 * 60 * 1000;
      break;
    case 'ALL':
      points = 120; // Monthly data
      intervalMs = 30 * 24 * 60 * 60 * 1000;
      break;
    default:
      points = 78;
      intervalMs = 5 * 60 * 1000;
  }
  
  const volatility = currentPrice * 0.02; // 2% volatility
  let price = currentPrice * 0.85; // Start at 85% of current price
  
  for (let i = 0; i < points; i++) {
    const timestamp = now - (points - i) * intervalMs;
    const change = (Math.random() - 0.45) * volatility; // Slight upward bias
    price = Math.max(price + change, currentPrice * 0.5); // Don't go below 50% of current
    
    data.push({
      timestamp,
      price: Number(price.toFixed(2)),
    });
  }
  
  // Ensure last point is current price
  data[data.length - 1].price = currentPrice;
  
  return data;
}

// Simulate real-time updates
export function updateAssetPrice(asset: Asset): Asset {
  const volatility = asset.price * 0.001; // 0.1% volatility per update
  const change = (Math.random() - 0.5) * volatility;
  const newPrice = Number((asset.price + change).toFixed(asset.type === 'currency' ? 4 : 2));
  const priceChange = Number((newPrice - asset.price).toFixed(asset.type === 'currency' ? 4 : 2));
  const percentChange = Number(((priceChange / asset.price) * 100).toFixed(2));
  
  // Update chart data
  const newChartData = [...asset.chartData.slice(1), newPrice];
  
  return {
    ...asset,
    price: newPrice,
    change: priceChange,
    changePercent: percentChange,
    chartData: newChartData,
  };
}

