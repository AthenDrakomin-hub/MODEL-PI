
import React from 'react';
import { ExternalLink, ShieldCheck, Satellite, Scale, Shield, Twitter, Send, Music, Facebook, Mail } from 'lucide-react';
import { ModelPiLogo } from '../Logo';

export const Footer = ({ t, onOpenDoc }: any) => (
  <footer className="py-24 bg-black border-t border-white/5 px-6">
    <div className="max-w-7xl mx-auto flex flex-col items-center space-y-12">
      {/* Logo & Top Scroll */}
      <div className="relative group cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
         <ModelPiLogo className="w-16 h-16 text-red-600 animate-pulse group-hover:scale-110 transition-transform" glow />
         <div className="absolute inset-0 bg-red-600/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      {/* Primary Links */}
      <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-[11px] font-black uppercase tracking-widest text-gray-500">
        {(t.footer.links || []).map((link: string) => {
          const isPioneer = ['先锋计划', 'Pioneer Plan', 'パイオニア計画', 'Программа Pioneer', 'برنامج الرواد', 'Plan Pioneer', 'Lote 01 Asiento Pioneer', 'Batch 01 Siège Pioneer', 'Batch 01 Pioneer Platz', 'Lotto 01 Posto Pioneer', 'Batch 01 Pioneer Plaats', 'Batch 01 Pioneer Hak', 'Batch 01 Pioneer-plats'].includes(link);
          const isTreaty = ['星链条约', 'Starlink Treaty', 'スターリンク条約', 'Договор Starlink', 'معاهدة ستارلينك', 'Tratado Starlink', 'Traité Starlink', 'Starlink Vertrag', 'Trattato Starlink', 'Starlink Verdrag', 'Traktat Starlink', 'Starlink Anlaşması', 'Starlink-fördraget'].includes(link);
          const isLegal = ['法律协议', 'Legal', '法的合意', 'Юридическая инфо', 'قانوني', 'Legale', 'Juridisch', 'Hukuki', 'Legalny', 'Legal Agreements'].includes(link);
          const isPrivacy = ['隐私声明', 'Privacy', '隐私', 'プライバシー声明', 'Приватность', 'الخصوصية', 'Privacidad', 'Confidentialité', 'Privacy Policy'].includes(link);

          return (
            <button 
              key={link} 
              onClick={() => onOpenDoc(link)} 
              className={`flex items-center space-x-2 transition-all hover:text-white ${isPioneer || isTreaty || isLegal || isPrivacy ? 'text-red-500/80 hover:text-red-500' : ''}`}
            >
              {isPioneer && <ShieldCheck size={12} className="animate-pulse" />}
              {isTreaty && <Satellite size={12} className="animate-pulse" />}
              {isLegal && <Scale size={12} className="animate-pulse" />}
              {isPrivacy && <Shield size={12} className="animate-pulse" />}
              <span>{link}</span>
            </button>
          );
        })}
      </div>

      {/* Social Media & Contact Matrix */}
      <div className="flex flex-col items-center space-y-6">
        <div className="flex items-center space-x-8">
          {[
            { icon: <Twitter size={18} />, href: "https://x.com/tesla", label: "X" },
            { icon: <Send size={18} />, href: "https://t.me/modelpi", label: "Telegram" },
            { icon: <Music size={18} />, href: "https://tiktok.me/model_pi", label: "TikTok" },
            { icon: <Facebook size={18} />, href: "https://facebook.com/tesla", label: "Facebook" }
          ].map((social, idx) => (
            <a 
              key={idx}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-red-600 hover:-translate-y-1 transition-all duration-300 relative group"
              aria-label={social.label}
            >
              {social.icon}
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[8px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {social.label}
              </span>
            </a>
          ))}
        </div>
        
        {/* Company Email */}
        <a href="mailto:model-pi@protonmail.com" className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-all group">
          <Mail size={14} className="group-hover:animate-bounce" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">model-pi@protonmail.com</span>
        </a>
      </div>

      {/* External Domain & Disclaimer */}
      <div className="flex flex-col items-center space-y-4 pt-4">
        <a href="https://model-pi.xyz" target="_blank" className="flex items-center space-x-2 text-white/40 hover:text-red-600 transition-all text-sm font-black tracking-[0.2em]">
          <span>MODEL-PI.XYZ</span> <ExternalLink size={14} />
        </a>
        <p className="text-[10px] text-gray-700 text-center uppercase tracking-[0.5em] font-bold">{t.footer.disclaimer}</p>
      </div>

      {/* Security Badge Decoration */}
      <div className="pt-8 border-t border-white/5 w-full max-w-xs flex justify-around items-center grayscale opacity-30">
        <div className="flex items-center space-x-1"><div className="w-2 h-2 bg-white rounded-full" /><span className="text-[8px] font-black uppercase">AES-256</span></div>
        <div className="flex items-center space-x-1"><div className="w-2 h-2 bg-white rounded-full" /><span className="text-[8px] font-black uppercase">TLS 1.3</span></div>
        <div className="flex items-center space-x-1"><div className="w-2 h-2 bg-white rounded-full" /><span className="text-[8px] font-black uppercase">FIPS 140-2</span></div>
      </div>
    </div>
  </footer>
);
