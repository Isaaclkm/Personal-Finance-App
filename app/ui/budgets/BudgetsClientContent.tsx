"use client";

import { useState } from "react";
import Modal from "../modal";
import CreateBudgetForm from "./create-budgets";
import { Budget } from "@/app/lib/definitions";

interface BudgetClientProps {
  initialBudgets: Budget[];
}

export default function BudgetClientContent({ initialBudgets }: BudgetClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Budgets</h1>
        
        {/* The Trigger Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-900 text-white px-4 py-3 rounded-lg font-bold hover:bg-slate-700 transition"
        >
          + Add New Budget
        </button>
      </div>

      {/* Grid of existing pots */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialBudgets.map((budget) => (
          <div key={budget.id} className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-3 mb-4">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: budget.theme }} />
                <h3 className="font-bold text-slate-800">{budget.category}</h3>
             </div>
             <p className="text-sm text-slate-500">Total Saved: ${budget.amount}</p>
          </div>
        ))}
      </div>

      {/* The Modal Layer */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreateBudgetForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </section>
  );
}