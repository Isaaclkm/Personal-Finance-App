import BillsTable from "@/app/ui/recurring-bills/table";
import { BILLS } from "@/app/lib/placeholder-data";
import BillCard from "@/app/ui/recurring-bills/Card";

export default function Page() {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className=" w-full lg:w-[30%]">
        <BillCard bills={BILLS}/>

      </div>
      <div className="w-full lg:w-[70%]">
        <BillsTable bills={BILLS}/>
      </div>
    </div>
  )
}