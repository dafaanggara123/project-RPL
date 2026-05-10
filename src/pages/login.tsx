import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/auth.service';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@mail.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await login(email, password);

      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));

      navigate('/dashboard');
    } catch {
      setError('Email atau password salah');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8">
        <h1 className="text-2xl font-black text-slate-800 text-center">
          Login
        </h1>

        <p className="text-center text-slate-500 mt-2">
          Login ke Smart Room Booking
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-xl mt-5 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-xl px-4 py-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-xl px-4 py-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700">
            Login
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-5">
          Belum punya akun?{' '}
          <Link to="/register" className="text-indigo-600 font-bold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}