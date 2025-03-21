import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { DashboardData, ChartData, SaleData } from './models';

// Collection and document references
const DASHBOARD_COLLECTION = 'dashboard';
const DASHBOARD_DOC = 'homepage';

// Get the dashboard data
export const getDashboardData = async (): Promise<DashboardData | null> => {
  const docRef = doc(db, DASHBOARD_COLLECTION, DASHBOARD_DOC);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap.data() as DashboardData;
  } else {
    // No data found
    return null;
  }
};

// Set the dashboard data
export const setDashboardData = async (data: DashboardData): Promise<void> => {
  const docRef = doc(db, DASHBOARD_COLLECTION, DASHBOARD_DOC);
  await setDoc(docRef, {
    ...data,
    lastUpdated: serverTimestamp(),
  });
};

// Update specific dashboard data
export const updateDashboardData = async (partialData: Partial<DashboardData>): Promise<void> => {
  const docRef = doc(db, DASHBOARD_COLLECTION, DASHBOARD_DOC);
  await updateDoc(docRef, {
    ...partialData,
    lastUpdated: serverTimestamp(),
  });
};

// Generate mock data for dashboard
export const generateMockDashboardData = (): DashboardData => {
  // Generate card data
  const cards = {
    revenue: {
      id: 'revenue',
      title: 'Total Revenue',
      value: '$' + (Math.floor(Math.random() * 90000) + 10000) + '.' + Math.floor(Math.random() * 90 + 10),
      change: (Math.random() * 30 + 5).toFixed(1) + '%',
      changeType: (Math.random() > 0.3 ? 'increase' : 'decrease') as 'increase' | 'decrease',
      timestamp: new Date().toISOString()
    },
    subscriptions: {
      id: 'subscriptions',
      title: 'Subscriptions',
      value: '+' + (Math.floor(Math.random() * 5000) + 1000),
      change: (Math.random() * 200 + 50).toFixed(1) + '%',
      changeType: (Math.random() > 0.2 ? 'increase' : 'decrease') as 'increase' | 'decrease',
      timestamp: new Date().toISOString()
    },
    sales: {
      id: 'sales',
      title: 'Sales',
      value: '+' + (Math.floor(Math.random() * 20000) + 5000),
      change: (Math.random() * 30 + 5).toFixed(1) + '%',
      changeType: (Math.random() > 0.3 ? 'increase' : 'decrease') as 'increase' | 'decrease',
      timestamp: new Date().toISOString()
    },
    activeUsers: {
      id: 'activeUsers',
      title: 'Active Now',
      value: '+' + (Math.floor(Math.random() * 1000) + 100),
      change: '+' + (Math.floor(Math.random() * 300) + 50) + ' since last hour',
      changeType: 'increase' as 'increase' | 'decrease',
      timestamp: new Date().toISOString()
    }
  };

  // Generate chart data
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const chartData: ChartData[] = months.map((month) => ({
    id: month.toLowerCase(),
    name: month,
    total: Math.floor(Math.random() * 5000) + 1000,
  }));

  // Generate recent sales data
  const names = [
    'Olivia Martin', 'Jackson Lee', 'Isabella Nguyen', 
    'William Kim', 'Sofia Davis', 'Ethan Patel', 
    'Emma Thompson', 'Noah Garcia', 'Ava Rodriguez', 
    'Liam Johnson'
  ];
  
  const recentSales: SaleData[] = Array(10).fill(null).map((_, i) => {
    const name = names[i];
    const firstName = name.split(' ')[0].toLowerCase();
    return {
      id: 'sale-' + (i + 1),
      name,
      email: `${firstName}${Math.floor(Math.random() * 100)}@example.com`,
      amount: '$' + (Math.floor(Math.random() * 1000) + 100) + '.' + Math.floor(Math.random() * 90 + 10),
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString()
    };
  });

  return {
    cards,
    chartData,
    recentSales,
    lastUpdated: new Date().toISOString()
  };
};

// Seed the database with mock data
export const seedDashboardData = async (): Promise<void> => {
  const mockData = generateMockDashboardData();
  await setDashboardData(mockData);
};
