
import React, { useState, useEffect, useMemo, Suspense, lazy } from 'react';
import { TRANSLATIONS } from './translations';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { NewHeroSection } from './components/NewHeroSection';
import { WhitepaperSection } from './components/WhitepaperSection';
import { BookingSection } from './components/BookingSection';
import { VideoShowcase } from './components/VideoShowcase';
import { ComparisonSection } from './components/ComparisonSection';
import { CheckoutModal, DocumentModal } from './components/Modals';
import { CartSidebar } from './components/CartSidebar';
import { LegalCompliancePage } from './components/LegalCompliancePage';
import { LegalComplianceDetail } from './components/LegalComplianceDetail';
import { SupportedLang } from './types';
import { Loader2 } from 'lucide-react';

// 懒加载大型组件 - 这将显著降低主包体积
const WhitepaperDetail = lazy(() => import('./components/WhitepaperDetail').then(m => ({ default: m.WhitepaperDetail })));
const FeatureSections = lazy(() => import('./components/FeatureSections').then(m => ({ default: m.FeatureSections })));
const SubscriberPortal = lazy(() => import('./components/SubscriberPortal').then(m => ({ default: m.SubscriberPortal })));
const PrivacyStatementDetail = lazy(() => import('./components/PrivacyStatementDetail').then(m => ({ default: m.PrivacyStatementDetail })));
const LegalAgreementDetail = lazy(() => import('./components/LegalAgreementDetail').then(m => ({ default: m.LegalAgreementDetail })));
const StarlinkTreatyDetail = lazy(() => import('./components/StarlinkTreatyDetail').then(m => ({ default: m.StarlinkTreatyDetail })));
const PioneerPlanDetail = lazy(() => import('./components/PioneerPlanDetail').then(m => ({ default: m.PioneerPlanDetail })));

const GLOBAL_LAUNCH_DATE = new Date('2026-01-31T23:59:59Z').getTime();
const GLOBAL_START_DATE = new Date('2025-01-01T00:00:00Z').getTime();
const VIRTUAL_DB_KEY = 'MODEL_PI_CORE_DATA_V2';
const TARGET_BOOKINGS = 1000000;
const INITIAL_BOOKINGS = 924512;

// 加载占位组件
const LoadingOverlay = () => (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[2000]">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="text-red-600 animate-spin" size={40} />
      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">Uplink in Progress...</span>
    </div>
  </div>
);

export default function App() {
  const [lang, setLang] = useState<SupportedLang>('zh');
  const [theme, setTheme] = useState<'midnight' | 'solar'>('midnight');
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showPortal, setShowPortal] = useState(false);
  const [showFeatureExplorer, setShowFeatureExplorer] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showLegalCompliance, setShowLegalCompliance] = useState(false);
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
    
    return (
      <Suspense fallback={<LoadingOverlay />}>
        {docName.includes('whitepaper') || docName.includes('战略档案') ? <WhitepaperDetail onClose={close} lang={lang} /> :
         docName.includes('privacy') || docName.includes('隐私') ? <PrivacyStatementDetail onClose={close} lang={lang} /> :
         docName.includes('legal') || docName.includes('服务条款') || docName.includes('法律') ? <LegalAgreementDetail onClose={close} lang={lang} /> :
         docName.includes('treaty') || docName.includes('条约') ? <StarlinkTreatyDetail onClose={close} lang={lang} /> :
         docName.includes('pioneer') || docName.includes('先锋') ? <PioneerPlanDetail onClose={close} lang={lang} /> :
         docName.includes('legalcompliance') ? <LegalComplianceDetail onClose={close} lang={lang} /> :
         <DocumentModal activeDoc={activeDoc} lang={lang} onClose={close} />}

      </Suspense>
    );
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
        onOpenCart={() => setShowCart(true)}
      />

      <main className="mesh-gradient min-h-screen relative z-0">
        <NewHeroSection t={t} stats={stats} onOrder={() => setShowCheckout(true)} theme={theme} />
        <ComparisonSection t={t} theme={theme} />
        <VideoShowcase lang={lang} theme={theme} />
        <WhitepaperSection t={t} lang={lang} onOpenFull={() => setActiveDoc('Whitepaper')} theme={theme} />
        <BookingSection t={t} stats={stats} endTime={dbData.endTime} lang={lang} onOrder={() => setShowCheckout(true)} theme={theme} />
      </main>

      <Footer t={t} onOpenDoc={setActiveDoc} theme={theme} />

      {/* Modals with Suspense */}
      <Suspense fallback={<LoadingOverlay />}>
        {showFeatureExplorer && <FeatureSections t={t} onClose={() => setShowFeatureExplorer(false)} />}
        {showPortal && <SubscriberPortal onClose={() => setShowPortal(false)} t={t} lang={lang} dbData={dbData} />}
        {renderActiveDoc()}
      </Suspense>

      {showCheckout && <CheckoutModal isOpen={showCheckout} t={t} onClose={() => setShowCheckout(false)} onPaymentSuccess={() => { setDbData(p => ({...p, isPaid:true, joinedAt:Date.now()})); setShowCheckout(false); setShowPortal(true); }} />}
      {showCart && <CartSidebar isOpen={showCart} onClose={() => setShowCart(false)} onCheckout={() => { setShowCart(false); setShowCheckout(true); }} />}
    </div>
  );
}
