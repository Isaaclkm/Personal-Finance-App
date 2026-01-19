// import { fetchCardData } from '@/app/lib/data';
import { publicSans, lusitana } from '@/app/ui/fonts';
// CardWrapper Component
export default async function CardWrapper() {
  return (
    // Use a flexible container that doesn't force a full-width grid if you want them narrow
    <div className="flex flex-row items-stretch w-[100%] h-[50%] bg-stone-400 gap-4">
      <Card 
        title="Current Balance" 
        value={4836.00} 
        variant="primary" 
      />
      <Card 
        title="Income" 
        value={3814.25} 
        variant="secondary" 
      />
      <Card 
        title="Expenses" 
        value={1700.50} 
        variant="secondary" 
      />
    </div>
  );
}

// Card Component
export function Card({
  title,
  value,
  variant,
}: {
  title: string;
  value: number;
  variant: 'primary' | 'secondary';
}) {
  const bgClass = variant === 'primary' ? 'bg-[#0F172A] text-white' : 'bg-white text-slate-900';
  const labelClass = variant === 'primary' ? 'text-white' : 'text-slate-500';

  return (
    // Set a fixed width (w-40) and height to get that vertical rectangle shape
    <div className={`rounded-xl pt-6 mshadow-sm w-full h-20 flex flex-col justify-center ${bgClass}`}>
      <div className= {`${publicSans.className} flex flex-col gap-3 pl-6 pb-4`}>
        {/* Title at the top */}
        <h3 className={`text-xs font-normal leading-tight ${labelClass}`}>
          {title}
        </h3>
        
        {/* Value at the bottom with large $ symbol */}
        <p className={`${lusitana.className} text-3xl font-bold truncate`}>
          ${value.toLocaleString(undefined, { minimumFractionDigits: 0 })}
        </p>
      </div>
    </div>
  );
}