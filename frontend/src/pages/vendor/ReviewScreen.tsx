import React, { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import api from '../../services/api';
import { AxiosError } from 'axios';

interface LocationState {
  imageFile: File;
  previewUrl: string;
  quantityKg: string;
  notes: string;
  location: { latitude: number; longitude: number } | null;
}

const ReviewScreen: React.FC = () => {
  const locationState = useLocation().state as LocationState | undefined;
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!locationState) {
    return <Navigate to="/new-batch" />;
  }

  const { imageFile, previewUrl, quantityKg, notes, location } = locationState;

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('quantityKg', quantityKg);
      formData.append('notes', notes || '');
      
      if (location) {
        formData.append('latitude', location.latitude.toString());
        formData.append('longitude', location.longitude.toString());
      }

      await api.post('/batches', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        alert(error.response.data?.message || 'Failed to submit batch');
      } else {
        alert('Failed to submit batch');
      }
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-emerald-50 p-6 text-center">
        <CheckCircle size={80} className="text-emerald-500 mb-6 animate-bounce" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Success!</h2>
        <p className="text-slate-600">Batch submitted successfully.</p>
      </div>
    );
  }

  return (
    <div className="p-6 pb-24">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-3 text-slate-500 hover:text-slate-800">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-slate-900">Review Batch</h1>
      </div>

      <div className="card space-y-4">
        <div className="w-full h-48 rounded-xl overflow-hidden mb-4">
          <img src={previewUrl} alt="Batch Preview" className="w-full h-full object-cover" />
        </div>

        <div className="grid grid-cols-2 gap-4 py-2 border-b border-slate-100">
          <div>
            <p className="text-sm text-slate-500">Quantity</p>
            <p className="font-semibold text-slate-900">{quantityKg} kg</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Location</p>
            {location ? (
              <p className="font-semibold text-slate-900 text-xs mt-1">
                {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
              </p>
            ) : (
              <p className="font-semibold text-slate-400">None</p>
            )}
          </div>
        </div>

        <div className="py-2">
          <p className="text-sm text-slate-500">Notes</p>
          <p className="font-medium text-slate-800 mt-1">{notes || 'No notes provided.'}</p>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <button 
          onClick={handleSubmit} 
          disabled={submitting}
          className="btn-primary flex justify-center items-center"
        >
          {submitting ? <Loader2 className="animate-spin mr-2" /> : null}
          Confirm Submission
        </button>
        <button 
          onClick={() => navigate(-1)} 
          disabled={submitting}
          className="w-full py-3 px-4 rounded-xl font-bold text-slate-600 bg-slate-200 hover:bg-slate-300 transition"
        >
          Edit Details
        </button>
      </div>
    </div>
  );
};

export default ReviewScreen;
