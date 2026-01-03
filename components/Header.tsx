
import React, { useState, useEffect } from 'react';
import { Globe, Radio, ChevronDown, Menu, X, Smartphone, Sun, Moon, ShoppingCart } from 'lucide-react';
import { ModelPiLogo } from '../Logo';
import { CountdownTimer } from './CountdownTimer';
import { CartIcon } from './CartIcon';

export const Header = ({ t, lang, setLang, theme, setTheme, scrolled, endTime, isPaid, onOrder, onOpenPortal, onOpenWhitepaper, onOpenFeatures, onOpenCart }: any) => {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);

  const tickerData = [
    "SATELLITE MESH: 14,204 ACTIVE",
    "MARS RELAY: ONLINE",
    "DOWNLINK: 14.8 GBPS",
    "GLOBAL LATENCY: 18MS",
    "NEURAL LINK: SECURE",
    "BATTERY: SOLAR CHARGING"
  ];

  useEffect(() => {
    const timer = setInterval(() => setTickerIndex(prev => (prev + 1) % tickerData.length), 3000);
    return () => clearInterval(timer);
  }, []);

  const languages = [
    { code: 'zh', label: '中文' }, { code: 'en', label: 'English' }, { code: 'ru', label: 'Русский' },
    { code: 'ja', label: '日本語' }, { code: 'ko', label: '한국어' }, { code: 'ar', label: 'العربية' }
  ];

  return (
    <header className="fixed top-0 w-full z-[100] transition-all duration-300">
      {/* Top Status Bar */}
      <div className="bg-red-600 text-white py-1 px-4 md:px-6 flex justify-between items-center overflow-hidden border-b border-white/10 shadow-lg relative z-[101]">
        <div className="flex items-center space-x-6">
          <div className="flex items-center gap-2">
            <Radio size={10} className="animate-pulse" />
            <div className="text-[9px] font-black uppercase tracking-widest h-4 overflow-hidden relative w-32 md:w-48">
              {tickerData.map((text, i) => (
                <div 
                  key={i} 
                  className={`absolute inset-0 transition-all duration-700 transform ${i === tickerIndex ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                >
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <CountdownTimer targetDate={endTime} lang={lang} size="small" />
        </div>
      </div>

      <nav className={`w-full transition-all duration-500 ${scrolled ? (theme === 'midnight' ? 'bg-black/90' : 'bg-white/95') + ' backdrop-blur-xl py-3 border-b border-white/5 shadow-2xl' : 'bg-transparent py-6 md:py-8'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <ModelPiLogo className={`transition-all duration-500 ${scrolled ? 'w-6 h-6 md:w-8 md:h-8' : 'w-10 h-10'} text-red-600`} glow={theme === 'midnight'} />
            <div className="flex flex-col">
              <span className={`font-black text-lg md:text-xl tracking-tighter leading-none ${theme === 'midnight' ? 'text-white' : 'text-black'}`}>
                MODEL <span className="text-red-600">PI</span>
              </span>
              <span className="text-[7px] font-black tracking-[0.4em] uppercase text-gray-500">PIONEER PORTAL</span>
            </div>
          </div>

          <div className={`hidden md:flex items-center space-x-8 text-[10px] font-black uppercase tracking-widest ${theme === 'midnight' ? 'text-gray-400' : 'text-gray-500'}`}>
            <button onClick={onOpenWhitepaper} className="hover:text-red-600 transition-colors">{t.nav.design}</button>
            <button onClick={onOpenFeatures} className="hover:text-red-600 transition-colors flex items-center gap-2">
              <Smartphone size={12} /> {t.nav.features}
            </button>
            
            <button onClick={() => setTheme(theme === 'midnight' ? 'solar' : 'midnight')} className="p-2 rounded-full border border-white/10 hover:bg-white/5 transition-all">
              {theme === 'midnight' ? <Sun size={14} className="text-white" /> : <Moon size={14} className="text-black" />}
            </button>

            <div className="relative">
              <button onClick={() => setShowLangMenu(!showLangMenu)} className="flex items-center space-x-2 border border-white/10 rounded-full px-4 py-1.5 hover:bg-white/5 transition-all">
                <Globe size={12} /> <span>{lang.toUpperCase()}</span>
                <ChevronDown size={10} className={showLangMenu ? 'rotate-180' : ''} />
              </button>
              {showLangMenu && (
                <div className={`absolute top-full right-0 mt-3 p-2 w-48 rounded-2xl border backdrop-blur-2xl shadow-2xl z-20 grid grid-cols-1 gap-1 ${theme === 'midnight' ? 'bg-black/95 border-white/10' : 'bg-white/95 border-black/10'}`}>
                  {languages.map(l => (
                    <button key={l.code} onClick={() => {setLang(l.code); setShowLangMenu(false);}} className={`px-4 py-2 text-[10px] font-black uppercase rounded-xl text-left ${lang === l.code ? 'bg-red-600 text-white' : 'hover:bg-white/5 text-gray-500'}`}>
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CartIcon onClick={onOpenCart} />
            <button onClick={isPaid ? onOpenPortal : onOpenCart} className="bg-red-600 rounded-full px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-white hover:bg-black transition-all shadow-xl shadow-red-600/20 active:scale-95">
              {isPaid ? t.nav.portal : '购物车'}
            </button>
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 bg-white/5 border border-white/10 rounded-xl text-white">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className={`fixed inset-0 z-[110] backdrop-blur-3xl p-8 flex flex-col justify-center items-center space-y-8 ${theme === 'midnight' ? 'bg-black/98' : 'bg-white/98'}`}>
          <button onClick={() => setMobileMenuOpen(false)} className="absolute top-8 right-8 p-3 bg-white/5 rounded-full text-white"><X size={24} /></button>
          <button onClick={() => {setMobileMenuOpen(false); onOpenWhitepaper();}} className="text-4xl font-black uppercase tracking-tighter text-white">DOCS</button>
          <button onClick={() => {setMobileMenuOpen(false); onOpenFeatures();}} className="text-4xl font-black uppercase tracking-tighter text-red-600">FEATURES</button>
          <button onClick={() => {setTheme(theme === 'midnight' ? 'solar' : 'midnight'); setMobileMenuOpen(false);}} className="text-xl font-black uppercase text-white/50 border border-white/10 px-8 py-3 rounded-2xl">Toggle Theme</button>
        </div>
      )}
    </header>
  );
};
