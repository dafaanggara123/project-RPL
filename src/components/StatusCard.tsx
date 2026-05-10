import React from 'react';
import type { MobileRoom } from '../types/room';

export const StatusCard: React.FC<MobileRoom> = ({ room, time, status }) => {
  const isBooked = status === 'Booked';

  return (
    <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-slate-100 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black ${
          isBooked
            ? 'bg-amber-100 text-amber-700'
            : 'bg-emerald-100 text-emerald-700'
        }`}>
          {room.charAt(0)}
        </div>

        <div>
          <h3 className="font-extrabold text-slate-800 text-base">
            {room}
          </h3>
          <p className="text-slate-500 text-sm">
            ⏰ {time}
          </p>
        </div>
      </div>

      <span className={`px-3 py-1 rounded-full text-xs font-black ${
        isBooked
          ? 'bg-amber-100 text-amber-700'
          : 'bg-emerald-100 text-emerald-700'
      }`}>
        {isBooked ? 'Terisi' : 'Kosong'}
      </span>
    </div>
  );
};