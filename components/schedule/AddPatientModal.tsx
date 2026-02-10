"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Patient = {
  id: string;
  name: string;
  mobileNumber: string;
  whatsappNumber: string;
  email?: string | null;
  address?: string | null;
};

export default function AddPatientModal({
  open,
  onClose,
  onSelected,
}: {
  open: boolean;
  onClose: () => void;
  onSelected: (patient: Patient) => void;
}) {
  const [tab, setTab] = useState<"NEW" | "EXISTING">("NEW");

  // New patient 
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [sameAsMobile, setSameAsMobile] = useState(true);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  // Existing patient search 
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    if (sameAsMobile) {
      setWhatsappNumber(mobileNumber);
    }
  }, [sameAsMobile, mobileNumber]);

  const newPatientDisabled = useMemo(() => {
    if (!name.trim()) return true;
    if (!mobileNumber.trim()) return true;
    if (!whatsappNumber.trim()) return true;
    return false;
  }, [name, mobileNumber, whatsappNumber]);

  async function searchPatients(q: string) {
    try {
      setLoading(true);
      const res = await fetch(`/api/patients?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data);
    } catch (e) {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  async function createPatient() {
    try {
      setLoading(true);

      const res = await fetch("/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          mobileNumber,
          whatsappNumber,
          email: email || null,
          address: address || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data?.message || "Failed to create patient");
        return;
      }

      onSelected(data);
      onClose();

      // reset
      setName("");
      setMobileNumber("");
      setWhatsappNumber("");
      setSameAsMobile(true);
      setEmail("");
      setAddress("");
    } catch (e) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    if (tab !== "EXISTING") return;

   
    if (!query.trim()) {
      searchPatients("");
      return;
    }

    const t = setTimeout(() => searchPatients(query), 350);
    return () => clearTimeout(t);
  }, [query, tab]);

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

          {/* modal */}
          <motion.div
            initial={{ y: 600 }}
            animate={{ y: 0 }}
            exit={{ y: 600 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
            className="fixed bottom-0 left-0 right-0 z-50 mx-auto w-full max-w-md rounded-t-3xl bg-white px-4 pb-6 pt-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-black">
                Patient Information
              </h2>
              <button
                onClick={onClose}
                className="rounded-full bg-black/5 px-3 py-1 text-sm"
              >
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => setTab("NEW")}
                className={`flex-1 rounded-2xl px-3 py-2 text-sm font-medium ${tab === "NEW"
                    ? "bg-[#a79cff]/20 text-[#6a5cff]"
                    : "bg-black/5 text-black/50"
                  }`}
              >
                New Patient
              </button>

              <button
                onClick={() => setTab("EXISTING")}
                className={`flex-1 rounded-2xl px-3 py-2 text-sm font-medium ${tab === "EXISTING"
                    ? "bg-[#ffb0b0]/20 text-[#ff4d61]"
                    : "bg-black/5 text-black/50"
                  }`}
              >
                Existing
              </button>
            </div>

            {/* NEW PATIENT */}
            {tab === "NEW" && (
              <div className="mt-4 space-y-3">
                <Field
                  label="Name"
                  value={name}
                  onChange={setName}
                  placeholder="Enter patient name"
                />

                <Field
                  label="Mobile Number"
                  value={mobileNumber}
                  onChange={setMobileNumber}
                  placeholder="+91 9876543210"
                />

                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <p className="text-xs text-black/50">WhatsApp Number</p>

                    <label className="flex items-center gap-2 text-xs text-black/50">
                      <input
                        type="checkbox"
                        checked={sameAsMobile}
                        onChange={(e) => setSameAsMobile(e.target.checked)}
                      />
                      Same as Mobile
                    </label>
                  </div>

                  <div className="rounded-2xl bg-black/5 px-3 py-3">
                    <input
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      disabled={sameAsMobile}
                      className="w-full bg-transparent text-sm outline-none disabled:text-black/30"
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>

                <Field
                  label="Email ID"
                  value={email}
                  onChange={setEmail}
                  placeholder="example@gmail.com"
                />

                <div>
                  <p className="mb-1 text-xs text-black/50">Address</p>
                  <div className="rounded-2xl bg-black/5 px-3 py-3">
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="min-h-17.5 w-full resize-none bg-transparent text-sm outline-none"
                      placeholder="Enter address"
                    />
                  </div>
                </div>

                <button
                  disabled={newPatientDisabled || loading}
                  onClick={createPatient}
                  className={`mt-2 w-full rounded-2xl px-4 py-3 text-sm font-medium text-white shadow-lg transition ${newPatientDisabled || loading
                      ? "bg-black/20"
                      : "bg-linear-to-r from-[#a79cff] to-[#ffb0b0]"
                    }`}
                >
                  {loading ? "Saving..." : "Save Patient"}
                </button>
              </div>
            )}

            {/* EXISTING PATIENT */}
            {tab === "EXISTING" && (
              <div className="mt-4 space-y-3">
                <div>
                  <p className="mb-1 text-xs text-black/50">
                    Search by name / mobile / email
                  </p>
                  <div className="rounded-2xl bg-black/5 px-3 py-3">
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="w-full bg-transparent text-sm outline-none"
                      placeholder="Search..."
                    />
                  </div>
                </div>

                {loading && (
                  <p className="text-xs text-black/40">Searching...</p>
                )}

                <div className="max-h-65 space-y-2 overflow-auto pr-1">
                  {results.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onSelected(p);
                        onClose();
                      }}
                      className="flex w-full items-center gap-3 rounded-2xl bg-black/5 p-3 text-left"
                    >
                      <div className="h-9 w-9 rounded-full bg-black/10" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-black">
                          {p.name}
                        </p>
                        <p className="text-xs text-black/40">
                          {p.mobileNumber}
                        </p>
                      </div>
                    </button>
                  ))}

                  {!loading && query.trim() && results.length === 0 && (
                    <p className="text-xs text-black/40">
                      No patient found.
                    </p>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <p className="mb-1 text-xs text-black/50">{label}</p>
      <div className="rounded-2xl bg-black/5 px-3 py-3">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-sm outline-none"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
