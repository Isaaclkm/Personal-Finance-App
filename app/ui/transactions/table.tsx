"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { publicSans } from '@/app/ui/fonts';

interface Transaction {
  id: string;
  name: string;
  image: string;
  category: string;
  date: string;
  amount: number;
  is_income: boolean;
}

interface TransactionTableProps {
  transactions: Transaction[];
  itemsPerPage?: number;
  title?: string;
  showPagination?: boolean;
}

export default function TransactionTable({ 
  transactions, 
  itemsPerPage = 10, 
  title = "Transactions",
  showPagination = true 
}: TransactionTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('latest');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // 1. Get unique categories for the dropdown
  const categories = ['all', ...Array.from(new Set(transactions.map(t => t.category)))];

  // 2. Filter and Sort Logic
  const processedTransactions = transactions
    .filter((t) => {
      const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'latest') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'oldest') return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortBy === 'a-to-z') return a.name.localeCompare(b.name);
      if (sortBy === 'z-to-a') return b.name.localeCompare(a.name);
      if (sortBy === 'highest') return b.amount - a.amount;
      if (sortBy === 'lowest') return a.amount - b.amount;
      return 0;
    });

  const totalPages = Math.ceil(processedTransactions.length / itemsPerPage);
  const currentItems = showPagination 
    ? processedTransactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : processedTransactions.slice(0, itemsPerPage);

  return (
    <div className="w-full">
      {/* Title Header - Now outside the white box */}
      <h1 className={`${publicSans.className} w-full text-slate-900`}>{title}</h1>

      <div className="bg-white p-4 sm:p-8 rounded-xl shadow-sm w-full">
        {/* Search and Filters Row */}
        {showPagination && (
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-8">
            {/* Search - Left */}
            <div className="relative w-full lg:w-64">
              <input
                type="text"
                placeholder="Search transaction"
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-slate-900 text-sm"
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              />
            </div>

            {/* Filters - Right */}
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

              <div className="flex items-center gap-2 flex-1 lg:flex-none">
                <span className="text-sm text-slate-500 whitespace-nowrap">Category</span>
                <select 
                  className="w-full lg:w-auto px-3 py-2 border rounded-lg text-sm outline-none"
                  value={categoryFilter}
                  onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat === 'all' ? 'All Transactions' : cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {!showPagination && (
           <div className="flex justify-end mb-4">
             <Link href="/dashboard/transactions" className="text-sm text-slate-500 hover:text-slate-900 flex items-center gap-1 group">
               See Details
               <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
             </Link>
           </div>
        )}

        {/* List Layouts */}
        {showPagination ? (
          /* FULL VIEW */
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              <div className="grid grid-cols-4 px-4 py-3 border-b text-xs font-medium text-slate-500 uppercase tracking-wider">
                <span>Recipient / Sender</span>
                <span>Category</span>
                <span>Date</span>
                <span className="text-right">Amount</span>
              </div>
              <div className="divide-y">
                {currentItems.map((tx) => (
                  <div key={tx.id} className="grid grid-cols-4 items-center px-4 py-4 hover:bg-slate-50 transition">
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                        <Image src={tx.image} alt={tx.name} fill className="object-cover" />
                      </div>
                      <span className="font-bold text-slate-900 text-sm truncate">{tx.name}</span>
                    </div>
                    <span className="text-slate-500 text-sm">{tx.category}</span>
                    <span className="text-slate-500 text-sm">{tx.date}</span>
                    <span className={`text-right font-bold text-sm ${tx.is_income ? 'text-emerald-600' : 'text-slate-900'}`}>
                      {tx.is_income ? `+$${tx.amount.toFixed(2)}` : `-$${tx.amount.toFixed(2)}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* MINIMAL VIEW */
          <div className="divide-y divide-slate-100">
            {currentItems.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <Image src={tx.image} alt={tx.name} fill className="object-cover" />
                  </div>
                  <span className="font-bold text-slate-900 text-sm">{tx.name}</span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`font-bold text-sm ${tx.is_income ? 'text-emerald-600' : 'text-slate-900'}`}>
                    {tx.is_income ? `+$${tx.amount.toFixed(2)}` : `-$${tx.amount.toFixed(2)}`}
                  </span>
                  <span className="text-xs text-slate-500">{tx.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Footer */}
        {showPagination && totalPages > 1 && (
          <div className="flex justify-between items-center mt-8 pt-4">
            <button 
              onClick={() => setCurrentPage(p => p - 1)} 
              disabled={currentPage === 1} 
              className="flex items-center gap-2 px-4 py-2 text-sm border rounded-lg disabled:opacity-30 hover:bg-slate-50"
            >
              <span className="text-[10px]">◀</span> Prev
            </button>
            
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-lg border text-sm transition ${
                    currentPage === i + 1 ? 'bg-slate-900 text-white border-slate-900' : 'hover:bg-slate-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button 
              onClick={() => setCurrentPage(p => p + 1)} 
              disabled={currentPage === totalPages} 
              className="flex items-center gap-2 px-4 py-2 text-sm border rounded-lg disabled:opacity-30 hover:bg-slate-50"
            >
              Next <span className="text-[10px]">▶</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}