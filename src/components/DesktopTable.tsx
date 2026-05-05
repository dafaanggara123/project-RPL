import React, { useEffect, useState } from 'react';
import type { Booking } from '../types/booking';

// --- INTERFACE ---

interface DesktopTableProps {
  onDataChange?: () => void; // Fungsi untuk update angka stats di App.tsx
}

export const DesktopTable: React.FC<DesktopTableProps> = ({ onDataChange }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // State untuk Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [formData, setFormData] = useState({
    room: '',
    bookedBy: '',
    time: '',
    date: ''
  });

  // --- FETCH DATA ---
  const loadData = () => {
    setLoading(true);
    fetch('http://localhost:3000/v1/rooms/web')
      .then(res => res.json())
      .then(result => {
        if (result.success) setBookings(result.data);
        setLoading(false);
      });
  };

  useEffect(() => { loadData(); }, []);

  // --- LOGIKA MODAL ---
  const openModal = (booking: Booking | null = null) => {
    if (booking) {
      setSelectedBooking(booking);
      setFormData({
        room: booking.room,
        bookedBy: booking.bookedBy,
        time: booking.time,
        date: booking.date
      });
    } else {
      setSelectedBooking(null);
      setFormData({
        room: '',
        bookedBy: '',
        time: '09:00 - 11:00',
        date: new Date().toISOString().split('T')[0]
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    const method = selectedBooking ? 'PUT' : 'POST';
    const url = selectedBooking 
      ? `http://localhost:3000/v1/rooms/${selectedBooking.id}` 
      : 'http://localhost:3000/v1/rooms';

    const response = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        status: 'Booked' // Default status
      })
    });

    if (response.ok) {
      setIsModalOpen(false);
      loadData();
      if (onDataChange) onDataChange();
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("⚠️ Hapus jadwal ini secara permanen?")) {
      const response = await fetch(`http://localhost:3000/v1/rooms/${id}`, { method: 'DELETE' });
      if (response.ok) {
        loadData();
        if (onDataChange) onDataChange();
      }
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="bg-transparent min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
           <h1 className="text-4xl font-black text-slate-800 tracking-tight">
           Management <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Dashboard</span>
          </h1>
            <p className="text-slate-500 mt-1">Sistem Reservasi Real-time MySQL</p>
          </div>
          <button 
            onClick={() => openModal()}
           className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white px-6 py-3 rounded-2xl font-black shadow-xl shadow-indigo-200 transition-all active:scale-95 hover:-translate-y-0.5"
          >
            <span>+</span> Tambah Reservasi
          </button>
        </div>

        {/* TABEL */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
               <tr className="bg-gradient-to-r from-slate-900 to-slate-800 text-slate-200 text-sm uppercase tracking-wider">
                  <th className="p-5 font-semibold">Ruangan</th>
                  <th className="p-5 font-semibold">Pemesan</th>
                  <th className="p-5 font-semibold">Waktu</th>
                  <th className="p-5 font-semibold text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bookings.map((b) => (
                  <tr 
                     key={b.id} 
                     className="hover:bg-indigo-50/30 transition-all duration-200 hover:scale-[1.01]">
                    <td className="p-5 font-bold text-slate-700">{b.room}</td>
                    <td className="p-5 text-slate-600">{b.bookedBy}</td>
                    <td className="p-5 text-slate-500 text-sm">
                      <span className="font-semibold block text-slate-700">{b.date}</span>
                      {b.time}
                    </td>
                    <td className="p-5">
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => openModal(b)}
                          className="bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 hover:-translate-y-0.5 active:scale-95">
                          📝 Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(b.id)}
                         className="bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                        >
                          🗑️ Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- MODAL FORM --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-in zoom-in duration-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              {selectedBooking ? '📝 Edit Reservasi' : '✨ Tambah Reservasi'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nama Ruangan</label>
                <input 
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  value={formData.room}
                  onChange={(e) => setFormData({...formData, room: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Pemesan</label>
                <input 
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  value={formData.bookedBy}
                  onChange={(e) => setFormData({...formData, bookedBy: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Waktu</label>
                <input 
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition">
                Batal
              </button>
              <button onClick={handleSave} className="flex-1 px-4 py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg transition">
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};