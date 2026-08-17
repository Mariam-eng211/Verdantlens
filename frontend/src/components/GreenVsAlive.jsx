import React, { useState } from 'react';
import { ShieldCheck, Check, X } from 'lucide-react';

export default function GreenVsAlive({ onEarnXP }){
  const [revealed, setRevealed] = useState(false);

  const metrics = [
    { name: 'Vegetation Structure', lawn: 'Low (Uniform)', natural: 'High (Multi-tier)' },
    { name: 'Visible Diversity', lawn: '1-2 Species', natural: '10+ Species' },
    { name: 'Leaf Litter & Cover', lawn: 'Removed', natural: 'Abundant' },
    { name: 'Deadwood / Shelter', lawn: 'Zero', natural: 'Present' },
    { name: 'Pollinator Resources', lawn: 'None', natural: 'High (Flowers)' },
  ];

  return (
    <div className="bg-eco-card border border-eco-border rounded-3xl p-5 shadow-xl">
      <h3 className="text-lg font-black text-white mb-1">Green ≠ Ecologically Valuable</h3>
      <p className="text-xs text-gray-400 mb-4">Compare a manicured lawn vs an unmaintained natural patch.</p>

      {!revealed ? (
        <div className="bg-eco-dark border border-eco-border p-4 rounded-2xl text-center">
          <p className="text-sm font-semibold text-emerald-200 mb-3">Which environment provides greater microclimate protection and biodiversity support?</p>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setRevealed(true)} className="bg-eco-card hover:border-eco-accent border border-eco-border p-3 rounded-xl text-xs font-bold text-gray-300">
              🌱 Manicured Lawn
            </button>
            <button onClick={() => { setRevealed(true); onEarnXP(100); }} className="bg-eco-card hover:border-eco-lime border border-eco-lime/50 p-3 rounded-xl text-xs font-bold text-eco-lime">
              🌿 Natural Patch
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-eco-border text-gray-400">
                  <th className="pb-2 font-bold">Metric</th>
                  <th className="pb-2 font-bold text-gray-400">Lawn</th>
                  <th className="pb-2 font-bold text-eco-lime">Natural Patch</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-eco-border/50">
                {metrics.map((m, idx) => (
                  <tr key={idx}>
                    <td className="py-2.5 font-medium text-gray-200">{m.name}</td>
                    <td className="py-2.5 text-gray-400 flex items-center gap-1">
                      <X className="w-3.5 h-3.5 text-red-400 shrink-0" /> {m.lawn}
                    </td>
                    <td className="py-2.5 text-eco-lime font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-eco-lime shrink-0" /> {m.natural}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-eco-lime/10 border border-eco-lime/30 p-3 rounded-2xl flex items-center justify-between text-xs">
            <span className="text-emerald-200 font-medium">Challenge Completed!</span>
            <span className="text-eco-lime font-black">+100 Nature XP</span>
          </div>
        </div>
      )}
    </div>
  );
}