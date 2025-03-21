import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { ChartData } from '@/lib/firebase/models'

interface OverviewProps {
  data?: ChartData[];
}

export function Overview({ data = [] }: OverviewProps) {
  // Fall back to empty array if no data is provided
  const chartData = data.length > 0 ? data : [
    {
      id: 'empty',
      name: 'No Data',
      total: 0,
    }
  ];

  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={chartData}>
        <XAxis
          dataKey='name'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar
          dataKey='total'
          fill='currentColor'
          radius={[4, 4, 0, 0]}
          className='fill-primary'
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
