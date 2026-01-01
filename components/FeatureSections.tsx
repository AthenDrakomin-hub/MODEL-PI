
import React, { useRef, useState, useEffect } from 'react';
import { Satellite, Car, Moon, Cpu, Zap, Radio, X, Play, Pause, Volume2, VolumeX, Smartphone, Info, Share2, Activity, Battery, Wifi, Shield, Brain, Globe, Sparkles, Orbit } from 'lucide-react';
import { ModelPiLogo } from '../Logo';

export const FeatureSections = ({ t, onClose }: any) => {
  const [activeScreen, setActiveScreen] = useState<'starlink' | 'tesla' | 'neuralink'>('starlink');
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#050505] animate-in fade-in duration-700 flex flex-col overflow-y-auto custom-scrollbar">
      {/* Immersive Deep Space Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1a1a1a_0%,#000_100%)]" />
        <div className="absolute inset-0 opacity-25 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>

      {/* Navigation Header */}
      <div className="sticky top-0 z-50 p-6 md:p-8 flex justify-between items-center bg-black/90 backdrop-blur-3xl border-b border-white/10">
        <div className="flex items-center gap-4">
           <ModelPiLogo className="w-10 h-10 text-red-600" glow />
           <div>
              <h2 className="text-xl font-black uppercase tracking-tighter text-white">PI MISSION CONTROL</h2>
              <div className="text-[9px] font-black uppercase text-red-500 tracking-[0.4em] animate-pulse">UPLINK ESTABLISHED</div>
           </div>
        </div>
        <button onClick={onClose} className="p-4 bg-white/10 hover:bg-red-600 rounded-full transition-all border border-white/20 group shadow-lg">
          <X size={24} className="text-white group-hover:rotate-90 transition-transform" />
        </button>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center py-12 px-6 max-w-7xl mx-auto w-full gap-12 lg:gap-24">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-32 w-full">
          {/* Magic Commands (Left) */}
          <div className="flex lg:flex-col gap-6 w-full lg:w-96 order-2 lg:order-1">
             <MagicButton 
                icon={<Orbit size={24} />} 
                title={t.features.starlink.title} 
                desc={t.features.starlink.desc} 
                active={activeScreen === 'starlink'} 
                onClick={() => setActiveScreen('starlink')} 
                color="red"
             />
             <MagicButton 
                icon={<Car size={24} />} 
                title={t.features.tesla.title} 
                desc={t.features.tesla.desc} 
                active={activeScreen === 'tesla'} 
                onClick={() => setActiveScreen('tesla')} 
                color="cyan"
             />
             <MagicButton 
                icon={<Brain size={24} />} 
                title={t.features.mars.title} 
                desc={t.features.mars.desc} 
                active={activeScreen === 'neuralink'} 
                onClick={() => setActiveScreen('neuralink')} 
                color="purple"
             />
          </div>

          {/* Central Core */}
          <div 
            className="relative w-full max-w-[340px] md:max-w-[480px] order-1 lg:order-2 transition-transform duration-700"
            onMouseMove={handleMouseMove}
            style={{ 
               transform: `perspective(1000px) rotateY(${(mousePos.x - 50) * 0.1}deg) rotateX(${(mousePos.y - 50) * -0.1}deg)` 
            }}
          >
            <div className={`absolute -inset-10 blur-[120px] opacity-25 transition-colors duration-1000 ${
               activeScreen === 'starlink' ? 'bg-red-600' : (activeScreen === 'tesla' ? 'bg-cyan-400' : 'bg-purple-600')
            }`} />

            <div className="relative aspect-[19.5/42] w-full mx-auto bg-[#0a0a0a] rounded-[5rem] p-4 border-[5px] border-white/20 shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden">
               <div className="relative h-full w-full bg-black rounded-[4rem] overflow-hidden border border-white/10">
                  <div className="absolute inset-0">
                    {activeScreen === 'starlink' && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-10 animate-in zoom-in-95 duration-1000">
                         <div className="relative w-64 h-64">
                            <div className="absolute inset-0 bg-red-600/15 blur-[80px] rounded-full animate-pulse" />
                            <div className="absolute inset-0 rounded-full border border-white/10 animate-[spin_30s_linear_infinite] flex items-center justify-center">
                               <Globe size={180} className="text-white/20" />
                               <div className="absolute inset-0">
                                  {[...Array(8)].map((_, i) => (
                                    <div 
                                       key={i} 
                                       className="absolute w-2 h-2 bg-red-500 rounded-full shadow-[0_0_15px_rgba(232,33,39,1)]"
                                       style={{ 
                                          top: `${50 + 40 * Math.sin(i * Math.PI / 4)}%`,
                                          left: `${50 + 40 * Math.cos(i * Math.PI / 4)}%`,
                                          animation: `ping ${2 + i}s infinite`
                                       }}
                                    />
                                  ))}
                               </div>
                            </div>
                         </div>
                         <div className="mt-16 text-center">
                            <h4 className="text-3xl font-black text-white tracking-tighter uppercase mb-2 drop-shadow-md">Omnipresence</h4>
                            <p className="text-[10px] font-black text-red-500 tracking-[0.6em] uppercase">10,000 Satellites Synced</p>
                         </div>
                      </div>
                    )}

                    {activeScreen === 'tesla' && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-10 animate-in slide-in-from-bottom-20 duration-1000">
                         <div className="relative w-full aspect-video group cursor-pointer">
                            <img 
                               src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=600" 
                               className="w-full h-full object-contain opacity-30 brightness-200 mix-blend-lighten scale-150 grayscale"
                               alt="Ghost Car"
                            />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-cyan-400/60 rounded-full animate-[ping_3s_infinite]" />
                         </div>
                         <div className="mt-24 text-center">
                               <div className="text-4xl font-black text-white tracking-tighter italic drop-shadow-lg">SUMMONED</div>
                               <div className="text-[11px] font-black text-cyan-400 tracking-[0.4em] uppercase mt-2">Biometric Handshake OK</div>
                         </div>
                      </div>
                    )}

                    {activeScreen === 'neuralink' && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-10 animate-in fade-in duration-1000">
                         <div className="absolute inset-0 overflow-hidden opacity-40">
                            {[...Array(40)].map((_, i) => (
                              <div 
                                key={i}
                                className="absolute w-1.5 h-1.5 bg-purple-400 rounded-full transition-all duration-[3000ms] blur-[1px]"
                                style={{ 
                                  left: `${50 + (Math.random() - 0.5) * 80}%`, 
                                  top: `${50 + (Math.random() - 0.5) * 80}%`,
                                  transform: `translate(${(mousePos.x - 50) * (1 + i * 0.1)}px, ${(mousePos.y - 50) * (1 + i * 0.1)}px)`,
                                }}
                              />
                            ))}
                         </div>
                         <div className="relative z-10 text-center">
                            <div className="w-32 h-32 bg-purple-600/15 rounded-full border border-purple-500/40 flex items-center justify-center mb-12 shadow-2xl">
                               <Brain size={64} className="text-purple-400 animate-pulse" />
                            </div>
                            <div className="text-5xl font-black text-white tracking-tighter uppercase mb-4 drop-shadow-md">THOUGHT</div>
                            <div className="px-6 py-2 bg-purple-600/30 border border-purple-600/50 rounded-full">
                               <span className="text-[10px] font-black text-purple-300 tracking-[0.5em] uppercase">Ecosystem Telepathy</span>
                            </div>
                         </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Status Overlay */}
                  <div className="absolute top-10 left-12 right-12 flex justify-between items-center z-50">
                     <ModelPiLogo className="w-6 h-6 text-white/40" />
                     <div className="flex gap-1">
                        <div className="w-4 h-1 bg-white/60 rounded-full" />
                        <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Context Display (Right) */}
          <div className="hidden lg:flex flex-col gap-8 w-96 order-3">
             <div className="glass-effect p-12 rounded-[4rem] space-y-8 hover:bg-white/[0.08] transition-all shadow-2xl">
                <Sparkles size={32} className="text-red-500" />
                <h4 className="text-lg font-black uppercase tracking-widest text-white drop-shadow-md">No More Boundaries.</h4>
                <p className="text-xs text-gray-300 font-medium leading-relaxed">
                   传统的智能手机正在消亡。Model Π 开启了交互的下一个纪元：从手动输入进化为感知交互。
                </p>
             </div>
             <div className="bg-white/5 border border-white/20 p-12 rounded-[4rem] space-y-6 shadow-xl">
                <div className="flex items-center gap-4">
                   <Shield className="text-cyan-400" size={24} />
                   <div className="text-[11px] font-black text-white uppercase tracking-widest">Security Protocol</div>
                </div>
                <p className="text-[10px] text-gray-400 font-bold uppercase leading-relaxed tracking-wider">
                   Encrypted by T-OS T1 Secure Chip. Zero external access guaranteed.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MagicButton = ({ icon, title, desc, active, onClick, color }: any) => {
  const colorMap: any = {
    red: "border-red-600/60 text-red-500",
    cyan: "border-cyan-500/60 text-cyan-400",
    purple: "border-purple-500/60 text-purple-400"
  };

  return (
    <button 
      onClick={onClick}
      className={`group flex items-start gap-6 p-10 rounded-[3rem] border transition-all duration-700 w-full text-left ${
         active ? colorMap[color] + ' bg-white/10 scale-105 shadow-3xl' : 'bg-transparent border-white/10 text-gray-400 hover:border-white/30 hover:bg-white/5'
      }`}
    >
      <div className={`shrink-0 w-16 h-16 flex items-center justify-center rounded-3xl transition-all duration-500 ${
         active ? 'bg-white text-black shadow-lg' : 'bg-white/10 text-gray-300 group-hover:bg-white/20'
      }`}>
        {icon}
      </div>
      <div className="space-y-2">
        <div className={`text-sm font-black uppercase tracking-[0.2em] transition-colors ${active ? 'text-white' : 'text-gray-400'}`}>{title}</div>
        <div className={`text-[10px] font-bold uppercase leading-relaxed transition-opacity ${active ? 'text-gray-300 opacity-100' : 'text-gray-500 opacity-70 group-hover:opacity-100'}`}>{desc}</div>
      </div>
    </button>
  );
};
