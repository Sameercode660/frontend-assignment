"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

export default function DoctorCard({
  name,
  phone,
  expanded = false,
  specialist,
  imageUrl
}: {
  name: string;
  phone: string;
  expanded?: boolean;
  specialist: string;
  imageUrl: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl bg-white p-4 shadow-md backdrop-blur mx-4"
    >
      <div className={`flex items-center justify-between ${expanded ? "border-b pb-2" : ""}`}>
        <div className={`flex items-center gap-3`}>


          <Image
            src={imageUrl}
            alt="Profile"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover ring-2 ring-white/70 shadow-sm"
          />

          <div>
            <p className="text-sm font-semibold text-black">{name}</p>
            <p className="text-xs text-[#6D6A5D]">{phone}</p>
            <p className="text-xs text-[#565555] font-semibold">{!expanded && specialist}</p>
          </div>
        </div>

        <div className="text-black/40">{expanded ? <MdKeyboardArrowUp size={25}  /> : <MdKeyboardArrowDown size={25} />}</div>
      </div>

      {expanded && (
        <>
          <div className="mt-4 flex justify-between text-xs text-black/60">
            <div>
              <div>
                <p className="text-sm text-black font-semibold">Expertise</p>
                <p className="font-medium">Gynaecology</p>
              </div>
              <div>
                <p className="text-sm text-black font-semibold">Gender</p>
                <p className="font-medium">Male</p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3 text-left">
              <div className="flex flex-col items-end">
                <p className="text-sm font-semibold text-black">Gender</p>
                <p className="font-medium">Male</p>
              </div>

              <div className="flex flex-col items-end">
                <p className="text-sm font-semibold text-black">Session Fee</p>
                <p className="font-medium">₹1,500/-</p>
              </div>
            </div>

          </div>

          <Link
            href="/schedule"
            className="mt-4 block w-full rounded-md bg-linear-to-r from-[#a79cff] to-[#ffb0b0] px-4 py-3 text-center text-sm  text-white shadow"
          >
            Book Now
          </Link>
        </>
      )}
    </motion.div>
  );
}
