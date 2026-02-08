"use client";

import React from 'react';
import Link from 'next/link';
import { Budget } from '@/app/lib/definitions';

interface BudgetOverviewProps {
  budgets: Budget[];
}

export default function BudgetOverview({ budgets }: BudgetOverviewProps) {
  const totalBudget = budgets.reduce((acc, curr) => acc + Number(curr.maximum_spend), 0);
  const totalSpent = budgets.reduce((acc, curr) => acc + Number(curr.amount), 0);

// SVG Math - Outer is 20px thick, Inner is 10px thick
  const outerStrokeWidth = 20; 
  const innerStrokeWidth = 10; 

  const outerRadius = 85; 
  // This math (85 - 10 - 5) ensures the edges touch perfectly
  const innerRadius = 70; 

  const outerCircum = 2 * Math.PI * outerRadius;
  const innerCircum = 2 * Math.PI * innerRadius;

  const segments = budgets.map((budget) => {
    const percentage = Number(budget.maximum_spend) / totalBudget;
    return {
      ...budget,
      outerStrokeDash: percentage * outerCircum,
      innerStrokeDash: percentage * innerCircum,
    };
  });

  return (
    <div className="flex flex-col h-full p-6 bg-white rounded-xl shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-900">Budgets</h2>
        <Link href="/dashboard/budgets" className="text-sm text-slate-500 hover:text-slate-900 flex items-center gap-1 group">
          See Details
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Responsive Layout: Stack on mobile, side-by-side on desktop */}
      <div className="flex flex-col lg:flex-row items-center gap-8 flex-grow">
        
        {/* The Double Ring SVG */}
        <div className="relative w-52 h-52 sm:w-64 sm:h-64 flex-shrink-0">
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
                  {/* Thinner Inner Ring (Same color, lower opacity) */}
                  <circle
                    cx="100" cy="100" r={innerRadius}
                    fill="transparent"
                    stroke={budget.theme}
                    strokeWidth={innerStrokeWidth}
                    strokeDasharray={`${budget.innerStrokeDash} ${innerCircum}`}
                    strokeDashoffset={-innerOffset}
                    className="opacity-40 transition-all duration-500"
                  />
                </g>
              );
            })}
          </svg>

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-bold text-slate-900">${totalSpent}</span>
            <span className="text-xs text-slate-500 uppercase tracking-widest mt-1">
              of ${totalBudget} limit
            </span>
          </div>
        </div>

        {/* Responsive Legend: 2 columns on mobile, 1 column on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 w-full">
          {budgets.slice(0, 4).map((budget) => (
            <div key={budget.id} className="flex items-center gap-4 min-w-0">
              <div 
                className="w-1 h-10 rounded-full flex-shrink-0" 
                style={{ backgroundColor: budget.theme }}
              />
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-slate-500 truncate">
                  {budget.category}
                </span>
                <span className="text-sm font-bold text-slate-900 whitespace-nowrap">
                  ${budget.maximum_spend}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}