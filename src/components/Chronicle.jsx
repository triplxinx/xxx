import React from 'react';
import { Terminal, Shield } from 'lucide-react';

export default function Chronicle({ logs }) {
  return (
    <div className="h-full flex flex-col">
      <div className="glass-panel rounded-lg flex-1 flex flex-col overflow-hidden">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-gold" />
            <span className="text-xs font-mono uppercase font-bold text-gold">The Chronicle - Ritual Logs</span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono">ENCRYPTION: AES-256-TRINITY</div>
        </div>
        
        <div className="flex-1 p-4 font-mono text-sm overflow-y-auto space-y-2 bg-black/60">
          {logs.length === 0 && (
            <div className="text-slate-700 italic">No events recorded in the current manifestation session...</div>
          )}
          {logs.map((log, i) => (
            <div key={i} className="flex gap-4 border-b border-slate-900 pb-1">
              <span className="text-slate-600 shrink-0">[{log.time}]</span>
              <span className={log.msg.toLowerCase().includes('error') ? 'text-daemon' : 'text-slate-300'}>
                {log.msg}
              </span>
            </div>
          ))}
          <div className="animate-pulse text-gold text-xs pt-4 tracking-widest">
            _LISTENING_FOR_AETHERIC_INTERFERENCE...
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-4">
        {['Memory Consumption', 'Aether Flux', 'Vibration Sync', 'Akasha Integrity'].map(stat => (
          <div key={stat} className="glass-panel p-3 rounded">
            <div className="text-[9px] text-slate-500 uppercase mb-1">{stat}</div>
            <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gold w-2/3 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
