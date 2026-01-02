
import React from 'react';
import { X, Scale, FileText, Handshake, Truck, ShieldCheck, Copyright, AlertOctagon, Info, CheckCircle2 } from 'lucide-react';
import { TRANSLATIONS } from '../translations';

export const LegalAgreementDetail = ({ onClose, lang }: { onClose: () => void, lang: string }) => {
  const isRTL = lang === 'ar';
  
  const getTitle = (l: string) => {
    switch (l) {
      case 'zh': return 'Tesla Model π 法律协议';
      case 'ru': return 'Юридическое соглашение Tesla Model π';
      case 'ar': return 'الاتفاقية القانونية لتسلا موديل باي';
      default: return 'Tesla Model π Legal Agreement';
    }
  };

  const sections = [
    {
      title: lang === 'zh' ? '1. 标的物与服务' : '1. Product & Service',
      icon: Handshake,
      content: lang === 'zh' 
        ? '乙方购买的产品为 Model π 未来交互中枢设备。甲方提供的服务包含交付、保修、技术支持及软件升级。'
        : 'The object of purchase is the Model π Interaction Hub. Services include delivery, warranty, tech support, and software updates.'
    },
    {
      title: lang === 'zh' ? '2. 价格与支付' : '2. Price & Payment',
      icon: FileText,
      content: lang === 'zh'
        ? '总价以官方公示为准。支付定金后因乙方原因取消，定金不予退还；若因甲方原因，甲方双倍返还。'
        : 'Price is as officially listed. Deposits are non-refundable if cancelled by user; Tesla pays double if unable to deliver.'
    },
    {
      title: lang === 'zh' ? '3. 交付与验收' : '3. Delivery & Acceptance',
      icon: Truck,
      content: lang === 'zh'
        ? '甲方应在全款支付后15个工作日内交付。乙方应在接收时现场检查外观与配件。'
        : 'Tesla shall deliver within 15 working days after full payment. User must inspect appearance and accessories upon receipt.'
    },
    {
      title: lang === 'zh' ? '4. 保修与售后' : '4. Warranty & Support',
      icon: ShieldCheck,
      content: lang === 'zh'
        ? '提供2年或5万公里保修服务。质量问题免费维修，人为损坏或改装不属于保修范围。'
        : '2-year or 50,000km warranty provided. Free repairs for quality issues; excluding misuse or unauthorized modifications.'
    },
    {
      title: lang === 'zh' ? '5. 知识产权' : '5. Intellectual Property',
      icon: Copyright,
      content: lang === 'zh'
        ? '甲方对产品知识产权享有独占权。乙方不得逆向工程或擅自拆解。'
        : 'Tesla holds exclusive IP rights. Reverse engineering or unauthorized disassembly is strictly prohibited.'
    },
    {
      title: lang === 'zh' ? '6. 责任限制' : '6. Liability',
      icon: AlertOctagon,
      content: lang === 'zh'
        ? '赔偿金额不得超过产品总价。甲方不对间接损失（如商业损失）承担责任。'
        : 'Total liability shall not exceed the product price. Tesla is not liable for indirect losses such as business interruption.'
    }
  ];

  return (
    <div className={`fixed inset-0 z-[200] bg-[#050505] text-white overflow-y-auto animate-in fade-in slide-in-from-bottom-10 duration-500 custom-scrollbar ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-24 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-24">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase text-gray-400 mx-2">
              <Scale size={14} className="text-red-600" /> <span>Legal Compliance v2.1</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">{getTitle(lang)}</h1>
            <p className="text-gray-500 text-sm max-w-2xl font-medium">
              {lang === 'zh' 
                ? '本协议明确了双方就 Model π 设备购买、使用及相关服务的权利义务关系。'
                : 'This agreement clarifies the rights and obligations of both parties regarding the purchase and use of Model π devices.'}
            </p>
          </div>
          <button onClick={onClose} className="p-4 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/10 group">
            <X size={24} className="group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, i) => {
            const Icon = section.icon;
            return (
              <div key={i} className="group bg-white/[0.02] border border-white/5 p-10 rounded-[2.5rem] hover:bg-white/[0.04] hover:border-red-600/30 transition-all">
                <Icon className="text-red-600 mb-6 group-hover:scale-110 transition-transform" size={32} />
                <h2 className="text-xl font-black uppercase mb-4 tracking-tight">{section.title}</h2>
                <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">{section.content}</p>
              </div>
            );
          })}
        </div>

        {/* Footer Summary */}
        <div className="mt-12 bg-gradient-to-r from-red-600/20 to-transparent border border-red-600/30 p-12 rounded-[3.5rem] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-2xl font-black uppercase tracking-tight">{lang === 'zh' ? '7. 变更与解除' : '7. Termination'}</h3>
            <p className="text-gray-400 text-sm max-w-xl">
              {lang === 'zh' 
                ? '乙方长期拖欠款项或侵犯知识产权，甲方有权解除协议；产品存在严重质量问题无法修复，乙方有权解除。'
                : 'Tesla may terminate for non-payment or IP infringement; User may terminate for unfixable critical defects.'}
            </p>
          </div>
          <button onClick={onClose} className="px-10 py-5 bg-red-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all shrink-0 shadow-2xl">
            {lang === 'zh' ? '确认并签署' : 'CONFIRM & SIGN'}
          </button>
        </div>

        {/* Metadata */}
        <div className="mt-24 text-center space-y-4 opacity-20">
           <Info className="mx-auto" size={20} />
           <p className="text-[10px] font-black uppercase tracking-[0.5em]">TESLA MODEL PI PURCHASE AGREEMENT · CN-2025-ALPHA</p>
        </div>
      </div>
    </div>
  );
};
