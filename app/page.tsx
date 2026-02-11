import AppShell from "@/components/layout/AppShell";
import UpcomingSessionCard from "@/components/dashboard/UpcomingSessionCard";
import PastSessionCard from "@/components/dashboard/PastSessionCard";
import Link from "next/link";
import { getDashboardData } from "@/lib/dashboard";
import { CiFilter } from "react-icons/ci";
import Image from "next/image";

export default async function HomePage() {
  const { upcomingSessions, pastSessions } = await getDashboardData();
  console.log(upcomingSessions, pastSessions)
  return (
    <AppShell>
      <div className="bg-linear-to-r from-[#a79cff] to-[#ffb0b0] w-full px-4 pt-6 pb-3 rounded-b-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-white/80">Good morning,</p>
            <h1 className="text-xl font-semibold text-white">Manjunath Naik</h1>
          </div>


           <Image
                      src={'/images/img5.png'}
                      alt="Profile"
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-white/70 shadow-sm"
                    />
        </div>

        <div className="mt-4 flex gap-2">
          <div className="flex-1 rounded-xl bg-white px-3 py-2 backdrop-blur">
            <input
              className="w-full bg-transparent text-sm outline-none placeholder:text-black/40"
              placeholder="Search Psychologists..."
            />
          </div>
          <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-white backdrop-blur">
            <CiFilter className="text-xl" />
          </button>
        </div>
      </div>

      <div className="px-4 py-2 ">
        <h2 className="mb-2 text-sm font-medium text-black/80">
          Upcoming Session
        </h2>

        {upcomingSessions.length > 0 ? (
          <UpcomingSessionCard sessions={upcomingSessions} />
        ) : (
          <p className="text-sm text-black/50">No upcoming sessions</p>
        )}
      </div>

      <div className="px-4 py-3 pb-20" >
        <h2 className="mb-2 text-sm font-medium text-black/70">Past Sessions</h2>

        <div className="space-y-3 over">
          {pastSessions.length > 0 ? (
            pastSessions.map((s: any) => (
              <PastSessionCard
                key={s.id}
                time={s.timeSlot}
                doctor={s.patient.name}
                date={new Date(s.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              />

            ))
          ) : (
            <p className="text-sm text-black/50">No past sessions</p>
          )}
        </div>
      </div>

      <div className="px-4 fixed bottom-5 w-full">
        <Link
          href="/doctors"
          className="block w-full rounded-md bg-linear-to-r from-[#a79cff] to-[#ffb0b0] px-4 py-3 text-center font-medium text-white shadow-lg"
        >
          Schedule Now
        </Link>
      </div>
    </AppShell>
  );
}
