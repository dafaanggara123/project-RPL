type NavbarProps = {
  user: {
    name?: string;
    role?: string;
  };
  activeTab: 'mobile' | 'web';
  setActiveTab: (tab: 'mobile' | 'web') => void;
};

export default function Navbar({
  user,
  activeTab,
  setActiveTab,
}: NavbarProps) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-2 rounded-xl shadow-lg shadow-indigo-200">
              <span className="text-white font-bold text-xl uppercase">
                S
              </span>
            </div>

            <span className="text-lg sm:text-xl font-black tracking-tight text-slate-800">
              SmartSpace{' '}
              <span className="text-indigo-600 font-extrabold">
                Pro
              </span>
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 w-full sm:w-auto bg-slate-100 p-1 rounded-xl border border-slate-200">
              {user.role === 'admin' && (
                <button
                  onClick={() => setActiveTab('web')}
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    activeTab === 'web'
                      ? 'bg-white shadow-sm text-indigo-600'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  💻 Admin Panel
                </button>
              )}

              <button
                onClick={() => setActiveTab('mobile')}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'mobile'
                    ? 'bg-white shadow-sm text-indigo-600'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                📱 Mobile View
              </button>
            </div>

            <div className="flex items-center justify-between sm:justify-start gap-3">
              <div className="text-right">
                <p className="font-bold text-slate-700">
                  {user.name || 'User'}
                </p>
                <p className="text-xs text-slate-400 uppercase">
                  {user.role || 'user'}
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-xl font-bold hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-400 font-bold mt-3">
          BFF mode:{' '}
          {activeTab === 'web' && user.role === 'admin'
            ? 'Web Detail'
            : 'Mobile Ringkas'}
        </p>
      </div>
    </nav>
  );
}