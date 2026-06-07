import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Weight, FileText } from 'lucide-react';
import api from '../../services/api';
import { Batch } from '../../types';

const BatchDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [batch, setBatch] = useState<Batch | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBatch = async () => {
      try {
        const { data } = await api.get<Batch>(`/batches/${id}`);
        setBatch(data);
      } catch (error) {
        console.error('Error fetching batch', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBatch();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!batch) {
    return <div className="p-6 text-center text-slate-500 bg-slate-50 min-h-screen">Batch not found</div>;
  }

  return (
    <div className="pb-24 bg-slate-50 min-h-screen">
      <div className="relative w-full h-72 bg-slate-200 rounded-b-3xl overflow-hidden shadow-sm">
        <img 
          src={`http://localhost:5000${batch.imageUrl}`} 
          alt="Batch" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-4 left-4 bg-white/20 p-2 rounded-full backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-white drop-shadow-md">{batch.batchId}</h1>
            <p className="text-sm text-slate-200 flex items-center font-medium drop-shadow-md">
              <Calendar size={14} className="mr-1" />
              {new Date(batch.createdAt).toLocaleString()}
            </p>
          </div>
          <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-600 shadow-sm uppercase tracking-wider">
            {batch.status}
          </div>
        </div>
      </div>

      <div className="p-6 -mt-4 relative z-10">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="card flex flex-col justify-center items-center p-4 text-center">
            <div className="bg-emerald-100 p-3 rounded-2xl mb-2 text-emerald-600">
              <Weight size={24} />
            </div>
            <p className="text-xs text-slate-500 font-medium">Quantity</p>
            <p className="font-bold text-slate-900 text-lg">{batch.quantityKg} kg</p>
          </div>

          <div className="card flex flex-col justify-center items-center p-4 text-center">
            <div className="bg-blue-100 p-3 rounded-2xl mb-2 text-blue-600">
              <MapPin size={24} />
            </div>
            <p className="text-xs text-slate-500 font-medium">GPS Location</p>
            {batch.latitude && batch.longitude ? (
              <p className="font-bold text-slate-900 text-xs mt-1">
                {batch.latitude.toFixed(4)}<br/>{batch.longitude.toFixed(4)}
              </p>
            ) : (
              <p className="font-bold text-slate-400 text-sm mt-1">N/A</p>
            )}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center mb-3 border-b border-slate-100 pb-2">
            <FileText size={18} className="text-slate-400 mr-2" />
            <h3 className="font-bold text-slate-900">Notes</h3>
          </div>
          <p className="text-slate-700 text-sm leading-relaxed font-medium">
            {batch.notes || <span className="text-slate-400 italic">No notes provided for this batch.</span>}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BatchDetails;
