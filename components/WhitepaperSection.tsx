
import React, { useState } from 'react';
import { Binary, Monitor, Cpu, HardDrive, Camera, BatteryCharging, Shield, Satellite, Car, Scan, Sun, Moon, Fingerprint, ChevronRight, Info } from 'lucide-react';

const ICONS: any = { Monitor, Cpu, HardDrive, Camera, BatteryCharging, Shield, Satellite, Car, Scan, Sun, Moon, Fingerprint };

// Added lang to the props to fix the reference error on line 30
export const WhitepaperSection = ({ t, lang, onOpenFull }: any) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="whitepaper" className="py-32 bg-neutral-950 px-6 relative overflow-hidden scroll-mt-32" aria-labelledby="whitepaper-title">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center space-x-3 px-3 py-1 bg-red-600/10 border border-red-600/30 rounded text-[10px] font-black uppercase text-red-500">
              <Binary size={12} aria-hidden="true" /> <span>{t.whitepaper.version}</span>
            </div>
            <h2 id="whitepaper-title" className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">{t.whitepaper.title}</h2>
          </div>
          <button 
            onClick={onOpenFull}
            className="flex items-center space-x-2 bg-white/5 border border-white/10 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:border-red-600 transition-all group"
            aria-label="View Full Technical Report"
          >
            <span>{lang === 'zh' ? '查看完整报告' : 'VIEW FULL REPORT'}</span>
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="lg:sticky lg:top-40 space-y-12">
            <div 
              className="relative border border-red-600/20 rounded-[3rem] p-12 glass-effect overflow-hidden cursor-pointer group" 
              onClick={onOpenFull}
              role="button"
              aria-label="Enlarge Model Pi Blueprint"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent animate-scan" />
              <div className="perspective-1000 rotate-slow flex justify-center py-10 transition-transform group-hover:scale-105">
                <img 
                  src="https://aka.doubaocdn.com/s/KqXq1vl32h" 
                  alt="Tesla Model Pi 3D Blueprint and Satellite Connectivity Visualization" 
                  className="w-full max-w-sm drop-shadow-[0_0_100px_rgba(232,33,39,0.15)]" 
                />
              </div>
            </div>
            <div className="flex justify-center space-x-4" role="tablist">
              {t.whitepaper.tabs.map((tab: string, idx: number) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveTab(idx)} 
                  role="tab"
                  aria-selected={activeTab === idx}
                  className={`flex-1 py-4 px-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${activeTab === idx ? 'bg-red-600 border-red-600 text-white' : 'bg-white/5 border-white/10 text-gray-500'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-10">
            {activeTab === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6" role="tabpanel">
                {t.whitepaper.specs.map((spec: any, i: number) => {
                  const Icon = ICONS[spec.icon] || Info;
                  return (
                    <article key={i} className="bg-white/[0.03] border border-white/5 p-8 rounded-3xl hover:bg-white/[0.05] transition-all group">
                      <div className="flex items-center space-x-2 mb-3 text-red-500">
                        <Icon size={16} aria-hidden="true" />
                        <h3 className="text-[10px] font-black uppercase text-gray-500">{spec.label}</h3>
                      </div>
                      <div className="text-xl font-black uppercase mb-1">{spec.value}</div>
                      <p className="text-xs text-gray-500 font-mono">{spec.detail}</p>
                    </article>
                  );
                })}
              </div>
            )}
            {activeTab === 1 && (
              <div className="space-y-6" role="tabpanel">
                {t.whitepaper.sellingPoints.map((point: any, i: number) => (
                  <article key={i} className="group flex items-start space-x-8 bg-white/[0.02] border border-white/5 p-10 rounded-[2.5rem] hover:bg-white/[0.04]">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-2xl font-black uppercase tracking-tighter">{point.title}</h3>
                        <span className="px-2 py-0.5 bg-red-600/10 border border-red-600/30 text-[9px] font-black uppercase text-red-500 rounded">{point.meta}</span>
                      </div>
                      <p className="text-gray-400 leading-relaxed text-sm">{point.desc}</p>
                    </div>
                  </article>
                ))}
              </div>
            )}
            {activeTab === 2 && (
              <div className="grid grid-cols-1 gap-8" role="tabpanel">
                {t.whitepaper.future.map((fut: any, i: number) => {
                  const Icon = ICONS[fut.icon];
                  return (
                    <article key={i} className="p-12 rounded-[3.5rem] glass-effect border-red-600/10 text-center space-y-8">
                      {Icon && <Icon size={48} className="mx-auto text-red-600 mb-2" aria-hidden="true" />}
                      <h3 className="text-3xl font-black uppercase tracking-tighter">{fut.title}</h3>
                      <p className="text-gray-500 leading-relaxed max-w-md mx-auto">{fut.desc}</p>
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
