import { useEffect, useState } from 'react';
import type { Room } from './types/room';
import { StatusCard } from './components/StatusCard';
import { DesktopTable } from './components/DesktopTable';

function App() {
  const [activeTab, setActiveTab] = useState<'mobile' | 'web'>('web');
  const [mobileRooms, setMobileRooms] = useState<Room[]>([]);

  // 1. Fungsi Mandiri untuk mengambil data terbaru
  const refreshStats = () => {
    fetch('http://localhost:3000/v1/rooms/mobile')
      .then(res => res.json())
      .then(result => {
        if (result.success) setMobileRooms(result.data);
      });
  };

  // 2. Jalankan saat aplikasi pertama kali dibuka
  useEffect(() => {
    refreshStats();
  }, []);

  return (
   <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 font-sans text-slate-900">
      {/* TOP NAVIGATION BAR */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-2 rounded-xl shadow-lg shadow-indigo-200">
               <span className="text-white font-bold text-xl uppercase">S</span>
              </div>
              <span className="text-xl font-black tracking-tight text-slate-800">SmartSpace <span className="text-indigo-600 font-extrabold">Pro</span></span>
            </div>
            
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button 
                onClick={() => setActiveTab('web')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'web' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                💻 Admin Panel
              </button>
      
              <button 
                onClick={() => setActiveTab('mobile')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'mobile' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                📱 Mobile View
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {activeTab === 'web' ? (
  <div className="space-y-6">
    {/* STATS MINI CARDS */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* card-card stats kamu di sini */}
    </div>

    <DesktopTable onDataChange={refreshStats} />
  </div>
) : (
  <div className="max-w-md mx-auto px-2">
    <div className="bg-white rounded-[2rem] shadow-2xl shadow-indigo-100 border border-white p-6">
      <div className="text-left mb-8">
        <span className="text-indigo-600 font-black text-xs tracking-[0.2em] uppercase">
          Live Update
        </span>
        <h2 className="text-3xl font-black text-slate-800 mt-1 tracking-tight">
          Cek Ruangan
        </h2>
        <p className="text-slate-500 text-sm mt-1 font-medium">
          Antarmuka karyawan untuk cek ketersediaan.
        </p>
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
      room={r.room}
      time={r.time}
      status={r.status}
    />
  ))
)}
      </div>
    </div>
  </div>
)}

      </main>

      <footer className="text-center py-10 text-slate-400 text-sm font-medium tracking-wide">
        &copy; 2026 SmartSpace Pro Architecture • Final Project Assignment
      </footer>
    </div>
  );
}

export default App;