import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getDashboardData, seedDashboardData } from '@/lib/firebase/dashboardService';
import { DashboardData } from '@/lib/firebase/models';

interface FirebaseContextType {
  dashboardData: DashboardData | null;
  loading: boolean;
  error: string | null;
  refreshDashboardData: () => Promise<void>;
  seedMockData: () => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export function FirebaseProvider({ children }: { children: ReactNode }) {
  const [dashboardData, setDashboardState] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refreshDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDashboardData();
      setDashboardState(data);
    } catch (err) {
      // Handle error gracefully
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`Failed to fetch dashboard data: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const seedMockData = async () => {
    try {
      setLoading(true);
      setError(null);
      await seedDashboardData();
      await refreshDashboardData();
    } catch (err) {
      // Handle error gracefully
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`Failed to seed mock data: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    refreshDashboardData();
  }, []);

  const value = {
    dashboardData,
    loading,
    error,
    refreshDashboardData,
    seedMockData
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
}
