import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { PlusCircle, History, Package } from 'lucide-react';
import api from '../../services/api';

const HomeDashboard: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/batches');
        setStats({ total: data.length });
      } catch (error) {
        console.error('Failed to fetch batches', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="bg-emerald-600 text-white pt-12 pb-24 px-6 rounded-b-[2.5rem] shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full mix-blend-overlay blur-2xl"></div>
          <div className="absolute top-20 -left-10 w-32 h-32 bg-white rounded-full mix-blend-overlay blur-2xl"></div>
        </div>

        <div className="relative z-10 flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white font-bold text-2xl mr-4 shadow-glass-sm">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-emerald-100 text-sm font-medium">Welcome back,</p>
              <h1 className="text-2xl font-bold tracking-tight">{user?.name}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-16 relative z-20 space-y-6 animate-slide-up">
        <div className="glass-panel overflow-hidden relative p-6">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Package size={100} />
          </div>
          <div className="relative z-10">
            <p className="text-slate-500 font-semibold mb-1">Total Submissions</p>
            <div className="flex items-end">
              {loading ? (
                <div className="h-12 w-16 bg-slate-200 rounded animate-pulse"></div>
              ) : (
                <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                  {stats.total}
                </h2>
              )}
              <span className="text-slate-400 ml-2 mb-2 font-medium text-sm">batches</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-4 px-1">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/new-batch" className="card border border-emerald-100 bg-gradient-to-b from-white to-emerald-50 group">
              <div className="bg-emerald-100 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm text-emerald-600">
                <PlusCircle size={24} />
              </div>
              <h4 className="font-bold text-slate-800 text-lg">New Batch</h4>
              <p className="text-xs text-slate-500 mt-1 font-medium">Record a harvest</p>
            </Link>
            
            <Link to="/history" className="card border border-slate-100 group hover:border-blue-100 hover:bg-blue-50/50">
              <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm text-blue-500">
                <History size={24} />
              </div>
              <h4 className="font-bold text-slate-800 text-lg">History</h4>
              <p className="text-xs text-slate-500 mt-1 font-medium">View past records</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
