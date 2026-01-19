"use client";

import { useActionState, useEffect } from 'react';
import { withdrawMoneyFromPot, WithdrawMoneyState } from '@/app/lib/actions';
import { Pot } from '@/app/lib/definitions';

interface WithdrawMoneyFormProps {
  pot: Pot;
  onClose: () => void;
}

export default function WithdrawMoneyForm({ pot, onClose }: WithdrawMoneyFormProps) {
  const initialState: WithdrawMoneyState = { message: null, errors: {} };
  
  // Bind the pot.id to the action
  const withdrawWithId = withdrawMoneyFromPot.bind(null, pot.id);
  const [state, formAction, isPending] = useActionState(withdrawWithId, initialState);

  useEffect(() => {
    if (state.message === 'Success') {
      onClose();
    }
  }, [state.message, onClose]);

  return (
    <form action={formAction} className="p-6">
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Withdraw from "{pot.name}"</h2>
        <div className="mt-2 p-3 bg-amber-50 rounded-lg">
          <p className="text-sm text-amber-800">
            Available Balance: <strong>${pot.total.toLocaleString()}</strong>
          </p>
        </div>
      </header>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Amount to Withdraw</label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-400">$</span>
            <input
              name="amount"
              type="number"
              max={pot.total} // Browser-side safety
              step="0.01"
              placeholder="0.00"
              required
              className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>
          {state.errors?.amount && (
            <p className="mt-2 text-sm text-red-600 font-medium">{state.errors.amount[0]}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition disabled:bg-slate-400"
        >
          {isPending ? 'Processing...' : 'Confirm Withdrawal'}
        </button>
      </div>
    </form>
  );
}