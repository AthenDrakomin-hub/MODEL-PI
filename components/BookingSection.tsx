
import React from 'react';
import { Clock, Users, Activity, CreditCard } from 'lucide-react';
import { CountdownTimer } from './CountdownTimer';

export const BookingSection = ({ t, stats, endTime, lang, onOrder }: any) => (
  <section id="launch" className="py-20 md:py-32 bg-black px-4 md:px-6 relative overflow-hidden scroll-mt-20 md:scroll-mt-32">
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-16 md:mb-24">
         <div className="inline-flex items-center space-x-2 px-4 py-2 bg-red-600/10 border border-red-600/30 rounded-full mb-6 md:mb-8">
            <Clock className="w-3 h-3 md:w-4 md:h-4 text-red-600 animate-pulse" />
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-red-500">GLOBAL COUNTDOWN</span>
         </div>
         <div className="flex justify-center scale-90 sm:scale-100"><CountdownTimer targetDate={endTime} lang={lang} /></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">
        <div className="space-y-10 md:space-y-16 text-center lg:text-left">
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85]">
              {t.launch.remains} <br/>
              <span className="text-red-600 text-glow">{(100 - stats.progress).toFixed(3)}%</span>
            </h2>
            <p className="text-gray-400 text-base md:text-2xl leading-relaxed max-w-xl mx-auto lg:mx-0 px-4 sm:px-0">{t.launch.desc}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 max-w-lg mx-auto lg:mx-0 px-4 sm:px-0">
            <div className="glass-effect p-6 md:p-8 rounded-2xl md:rounded-3xl border-white/5">
              <div className="flex items-center justify-center lg:justify-start space-x-3 text-red-600 mb-2 md:mb-3">
                <Users size={16} />
                <span className="text-[9px] md:text-[11px] font-black uppercase tracking-widest">ACTIVE INTENT</span>
              </div>
              <div className="text-3xl md:text-5xl font-black tracking-tighter text-white tabular-nums">{stats.activeUsers}</div>
            </div>
            <div className="glass-effect p-6 md:p-8 rounded-2xl md:rounded-3xl border-red-600/30 bg-red-600/5">
              <div className="flex items-center justify-center lg:justify-start space-x-3 text-red-500 mb-2 md:mb-3">
                <Activity size={16} />
                <span className="text-[9px] md:text-[11px] font-black uppercase tracking-widest">{t.launch.seats}</span>
              </div>
              <div className="text-3xl md:text-5xl font-black tracking-tighter text-white tabular-nums">{stats.remaining.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-32 flex justify-center w-full px-4 sm:px-0">
            <div className="glass-effect p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3.5rem] border border-white/10 shadow-2xl max-w-md w-full space-y-8 md:space-y-10">
              <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-center sm:text-left">{t.launch.lock}</h3>
              <div className="space-y-4 sm:space-y-6 bg-black/40 p-6 sm:p-8 rounded-2xl sm:rounded-3xl">
                <div className="flex justify-between items-center pb-3 sm:pb-4 border-b border-white/5">
                  <span className="text-gray-500 text-xs sm:text-sm">{t.launch.fullPrice}</span>
                  <span className="text-white font-black text-lg sm:text-xl">$299.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 font-bold text-xs sm:text-sm">{t.launch.deposit}</span>
                  <span className="text-red-600 font-black text-2xl sm:text-3xl">$89.70</span>
                </div>
              </div>
              <button 
                onClick={onOrder} 
                className="w-full py-4 sm:py-5 bg-red-600 rounded-2xl font-black uppercase text-[10px] sm:text-sm tracking-widest hover:bg-white hover:text-black transition-all active:scale-95 flex items-center justify-center space-x-3 shadow-xl"
              >
                <CreditCard size={18} /><span>{t.hero.orderNow}</span>
              </button>
            </div>
        </div>
      </div>
    </div>
  </section>
);
