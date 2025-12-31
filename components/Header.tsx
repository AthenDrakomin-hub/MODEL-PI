
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
      {/* Top Banner - Responsive heights and visibility */}
      <div className="fixed top-0 w-full z-[60] bg-red-600 text-white py-1 px-4 md:px-6 flex justify-between items-center overflow-hidden">
        <div className="flex items-center space-x-2 md:space-x-4">
          <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.1em] md:tracking-[0.2em] whitespace-nowrap">{t.hero.countdown}</span>
          <div className="h-3 w-px bg-white/30 hidden sm:block" />
          <div className="hidden lg:flex items-center space-x-1.5 opacity-80">
            <Radio size={10} className="animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-widest text-nowrap">Starlink: V3 Native Active</span>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <CountdownTimer targetDate={endTime} lang={lang} size="small" />
          {isPaid && (
             <div className="flex items-center gap-1 md:gap-2 bg-black/20 px-2 md:px-3 py-0.5 rounded-full border border-white/10">
               <Zap size={10} className="text-cyan-400" />
               <span className="text-[7px] md:text-[8px] font-black uppercase tracking-widest text-cyan-400 whitespace-nowrap">Verified</span>
             </div>
          )}
        </div>
        <div className="hidden xl:block text-[9px] font-black uppercase tracking-widest opacity-80 whitespace-nowrap">BATCH 01 · LIMITED 1M</div>
      </div>

      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 mt-6 ${scrolled ? 'glass-effect py-2 md:py-4 shadow-2xl shadow-red-600/10' : 'py-4 md:py-8'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          {/* Logo with better mobile scaling */}
          <div className="flex items-center space-x-2 md:space-x-3 cursor-pointer group shrink-0" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <ModelPiLogo className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-red-600 group-hover:scale-110 transition-transform" glow />
            <div className="flex flex-col -space-y-1">
              <span className="font-black tracking-[0.2em] md:tracking-[0.3em] text-[10px] sm:text-[12px] md:text-sm uppercase">Model</span>
              <span className="font-black tracking-[0.4em] md:tracking-[0.6em] text-[7px] sm:text-[8px] md:text-[10px] uppercase text-red-600">Pi</span>
            </div>
          </div>

          {/* Desktop Nav - Hidden on mobile */}
          <div className={`hidden md:flex items-center space-x-6 lg:space-x-10 text-[10px] lg:text-[11px] font-bold uppercase tracking-widest text-gray-400 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
            <button onClick={onOpenWhitepaper} className="hover:text-white transition-colors uppercase whitespace-nowrap">{t.nav.design}</button>
            <button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors uppercase whitespace-nowrap">{t.nav.features}</button>
            <button onClick={() => scrollToSection('specs')} className="hover:text-white transition-colors uppercase whitespace-nowrap">{t.nav.specs}</button>
            
            <div className="relative">
              <button 
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center space-x-2 text-white/50 border border-white/10 px-3 py-1.5 rounded-full hover:text-white hover:border-red-600 transition-all"
              >
                <Globe size={13} />
                <span className="font-black uppercase">{lang}</span>
                <ChevronDown size={12} className={`transition-transform duration-300 ${showLangMenu ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* Mobile/Compact Actions */}
          <div className="flex items-center gap-1.5 md:gap-3">
            <button 
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="md:hidden flex items-center justify-center text-white/50 border border-white/10 w-8 h-8 rounded-full hover:text-white active:scale-90 transition-transform"
            >
              <Globe size={14} />
            </button>
            
            {isPaid ? (
              <button 
                onClick={onOpenPortal} 
                className="bg-cyan-600 px-3 sm:px-4 md:px-8 py-1.5 md:py-2.5 rounded-full text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-cyan-900 transition-all shadow-lg shadow-cyan-600/30 active:scale-95 flex items-center gap-1.5 group"
              >
                <LayoutDashboard size={12} className="group-hover:rotate-12 transition-transform hidden xs:block" />
                <span>{t.nav.portal}</span>
              </button>
            ) : (
              <button 
                onClick={onOrder} 
                className="bg-red-600 px-4 sm:px-5 md:px-8 py-1.5 md:py-2.5 rounded-full text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-lg shadow-red-600/20 active:scale-95"
              >
                {t.nav.action}
              </button>
            )}
          </div>
        </div>

        {/* Improved Lang Menu for Mobile - Overlay style on small screens */}
        {showLangMenu && (
          <div className="absolute top-full right-4 mt-2 md:mt-4 bg-black/95 border border-white/10 rounded-2xl p-2 w-48 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300 backdrop-blur-xl grid grid-cols-1 max-h-[60vh] overflow-y-auto custom-scrollbar">
            {LANGS.map(l => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code); setShowLangMenu(false); }}
                className={`w-full text-left px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors ${lang === l.code ? 'bg-red-600 text-white' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </nav>
      
      {showLangMenu && <div className="fixed inset-0 z-40 bg-black/20" onClick={() => setShowLangMenu(false)} />}
    </>
  );
};
