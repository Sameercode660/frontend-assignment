"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import SelectTimeSlotModal from "./SelectTimeSlotModal";
import AddPatientModal from "./AddPatientModal";
import { BsStopwatch } from "react-icons/bs";


type SessionMode = "IN_PERSON" | "ONLINE";

type Patient = {
  id: string;
  name: string;
  mobileNumber: string;
  whatsappNumber: string;
  email?: string | null;
  address?: string | null;
};

export default function ScheduleSessionForm() {
  const [sessionMode, setSessionMode] = useState<SessionMode>("IN_PERSON");
  const [sessionType, setSessionType] = useState("Counselling");
  const [date, setDate] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });
  const [timeSlot, setTimeSlot] = useState<string>("");

  const [openTimeModal, setOpenTimeModal] = useState(false);
  const [openPatientModal, setOpenPatientModal] = useState(false);

  // Selected patient from DB
  const [patient, setPatient] = useState<Patient | null>(null);

  // only when online
  const [onlineLink, setOnlineLink] = useState("");

  // optional notes
  const [details, setDetails] = useState("");

  // UI states
  const [loading, setLoading] = useState(false);

  const confirmDisabled = useMemo(() => {
    if (!patient?.id) return true;
    if (!date.trim()) return true;
    if (!timeSlot.trim()) return true;
    if (!sessionType.trim()) return true;
    if (sessionMode === "ONLINE" && !onlineLink.trim()) return true;
    return false;
  }, [patient, date, timeSlot, sessionType, sessionMode, onlineLink]);

  async function handleConfirm() {
    if (!patient) return;

    try {
      setLoading(true);

      const res = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: patient.id,
          date,
          timeSlot,
          sessionType,
          mode: sessionMode,
          onlineLink: sessionMode === "ONLINE" ? onlineLink : null,
          details,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err?.message || "Failed to schedule session");
        return;
      }

      alert("Session scheduled successfully ✅");

      // reset
      setTimeSlot("");
      setOnlineLink("");
      setDetails("");
    } catch (e) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  // auto clear onlineLink if switching to in-person
  useEffect(() => {
    if (sessionMode === "IN_PERSON") setOnlineLink("");
  }, [sessionMode]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 px-4"
      >
        {/* Patient */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm text-black/50">Patient</p>

            <button
              type="button"
              onClick={() => setOpenPatientModal(true)}
              className="text-xs font-medium text-[#7a6cff]"
            >
              + Add / Select
            </button>
          </div>

          <div className="flex items-center gap-3 rounded-md bg-[#FFFFFF80] p-3 backdrop-blur">
            <div className="h-10 w-10 rounded-full bg-black/10" />

            {patient ? (
              <div className="flex-1">
                <p className="text-sm font-medium text-black">{patient.name}</p>
                <p className="text-xs text-black/40">
                  {patient.mobileNumber}
                </p>
              </div>
            ) : (
              <div className="flex-1">
                <p className="text-sm font-medium text-black/60">
                  No patient selected
                </p>
                <p className="text-xs text-black/30">
                  Please add or select patient
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Assign Practitioner */}
        <div>
          <p className="mb-2 text-sm text-black/50">Assign Practitioner</p>
          <div className="flex items-center gap-3 rounded-md bg-[#FFFFFF80] p-3 backdrop-blur">
            <div className="h-10 w-10 rounded-full bg-black/10" />
            <div className="flex-1">
              <p className="text-sm font-medium text-black">Saria Dilon</p>
              <p className="text-xs text-black/40">+91 9876543210</p>
            </div>
          </div>
        </div>

        {/* Session Type */}
        <p className="mb-2 text-sm text-black/50">Session Type</p>

        <div className="flex h-11 items-center rounded-md bg-[#FFFFFF] px-3 backdrop-blur">
          <select
            value={sessionType}
            onChange={(e) => setSessionType(e.target.value)}
            className="w-full bg-transparent text-sm outline-none text-black/70"
          >
            <option value="Counselling">Counselling (1 hour)</option>
            <option value="Therapy">Therapy</option>
            <option value="Consultation">Consultation</option>
          </select>
        </div>

        {/* Session Mode */}
        <div>
          <p className="mb-2 text-sm text-black/50">Session Mode</p>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm font-medium text-black/80">
              <input
                type="radio"
                name="mode"
                checked={sessionMode === "IN_PERSON"}
                onChange={() => setSessionMode("IN_PERSON")}
                className="h-4 w-4 accent-black"
              />
              In-Person
            </label>

            <label className="flex items-center gap-2 text-sm font-medium text-black/80">
              <input
                type="radio"
                name="mode"
                checked={sessionMode === "ONLINE"}
                onChange={() => setSessionMode("ONLINE")}
                className="h-4 w-4 accent-black"
              />
              Online
            </label>
          </div>
        </div>

        {/* Date + Time Slot */}
        <div className="grid grid-cols-2 gap-3">
          {/* Session Date */}
          <div>
            <p className="mb-2 text-sm text-black/50">Session Date</p>

            <div className="flex h-11 items-center rounded-md bg-[#FFFFFF] px-3 backdrop-blur">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          {/* Session Time Slot */}
          <div>
            <p className="mb-2 text-sm text-black/50">Session Time Slot</p>

            <button
              type="button"
              onClick={() => setOpenTimeModal(true)}
              className="flex h-11 w-full items-center justify-between rounded-md bg-white/60 px-3 text-left text-sm text-black/60 backdrop-blur"
            >
              <span className="truncate">{timeSlot ? timeSlot : "HH : MM"}</span>

              <BsStopwatch className="h-4 w-4 shrink-0 text-black/50" />
            </button>
          </div>
        </div>

        {/* Online link only when online */}
        {sessionMode === "ONLINE" && (
          <div>
            <p className="mb-2 text-sm text-black/50">Online Session Link</p>
            <div className="rounded-md bg-white/60 px-3 py-3 backdrop-blur">
              <input
                value={onlineLink}
                onChange={(e) => setOnlineLink(e.target.value)}
                className="w-full bg-transparent text-sm outline-none"
                placeholder="Add Online Session Link or WhatsApp Number"
              />
            </div>
          </div>
        )}

        {/* Optional Details */}
        <div>
          <p className="mb-2 text-sm text-black/50">
            Session Details (Optional)
          </p>
          <div className="rounded-md bg-white/60 px-3 py-3 backdrop-blur">
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="min-h-22.5 w-full resize-none bg-transparent text-sm outline-none"
              placeholder="Enter session details here"
            />
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="mt-2 flex gap-3">
          <button
            type="button"
            className="w-1/2 rounded-md border border-[#ff6a7a]/60 bg-white/40 px-4 py-3 text-sm font-medium text-[#ff4d61]"
            onClick={() => history.back()}
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={confirmDisabled || loading}
            onClick={handleConfirm}
            className={`w-1/2 rounded-md px-4 py-3 text-sm font-medium text-white shadow-lg transition ${confirmDisabled || loading
              ? "bg-black/20"
              : "bg-linear-to-r from-[#BBA3E4] to-[#E7A1A0]"
              }`}
          >
            {loading ? "Saving..." : "Confirm"}
          </button>
        </div>
      </motion.div>

      {/* Time Slot Modal */}
      <SelectTimeSlotModal
        open={openTimeModal}
        onClose={() => setOpenTimeModal(false)}
        selected={timeSlot}
        onSelect={(slot) => setTimeSlot(slot)}
      />

      {/* Add/Select Patient Modal */}
      <AddPatientModal
        open={openPatientModal}
        onClose={() => setOpenPatientModal(false)}
        onSelected={(p) => setPatient(p)}
      />
    </>
  );
}
