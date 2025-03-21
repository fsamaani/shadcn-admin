import { Button } from '@/components/ui/button'
import { useFirebase } from '@/context/firebase-context'
import { Loader2 } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Overview } from './components/overview'
import { RecentSales } from './components/recent-sales'

export default function Dashboard() {
  const { dashboardData, loading, error, seedMockData, refreshDashboardData } = useFirebase()
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <TopNav links={topNav} />
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Main ===== */}
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
          <div className='flex items-center space-x-2'>
            <Button 
              onClick={seedMockData} 
              disabled={loading}
              variant="default"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                'Seed Mock Data'
              )}
            </Button>
            <Button 
              onClick={refreshDashboardData} 
              disabled={loading}
              variant="outline"
            >
              Refresh
            </Button>
          </div>
        </div>
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
              <TabsTrigger value='analytics' disabled>
                Analytics
              </TabsTrigger>
              <TabsTrigger value='reports' disabled>
                Reports
              </TabsTrigger>
              <TabsTrigger value='notifications' disabled>
                Notifications
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              {error && (
                <Card className="col-span-4 bg-destructive/10">
                  <CardHeader>
                    <CardTitle className="text-destructive">Error</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{error}</p>
                    <Button 
                      onClick={refreshDashboardData} 
                      className="mt-4" 
                      variant="outline"
                    >
                      Try Again
                    </Button>
                  </CardContent>
                </Card>
              )}
              
              {loading && !dashboardData ? (
                Array(4).fill(0).map((_, i) => (
                  <Card key={i} className="opacity-50">
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                      <CardTitle className='text-sm font-medium h-4 w-24 bg-muted animate-pulse rounded'></CardTitle>
                      <div className='h-4 w-4 bg-muted animate-pulse rounded'></div>
                    </CardHeader>
                    <CardContent>
                      <div className='h-8 w-32 bg-muted animate-pulse rounded mb-2'></div>
                      <div className='h-4 w-40 bg-muted animate-pulse rounded'></div>
                    </CardContent>
                  </Card>
                ))
              ) : dashboardData ? (
                <>
                  <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                      <CardTitle className='text-sm font-medium'>
                        {dashboardData.cards.revenue.title}
                      </CardTitle>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        className='h-4 w-4 text-muted-foreground'
                      >
                        <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className='text-2xl font-bold'>{dashboardData.cards.revenue.value}</div>
                      <p className='text-xs text-muted-foreground'>
                        {dashboardData.cards.revenue.change}
                      </p>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>No Data</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>No dashboard data found. Click the "Seed Mock Data" button to add some data.</p>
                    <Button 
                      onClick={seedMockData} 
                      className="mt-4"
                      disabled={loading}
                    >
                      Seed Mock Data
                    </Button>
                  </CardContent>
                </Card>
              )}
              {dashboardData && (
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      {dashboardData.cards.subscriptions.title}
                    </CardTitle>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='h-4 w-4 text-muted-foreground'
                    >
                      <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
                      <circle cx='9' cy='7' r='4' />
                      <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>{dashboardData.cards.subscriptions.value}</div>
                    <p className='text-xs text-muted-foreground'>
                      {dashboardData.cards.subscriptions.change}
                    </p>
                  </CardContent>
                </Card>
              )}
              {dashboardData && (
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>{dashboardData.cards.sales.title}</CardTitle>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='h-4 w-4 text-muted-foreground'
                    >
                      <rect width='20' height='14' x='2' y='5' rx='2' />
                      <path d='M2 10h20' />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>{dashboardData.cards.sales.value}</div>
                    <p className='text-xs text-muted-foreground'>
                      {dashboardData.cards.sales.change}
                    </p>
                  </CardContent>
                </Card>
              )}
              {dashboardData && (
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      {dashboardData.cards.activeUsers.title}
                    </CardTitle>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='h-4 w-4 text-muted-foreground'
                    >
                      <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>{dashboardData.cards.activeUsers.value}</div>
                    <p className='text-xs text-muted-foreground'>
                      {dashboardData.cards.activeUsers.change}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-1 lg:col-span-4'>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  {loading && !dashboardData ? (
                    <div className="flex items-center justify-center h-[350px]">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : dashboardData ? (
                    <Overview data={dashboardData.chartData} />
                  ) : null}
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-3'>
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>
                    You made 265 sales this month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading && !dashboardData ? (
                    <div className="flex items-center justify-center h-[350px]">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : dashboardData ? (
                    <RecentSales data={dashboardData.recentSales} />
                  ) : null}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}

const topNav = [
  {
    title: 'Overview',
    href: 'dashboard/overview',
    isActive: true,
    disabled: false,
  },
  {
    title: 'Customers',
    href: 'dashboard/customers',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Products',
    href: 'dashboard/products',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Settings',
    href: 'dashboard/settings',
    isActive: false,
    disabled: true,
  },
]
