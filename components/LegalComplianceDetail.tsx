import React from 'react';
import { Shield, Globe, FileText, CheckCircle, Zap, X } from 'lucide-react';

export const LegalComplianceDetail = ({ onClose, lang }: any) => {
  const t = {
    zh: {
      title: "法律合规与认证详情",
      close: "关闭",
      fccTitle: "美国FCC ID认证",
      ceTitle: "欧盟CE认证",
      ukcaTitle: "英国UKCA认证",
      pseTitle: "日本PSE认证",
      kcTitle: "韩国KC认证",
      privacyTitle: "隐私政策",
      termsTitle: "服务条款",
      warrantyTitle: "保修政策",
      returnTitle: "退换货政策",
      legalTitle: "法律声明",
      back: "返回",
    },
    en: {
      title: "Legal Compliance & Certification Details",
      close: "Close",
      fccTitle: "US FCC ID Certification",
      ceTitle: "EU CE Declaration",
      ukcaTitle: "UK UKCA Certification",
      pseTitle: "Japan PSE Certificate",
      kcTitle: "South Korea KC Certificate",
      privacyTitle: "Privacy Policy",
      termsTitle: "Terms of Service",
      warrantyTitle: "Warranty Policy",
      returnTitle: "Return & Refund Policy",
      legalTitle: "Legal Notice",
      back: "Back",
    }
  };

  const currentLang = t[lang as keyof typeof t] || t.en;

  return (
    <div className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300 overflow-y-auto">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-24">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black uppercase text-white">{currentLang.title}</h1>
          <button 
            onClick={onClose}
            className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="space-y-16">
          {/* Product Compliance Certifications */}
          <section className="bg-white/5 rounded-3xl border border-white/10 p-8 md:p-12">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-red-600/20 border border-red-600/30 rounded-full text-red-400 text-sm font-black uppercase tracking-widest mb-8">
              <Shield size={16} /> <span>Product Compliance</span>
            </div>
            
            <h2 className="text-3xl font-black text-white mb-8">产品合规认证</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-black/30 p-6 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-blue-500" />
                  <h3 className="text-xl font-black text-white">{currentLang.fccTitle}</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Certificate Number: FCC-ID-MPI-202601
                </p>
                <p className="text-gray-400 text-sm">
                  Complies with the technical requirements of the U.S. Federal Communications Commission (FCC) 47 CFR Part 15 and Part 25, including electromagnetic compatibility (EMC), radio frequency exposure (RF Exposure), satellite communication frequency band adaptation, and information security encryption specifications.
                </p>
              </div>
              
              <div className="bg-black/30 p-6 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="w-8 h-8 text-green-500" />
                  <h3 className="text-xl font-black text-white">{currentLang.ceTitle}</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Declaration Number: CE-MPI-202601
                </p>
                <p className="text-gray-400 text-sm">
                  Complies with EU directives including Radio Equipment Directive (RED) 2014/53/EU, Low Voltage Directive (LVD) 2014/35/EU, Electromagnetic Compatibility Directive (EMC) 2014/30/EU, and GDPR for biometric data processing.
                </p>
              </div>
              
              <div className="bg-black/30 p-6 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-red-500" />
                  <h3 className="text-xl font-black text-white">{currentLang.ukcaTitle}</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Declaration Number: UKCA-MPI-202601
                </p>
                <p className="text-gray-400 text-sm">
                  Complies with UK regulations including The Radio Equipment Regulations 2017, The Electrical Equipment (Safety) Regulations 2016, and The Electromagnetic Compatibility Regulations 2016.
                </p>
              </div>
              
              <div className="bg-black/30 p-6 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-yellow-500" />
                  <h3 className="text-xl font-black text-white">{currentLang.pseTitle}</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Certificate Number: PSE-MPI-202601
                </p>
                <p className="text-gray-400 text-sm">
                  Complies with Japan's Electrical Appliance and Material Safety Law (DENAN), JIS standards for electromagnetic compatibility, safety, and built-in battery safety.
                </p>
              </div>
            </div>
          </section>

          {/* Legal Documents */}
          <section className="bg-white/5 rounded-3xl border border-white/10 p-8 md:p-12">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-red-600/20 border border-red-600/30 rounded-full text-red-400 text-sm font-black uppercase tracking-widest mb-8">
              <FileText size={16} /> <span>Legal Documents</span>
            </div>
            
            <h2 className="text-3xl font-black text-white mb-8">法律文件</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-black/30 p-6 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-8 h-8 text-cyan-500" />
                  <h3 className="text-xl font-black text-white">{currentLang.privacyTitle}</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Information Collection and Protection
                </p>
                <ul className="text-gray-400 text-sm space-y-2">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5" /> Collection of necessary personal information during registration and ordering</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5" /> Industry-standard security technologies for data protection</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5" /> No sharing of personal information without explicit authorization</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5" /> User rights to access, correct, and delete personal information</li>
                </ul>
              </div>
              
              <div className="bg-black/30 p-6 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-8 h-8 text-orange-500" />
                  <h3 className="text-xl font-black text-white">{currentLang.termsTitle}</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Terms of Service and User Agreement
                </p>
                <ul className="text-gray-400 text-sm space-y-2">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5" /> Product pre-order and transaction rules</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5" /> Deposit payment and balance settlement</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5" /> Logistics and global distribution terms</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5" /> Website disclaimer and limitation of liability</li>
                </ul>
              </div>
              
              <div className="bg-black/30 p-6 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-8 h-8 text-teal-500" />
                  <h3 className="text-xl font-black text-white">{currentLang.warrantyTitle}</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Product Warranty and After-sales Service
                </p>
                <ul className="text-gray-400 text-sm space-y-2">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5" /> 12-month global limited warranty</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5" /> Coverage for product quality issues</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5" /> Exclusions for human damage and force majeure</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5" /> Global warranty service process</li>
                </ul>
              </div>
              
              <div className="bg-black/30 p-6 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-8 h-8 text-indigo-500" />
                  <h3 className="text-xl font-black text-white">{currentLang.returnTitle}</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Return and Refund Policy
                </p>
                <ul className="text-gray-400 text-sm space-y-2">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5" /> 7-day return window for quality issues</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5" /> Deposit refund conditions</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5" /> Return process and logistics arrangements</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5" /> Non-returnable items and conditions</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Legal Notice */}
          <section className="bg-white/5 rounded-3xl border border-white/10 p-8 md:p-12">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-red-600/20 border border-red-600/30 rounded-full text-red-400 text-sm font-black uppercase tracking-widest mb-8">
              <Zap size={16} /> <span>Legal Notice</span>
            </div>
            
            <h2 className="text-3xl font-black text-white mb-8">{currentLang.legalTitle}</h2>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-400 mb-4">
                All contents of this website (including but not limited to text, pictures, logos, trademarks, software, etc.) are owned by Tesla Model π Exclusive Store or have been authorized for use by the relevant rights holders, and are protected by relevant laws and regulations such as the Copyright Law of the People's Republic of China and the Trademark Law. 
              </p>
              
              <p className="text-gray-400 mb-4">
                We will try our best to ensure the normal operation and service quality of the website, but we do not make absolute commitments to the uninterrupted nature, timeliness and accuracy of the website service. If the website cannot be used normally or the service is delayed due to technical failures, network problems, third-party service interruptions and other reasons, we will try our best to repair it, but will not bear the direct or indirect losses arising therefrom (unless caused by our intentional or gross negligence).
              </p>
              
              <p className="text-gray-400 mb-4">
                Product pre-order transactions through this website involve certain market risks, policy risks and logistics risks. You shall make transaction decisions on the basis of fully understanding the relevant risks. We shall not be responsible for losses caused by the above risks.
              </p>
              
              <p className="text-gray-400">
                Any dispute arising from the use of the website's services or the performance of this Agreement shall first be resolved through friendly negotiation between both parties; if the negotiation fails, either party has the right to file a lawsuit with the people's court with jurisdiction in our location. This Legal Notice and relevant website legal documents shall all be applicable to the laws of the People's Republic of China (excluding conflict of laws rules).
              </p>
            </div>
          </section>
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