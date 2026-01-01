
import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, ShieldCheck, CheckCircle, Zap, ChevronRight, FileText, Copy, Loader2, QrCode, Lock, CreditCard, Terminal, Apple, CreditCard as VisaIcon, Info, Shield, ExternalLink, Hash, History, MessageSquare, Send, Activity, LockIcon } from 'lucide-react';
import { TRANSLATIONS } from '../translations';
import { ModelPiLogo } from '../Logo';

const getSafeEnv = (key: string, fallback: string): string => {
  try {
    const viteEnv = (import.meta as any).env;
    if (viteEnv && viteEnv[key]) return viteEnv[key];
    if (typeof process !== 'undefined' && process.env && (process.env as any)[key]) {
      return (process.env as any)[key];
    }
  } catch (e) {}
  return fallback;
};

const PERSONAL_CONFIG = {
  USDT_TRC20_ADDR: getSafeEnv('VITE_USDT_ADDR', "请在 Vercel 设置 VITE_USDT_ADDR"),
  PAYPAL_ME_URL: getSafeEnv('VITE_PAYPAL_URL', "https://paypal.me/"),
  get USDT_QR() {
    return `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(this.USDT_TRC20_ADDR)}`;
  }
};

/**
 * 模拟数据加密视觉组件
 */
const EncryptionOverlay = ({ stage }: { stage: string }) => (
  <div className="absolute inset-0 z-[1100] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-12 text-center animate-in fade-in zoom-in duration-300">
    <div className="relative mb-12">
      <div className="absolute inset-0 bg-red-600/20 blur-3xl animate-pulse rounded-full" />
      <div className="w-24 h-24 border-2 border-red-600 rounded-full flex items-center justify-center text-red-600 relative z-10">
        <LockIcon size={40} className="animate-bounce" />
      </div>
      <div className="absolute -inset-4 border border-red-600/30 rounded-full animate-[spin_4s_linear_infinite]" />
    </div>
    <div className="space-y-4">
      <h3 className="text-2xl font-black uppercase tracking-widest text-white italic">{stage}</h3>
      <div className="flex gap-1 justify-center">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="w-1 h-4 bg-red-600/40 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
        ))}
      </div>
      <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">AES-512 / T1 Secure Enclave</p>
    </div>
  </div>
);

export const DocumentModal = ({ activeDoc, lang, onClose }: any) => {
  if (!activeDoc) return null;
  const t = TRANSLATIONS[lang] || TRANSLATIONS['en'];
  
  // Directly use activeDoc string to map to translation docs
  const docData = t.docs?.[activeDoc] || { title: activeDoc, subtitle: 'v1.0', sections: [] };
  const isSupport = ['联系支持', 'Support', '先锋指挥中心', 'Pioneer Support Center'].includes(activeDoc);

  return (
    <div className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-3xl animate-in fade-in duration-300 overflow-y-auto custom-scrollbar scanlines">
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-24 relative">
        <button onClick={onClose} className="fixed top-8 right-8 z-[1010] p-4 bg-white/10 hover:bg-red-600 rounded-full transition-all group border border-white/20 shadow-2xl">
          <X size={24} className="group-hover:rotate-90 transition-transform text-white" />
        </button>

        <div className="space-y-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600/20 border border-red-600/40 rounded text-[10px] font-black uppercase text-red-400">
               <ShieldCheck size={12} /> <span>{docData.subtitle}</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none text-white drop-shadow-md">
              {docData.title}
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {docData.sections.map((section: any, idx: number) => (
              <div key={idx} className={`bg-white/[0.07] backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] border border-white/15 space-y-8 ${section.type === 'list' || section.type === 'specs' || section.fullWidth ? 'md:col-span-2' : ''}`}>
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight flex items-center gap-3 text-white">
                   {section.type === 'specs' ? <Zap className="text-red-500" /> : <FileText className="text-gray-300" />}
                   {section.title}
                </h2>
                {section.type === 'text' && <p className="text-gray-200 leading-relaxed text-lg font-medium">{section.content}</p>}
                {section.type === 'list' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.items.map((item: string, i: number) => (
                      <div key={i} className="flex items-center gap-4 bg-white/10 p-5 rounded-2xl border border-white/10 hover:border-red-600/40 transition-colors">
                        <CheckCircle size={18} className="text-red-500 shrink-0" />
                        <span className="text-sm font-bold uppercase text-white">{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isSupport && (
               <div className="md:col-span-2 bg-red-600/10 border border-red-600/30 p-12 rounded-[3.5rem] space-y-8">
                  <div className="flex items-center gap-4">
                    <MessageSquare className="text-red-500" size={32} />
                    <h3 className="text-3xl font-black uppercase tracking-tighter text-white">紧急工单 / Uplink Ticket</h3>
                  </div>
                  <div className="space-y-6">
                    <textarea 
                      className="w-full h-40 bg-white/5 border border-white/10 rounded-3xl p-6 text-white focus:outline-none focus:border-red-600 transition-all text-sm font-mono"
                      placeholder="Input your mission diagnostics..."
                    />
                    <button className="px-12 py-5 bg-red-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.4em] hover:bg-black transition-all flex items-center gap-4 shadow-2xl">
                       <Send size={16} /> Transmit Request
                    </button>
                  </div>
               </div>
            )}
          </div>
        </div>

        <div className="mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
           <div className="flex items-center gap-4">
              <ModelPiLogo className="w-8 h-8 text-white" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Tesla Strategic Documentation</span>
           </div>
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Confidential - Pioneer Access Only</p>
        </div>
      </div>
    </div>
  );
};

export const CheckoutModal = ({ isOpen, t, onClose, onPaymentSuccess }: any) => {
  const [methodGroup, setMethodGroup] = useState<'none' | 'paypal' | 'crypto'>('none');
  const [isVerifying, setIsVerifying] = useState(false);
  const [securingStage, setSecuringStage] = useState<string | null>(null);
  const [txid, setTxid] = useState('');
  const [email, setEmail] = useState('');
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!txid.trim() || !email.trim()) return;
    
    setIsVerifying(true);
    setSecuringStage("Encrypting Packet...");
    
    await new Promise(r => setTimeout(r, 1200));
    setSecuringStage("Authenticating via Starlink...");
    
    await new Promise(r => setTimeout(r, 1000));
    setSecuringStage("Securing Transmission...");

    try {
      await fetch('https://formspree.io/f/model-pi@proton.me', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          txid, 
          amount: "$89.70", 
          method: "USDT-TRC20",
          secure_hash: btoa(txid + email).substring(0, 16)
        })
      });
      setIsVerifying(false);
      setSecuringStage(null);
      setSubmitted(true);
    } catch (err) {
      setTimeout(() => {
        setIsVerifying(false);
        setSecuringStage(null);
        setSubmitted(true);
      }, 1000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-black/98 backdrop-blur-2xl animate-in fade-in duration-500 overflow-y-auto scanlines">
      <div className="min-h-screen flex flex-col lg:flex-row">
        
        <div className="w-full lg:w-[40%] bg-neutral-950 p-8 md:p-16 flex flex-col justify-between border-r border-white/10 relative">
          <div className="space-y-12 relative z-10">
            <button onClick={onClose} className="flex items-center space-x-2 text-white hover:text-red-500 mb-12 group transition-colors">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
              <span className="text-[10px] font-black uppercase tracking-widest">BACK TO GATEWAY</span>
            </button>
            
            <div className="space-y-6">
              <span className="text-red-500 text-[11px] font-black uppercase tracking-[0.4em] flex items-center gap-2">
                <ShieldCheck size={14} /> PIONEER VERIFICATION
              </span>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-white">
                OFFICIAL <br/><span className="text-red-600">DEPOSIT.</span>
              </h1>
              <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-sm">
                通过全球节点锁定您的 BATCH 01 席位。支付完成后，请输入交易哈希 (TXID) 进行链上确权。
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] space-y-6">
               <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-600 rounded-xl"><Lock size={20} /></div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/80">Direct Peer-to-Peer Transfer</div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-600 rounded-xl"><History size={20} /></div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/80">Queue Position Reserved</div>
               </div>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-black p-8 md:p-24 flex flex-col justify-center items-center relative">
          {isVerifying && securingStage && <EncryptionOverlay stage={securingStage} />}

          <div className="w-full max-w-lg space-y-10 animate-in zoom-in-95 duration-500">
            
            {submitted ? (
              <div className="text-center space-y-8 animate-in zoom-in">
                 <div className="w-24 h-24 bg-red-600/10 border-2 border-red-600 rounded-full flex items-center justify-center mx-auto text-red-600 shadow-[0_0_50px_rgba(232,33,39,0.3)]">
                    <CheckCircle size={48} />
                 </div>
                 <div className="space-y-4">
                    <h2 className="text-4xl font-black uppercase text-white tracking-tighter">Transmission Sent</h2>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest leading-relaxed">
                       您的支付已进入验证队列。我们的系统和人工团队将在链上确认后通过电子邮件发送您的先锋证书。
                    </p>
                 </div>
                 <button onClick={onClose} className="px-12 py-5 bg-white text-black rounded-2xl font-black uppercase text-[10px] tracking-[0.4em] hover:bg-red-600 hover:text-white transition-all">
                    Return to Portal
                 </button>
              </div>
            ) : methodGroup === 'none' ? (
              <>
                <div className="text-center space-y-4">
                   <h2 className="text-3xl font-black uppercase text-white">Select Entry Point</h2>
                   <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Batch 01 Priority: High</p>
                </div>

                <div className="space-y-6">
                   <button 
                    onClick={() => setMethodGroup('crypto')}
                    className="w-full p-10 bg-white rounded-[3rem] group hover:scale-[1.02] transition-all flex items-center justify-between text-black shadow-2xl"
                   >
                      <div className="flex items-center gap-6">
                         <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center">
                            <Terminal size={32} />
                         </div>
                         <div className="text-left">
                            <div className="text-xl font-black uppercase">USDT (TRC-20)</div>
                            <div className="text-[10px] font-bold text-gray-500 uppercase mt-1">瞬时到账 · 全球支付首选</div>
                         </div>
                      </div>
                      <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                   </button>

                   <button 
                    onClick={() => window.open(PERSONAL_CONFIG.PAYPAL_ME_URL, '_blank')}
                    className="w-full p-10 bg-white/5 border border-white/10 rounded-[3rem] group hover:bg-white/10 transition-all flex items-center justify-between text-white"
                   >
                      <div className="flex items-center gap-6">
                         <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
                            <CreditCard size={32} className="text-gray-400" />
                         </div>
                         <div className="text-left">
                            <div className="text-xl font-black uppercase">PayPal / Global Card</div>
                            <div className="text-[10px] font-bold text-gray-600 uppercase mt-1">使用个人 PayPal 页面支付</div>
                         </div>
                      </div>
                      <ExternalLink className="group-hover:scale-110 transition-transform opacity-40" />
                   </button>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-[4rem] p-10 md:p-14 space-y-8 text-black animate-in slide-in-from-bottom-12">
                 <button onClick={() => setMethodGroup('none')} className="p-3 hover:bg-gray-100 rounded-full"><ArrowLeft size={24}/></button>
                 
                 <div className="text-center space-y-6">
                    <div className="space-y-2">
                       <h3 className="text-2xl font-black uppercase italic">USDT Settlement</h3>
                       <p className="text-[9px] font-black text-red-600 uppercase tracking-widest"> Network: TRON (TRC-20) </p>
                    </div>

                    <div className="relative mx-auto w-40 h-40 bg-gray-50 p-4 rounded-3xl border border-gray-100">
                       <img src={PERSONAL_CONFIG.USDT_QR} className="w-full h-full object-contain" alt="QR" />
                    </div>

                    <div className="space-y-4">
                       <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest text-left px-2">Deposit Address (TRC-20)</div>
                       <div className="flex gap-2">
                          <div className="flex-grow text-[11px] font-mono break-all p-5 bg-gray-100 rounded-2xl border border-gray-200 text-left">
                            {PERSONAL_CONFIG.USDT_TRC20_ADDR}
                          </div>
                          <button 
                            onClick={() => { navigator.clipboard.writeText(PERSONAL_CONFIG.USDT_TRC20_ADDR); setCopyFeedback(true); setTimeout(() => setCopyFeedback(false), 2000); }}
                            className={`p-5 rounded-2xl transition-all ${copyFeedback ? 'bg-green-600 text-white' : 'bg-black text-white'}`}
                          >
                            <Copy size={20} />
                          </button>
                       </div>
                    </div>

                    <form onSubmit={handleManualSubmit} className="space-y-4 pt-4 border-t border-gray-100">
                       <div className="space-y-2 text-left">
                          <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest px-2">Your Email</label>
                          <input 
                                required
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="For confirmation certificate" 
                                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-[11px] focus:outline-none focus:border-red-600" 
                          />
                       </div>
                       <div className="space-y-2 text-left">
                          <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest px-2">Transaction ID (TXID)</label>
                          <div className="relative">
                             <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"><Hash size={16} /></div>
                             <input 
                                required
                                value={txid}
                                onChange={e => setTxid(e.target.value)}
                                placeholder="Paste transfer hash" 
                                className="w-full p-4 pl-12 bg-gray-50 border border-gray-200 rounded-2xl text-[11px] font-mono focus:outline-none focus:border-red-600" 
                             />
                          </div>
                       </div>
                       
                       <button 
                        disabled={isVerifying}
                        type="submit"
                        className="w-full py-6 bg-red-600 text-white rounded-3xl font-black uppercase text-xs tracking-[0.3em] hover:bg-black transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
                       >
                          {isVerifying ? (
                            <> <Loader2 className="animate-spin" size={18} /> Validating... </>
                          ) : (
                            <> <Zap size={18} /> Confirm $89.70 Deposit </>
                          )}
                       </button>
                    </form>
                 </div>
              </div>
            )}
            
            <div className="flex items-center justify-center gap-8 opacity-40 grayscale pt-4">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                 <span className="text-[8px] font-black uppercase text-white">Neural Encrypted Transmission</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FeedbackModal = ({ isOpen, t, onClose }: any) => {
  const [content, setContent] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [securingStage, setSecuringStage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSend = async () => {
    if (!content.trim()) return;
    setIsSending(true);
    setSecuringStage("Scanning for Anomalies...");
    await new Promise(r => setTimeout(r, 1000));
    setSecuringStage("Hashing Transmission...");
    await new Promise(r => setTimeout(r, 800));

    // 模拟发送
    setSubmitted(true);
    setIsSending(false);
    setSecuringStage(null);
    setTimeout(onClose, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={onClose} />
      <div className="relative bg-neutral-900 w-full max-w-xl p-12 md:p-16 rounded-[4rem] border border-white/20 text-center shadow-3xl overflow-hidden">
        {isSending && securingStage && <EncryptionOverlay stage={securingStage} />}
        
        <div className="absolute top-0 left-0 w-full h-1 bg-red-600 animate-scan opacity-50" />
        <button onClick={onClose} className="absolute top-10 right-10 text-white hover:text-red-500 transition-colors"><X size={28} /></button>
        
        {submitted ? (
          <div className="py-24 space-y-8 animate-in zoom-in">
             <div className="w-24 h-24 bg-green-500/10 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto text-green-500">
                <CheckCircle size={48} />
             </div>
             <h3 className="text-4xl font-black uppercase text-white tracking-tighter">Transmission Complete</h3>
             <button onClick={onClose} className="text-[11px] font-black uppercase tracking-[0.6em] text-gray-500 hover:text-white transition-colors">Close Command</button>
          </div>
        ) : (
          <div className="space-y-12">
            <h2 className="text-5xl font-black uppercase tracking-tighter text-white">UP-LINK <br/><span className="text-red-600">FEEDBACK.</span></h2>
            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-56 bg-white/[0.05] border border-white/10 rounded-[2.5rem] p-8 focus:outline-none focus:border-red-600 transition-all text-sm font-medium resize-none custom-scrollbar text-white placeholder:text-gray-600"
              placeholder="System diagnostics: Waiting for pioneer input..."
            />
            <button 
              onClick={handleSend}
              className="w-full py-7 bg-red-600 rounded-[2rem] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all text-white shadow-2xl active:scale-95 flex items-center justify-center gap-4"
            >
              <SendIcon size={20} /> Transmit Securely
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const SendIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
);
