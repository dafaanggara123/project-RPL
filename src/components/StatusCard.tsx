import React from 'react';
import type { Room } from '../types/room';

export const StatusCard: React.FC<Room> = ({ room, time, status }) => {
  // Logic Status
  const isBooked = status === 'Booked';
  const label = isBooked ? 'Terisi' : 'Kosong';
  {label}

  return (
    <div className="group bg-white rounded-2xl p-5 mb-4 shadow-sm border border-slate-100 flex items-center justify-between 
        transition-all duration-200 hover:-translate-y-1 hover:shadow-xl active:scale-95">
      <div className="flex items-center gap-4">
        {/* Avatar Ruangan - Memberikan identitas visual yang kuat */}
        <div className={`group rounded-3xl p-5 mb-4 border flex items-center justify-between transition-all hover:-translate-y-1 hover:shadow-xl active:scale-95 ${
  isBooked
    ? 'bg-gradient-to-br from-white to-amber-50 border-amber-100 shadow-amber-100'
    : 'bg-gradient-to-br from-white to-emerald-50 border-emerald-100 shadow-emerald-100'
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
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner transition-colors ${
  isBooked 
    ? 'bg-amber-100 text-amber-600' 
    : 'bg-emerald-100 text-emerald-600'
}`}></div>
          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isBooked ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></span>
          {status}
       
        
        {!isBooked && (
          <button className="text-[11px] font-black text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-full shadow-sm transition">
           Pesan
          </button>
        )}
      </div>
    
  );
};