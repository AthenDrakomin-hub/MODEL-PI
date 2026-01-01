
import React, { useState, useEffect } from 'react';
import { X, Satellite, Cpu, Truck, User, Zap, Globe, HardDrive, ShieldCheck, ArrowUpRight, Calendar, Activity, Signal, Eye, EyeOff, Lock } from 'lucide-react';
import { ModelPiLogo } from '../Logo';

export const SubscriberPortal = ({ onClose, t, lang, dbData }: any) => {
  const [pulse, setPulse] = useState<number[]>([]);
  const [idRevealed, setIdRevealed] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  
  // 模拟脑波数据
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(prev => [...prev.slice(-20), Math.random() * 40 + 20]);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (ts: number | null) => {
    if (!ts) return 'N/A';
    return new Date(ts).toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleRevealId = async () => {
    if (idRevealed) {
      setIdRevealed(false);
      return;
    }
    setIsVerifying(true);
    await new Promise(r => setTimeout(r, 1200)); // 模拟生物特征识别
    setIdRevealed(true);
    setIsVerifying(false);
  };

  const maskId = (id: string | null) => {
    if (!id) return 'UNKNOWN';
    if (idRevealed) return id;
    const parts = id.split('-');
    if (parts.length < 2) return '******';
    return `${parts[0]}-${parts[1].substring(0, 2)}***${parts[1].slice(-1)}`;
  };

  return (
    <div className="fixed inset-0 z-[150] bg-black animate-in fade-in duration-500 overflow-y-auto custom-scrollbar scanlines">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-600/30 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-600/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 relative z-10 min-h-screen flex flex-col">
        {/* Top Header */}
        <div className="flex justify-between items-center mb-10 md:mb-16">
          <div className="flex items-center gap-3 sm:gap-4">
            <ModelPiLogo className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" glow />
            <div>
              <h2 className="text-lg sm:text-xl font-black uppercase tracking-tighter leading-none text-white">PIONEER COMMAND</h2>
              <div className="flex items-center gap-2 mt-1">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                 <div className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Neural Link: ACTIVE</div>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-3 sm:p-4 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/10 group">
            <X size={20} className="sm:size-6 group-hover:rotate-90 transition-transform text-white" />
          </button>
        </div>

        {/* Bento Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12 flex-grow">
          
          {/* Stats Column */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Orbital Connectivity */}
            <div className="bg-white/[0.03] border border-cyan-500/20 p-8 rounded-[2.5rem] flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Satellite size={120} />
              </div>
              <div className="flex justify-between items-start relative z-10">
                <div className="p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 text-cyan-400">
                  <Signal size={24} />
                </div>
                <span className="text-[9px] font-black uppercase text-cyan-500 tracking-widest">Global Mesh: Synced</span>
              </div>
              <div className="mt-12 space-y-4 relative z-10 text-white">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Satellite Throughput</h3>
                <div className="text-4xl font-black font-mono">1.28 <span className="text-xl text-cyan-500">GBPS</span></div>
                {/* 模拟网格 */}
                <div className="grid grid-cols-8 gap-1 h-8 items-end">
                   {[...Array(24)].map((_, i) => (
                     <div key={i} className="w-1 bg-cyan-500/40 rounded-full" style={{ height: `${Math.random() * 100}%` }} />
                   ))}
                </div>
              </div>
            </div>

            {/* Neuralink Biometrics */}
            <div className="bg-white/[0.03] border border-red-500/20 p-8 rounded-[2.5rem] space-y-8 relative overflow-hidden group">
              <div className="flex justify-between items-start">
                <div className="p-4 bg-red-600/10 rounded-2xl border border-red-600/20 text-red-500">
                  <Activity size={24} />
                </div>
                <div className="text-right text-white">
                  <div className="text-[9px] font-black text-white/40 uppercase">Pioneer ID</div>
                  <div 
                    className="flex items-center gap-2 cursor-pointer group/id"
                    onClick={handleRevealId}
                  >
                    <div className={`text-sm font-black font-mono transition-all ${idRevealed ? 'text-white' : 'text-gray-600'}`}>
                      {isVerifying ? 'VERIFYING...' : maskId(dbData.pioneerId)}
                    </div>
                    {idRevealed ? <EyeOff size={12} className="text-red-500" /> : <Eye size={12} className="text-gray-500 group-hover/id:text-white" />}
                  </div>
                </div>
              </div>
              <div className="space-y-4 text-white">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Cognitive Load</h3>
                 <div className="flex items-end gap-1 h-12">
                   {pulse.map((h, i) => (
                     <div key={i} className="flex-1 bg-red-600/60 rounded-sm" style={{ height: `${h}%` }} />
                   ))}
                 </div>
                 <div className="flex justify-between text-[8px] font-black text-red-500/60 uppercase">
                    <span>Alpha Waves</span>
                    <span>Stable</span>
                 </div>
              </div>
            </div>

            {/* Logistics Status */}
            <div className="md:col-span-2 bg-white/[0.02] border border-white/10 p-10 rounded-[3rem] space-y-12 text-white">
              <div className="flex justify-between items-center">
                 <h3 className="text-lg font-black uppercase tracking-tighter flex items-center gap-3">
                   <Truck className="text-red-600" /> PRODUCTION PIPELINE
                 </h3>
                 <div className="px-4 py-1.5 bg-red-600/10 border border-red-600/30 rounded-full text-[9px] font-black text-red-500">
                   PHASE: MANUFACTURING
                 </div>
              </div>
              
              <div className="relative">
                <div className="absolute top-6 left-0 w-full h-px bg-white/5" />
                <div className="grid grid-cols-4 relative z-10">
                   {[
                     { label: 'Confirmed', status: 'done' },
                     { label: 'Factory', status: 'active' },
                     { label: 'Transit', status: 'pending' },
                     { label: 'Arrival', status: 'pending' }
                   ].map((step, i) => (
                     <div key={i} className="flex flex-col items-center gap-4">
                        <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                          step.status === 'done' ? 'bg-red-600 border-red-600 text-white' : 
                          (step.status === 'active' ? 'bg-black border-red-600 text-red-600 shadow-[0_0_15px_rgba(232,33,39,0.3)]' : 'bg-black border-white/10 text-gray-700')
                        }`}>
                          {step.status === 'done' ? <CheckCircle2 size={18} /> : (i + 1)}
                        </div>
                        <span className={`text-[8px] font-black uppercase tracking-widest ${step.status === 'pending' ? 'text-gray-700' : 'text-white'}`}>{step.label}</span>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </div>

          {/* User & Badge Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gradient-to-br from-neutral-900 to-black p-10 rounded-[3rem] border border-white/10 space-y-8 relative group overflow-hidden shadow-2xl text-white">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Globe size={150} />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter relative z-10">Pioneer Badge</h3>
              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                   <Calendar className="text-red-500" />
                   <div>
                      <div className="text-[8px] uppercase font-black text-gray-500 tracking-widest">Enrollment</div>
                      <div className="text-xs font-black text-white">{formatDate(dbData.joinedAt)}</div>
                   </div>
                </div>
                <p className="text-gray-400 text-[11px] leading-relaxed font-medium">
                  Welcome, Candidate. You are now officially indexed in the Starlink Pioneer Mesh. Your hardware will include pre-calibrated Neuralink 0.1s sensors.
                </p>
                <div className="bg-red-600/10 border border-red-600/20 p-4 rounded-xl flex items-center gap-3">
                   <Lock size={14} className="text-red-500" />
                   <span className="text-[9px] font-black uppercase text-red-400 tracking-widest">Vaulted Data Protection Active</span>
                </div>
                <button className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2 active:scale-95">
                  Secure Support Channel <ArrowUpRight size={14} />
                </button>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] flex items-center gap-6 group hover:border-white/20 transition-all text-white">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-red-600/10 transition-colors">
                <User size={32} className="text-gray-500 group-hover:text-red-600 transition-colors" />
              </div>
              <div>
                <div className="text-[9px] font-black uppercase text-gray-500 tracking-[0.3em] mb-1">Authenticated as</div>
                <div className="text-base font-black uppercase text-white">Founder Level 01</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-30">
          <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.6em] text-white">TESLA MODEL PI · SUBSCRIBER HUB · SECURE TERMINAL</p>
          <div className="flex gap-8 text-[8px] font-black uppercase tracking-widest text-white">
            <span>Uplink: Orbital 184-B</span>
            <span>E2E Encrypted</span>
            <span>v1.2.0-Alpha</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckCircle2 = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
);
