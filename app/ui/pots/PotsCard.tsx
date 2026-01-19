import React, { useState } from 'react';
import { Pot } from '@/app/lib/definitions';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import Modal from '../modal';
import AddMoneyForm from './AddMoneyForm';
import WithdrawMoneyForm from './WithdrawMoneyForm';

interface PotsCardProps {
  pot: Pot;
}

export default function PotsCard({ pot }: PotsCardProps) {
  const [modalMode, setModalMode] = useState<'add' | 'withdraw' | null>(null);
  
  // Calculate percentage for progress bar and display
  const percentage = Math.min((pot.total / pot.target) * 100, 100);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div 
            className="w-4 h-4 rounded-full" 
            style={{ backgroundColor: pot.theme }} 
          />
          <h3 className="text-xl font-bold text-slate-900">{pot.name}</h3>
        </div>
        <button className="text-slate-400 hover:text-slate-900 transition">
           <EllipsisHorizontalIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Amount Display: Label left, Value right */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-slate-500">Total Saved</p>
        <p className="text-3xl font-bold text-slate-900">${pot.total.toLocaleString()}</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-2 rounded-full mb-2 overflow-hidden">
        <div 
          className="h-full transition-all duration-500"
          style={{ width: `${percentage}%`, backgroundColor: pot.theme }}
        />
      </div>

      {/* Progress Metadata: Percentage left, Target right */}
      <div className="flex justify-between items-center mb-8">
        <span className="text-xs font-bold text-slate-500">
          {percentage.toFixed(2)}%
        </span>
        <span className="text-xs text-slate-500">
          Target of ${pot.target.toLocaleString()}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => setModalMode('add')}
          className="py-3 px-4 bg-slate-50 text-slate-900 font-bold rounded-lg hover:bg-white border border-transparent hover:border-slate-200 transition"
        >
          + Add Money
        </button>
        <button 
          onClick={() => setModalMode('withdraw')}
          className="py-3 px-4 bg-slate-50 text-slate-900 font-bold rounded-lg hover:bg-white border border-transparent hover:border-slate-200 transition"
        >
          Withdraw
        </button>
      </div>

    <Modal isOpen={!!modalMode} onClose={() => setModalMode(null)}>
      {modalMode === 'add' && <AddMoneyForm pot={pot} onClose={() => setModalMode(null)} />}
      {modalMode === 'withdraw' && <WithdrawMoneyForm pot={pot} onClose={() => setModalMode(null)} />}
    </Modal>
    </div>
  );
}