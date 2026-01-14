import {fetchBudgets } from '@/app/lib/data';
import BudgetClientContent from '@/app/ui/budgets/BudgetsClientContent';

export default async function Page() {
  const budgets = await fetchBudgets();

  return (
    <main>
      <BudgetClientContent initialBudgets={budgets} />
    </main>
  );
}