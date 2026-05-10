import React from "react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any; // Jika ada, berarti mode EDIT
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = React.useState({
    room: '', bookedBy: '', time: '', date: ''
  });

  // Isi form jika sedang mode EDIT
  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ room: '', bookedBy: '', time: '08:00 - 10:00', date: new Date().toISOString().split('T')[0] });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 border border-slate-100 animate-in fade-in zoom-in duration-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          {initialData ? '📝 Edit Reservasi' : '✨ Tambah Reservasi'}
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Ruangan</label>
            <input 
              className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              value={formData.room}
              onChange={(e) => setFormData({...formData, room: e.target.value})}
              placeholder="Contoh: Lab 1"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Pemesan</label>
            <input 
              className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              value={formData.bookedBy}
              onChange={(e) => setFormData({...formData, bookedBy: e.target.value})}
              placeholder="Nama Lengkap"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Waktu</label>
            <input 
              className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              placeholder="Contoh: 09:00 - 11:00"
            />
            <div>
             <input
          type="date"
          className="w-full border rounded-lg px-3 py-2"/>
          </div>
          </div>
         
        </div>

        <div className="flex gap-3 mt-8">
          <button onClick={onClose} className="flex-1 px-4 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition">
            Batal
          </button>
          <button 
            onClick={() => onSave(formData)} 
            className="flex-1 px-4 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};