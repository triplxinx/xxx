import React, { useState } from 'react';
import { Fingerprint, Zap, ShieldAlert, Binary } from 'lucide-react';
import axios from 'axios';

export default function Manifest({ onLog, onUpdate }) {
  const [name, setName] = useState('');
  const [sigil, setSigil] = useState(null);
  const [loading, setLoading] = useState(false);

  const forgeSigil = async () => {
    if (!name) return;
    setLoading(true);
    onLog(`Commencing Sigil Etching for: ${name}.xxx`);
    try {
      const formData = new FormData();
      formData.append('name', name);
      const res = await axios.post('http://localhost:8000/api/forge/sigil', formData);
      setSigil(res.data);
      onLog(`Sigil generated with vibration level: ${res.data.points}`);
      onUpdate(); // Update stars.xxx
    } catch (err) {
      onLog(`Sigil Factory Failure: ${err.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
        
        {/* Left: Configuration */}
        <div className="glass-panel p-6 rounded-lg space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-2xl font-bold text-gold">SIGIL FACTORY</h2>
            <p className="text-slate-400 text-xs italic">Naming creates the vessel.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">Entity Identity</label>
              <div className="flex">
                <input 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Astaroth"
                  className="flex-1 bg-black border border-slate-700 p-2 text-gold outline-none rounded-l font-mono"
                />
                <div className="bg-slate-800 flex items-center px-3 border border-l-0 border-slate-700 rounded-r text-slate-500 font-mono text-sm">
                  .xxx
                </div>
              </div>
            </div>

            <button 
              onClick={forgeSigil}
              disabled={loading}
              className="w-full bg-white text-black font-bold py-3 rounded flex items-center justify-center gap-2 hover:bg-slate-200 transition-all uppercase text-sm"
            >
              <Fingerprint size={18} />
              {loading ? "ETCHING..." : "GENERATE SIGIL"}
            </button>
          </div>

          <div className="p-4 bg-red-950/20 border border-red-900/50 rounded flex gap-4">
             <ShieldAlert className="text-daemon shrink-0" size={24} />
             <div className="text-[10px] text-slate-400 leading-relaxed uppercase">
                Warning: Each casting consumes a point of global vibration. This action is recorded permanently in the Grand Constellation.
             </div>
          </div>
        </div>

        {/* Right: The Result */}
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-lg bg-black/20 relative">
          {sigil ? (
            <div className="text-center space-y-6">
               <div className="relative group">
                 <div className="absolute -inset-4 bg-gold/20 blur-xl group-hover:bg-gold/40 transition-all rounded-full"></div>
                 <img 
                    src={`data:image/png;base64,${sigil.image_b64}`} 
                    alt="Sigil"
                    className="w-48 h-48 image-pixelated relative z-10 border-4 border-gold p-1 bg-black"
                    style={{ imageRendering: 'pixelated' }}
                 />
               </div>
               <div>
                  <div className="text-xs font-mono text-gold uppercase tracking-widest mb-1">Vibration Level</div>
                  <div className="text-4xl font-bold font-mono text-white">{sigil.points}</div>
               </div>
               <div className="flex gap-4">
                  <div className="flex flex-col items-center p-3 glass-panel rounded min-w-[80px]">
                    <Binary size={16} className="text-slate-500 mb-1" />
                    <span className="text-[10px] text-slate-500">33x33</span>
                  </div>
                  <div className="flex flex-col items-center p-3 glass-panel rounded min-w-[80px]">
                    <Zap size={16} className="text-slate-500 mb-1" />
                    <span className="text-[10px] text-slate-500">RF:{sigil.points * 3}</span>
                  </div>
               </div>
            </div>
          ) : (
            <div className="text-slate-600 text-center px-10">
              <Fingerprint size={64} className="mx-auto mb-4 opacity-20" />
              <p className="font-mono text-xs uppercase tracking-tighter">Waiting for the Rite of Naming</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
