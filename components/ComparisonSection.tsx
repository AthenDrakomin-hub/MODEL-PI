
import React from 'react';
import { WifiOff, Wifi, BatteryLow, Sun, Smartphone, Car, ChevronRight } from 'lucide-react';

export const ComparisonSection = ({ t, theme }: any) => {
  // 容错处理：确保 t.comparison 及其子项存在
  const c = t?.comparison || {
    title: 'A Generational Leap',
    subtitle: 'Evolution of Mobile Interaction',
    oldWay: 'Legacy Flagship',
    piWay: 'MODEL Π',
    signal: { label: 'Connectivity', old: 'Tower-dependent', pi: 'Starlink Native' },
    power: { label: 'Power', old: 'Grid charging', pi: 'Solar self-charging' },
    key: { label: 'Ecosystem', old: 'App control', pi: 'Native Hub' }
  };

  const rows = [
    { 
      label: c.signal?.label, 
      old: c.signal?.old, 
      pi: c.signal?.pi, 
      oldIcon: <WifiOff className="text-gray-500" />, 
      piIcon: <Wifi className="text-cyan-400" /> 
    },
    { 
      label: c.power?.label, 
      old: c.power?.old, 
      pi: c.power?.pi, 
      oldIcon: <BatteryLow className="text-gray-500" />, 
      piIcon: <Sun className="text-yellow-500" /> 
    },
    { 
      label: c.key?.label, 
      old: c.key?.old, 
      pi: c.key?.pi, 
      oldIcon: <Smartphone className="text-gray-500" />, 
      piIcon: <Car className="text-red-600" /> 
    },
  ];

  return (
    <section className={`py-16 md:py-32 lg:py-48 px-4 md:px-6 ${theme === 'midnight' ? 'bg-[#050505]' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-24 space-y-4 md:space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-7xl font-black uppercase tracking-tighter">{c.title}</h2>
          <p className="text-gray-500 text-sm md:text-lg uppercase tracking-widest">{c.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border border-white/5">
           {/* Old Way Column */}
           <div className={`p-8 sm:p-10 md:p-20 space-y-12 md:space-y-16 ${theme === 'midnight' ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}>
              <div className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-gray-500 mb-6 md:mb-8">{c.oldWay}</div>
              {rows.map((row, i) => (
                <div key={i} className="flex gap-4 md:gap-8 items-start opacity-50">
                  <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center">
                    {row.oldIcon}
                  </div>
                  <div>
                    <div className="text-[10px] md:text-xs font-black uppercase text-gray-600 mb-1 md:mb-2">{row.label}</div>
                    <div className="text-xs md:text-sm font-medium">{row.old}</div>
                  </div>
                </div>
              ))}
           </div>

           {/* Π Way Column */}
           <div className={`p-8 sm:p-10 md:p-20 space-y-12 md:space-y-16 relative overflow-hidden ${theme === 'midnight' ? 'bg-neutral-900' : 'bg-white'}`}>
              <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-red-600/10 blur-[80px] md:blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-red-600 mb-6 md:mb-8">{c.piWay}</div>
              {rows.map((row, i) => (
                <div key={i} className="flex gap-4 md:gap-8 items-start group">
                  <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 bg-red-600/10 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(232,33,39,0.2)]">
                    {row.piIcon}
                  </div>
                  <div>
                    <div className="text-[10px] md:text-xs font-black uppercase text-red-600 mb-1 md:mb-2">{row.label}</div>
                    <div className="text-base md:text-lg font-black">{row.pi}</div>
                  </div>
                </div>
              ))}
              
              <div className="pt-8 md:pt-12">
                 <div className="inline-flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-red-500 animate-pulse">
                    <ChevronRight size={12} md:size={14} /> Ready for the leap?
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
