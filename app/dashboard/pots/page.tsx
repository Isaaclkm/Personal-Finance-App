import { fetchPots } from '@/app/lib/data';
import PotsClientContent from '@/app/ui/pots/PotsClientContent';

export default async function Page() {
  const pots = await fetchPots();

  return (
    <main>
      <PotsClientContent initialPots={pots} />
    </main>
  );
}