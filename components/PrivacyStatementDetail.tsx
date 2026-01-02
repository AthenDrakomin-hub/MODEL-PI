
import React from 'react';
import { X, Shield, Lock, Eye, Brain, Database, UserCheck, BellRing, Info, Fingerprint, Zap } from 'lucide-react';
import { TRANSLATIONS } from '../translations';

export const PrivacyStatementDetail = ({ onClose, lang }: { onClose: () => void, lang: string }) => {
  const isRTL = lang === 'ar';
  
  const getTitle = (l: string) => {
    switch (l) {
      case 'zh': return 'Tesla Model π 隐私声明';
      case 'ru': return 'Заявление о конфиденциальности Tesla Model π';
      case 'ar': return 'بيان الخصوصية لتسلا موديل باي';
      default: return 'Tesla Model π Privacy Statement';
    }
  };

  const sections = [
    {
      title: lang === 'zh' ? '1. 信息收集' : '1. Data Collection',
      icon: Eye,
      items: lang === 'zh' ? [
        '身份信息：姓名、联系方式及收货地址',
        '设备信息：序列号、软件版本及位置数据',
        '生物信号：脑电波及专注力信号（仅本地存储）',
        '通信数据：星链通话记录及流量统计'
      ] : [
        'Identity: Name, contact info, and delivery address',
        'Device: Serial number, software version, and GPS',
        'Bio-signals: EEG and focus signals (Local storage only)',
        'Comms: Starlink call logs and data usage'
      ]
    },
    {
      title: lang === 'zh' ? '2. 使用目的' : '2. Purpose of Use',
      icon: Zap,
      content: lang === 'zh'
        ? '优化产品性能、保障通讯安全及提供个性化脑机交互体验。所有数据处理均遵循最小必要原则。'
        : 'Optimizing performance, ensuring comms security, and providing personalized BCI experiences. All processing follows the principle of minimal necessity.'
    },
    {
      title: lang === 'zh' ? '3. 存储与保护' : '3. Storage & Protection',
      icon: Lock,
      content: lang === 'zh'
        ? '采用端到端加密技术。生物识别数据永久锁定在设备本地 T1 安全芯片中，绝不上传云端。'
        : 'Using end-to-end encryption. Biometric data is permanently locked in the local T1 security chip and never uploaded to the cloud.'
    },
    {
      title: lang === 'zh' ? '4. 共享与披露' : '4. Sharing & Disclosure',
      icon: Database,
      content: lang === 'zh'
        ? '我们绝不向任何第三方出售您的个人信息。仅在获得明确授权或法律要求时进行必要共享。'
        : 'We never sell your personal info to third parties. Sharing only occurs with explicit consent or under legal requirements.'
    },
    {
      title: lang === 'zh' ? '5. 您的权利' : '5. Your Rights',
      icon: UserCheck,
      content: lang === 'zh'
        ? '您有权随时查询、更正、删除个人信息，或撤回生物信号收集授权。'
        : 'You have the right to access, correct, delete personal info, or revoke bio-signal collection consent at any time.'
    }
  ];

  return (
    <div className={`fixed inset-0 z-[200] bg-black text-white overflow-y-auto animate-in fade-in slide-in-from-bottom-10 duration-500 custom-scrollbar ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Immersive Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-red-900/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:40px_40px] opacity-20" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-24 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-24">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-blue-600/10 border border-blue-600/30 rounded-full text-[10px] font-black uppercase text-blue-400 mx-2">
              <Shield size={14} /> <span>Neural Privacy Shield Active</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">{getTitle(lang)}</h1>
            <p className="text-gray-500 text-sm max-w-2xl font-medium">
              {lang === 'zh' 
                ? '我们高度重视您的隐私，尤其是在脑机接口与卫星通讯交织的未来时代，确保您的数字主权。'
                : 'We prioritize your privacy, ensuring your digital sovereignty in an era where brain-computer interfaces and satellite communications intertwine.'}
            </p>
          </div>
          <button onClick={onClose} className="p-4 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/10 group">
            <X size={24} className="group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        {/* Bento Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Content Card */}
          <div className="md:col-span-8 bg-white/[0.02] border border-white/5 p-12 rounded-[3.5rem] space-y-8">
            <div className="flex items-center gap-4 text-blue-500">
               <Fingerprint size={48} />
               <h2 className="text-3xl font-black uppercase tracking-tight">{sections[0].title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {sections[0].items?.map((item, i) => (
                 <div key={i} className="flex items-center gap-4 bg-white/5 p-6 rounded-2xl">
                    <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                    <span className="text-gray-400 text-sm font-bold uppercase">{item}</span>
                 </div>
               ))}
            </div>
          </div>

          {/* Icon Cards */}
          <div className="md:col-span-4 bg-blue-600/10 border border-blue-600/30 p-12 rounded-[3.5rem] flex flex-col justify-center items-center text-center space-y-6">
             <Lock className="text-blue-500" size={64} />
             <h3 className="text-2xl font-black uppercase tracking-tight">{sections[2].title}</h3>
             <p className="text-gray-400 text-sm leading-relaxed">{sections[2].content}</p>
          </div>

          <div className="md:col-span-4 bg-white/[0.02] border border-white/5 p-12 rounded-[3.5rem] space-y-6">
             <Zap className="text-yellow-500" size={40} />
             <h3 className="text-xl font-black uppercase tracking-tight">{sections[1].title}</h3>
             <p className="text-gray-500 text-sm leading-relaxed">{sections[1].content}</p>
          </div>

          <div className="md:col-span-4 bg-white/[0.02] border border-white/5 p-12 rounded-[3.5rem] space-y-6">
             <Database className="text-green-500" size={40} />
             <h3 className="text-xl font-black uppercase tracking-tight">{sections[3].title}</h3>
             <p className="text-gray-500 text-sm leading-relaxed">{sections[3].content}</p>
          </div>

          <div className="md:col-span-4 bg-white/[0.02] border border-white/5 p-12 rounded-[3.5rem] space-y-6">
             <UserCheck className="text-purple-500" size={40} />
             <h3 className="text-xl font-black uppercase tracking-tight">{sections[4].title}</h3>
             <p className="text-gray-500 text-sm leading-relaxed">{sections[4].content}</p>
          </div>

          {/* Consent Section */}
          <div className="md:col-span-12 mt-12 bg-gradient-to-br from-blue-600 to-blue-900 p-12 rounded-[4rem] flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl shadow-blue-500/20">
             <div className="space-y-4 text-center md:text-left">
                <h3 className="text-4xl font-black uppercase tracking-tighter">{lang === 'zh' ? '隐私声明更新' : 'Privacy Updates'}</h3>
                <p className="text-blue-100/70 text-sm max-w-xl">
                  {lang === 'zh' 
                    ? '本声明将随法律法规或产品功能的迭代进行调整。更新后将通过系统弹窗告知。'
                    : 'This statement will be adjusted with legal updates or product iterations. Any updates will be notified via system pop-ups.'}
                </p>
             </div>
             <button onClick={onClose} className="px-12 py-6 bg-white text-blue-900 rounded-3xl font-black uppercase tracking-widest hover:scale-105 transition-transform shrink-0">
                {lang === 'zh' ? '接受并继续' : 'ACCEPT & CONTINUE'}
             </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-24 text-center space-y-6 opacity-20">
           <BellRing className="mx-auto" size={24} />
           <p className="text-[10px] font-black uppercase tracking-[0.6em]">TESLA PRIVACY GUARANTEE · INTERPLANETARY EDITION · v2025.1</p>
        </div>
      </div>
    </div>
  );
};
