import React from 'react';

interface Props {
  room: string;
  time: string;
  status: string;
}

export const StatusCard: React.FC<Props> = ({ room, time, status }) => {
  // Logic Status
  const isBooked = status === 'Booked';

  return (
    <div className="group bg-white rounded-2xl p-5 mb-4 shadow-sm border border-slate-100 flex items-center justify-between transition-all hover:shadow-md active:scale-95">
      <div className="flex items-center gap-4">
        {/* Avatar Ruangan - Memberikan identitas visual yang kuat */}
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl transition-colors ${
          isBooked 
          ? 'bg-amber-100 text-amber-600' 
          : 'bg-emerald-100 text-emerald-600'
        }`}>
          {room.charAt(0)}
        </div>

        <div className="flex flex-col">
          <h3 className="font-extrabold text-slate-800 text-lg tracking-tight leading-tight">
            {room}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-[10px]">
              ⏰
            </span>
            <span className="text-slate-500 text-sm font-medium">
              Mulai {time}
            </span>
          </div>
        </div>
      </div>

      {/* Badge Status yang Elegan */}
      <div className="flex flex-col items-end gap-2">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ring-inset ${
          isBooked 
          ? 'bg-amber-50 text-amber-700 ring-amber-600/20' 
          : 'bg-emerald-50 text-emerald-700 ring-emerald-600/20'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isBooked ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></span>
          {status}
        </span>
        
        {!isBooked && (
          <button className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 underline underline-offset-4 decoration-2">
            Pesan Sekarang
          </button>
        )}
      </div>
    </div>
  );
};