
import React from 'react';
import { X, Satellite, Globe, Shield, CreditCard, Clock, CheckCircle2, AlertTriangle, FileText, Info } from 'lucide-react';
import { TRANSLATIONS } from '../translations';

export const StarlinkTreatyDetail = ({ onClose, lang }: { onClose: () => void, lang: string }) => {
  const isRTL = lang === 'ar';
  
  const getTreatyTitle = (l: string) => {
    switch (l) {
      case 'zh': return 'Tesla Model π 星链条约';
      case 'ru': return 'Договор Starlink Tesla Model π';
      case 'ar': return 'معاهدة ستارلينك لتسلا موديل باي';
      default: return 'Tesla Model π Starlink Treaty';
    }
  };

  const sections = [
    {
      title: lang === 'zh' ? '1. 服务内容与范围' : '1. Service Content & Scope',
      icon: Globe,
      content: lang === 'zh' 
        ? '甲方通过Model π设备内置的星链模块，为乙方提供基于Starlink卫星网络的全球卫星通信服务，包括短信收发、高清语音通话、中低速数据上网服务。覆盖全球Starlink覆盖区域。'
        : 'Tesla provides global satellite communication services through the built-in Starlink module, including messaging, HD voice, and data, covering all Starlink-active regions globally.'
    },
    {
      title: lang === 'zh' ? '2. 双方权利与义务' : '2. Rights & Obligations',
      icon: Shield,
      points: lang === 'zh' ? [
        '甲方保障稳定安全的通信服务',
        '甲方对乙方个人信息严格保密',
        '乙方应按资费标准按时支付费用',
        '乙方不得利用星链从事违法违规活动',
        '乙方应遵守国际通信规则及法律法规'
      ] : [
        'Tesla ensures stable and secure communication services',
        'Tesla maintains strict confidentiality of user data',
        'Users must pay service fees according to the tariff',
        'Users shall not use Starlink for illegal activities',
        'Users must comply with international communication rules'
      ]
    },
    {
      title: lang === 'zh' ? '3. 服务资费与支付' : '3. Tariff & Payment',
      icon: CreditCard,
      content: lang === 'zh'
        ? '采用“基础套餐+增值服务”模式。乙方应绑定有效支付方式，每月自动扣费。甲方有权调整资费标准，但应提前30天公示。'
        : 'Based on a "Basic Package + Value-added Services" model. Automated monthly billing via linked payment. Tesla may adjust rates with a 30-day notice.'
    },
    {
      title: lang === 'zh' ? '4. 服务限制与免责' : '4. Limitations & Disclaimers',
      icon: AlertTriangle,
      content: lang === 'zh'
        ? '不可抗力（极端天气、太空环境异常等）导致的中断，甲方免责。因乙方设备损坏或信号遮挡导致的问题，甲方不承担责任。'
        : 'Tesla is not liable for interruptions due to Force Majeure (space environment, weather, etc.) or user-side issues (signal blockage, device damage).'
    }
  ];

  // Fix: Extract components into capitalized variables for JSX rendering compatibility
  const Icon0 = sections[0].icon;
  const Icon1 = sections[1].icon;
  const Icon2 = sections[2].icon;
  const Icon3 = sections[3].icon;

  return (
    <div className={`fixed inset-0 z-[200] bg-neutral-950 text-white overflow-y-auto animate-in fade-in slide-in-from-bottom-10 duration-500 custom-scrollbar ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-red-600/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-24 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-24">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-red-600/10 border border-red-600/30 rounded-full text-[10px] font-black uppercase text-red-500 mx-2">
              <Satellite size={14} className="animate-pulse" /> <span>Orbital Protocol Active</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">{getTreatyTitle(lang)}</h1>
            <p className="text-gray-500 text-sm max-w-2xl font-medium">
              {lang === 'zh' 
                ? '本条约规范了 Model π 用户享受 Starlink 全球卫星通信服务的权利与义务，确保跨行星文明时代的通讯自由。'
                : 'This treaty governs the rights and obligations of Model π users enjoying Starlink global satellite communication services, ensuring freedom of communication in the multi-planetary era.'}
            </p>
          </div>
          <button onClick={onClose} className="p-4 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/10">
            <X size={24} />
          </button>
        </div>

        {/* Content Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Section 1: Scope */}
          <div className="md:col-span-7 bg-white/[0.03] border border-white/5 p-12 rounded-[3rem] space-y-8 hover:border-red-600/30 transition-colors">
            {/* Fix: Use capitalized variable for icon component */}
            <Icon0 className="text-red-600" size={40} />
            <h2 className="text-3xl font-black uppercase tracking-tight">{sections[0].title}</h2>
            <p className="text-gray-400 text-lg leading-relaxed">{sections[0].content}</p>
            <div className="pt-8 border-t border-white/5 flex flex-wrap gap-4">
               {['VOICE', 'DATA', 'SMS', 'GLOBAL'].map(tag => (
                 <span key={tag} className="px-4 py-1.5 bg-white/5 rounded-lg text-[10px] font-black tracking-widest text-gray-400 uppercase">{tag}</span>
               ))}
            </div>
          </div>

          {/* Section 3: Tariff */}
          <div className="md:col-span-5 bg-gradient-to-br from-red-600/10 to-transparent border border-white/5 p-12 rounded-[3rem] space-y-8">
            {/* Fix: Use capitalized variable for icon component */}
            <Icon2 className="text-red-500" size={40} />
            <h2 className="text-3xl font-black uppercase tracking-tight">{sections[2].title}</h2>
            <p className="text-gray-400 leading-relaxed">{sections[2].content}</p>
            <div className="bg-black/40 p-6 rounded-2xl space-y-4">
               <div className="flex justify-between items-center text-xs">
                 <span className="text-gray-500 font-bold uppercase">{lang === 'zh' ? '基础套餐' : 'BASE PLAN'}</span>
                 <span className="font-mono text-green-500">{lang === 'zh' ? '永久免费*' : 'FOREVER FREE*'}</span>
               </div>
               <div className="text-[10px] text-gray-600 uppercase italic">*{lang === 'zh' ? '仅限 BATCH 01 先锋用户' : 'BATCH 01 PIONEERS ONLY'}</div>
            </div>
          </div>

          {/* Section 2: Rights (List) */}
          <div className="md:col-span-12 bg-white/[0.02] border border-white/5 p-12 rounded-[3.5rem] space-y-12">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-4">
                  <h2 className="text-4xl font-black uppercase tracking-tight flex items-center gap-4">
                    {/* Fix: Use capitalized variable for icon component */}
                    <Icon1 className="text-red-600" /> {sections[1].title}
                  </h2>
                  <p className="text-gray-500 text-sm max-w-xl">{lang === 'zh' ? '规范双方在卫星轨道通信架构下的法律与行为准则' : 'Establishing legal and behavioral norms under the orbital communication architecture.'}</p>
                </div>
                <div className="shrink-0">
                  <FileText size={80} className="text-white/5" />
                </div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
                {sections[1].points?.map((point, i) => (
                  <div key={i} className={`flex items-start ${isRTL ? 'space-x-reverse' : ''} space-x-4 group`}>
                    <CheckCircle2 className="text-red-600 mt-1 shrink-0 group-hover:scale-125 transition-transform" size={20} />
                    <span className="text-gray-400 font-medium leading-relaxed group-hover:text-white transition-colors">{point}</span>
                  </div>
                ))}
             </div>
          </div>

          {/* Section 4: Limitations */}
          <div className="md:col-span-8 bg-neutral-900 border border-white/5 p-12 rounded-[3rem] flex flex-col md:flex-row gap-12 items-center">
            <div className="p-8 bg-white/5 rounded-full shrink-0">
              {/* Fix: Use capitalized variable for icon component */}
              <Icon3 className="text-yellow-500" size={64} />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-black uppercase tracking-tight">{sections[3].title}</h2>
              <p className="text-gray-500 leading-relaxed">{sections[3].content}</p>
            </div>
          </div>

          {/* Summary / Acceptance */}
          <div className="md:col-span-4 bg-red-600 p-12 rounded-[3rem] text-center space-y-6 flex flex-col justify-center shadow-2xl shadow-red-600/20">
            <h3 className="text-2xl font-black uppercase tracking-tighter">{lang === 'zh' ? '5. 协议期限' : '5. Term'}</h3>
            <p className="text-white/80 font-bold uppercase text-xs tracking-widest">
              {lang === 'zh' ? '激活即生效，直至注销服务' : 'Active upon activation until account closure'}
            </p>
            <div className="pt-4">
              <button onClick={onClose} className="w-full py-4 bg-white text-black rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform">
                {lang === 'zh' ? '我已了解条约' : 'I UNDERSTAND'}
              </button>
            </div>
          </div>
        </div>

        {/* Legal Footer */}
        <div className="mt-24 text-center space-y-4 opacity-30">
           <Info className="mx-auto" size={20} />
           <p className="text-[10px] font-black uppercase tracking-[0.5em]">TESLA STARLINK ORBITAL AGREEMENT · v2025.04</p>
        </div>
      </div>
    </div>
  );
};
