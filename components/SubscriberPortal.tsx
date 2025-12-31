
import React from 'react';
import { X, Satellite, Cpu, Truck, User, Zap, Globe, HardDrive, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { ModelPiLogo } from '../Logo';

export const SubscriberPortal = ({ onClose, t, lang }: any) => {
  const isRTL = lang === 'ar';
  
  return (
    <div className="fixed inset-0 z-[150] bg-black animate-in fade-in duration-500 overflow-y-auto custom-scrollbar">
      {/* Dynamic Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-600/30 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-600/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10 min-h-screen flex flex-col">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-4">
            <ModelPiLogo className="w-10 h-10 text-cyan-500" glow />
            <div>
              <h2 className="text-xl font-black uppercase tracking-tighter leading-none">{t.portal.welcome}</h2>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500/60 mt-1">Status: BATCH 01 ELITE</div>
            </div>
          </div>
          <button onClick={onClose} className="p-4 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/10 group">
            <X size={24} className="group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12 flex-grow">
          
          {/* Main Status */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Connection Card */}
            <div className="glass-effect p-8 rounded-[2.5rem] border border-cyan-500/20 space-y-8 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <Satellite className="text-cyan-400" size={40} />
                <span className="px-3 py-1 bg-cyan-400/10 text-cyan-400 text-[10px] font-black uppercase rounded-full border border-cyan-400/20">{t.portal.connected}</span>
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-2">{t.portal.status}</h3>
                <div className="text-4xl font-black uppercase tracking-tighter">842.1 MB/s</div>
                <div className="flex items-center gap-2 mt-4">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-3 bg-cyan-400 rounded-full" />)}
                  </div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Lat: 18ms</span>
                </div>
              </div>
            </div>

            {/* Neuralink Card */}
            <div className="glass-effect p-8 rounded-[2.5rem] border border-white/5 space-y-8">
              <div className="flex justify-between items-start">
                <Cpu className="text-red-500" size={40} />
                <span className="px-3 py-1 bg-white/5 text-gray-500 text-[10px] font-black uppercase rounded-full border border-white/10">{t.portal.syncing}</span>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">{t.portal.id}</h3>
                <div className="font-mono text-3xl text-white">PI-X09-2025-{Math.floor(Math.random()*90000+10000)}</div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-red-600 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Delivery Progress */}
            <div className="md:col-span-2 glass-effect p-10 rounded-[3rem] border border-white/5 space-y-10">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-3"><Truck className="text-cyan-400" /> {t.portal.delivery}</h3>
                <span className="text-xs font-black uppercase text-cyan-400">{t.launch.estTime}</span>
              </div>
              
              <div className="relative pt-10 pb-4 px-2">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2" />
                <div className="absolute top-1/2 left-0 w-1/3 h-0.5 bg-cyan-400 -translate-y-1/2" />
                
                <div className="flex justify-between relative">
                  {[
                    { label: 'Confirmed', icon: ShieldCheck, active: true },
                    { label: 'Production', icon: HardDrive, active: true },
                    { label: 'Transport', icon: Globe, active: false },
                    { label: 'Arrival', icon: ModelPiLogo, active: false }
                  ].map((step, idx) => {
                    const StepIcon = step.icon;
                    return (
                      <div key={idx} className="flex flex-col items-center gap-4">
                        <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${step.active ? 'bg-cyan-400 border-cyan-400 text-black shadow-[0_0_20px_rgba(34,211,238,0.4)]' : 'bg-black border-white/10 text-gray-600'}`}>
                          <StepIcon size={20} />
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${step.active ? 'text-white' : 'text-gray-600'}`}>{step.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Side Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gradient-to-br from-cyan-600 to-cyan-800 p-8 rounded-[2.5rem] text-white space-y-6 shadow-2xl shadow-cyan-600/20">
              <h3 className="text-2xl font-black uppercase tracking-tighter">Priority Access</h3>
              <p className="text-cyan-100/60 text-sm font-medium leading-relaxed">As a BATCH 01 Subscriber, you have priority access to Tesla Mars-Edition updates and early BCI hardware integration.</p>
              <button className="w-full py-4 bg-white text-cyan-900 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
                Get White Glove Support <ArrowUpRight size={14} />
              </button>
            </div>
            
            <div className="glass-effect p-8 rounded-[2.5rem] border border-white/5 flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                <User className="text-gray-400" size={32} />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Subscriber</div>
                <div className="font-black uppercase tracking-tight">Pioneer Candidate #11284</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="mt-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-30">
          <p className="text-[10px] font-black uppercase tracking-[0.5em]">TESLA MODEL PI · SUBSCRIBER HUB · v1.0.42</p>
          <div className="flex gap-8 text-[9px] font-bold uppercase tracking-widest">
            <span>Terminal: Secured</span>
            <span>Uplink: Orbital 184-B</span>
            <span>E2E Encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
};
