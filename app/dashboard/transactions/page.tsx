import TransactionTable from '@/app/ui/transactions/table';
import { TRANSACTIONS } from '@/app/lib/placeholder-data';

export default function Page() {
  return (
    <main className="p-4 sm:p-8">
      <TransactionTable transactions={TRANSACTIONS} />
    </main>
  );
}