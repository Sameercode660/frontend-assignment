import AppShell from "@/components/layout/AppShell";
import DoctorCard from "@/components/doctors/DoctorCard";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import { CiSearch, CiGrid41, CiFilter } from "react-icons/ci";

const doctors = [
  {
    id: 1,
    name: "Dr. Tejas Shukla",
    phone: "+91 98765 43210",
    specialist: "Gynaecology",
    imageUrl: "/images/img1.png",
    expanded: true,
  },
  {
    id: 2,
    name: "Dr. Priya Kapoor",
    phone: "+91 98765 43210",
    specialist: "IVF Specialist",
    imageUrl: "/images/img2.png",
  },
  {
    id: 3,
    name: "Dr. Pranav Saxena",
    phone: "+91 98765 43210",
    specialist: "Gynaecology",
    imageUrl: "/images/img3.png",
  },
  {
    id: 4,
    name: "Dr. Toshib Bagde",
    phone: "+91 98765 43210",
    specialist: "Psychologist",
    imageUrl: "/images/img4.png",
  },
];

export default function DoctorsPage() {
  return (
    <AppShell>
      {/* Header */}
      <div className="flex items-center gap-3 bg-white px-4 py-6 text-black">
        <Link href="/" aria-label="Go back">
          <FaChevronLeft />
        </Link>

        <h1 className="text-base font-semibold">Available Doctors</h1>
      </div>

      {/* Search + Actions */}
      <div className="mt-4 flex gap-2 px-4">
        <div className="flex flex-1 items-center gap-2 rounded-md bg-white px-3 py-2">
          <input
            className="w-full bg-transparent text-sm outline-none placeholder:text-black/40"
            placeholder="Search Psychologists..."
          />

          <button
            type="button"
            aria-label="Search"
            className="shrink-0 text-black/60 hover:text-black"
          >
            <CiSearch className="text-lg" />
          </button>
        </div>

        <button
          type="button"
          aria-label="Grid view"
          className="flex h-10 w-10 items-center justify-center rounded-md bg-white"
        >
          <CiGrid41 className="text-xl" />
        </button>

        <button
          type="button"
          aria-label="Filter"
          className="flex h-10 w-10 items-center justify-center rounded-md bg-white"
        >
          <CiFilter className="text-xl" />
        </button>
      </div>

      {/* Doctors List */}
      <div className="mt-5 space-y-4 pb-10">
        {doctors.map((doc) => (
          <DoctorCard
            key={doc.id}
            name={doc.name}
            phone={doc.phone}
            specialist={doc.specialist}
            imageUrl={doc.imageUrl}
            fee="1500"
            expanded={doc.expanded}
          />
        ))}
      </div>
    </AppShell>
  );
}
