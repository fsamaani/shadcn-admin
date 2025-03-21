// Data models for Firebase

// Dashboard card data model
export interface DashboardCard {
  id: string;
  title: string;
  value: string | number;
  change: string;
  changeType: 'increase' | 'decrease'; // For styling
  timestamp: string;
}

// Chart data model
export interface ChartData {
  id: string;
  name: string;
  total: number;
}

// Recent sales data model
export interface SaleData {
  id: string;
  name: string;
  email: string;
  amount: string;
  timestamp: string;
  avatarUrl?: string;
}

// Dashboard data collection
export interface DashboardData {
  cards: {
    revenue: DashboardCard;
    subscriptions: DashboardCard;
    sales: DashboardCard;
    activeUsers: DashboardCard;
  };
  chartData: ChartData[];
  recentSales: SaleData[];
  lastUpdated: string;
}
