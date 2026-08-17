import React from 'react';

export default function DiscoveryModal({ discovery, onClose }) {
  if (!discovery) return null;

  const feature = discovery.primaryFeature || discovery;
  const title = feature.label || discovery.title || "Ecosystem Micro-Habitat";
  const description = feature.observation || discovery.description || "Natural ecological feature observed.";
  const score = discovery.biodiversityScore || `${Math.round((feature.confidence || 0.9) * 100)}/100`;
  const roles = feature.potentialRoles || (discovery.ecoValue ? [discovery.ecoValue] : ["Supports local biodiversity and soil health."]);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl text-white">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs uppercase tracking-wider px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full font-semibold">
            AI Vision Analysis
          </span>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-lg font-bold">×</button>
        </div>
        
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-300 text-sm mb-4">{description}</p>
        
        <div className="bg-slate-800/50 p-4 rounded-2xl mb-4 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Biodiversity Confidence:</span>
            <span className="font-bold text-emerald-400">{score}</span>
          </div>
          <div>
            <span className="text-xs text-gray-400 block mb-1">Ecological Roles:</span>
            <ul className="list-disc list-inside text-xs text-gray-300 space-y-1">
              {Array.isArray(roles) && roles.map((role, idx) => (
                <li key={idx}>{role}</li>
              ))}
            </ul>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl transition-all cursor-pointer"
        >
          Collect Discovery (+20 XP)
        </button>
      </div>
    </div>
  );
}