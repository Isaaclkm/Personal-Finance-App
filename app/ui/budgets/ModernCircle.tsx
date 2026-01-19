"use client";

import React from 'react';
import { Budget, Transaction } from '@/app/lib/definitions';

interface BudgetOverviewProps {
  budgets: Budget[];
  transactions: Transaction[];
}

export default function BudgetOverview({ budgets, transactions }: BudgetOverviewProps) {
  // Calculate totals based on the provided budgets and transactions
  const totalBudget = budgets.reduce((acc, curr) => acc + Number(curr.maximum_spend), 0);
  const totalSpent = transactions.reduce((acc, curr) => acc + Math.abs(curr.amount), 0);

  // SVG Math from your example
  const outerStrokeWidth = 20; 
  const innerStrokeWidth = 10; 
  const outerRadius = 85; 
  const innerRadius = 70; 

  const outerCircum = 2 * Math.PI * outerRadius;
  const innerCircum = 2 * Math.PI * innerRadius;

  const segments = budgets.map((budget) => {
    // Calculate category-specific spending from transactions
    const categorySpent = transactions
      .filter(t => t.category === budget.category)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const percentage = Number(budget.maximum_spend) / totalBudget;
    
    return {
      ...budget,
      categorySpent,
      outerStrokeDash: percentage * outerCircum,
      innerStrokeDash: percentage * innerCircum,
    };
  });

  return (
    <div className="flex flex-col p-8 bg-white rounded-2xl shadow-sm border border-slate-50">
      {/* 1. The Chart Section */}
      <div className="relative flex justify-center mb-10">
        <div className="relative w-64 h-64">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
            {segments.map((budget, index) => {
              const outerOffset = segments.slice(0, index).reduce((sum, b) => sum + b.outerStrokeDash, 0);
              const innerOffset = segments.slice(0, index).reduce((sum, b) => sum + b.innerStrokeDash, 0);

              return (
                <g key={budget.id}>
                  {/* Thick Outer Ring */}
                  <circle
                    cx="100" cy="100" r={outerRadius}
                    fill="transparent"
                    stroke={budget.theme}
                    strokeWidth={outerStrokeWidth}
                    strokeDasharray={`${budget.outerStrokeDash} ${outerCircum}`}
                    strokeDashoffset={-outerOffset}
                    className="transition-all duration-500"
                  />
                  {/* Thinner Inner Ring */}
                  <circle
                    cx="100" cy="100" r={innerRadius}
                    fill="transparent"
                    stroke={budget.theme}
                    strokeWidth={innerStrokeWidth}
                    strokeDasharray={`${budget.innerStrokeDash} ${innerCircum}`}
                    strokeDashoffset={-innerOffset}
                    className="opacity-20 transition-all duration-500"
                  />
                </g>
              );
            })}
          </svg>

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-black text-slate-900">${totalSpent.toFixed(0)}</span>
            <span className="text-xs text-slate-400 uppercase tracking-widest mt-1">
              of ${totalBudget} limit
            </span>
          </div>
        </div>
      </div>

      {/* 2. Spending Summary Section */}
      <div className="flex flex-col gap-6">
        <h3 className="text-xl font-bold text-slate-900">Spending Summary</h3>
        
        <div className="divide-y divide-slate-100">
          {segments.map((budget) => (
            <div key={budget.id} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                {/* Vertical Color Indicator */}
                <div 
                  className="w-1 h-6 rounded-full flex-shrink-0" 
                  style={{ backgroundColor: budget.theme }}
                />
                <span className="text-sm text-slate-500 font-medium">{budget.category}</span>
              </div>
              
              <div className="flex items-baseline gap-1">
                <span className="text-base font-bold text-slate-900">
                  ${budget.categorySpent.toFixed(2)}
                </span>
                <span className="text-xs text-slate-400">
                  of ${Number(budget.maximum_spend).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}