
import React from 'react';
import { Zap, Car } from 'lucide-react';

export const HeroSection = ({ t, onOrder, theme }: any) => (
  <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label="Hero Section">
    {/* 视频背景 - Cinematic Starlink/Space background */}
    <div className="absolute inset-0 z-0 overflow-hidden">
      <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        poster="https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80&w=1200"
        className="w-full h-full object-cover opacity-40 scale-105 brightness-[0.4]" 
        aria-hidden="true"
      >
        <source src="https://aka.doubaocdn.com/s/qmVZ1vl33S" type="video/mp4" />
      </video>
      <div className={`absolute inset-0 transition-opacity duration-1000 ${theme === 'midnight' ? 'bg-gradient-to-b from-black/70 via-transparent to-black' : 'bg-gradient-to-b from-white/60 via-transparent to-white/90'}`} />
    </div>
    
    <div className="relative z-20 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-24 md:pt-32 pb-16">
      
      {/* 左侧文字 */}
      <div className="text-left space-y-6 md:space-y-10">
         <div className="inline-flex items-center gap-3 px-4 md:px-6 py-2 bg-red-600/10 border border-red-600/40 rounded-full">
            <Zap className="text-red-500 animate-pulse w-3 h-3 md:w-4 md:h-4" />
            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-red-500">Tesla Ecosystem Native</span>
         </div>
         
         <h1 className={`text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85] text-glow-white ${theme === 'midnight' ? 'text-white' : 'text-black'}`}>
            The Ultimate <br/><span className="text-red-600 text-glow">Upgrade.</span>
         </h1>
         
         <p className={`text-base md:text-xl lg:text-2xl font-medium max-w-xl leading-relaxed ${theme === 'midnight' ? 'text-gray-200' : 'text-gray-700'}`}>
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-4">
             <button 
              onClick={onOrder} 
              className="w-full sm:w-auto px-8 md:px-12 py-5 md:py-6 bg-red-600 text-white text-[10px] md:text-xs font-black uppercase tracking-[0.3em] rounded-full hover:bg-white hover:text-black transition-all shadow-4xl active:scale-95 border border-red-500/50"
            >
              {t.hero.orderNow}
            </button>
            <button className={`w-full sm:w-auto px-8 md:px-12 py-5 md:py-6 border rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.3em] transition-all ${theme === 'midnight' ? 'border-white/20 hover:bg-white/10 text-white' : 'border-black/10 hover:bg-black/5 text-black'}`}>
               Watch Reveal
            </button>
          </div>
      </div>

      {/* 右侧：真机画面 - Enhanced with Video Screen */}
      <div className="relative flex justify-center items-center lg:flex">
         <div className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-red-600/20 blur-[80px] md:blur-[120px] rounded-full" />
         
         <div className="relative w-[280px] sm:w-[320px] md:w-[340px] h-[580px] sm:h-[650px] md:h-[700px] bg-[#0a0a0a] rounded-[3.5rem] md:rounded-[4rem] p-2 md:p-3 border-[3px] md:border-[3.5px] border-white/20 shadow-[0_50px_100px_rgba(0,0,0,0.9)] rotate-[-3deg] md:rotate-[-6deg] hover:rotate-0 transition-transform duration-1000 group">
            <div className="relative w-full h-full bg-black rounded-[2.8rem] md:rounded-[3.2rem] overflow-hidden">
               <div className="absolute inset-0 flex flex-col items-center py-12 md:py-20 px-6 md:px-8">
                  <div className="text-[9px] md:text-[10px] font-black text-white/60 tracking-[0.5em] mb-4">MODEL PI V1</div>
                  <div className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 md:mb-12 drop-shadow-lg">01:15</div>
                  
                  {/* Phone Screen: Dynamic Video Content */}
                  <div className="relative w-full aspect-[9/16] mt-4 rounded-2xl md:rounded-3xl overflow-hidden bg-neutral-900 border border-white/5">
                     <video 
                        autoPlay 
                        muted 
                        loop 
                        playsInline 
                        poster="https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=600"
                        className="w-full h-full object-cover brightness-110 contrast-110"
                        aria-label="Model Pi Ecosystem Demo"
                     >
                        <source src="https://aka.doubaocdn.com/s/qmVZ1vl33S" type="video/mp4" />
                     </video>
                     {/* Dynamic scanning overlay */}
                     <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent h-2 w-full animate-scan" />
                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
                  </div>

                  <div className="mt-auto flex flex-col items-center gap-3 md:gap-4">
                     <div className="w-10 h-10 md:w-14 md:h-14 bg-red-600 rounded-full flex items-center justify-center shadow-2xl border border-red-500 group-hover:scale-110 transition-transform duration-500">
                        <Car className="text-white w-5 h-5 md:w-6 md:h-6" />
                     </div>
                     <div className="text-[9px] md:text-[10px] font-black text-white/80 uppercase tracking-widest drop-shadow-md">Hold to Summon</div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  </section>
);
