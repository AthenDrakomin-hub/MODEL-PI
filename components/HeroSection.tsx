
import React from 'react';
import { TrendingUp, DollarSign, Activity, Users } from 'lucide-react';
import { ModelPiLogo } from '../Logo';

export const HeroSection = ({ t, stats, onOrder }: any) => (
  <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label="Hero Section">
    {/* Background Video with refined mobile opacity */}
    <div className="absolute inset-0 z-0 opacity-30 md:opacity-40">
      <video autoPlay muted loop playsInline className="w-full h-full object-cover" aria-hidden="true">
        <source src="https://aka.doubaocdn.com/s/qmVZ1vl33S" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
    </div>
    
    <div className="relative z-10 text-center space-y-6 sm:space-y-12 md:space-y-16 px-4 md:px-6 pt-24 sm:pt-32 pb-16 md:py-40 flex flex-col items-center w-full">
      <div className="floating w-full perspective-1000">
        <ModelPiLogo className="w-16 h-16 sm:w-28 sm:h-28 md:w-48 md:h-48 text-red-600 mx-auto mb-4 sm:mb-6" glow />
        <h1 className="sr-only">Tesla Model Pi - The Future of Satellite and Neural Communication</h1>
        <div className="text-4xl xs:text-6xl sm:text-7xl md:text-9xl lg:text-[12rem] font-black tracking-tighter leading-[0.85] select-none uppercase" aria-hidden="true">
          MODEL <span className="text-red-600 text-glow">PI</span>
        </div>
      </div>
      
      <p className="max-w-4xl mx-auto text-sm sm:text-xl md:text-3xl font-light text-gray-300 tracking-wide leading-relaxed px-2 sm:px-6">
        {t.hero.subtitle} <br className="hidden sm:block"/>
        <span className="text-white font-black block mt-2 sm:inline sm:mt-0">{t.hero.endNote}</span>
      </p>

      <button 
        onClick={onOrder} 
        className="px-10 sm:px-12 py-4 sm:py-5 bg-red-600 text-white text-[10px] sm:text-sm md:text-base font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] rounded-full hover:scale-[1.05] hover:bg-white hover:text-black transition-all duration-300 shadow-2xl active:scale-95"
        aria-label={t.hero.orderNow}
      >
        {t.hero.orderNow}
      </button>

      {/* Stats Grid - Optimized for all screens */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full max-w-5xl mx-auto mt-6 sm:mt-12">
        {[
          { icon: <TrendingUp size={14} />, label: t.marketing.totalBooked, val: stats.booked.toLocaleString(), color: "red" },
          { icon: <DollarSign size={14} />, label: t.marketing.fundsRaised, val: `$${(stats.usdt / 1000000).toFixed(1)}M`, color: "green" },
          { icon: <Activity size={14} />, label: t.launch.remains, val: `${(100 - stats.progress).toFixed(3)}%`, color: "red" },
          { icon: <Users size={14} />, label: t.marketing.activeUsers, val: stats.activeUsers, color: "blue" }
        ].map((s, i) => (
          <div key={i} className="glass-effect p-4 sm:p-6 rounded-2xl border-white/5 flex flex-col items-center sm:items-start text-center sm:text-left" role="status" aria-label={`${s.label}: ${s.val}`}>
            <div className={`text-${s.color}-500 mb-2`}>{s.icon}</div>
            <div className="text-[8px] sm:text-[10px] uppercase text-gray-500 font-bold mb-1 sm:mb-2 tracking-widest leading-none">{s.label}</div>
            <div className="text-lg sm:text-2xl font-black tabular-nums whitespace-nowrap">{s.val}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
