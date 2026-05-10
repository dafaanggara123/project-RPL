import { useEffect, useState } from 'react';
import type { MobileRoom } from './types/room';
import api from './services/api';
import Navbar from './components/Navbar';
import MobileView from './components/MobileView';
import AdminView from './components/AdminView';

function App() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [activeTab, setActiveTab] = useState<'mobile' | 'web'>(
    user.role == 'admin' ? 'web' : 'mobile'
  );

  const [mobileRooms, setMobileRooms] = useState<MobileRoom[]>([]);

  
  // 1. Fungsi Mandiri untuk mengambil data terbaru
    const refreshStats = () => {
    api.get('/v1/rooms/mobile').then((res) => {
      const result = res.data;

      if (result.success) {
        setMobileRooms(result.data);
      }
    });
  };

  // 2. Jalankan saat aplikasi pertama kali dibuka
  useEffect(() => {
    refreshStats();
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };
  
    return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 font-sans text-slate-900">
      <Navbar
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {activeTab === 'web' && user.role === 'admin' ? (
          <AdminView refreshStats={refreshStats} />
        ) : (
          <MobileView mobileRooms={mobileRooms} />
        )}
      </main>

      <footer className="text-center py-10 text-slate-400 text-sm font-medium tracking-wide">
        &copy; 2026 SmartSpace Pro Architecture • Final Project Assignment
      </footer>
    </div>
  );
}

export default App;