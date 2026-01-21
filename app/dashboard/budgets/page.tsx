import BillsTable from "@/app/ui/recurring-bills/table";
import { BILLS } from "@/app/lib/placeholder-data";
import BillCard from "@/app/ui/recurring-bills/Card";
import {fetchBudgets } from '@/app/lib/data';
import BudgetClientContent from '@/app/ui/budgets/BudgetsClientContent';
import BudgetOverview from "@/app/ui/budgets/BudgetOverviewProps";
import BudgetDashboard from "@/app/ui/budgets/BudgetDashboard";
import { transactions } from "@/app/lib/placeholder-data";
import ModernCircleChart from "@/app/ui/budgets/ModernCircle";

export default async function Page() {
  const budgets = await fetchBudgets();

  return (
    <div className="w-full">
      <h1>Budget</h1>
      <div className="flex w-full flex-col lg:flex-row gap-4">
        <div className=" w-full lg:w-[35%]">
          <ModernCircleChart transactions={transactions} budgets={budgets}/>
        </div>
        <div className="w-full h-12 lg:w-[65%]">
          <BudgetDashboard transactions = {transactions}/>
        </div>
      </div>
    </div>
  )
}



