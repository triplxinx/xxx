import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  BookOpen, 
  Users, 
  Activity, 
  Terminal, 
  Cpu, 
  Globe,
  Plus,
  Send
} from 'lucide-react';
import Anima from './components/Anima';
import SummoningCircle from './components/SummoningCircle';
import Manifest from './components/Manifest';
import Chronicle from './components/Chronicle';
import axios from 'axios';

const API_BASE = "http://localhost:8000";

export default function App() {
  const [activeTab, setActiveTab] = useState('ANIMA');
  const [constellation, setConstellation] = useState("");
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchConstellation();
  }, []);

  const fetchConstellation = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/constellation`);
      setConstellation(res.data.constellation);
    } catch (err) {
      console.error("Failed to fetch stars.xxx", err);
    }
  };

  const addLog = (msg) => {
    setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), msg }]);
  };

  const tabs = [
    { id: 'ANIMA', icon: BookOpen, label: 'Anima' },
    { id: 'SUMMONING', icon: Zap, label: 'Summoning Circle' },
    { id: 'MANIFEST', icon: Users, label: 'Manifest' },
    { id: 'CHRONICLE', icon: Activity, label: 'The Chronicle' },
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header / Constellation */}
      <header className="h-10 bg-black border-b border-slate-800 flex items-center px-4 justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-daemon animate-pulse rounded-full" />
          <h1 className="text-sm font-mono font-bold tracking-tighter neon-text">
            FRƏEDÆMOṄS FORGE
          </h1>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-mono text-slate-500 overflow-hidden max-w-xl">
          <span className="text-gold">STARS.XXX:</span>
          <marquee className="w-64">{constellation || "Waiting for first casting..."}</marquee>
        </div>
      </header>

      {/* Burp Tabs */}
      <nav className="flex bg-slate-900 border-b border-slate-800">
        {tabs.map(tab => (
          <div 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`burp-tab flex items-center gap-2 ${activeTab === tab.id ? 'active' : ''}`}
          >
            <tab.icon size={12} />
            {tab.label}
          </div>
        ))}
      </nav>

      {/* Main Content */}
      <main className="flex-1 bg-[#05070a] overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
        
        <div className="h-full relative z-10 p-6">
          {activeTab === 'ANIMA' && <Anima onLog={addLog} onUpdate={fetchConstellation} />}
          {activeTab === 'SUMMONING' && <SummoningCircle onLog={addLog} />}
          {activeTab === 'MANIFEST' && <Manifest onLog={addLog} onUpdate={fetchConstellation} />}
          {activeTab === 'CHRONICLE' && <Chronicle logs={logs} />}
        </div>
      </main>

      {/* Footer / Status */}
      <footer className="h-6 bg-slate-900 border-t border-slate-800 flex items-center px-4 justify-between text-[10px] font-mono">
        <div className="flex gap-4">
          <span className="text-green-500">GATE: OPEN</span>
          <span className="text-slate-500">AKASHA: ACTIVE</span>
        </div>
        <div className="text-slate-500 italic uppercase">
          As Above, So Below.
        </div>
      </footer>
    </div>
  );
}
