import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Calendar, Search } from 'lucide-react';
import api from '../../services/api';
import { Batch } from '../../types';

const BatchHistory: React.FC = () => {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const { data } = await api.get<Batch[]>('/batches');
        setBatches(data);
      } catch (error) {
        console.error('Error fetching batches', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBatches();
  }, []);

  const filteredBatches = batches.filter(batch => 
    batch.batchId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 pb-24 min-h-screen bg-slate-50">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Batch History</h1>

      <div className="relative mb-6">
        <input 
          type="text" 
          placeholder="Search batch ID..." 
          className="input-field pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className="absolute left-3 top-3.5 text-slate-400" size={20} />
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
        </div>
      ) : filteredBatches.length === 0 ? (
        <div className="text-center py-10 text-slate-500">
          <Package className="mx-auto h-12 w-12 text-slate-300 mb-3" />
          <p>No batches found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBatches.map((batch) => (
            <Link to={`/batch/${batch._id}`} key={batch._id} className="card flex items-center hover:bg-slate-50/50 transition p-3">
              <div className="w-16 h-16 bg-slate-200 rounded-xl overflow-hidden shrink-0 mr-4 shadow-sm border border-slate-100">
                <img src={`http://localhost:5000${batch.imageUrl}`} alt="Thumbnail" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">{batch.batchId}</p>
                <div className="flex items-center text-xs text-slate-500 mt-1 font-medium">
                  <Calendar size={12} className="mr-1" />
                  {new Date(batch.createdAt).toLocaleDateString()}
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold text-emerald-600 text-sm">{batch.quantityKg} kg</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide ${batch.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'}`}>
                    {batch.status}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default BatchHistory;
