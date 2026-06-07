import React, { useContext } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Home, PlusCircle, History, LogOut, BarChart2, Download, Info } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

interface MainLayoutProps {
  isAdmin?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ isAdmin = false }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 relative">
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      {/* Modern Floating Bottom Navigation */}
      <div className="fixed bottom-0 w-full p-4 z-50 pointer-events-none">
        <nav className="glass-panel mx-auto max-w-md pointer-events-auto shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)]">
          <div className="flex justify-around items-center h-16 px-2">
            {!isAdmin ? (
              <>
                <NavLink to="/" className={({ isActive }) => `flex flex-col items-center justify-center w-16 h-12 rounded-xl transition-all duration-300 ${isActive ? 'text-emerald-600 bg-emerald-50 scale-110' : 'text-slate-400 hover:text-slate-600'}`}>
                  <Home size={22} />
                  <span className="text-[10px] font-bold mt-1">Home</span>
                </NavLink>
                
                <NavLink to="/new-batch" className={({ isActive }) => `flex flex-col items-center justify-center w-16 h-12 rounded-xl transition-all duration-300 ${isActive ? 'text-emerald-600 bg-emerald-50 scale-110' : 'text-slate-400 hover:text-slate-600'}`}>
                  <PlusCircle size={22} />
                  <span className="text-[10px] font-bold mt-1">New</span>
                </NavLink>
                
                <NavLink to="/history" className={({ isActive }) => `flex flex-col items-center justify-center w-16 h-12 rounded-xl transition-all duration-300 ${isActive ? 'text-emerald-600 bg-emerald-50 scale-110' : 'text-slate-400 hover:text-slate-600'}`}>
                  <History size={22} />
                  <span className="text-[10px] font-bold mt-1">History</span>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/admin" className={({ isActive }) => `flex flex-col items-center justify-center w-16 h-12 rounded-xl transition-all duration-300 ${isActive ? 'text-blue-600 bg-blue-50 scale-110' : 'text-slate-400 hover:text-slate-600'}`}>
                  <BarChart2 size={22} />
                  <span className="text-[10px] font-bold mt-1">Dashboard</span>
                </NavLink>
                <NavLink to="/admin/export" className={({ isActive }) => `flex flex-col items-center justify-center w-16 h-12 rounded-xl transition-all duration-300 ${isActive ? 'text-blue-600 bg-blue-50 scale-110' : 'text-slate-400 hover:text-slate-600'}`}>
                  <Download size={22} />
                  <span className="text-[10px] font-bold mt-1">Export</span>
                </NavLink>
              </>
            )}
            
            <NavLink to="/about" className={({ isActive }) => `flex flex-col items-center justify-center w-16 h-12 rounded-xl transition-all duration-300 ${isActive ? 'text-emerald-600 bg-emerald-50 scale-110' : 'text-slate-400 hover:text-slate-600'}`}>
              <Info size={22} />
              <span className="text-[10px] font-bold mt-1">About</span>
            </NavLink>
            <button onClick={handleLogout} className="flex flex-col items-center justify-center w-16 h-12 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-300">
              <LogOut size={22} />
              <span className="text-[10px] font-bold mt-1">Logout</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MainLayout;
