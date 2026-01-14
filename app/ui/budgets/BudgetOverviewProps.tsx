import React from 'react';
import Link from 'next/link';
import { Budget } from '@/app/lib/definitions';

interface BudgetOverviewProps {
  budgets: Budget[];
}

export default function BudgetOverview({ budgets }: BudgetOverviewProps) {
  const totalBudget = budgets.reduce((acc, curr) => acc + Number(curr.maximum_spend), 0);
  const totalSpent = budgets.reduce((acc, curr) => acc + Number(curr.amount), 0);

  // SVG Math for the Donut Chart
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  let currentOffset = 0;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-900">Budgets</h2>
        <Link href="/dashboard/budgets" className="text-sm text-slate-500 hover:text-slate-900 flex items-center gap-1">
          See Details
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-8 flex-grow">
        {/* Left Side: SVG Donut Chart */}
        <div className="relative flex items-center justify-center w-[160px] h-[160px]">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
            {budgets.map((budget) => {
              const percentage = (Number(budget.maximum_spend) / totalBudget) * 100;
              const strokeDash = (percentage * circumference) / 100;
              const strokeOffset = currentOffset;
              currentOffset -= strokeDash;

              return (
                <circle
                  key={budget.id}
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="transparent"
                  stroke={budget.theme}
                  strokeWidth="20"
                  strokeDasharray={`${strokeDash} ${circumference}`}
                  strokeDashoffset={strokeOffset}
                  className="transition-all duration-500"
                />
              );
            })}
          </svg>
          {/* Middle Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-sm font-bold text-slate-900">${totalSpent}</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider">of ${totalBudget} limit</span>
          </div>
        </div>

        {/* Right Side: List of Budgets */}
        <div className="flex flex-col gap-4 w-full">
          {budgets.slice(0, 4).map((budget) => (
            <div key={budget.id} className="relative pl-4 flex justify-between items-center w-full">
              <div 
                className="absolute left-0 top-1 bottom-1 w-1 rounded-full" 
                style={{ backgroundColor: budget.theme }}
              />
              <div className='flex flex-col'>
                <span className="text-xs text-slate-500">{budget.category}</span>
                <span className="text-sm font-bold text-slate-900">${budget.maximum_spend}</span>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}