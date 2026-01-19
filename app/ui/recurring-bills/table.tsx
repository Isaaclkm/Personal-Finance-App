"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { publicSans } from '@/app/ui/fonts';
import { Bills } from '@/app/lib/definitions';
import { BillsTableProps } from '@/app/lib/definitions';

export default function BillsTable({ 
  bills, 
  itemsPerPage = 10, 
  title = "Bills",
  showPagination = true 
}: BillsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('latest');

  // Reference date: August 4, 2024
  const CURRENT_DATE = new Date('2024-08-04');

  const getUrgencyStatus = (dateString: string) => {
    const billDate = new Date(dateString);
    
    // Calculate difference in days
    const diffTime = billDate.getTime() - CURRENT_DATE.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Logic: Only show "!" if date is AFTER Aug 4 AND within 3 days
    const isAfterToday = billDate > CURRENT_DATE;
    const isWithinThreeDays = diffDays > 0 && diffDays <= 3;

    return isAfterToday && isWithinThreeDays;
  };

  const processedBills = bills
    .filter((t) => t.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'latest') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'oldest') return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortBy === 'a-to-z') return a.name.localeCompare(b.name);
      if (sortBy === 'z-to-a') return b.name.localeCompare(a.name);
      if (sortBy === 'highest') return b.amount - a.amount;
      if (sortBy === 'lowest') return a.amount - b.amount;
      return 0;
    });

  const totalPages = Math.ceil(processedBills.length / itemsPerPage);
  const currentItems = showPagination 
    ? processedBills.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : processedBills.slice(0, itemsPerPage);

  return (
    <div className="w-full">
      <h1 className={`${publicSans.className} w-full text-slate-900 mb-4 text-xl font-bold`}>{title}</h1>

      <div className="bg-white p-4 sm:p-8 rounded-xl shadow-sm w-full">
        {/* Search and Filters Row */}
        {showPagination && (
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-8">
            <div className="relative w-full lg:w-64">
              <input
                type="text"
                placeholder="Search bill"
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-slate-900 text-sm"
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              />
            </div>

            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="flex items-center gap-2 flex-1 lg:flex-none">
                <span className="text-sm text-slate-500 whitespace-nowrap">Sort by</span>
                <select 
                  className="w-full lg:w-auto px-3 py-2 border rounded-lg text-sm outline-none"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="latest">Latest</option>
                  <option value="oldest">Oldest</option>
                  <option value="a-to-z">A to Z</option>
                  <option value="z-to-a">Z to A</option>
                  <option value="highest">Highest</option>
                  <option value="lowest">Lowest</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Table View */}
        <div className="overflow-x-auto">
          <div className="min-w-[500px]">
            <div className="flex flex-row justify-between px-4 py-3 border-b text-xs font-medium text-slate-500 uppercase tracking-wider">
              <span>Bill Name</span>
              <span>Due Date</span>
              <span className="text-right">Amount</span>
            </div>
            
            <div className="divide-y">
                {currentItems.map((tx) => {
                const billDate = new Date(tx.date);
                const CURRENT_DATE = new Date('2024-08-04');
                
                // Logic: Paid if on or before Aug 4
                const isPaid = billDate <= CURRENT_DATE;
                // Logic: Urgent if after Aug 4 AND within 3 days
                const showWarning = getUrgencyStatus(tx.date);
                
                return (
                    <div key={tx.id} className="flex flex-row justify-between items-center px-4 py-5 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-none">
                    
                    {/* 1. Recipient Info */}
                    <div className="flex w-[30%] items-center gap-4">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-slate-100 shadow-sm">
                        <Image src={tx.image} alt={tx.name} fill className="object-cover" />
                        </div>
                        <span className="font-bold text-slate-900 text-sm tracking-tight">{tx.name}</span>
                    </div>

                    {/* 2. Due Date with Conditional Icons */}
                    <div className="flex w-[30%] items-center gap-3">
                        <span className={`text-xs font-semibold uppercase tracking-wider ${isPaid ? 'text-emerald-700' : 'text-slate-900'}`}>
                        {new Date(tx.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </span>

                        {/* Green Check Circle - Only for Paid/Past Bills */}
                        {isPaid && (
                        <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        )}

                        {/* Red Alert Circle - Only for Upcoming Urgent Bills */}
                        {showWarning && (
                        <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center shadow-sm animate-pulse flex-shrink-0">
                            <span className="text-white text-[11px] font-black italic">!</span>
                        </div>
                        )}
                    </div>

                    {/* 3. Amount */}
                    <div className="text-right">
                        <span className="text-sm font-bold text-slate-900">
                        ${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                    </div>  
                );
                })}
            </div>
          </div>
        </div>

        {/* Pagination Footer */}
        {/* ... (Same as previous version) */}
      </div>
    </div>
  );
}