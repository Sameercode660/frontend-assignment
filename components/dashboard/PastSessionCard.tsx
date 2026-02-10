 export default function PastSessionCard({
  time,
  doctor,
  date,
}: {
  time: string;
  doctor: string;
  date: string;
}) {

  console.log(time)
  return (
    <div className="flex items-center gap-3 rounded-md bg-[#FFFFFF80] p-3 backdrop-blur">
      <div className="w-16 text-xs font-medium text-black/60 border-r-2 border-gray-300 pt-2 pb-2">{time}</div>
      <div className="flex-1 ">
        <p className="text-sm font-medium text-black/70">{doctor}</p>
        <p className="text-[10px] text-black/40">Previous Session: {date}</p>
      </div>
    </div>
  );
}
