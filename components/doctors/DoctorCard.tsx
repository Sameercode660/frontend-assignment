"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

type DoctorCardProps = {
  name: string;
  phone: string;
  specialist: string;
  imageUrl: string;
  expanded?: boolean;
  expertise?: string;
  gender?: string;
  fee?: string;
  sessionMode: string;
};

export default function DoctorCard({
  name,
  phone,
  specialist,
  imageUrl,
  expanded = false,
  expertise = specialist,
  gender = "Male",
  fee = "₹1,500/-",
  sessionMode = "In-person & online"
}: DoctorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="mx-4 rounded-xl bg-white p-4 shadow-md"
    >
      {/* Top Row */}
      <div
        className={`flex items-center justify-between ${
          expanded ? "border-b pb-2" : ""
        }`}
      >
        <div className="flex items-center gap-3">
          <Image
            src={imageUrl}
            alt={`${name} profile`}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover ring-2 ring-white/70 shadow-sm"
          />

          <div>
            <p className="text-sm font-semibold text-black">{name}</p>
            <p className="text-xs text-[#6D6A5D]">{phone}</p>

            {!expanded && (
              <p className="text-xs font-semibold text-[#565555]">
                {specialist}
              </p>
            )}
          </div>
        </div>

        <div className="text-black/40">
          {expanded ? (
            <MdKeyboardArrowUp size={25} />
          ) : (
            <MdKeyboardArrowDown size={25} />
          )}
        </div>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <>
          <div className="mt-4 flex justify-between text-xs text-black/60">
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-black">Expertise</p>
                <p className="font-medium">{expertise}</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-black">Session mode</p>
                <p className="font-medium">{sessionMode}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex flex-col items-end">
              <p className="text-sm font-semibold text-black">Gender</p>
              <p className="font-medium">{gender}</p>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-sm font-semibold text-black">Session Fee</p>
              <p className="font-medium">{fee}</p>
            </div>
            </div>
          </div>

          <Link
            href="/schedule"
            className="mt-4 block w-full rounded-md bg-linear-to-r from-[#a79cff] to-[#ffb0b0] px-4 py-3 text-center text-sm text-white shadow"
          >
            Book Now
          </Link>
        </>
      )}
    </motion.div>
  );
}
