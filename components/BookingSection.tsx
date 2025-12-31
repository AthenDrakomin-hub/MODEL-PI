
import React from 'react';
import { Clock, Users, Activity, CreditCard } from 'lucide-react';
import { CountdownTimer } from './CountdownTimer';

export const BookingSection = ({ t, stats, endTime, lang, onOrder }: any) => (
  <section id="launch" className="py-32 bg-black px-6 relative overflow-hidden scroll-mt-32">
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-24">
         <div className="inline-flex items-center space-x-2 px-4 py-2 bg-red-600/10 border border-red-600/30 rounded-full mb-8">
            <Clock className="w-4 h-4 text-red-600 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-red-500">GLOBAL COUNTDOWN</span>
         </div>
         <div className="flex justify-center"><CountdownTimer targetDate={endTime} lang={lang} /></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <div className="space-y-16">
          <div className="space-y-6">
            <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none">{t.launch.remains} <br/><span className="text-red-600 text-glow">{(100 - stats.progress).toFixed(3)}%</span></h2>
            <p className="text-gray-400 text-2xl leading-relaxed max-w-xl">{t.launch.desc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-effect p-8 rounded-3xl border-white/5">
              <div className="flex items-center space-x-3 text-red-600 mb-3"><Users size={20} /><span className="text-[11px] font-black uppercase tracking-widest">ACTIVE INTENT</span></div>
              <div className="text-5xl font-black tracking-tighter text-white tabular-nums">{stats.activeUsers}</div>
            </div>
            <div className="glass-effect p-8 rounded-3xl border-red-600/30 bg-red-600/5">
              <div className="flex items-center space-x-3 text-red-500 mb-3"><Activity size={20} /><span className="text-[11px] font-black uppercase tracking-widest">{t.launch.seats}</span></div>
              <div className="text-5xl font-black tracking-tighter text-white tabular-nums">{stats.remaining.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-32 flex justify-center">
            <div className="glass-effect p-12 rounded-[3.5rem] border border-white/10 shadow-2xl max-w-md w-full space-y-10">
              <h3 className="text-4xl font-black uppercase tracking-tighter">{t.launch.lock}</h3>
              <div className="space-y-6 bg-black/40 p-8 rounded-3xl">
                <div className="flex justify-between items-center pb-4 border-b border-white/5"><span className="text-gray-500 text-sm">{t.launch.fullPrice}</span><span className="text-white font-black text-xl">$299.00</span></div>
                <div className="flex justify-between items-center"><span className="text-gray-300 font-bold text-sm">{t.launch.deposit}</span><span className="text-red-600 font-black text-3xl">$89.70</span></div>
              </div>
              <button onClick={onOrder} className="w-full py-5 bg-red-600 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center space-x-3">
                <CreditCard size={18} /><span>{t.hero.orderNow}</span>
              </button>
            </div>
        </div>
      </div>
    </div>
  </section>
);
