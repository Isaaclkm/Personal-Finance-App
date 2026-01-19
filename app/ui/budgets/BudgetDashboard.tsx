"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Transaction {
  id: string;
  name: string;
  image: string;
  category: string;
  date: string;
  amount: number;
}

interface BudgetCategory {
  title: string;
  max: number;
  color: string; // Tailwind color class e.g., 'teal-600'
  bgColor: string; // Tailwind color class e.g., 'bg-teal-50'
}

export default function BudgetDashboard({ transactions }: { transactions: Transaction[] }) {
  // Define your budget limits
  const budgets: BudgetCategory[] = [
    { title: "Entertainment", max: 50.00, color: "text-teal-600", bgColor: "bg-teal-600" },
    { title: "Bills", max: 750.00, color: "text-sky-400", bgColor: "bg-sky-400" },
    { title: "Dining Out", max: 75.00, color: "text-orange-300", bgColor: "bg-orange-300" },
  ];

  return (
    <div className="flex w-full flex-col gap-6 bg-[#F8F4F0] min-h-screen">
      {budgets.map((budget) => {
        // Filter transactions for this specific category
        const categoryTransactions = transactions
          .filter(t => t.category.toLowerCase() === budget.title.toLowerCase())
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        const spent = categoryTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
        const remaining = Math.max(0, budget.max - spent);
        const progressWidth = Math.min(100, (spent / budget.max) * 100);

        return (
          <div key={budget.title} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 w-full max-w-2xl">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${budget.bgColor}`} />
                <h2 className="text-xl font-bold text-slate-900">{budget.title}</h2>
              </div>
              <button className="text-slate-400 hover:text-slate-600">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
              </button>
            </div>

            <p className="text-slate-500 text-sm mb-4">Maximum of ${budget.max.toFixed(2)}</p>

            {/* Progress Bar */}
            <div className="w-full h-8 bg-slate-50 rounded-lg overflow-hidden mb-6 p-1">
              <div 
                className={`h-full rounded-md transition-all duration-500 ${budget.bgColor}`}
                style={{ width: `${progressWidth}%` }}
              />
            </div>

            {/* Spent/Remaining Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="border-l-4 border-slate-100 pl-4">
                <p className="text-xs text-slate-400 mb-1">Spent</p>
                <p className="text-sm font-bold text-slate-900">${spent.toFixed(2)}</p>
              </div>
              <div className="border-l-4 border-slate-100 pl-4">
                <p className="text-xs text-slate-400 mb-1">Remaining</p>
                <p className="text-sm font-bold text-slate-900">${remaining.toFixed(2)}</p>
              </div>
            </div>

            {/* Latest Spending Section */}
            <div className="bg-slate-50/50 rounded-xl p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-slate-900">Latest Spending</h3>
                <Link href={`/budgets/${budget.title.toLowerCase()}`} className="text-xs text-slate-500 flex items-center gap-1 hover:text-slate-900">
                  See All <span className="text-[10px]">▶</span>
                </Link>
              </div>

              <div className="divide-y divide-slate-100">
                {categoryTransactions.slice(0, 3).map((t) => (
                  <div key={t.id} className="flex justify-between items-center py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                        <Image src={t.image} alt={t.name} fill className="object-cover" />
                      </div>
                      <span className="text-xs font-bold text-slate-900 truncate max-w-[120px]">{t.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-slate-900">-${Math.abs(t.amount).toFixed(2)}</p>
                      <p className="text-[10px] text-slate-400">
                        {new Date(t.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                ))}
                {categoryTransactions.length === 0 && (
                  <p className="text-xs text-slate-400 py-2 italic">No spending yet</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}