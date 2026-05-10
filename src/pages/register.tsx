import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/auth.service';

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await register(name, email, password);
      navigate('/login');
    } catch {
      alert('Register gagal. Email mungkin sudah digunakan.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8">
        <h1 className="text-2xl font-black text-slate-800 text-center">
          Register
        </h1>

        <p className="text-center text-slate-500 mt-2">
          Buat akun baru
        </p>

        <form onSubmit={handleRegister} className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Nama"
            className="w-full border rounded-xl px-4 py-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-xl px-4 py-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password minimal 6 karakter"
            className="w-full border rounded-xl px-4 py-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700">
            Register
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-5">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-indigo-600 font-bold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}