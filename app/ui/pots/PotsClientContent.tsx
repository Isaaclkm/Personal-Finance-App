"use client";

import { useState } from "react";
import Modal from "../modal";
import CreatePotForm from "./create-pot";
import { Pot } from "@/app/lib/definitions";
import PotsCard from "./PotsCard";

interface PotsClientProps {
  initialPots: Pot[];
}

export default function PotsClientContent({ initialPots }: PotsClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Pots</h1>
        
        {/* The Trigger Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-900 text-white px-4 py-3 rounded-lg font-bold hover:bg-slate-700 transition"
        >
          + Add New Pot
        </button>
      </div>

      {/* Grid of existing pots */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {initialPots.map((pot) => (
            <PotsCard pot={pot}/>
          // <div key={pot.id} className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
          //    <div className="flex items-center gap-3 mb-4">
          //       <div className="w-4 h-4 rounded-full" style={{ backgroundColor: pot.theme }} />
          //       <h3 className="font-bold text-slate-800">{pot.name}</h3>
          //    </div>
          //    <p className="text-sm text-slate-500">Total Saved: ${pot.total}</p>
          //    <p className="text-sm text-slate-500">Target Saved: ${pot.target}</p>
          // </div>
        ))}
      </div>

      {/* The Modal Layer */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreatePotForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </section>
  );
}