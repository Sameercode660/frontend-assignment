"use client";

import { ReactNode } from "react";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-linear-to-b from-[#DFDAFB] to-[#F9CCC5]">
      <div className="mx-auto w-full max-w-md ">{children}</div>
    </div>
  );
}