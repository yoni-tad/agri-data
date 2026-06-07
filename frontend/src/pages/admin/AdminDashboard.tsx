import React, { useState, useEffect } from 'react';
import { Users, Package, ShoppingBag } from 'lucide-react';
import api from '../../services/api';
import { AdminStats } from '../../types';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get<AdminStats>('/admin/dashboard');
        setStats(data);
      } catch (error) {
        console.error('Error fetching admin stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20 min-h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 pb-24 max-w-4xl mx-auto min-h-screen bg-slate-50">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg shadow-blue-500/20">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100 text-xs font-bold uppercase tracking-wider mb-1">Total Users</p>
              <h3 className="text-3xl font-extrabold">{stats?.totalUsers}</h3>
            </div>
            <Users className="text-blue-200" size={28} />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-lg shadow-emerald-500/20">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-emerald-100 text-xs font-bold uppercase tracking-wider mb-1">Vendors</p>
              <h3 className="text-3xl font-extrabold">{stats?.totalVendors}</h3>
            </div>
            <ShoppingBag className="text-emerald-200" size={28} />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-violet-500 to-violet-600 text-white border-0 shadow-lg shadow-violet-500/20">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-violet-100 text-xs font-bold uppercase tracking-wider mb-1">Total Batches</p>
              <h3 className="text-3xl font-extrabold">{stats?.totalBatches}</h3>
            </div>
            <Package className="text-violet-200" size={28} />
          </div>
        </div>
      </div>

      <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Submissions</h2>
      <div className="card p-0 overflow-hidden border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/50 border-b border-slate-200">
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Batch ID</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Vendor</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Qty (kg)</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stats?.recentSubmissions?.map((batch) => (
                <tr key={batch._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 text-sm font-semibold text-slate-900">{batch.batchId}</td>
                  <td className="p-4 text-sm font-medium text-slate-600">{batch.createdBy.name}</td>
                  <td className="p-4 text-sm font-bold text-emerald-600">{batch.quantityKg}</td>
                  <td className="p-4 text-sm text-slate-500 font-medium">{new Date(batch.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {stats?.recentSubmissions?.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500 font-medium">No submissions yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
