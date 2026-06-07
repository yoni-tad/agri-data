import React, { useState } from 'react';
import { Download, FileSpreadsheet } from 'lucide-react';
import api from '../../services/api';

const ExportPage: React.FC = () => {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      const response = await api.get('/admin/export', {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `agridata-export-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (error) {
      console.error('Error exporting data', error);
      alert('Failed to export data');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="p-6 pb-24 max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[80vh] bg-slate-50">
      <div className="bg-emerald-100 p-6 rounded-full mb-6 shadow-inner border border-emerald-200">
        <FileSpreadsheet size={64} className="text-emerald-600 drop-shadow-sm" />
      </div>
      
      <h1 className="text-3xl font-extrabold text-slate-900 mb-3 text-center">Export Data</h1>
      <p className="text-slate-500 font-medium text-center mb-8 max-w-md leading-relaxed">
        Download a complete CSV report of all batch records, including vendor details, quantities, notes, and GPS coordinates.
      </p>

      <button 
        onClick={handleExport} 
        disabled={exporting}
        className="w-full max-w-xs bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-blue-500/30 transform transition-all duration-300 hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:transform-none flex justify-center items-center"
      >
        {exporting ? (
          <span className="flex items-center font-bold">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Generating CSV...
          </span>
        ) : (
          <span className="flex items-center font-bold text-lg">
            <Download className="mr-2" size={24} />
            Download CSV
          </span>
        )}
      </button>
    </div>
  );
};

export default ExportPage;
