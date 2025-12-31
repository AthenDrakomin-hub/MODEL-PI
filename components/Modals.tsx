
import React, { useState } from 'react';
import { X, ArrowLeft, ShieldCheck, CreditCard as PaymentIcon, Info, CheckCircle, Wifi, Shield } from 'lucide-react';
import { ModelPiLogo } from '../Logo';

/**
 * Fix for stripe-pricing-table custom element recognition in JSX.
 * Adding this locally within the components file ensures the TypeScript compiler 
 * recognizes the custom tag and its attributes.
 */
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

const DOC_CONTENT: any = {
  zh: {
    '先锋计划': `<h3>1. 创始身份识别</h3><p>先锋计划成员可提前 6 个月获得测试资格，并获得专属“Titanium Pioneer”数字徽章。</p>`,
    '星链条约': `<h3>1. 全球连通权</h3><p>享有基础带宽的终身免费使用权，无视 any 地理边界障碍。</p>`,
    '法律协议': `<h3>隐私与数据</h3><p>所有生物识别数据均保存在本地 T1 安全芯片中。</p>`,
    '隐私声明': `<h3>幕度</h3><p>我们承诺不对用户通讯进行 any 中心化审查。</p>`
  },
  en: {
    'Pioneer Plan': `<h3>1. Founding Status</h3><p>Early access for BATCH 01 members and a unique "Titanium Pioneer" digital badge.</p>`,
    'Starlink Treaty': `<h3>1. Connectivity</h3><p>Lifetime free base bandwidth globally, regardless of geographical barriers.</p>`,
    'Legal': `<h3>Privacy & Data</h3><p>All biometric data is stored locally on the T1 security chip.</p>`,
    'Privacy': `<h3>Transparency</h3><p>We commit to zero centralized censorship of user communications.</p>`
  }
};

export const DocumentModal = ({ activeDoc, lang, onClose }: any) => {
  if (!activeDoc) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={onClose} />
      <div className="relative glass-effect w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-[3rem] border border-white/10 p-8 md:p-16 custom-scrollbar">
        <button onClick={onClose} className="absolute top-8 right-8 text-gray-500 hover:text-white"><X size={24} /></button>
        <h2 className="text-3xl font-black text-white uppercase border-b border-red-600/50 pb-4 mb-8">{activeDoc}</h2>
        <div className="prose prose-invert prose-red" dangerouslySetInnerHTML={{ __html: DOC_CONTENT[lang][activeDoc] || "<p>Coming soon...</p>" }} />
      </div>
    </div>
  );
};

export const CheckoutModal = ({ isOpen, t, onClose, onPaymentSuccess }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] bg-black animate-in fade-in duration-500 overflow-y-auto">
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Side: Brand & Context */}
        <div className="w-full lg:w-1/3 bg-neutral-950 p-6 md:p-12 lg:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/5">
          <button onClick={onClose} className="flex items-center space-x-2 text-gray-500 hover:text-white mb-6 md:mb-10 group transition-colors">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
            <span className="text-[10px] font-black uppercase tracking-widest">BACK TO HUB</span>
          </button>
          
          <div className="space-y-6 md:space-y-10 max-w-sm mx-auto lg:mx-0">
            <div className="space-y-2">
              <div className="text-red-600 font-black text-xs uppercase tracking-[0.3em] mb-2">Secure Gateway</div>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-none">
                MODEL PI <br/> 
                <span className="text-red-600">BATCH 01</span>
              </h1>
            </div>

            <div className="bg-red-600/5 border border-red-600/20 p-5 rounded-2xl flex items-start space-x-4">
              <Shield className="text-red-500 shrink-0 mt-1" size={16} />
              <div className="space-y-1">
                <p className="text-[10px] text-gray-200 uppercase font-black tracking-widest">Pioneer Reservation</p>
                <p className="text-[9px] text-gray-500 font-bold leading-relaxed">{t.launch.desc}</p>
              </div>
            </div>

            <div className="hidden lg:block space-y-3 pt-4 border-t border-white/5">
              <div className="flex items-center gap-3 text-gray-600">
                <ShieldCheck size={14} />
                <span className="text-[8px] font-black uppercase tracking-widest">End-to-End Encrypted</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <CheckCircle size={14} />
                <span className="text-[8px] font-black uppercase tracking-widest">Instant Confirmation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Stripe Pricing Table - Optimized Spacing */}
        <div className="flex-1 bg-black p-4 md:p-8 lg:p-12 flex flex-col justify-center relative min-h-[600px]">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-600/20 via-transparent to-transparent" />
          </div>
          
          <div className="relative z-10 w-full max-w-4xl mx-auto bg-white/[0.02] rounded-[1.5rem] p-1 md:p-4 border border-white/10 shadow-3xl">
            <div className="mb-4 text-center px-4 pt-4">
              <h2 className="text-lg md:text-xl font-black uppercase tracking-tight text-white mb-1">Select Pioneer Batch</h2>
              <p className="text-[9px] text-gray-500 uppercase font-bold tracking-[0.2em]">Secured Checkout via Stripe</p>
            </div>

            {/* Injected Stripe Pricing Table - Tight Container */}
            <div className="stripe-container w-full overflow-hidden rounded-xl bg-black/40">
              <stripe-pricing-table 
                pricing-table-id="prctbl_1SkQzBRsbwjkO0VBFDKY66dv"
                publishable-key="pk_live_51SkGFGRsbwjkO0VBWBSKMc3pUkoNYe5e3hrhHm1eDIhKoKdwapC0E9tS2HUGg4SiaGkOPDbn4TOy1oNZ4SNuwDg200UlOvubs0"
              >
              </stripe-pricing-table>
            </div>

            <div className="mt-4 pb-4 text-center">
              <p className="text-[8px] text-gray-700 uppercase font-black tracking-[0.4em] opacity-50">
                PCI DSS COMPLIANT · SECURED BY STRIPE
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FeedbackModal = ({ isOpen, t, onClose }: any) => {
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isTransmitting, setIsTransmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!content.trim()) return;
    setIsTransmitting(true);
    setTimeout(() => {
      setIsTransmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setContent('');
      }, 2500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose} />
      <div className="relative glass-effect w-full max-w-lg p-10 rounded-[3rem] border border-white/10 shadow-2xl text-center overflow-hidden">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white"><X size={20} /></button>
        
        {isTransmitting ? (
          <div className="py-20 space-y-8 animate-in fade-in">
             <div className="relative w-24 h-24 mx-auto">
                <div className="absolute inset-0 bg-red-600 rounded-full animate-ping opacity-20" />
                <div className="relative w-full h-full bg-red-600/10 rounded-full flex items-center justify-center border border-red-600/30">
                   <Wifi size={40} className="text-red-600 animate-pulse" />
                </div>
             </div>
             <p className="text-xs font-black uppercase tracking-[0.5em] text-red-600 animate-pulse">Uplink in progress...</p>
          </div>
        ) : submitted ? (
          <div className="py-10 space-y-6 animate-in zoom-in">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto text-green-500">
              <CheckCircle size={40} />
            </div>
            <h3 className="text-xl font-black uppercase tracking-widest">{t.feedback.success}</h3>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="space-y-3">
              <h2 className="text-4xl font-black uppercase tracking-tighter">{t.feedback.title}</h2>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">{t.feedback.subtitle}</p>
            </div>
            <div className="space-y-4 text-left">
              <div className="relative">
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-48 bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 focus:outline-none focus:border-red-600 transition-all text-sm resize-none custom-scrollbar placeholder:text-gray-700"
                  placeholder="Tell us your vision..."
                />
                <div className="absolute bottom-6 right-8 text-[10px] font-bold text-gray-700 uppercase tracking-widest">T1 SECURED</div>
              </div>
            </div>
            <button 
              onClick={handleSubmit}
              disabled={!content.trim()}
              className="w-full py-5 bg-red-600 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all disabled:opacity-30 disabled:grayscale"
            >
              {t.feedback.submit}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
