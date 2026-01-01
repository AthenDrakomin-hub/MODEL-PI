
import React, { useState } from 'react';
import { 
  X, Shield, Users, Target, Calendar, Award, 
  CheckCircle2, Info, Satellite, Zap, Brain, Sun,
  ArrowLeft, Lock as LucideLock
} from 'lucide-react';
import { PioneerApplicationForm } from './PioneerApplicationForm';

export const PioneerPlanDetail = ({ onClose, lang }: { onClose: () => void, lang: string }) => {
  const [hasAgreed, setHasAgreed] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const isRTL = lang === 'ar';

  const getPlanTitle = (l: string) => {
    switch (l) {
      case 'zh': return 'Tesla Model π 先锋计划';
      case 'ja': return 'Tesla Model π パイオニア计划';
      case 'ko': return 'Tesla Model π 파이오니어 플랜';
      case 'ru': return 'Программа Tesla Model π Pioneer';
      case 'ar': return 'برنامج تسلا موديل باي للرواد';
      default: return 'Tesla Model π Pioneer Plan';
    }
  };

  const sections = [
    {
      id: 'overview',
      icon: Info,
      title: lang === 'zh' ? '1. 计划概述' : lang === 'ru' ? '1. Обзор программы' : lang === 'ar' ? '1. نظرة عامة' : '1. Overview',
      content: lang === 'zh' 
        ? 'Tesla针对首款未来交互中枢设备Model π开展的前瞻性技术验证与用户共创项目。旨在联合全球科技先锋用户，提前验证核心创新功能，为产品正式量产优化提供关键数据支撑。'
        : 'A forward-looking technical verification and user co-creation project for Model π. Aiming to unite global tech pioneers to verify core innovations before mass production.'
    },
    {
      id: 'requirements',
      icon: Users,
      title: lang === 'zh' ? '2. 招募条件' : '2. Requirements',
      items: lang === 'zh' ? [
        '年满18周岁，具备完全民事行为能力',
        '科技爱好者、Tesla生态现有用户（车主、能源用户优先）',
        '户外探险/专业作业从业者（如远洋船员、野外科研人员）',
        '具备良好的技术感知能力和文字表达能力',
        '严格遵守保密协议，不披露未公开信息'
      ] : [
        '18+ years old with full legal capacity',
        'Tech enthusiasts, existing Tesla owners/users preferred',
        'Outdoor adventurers / professionals (e.g., sailors, researchers)',
        'Strong technical perception and reporting skills',
        'Strict adherence to Confidentiality Agreements'
      ]
    },
    {
      id: 'content',
      icon: Target,
      title: lang === 'zh' ? '3. 测试内容' : '3. Test Modules',
      grid: [
        { icon: Satellite, label: 'Starlink', desc: lang === 'zh' ? '极端环境通信稳定性测试' : 'Extreme environment comms' },
        { icon: Zap, label: 'Ecosystem', desc: lang === 'zh' ? '特斯拉多设备联动流畅度' : 'Multi-device synergy' },
        { icon: Brain, label: 'Neuralink', desc: lang === 'zh' ? '非侵入式脑机接口兼容性' : 'BCI compatibility' },
        { icon: Sun, label: 'Solar', desc: lang === 'zh' ? '光伏背板充电效率验证' : 'Solar efficiency' }
      ]
    },
    {
      id: 'rights',
      icon: Award,
      title: lang === 'zh' ? '4. 用户权益' : '4. User Rights',
      items: lang === 'zh' ? [
        '免费获得测试样机一台（表现优异者获优先购买权）',
        'Tesla官方专属技术支持，直接对接研发团队',
        '承担测试期间产生的Starlink通信及充电费用',
        '授予“技术探索官”专属认证及荣誉勋章',
        '最高10000美元的Tesla product代金券奖励'
      ] : [
        'Free test prototype (priority purchase rights for top performers)',
        'Direct access to Tesla R&D and tech support',
        'All Starlink and charging costs covered during testing',
        'Exclusive "Technical Explorer" certification',
        'Up to $10,000 in Tesla product vouchers'
      ]
    }
  ];

  return (
    <div className={`fixed inset-0 z-[1200] bg-black text-white overflow-y-auto animate-in fade-in duration-500 custom-scrollbar ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_#E8212715_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-24 relative z-10">
        {/* Navigation Header */}
        <div className="flex justify-between items-center mb-16 md:mb-24">
          <div className="flex items-center gap-4">
             {isApplying && (
               <button 
                onClick={() => setIsApplying(false)}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/10 group"
               >
                 <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
               </button>
             )}
             <div className="space-y-2">
                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-600/10 border border-red-600/30 rounded text-[9px] font-black uppercase text-red-500 mx-2">
                  <Shield size={10} /> <span>Pioneer Program v1.0.2</span>
                </div>
                <h1 className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-none">{getPlanTitle(lang)}</h1>
             </div>
          </div>
          <button onClick={onClose} className="p-4 bg-white/5 hover:bg-red-600 rounded-full transition-all group border border-white/10">
            <X size={24} className="group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        {isApplying ? (
          <PioneerApplicationForm onClose={onClose} lang={lang} />
        ) : (
          <div className="space-y-20 animate-in fade-in duration-700">
            {/* Overview Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-8 space-y-8">
                <div className="space-y-6">
                  <h2 className="text-3xl font-black uppercase flex items-center space-x-3">
                    <Info className="text-red-600 mx-2" /> <span>{sections[0].title}</span>
                  </h2>
                  <p className="text-gray-400 text-xl leading-relaxed font-medium">{sections[0].content}</p>
                </div>
                
                {/* Core Modules Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {sections[2].grid?.map((g, i) => {
                    const GridIcon = g.icon;
                    return (
                      <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center group hover:border-red-600 transition-all hover:-translate-y-1">
                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-red-600/10 group-hover:text-red-600 transition-colors">
                           <GridIcon size={24} />
                        </div>
                        <div className="font-black text-[10px] uppercase mb-1">{g.label}</div>
                        <div className="text-[8px] text-gray-500 leading-tight uppercase font-bold">{g.desc}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="md:col-span-4 space-y-6">
                 <div className="bg-red-600/5 border border-red-600/20 rounded-[3rem] p-10 text-center space-y-4">
                    <Calendar className="mx-auto text-red-600 mb-2" size={40} />
                    <div className="text-5xl font-black tracking-tighter">120 <span className="text-xl text-red-500">DAYS</span></div>
                    <div className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">{lang === 'zh' ? '总测试周期' : 'TOTAL TEST CYCLE'}</div>
                 </div>
                 <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 flex flex-col items-center text-center">
                    <Users className="text-gray-600 mb-4" size={32} />
                    <div className="text-xs font-black uppercase tracking-widest text-white">Global Cohort</div>
                    <div className="text-[9px] font-bold text-gray-600 uppercase mt-2">Limited to 1,000 Verified Pioneers</div>
                 </div>
              </div>
            </div>

            {/* List Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/[0.03] border border-white/5 rounded-[3.5rem] p-12 space-y-10 hover:bg-white/[0.05] transition-all">
                <h2 className="text-2xl font-black uppercase flex items-center space-x-3">
                  <Users className="text-red-600 mx-2" /> <span>{sections[1].title}</span>
                </h2>
                <ul className="space-y-6">
                  {sections[1].items?.map((item, i) => (
                    <li key={i} className={`flex items-start ${isRTL ? 'space-x-reverse' : ''} space-x-4 text-sm font-medium text-gray-400 group`}>
                      <div className="w-6 h-6 bg-red-600/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-red-600 group-hover:text-white transition-colors">
                        <CheckCircle2 size={14} />
                      </div>
                      <span className="group-hover:text-white transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/[0.03] border border-white/5 rounded-[3.5rem] p-12 space-y-10 hover:bg-white/[0.05] transition-all">
                <h2 className="text-2xl font-black uppercase flex items-center space-x-3">
                  <Award className="text-red-600 mx-2" /> <span>{sections[3].title}</span>
                </h2>
                <ul className="space-y-6">
                  {sections[3].items?.map((item, i) => (
                    <li key={i} className={`flex items-start ${isRTL ? 'space-x-reverse' : ''} space-x-4 text-sm font-medium text-gray-400 group`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0 mt-2 shadow-[0_0_8px_rgba(232,33,39,0.8)]" />
                      <span className="group-hover:text-white transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA / NDA Section */}
            <div className="border-t border-white/10 pt-20 text-center space-y-12">
              <div className="max-w-2xl mx-auto space-y-8">
                 <div className={`flex items-center justify-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <input 
                      type="checkbox" 
                      id="nda" 
                      className="w-6 h-6 rounded-lg border-white/10 bg-white/5 text-red-600 focus:ring-red-600 cursor-pointer"
                      onChange={(e) => setHasAgreed(e.target.checked)}
                    />
                    <label htmlFor="nda" className="text-sm text-gray-500 font-black uppercase tracking-[0.2em] cursor-pointer hover:text-white transition-colors">
                      {lang === 'zh' ? '我已阅读并同意遵守《保密协议》及《先锋计划条款》' : 'I have read and agree to the NDA and Pioneer Terms'}
                    </label>
                 </div>
                 
                 <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-red-600 animate-scan opacity-30" />
                    <p className="text-xs text-gray-400 font-medium leading-relaxed uppercase tracking-wider mb-8">
                       {lang === 'zh' ? '注意：提交申请即意味着您同意公开您的技术背景以供审核。' : 'Note: Submitting an application implies consent for technical background verification.'}
                    </p>
                    <button 
                      onClick={() => setIsApplying(true)}
                      disabled={!hasAgreed}
                      className="px-24 py-7 bg-red-600 text-white font-black uppercase tracking-[0.4em] text-sm rounded-full hover:bg-white hover:text-black transition-all shadow-[0_20px_50px_rgba(232,33,39,0.3)] disabled:opacity-20 disabled:grayscale active:scale-95 flex items-center justify-center gap-4 mx-auto"
                    >
                      <Zap size={20} />
                      {lang === 'zh' ? '启动申请序列' : 'INITIATE APPLICATION SEQUENCE'}
                    </button>
                 </div>
              </div>
              
              <div className="flex justify-center gap-12 opacity-20 grayscale grayscale-100">
                 <div className="flex items-center gap-2">
                    <LucideLock size={16} /> <span className="text-[10px] font-black uppercase tracking-widest">Orbital Encryption</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <Shield size={16} /> <span className="text-[10px] font-black uppercase tracking-widest">Confidential Protocol</span>
                 </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
