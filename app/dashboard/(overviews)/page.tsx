import CardWrapper from "@/app/ui/dashboard/cards";
import { fetchPots, fetchCardData, fetchBudgets } from '@/app/lib/data';
import PotsOverview from "@/app/ui/pots/PotsOverviewProps";
import BudgetOverview from "@/app/ui/budgets/BudgetOverviewProps";

export default async function Page() {
  const [pots, budgets, cardData] = await Promise.all([
    fetchPots(),
    fetchBudgets(),
    fetchCardData(),
  ]);
  const { totalSaved } = await fetchCardData();

  return (
    <main className="p-4 md:p-8">
      <h1 className="mb-6 text-xl md:text-2xl font-bold">Overview</h1>
      
      {/* Top Summary Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <CardWrapper />
      </div>

      {/* Main Bento Grid */}
      <div className="flex flex-col lg:flex-row w-full min-h-screen gap-6 p-6 bg-slate-50">
  
      {/* SECTION A: 66% Width */}
      <div className="flex flex-col lg:w-[66%] gap-6">
        
        {/* A1: 33% Height (Pots Overview) */}
        <div className="w-full h-[33%] bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <PotsOverview  pots={pots} totalSaved={totalSaved} />
        </div>

        {/* A2: 66% Height (Transactions) */}
        <div className="w-full h-[66%] bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          
        </div>
        
      </div>

      {/* SECTION B: 33% Width */}
      <div className="flex flex-col lg:w-[33%] gap-6">
        
        {/* B1: 55% Height (Budgets) */}
        <div className="w-full h-[55%] bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <BudgetOverview budgets={budgets} />
        </div>

        {/* B2: 45% Height (Analytics) */}
        <div className="w-full h-[45%] bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h2 className="font-bold text-slate-800 uppercase text-xs tracking-widest mb-4">B2 - 45% Height</h2>
          {/* Your Analytics/Chart goes here */}
        </div>

      </div>
    </div>
    </main>
  );
}