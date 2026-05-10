import React, { useEffect, useState } from 'react';
import type { Booking } from '../types/booking';

// --- INTERFACE ---

interface DesktopTableProps {
  onDataChange?: () => void; // Fungsi untuk update angka stats di App.tsx
}

export const DesktopTable: React.FC<DesktopTableProps> = ({ onDataChange }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedImage, setUploadedImage] = useState('');

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
//upload gambar
  const handleUpload = async() => {
    if (!selectedFile) 
      return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch (
         'http://localhost:3000/v1/rooms/upload',
         {
          method: 'POST',
          body: formData,
         }
      );

      const result = await response.json();
      setUploadedImage(result.data.imagaeUrl);

      alert('Upload Berhasil 🚀');
    } catch(error) {
      console.error(error);
      alert('Upload gagal');
    }
  }

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
          
          </div>
          <button 
            onClick={() => openModal()}
           className="w-full md:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white px-6 py-3 rounded-2xl font-black shadow-xl shadow-indigo-200 transition-all active:scale-95 hover:-translate-y-0.5">
            <span>+</span> Tambah Reservasi
          </button>
        </div>

        <div className='bg-white p-4 rounded-2xl shadow mb-6'>
          <h2 className='font-bold text-lg mb-4'>
            Upload Gambar Ruangan
          </h2>

           <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setSelectedFile(e.target.files[0]);
              }
            }}
            className="mb-4 cursor-pointer"
          />
          <button onClick={handleUpload} className='bg-indigo-600 text-white px-4 py-2 rounded-xl fonr-bold'>
            Upload
          </button>

          {uploadedImage && (
            <img src={uploadedImage} alt='preview' className='mt-4 w-48 rounded-xl shadow'/>
          )}

       
        </div>

        {/* TABEL */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
        <div className="overflow-x-auto">
         <table className="min-w-[700px] w-full text-left border-collapse">
              <thead>
               <tr className="bg-gradient-to-r from-slate-900 to-slate-800 text-slate-200 text-sm uppercase tracking-wider">
                  <th className="p-5 font-semibold">Ruangan</th>
                  <th className="p-5 font-semibold">Pemesan</th>
                  <th className='p-5 font-semibold'>Tanggal dan Waktu</th>
                  <th className="p-5 font-semibold">Status</th>
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
                    <td className='p-5'>
                      <span className={`px-3 py-1 rounded-full text-xs fonr-black ${
                      b.status === 'booked'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {b.status}
                  </span>
                    </td>
                    <td className="p-5">
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => openModal(b)}
                          className=" transition-all duration-300 hover:-translate-y-0.5 active:scale-95">
                          📝 Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(b.id)}
                         className=" transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
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
         <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-5 sm:p-8 max-h-[90vh] overflow-y-auto animate-in zoom-in duration-200">
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