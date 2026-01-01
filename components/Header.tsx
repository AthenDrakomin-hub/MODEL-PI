
import React, { useState } from 'react';
import { Globe, Radio, ChevronDown, Menu, X, Smartphone, Sun, Moon } from 'lucide-react';
import { ModelPiLogo } from '../Logo';
import { CountdownTimer } from './CountdownTimer';

export const Header = ({ t, lang, setLang, theme, setTheme, scrolled, endTime, isPaid, onOrder, onOpenPortal, onOpenWhitepaper, onOpenFeatures }: any) => {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const languages = [
    { code: 'zh', label: '中文' },
    { code: 'en', label: 'English' },
    { code: 'ru', label: 'Русский' },
    { code: 'ja', label: '日本語' },
    { code: 'ko', label: '한국어' },
    { code: 'de', label: 'Deutsch' },
    { code: 'fr', label: 'Français' },
    { code: 'es', label: 'Español' },
    { code: 'ar', label: 'العربية' },
    { code: 'it', label: 'Italiano' },
    { code: 'pt', label: 'Português' },
    { code: 'nl', label: 'Nederlands' },
    { code: 'tr', label: 'Türkçe' },
    { code: 'pl', label: 'Polski' },
    { code: 'sv', label: 'Svenska' }
  ];

  return (
    <header className="fixed top-0 w-full z-[100] transition-all duration-300">
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
        </div>
      </div>

      <nav className={`w-full transition-all duration-500 ${scrolled ? (theme === 'midnight' ? 'bg-black/85' : 'bg-white/90') + ' backdrop-blur-3xl py-2 md:py-3 border-b border-white/5' : 'bg-transparent py-4 md:py-8'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          <div 
            className="flex items-center space-x-2 md:space-x-4 cursor-pointer group shrink-0" 
            onClick={() => window.scrollTo({top:0, behavior:'smooth'})}
          >
            <ModelPiLogo 
              className={`transition-all duration-500 ${scrolled ? 'w-6 h-6 md:w-8 md:h-8' : 'w-8 h-8 md:w-11 md:h-11'} text-red-600`} 
              glow={theme === 'midnight'} 
            />
            <div className={`flex flex-col items-start transition-all duration-500 ${scrolled ? 'scale-90 origin-left opacity-90' : 'scale-100'}`}>
              <span className={`font-black text-xs md:text-xl tracking-tighter leading-none flex items-baseline ${theme === 'midnight' ? 'text-white' : 'text-black'}`}>
                MODEL <span className="text-red-600 ml-1">PI</span>
              </span>
              {!scrolled && (
                <span className={`text-[6px] md:text-[7px] font-black tracking-[0.4em] uppercase leading-none mt-1 group-hover:text-red-500/50 transition-colors ${theme === 'midnight' ? 'text-gray-500' : 'text-gray-400'}`}>
                  PIONEER GATEWAY
                </span>
              )}
            </div>
          </div>

          <div className={`hidden md:flex items-center space-x-6 lg:space-x-10 text-[9px] lg:text-[10px] font-black uppercase tracking-widest ${theme === 'midnight' ? 'text-gray-400' : 'text-gray-500'}`}>
            <button onClick={onOpenWhitepaper} className="hover:text-red-600 transition-colors">{t.nav.design}</button>
            <button onClick={onOpenFeatures} className="hover:text-red-600 transition-colors flex items-center gap-2">
              <Smartphone size={12} />
              {t.nav.features}
            </button>
            
            {/* 主题切换按钮 */}
            <button 
              onClick={() => setTheme(theme === 'midnight' ? 'solar' : 'midnight')}
              className={`p-2 rounded-full border transition-all ${theme === 'midnight' ? 'border-white/10 text-white hover:bg-white/5' : 'border-black/10 text-black hover:bg-black/5'}`}
              title={theme === 'midnight' ? 'Solar Mode' : 'Midnight Mode'}
            >
              {theme === 'midnight' ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            <div className="relative">
              <button 
                onClick={() => setShowLangMenu(!showLangMenu)} 
                className={`flex items-center space-x-2 border rounded-full px-3 py-1.5 transition-all ${theme === 'midnight' ? 'text-white/50 border-white/10 hover:text-white' : 'text-black/50 border-black/10 hover:text-black'}`}
              >
                <Globe size={12} />
                <span>{lang.toUpperCase()}</span>
                <ChevronDown size={10} className={`transition-transform duration-300 ${showLangMenu ? 'rotate-180' : ''}`} />
              </button>
              
              {showLangMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowLangMenu(false)} />
                  <div className={`absolute top-full right-0 mt-3 border rounded-2xl p-2 w-[calc(100vw-2rem)] md:w-[420px] backdrop-blur-3xl shadow-2xl z-20 animate-in fade-in slide-in-from-top-2 ${theme === 'midnight' ? 'bg-black/95 border-white/10' : 'bg-white/95 border-black/10'}`}>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                      {languages.map(l => (
                        <button 
                          key={l.code} 
                          onClick={() => {setLang(l.code); setShowLangMenu(false);}} 
                          className={`flex flex-col items-start px-4 py-3 text-[9px] font-black uppercase rounded-xl transition-all ${lang === l.code ? 'bg-red-600 text-white' : (theme === 'midnight' ? 'hover:bg-white/5 text-gray-500' : 'hover:bg-black/5 text-gray-400')}`}
                        >
                          <span className="leading-none">{l.label}</span>
                          <span className="text-[7px] opacity-40 mt-1">{l.code.toUpperCase()}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {isPaid ? (
              <button onClick={onOpenPortal} className="bg-cyan-600 rounded-full px-4 py-2 text-[9px] font-black uppercase tracking-widest text-white hover:bg-white hover:text-cyan-900 transition-all">
                {t.nav.portal}
              </button>
            ) : (
              <button onClick={onOrder} className="bg-red-600 rounded-full px-4 md:px-5 py-2 text-[9px] font-black uppercase tracking-widest text-white hover:bg-black transition-all shadow-lg shadow-red-600/20">
                {t.nav.action}
              </button>
            )}
            <button onClick={() => setMobileMenuOpen(true)} className={`md:hidden p-2 border rounded-xl ${theme === 'midnight' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className={`fixed inset-0 z-[110] backdrop-blur-3xl p-6 md:p-8 pt-20 md:pt-24 overflow-y-auto ${theme === 'midnight' ? 'bg-black/98' : 'bg-white/98'}`}>
          <button onClick={() => setMobileMenuOpen(false)} className={`absolute top-6 md:top-8 right-6 md:right-8 p-3 rounded-full ${theme === 'midnight' ? 'bg-white/5' : 'bg-black/5'}`}><X size={24} /></button>
          <div className="flex flex-col space-y-6 md:space-y-8 text-center mt-6 md:mt-10">
            <button onClick={() => {setMobileMenuOpen(false); onOpenWhitepaper();}} className="text-3xl sm:text-4xl font-black uppercase tracking-tighter">{t.nav.design}</button>
            <button onClick={() => {setMobileMenuOpen(false); onOpenFeatures();}} className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-red-600">{t.nav.features}</button>
            
            <button 
              onClick={() => {setTheme(theme === 'midnight' ? 'solar' : 'midnight'); setMobileMenuOpen(false);}}
              className="text-lg sm:text-xl font-black uppercase tracking-widest py-4 border border-red-600/20 rounded-2xl"
            >
              {theme === 'midnight' ? 'Switch to Solar Mode' : 'Switch to Midnight Mode'}
            </button>

            <div className={`h-px w-full ${theme === 'midnight' ? 'bg-white/10' : 'bg-black/10'}`} />
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mt-4 pb-12">
              {languages.map(l => (
                <button 
                  key={l.code} 
                  onClick={() => {setLang(l.code); setMobileMenuOpen(false);}} 
                  className={`py-3 md:py-4 rounded-xl md:rounded-2xl border ${lang === l.code ? 'border-red-600 text-red-600 bg-red-600/5' : (theme === 'midnight' ? 'border-white/10 text-white/50' : 'border-black/10 text-black/50')} text-[9px] md:text-[10px] font-black uppercase tracking-widest`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
