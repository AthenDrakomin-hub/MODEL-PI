
import React from 'react';
import { Zap, Globe, Activity, Car, Smartphone } from 'lucide-react';

export const HeroSection = ({ t, stats, onOrder, theme }: any) => (
  <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label="Hero Section">
    {/* 视频背景 */}
    <div className="absolute inset-0 z-0 overflow-hidden">
      <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-40 scale-105 brightness-[0.4]" aria-hidden="true">
        <source src="https://aka.doubaocdn.com/s/qmVZ1vl33S" type="video/mp4" />
      </video>
      <div className={`absolute inset-0 transition-opacity duration-1000 ${theme === 'midnight' ? 'bg-gradient-to-b from-black/70 via-transparent to-black' : 'bg-gradient-to-b from-white/60 via-transparent to-white/90'}`} />
    </div>
    
    <div className="relative z-20 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-32 pb-16">
      
      {/* 左侧文字 */}
      <div className="text-left space-y-10">
         <div className="inline-flex items-center gap-3 px-6 py-2 bg-red-600/10 border border-red-600/40 rounded-full">
            <Zap size={14} className="text-red-500 animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-widest text-red-500">Tesla Ecosystem Native</span>
         </div>
         
         <h1 className={`text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85] text-glow-white ${theme === 'midnight' ? 'text-white' : 'text-black'}`}>
            The Ultimate <br/><span className="text-red-600 text-glow">Upgrade.</span>
         </h1>
         
         <p className={`text-lg md:text-2xl font-medium max-w-xl leading-relaxed ${theme === 'midnight' ? 'text-gray-200' : 'text-gray-700'}`}>
            {t.hero.subtitle}
          </p>

          <div className="flex flex-wrap gap-6 pt-4">
             <button 
              onClick={onOrder} 
              className="px-12 py-6 bg-red-600 text-white text-xs font-black uppercase tracking-[0.3em] rounded-full hover:bg-white hover:text-black transition-all shadow-4xl active:scale-95 border border-red-500/50"
            >
              {t.hero.orderNow}
            </button>
            <button className={`px-12 py-6 border rounded-full text-xs font-black uppercase tracking-[0.3em] transition-all ${theme === 'midnight' ? 'border-white/20 hover:bg-white/10 text-white' : 'border-black/10 hover:bg-black/5 text-black'}`}>
               Watch Reveal
            </button>
          </div>
      </div>

      {/* 右侧：真机画面 */}
      <div className="relative hidden lg:flex justify-center items-center">
         <div className="absolute w-[600px] h-[600px] bg-red-600/20 blur-[120px] rounded-full" />
         
         <div className="relative w-[340px] h-[700px] bg-[#0a0a0a] rounded-[4rem] p-3 border-[3.5px] border-white/20 shadow-[0_50px_100px_rgba(0,0,0,0.9)] rotate-[-6deg] hover:rotate-0 transition-transform duration-1000">
            <div className="relative w-full h-full bg-black rounded-[3.2rem] overflow-hidden">
               <div className="absolute inset-0 flex flex-col items-center py-20 px-8">
                  <div className="text-[10px] font-black text-white/60 tracking-[0.5em] mb-4">MODEL PI V1</div>
                  <div className="text-7xl font-black text-white tracking-tighter mb-12 drop-shadow-lg">01:15</div>
                  
                  <div className="relative w-full aspect-[9/16] mt-4">
                     <img 
                        src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=600" 
                        className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                        alt="Tesla Car"
                     />
                     <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent h-1 w-full animate-scan" />
                  </div>

                  <div className="mt-auto flex flex-col items-center gap-4">
                     <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-2xl border border-red-500">
                        <Car className="text-white" size={24} />
                     </div>
                     <div className="text-[10px] font-black text-white/80 uppercase tracking-widest drop-shadow-md">Hold to Summon</div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  </section>
);
