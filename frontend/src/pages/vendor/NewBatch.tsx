import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, Loader2, Upload } from 'lucide-react';

interface LocationData {
  latitude: number;
  longitude: number;
}

const NewBatch: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [quantityKg, setQuantityKg] = useState('');
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState<LocationData | null>(null);
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const getLocation = () => {
    setLocating(true);
    setLocError('');
    if (!navigator.geolocation) {
      setLocError('Geolocation is not supported by your browser');
      setLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocating(false);
      },
      () => {
        setLocError('Unable to retrieve location. You can still submit without it.');
        setLocating(false);
      }
    );
  };

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      alert('Please upload an image');
      return;
    }
    
    navigate('/review-batch', {
      state: {
        imageFile: image,
        previewUrl,
        quantityKg,
        notes,
        location
      }
    });
  };

  return (
    <div className="p-6 pb-24">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Record New Batch</h1>

      <form onSubmit={handleReview} className="space-y-6">
        <div className="flex flex-col items-center">
          <input
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          
          {previewUrl ? (
            <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-sm mb-2">
              <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
              <button 
                type="button" 
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-4 right-4 bg-white/90 p-3 rounded-full shadow-lg text-slate-800"
              >
                <Camera size={20} />
              </button>
            </div>
          ) : (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-48 border-2 border-dashed border-emerald-500/50 bg-emerald-50 rounded-2xl flex flex-col items-center justify-center cursor-pointer text-emerald-600"
            >
              <Upload size={40} className="mb-2" />
              <span className="font-medium">Tap to open camera/gallery</span>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Quantity (Kg) *</label>
          <input
            type="number"
            min="0.1"
            step="0.1"
            className="input-field"
            value={quantityKg}
            onChange={(e) => setQuantityKg(e.target.value)}
            required
            placeholder="e.g., 50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Notes (Optional)</label>
          <textarea
            className="input-field min-h-[100px]"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Condition, origin, etc."
          ></textarea>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-slate-700 flex items-center">
              <MapPin size={18} className="mr-2 text-emerald-600" /> GPS Location
            </span>
            <button
              type="button"
              onClick={getLocation}
              disabled={locating}
              className="text-sm bg-white border border-slate-300 px-3 py-1.5 rounded-lg shadow-sm hover:bg-slate-50 flex items-center"
            >
              {locating ? <Loader2 size={16} className="animate-spin mr-1" /> : null}
              {location ? 'Update' : 'Capture'}
            </button>
          </div>
          
          {location ? (
            <div className="text-xs text-slate-600 bg-white p-2 rounded border border-slate-100">
              Lat: {location.latitude.toFixed(6)}, Lng: {location.longitude.toFixed(6)}
            </div>
          ) : (
            <p className="text-xs text-slate-500">No location captured yet.</p>
          )}
          {locError && <p className="text-xs text-red-500 mt-1">{locError}</p>}
        </div>

        <button type="submit" className="btn-primary mt-8">
          Review & Submit
        </button>
      </form>
    </div>
  );
};

export default NewBatch;
