import ScheduleSessionForm from "@/components/schedule/ScheduleSessionForm";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";

export default function SchedulePage() {
  return (
    <div className="min-h-screen w-full bg-linear-to-b from-[#dfdafba9] to-[#F9CCC5]/90">
      
      {/* Centered Container */}
      <div className="mx-auto w-full max-w-[454px]">
        
        <div className="flex items-center gap-2 px-4 pt-6 py-2">
          <Link href="/doctors" className="text-white/90">
            <FaChevronLeft color="black" size={20} />
          </Link>

          <h1 className="text-base font-semibold text-black">
            Schedule Session
          </h1>
        </div>

        <div className="mt-4 px-4">
          <ScheduleSessionForm />
        </div>

      </div>
    </div>
  );
}