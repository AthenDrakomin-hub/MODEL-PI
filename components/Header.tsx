
import React, { useState } from 'react';
import { Globe, Radio, ChevronDown, LayoutDashboard, Zap } from 'lucide-react';
import { ModelPiLogo } from '../Logo';
import { CountdownTimer } from './CountdownTimer';

const LANGS = [
  { code: 'zh', label: '中文' },
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'ar', label: 'العربية' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'es', label: 'Español' },
  { code: 'it', label: 'Italiano' },
  { code: 'pt', label: 'Português' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'pl', label: 'Polski' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'sv', label: 'Svenska' }
];

export const Header = ({ t, lang, setLang, scrolled, endTime, isPaid, onOrder, onOpenPortal, onOpenWhitepaper }: any) => {
  const [showLangMenu, setShowLangMenu] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="fixed top-0 w-full z-[60] bg-red-600 text-white py-1 px-6 flex justify-between items-center overflow-hidden">
        <div className="flex items-center space-x-4">
          <span className="text-[9px] font-black uppercase tracking-[0.2em]">{t.hero.countdown}</span>
          <div className="h-3 w-px bg-white/30 hidden md:block" />
          <div className="hidden md:flex items-center space-x-1.5 opacity-80">
            <Radio size={10} className="animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-widest">Starlink: V3 Native Active</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <CountdownTimer targetDate={endTime} lang={lang} size="small" />
          {isPaid && (
             <div className="hidden lg:flex items-center gap-2 bg-black/20 px-3 py-0.5 rounded-full border border-white/10">
               <Zap size={10} className="text-cyan-400" />
               <span className="text-[8px] font-black uppercase tracking-widest text-cyan-400">Pioneer ID Verified</span>
             </div>
          )}
        </div>
        <div className="hidden md:block text-[9px] font-black uppercase tracking-widest opacity-80">BATCH 01 · LIMITED 1M</div>
      </div>

      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 mt-6 ${scrolled ? 'glass-effect py-4 shadow-2xl shadow-red-600/10' : 'py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <ModelPiLogo className="w-8 h-8 text-red-600 group-hover:scale-110 transition-transform" glow />
            <div className="flex flex-col -space-y-1">
              <span className="font-black tracking-[0.3em] text-sm uppercase">Model</span>
              <span className="font-black tracking-[0.6em] text-[10px] uppercase text-red-600">Pi</span>
            </div>
          </div>

          <div className={`hidden md:flex items-center space-x-10 text-[11px] font-bold uppercase tracking-widest text-gray-400 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
            <button onClick={onOpenWhitepaper} className="hover:text-white transition-colors uppercase">{t.nav.design}</button>
            <button 
              onClick={() => scrollToSection('features')} 
              className="hover:text-white transition-colors uppercase"
            >
              {t.nav.features}
            </button>
            <button 
              onClick={() => scrollToSection('specs')} 
              className="hover:text-white transition-colors uppercase"
            >
              {t.nav.specs}
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center space-x-2 text-white/50 border border-white/10 px-4 py-1.5 rounded-full hover:text-white hover:border-red-600 transition-all"
              >
                <Globe size={14} />
                <span className="font-black uppercase">{lang}</span>
                <ChevronDown size={12} className={`transition-transform duration-300 ${showLangMenu ? 'rotate-180' : ''}`} />
              </button>
              
              {showLangMenu && (
                <div className="absolute top-full right-0 mt-4 bg-black/95 border border-white/10 rounded-2xl p-2 w-44 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300 backdrop-blur-xl grid grid-cols-1 max-h-64 overflow-y-auto custom-scrollbar">
                  {LANGS.map(l => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setShowLangMenu(false); }}
                      className={`w-full text-left px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors ${lang === l.code ? 'bg-red-600 text-white' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {isPaid ? (
            <button 
              onClick={onOpenPortal} 
              className="bg-cyan-600 px-8 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-cyan-900 transition-all shadow-lg shadow-cyan-600/30 active:scale-95 flex items-center gap-2 group"
            >
              <LayoutDashboard size={14} className="group-hover:rotate-12 transition-transform" />
              {t.nav.portal}
            </button>
          ) : (
            <button 
              onClick={onOrder} 
              className="bg-red-600 px-8 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-lg shadow-red-600/20 active:scale-95"
            >
              {t.nav.action}
            </button>
          )}
        </div>
      </nav>
      
      {showLangMenu && <div className="fixed inset-0 z-40" onClick={() => setShowLangMenu(false)} />}
    </>
  );
};
