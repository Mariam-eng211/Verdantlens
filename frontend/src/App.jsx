import React, { useState } from 'react';
import CameraScanner from './components/CameraScanner';
import DiscoveryModal from './components/DiscoveryModal';
import EcoProbeWidget from './components/EcoProbeWidget';
import GreenVsAlive from './components/GreenVsAlive';
import AskNatureModal from './components/AskNatureModal';
import { DAILY_CHALLENGES } from './data/dailyChallenges';
import { Trophy, Compass, Leaf, Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [xp, setXp] = useState(120);
  const [activeScan, setActiveScan] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [askNatureContext, setAskNatureContext] = useState(null);
  const [completedChallenges, setCompletedChallenges] = useState([]);

  const addXP = (amount) => setXp((prev) => prev + amount);

  const handleCompleteChallenge = (challenge) => {
    if (completedChallenges.includes(challenge.id)) return;
    setCompletedChallenges((prev) => [...prev, challenge.id]);
    addXP(challenge.xp);
  };

  return (
    <div className="min-h-screen bg-eco-dark text-emerald-50 pb-20 max-w-md mx-auto relative border-x border-eco-border/40 shadow-2xl">
      
      {/* Sticky Header with Logo, Ask Nature, and XP Counter */}
      <header className="sticky top-0 z-40 bg-eco-dark/90 backdrop-blur-md border-b border-eco-border px-5 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Leaf className="w-6 h-6 text-eco-lime" />
          <h1 className="text-lg font-black tracking-wider text-white">VERDANT<span className="text-eco-lime">LENS</span></h1>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setAskNatureContext({ title: "General Inquiry" })}
            className="bg-eco-lime/10 hover:bg-eco-lime/20 border border-eco-lime/30 text-eco-lime px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition shadow-sm cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" /> Ask Nature
          </button>
          <div className="bg-eco-card border border-eco-border px-3 py-1 rounded-full flex items-center gap-1.5 shadow-inner">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-black text-amber-300">{xp} XP</span>
          </div>
        </div>
      </header>

      {/* Main Dashboard Feed */}
      <main className="p-4 space-y-5">
        
        {/* Today's Mission Banner */}
        <div className="bg-gradient-to-r from-eco-card to-eco-border/40 border border-eco-border p-4 rounded-3xl flex justify-between items-center shadow-lg">
          <div>
            <span className="text-[10px] font-bold text-eco-lime uppercase tracking-widest">Today's Mission</span>
            <h3 className="text-sm font-bold text-white">Nature's Micro-Habitats</h3>
            <p className="text-xs text-gray-400">Scan deadwood or unmanaged flora.</p>
          </div>
          <span className="text-2xl">🪵</span>
        </div>

        {/* Camera Scanner & AI Insights Trigger */}
        <CameraScanner 
          isScanning={isScanning} 
          setIsScanning={setIsScanning} 
          onScanComplete={(data) => {
            setActiveScan(data);
            addXP(50);
          }} 
        />

        {/* Live ESP32 Telemetry */}
        <EcoProbeWidget />

        {/* Green vs Ecologically Valuable Comparative Module */}
        <GreenVsAlive onEarnXP={addXP} />

        {/* Daily Field Quests */}
        <div className="bg-eco-card border border-eco-border rounded-3xl p-5 shadow-xl">
          <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-3 flex items-center gap-2">
            <Compass className="w-4 h-4 text-eco-accent" /> Daily Field Quests
          </h3>
          <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
            {DAILY_CHALLENGES.map((q) => {
              const isDone = completedChallenges.includes(q.id);
              return (
                <div 
                  key={q.id} 
                  onClick={() => !isDone && handleCompleteChallenge(q)}
                  className={`p-3 rounded-2xl flex justify-between items-center transition border ${
                    isDone 
                      ? 'bg-emerald-950/20 border-emerald-500/30 opacity-80 cursor-default' 
                      : 'bg-eco-dark/70 border-eco-border/60 hover:border-eco-lime/50 cursor-pointer shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{q.icon}</span>
                    <div>
                      <h4 className="text-xs font-bold text-gray-200">{q.title}</h4>
                      <p className="text-[10px] text-gray-400">{q.desc}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-extrabold px-2 py-1 rounded-lg border flex items-center gap-1 ${
                    isDone 
                      ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' 
                      : 'text-eco-lime bg-eco-lime/10 border-eco-lime/20'
                  }`}>
                    {isDone ? <><CheckCircle2 className="w-3 h-3" /> Done</> : `+${q.xp} XP`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </main>

      {/* Discovery Insights Modal */}
      {activeScan && (
        <DiscoveryModal 
          discovery={activeScan} 
          onClose={() => setActiveScan(null)} 
          onOpenAskNature={(feature) => { 
            setActiveScan(null); 
            setAskNatureContext(feature); 
          }} 
        />
      )}

      {/* Ask Nature AI Assistant Modal */}
      {askNatureContext && (
        <AskNatureModal 
          contextFeature={askNatureContext} 
          onClose={() => setAskNatureContext(null)} 
        />
      )}

    </div>
  );
}