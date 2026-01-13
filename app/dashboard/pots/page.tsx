// app/dashboard/pots/page.tsx
import { fetchPots } from '@/app/lib/data';
import PotsClientContent from '@/app/ui/pots/PotsClientContent';

export default async function Page() {
  // 1. Fetch data safely on the server
  const pots = await fetchPots();

  // 2. Pass data to the client component
  return (
    <main>
      <PotsClientContent initialPots={pots} />
    </main>
  );
}