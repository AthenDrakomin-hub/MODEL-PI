
import React, { useState, useRef, useEffect } from 'react';
import { CreditCard, Check, Zap, Wifi, Smartphone, Radio, Satellite, ShieldCheck, Star, Activity, Shield, RefreshCcw } from 'lucide-react';
import { CountdownTimer } from './CountdownTimer';
import { ModelPiLogo } from '../Logo';

export const BookingSection = ({ t, stats, endTime, lang, onOrder, theme }: any) => {
  const [selectedColor, setSelectedColor] = useState('cyan');
  const [rotation, setRotation] = useState({ x: -12, y: 35 });
  const [autoRotate, setAutoRotate] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(null);

  // 容错处理
  const l = t?.launch || {
    remains: 'Founders Left',
    colorSelect: 'Select Your Finish',
    deposit: 'Pioneer Deposit'
  };

  const colorConfig: any = {
    cyan: { 
      name: 'Cyber Cyan', 
      hex: '#00bcd4', 
      frame: 'linear-gradient(180deg, #00acc1 0%, #00e5ff 50%, #00acc1 100%)',
      logo: 'text-white shadow-[0_0_30px_rgba(255,255,255,0.8)]',
      bg: '#08CFE3',
      brushed: 'rgba(255,255,255,0.1)'
    },
    black: { 
      name: 'Stealth Black', 
      hex: '#050505', 
      frame: 'linear-gradient(180deg, #111 0%, #000 50%, #111 100%)',
      logo: 'text-white shadow-[0_0_20px_rgba(255,255,255,0.5)]',
      bg: '#050505',
      brushed: 'rgba(255,255,255,0.03)'
    },
    red: { 
      name: 'Crimson Red', 
      hex: '#E82127', 
      frame: 'linear-gradient(180deg, #c62828 0%, #ff5252 50%, #c62828 100%)',
      logo: 'text-white shadow-[0_0_20px_rgba(255,255,255,0.6)]',
      bg: '#E82127',
      brushed: 'rgba(255,255,255,0.1)'
    }
  };

  useEffect(() => {
    if (!autoRotate) return;
    const animate = () => {
      setRotation(prev => ({ ...prev, y: prev.y + 0.4 }));
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { 
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [autoRotate]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setAutoRotate(false);
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)) * 15; 
    const y = ((e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)) * -35; 
    setRotation({ x, y });
  };

  const config = colorConfig[selectedColor] || colorConfig.cyan;

  return (
    <section id="launch" className={`py-16 md:py-32 lg:py-48 px-4 md:px-6 relative overflow-hidden scroll-mt-20 ${theme === 'midnight' ? 'bg-[#030303]' : 'bg-[#fcfcfd]'}`}>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-24">
           <div className="inline-flex items-center space-x-3 px-4 md:px-6 py-2 bg-red-600/10 border border-red-600/30 rounded-full mb-8 md:mb-12">
              <Shield size={12} className="text-red-500" />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-red-500">Tesla Official Global Pre-order Portal</span>
           </div>
           <div className="flex justify-center transform scale-[0.85] sm:scale-100">
              <CountdownTimer targetDate={endTime} lang={lang} />
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 lg:gap-32 items-center">
          {/* 3D Model Display */}
          <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setAutoRotate(false)}
            onMouseLeave={() => setAutoRotate(true)}
            className="relative h-[450px] sm:h-[600px] md:h-[750px] lg:h-[850px] flex items-center justify-center perspective-2000"
          >
            <div className="absolute bottom-5 md:bottom-10 w-[250px] sm:w-[350px] md:w-[480px] h-24 md:h-32 bg-red-500/10 blur-[80px] md:blur-[120px] rounded-full rotate-x-90" />
            <div 
              className="relative w-[220px] sm:w-[280px] md:w-[320px] h-[450px] sm:h-[580px] md:h-[660px] transition-transform duration-300 ease-out will-change-transform"
              style={{ 
                transformStyle: 'preserve-3d',
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` 
              }}
            >
              {/* Screen Face */}
              <div 
                className="absolute inset-0 bg-black rounded-[2.8rem] sm:rounded-[3.2rem] md:rounded-[3.8rem] shadow-2xl overflow-hidden border-[2px] md:border-[2.5px] border-white/10"
                style={{ transform: 'translateZ(18px)', backfaceVisibility: 'hidden' }}
              >
                <div className="absolute inset-0">
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_#1a1a1a_0%,_#000_100%)]" />
                   <div className="absolute inset-0 opacity-30">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full aspect-square border border-red-600/20 rounded-full animate-[ping_4s_infinite]" />
                   </div>
                </div>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                   <div className="relative mb-8 md:mb-12 group">
                      <div className="absolute inset-0 bg-red-600/20 blur-3xl rounded-full scale-150 animate-pulse" />
                      <ModelPiLogo className="w-16 h-16 md:w-24 md:h-24 text-white relative z-10 drop-shadow-[0_0_30px_rgba(232,33,39,0.5)]" />
                   </div>
                   <div className="text-center space-y-3 md:space-y-4">
                      <div className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-white/40">READY FOR EARTH</div>
                      <div className="text-[8px] md:text-[10px] font-black text-red-600 uppercase tracking-widest animate-pulse">
                         Your Future Is Online
                      </div>
                   </div>
                </div>
              </div>

              {/* Back Face */}
              <div 
                className="absolute inset-0 rounded-[2.8rem] sm:rounded-[3.2rem] md:rounded-[3.8rem] shadow-2xl overflow-hidden"
                style={{ 
                  transform: 'rotateY(180deg) translateZ(18px)', 
                  background: config.bg,
                  backfaceVisibility: 'hidden'
                }}
              >
                <div className="absolute inset-0 opacity-40" style={{ background: `repeating-linear-gradient(90deg, transparent 0px, transparent 1px, ${config.brushed} 1px, ${config.brushed} 2px)` }} />
                <div className="absolute top-8 sm:top-14 left-6 sm:left-10 w-24 h-24 sm:w-36 sm:h-36 bg-black/95 backdrop-blur-3xl rounded-[2rem] sm:rounded-[3rem] border border-white/10 grid grid-cols-2 gap-2 sm:gap-3 p-4 sm:p-6 shadow-2xl">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="bg-neutral-900 rounded-full border border-white/10 flex items-center justify-center shadow-inner">
                        <div className="w-3 h-3 sm:w-5 sm:h-5 rounded-full bg-blue-500/10 shadow-[inset_0_0_10px_rgba(0,0,0,1)]" />
                     </div>
                   ))}
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center pt-16 sm:pt-24">
                   <div className={`transition-all duration-1000 transform scale-110 sm:scale-150 ${config.logo}`}>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg" className="w-12 h-12 sm:w-20 sm:h-20 invert" alt="Tesla" />
                   </div>
                </div>
              </div>

              {/* Chassis Thickness */}
              {[...Array(36)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute inset-0 pointer-events-none rounded-[2.8rem] sm:rounded-[3.2rem] md:rounded-[3.8rem]"
                  style={{ 
                    transform: `translateZ(${i - 18}px)`, 
                    background: i === 18 ? config.hex : config.frame,
                    border: `0.5px solid rgba(255,255,255,0.02)`,
                    opacity: i === 18 ? 1 : 0.08,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Interaction Area */}
          <div className="space-y-10 md:space-y-16">
            <div className="space-y-6 md:space-y-8">
              <h2 className={`text-4xl sm:text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] ${theme === 'midnight' ? 'text-white' : 'text-black'}`}>
                {l.remains} <br/>
                <span className="text-red-600">{(100 - stats.progress).toFixed(3)}%</span>
              </h2>
              <div className="h-2 w-full bg-white/5 rounded-full mt-6 md:mt-10 overflow-hidden">
                <div className="h-full bg-red-600 transition-all duration-1000" style={{ width: `${stats.progress}%` }} />
              </div>
            </div>

            {/* Reassurance Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
               <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl md:rounded-3xl flex items-start gap-4">
                  <RefreshCcw className="text-red-600 shrink-0" size={20} md:size={24} />
                  <div>
                    <div className="text-[10px] md:text-xs font-black uppercase mb-1">Risk-Free Order</div>
                    <p className="text-[8px] md:text-[10px] text-gray-500 font-medium leading-relaxed">正式交付前随时可退，定金全额原路返还。</p>
                  </div>
               </div>
               <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl md:rounded-3xl flex items-start gap-4">
                  <ShieldCheck className="text-red-600 shrink-0" size={20} md:size={24} />
                  <div>
                    <div className="text-[10px] md:text-xs font-black uppercase mb-1">Official Warranty</div>
                    <p className="text-[8px] md:text-[10px] text-gray-500 font-medium leading-relaxed">2年全球联保，特斯拉售后中心直供保障。</p>
                  </div>
               </div>
            </div>

            <div className="space-y-6 md:space-y-8">
               <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-gray-500">{l.colorSelect}</h3>
               <div className="grid grid-cols-3 gap-4 md:gap-6">
                  {Object.entries(colorConfig).map(([key, config]: any) => (
                    <button
                      key={key}
                      onClick={() => setSelectedColor(key)}
                      className={`relative aspect-square rounded-[1.8rem] sm:rounded-[2.2rem] md:rounded-[2.5rem] border-2 transition-all duration-500 p-1.5 md:p-2 ${selectedColor === key ? 'border-red-600 scale-105 shadow-2xl' : 'border-white/5 hover:border-white/20'}`}
                    >
                      <div className="w-full h-full rounded-[1.2rem] sm:rounded-[1.5rem] md:rounded-[1.8rem]" style={{ background: config.frame }} />
                      {selectedColor === key && <div className="absolute inset-0 flex items-center justify-center"><Check className="text-white" size={20} md:size={24} /></div>}
                    </button>
                  ))}
               </div>
            </div>

            <div className={`glass-effect p-8 md:p-14 rounded-[2.8rem] sm:rounded-[3.2rem] md:rounded-[3.8rem] border border-white/10 space-y-8 md:space-y-10 shadow-3xl ${theme === 'midnight' ? 'bg-white/5' : 'bg-black/5'}`}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                <div className="space-y-1 md:space-y-2">
                  <span className="text-gray-500 font-black uppercase text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em]">{l.deposit}</span>
                  <div className={`font-black text-5xl md:text-7xl tracking-tighter ${theme === 'midnight' ? 'text-white' : 'text-black'}`}>$89.70</div>
                </div>
                <div className="bg-white/5 px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl border border-white/10">
                   <span className="text-green-500 font-black text-[9px] md:text-[10px] uppercase tracking-widest flex items-center gap-2">
                     <CreditCard size={12}/> Standard Pay Available
                   </span>
                </div>
              </div>
              <button onClick={onOrder} className="w-full py-6 md:py-8 bg-red-600 text-white rounded-2xl md:rounded-[2rem] font-black uppercase text-xs md:text-sm tracking-[0.4em] md:tracking-[0.5em] hover:bg-white hover:text-black transition-all shadow-4xl flex items-center justify-center gap-3 md:gap-4 active:scale-95 group">
                <Zap size={18} md:size={20} />
                <span>{t.hero.orderNow}</span>
              </button>
              <div className="text-center">
                 <p className="text-[8px] md:text-[9px] font-bold text-gray-500 uppercase tracking-widest">Supports Visa, Mastercard, Apple Pay & Alipay</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
