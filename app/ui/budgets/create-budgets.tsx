"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useActionState } from 'react'; // In older Next.js versions use 'react-dom'
import { BudgetState, createBudget } from '@/app/lib/actions';

interface CreateBudgetProps {
  onClose: () => void;
}

const CATEGORY = [
  { name: 'Bills', color: '#10b981', value: 'bills' },
  { name: 'Groceries', color: '#3b82f6', value: 'groceries' },
  { name: 'Entertainment', color: '#a855f7', value: 'entertainment' },
  { name: 'Transportation', color: '#f59e0b', value: 'transportation' },
  { name: 'Personal Care', color: '#f43f5e', value: 'personal-care' },
];

const THEMES = [
  { name: 'Emerald', color: '#10b981', value: 'emerald' },
  { name: 'Blue', color: '#3b82f6', value: 'blue' },
  { name: 'Purple', color: '#a855f7', value: 'purple' },
  { name: 'Amber', color: '#f59e0b', value: 'amber' },
  { name: 'Rose', color: '#f43f5e', value: 'rose' },
];

export default function CreateBudgetForm({ onClose }: CreateBudgetProps) {
  // 1. Set up the Action State
  const initialState: BudgetState = { message: null, errors: {} };
    const [state, formAction, isPending] = useActionState(createBudget, initialState);

  // Custom dropdown state
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORY[0]);
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
  const categoryRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);


  // Click outside logic
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryRef.current && 
        !categoryRef.current.contains(event.target as Node)
      ) {
        setIsOpen1(false);
      }

      if (
        themeRef.current && 
        !themeRef.current.contains(event.target as Node)
      ) {
        setIsOpen2(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Create New Budget</h2>
        <p className="text-sm text-slate-500">Set a new savings goal and track your progress.</p>
      </header>

      {/* 2. Connect the action to the form */}
      <form action={formAction} className="space-y-6">
        
        {/* Category drop down */}
        <div className="relative" ref={categoryRef}>
          <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
          
          {/* 3. Hidden input to send the theme value to the Server Action */}
          <input type="hidden" name="category" value={selectedCategory.name} />

          <button
            type="button"
            onClick={() => setIsOpen1(!isOpen1)}
            className="w-full flex items-center justify-between px-4 py-2 border border-slate-300 rounded-lg bg-white"
          >
            <div className="flex items-center gap-3">
              <span className="text-slate-700">{selectedCategory.name}</span>
            </div>

            <svg className={`w-4 h-4 transition-transform ${isOpen1 ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isOpen1 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-60 overflow-auto">
              {CATEGORY.map((category) => (
                <button
                  key={category.name}
                  type="button"
                  onClick={() => { setSelectedCategory(category); setIsOpen1(false); }}
                  className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 transition text-left"
                >
                  <span className="text-sm">{category.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Target Amount */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Maximun Spend</label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-400">$</span>
            <input 
              name="maximum_spend" // IMPORTANT: matching your Zod schema
              type="number" 
              step="0.01"
              placeholder="0.00" 
              className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          {state.errors?.maximum_spend && <p className="mt-1 text-xs text-red-500">{state.errors.maximum_spend}</p>}
        </div>

        {/* Theme Color (Custom Dropdown) */}
        <div className="relative" ref={themeRef}>
          <label className="block text-sm font-medium text-slate-700 mb-1">Theme Color</label>
          
          {/* 3. Hidden input to send the theme value to the Server Action */}
          <input type="hidden" name="theme" value={selectedTheme.color} />

          <button
            type="button"
            onClick={() => setIsOpen2(!isOpen2)}
            className="w-full flex items-center justify-between px-4 py-2 border border-slate-300 rounded-lg bg-white"
          >
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedTheme.color }} />
              <span className="text-slate-700">{selectedTheme.name}</span>
            </div>
            <svg className={`w-4 h-4 transition-transform ${isOpen2 ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isOpen2 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-60 overflow-auto">
              {THEMES.map((theme) => (
                <button
                  key={theme.value}
                  type="button"
                  onClick={() => { setSelectedTheme(theme); setIsOpen2(false); }}
                  className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 transition text-left"
                >
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.color }} />
                  <span className="text-sm">{theme.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-4 space-y-3">
          <button 
            type="submit" 
            disabled={isPending} // Disable while submitting
            className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition disabled:bg-slate-400"
          >
            {isPending ? 'Adding Budget...' : 'Confirm Addition'}
          </button>
        
          <button 
            type="button" 
            onClick={onClose} 
            className="w-full text-slate-500 py-2 text-sm hover:underline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}