import React, { useState } from 'react';
import { Youtube, FileText, Globe, Upload } from 'lucide-react';
import axios from 'axios';

export default function Anima({ onLog, onUpdate }) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const ingestUrl = async () => {
    if (!url) return;
    setLoading(true);
    onLog(`Ingesting Anima from URL: ${url}`);
    try {
      const formData = new FormData();
      formData.append('url', url);
      await axios.post('http://localhost:8000/api/anima/url', formData);
      onLog(`Successfully merged essence from ${url} into Akasha`);
      setUrl('');
    } catch (err) {
      onLog(`Error: The Gate rejected the url essence. ${err.message}`);
    }
    setLoading(false);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    onLog(`Feeding PDF: ${file.name} to the Jinn`);
    try {
      const formData = new FormData();
      formData.append('file', file);
      await axios.post('http://localhost:8000/api/anima/pdf', formData);
      onLog(`Knowledge from ${file.name} etched into the Great Void.`);
    } catch (err) {
      onLog(`Error during PDF ritual: ${err.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 h-full overflow-y-auto pb-20">
      <div className="glass-panel p-8 rounded-lg border-gold/20">
        <h2 className="text-2xl font-bold mb-2 text-gold">THE ANIMA FEED</h2>
        <p className="text-slate-400 italic mb-6">Build the Jinn's consciousness. Feed it matter to manifest wisdom.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 p-4 border border-slate-800 rounded bg-black/40">
            <div className="flex items-center gap-2 text-gold">
              <Youtube size={18} />
              <span className="font-mono text-sm uppercase">YouTube Essence</span>
            </div>
            <input 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-sm text-slate-200 outline-none focus:border-gold"
            />
            <button 
              onClick={ingestUrl}
              disabled={loading}
              className="w-full bg-gold text-black font-bold py-2 rounded hover:bg-gold/80 transition-colors uppercase text-xs"
            >
              {loading ? 'Performing Ritual...' : 'Consume Energy'}
            </button>
          </div>

          <div className="space-y-4 p-4 border border-slate-800 rounded bg-black/40">
            <div className="flex items-center gap-2 text-gold">
              <FileText size={18} />
              <span className="font-mono text-sm uppercase">PDF Grimoire</span>
            </div>
            <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-slate-700 border-dashed rounded cursor-pointer hover:bg-slate-800 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload size={20} className="text-slate-500 mb-2" />
                <p className="text-xs text-slate-500 uppercase">Sacrifice Document</p>
              </div>
              <input type="file" className="hidden" accept=".pdf" onChange={handleFileUpload} />
            </label>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {[1,2,3].map(i => (
          <div key={i} className="glass-panel p-4 h-32 animate-pulse flex items-center justify-center border-slate-800">
            <Globe className="text-slate-800" size={40} />
          </div>
        ))}
      </div>
    </div>
  );
}
