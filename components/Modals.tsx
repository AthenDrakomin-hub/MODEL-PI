
import React, { useState } from 'react';
import { X, ArrowLeft, ShieldCheck, CheckCircle, Zap, ChevronRight, FileText, Copy, Loader2, CreditCard, Terminal, Hash, ExternalLink } from 'lucide-react';
import { TRANSLATIONS } from '../translations';
import { ModelPiLogo } from '../Logo';

const CONTACT_EMAIL = "model-pi@protonmail.com";

const getSafeEnv = (key: string, fallback: string): string => {
  try {
    const viteEnv = (import.meta as any).env;
    if (viteEnv && viteEnv[key]) return viteEnv[key];
  } catch (e) {}
  return fallback;
};

const PERSONAL_CONFIG = {
  USDT_TRC20_ADDR: getSafeEnv('VITE_USDT_ADDR', "T-ADDR-PENDING"),
  PAYPAL_ME_URL: getSafeEnv('VITE_PAYPAL_URL', "https://paypal.me/"),
  get USDT_QR() {
    return `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(this.USDT_TRC20_ADDR)}`;
  }
};

export const DocumentModal = ({ activeDoc, lang, onClose }: any) => {
  if (!activeDoc) return null;
  const t = TRANSLATIONS[lang] || TRANSLATIONS['en'];
  const docData = t.docs?.[activeDoc] || { title: activeDoc, subtitle: 'v1.0', sections: [] };

  return (
    <div className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-3xl animate-in fade-in duration-300 overflow-y-auto custom-scrollbar">
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-32 relative">
        <button onClick={onClose} className="fixed top-8 right-8 z-[1010] p-4 bg-white/5 hover:bg-red-600 rounded-full transition-all border border-white/10 group shadow-2xl">
          <X size={24} className="group-hover:rotate-90 transition-transform text-white" />
        </button>

        <div className="space-y-16">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-600/10 border border-red-600/30 rounded text-[10px] font-black uppercase text-red-500">
               <ShieldCheck size={12} /> <span>{docData.subtitle}</span>
            </div>
            <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-none text-white">{docData.title}</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {docData.sections.map((section: any, idx: number) => (
              <div key={idx} className={`bg-white/[0.03] p-10 md:p-14 rounded-[3rem] border border-white/5 space-y-8 ${section.type === 'list' || section.fullWidth ? 'md:col-span-2' : ''}`}>
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight flex items-center gap-4 text-white">
                   <FileText className="text-red-600" size={24} /> {section.title}
                </h2>
                {section.type === 'text' && <p className="text-gray-400 leading-relaxed text-lg">{section.content}</p>}
                {section.type === 'list' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {section.items.map((item: string, i: number) => (
                      <div key={i} className="flex items-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/5">
                        <CheckCircle size={18} className="text-red-500" />
                        <span className="text-xs font-bold uppercase text-white/80">{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="pt-20 border-t border-white/5 flex flex-col items-center gap-8 opacity-40">
            <ModelPiLogo className="w-12 h-12 text-white" />
            <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white">© 2025 TESLA STRATEGIC · {CONTACT_EMAIL}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CheckoutModal = ({ isOpen, onClose, onPaymentSuccess }: any) => {
  const [method, setMethod] = useState<'none' | 'crypto'>('none');
  const [isVerifying, setIsVerifying] = useState(false);
  const [txid, setTxid] = useState('');
  const [email, setEmail] = useState('');
  const [copying, setCopying] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!txid.trim() || !email.trim()) return;
    setIsVerifying(true);
    await new Promise(r => setTimeout(r, 2000));
    setDone(true);
    setIsVerifying(false);
    setTimeout(onPaymentSuccess, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-black/98 backdrop-blur-2xl animate-in fade-in duration-500 overflow-y-auto">
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Left Side Info */}
        <div className="w-full md:w-[450px] bg-neutral-950 p-12 md:p-20 flex flex-col justify-between border-r border-white/5">
           <div className="space-y-12">
              <button onClick={onClose} className="flex items-center gap-3 text-white/40 hover:text-white transition-colors group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest">退出</span>
              </button>
              <div className="space-y-6">
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-white">抢占 <br/><span className="text-red-600">席位。</span></h2>
                <p className="text-gray-500 text-sm font-medium leading-relaxed uppercase">首批创始版，全球限量发售</p>
              </div>
           </div>
           <p className="text-[9px] font-black uppercase text-gray-700 tracking-[0.4em] pt-12">联系我们: {CONTACT_EMAIL}</p>
        </div>

        {/* Right Side Payment */}
        <div className="flex-1 bg-black p-8 md:p-24 flex flex-col justify-center items-center relative">
          <div className="w-full max-w-lg">
            {done ? (
              <div className="text-center space-y-8 animate-in zoom-in">
                 <div className="w-24 h-24 bg-red-600/10 border-2 border-red-600 rounded-full flex items-center justify-center mx-auto text-red-600 shadow-[0_0_50px_rgba(232,33,39,0.3)]">
                    <CheckCircle size={48} />
                 </div>
                 <h3 className="text-3xl font-black uppercase text-white tracking-tighter italic">验证成功。</h3>
              </div>
            ) : method === 'none' ? (
              <div className="space-y-10">
                 <div className="text-center space-y-2">
                    <h3 className="text-2xl font-black uppercase text-white tracking-tight">选择预订方式</h3>
                 </div>
                 <div className="grid gap-6">
                    <button onClick={() => setMethod('crypto')} className="p-10 bg-white rounded-[3rem] group hover:scale-[1.02] transition-all flex items-center justify-between">
                       <div className="flex items-center gap-6">
                          <Terminal className="text-black" size={32} />
                          <div className="text-left">
                             <div className="text-xl font-black uppercase text-black">USDT (TRC-20)</div>
                             <div className="text-[9px] font-bold text-gray-400 uppercase">最快 1 分钟确认</div>
                          </div>
                       </div>
                       <ChevronRight className="text-black group-hover:translate-x-2 transition-transform" />
                    </button>
                    <button onClick={() => window.open(PERSONAL_CONFIG.PAYPAL_ME_URL, '_blank')} className="p-10 bg-white/5 border border-white/10 rounded-[3rem] group hover:bg-white/10 transition-all flex items-center justify-between">
                       <div className="flex items-center gap-6">
                          <CreditCard className="text-white/40" size={32} />
                          <div className="text-left">
                             <div className="text-xl font-black uppercase text-white">PayPal</div>
                             <div className="text-[9px] font-bold text-gray-600 uppercase">支持全球信用卡</div>
                          </div>
                       </div>
                       <ExternalLink className="text-white/20" size={20} />
                    </button>
                 </div>
              </div>
            ) : (
              <div className="bg-white rounded-[4rem] p-10 md:p-14 space-y-8 text-black animate-in slide-in-from-bottom-12">
                 <div className="flex justify-between items-center">
                    <button onClick={() => setMethod('none')} className="p-3 hover:bg-gray-100 rounded-full"><ArrowLeft size={24}/></button>
                    <div className="text-[10px] font-black uppercase text-red-600 tracking-widest">请转账至 TRC-20 地址</div>
                 </div>
                 <div className="flex justify-center">
                    <div className="p-4 bg-gray-50 border border-gray-100 rounded-3xl">
                       <img src={PERSONAL_CONFIG.USDT_QR} className="w-32 h-32" alt="QR" />
                    </div>
                 </div>
                 <div className="space-y-4">
                    <div className="flex gap-2">
                       <div className="flex-grow p-5 bg-gray-50 border border-gray-100 rounded-2xl text-[11px] font-mono break-all">{PERSONAL_CONFIG.USDT_TRC20_ADDR}</div>
                       <button onClick={() => { navigator.clipboard.writeText(PERSONAL_CONFIG.USDT_TRC20_ADDR); setCopying(true); setTimeout(()=>setCopying(false),2000); }} className={`p-5 rounded-2xl transition-all ${copying ? 'bg-green-600 text-white' : 'bg-black text-white'}`}>
                          <Copy size={20} />
                       </button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                       <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="预订邮箱" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-xs focus:outline-none focus:border-red-600" />
                       <div className="relative">
                          <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                          <input required value={txid} onChange={e=>setTxid(e.target.value)} placeholder="转账哈希 (TXID)" className="w-full p-4 pl-12 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-mono focus:outline-none focus:border-red-600" />
                       </div>
                       <button type="submit" disabled={isVerifying} className="w-full py-6 bg-red-600 text-white rounded-3xl font-black uppercase text-xs tracking-[0.3em] shadow-xl hover:bg-black transition-all flex items-center justify-center gap-4">
                          {isVerifying ? <Loader2 className="animate-spin" /> : <Zap size={18} />} 立即锁定名额
                       </button>
                    </form>
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
