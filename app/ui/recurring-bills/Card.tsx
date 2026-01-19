import { BillsTableProps } from "@/app/lib/definitions";
import { publicSans } from "../fonts";

export default function BillCard({bills}:
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
        <div className="flex flex-col gap-6 mb-8">
        {/* 1. Total Bills Hero Card */}
        <div className="bg-[#201F24] rounded-2xl p-6 text-white flex flex-col justify-between h-48">
            <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            </div>
            <div>
            <p className={`${publicSans.className} text-white text-sm mb-1`}>Total bills</p>
            <h2 className="text-xl font-bold">${totals.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
            </div>
        </div>

        {/* 2. Summary Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Summary</h3>
            
            <div className="space-y-4">
            {/* Paid Bills Row */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                <span className="text-slate-500 text-sm">Paid Bills</span>
                <span className="text-slate-900 font-bold text-sm">
                {totals.paidCount} (${totals.paidAmount.toLocaleString()})
                </span>
            </div>

            {/* Total Upcoming Row */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                <span className="text-slate-500 text-sm">Total Upcoming</span>
                <span className="text-slate-900 font-bold text-sm">
                {totals.upcomingCount} (${totals.upcomingAmount.toLocaleString()})
                </span>
            </div>

            {/* Due Soon Row */}
            <div className="flex justify-between items-center">
                <span className="text-red-500 text-sm font-medium">Due soon</span>
                <span className="text-red-500 font-bold text-sm">
                {totals.dueSoonCount} (${totals.dueSoonAmount.toLocaleString()})
                </span>
            </div>
            </div>
        </div>
        </div>
    )
}