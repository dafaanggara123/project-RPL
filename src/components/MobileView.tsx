import type { MobileRoom } from '../types/room';
import { StatusCard } from './StatusCard';

type MobileViewProps = {
  mobileRooms: MobileRoom[];
};

export default function MobileView({ mobileRooms }: MobileViewProps) {
  return (
    <div className="max-w-md mx-auto px-2">
      <div className="bg-white rounded-[2rem] shadow-2xl shadow-indigo-100 border border-white p-6">
        <div className="text-left mb-8">
          <span className="text-indigo-600 font-black text-xs tracking-[0.2em] uppercase">
            Live Update
          </span>

          <h2 className="text-3xl font-black text-slate-800 mt-1 tracking-tight">
            Cek Ruangan
          </h2>
        </div>

        <div className="space-y-2">
          {mobileRooms.length === 0 ? (
            <div className="text-center py-10 text-slate-400">
              Tidak ada jadwal hari ini 😴
            </div>
          ) : (
            mobileRooms.map((r) => (
              <StatusCard
                key={r.id ?? `${r.room}-${r.time}`}
                id={r.id}
                room={r.room}
                time={r.time}
                status={r.status}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}