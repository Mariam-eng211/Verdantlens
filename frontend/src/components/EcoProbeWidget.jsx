import React, { useEffect, useState } from 'react';
import { Thermometer, Droplets, Activity, Wifi } from 'lucide-react';

export default function EcoProbeWidget() {
  const [telemetry, setTelemetry] = useState({ 
    deviceId: 'Waiting for ESP32...', 
    temperature: '--', 
    humidity: '--', 
    soilMoisture: '--' 
  });
  const [online, setOnline] = useState(false);

  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/sensor/live');
        const data = await res.json();
        setTelemetry(data);
        setOnline(true);
      } catch (err) {
        setOnline(false);
      }
    };
    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-eco-card border border-eco-border rounded-3xl p-5 shadow-xl">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-eco-accent" />
          <h3 className="font-bold text-white text-sm uppercase tracking-wide">ESP32 Eco Probe</h3>
        </div>
        <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border ${online ? 'bg-emerald-950 text-emerald-400 border-emerald-800' : 'bg-red-950 text-red-400 border-red-800'}`}>
          <Wifi className="w-3 h-3" /> {online ? 'LIVE TELEMETRY' : 'DISCONNECTED'}
        </span>
      </div>

      <p className="text-[10px] text-gray-400 mb-4">
        Device ID: <span className="font-mono text-gray-200">{telemetry.deviceId || 'ESP32_PROBE_01'}</span>
      </p>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-eco-dark/60 border border-eco-border p-3 rounded-2xl flex flex-col items-center">
          <Thermometer className="w-5 h-5 text-amber-500 mb-1" />
          <span className="text-[10px] text-gray-400">Air Temp</span>
          <span className="text-lg font-black text-white">{telemetry.temperature}°C</span>
        </div>
        <div className="bg-eco-dark/60 border border-eco-border p-3 rounded-2xl flex flex-col items-center">
          <Droplets className="w-5 h-5 text-blue-400 mb-1" />
          <span className="text-[10px] text-gray-400">Air Hum.</span>
          <span className="text-lg font-black text-white">{telemetry.humidity}%</span>
        </div>
        <div className="bg-eco-dark/60 border border-eco-border p-3 rounded-2xl flex flex-col items-center">
          <Droplets className="w-5 h-5 text-eco-lime mb-1" />
          <span className="text-[10px] text-gray-400">Soil Moist.</span>
          <span className="text-lg font-black text-white">{telemetry.soilMoisture}%</span>
        </div>
      </div>
    </div>
  );
}