
import React, { useState } from 'react';
import { Globe, Radio, ChevronDown, LayoutDashboard, Zap, Menu, X } from 'lucide-react';
import { ModelPiLogo } from '../Logo';
import { CountdownTimer } from './CountdownTimer';

// Global JSX augmentation for the Stripe custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'pricing-table-id': string;
        'publishable-key': string;
      };
    }
  }
}

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

export const Header = ({ t, lang, setLang, scrolled, endTime, isPaid, onOrder, onOpenPortal, onOpenFeedback, onOpenWhitepaper }: any) => {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 w-full z-[100] transition-all duration-300">
      {/* Top Banner */}
      <div className="bg-red-600 text-white py-1.5 px-4 md:px-6 flex justify-between items-center overflow-hidden border-b border-white/10 shadow-lg relative z-[101]">
        <div className="flex items-center space-x-2 md:space-x-4">
          <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.1em] md:tracking-[0.2em] whitespace-nowrap">{t.hero.countdown}</span>
          <div className="h-3 w-px bg-white/30 hidden sm:block" />
          <div className="hidden lg:flex items-center space-x-1.5 opacity-80">
            <Radio size={10} className="animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-widest whitespace-nowrap">Starlink: V3 Native Active</span>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <CountdownTimer targetDate={endTime} lang={lang} size="small" />
          {isPaid && (
             <div className="flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded-full border border-white/10">
               <Zap size={10} className="text-cyan-400" />
               <span className="text-[7px] font-black uppercase tracking-widest text-cyan-400">Verified</span>
             </div>
          )}
        </div>
      </div>

      {/* Main Navigation */}
      <nav 
        className={`w-full transition-all duration-500 ease-in-out ${
          scrolled 
            ? 'bg-black/40 backdrop-blur-2xl py-2 md:py-3 border-b border-white/5 shadow-2xl shadow-red-600/10' 
            : 'bg-transparent py-4 md:py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center space-x-2 md:space-x-3 cursor-pointer group shrink-0" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <ModelPiLogo className={`transition-all duration-500 ${scrolled ? 'w-6 h-6 md:w-8 md:h-8' : 'w-8 h-8 md:w-10 md:h-10'} text-red-600 group-hover:scale-110`} glow />
            <div className="flex flex-col -space-y-0.5 md:-space-y-1">
              <span className={`font-black uppercase tracking-[0.1em] md:tracking-[0.3em] transition-all duration-500 ${scrolled ? 'text-[10px] md:text-xs' : 'text-xs md:text-sm'}`}>Model</span>
              <span className={`font-black uppercase tracking-[0.3em] md:tracking-[0.6em] text-red-600 transition-all duration-500 ${scrolled ? 'text-[7px] md:text-[9px]' : 'text-[8px] md:text-[10px]'}`}>Pi</span>
            </div>
          </div>

          <div className={`hidden md:flex items-center space-x-6 lg:space-x-10 text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-gray-400 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
            <button onClick={onOpenWhitepaper} className="hover:text-white transition-colors">{t.nav.design}</button>
            <button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">{t.nav.features}</button>
            <button onClick={() => scrollToSection('specs')} className="hover:text-white transition-colors">{t.nav.specs}</button>
            
            <div className="relative">
              <button 
                onClick={() => setShowLangMenu(!showLangMenu)}
                className={`flex items-center space-x-2 text-white/50 border border-white/10 rounded-full hover:text-white hover:border-red-600 transition-all ${scrolled ? 'px-2 py-1' : 'px-3 py-1.5'}`}
              >
                <Globe size={12} />
                <span className="font-black">{lang}</span>
                <ChevronDown size={10} className={`transition-transform duration-300 ${showLangMenu ? 'rotate-180' : ''}`} />
              </button>
              
              {showLangMenu && (
                <div className="absolute top-full right-0 mt-2 bg-black/95 border border-white/10 rounded-xl p-1 w-40 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 backdrop-blur-xl max-h-[400px] overflow-y-auto custom-scrollbar">
                  {LANGS.map(l => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setShowLangMenu(false); }}
                      className={`w-full text-left px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-colors ${lang === l.code ? 'bg-red-600 text-white' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {isPaid ? (
              <button 
                onClick={onOpenPortal} 
                className={`bg-cyan-600 rounded-full font-black uppercase tracking-widest hover:bg-white hover:text-cyan-900 transition-all shadow-lg shadow-cyan-600/30 active:scale-95 flex items-center gap-1.5 ${scrolled ? 'px-3 md:px-5 py-1.5 text-[8px] md:text-[9px]' : 'px-4 md:px-7 py-2 md:py-3 text-[9px] md:text-[10px]'}`}
              >
                <LayoutDashboard size={12} className="hidden xs:block" />
                <span>{t.nav.portal}</span>
              </button>
            ) : (
              <button 
                onClick={onOrder} 
                className={`bg-red-600 rounded-full font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-lg shadow-red-600/20 active:scale-95 ${scrolled ? 'px-4 md:px-5 py-1.5 text-[8px] md:text-[9px]' : 'px-5 md:px-8 py-2 md:py-3 text-[9px] md:text-[10px]'}`}
              >
                {t.nav.action}
              </button>
            )}

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-white/70 hover:text-white bg-white/5 border border-white/10 rounded-lg active:scale-90 transition-transform"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[110] bg-black/98 backdrop-blur-2xl animate-in slide-in-from-right duration-500 flex flex-col p-8 pt-24">
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-8 right-8 p-3 bg-white/5 border border-white/10 rounded-full"
          >
            <X size={24} />
          </button>
          <div className="flex flex-col space-y-8 text-center mt-10">
            {[
              { label: t.nav.design, action: onOpenWhitepaper },
              { label: t.nav.features, action: () => scrollToSection('features') },
              { label: t.nav.specs, action: () => scrollToSection('specs') },
            ].map((item, i) => (
              <button key={i} onClick={item.action} className="text-4xl font-black uppercase tracking-tighter hover:text-red-600 transition-colors">
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
