import CardWrapper from "@/app/ui/dashboard/cards";
import { fetchPots, fetchCardData, fetchBudgets } from '@/app/lib/data';
import PotsOverview from "@/app/ui/pots/PotsOverview";
import BudgetOverview from "@/app/ui/budgets/BudgetOverviewProps";
import TransactionTable from '@/app/ui/transactions/table';
import { TRANSACTIONS } from '@/app/lib/placeholder-data';
import { BILLS } from "@/app/lib/placeholder-data";
import BillsTable from "@/app/ui/recurring-bills/table";
import SummaryCard from "@/app/ui/recurring-bills/SummaryCard";

export default async function Page() {
  const [pots, budgets, cardData] = await Promise.all([
    fetchPots(),
    fetchBudgets(),
    fetchCardData(),
  ]);
  const { totalSaved } = await fetchCardData();
  const recentTransactions = TRANSACTIONS.slice(0, 5);

  return (
    <main >
      <h1 className="mb-6 text-xl md:text-2xl font-bold">Overview</h1>
      
      {/* Top Summary Cards */}
      <div className="w-full mb-4">
          <CardWrapper />
      </div>

      {/* Main Bento Grid */}
      <div className="flex flex-col lg:flex-row w-full min-h-screen gap-6 bg-[#F8F4F0]">
  
        {/* SECTION A: 66% Width */}
        <div className="flex flex-col lg:w-[55%] gap-6">
          
          {/* A1: 33% Height (Pots Overview) */}
          <div className="w-full h-[33%] bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <PotsOverview  pots={pots} totalSaved={totalSaved} />
          </div>

          {/* A2: 66% Height (Transactions) */}
          <div className="w-full h-[66%] bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="bg-white h-full rounded-xl shadow-sm overflow-hidden">
            {/* We use the component but hide search and pagination via props */}
            <TransactionTable 
              transactions={recentTransactions} 
              title="Recent Transactions"
              // showSearch={false}      // We'll add this prop to your component
              showPagination={false} 
            />
            </div>
          </div>
          
        </div>

        {/* SECTION B: 33% Width */}
        <div className="flex flex-col lg:w-[45%] gap-6">
          
          {/* B1: 55% Height (Budgets) */}
          <div className="w-full h-[55%] bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <BudgetOverview budgets={budgets} />
          </div>

          {/* B2: 45% Height (Analytics) */}
          <div className="w-full h-[45%] bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <SummaryCard bills={BILLS}/>
          </div>

        </div>
      </div>
    </main>
  );
}