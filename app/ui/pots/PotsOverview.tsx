import React from 'react';
import Link from 'next/link';
import { Pot } from '@/app/lib/definitions';
import { publicSans } from '../fonts';

interface PotsOverviewProps {
  pots: Pot[];
  totalSaved: string; // Already formatted from your fetchCardData
}

export default function PotsOverview({ pots, totalSaved }: PotsOverviewProps) {
  // We only show the first 4 pots in the summary as per your requirement
  const displayPots = pots.slice(0, 4);

  return (
    <div className={`${publicSans} bg-white rounded-xl w-full max-w-full`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-900">Pots</h2>
        <Link 
          href="/dashboard/pots" 
          className="text-sm text-slate-500 hover:text-slate-900 flex items-center gap-1 transition"
        >
          See Details
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Total Saved Summary */}

      {/* Inside PotsOverview Component */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side: Total Saved Big Display */}
        <div className="flex-shrink-0">
          <p className="text-sm text-slate-500 mb-1">Total Saved</p>
          <p className="text-xl font-bold text-slate-900">{totalSaved}</p>
        </div>

        {/* Right Side: 4 Mini Pots in a Grid */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 flex-grow">
          {pots.slice(0, 4).map((pot) => (
            <div key={pot.id} className="relative pl-4 flex flex-col justify-center">
              <div 
                className="absolute left-0 top-1 bottom-1 w-1 rounded-full" 
                style={{ backgroundColor: pot.theme }}
              />
              <span className="text-xs text-slate-500 truncate uppercase tracking-wider">{pot.name}</span>
              <span className="text-lg font-bold text-slate-900">${pot.total}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}