
import React from 'react';
import { TrendingUp, DollarSign, Activity, Users } from 'lucide-react';
import { ModelPiLogo } from '../Logo';

export const HeroSection = ({ t, stats, onOrder }: any) => (
  <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden" aria-label="Hero Section">
    <div className="absolute inset-0 z-0 opacity-40">
      <video autoPlay muted loop playsInline className="w-full h-full object-cover" aria-hidden="true">
        <source src="https://aka.doubaocdn.com/s/qmVZ1vl33S" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
    </div>
    
    <div className="relative z-10 text-center space-y-16 px-6 pt-20">
      <div className="floating">
        <ModelPiLogo className="w-32 h-32 md:w-48 md:h-48 text-red-600 mx-auto mb-6" glow />
        {/* Descriptive H1 for SEO, visually styled as requested */}
        <h1 className="sr-only">Tesla Model Pi - The Future of Satellite and Neural Communication</h1>
        <div className="text-7xl md:text-[12rem] font-black tracking-tighter leading-none" aria-hidden="true">
          MODEL <span className="text-red-600 text-glow">PI</span>
        </div>
      </div>
      
      <p className="max-w-4xl mx-auto text-xl md:text-3xl font-light text-gray-300 tracking-wide">
        {t.hero.subtitle} <br/>
        <span className="text-white font-black">{t.hero.endNote}</span>
      </p>

      <button 
        onClick={onOrder} 
        className="px-12 py-5 bg-red-600 text-white font-black uppercase tracking-[0.3em] rounded-full hover:scale-[1.02] hover:bg-white hover:text-black transition-all duration-300 shadow-2xl"
        aria-label={t.hero.orderNow}
      >
        {t.hero.orderNow}
      </button>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto pt-10">
        {[
          { icon: <TrendingUp size={16} />, label: t.marketing.totalBooked, val: stats.booked.toLocaleString(), color: "red" },
          { icon: <DollarSign size={16} />, label: t.marketing.fundsRaised, val: `$${(stats.usdt / 1000000).toFixed(1)}M`, color: "green" },
          { icon: <Activity size={16} />, label: t.launch.remains, val: `${(100 - stats.progress).toFixed(3)}%`, color: "red" },
          { icon: <Users size={16} />, label: t.marketing.activeUsers, val: stats.activeUsers, color: "blue" }
        ].map((s, i) => (
          <div key={i} className="glass-effect p-6 rounded-3xl border-white/5" role="status" aria-label={`${s.label}: ${s.val}`}>
            <div className={`text-${s.color}-500 mb-1`}>{s.icon}</div>
            <div className="text-[10px] uppercase text-gray-500 font-bold mb-2">{s.label}</div>
            <div className="text-2xl font-black tabular-nums">{s.val}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
