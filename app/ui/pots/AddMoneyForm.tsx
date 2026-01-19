"use client";

import { useActionState, useEffect } from 'react';
import { addMoneyToPot, AddMoneyState } from '@/app/lib/actions';
import { Pot } from '@/app/lib/definitions';

interface AddMoneyFormProps {
  pot: Pot;
  onClose: () => void;
}

export default function AddMoneyForm({ pot, onClose }: AddMoneyFormProps) {
  const initialState: AddMoneyState = { message: null, errors: {} };
  
  // Bind BOTH the ID and the Target to the action
  const addMoneyWithData = addMoneyToPot.bind(null, pot.id, pot.target);
  
  const [state, formAction, isPending] = useActionState(addMoneyWithData, initialState);

  // Close modal automatically on success
  useEffect(() => {
    if (state.message === 'Success') {
      onClose();
    }
  }, [state.message, onClose]);

  const amountLeft = pot.target - pot.total;

  return (
    <form action={formAction} className="p-6">
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Add to "{pot.name}"</h2>
        <p className="text-sm text-slate-500">Current Balance: ${pot.total.toLocaleString()}</p>
      </header>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Amount to Add</label>
          <input
            name="amount"
            type="number"
            max={amountLeft} // Browser-level validation
            step="0.01"
            className="..."
          />
          {state.errors?.amount && (
            <p className="mt-2 text-sm text-red-600 font-medium">{state.errors.amount[0]}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition disabled:bg-slate-400"
        >
          {isPending ? 'Processing...' : 'Confirm Addition'}
        </button>
      </div>
    </form>
  );
}