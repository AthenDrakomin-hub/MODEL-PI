
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
import { DocumentModal, CheckoutModal } from './components/Modals';
import { SubscriberPortal } from './components/SubscriberPortal';
import { PrivacyStatementDetail } from './components/PrivacyStatementDetail';
import { LegalAgreementDetail } from './components/LegalAgreementDetail';
import { StarlinkTreatyDetail } from './components/StarlinkTreatyDetail';
import { PioneerPlanDetail } from './components/PioneerPlanDetail';
import { SupportedLang } from './types';
import { Loader2 } from 'lucide-react';

const GLOBAL_LAUNCH_DATE = new Date('2026-01-31T23:59:59Z').getTime();
const GLOBAL_START_DATE = new Date('2025-01-01T00:00:00Z').getTime();
const VIRTUAL_DB_KEY = 'MODEL_PI_CORE_DATA_V2';
const TARGET_BOOKINGS = 1000000;
const INITIAL_BOOKINGS = 924512;

export default function App() {
  const [lang, setLang] = useState<SupportedLang>('zh');
  const [theme, setTheme] = useState<'midnight' | 'solar'>('midnight');
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showPortal, setShowPortal] = useState(false);
  const [showFeatureExplorer, setShowFeatureExplorer] = useState(false);
  const [activeDoc, setActiveDoc] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [isInitializing, setIsInitializing] = useState(true);

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

  const t = useMemo(() => TRANSLATIONS[lang] || TRANSLATIONS['en'], [lang]);

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
    setTimeout(() => setIsInitializing(false), 1200);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / totalHeight) * 100);
    };
    const timer = setInterval(() => setCurrentTime(Date.now()), 1000);
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.documentElement.className = theme === 'midnight' ? 'dark midnight' : 'solar';
    
    return () => { 
      clearInterval(timer); 
      window.removeEventListener('scroll', handleScroll);
    };
  }, [theme]);

  const stats = useMemo(() => {
    const totalDuration = GLOBAL_LAUNCH_DATE - GLOBAL_START_DATE;
    const elapsed = currentTime - GLOBAL_START_DATE;
    const progressFactor = Math.max(0, Math.min(1, elapsed / totalDuration));
    const booked = Math.floor(dbData.initialBookings + progressFactor * (TARGET_BOOKINGS - dbData.initialBookings));
    return {
      booked,
      progress: (booked / TARGET_BOOKINGS) * 100,
      remaining: Math.max(0, TARGET_BOOKINGS - booked)
    };
  }, [currentTime, dbData.initialBookings]);

  const renderActiveDoc = () => {
    if (!activeDoc) return null;
    const close = () => setActiveDoc(null);
    const docName = activeDoc.toLowerCase();
    if (docName.includes('whitepaper') || docName.includes('战略档案')) return <WhitepaperDetail onClose={close} lang={lang} />;
    if (docName.includes('privacy') || docName.includes('隐私')) return <PrivacyStatementDetail onClose={close} lang={lang} />;
    if (docName.includes('legal') || docName.includes('服务条款') || docName.includes('法律')) return <LegalAgreementDetail onClose={close} lang={lang} />;
    if (docName.includes('treaty') || docName.includes('条约')) return <StarlinkTreatyDetail onClose={close} lang={lang} />;
    if (docName.includes('pioneer') || docName.includes('先锋')) return <PioneerPlanDetail onClose={close} lang={lang} />;
    return <DocumentModal activeDoc={activeDoc} lang={lang} onClose={close} />;
  };

  if (isInitializing) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center space-y-6 z-[2000]">
        <div className="relative">
          <div className="absolute inset-0 bg-red-600/30 blur-3xl animate-pulse rounded-full" />
          <Loader2 className="text-red-600 animate-spin relative z-10" size={48} />
        </div>
        <div className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60 animate-pulse">
          {t.common?.loading || 'INITIATING T-OS...'}
        </div>
      </div>
    );
  }

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className={`transition-colors duration-1000 ${theme === 'midnight' ? 'bg-[#050505] text-white' : 'bg-[#f5f5f7] text-[#1d1d1f]'}`}>
      <div className="fixed top-0 left-0 h-1 bg-red-600 z-[200] transition-all duration-300" style={{ width: `${scrollProgress}%` }} />
      
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

      {/* Modals */}
      {showFeatureExplorer && <FeatureSections t={t} onClose={() => setShowFeatureExplorer(false)} />}
      {showPortal && <SubscriberPortal onClose={() => setShowPortal(false)} t={t} lang={lang} dbData={dbData} />}
      {renderActiveDoc()}
      {showCheckout && <CheckoutModal isOpen={showCheckout} t={t} onClose={() => setShowCheckout(false)} onPaymentSuccess={() => { setDbData(p => ({...p, isPaid:true, joinedAt:Date.now()})); setShowCheckout(false); setShowPortal(true); }} />}
    </div>
  );
}
