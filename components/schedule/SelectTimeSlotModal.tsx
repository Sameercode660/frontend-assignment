"use client";

import { motion, AnimatePresence } from "framer-motion";

const TIME_SLOTS = {
  Morning: ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM"],
  Afternoon: ["12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM"],
  Evening: ["04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM"],
  Night: ["08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"],
};

export default function SelectTimeSlotModal({
  open,
  onClose,
  selected,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  selected: string;
  onSelect: (slot: string) => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40"
            onClick={onClose}
          />

          {/* bottom sheet */}
          <motion.div
            initial={{ y: 500 }}
            animate={{ y: 0 }}
            exit={{ y: 500 }}
            transition={{ type: "spring", damping: 22, stiffness: 250 }}
            className="fixed bottom-0 left-0 right-0 z-50 mx-auto w-full max-w-md rounded-t-3xl bg-white px-4 pb-6 pt-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-black">
                Select Session Time
              </h2>
              <button
                onClick={onClose}
                className="rounded-full bg-black/5 px-3 py-1 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-5">
              {Object.entries(TIME_SLOTS).map(([group, slots]) => (
                <div key={group}>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-black/70">
                      {group}
                    </p>
                    <span className="text-black/30">⌃</span>
                  </div>

                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {slots.map((slot) => {
                      const active = selected === slot;

                      return (
                        <button
                          key={slot}
                          onClick={() => onSelect(slot)}
                          className={`rounded-xl border px-2 py-2 text-[11px] font-medium transition ${
                            active
                              ? "border-[#ff6a7a] bg-[#ff6a7a]/10 text-[#ff3b52]"
                              : "border-black/10 bg-white text-black/50"
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={onClose}
                className="w-1/2 rounded-2xl border border-[#ff6a7a]/60 bg-white px-4 py-3 text-sm font-medium text-[#ff4d61]"
              >
                Cancel
              </button>

              <button
                onClick={onClose}
                className="w-1/2 rounded-2xl bg-linear-to-r from-[#a79cff] to-[#ffb0b0] px-4 py-3 text-sm font-medium text-white shadow-lg"
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
