import { useEffect, useState } from 'react';
import { StatusCard } from './components/StatusCard';
import { DesktopTable } from './components/DesktopTable';

function App() {
  const [activeTab, setActiveTab] = useState<'mobile' | 'web'>('web');
  const [mobileRooms, setMobileRooms] = useState<any[]>([]);

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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* TOP NAVIGATION BAR */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-200">
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
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <p className="text-slate-500 text-sm font-medium">Total Ruangan</p>
                <h3 className="text-2xl font-black mt-1 text-slate-800 tracking-tight">12 Ruangan</h3>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <p className="text-slate-500 text-sm font-medium">Reservasi Hari Ini</p>
                <h3 className="text-2xl font-black mt-1 text-indigo-600 tracking-tight">
                  {mobileRooms.length > 0 ? `${mobileRooms.length} Jadwal` : '0 Jadwal'}
                </h3>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <p className="text-slate-500 text-sm font-medium">Sistem Status</p>
                <h3 className="text-2xl font-black mt-1 text-emerald-500 flex items-center gap-2 tracking-tight">
                  <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
                  Connected
                </h3>
              </div>
            </div>

            {/* 3. Kirim refreshStats ke DesktopTable melalui props onDataChange */}
            <DesktopTable onDataChange={refreshStats} />
          </div>
        ) : (
          <div className="max-w-md mx-auto px-2">
             <div className="text-left mb-8">
                <span className="text-indigo-600 font-black text-xs tracking-[0.2em] uppercase">Live Update</span>
                <h2 className="text-3xl font-black text-slate-800 mt-1 tracking-tight">Cek Ruangan</h2>
                <p className="text-slate-500 text-sm mt-1 font-medium">Antarmuka karyawan untuk cek ketersediaan.</p>
             </div>
             <div className="space-y-2">
                {mobileRooms.map((r, i) => (
                  <StatusCard key={i} room={r.room} time={r.time} status={r.status} />
                ))}
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