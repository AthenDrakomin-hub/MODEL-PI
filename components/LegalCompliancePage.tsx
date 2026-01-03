import React from 'react';
import { Shield, FileText, Globe, CheckCircle, Star, Zap } from 'lucide-react';

export const LegalCompliancePage = ({ onClose, lang }: any) => {
  const t = {
    zh: {
      title: "法律合规与认证",
      subtitle: "Model π 手机全球认证与法律合规文件",
      fccTitle: "FCC ID 认证",
      fccDesc: "美国联邦通信委员会认证",
      ceTitle: "CE 认证",
      ceDesc: "欧盟符合性声明",
      ukcaTitle: "UKCA 认证",
      ukcaDesc: "英国合格评定认证",
      pseTitle: "PSE 认证",
      pseDesc: "日本电气用品安全法认证",
      kcTitle: "KC 认证",
      kcDesc: "韩国信息通信设备认证",
      privacyTitle: "隐私政策",
      privacyDesc: "个人信息保护与数据安全",
      termsTitle: "服务条款",
      termsDesc: "使用条款与服务协议",
      warrantyTitle: "保修政策",
      warrantyDesc: "产品质量保证与售后服务",
      returnTitle: "退换货政策",
      returnDesc: "退换货条件与流程",
      legalTitle: "法律声明",
      legalDesc: "版权与法律责任声明",
      back: "返回",
    },
    en: {
      title: "Legal Compliance",
      subtitle: "Model π Phone Global Certifications & Legal Compliance Documents",
      fccTitle: "FCC ID Certification",
      fccDesc: "Federal Communications Commission Certification",
      ceTitle: "CE Declaration",
      ceDesc: "European Conformity Declaration",
      ukcaTitle: "UKCA Certification",
      ukcaDesc: "UK Conformity Assessed Certification",
      pseTitle: "PSE Certification",
      pseDesc: "Japan Electrical Appliance Safety Law Certification",
      kcTitle: "KC Certification",
      kcDesc: "Korea Certification for Information Technology Products",
      privacyTitle: "Privacy Policy",
      privacyDesc: "Personal Information Protection & Data Security",
      termsTitle: "Terms of Service",
      termsDesc: "Terms of Use & Service Agreement",
      warrantyTitle: "Warranty Policy",
      warrantyDesc: "Product Quality Guarantee & After-sales Service",
      returnTitle: "Return Policy",
      returnDesc: "Return Conditions & Process",
      legalTitle: "Legal Notice",
      legalDesc: "Copyright & Legal Liability Statement",
      back: "Back",
    }
  };

  const currentLang = t[lang as keyof typeof t] || t.en;

  const complianceDocs = [
    {
      id: 'fcc',
      title: currentLang.fccTitle,
      description: currentLang.fccDesc,
      icon: <Shield className="w-6 h-6 text-blue-500" />,
      status: 'verified',
      region: 'US'
    },
    {
      id: 'ce',
      title: currentLang.ceTitle,
      description: currentLang.ceDesc,
      icon: <Shield className="w-6 h-6 text-green-500" />,
      status: 'verified',
      region: 'EU'
    },
    {
      id: 'ukca',
      title: currentLang.ukcaTitle,
      description: currentLang.ukcaDesc,
      icon: <Shield className="w-6 h-6 text-red-500" />,
      status: 'verified',
      region: 'UK'
    },
    {
      id: 'pse',
      title: currentLang.pseTitle,
      description: currentLang.pseDesc,
      icon: <Shield className="w-6 h-6 text-yellow-500" />,
      status: 'verified',
      region: 'JP'
    },
    {
      id: 'kc',
      title: currentLang.kcTitle,
      description: currentLang.kcDesc,
      icon: <Shield className="w-6 h-6 text-purple-500" />,
      status: 'verified',
      region: 'KR'
    }
  ];

  const legalDocs = [
    {
      id: 'privacy',
      title: currentLang.privacyTitle,
      description: currentLang.privacyDesc,
      icon: <FileText className="w-6 h-6 text-cyan-500" />,
      status: 'active'
    },
    {
      id: 'terms',
      title: currentLang.termsTitle,
      description: currentLang.termsDesc,
      icon: <FileText className="w-6 h-6 text-orange-500" />,
      status: 'active'
    },
    {
      id: 'warranty',
      title: currentLang.warrantyTitle,
      description: currentLang.warrantyDesc,
      icon: <FileText className="w-6 h-6 text-teal-500" />,
      status: 'active'
    },
    {
      id: 'return',
      title: currentLang.returnTitle,
      description: currentLang.returnDesc,
      icon: <FileText className="w-6 h-6 text-indigo-500" />,
      status: 'active'
    },
    {
      id: 'legal',
      title: currentLang.legalTitle,
      description: currentLang.legalDesc,
      icon: <FileText className="w-6 h-6 text-rose-500" />,
      status: 'active'
    }
  ];

  return (
    <div className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300 overflow-y-auto">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-24">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl md:text-6xl font-black uppercase text-white mb-2">{currentLang.title}</h1>
            <p className="text-gray-400 text-lg">{currentLang.subtitle}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <Zap className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Compliance Certifications */}
          <div>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-red-600/20 border border-red-600/30 rounded-full text-red-400 text-sm font-black uppercase tracking-widest mb-8">
              <Globe size={16} /> <span>Global Certifications</span>
            </div>
            
            <h2 className="text-2xl font-black text-white mb-8">合规认证</h2>
            
            <div className="space-y-4">
              {complianceDocs.map((doc) => (
                <div 
                  key={doc.id}
                  className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {doc.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-black text-white text-lg">{doc.title}</h3>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                      <p className="text-gray-400 mb-3">{doc.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="inline-flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          Verified
                        </span>
                        <span>•</span>
                        <span>{doc.region}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Documents */}
          <div>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-red-600/20 border border-red-600/30 rounded-full text-red-400 text-sm font-black uppercase tracking-widest mb-8">
              <FileText size={16} /> <span>Legal Documents</span>
            </div>
            
            <h2 className="text-2xl font-black text-white mb-8">法律文件</h2>
            
            <div className="space-y-4">
              {legalDocs.map((doc) => (
                <div 
                  key={doc.id}
                  className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {doc.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-black text-white text-lg">{doc.title}</h3>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                      <p className="text-gray-400 mb-3">{doc.description}</p>
                      <div className="text-sm text-gray-500">
                        <span className="inline-flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-gray-500 text-sm">
            Tesla Model π Exclusive Store - Committed to Global Compliance and User Data Protection
          </p>
          <p className="text-gray-600 text-xs mt-2">
            All certifications and legal documents are valid as of January 2026
          </p>
        </div>
      </div>
    </div>
  );
};