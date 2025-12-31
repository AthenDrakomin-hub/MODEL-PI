
import React, { useState } from 'react';
import { 
  X, Shield, Users, Target, Calendar, Award, 
  CheckCircle2, Info, Satellite, Zap, Brain, Sun, Microscope
} from 'lucide-react';
import { TRANSLATIONS } from '../translations';
import { PioneerApplicationForm } from './PioneerApplicationForm';

export const PioneerPlanDetail = ({ onClose, lang }: { onClose: () => void, lang: string }) => {
  const [hasAgreed, setHasAgreed] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const isRTL = lang === 'ar';

  const getPlanTitle = (l: string) => {
    switch (l) {
      case 'zh': return 'Tesla Model π 先锋计划';
      case 'ja': return 'Tesla Model π パイオニア計画';
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
    <div className={`fixed inset-0 z-[200] bg-black text-white overflow-y-auto animate-in fade-in slide-in-from-right-10 duration-500 custom-scrollbar ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Side Progress Decoration */}
      <div className={`fixed ${isRTL ? 'right-8' : 'left-8'} top-1/2 -translate-y-1/2 hidden xl:flex flex-col space-y-8 opacity-20`}>
        <div className="w-1 h-32 bg-red-600 rounded-full" />
        <span className="[writing-mode:vertical-rl] font-black uppercase tracking-[1em] text-xs">Pioneer Status: Active</span>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 md:py-24">
        {/* Header */}
        <div className="flex justify-between items-start mb-20">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-600/10 border border-red-600/30 rounded text-[10px] font-black uppercase text-red-500 mx-2">
              <Shield size={12} /> <span>Pioneer Program v1.0</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none">{getPlanTitle(lang)}</h1>
          </div>
          <button onClick={onClose} className="p-4 bg-white/5 hover:bg-red-600 rounded-full transition-all group">
            <X size={24} className="group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        {isApplying ? (
          <PioneerApplicationForm onClose={onClose} lang={lang} />
        ) : (
          <div className="space-y-16 animate-in fade-in duration-700">
            {/* Overview Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-7 space-y-6">
                <h2 className="text-2xl font-black uppercase flex items-center space-x-3">
                  <Info className="text-red-600 mx-2" /> <span>{sections[0].title}</span>
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed">{sections[0].content}</p>
              </div>
              <div className="md:col-span-5 bg-red-600/5 border border-red-600/20 rounded-3xl p-8 text-center">
                <Calendar className="mx-auto text-red-600 mb-4" size={48} />
                <div className="text-3xl font-black">120 DAYS</div>
                <div className="text-[10px] font-black uppercase text-gray-500 tracking-widest">{lang === 'zh' ? '总测试周期' : 'Total Test Cycle'}</div>
              </div>
            </div>

            {/* Grid Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 space-y-8">
                <h2 className="text-xl font-black uppercase flex items-center space-x-3">
                  <Users className="text-red-600 mx-2" /> <span>{sections[1].title}</span>
                </h2>
                <ul className="space-y-4">
                  {sections[1].items?.map((item, i) => (
                    <li key={i} className={`flex items-start ${isRTL ? 'space-x-reverse' : ''} space-x-4 text-sm text-gray-400`}>
                      <CheckCircle2 className="text-red-600 shrink-0 mt-0.5" size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 space-y-8">
                <h2 className="text-xl font-black uppercase flex items-center space-x-3">
                  <Award className="text-red-600 mx-2" /> <span>{sections[3].title}</span>
                </h2>
                <ul className="space-y-4">
                  {sections[3].items?.map((item, i) => (
                    <li key={i} className={`flex items-start ${isRTL ? 'space-x-reverse' : ''} space-x-4 text-sm text-gray-400`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Core Modules Grid */}
            <div className="space-y-8">
              <h2 className="text-2xl font-black uppercase flex items-center space-x-3">
                <Microscope className="text-red-600 mx-2" /> <span>{sections[2].title}</span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {sections[2].grid?.map((g, i) => {
                  const GridIcon = g.icon;
                  return (
                    <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center group hover:border-red-600 transition-all">
                      <GridIcon className="mx-auto mb-4 text-gray-500 group-hover:text-red-600 transition-colors" size={32} />
                      <div className="font-black text-xs uppercase mb-2">{g.label}</div>
                      <div className="text-[10px] text-gray-500 leading-tight uppercase">{g.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA / NDA Section */}
            <div className="border-t border-white/10 pt-16 text-center space-y-10">
              <div className={`flex items-center justify-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
                <input 
                  type="checkbox" 
                  id="nda" 
                  className="w-5 h-5 rounded border-gray-500 bg-transparent text-red-600 focus:ring-red-600"
                  onChange={(e) => setHasAgreed(e.target.checked)}
                />
                <label htmlFor="nda" className="text-sm text-gray-400 font-bold uppercase tracking-widest cursor-pointer">
                  {lang === 'zh' ? '我已阅读并同意遵守《保密协议》及《先锋计划条款》' : 'I have read and agree to the NDA and Pioneer Terms'}
                </label>
              </div>
              <button 
                onClick={() => setIsApplying(true)}
                disabled={!hasAgreed}
                className="px-20 py-6 bg-red-600 text-white font-black uppercase tracking-[0.3em] rounded-full hover:bg-white hover:text-black transition-all shadow-2xl disabled:opacity-30 disabled:grayscale"
              >
                {lang === 'zh' ? '提交加入申请' : 'Submit Application'}
              </button>
              <p className="text-[10px] text-gray-600 uppercase font-black tracking-widest">
                CONFIDENTIAL DOCUMENT · TESLA INTERNAL ONLY · © 2025
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
