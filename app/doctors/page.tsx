import AppShell from "@/components/layout/AppShell";
import DoctorCard from "@/components/doctors/DoctorCard";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { CiGrid41 } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";

export default function DoctorsPage() {
  return (
    <AppShell>
      <div className="flex items-center gap-2 bg-white text-black px-4 py-6">
        <Link href="/">
          <FaChevronLeft />
        </Link>
        <h1 className="text-base font-semibold ">
          Available Doctors
        </h1>
      </div>

      <div className="mt-4 flex gap-2 px-4">
        <div className="flex-1 rounded-md bg-white px-3 py-2 backdrop-blur flex items-center justify-between gap-2">
          <input
            className="w-full bg-transparent text-sm outline-none placeholder:text-black/40"
            placeholder="Search Psychologists..."
          />

          <button type="button" className="shrink-0 text-black/60 hover:text-black">
            <CiSearch className="text-lg" />
          </button>
        </div>

        <button className="h-10 w-10 rounded-md bg-white backdrop-blur flex justify-center items-center">
          <CiGrid41 className="text-xl" />
        </button>

        <button className="h-10 w-10 rounded-xl bg-white backdrop-blur flex justify-center items-center">
          <CiFilter  className="text-xl"/>
        </button>
      </div>

      <div className="mt-5 space-y-4">
        <DoctorCard
          name="Dr. Tejas Shukla"
          phone="+91 98765 43210"
          specialist="Gynaecology"
          expanded
          imageUrl="/images/img1.png"
        />
        <DoctorCard name="Dr. Priya Kapoor" phone="+91 98765 43210" specialist="IVF Specialist"    imageUrl="/images/img2.png"/>
        <DoctorCard name="Dr. Pranav Saxena" phone="+91 98765 43210" specialist="Gynaecology"     imageUrl="/images/img3.png"/>
        <DoctorCard name="Dr. Toshib Bagde" phone="+91 98765 43210"  specialist="Psychologist"    imageUrl="/images/img4.png"/>
      </div>
    </AppShell>
  );
}
