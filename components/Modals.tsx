
import React, { useState } from 'react';
import { X, ArrowLeft, ShieldCheck, CreditCard as PaymentIcon, Info, CheckCircle, Wifi } from 'lucide-react';
import { ModelPiLogo } from '../Logo';

const DOC_CONTENT: any = {
  zh: {
    '先锋计划': `<h3>1. 创始身份识别</h3><p>先锋计划成员可提前 6 个月获得测试资格，并获得专属“Titanium Pioneer”数字徽章。</p>`,
    '星链条约': `<h3>1. 全球连通权</h3><p>享有基础带宽的终身免费使用权，无视任何地理边界障碍。</p>`,
    '法律协议': `<h3>隐私与数据</h3><p>所有生物识别数据均保存在本地 T1 安全芯片中。</p>`,
    '隐私声明': `<h3>透明度</h3><p>我们承诺不对用户通讯进行任何中心化审查。</p>`
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
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);

  if (!isOpen) return null;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => { 
      setIsProcessing(false); 
      setIsOrdered(true); 
      // 通知父组件支付成功
      if (onPaymentSuccess) onPaymentSuccess();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black animate-in fade-in duration-500 overflow-y-auto">
      <div className="min-h-screen flex flex-col lg:flex-row">
        <div className="flex-1 bg-neutral-950 p-12 lg:p-24 flex flex-col justify-center">
          <button onClick={onClose} className="flex items-center space-x-2 text-gray-500 hover:text-white mb-12 group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> <span className="text-xs font-black uppercase tracking-widest">BACK</span>
          </button>
          <div className="space-y-12 max-w-md">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">MODEL PI <br/> <span className="text-red-600">BATCH 01</span></h1>
            <div className="bg-red-600/5 border border-red-600/20 p-6 rounded-2xl flex items-start space-x-4">
              <Info className="text-red-500 shrink-0" size={20} />
              <p className="text-[11px] text-gray-400 uppercase font-bold leading-relaxed">{t.launch.desc}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-black p-12 lg:p-24 flex flex-col justify-center relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-600/20 via-transparent to-transparent" />
          </div>
          {isOrdered ? (
            <div className="text-center space-y-10 animate-in zoom-in max-w-sm mx-auto">
              <div className="w-32 h-32 bg-green-500/20 rounded-full flex items-center justify-center mx-auto text-green-500 shadow-[0_0_50px_rgba(34,197,94,0.3)]"><ShieldCheck size={64} /></div>
              <div className="space-y-4">
                <h2 className="text-5xl font-black uppercase tracking-tighter">{t.launch.securedTitle}</h2>
                <p className="text-gray-500 text-xs font-black uppercase tracking-widest">ORDER ID: #PX-{Math.floor(Math.random()*1000000)}</p>
              </div>
              <button onClick={onClose} className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase hover:bg-red-600 hover:text-white transition-all">ACCESS PORTAL</button>
            </div>
          ) : isProcessing ? (
            <div className="text-center space-y-12">
              <div className="relative">
                <ModelPiLogo className="w-24 h-24 text-red-600 mx-auto animate-pulse" glow />
                <div className="absolute inset-0 animate-ping opacity-20"><ModelPiLogo className="w-24 h-24 text-red-600 mx-auto" /></div>
              </div>
              <p className="text-sm font-black uppercase tracking-widest text-red-600 animate-pulse">{t.launch.processing}</p>
            </div>
          ) : (
            <div className="max-w-md mx-auto w-full space-y-12 relative z-10">
              <div className="flex items-center space-x-2 border-b border-white/5 pb-6">
                <PaymentIcon className="text-red-600" /> 
                <span className="font-black uppercase tracking-widest text-sm">ENCRYPTED GATEWAY</span>
              </div>
              <div className="space-y-6">
                 <div className="flex justify-between items-center"><span className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">SUBTOTAL</span><span className="font-mono">$299.00</span></div>
                 <div className="flex justify-between items-center"><span className="text-white font-black uppercase text-xs tracking-widest">DUE TODAY</span><span className="text-red-600 text-3xl font-black">$89.70</span></div>
              </div>
              <button onClick={handlePay} className="w-full py-6 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-[0_20px_50px_rgba(232,33,39,0.3)] hover:bg-white hover:text-black hover:scale-[1.02] transition-all">
                {t.launch.checkout}
              </button>
              <p className="text-[10px] text-center text-gray-500 uppercase font-black tracking-widest opacity-50">BY PROCEEDING YOU AGREE TO THE STARLINK TREATY</p>
            </div>
          )}
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
