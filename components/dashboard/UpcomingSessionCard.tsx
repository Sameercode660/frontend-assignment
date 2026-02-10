"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import Image from "next/image";


type Session = {
  id: string;
  date: string;
  timeSlot: string;
  sessionType: "IN_PERSON" | "ONLINE";
  patient: {
    name: string;
  };
};

type UpcomingSessionCardProps = {
  sessions: Session[];
};

export default function UpcomingSessionCard({ sessions }: UpcomingSessionCardProps) {
  const sortedSessions = useMemo(() => {
    return [...sessions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [sessions]);

  const [index, setIndex] = useState(0);

  // Auto slide every 3 seconds
  useEffect(() => {
    if (sortedSessions.length <= 1) return;

    const t = setInterval(() => {
      setIndex((prev) => (prev + 1) % sortedSessions.length);
    }, 5000);

    return () => clearInterval(t);
  }, [sortedSessions.length]);

  // Reset index if sessions change
  useEffect(() => {
    setIndex(0);
  }, [sortedSessions.length]);

  const session = sortedSessions[index];

  if (!session) return null;

  const time = session.timeSlot;
  const sessionMode = session.sessionType === "ONLINE" ? "Online" : "In-Person";

  const previousSessionDate = new Date(session.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={session.id}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -80 }}
          transition={{ duration: 0.35 }}
          drag={sortedSessions.length > 1 ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            if (sortedSessions.length <= 1) return;

            // Swipe 
            if (info.offset.x < -60) {
              // next
              setIndex((prev) => (prev + 1) % sortedSessions.length);
            } else if (info.offset.x > 60) {
              // prev
              setIndex((prev) =>
                prev === 0 ? sortedSessions.length - 1 : prev - 1
              );
            }
          }}
          className="rounded-2xl bg-white p-4 shadow-md backdrop-blur"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-black">{time}</p>
              <p className="text-xs text-black/50">Bandra</p>
            </div>

            <div className="flex items-center gap-2 pl-5 border-l-2 mr-10">

               <Image 

        
                          src={'/images/img6.png'}
                          alt="Profile"
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-full object-cover ring-2 ring-white/70 shadow-sm"
                        />

              <div>
                <p >
                  <span className="flex flex-col">
                    <span className="flex items-center justify-between">
                      <span className="text-sm font-medium text-black">{session.patient.name}</span>
                      <IoMdArrowDropdown className="ml-1.5"/>
                    </span>
                    <FaPhoneSquareAlt className="rounded-[50%]" />
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3 text-xs text-black/50">
            <p>Session Duration: 01:00 HR</p>
            <p>
              Session Mode:{" "}
              <span className="font-medium text-black/70">{sessionMode}</span>
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between gap-2 max-[335px]:flex-wrap">
            <button className="whitespace-nowrap rounded-sm bg-linear-to-r from-[#a79cff] to-[#ffb0b0] px-4 py-2 text-xs font-medium text-white">
              Mark as Completed
            </button>

            <p className="whitespace-nowrap text-[10px] text-black/40 max-[350px]:w-full max-[350px]:text-left max-[395px]:flex max-[395px]:flex-col">
              <span>Previous Session:</span>
              <span>{previousSessionDate}</span>
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
