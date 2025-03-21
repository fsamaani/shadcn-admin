import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SaleData } from '@/lib/firebase/models'

interface RecentSalesProps {
  data?: SaleData[];
}

export function RecentSales({ data = [] }: RecentSalesProps) {
  // Limit to showing only 5 sales
  const salesToShow = data.slice(0, 5);
  
  // If no data is provided, show a placeholder message
  if (salesToShow.length === 0) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <p className="text-muted-foreground">No recent sales data available.</p>
      </div>
    );
  }
  
  return (
    <div className='space-y-8'>
      {salesToShow.map((sale) => (
        <div key={sale.id} className='flex items-center gap-4'>
          <Avatar className='h-9 w-9'>
            {sale.avatarUrl ? (
              <AvatarImage src={sale.avatarUrl} alt={`${sale.name}'s avatar`} />
            ) : null}
            <AvatarFallback>
              {sale.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-1 flex-wrap items-center justify-between'>
            <div className='space-y-1'>
              <p className='text-sm font-medium leading-none'>{sale.name}</p>
              <p className='text-sm text-muted-foreground'>{sale.email}</p>
            </div>
            <div className='font-medium'>{sale.amount}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
