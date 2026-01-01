
import React, { useState, useEffect, useMemo } from 'react';
import { TRANSLATIONS } from './translations';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { WhitepaperSection } from './components/WhitepaperSection';
import { WhitepaperDetail } from './components/WhitepaperDetail';
import { FeatureSections } from './components/FeatureSections';
import { BookingSection } from './components/BookingSection';
import { VideoShowcase } from './components/VideoShowcase';
import { ComparisonSection } from './components/ComparisonSection';
import { DocumentModal, CheckoutModal, FeedbackModal } from './components/Modals';
import { SubscriberPortal } from './components/SubscriberPortal';
import { PrivacyStatementDetail } from './components/PrivacyStatementDetail';
import { LegalAgreementDetail } from './components/LegalAgreementDetail';
import { StarlinkTreatyDetail } from './components/StarlinkTreatyDetail';
import { PioneerPlanDetail } from './components/PioneerPlanDetail';
import { SupportedLang } from './types';
import { MessageSquare, X, Send, Cpu, Loader2 } from 'lucide-react';
import { chatWithAssistant } from './services/geminiService';

// ----------------------------------------------------------------
// 全局固定配置：定义唯一的截止日期 (BATCH 01 结束时间)
// 已根据用户要求更新为 2026年1月31日
// ----------------------------------------------------------------
const GLOBAL_LAUNCH_DATE = new Date('2026-01-31T23:59:59Z').getTime();
const GLOBAL_START_DATE = new Date('2025-01-01T00:00:00Z').getTime();
const VIRTUAL_DB_KEY = 'MODEL_PI_CORE_DATA_V2';
const TARGET_BOOKINGS = 1000000;
const INITIAL_BOOKINGS = 924512;

export default function App() {
  const [lang, setLang] = useState<SupportedLang>('zh');
  const [theme, setTheme] = useState<'midnight' | 'solar'>('midnight');
  const [scrolled, setScrolled] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showPortal, setShowPortal] = useState(false);
  const [showFeatureExplorer, setShowFeatureExplorer] = useState(false);
  const [activeDoc, setActiveDoc] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [isInitializing, setIsInitializing] = useState(true);

  // 虚拟数据库状态：endTime 现在是常量，不再随机生成
  const [dbData, setDbData] = useState<{
    endTime: number;
    isPaid: boolean;
    pioneerId: string | null;
    initialBookings: number;
    joinedAt: number | null;
  }>({
    endTime: GLOBAL_LAUNCH_DATE,
    isPaid: false,
    pioneerId: null,
    initialBookings: INITIAL_BOOKINGS,
    joinedAt: null
  });

  // AI 助手状态
  const [aiOpen, setAiOpen] = useState(false);
  const [aiMsg, setAiMsg] = useState('');
  const [aiChat, setAiChat] = useState<{role:'user'|'model', text:string}[]>([]);
  const [isThinking, setIsThinking] = useState(false);

  const t = useMemo(() => {
    return TRANSLATIONS[lang] || TRANSLATIONS['en'];
  }, [lang]);

  // 初始化虚拟数据库：优先使用固定日期
  useEffect(() => {
    const savedData = localStorage.getItem(VIRTUAL_DB_KEY);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setDbData({ ...parsed, endTime: GLOBAL_LAUNCH_DATE });
    } else {
      const newData = {
        endTime: GLOBAL_LAUNCH_DATE,
        isPaid: false,
        pioneerId: `PI-${Math.floor(Math.random() * 900000 + 100000)}`,
        initialBookings: INITIAL_BOOKINGS,
        joinedAt: null
      };
      setDbData(newData);
      localStorage.setItem(VIRTUAL_DB_KEY, JSON.stringify(newData));
    }
    
    setTimeout(() => setIsInitializing(false), 1500);
  }, []);

  // 统计数据：基于固定时间轴计算
  const stats = useMemo(() => {
    const totalDuration = GLOBAL_LAUNCH_DATE - GLOBAL_START_DATE;
    const elapsed = currentTime - GLOBAL_START_DATE;
    const progressFactor = Math.max(0, Math.min(1, elapsed / totalDuration));
    const booked = Math.floor(dbData.initialBookings + progressFactor * (TARGET_BOOKINGS - dbData.initialBookings));
    
    return {
      booked,
      usdt: booked * 299 * 0.3,
      activeUsers: 800 + Math.floor(Math.sin(currentTime / 3000) * 150),
      progress: (booked / TARGET_BOOKINGS) * 100,
      remaining: Math.max(0, TARGET_BOOKINGS - booked)
    };
  }, [currentTime, dbData.initialBookings]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(Date.now()), 1000);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    document.documentElement.className = theme === 'midnight' ? 'dark midnight' : 'solar';
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDoc(null);
        setShowCheckout(false);
        setShowPortal(false);
        setShowFeatureExplorer(false);
        setAiOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    
    return () => { 
      clearInterval(timer); 
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [theme]);

  const handlePaymentSuccess = () => {
    const updatedData = {
      ...dbData,
      isPaid: true,
      joinedAt: Date.now()
    };
    setDbData(updatedData);
    localStorage.setItem(VIRTUAL_DB_KEY, JSON.stringify(updatedData));
    setShowCheckout(false);
    setShowPortal(true);
  };

  const handleAiSend = async () => {
    if (!aiMsg.trim()) return;
    const userText = aiMsg;
    setAiChat(prev => [...prev, { role: 'user', text: userText }]);
    setAiMsg('');
    setIsThinking(true);
    const history = aiChat.map(msg => ({ role: msg.role, parts: [{ text: msg.text }] }));
    const response = await chatWithAssistant(userText, history as any);
    setAiChat(prev => [...prev, { role: 'model', text: response }]);
    setIsThinking(false);
  };

  const renderActiveDoc = () => {
    if (!activeDoc) return null;
    const close = () => setActiveDoc(null);
    const isPrivacy = ['隐私声明', 'Privacy', 'Privacy Policy', '隐私', 'Confidentialité', 'Privacidad', 'بيان الخصوصية', 'Приватность'].includes(activeDoc);
    const isLegal = ['服务条款', '法律协议', 'Terms', 'Legal', 'Legal Agreements', 'Hukuki', 'Юридическая инфо', 'قانوني'].includes(activeDoc);
    const isTreaty = ['星链条约', 'Starlink Treaty'].includes(activeDoc);
    const isPioneer = ['先锋计划', 'Pioneer Plan'].includes(activeDoc);
    const isWhitepaper = ['Whitepaper', '战略档案', 'STRATEGIC ARCHIVE'].includes(activeDoc);

    if (isWhitepaper) return <WhitepaperDetail onClose={close} lang={lang} />;
    if (isPrivacy) return <PrivacyStatementDetail onClose={close} lang={lang} />;
    if (isLegal) return <LegalAgreementDetail onClose={close} lang={lang} />;
    if (isTreaty) return <StarlinkTreatyDetail onClose={close} lang={lang} />;
    if (isPioneer) return <PioneerPlanDetail onClose={close} lang={lang} />;
    return <DocumentModal activeDoc={activeDoc} lang={lang} onClose={close} />;
  };

  if (isInitializing) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center space-y-6">
        <div className="relative">
          <div className="absolute inset-0 bg-red-600/20 blur-3xl animate-pulse rounded-full" />
          <Loader2 className="text-red-600 animate-spin relative z-10" size={64} />
        </div>
        <div className="text-[10px] font-black uppercase tracking-[0.5em] text-white animate-pulse">
          {t.common?.loading || 'Establishing Neural Link...'}
        </div>
      </div>
    );
  }

  const isModalActive = !!(showFeatureExplorer || showPortal || activeDoc || showCheckout);
  const isRTL = lang === 'ar';

  return (
    <div 
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`transition-colors duration-1000 overflow-x-hidden ${theme === 'midnight' ? 'bg-[#050505] text-white' : 'bg-[#f5f5f7] text-[#1d1d1f]'}`}
    >
      <Header 
        t={t} lang={lang} setLang={setLang} scrolled={scrolled} endTime={dbData.endTime} isPaid={dbData.isPaid}
        theme={theme} setTheme={setTheme}
        onOrder={() => setShowCheckout(true)} onOpenPortal={() => setShowPortal(true)}
        onOpenWhitepaper={() => setActiveDoc('Whitepaper')}
        onOpenFeatures={() => setShowFeatureExplorer(true)}
      />

      <main className="mesh-gradient min-h-screen relative z-0">
        <HeroSection t={t} stats={stats} onOrder={() => setShowCheckout(true)} theme={theme} />
        <ComparisonSection t={t} theme={theme} />
        <VideoShowcase lang={lang} theme={theme} />
        <WhitepaperSection t={t} lang={lang} onOpenFull={() => setActiveDoc('Whitepaper')} theme={theme} />
        <BookingSection t={t} stats={stats} endTime={dbData.endTime} lang={lang} onOrder={() => setShowCheckout(true)} theme={theme} />
      </main>

      <Footer t={t} onOpenDoc={setActiveDoc} theme={theme} />

      {/* AI Assistant Button */}
      <div className={`fixed bottom-8 ${isRTL ? 'left-8' : 'right-8'} z-[200]`}>
        {!aiOpen ? (
          <button 
            onClick={() => setAiOpen(true)}
            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all group border-4 ${theme === 'midnight' ? 'bg-red-600 border-black' : 'bg-white border-gray-200 text-red-600'}`}
          >
            <Cpu className="group-hover:rotate-12 transition-transform" />
            <div className={`absolute -top-1 ${isRTL ? '-left-1' : '-right-1'} w-4 h-4 bg-cyan-500 rounded-full animate-pulse border-2 border-black`} />
          </button>
        ) : (
          <div className={`w-80 md:w-96 h-[500px] glass-effect rounded-[2.5rem] border flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 ${theme === 'midnight' ? 'border-white/10' : 'border-black/5'}`}>
            <div className={`p-6 border-b flex justify-between items-center ${theme === 'midnight' ? 'border-white/5 bg-white/5' : 'border-black/5 bg-black/5'}`}>
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white"><Cpu size={16} /></div>
                 <span className="text-[10px] font-black uppercase tracking-widest">{t.common?.assistantTitle || 'T-OS Assistant'}</span>
              </div>
              <button onClick={() => setAiOpen(false)}><X size={18} /></button>
            </div>
            
            <div className="flex-grow overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {aiChat.map((chat, i) => (
                <div key={i} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-[11px] font-medium leading-relaxed ${chat.role === 'user' ? 'bg-red-600 text-white shadow-lg' : (theme === 'midnight' ? 'bg-white/5 border border-white/10 text-gray-300' : 'bg-black/5 text-gray-700')}`}>
                    {chat.text}
                  </div>
                </div>
              ))}
              {isThinking && (
                <div className="flex justify-start">
                  <div className="animate-pulse text-[10px] uppercase font-black tracking-widest text-gray-500">{t.common?.assistantThinking || 'Processing...'}</div>
                </div>
              )}
            </div>

            <div className={`p-4 border-t flex gap-2 ${theme === 'midnight' ? 'bg-black/40 border-white/5' : 'bg-white/40 border-black/5'}`}>
              <input 
                value={aiMsg}
                onChange={e => setAiMsg(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAiSend()}
                placeholder={t.common?.assistantPlaceholder || 'Ask about Model Π...'}
                className={`flex-grow border rounded-xl px-4 text-xs focus:outline-none focus:border-red-600 ${theme === 'midnight' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'}`}
              />
              <button onClick={handleAiSend} className="p-3 bg-red-600 text-white rounded-xl hover:bg-black transition-all">
                <Send size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Global Modals Layer - Render only when active */}
      {isModalActive && (
        <div className="fixed inset-0 z-[1000]" dir={isRTL ? 'rtl' : 'ltr'}>
          {showFeatureExplorer && <FeatureSections t={t} onClose={() => setShowFeatureExplorer(false)} />}
          {showPortal && <SubscriberPortal onClose={() => setShowPortal(false)} t={t} lang={lang} dbData={dbData} />}
          {renderActiveDoc()}
          {showCheckout && <CheckoutModal isOpen={showCheckout} t={t} onClose={() => setShowCheckout(false)} onPaymentSuccess={handlePaymentSuccess} />}
        </div>
      )}
    </div>
  );
}
