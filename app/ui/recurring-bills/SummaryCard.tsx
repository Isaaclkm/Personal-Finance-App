import { BillsTableProps } from "@/app/lib/definitions";
import Link from "next/link";

export default function SummaryCard({bills}:
BillsTableProps
){
    const CURRENT_DATE = new Date('2024-08-04');

    const totals = bills.reduce((acc, bill) => {
        const billDate = new Date(bill.date);
        const diffTime = billDate.getTime() - CURRENT_DATE.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const isPaid = billDate <= CURRENT_DATE;
        const isUpcoming = billDate > CURRENT_DATE;
        const isDueSoon = diffDays > 0 && diffDays <= 3;

        if (isPaid) {
        acc.paidCount++;
        acc.paidAmount += bill.amount;
        }
        if (isUpcoming) {
        acc.upcomingCount++;
        acc.upcomingAmount += bill.amount;
        }
        if (isDueSoon) {
        acc.dueSoonCount++;
        acc.dueSoonAmount += bill.amount;
        }
        
        acc.totalAmount += bill.amount;
        return acc;
    }, {
        paidCount: 0, paidAmount: 0,
        upcomingCount: 0, upcomingAmount: 0,
        dueSoonCount: 0, dueSoonAmount: 0,
        totalAmount: 0
    });
    return(
  
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">Recurring Bills</h3>
            <Link 
            href="/dashboard/recurring-bills" 
            className="text-sm text-slate-500 hover:text-slate-900 flex items-center gap-1 group"
            >
            See Details
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            </Link>
        </div>
        
        <div className="space-y-3">
            {/* Paid Bills Row */}
            <div className="flex justify-between items-center p-4 bg-emerald-50/30 rounded-xl border-l-4 border-emerald-500">
            <span className="text-slate-500 text-sm font-medium">Paid Bills</span>
            <span className="text-slate-900 font-bold text-base">
                ${totals.paidAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
            </div>

            {/* Total Upcoming Row */}
            <div className="flex justify-between items-center p-4 bg-orange-50/30 rounded-xl border-l-4 border-orange-400">
            <span className="text-slate-500 text-sm font-medium">Total Upcoming</span>
            <span className="text-slate-900 font-bold text-base">
                ${totals.upcomingAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
            </div>

            {/* Due Soon Row */}
            <div className="flex justify-between items-center p-4 bg-cyan-50/30 rounded-xl border-l-4 border-cyan-400">
            <span className="text-slate-500 text-sm font-medium">Due Soon</span>
            <span className="text-slate-900 font-bold text-base">
                ${totals.dueSoonAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
            </div>
        </div>
        </div>
    )
}