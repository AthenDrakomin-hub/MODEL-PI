
import React, { useState, useEffect, useMemo } from 'react';
import { TRANSLATIONS } from './translations';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { WhitepaperSection } from './components/WhitepaperSection';
import { FeatureSections } from './components/FeatureSections';
import { BookingSection } from './components/BookingSection';
import { DocumentModal, CheckoutModal, FeedbackModal } from './components/Modals';
import { WhitepaperDetail } from './components/WhitepaperDetail';
import { PioneerPlanDetail } from './components/PioneerPlanDetail';
import { StarlinkTreatyDetail } from './components/StarlinkTreatyDetail';
import { LegalAgreementDetail } from './components/LegalAgreementDetail';
import { PrivacyStatementDetail } from './components/PrivacyStatementDetail';
import { SubscriberPortal } from './components/SubscriberPortal';
// Use the central SupportedLang type
import { SupportedLang } from './types';

// --- 常量配置 ---
const START_TIME = new Date().getTime() - (5 * 24 * 60 * 60 * 1000);
const END_TIME = START_TIME + (35 * 24 * 60 * 60 * 1000);
const BATCH_SIZE = 1000000;
const BASE_BOOKINGS = 847291;
const UNIT_PRICE = 299;
const DEPOSIT_RATE = 0.3;

export default function App() {
  // 智能初始化语言
  const [lang, setLang] = useState<SupportedLang>(() => {
    const saved = localStorage.getItem('model-pi-lang') as SupportedLang;
    if (saved && TRANSLATIONS[saved]) return saved;
    return 'en';
  });

  // 状态追踪
  const [isPaid, setIsPaid] = useState<boolean>(() => {
    return localStorage.getItem('model-pi-paid') === 'true';
  });

  const [scrolled, setScrolled] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showFullWhitepaper, setShowFullWhitepaper] = useState(false);
  const [showPioneerPlan, setShowPioneerPlan] = useState(false);
  const [showStarlinkTreaty, setShowStarlinkTreaty] = useState(false);
  const [showLegalAgreement, setShowLegalAgreement] = useState(false);
  const [showPrivacyStatement, setShowPrivacyStatement] = useState(false);
  const [showPortal, setShowPortal] = useState(false);
  const [activeDoc, setActiveDoc] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date().getTime());

  const t = TRANSLATIONS[lang];

  // 持久化语言选择与支付状态
  useEffect(() => {
    localStorage.setItem('model-pi-lang', lang);
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('model-pi-paid', isPaid.toString());
  }, [isPaid]);

  // 核心实时统计逻辑
  const stats = useMemo(() => {
    const elapsed = currentTime - START_TIME;
    const progressPercent = Math.min(1, elapsed / (END_TIME - START_TIME));
    const increment = Math.floor(progressPercent * (BATCH_SIZE - BASE_BOOKINGS));
    const currentBooked = BASE_BOOKINGS + increment;
    return {
      booked: currentBooked,
      usdt: currentBooked * UNIT_PRICE * DEPOSIT_RATE,
      activeUsers: 450 + Math.floor(Math.sin(currentTime / 3000) * 150),
      progress: (currentBooked / BATCH_SIZE) * 100,
      remaining: BATCH_SIZE - currentBooked
    };
  }, [currentTime]);

  useEffect(() => {
    const handleScroll = () => {
      // Use 50px as threshold for visual change
      if (window.scrollY > 50) {
        if (!scrolled) setScrolled(true);
      } else {
        if (scrolled) setScrolled(false);
      }
    };

    const tick = setInterval(() => setCurrentTime(new Date().getTime()), 1000);
    
    // Passive scroll listener for better mobile performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(tick);
    };
  }, [scrolled]);

  const handleOpenDoc = (doc: string) => {
    const pioneerKeys = ['先锋计划', 'Pioneer Plan', 'パイオニア計画', 'Программа Pioneer', 'برنامج الرواد', 'Plan Pioneer', 'Lote 01 Asiento Pioneer', 'Batch 01 Siège Pioneer', 'Batch 01 Pioneer Platz', 'Lotto 01 Posto Pioneer', 'Batch 01 Pioneer Plaats', 'Batch 01 Pioneer Hak', 'Batch 01 Pioneer-plats'];
    const treatyKeys = ['星链条约', 'Starlink Treaty', 'スターリンク条約', 'Договор Starlink', 'معاهدة ستارلينك', 'Tratado Starlink', 'Traité Starlink', 'Starlink Vertrag', 'Trattato Starlink', 'Starlink Verdrag', 'Traktat Starlink', 'Starlink Anlaşması', 'Starlink-fördraget'];
    const legalKeys = ['法律协议', 'Legal', '法的合意', 'Юридическая инфо', 'قانوني', 'Legale', 'Juridisch', 'Hukuki', 'Legalny', 'Legal Agreements'];
    const privacyKeys = ['隐私声明', 'Privacy', 'プライバシー声明', 'Приватность', 'الخصوصية', 'Privacidad', 'Confidentialité', 'Privacy Policy'];

    if (pioneerKeys.includes(doc)) {
      setShowPioneerPlan(true);
    } else if (treatyKeys.includes(doc)) {
      setShowStarlinkTreaty(true);
    } else if (legalKeys.includes(doc)) {
      setShowLegalAgreement(true);
    } else if (privacyKeys.includes(doc)) {
      setShowPrivacyStatement(true);
    } else {
      setActiveDoc(doc);
    }
  };

  const handlePaymentSuccess = () => {
    setIsPaid(true);
    // 延迟一点时间让用户看到支付成功状态
    setTimeout(() => {
      setShowCheckout(false);
      setShowPortal(true);
    }, 4000);
  };

  return (
    <div className="bg-black text-white selection:bg-red-600 transition-colors duration-500 overflow-x-hidden">
      <Header 
        t={t} 
        lang={lang} 
        setLang={setLang} 
        scrolled={scrolled} 
        endTime={END_TIME} 
        isPaid={isPaid}
        onOrder={() => setShowCheckout(true)} 
        onOpenPortal={() => setShowPortal(true)}
        onOpenFeedback={() => setShowFeedback(true)}
        onOpenWhitepaper={() => setShowFullWhitepaper(true)}
      />

      <main>
        <HeroSection t={t} stats={stats} onOrder={isPaid ? () => setShowPortal(true) : () => setShowCheckout(true)} />
        <WhitepaperSection t={t} lang={lang} onOpenFull={() => setShowFullWhitepaper(true)} />
        <FeatureSections t={t} />
        <BookingSection t={t} stats={stats} endTime={END_TIME} lang={lang} onOrder={isPaid ? () => setShowPortal(true) : () => setShowCheckout(true)} />
      </main>

      <Footer t={t} onOpenDoc={handleOpenDoc} />

      <DocumentModal activeDoc={activeDoc} lang={lang} onClose={() => setActiveDoc(null)} />
      <CheckoutModal isOpen={showCheckout} t={t} onClose={() => setShowCheckout(false)} onPaymentSuccess={handlePaymentSuccess} />
      <FeedbackModal isOpen={showFeedback} t={t} onClose={() => setShowFeedback(false)} />
      
      {showFullWhitepaper && (
        <WhitepaperDetail lang={lang} onClose={() => setShowFullWhitepaper(false)} />
      )}

      {showPioneerPlan && (
        <PioneerPlanDetail lang={lang} onClose={() => setShowPioneerPlan(false)} />
      )}

      {showStarlinkTreaty && (
        <StarlinkTreatyDetail lang={lang} onClose={() => setShowStarlinkTreaty(false)} />
      )}

      {showLegalAgreement && (
        <LegalAgreementDetail lang={lang} onClose={() => setShowLegalAgreement(false)} />
      )}

      {showPrivacyStatement && (
        <PrivacyStatementDetail lang={lang} onClose={() => setShowPrivacyStatement(false)} />
      )}

      {showPortal && (
        <SubscriberPortal onClose={() => setShowPortal(false)} t={t} lang={lang} />
      )}
    </div>
  );
}
