
import React, { useState } from 'react';
import { Binary, Monitor, Cpu, HardDrive, Camera, BatteryCharging, Shield, Satellite, Car, Scan, Sun, Moon, Fingerprint, ChevronRight, Info } from 'lucide-react';

const ICONS: any = { Monitor, Cpu, HardDrive, Camera, BatteryCharging, Shield, Satellite, Car, Scan, Sun, Moon, Fingerprint };

export const WhitepaperSection = ({ t, lang, onOpenFull }: any) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="whitepaper" className="py-16 md:py-32 bg-neutral-950 px-4 md:px-6 relative overflow-hidden scroll-mt-20 md:scroll-mt-32" aria-labelledby="whitepaper-title">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-10 md:mb-20 flex flex-col md:flex-row justify-between items-center md:items-end gap-6 md:gap-8 text-center md:text-left">
          <div className="space-y-3 md:space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-600/10 border border-red-600/30 rounded text-[9px] md:text-[10px] font-black uppercase text-red-500">
              <Binary size={10} aria-hidden="true" /> <span>{t.whitepaper.version}</span>
            </div>
            <h2 id="whitepaper-title" className="text-2xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight sm:leading-none">{t.whitepaper.title}</h2>
          </div>
          <button 
            onClick={onOpenFull}
            className="flex items-center space-x-2 bg-white/5 border border-white/10 px-6 py-3 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:border-red-600 transition-all group active:scale-95"
            aria-label="View Full Technical Report"
          >
            <span>{lang === 'zh' ? '查看完整报告' : 'VIEW FULL REPORT'}</span>
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-24 items-start">
          <div className="lg:sticky lg:top-40 space-y-8 md:space-y-12">
            <div 
              className="relative border border-red-600/20 rounded-[2rem] md:rounded-[3rem] p-4 sm:p-6 md:p-12 glass-effect overflow-hidden cursor-pointer group flex justify-center" 
              onClick={onOpenFull}
              role="button"
              aria-label="Enlarge Model Pi Blueprint"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent animate-scan" />
              <div className="perspective-1000 rotate-slow flex justify-center py-6 md:py-10 transition-transform group-hover:scale-105">
                <img 
                  src="https://aka.doubaocdn.com/s/KqXq1vl32h" 
                  alt="Tesla Model Pi 3D Blueprint" 
                  className="w-32 xs:w-40 sm:w-64 md:w-80 h-auto drop-shadow-[0_0_80px_rgba(232,33,39,0.1)] object-contain" 
                />
              </div>
            </div>
            
            {/* Tabs - Better layout for mobile */}
            <div className="flex justify-between space-x-2 sm:space-x-4" role="tablist">
              {t.whitepaper.tabs.map((tab: string, idx: number) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveTab(idx)} 
                  role="tab"
                  aria-selected={activeTab === idx}
                  className={`flex-1 py-3 sm:py-4 px-1 rounded-xl sm:rounded-2xl text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-widest border transition-all active:scale-95 text-center ${activeTab === idx ? 'bg-red-600 border-red-600 text-white' : 'bg-white/5 border-white/10 text-gray-500 hover:text-white'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6 md:space-y-10">
            {activeTab === 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6" role="tabpanel">
                {t.whitepaper.specs.map((spec: any, i: number) => {
                  const Icon = ICONS[spec.icon] || Info;
                  return (
                    <article key={i} className="bg-white/[0.03] border border-white/5 p-6 md:p-8 rounded-2xl md:rounded-3xl hover:bg-white/[0.05] transition-all group">
                      <div className="flex items-center space-x-2 mb-3 text-red-500">
                        <Icon size={14} aria-hidden="true" className="md:size-4" />
                        <h3 className="text-[9px] md:text-[10px] font-black uppercase text-gray-500 tracking-wider">{spec.label}</h3>
                      </div>
                      <div className="text-lg md:text-xl font-black uppercase mb-1 leading-tight">{spec.value}</div>
                      <p className="text-[10px] md:text-xs text-gray-500 font-mono tracking-tight">{spec.detail}</p>
                    </article>
                  );
                })}
              </div>
            )}
            {activeTab === 1 && (
              <div className="space-y-4 md:space-y-6" role="tabpanel">
                {t.whitepaper.sellingPoints.map((point: any, i: number) => (
                  <article key={i} className="group flex flex-col items-start gap-4 sm:gap-8 bg-white/[0.02] border border-white/5 p-6 md:p-10 rounded-2xl sm:rounded-[2.5rem] hover:bg-white/[0.04]">
                    <div className="space-y-2 md:space-y-4">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <h3 className="text-lg md:text-2xl font-black uppercase tracking-tighter">{point.title}</h3>
                        <span className="px-2 py-0.5 bg-red-600/10 border border-red-600/30 text-[8px] md:text-[9px] font-black uppercase text-red-500 rounded">{point.meta}</span>
                      </div>
                      <p className="text-gray-400 leading-relaxed text-xs md:text-sm">{point.desc}</p>
                    </div>
                  </article>
                ))}
              </div>
            )}
            {activeTab === 2 && (
              <div className="grid grid-cols-1 gap-4 md:gap-8" role="tabpanel">
                {t.whitepaper.future.map((fut: any, i: number) => {
                  const Icon = ICONS[fut.icon];
                  return (
                    <article key={i} className="p-8 md:p-12 rounded-2xl md:rounded-[3.5rem] glass-effect border-red-600/10 text-center space-y-4 md:space-y-8">
                      {Icon && <Icon size={40} className="md:size-12 mx-auto text-red-600 mb-2" aria-hidden="true" />}
                      <h3 className="text-xl md:text-3xl font-black uppercase tracking-tighter leading-tight">{fut.title}</h3>
                      <p className="text-gray-500 leading-relaxed max-w-md mx-auto text-xs md:text-sm">{fut.desc}</p>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
