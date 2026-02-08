import React from 'react';
import Link from 'next/link';
import { Pot } from '@/app/lib/definitions';
import { publicSans } from '../fonts';

interface PotsOverviewProps {
  pots: Pot[];
  totalSaved: string;
}

export default function PotsOverview({ pots, totalSaved }: PotsOverviewProps) {
  const displayPots = pots.slice(0, 4);
  const moneyLink = '/assets/images/icon-pot.svg'

  return (
    <div className={`${publicSans} bg-white rounded-xl p-6 w-full`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-900">Pots</h2>
        <Link
          href="/dashboard/pots"
          className="text-sm text-slate-500 hover:text-slate-900 flex items-center gap-1"
        >
          See Details
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Total Saved Card */}
        <div className="flex flex-row gap-4 bg-[#f8f4f0] rounded-xl p-6 w-full lg:w-64">

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg  flex items-center justify-center">
              <img
                src="/assets/images/icon-pot.svg"
                alt="Pot icon"
                className="w-10 h-10"
              />
            </div>   
          </div>

          <div className='flex flex-col gap-2'>
           <span className="text-sm text-slate-500">Total Saved</span>
           <p className="text-3xl font-bold text-slate-900">{totalSaved}</p>
          </div>

        </div>

        {/* Pots Grid */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-6 flex-grow">
          {displayPots.map((pot) => (
            <div key={pot.id} className="flex gap-3 min-w-0">
              <div
                className="w-1 rounded-full flex-shrink-0"
                style={{ backgroundColor: pot.theme }}
              />
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-slate-500 uppercase tracking-wide truncate">
                  {pot.name}
                </span>
                <span className="text-sm font-bold text-slate-900 whitespace-nowrap">
                  ${pot.total}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
