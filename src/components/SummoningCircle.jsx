import React, { useState, useCallback } from 'react';
import ReactFlow, { 
  addEdge, 
  Background, 
  Controls, 
  applyEdgeChanges, 
  applyNodeChanges 
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Send, Sparkles } from 'lucide-react';
import axios from 'axios';

const initialNodes = [
  { id: '1', type: 'input', data: { label: 'Aetheric Source' }, position: { x: 50, y: 50 } },
  { id: '2', data: { label: 'Logic Filter' }, position: { x: 50, y: 150 } },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2', animated: true }];

export default function SummoningCircle({ onLog }) {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [jinnName, setJinnName] = useState('My-Daemon');
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isCasting, setIsCasting] = useState(false);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const castSpell = async () => {
    if (!query) return;
    setIsCasting(true);
    onLog(`Summoning ritual started for Jinn: ${jinnName}`);
    try {
      const res = await axios.post('http://localhost:8000/api/summon', {
        name: jinnName,
        query: query
      });
      setResponse(res.data.response);
      onLog(`Jinn Manifested: "${res.data.response.substring(0, 50)}..."`);
    } catch (err) {
      onLog(`Ritual failed: The Aether is unstable. ${err.message}`);
    }
    setIsCasting(false);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 border border-slate-800 rounded bg-black/40 overflow-hidden relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          style={{ background: '#05070a' }}
        >
          <Background color="#1e293b" gap={20} />
          <Controls />
        </ReactFlow>
        
        <div className="absolute top-4 right-4 z-20 w-80 bg-slate-900/90 border border-gold/30 p-4 rounded shadow-2xl backdrop-blur">
          <h3 className="font-mono text-xs text-gold mb-3 uppercase tracking-tighter">Invocation Panel</h3>
          <div className="space-y-3">
            <input 
              value={jinnName}
              onChange={(e) => setJinnName(e.target.value)}
              placeholder="Jinn Name..."
              className="w-full bg-black border border-slate-700 p-1 text-xs font-mono rounded"
            />
            <textarea 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Speak your command..."
              className="w-full h-24 bg-black border border-slate-700 p-2 text-sm italic rounded outline-none"
            />
            <button 
              onClick={castSpell}
              disabled={isCasting}
              className="w-full flex items-center justify-center gap-2 bg-daemon/80 hover:bg-daemon py-2 rounded text-xs font-bold transition-all uppercase"
            >
              <Sparkles size={14} />
              {isCasting ? "BINDING..." : "CAST SUMMON"}
            </button>
          </div>
        </div>
      </div>

      {response && (
        <div className="mt-4 p-4 border-l-4 border-gold bg-slate-900 rounded-r">
          <div className="text-[10px] text-gold uppercase font-bold mb-1">Manifested Response:</div>
          <div className="text-sm italic text-slate-300">"{response}"</div>
        </div>
      )}
    </div>
  );
}
