
import React from 'react';
import { ExternalLink, ShieldCheck, Satellite, Scale, Shield, Twitter, Send, Music, Facebook, Mail } from 'lucide-react';
import { ModelPiLogo } from '../Logo';

export const Footer = ({ t, onOpenDoc }: any) => (
  <footer className="py-24 bg-black border-t border-white/5 px-6">
    <div className="max-w-7xl mx-auto flex flex-col items-center space-y-16">
      <div className="relative group cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
         <ModelPiLogo className="w-16 h-16 text-red-600 animate-pulse group-hover:scale-110 transition-transform" glow />
         <div className="absolute inset-0 bg-red-600/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-[11px] font-black uppercase tracking-widest text-gray-500">
        {(t.footer.links || []).map((link: string) => {
          const isHighlight = ['先锋计划', 'Pioneer Plan', '星链条约', 'Starlink Treaty'].some(k => link.includes(k));
          return (
            <button key={link} onClick={() => onOpenDoc(link)} className={`flex items-center space-x-2 transition-all hover:text-white ${isHighlight ? 'text-red-500' : ''}`}>
              <span>{link}</span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col items-center space-y-8">
        <div className="flex items-center space-x-10">
          {[<Twitter size={20} />, <Send size={20} />, <Music size={20} />, <Facebook size={20} />].map((icon, i) => (
            <button key={i} className="text-gray-600 hover:text-white transition-all transform hover:-translate-y-1">{icon}</button>
          ))}
        </div>
        
        <a href="mailto:model-pi@protonmail.com" className="flex items-center space-x-3 text-gray-500 hover:text-red-500 transition-all group">
          <Mail size={16} />
          <span className="text-[11px] font-black uppercase tracking-[0.3em]">model-pi@protonmail.com</span>
        </a>
      </div>

      <div className="flex flex-col items-center space-y-4 pt-10">
        <div className="text-[10px] text-gray-800 text-center uppercase tracking-[0.8em] font-black max-w-lg leading-relaxed">
          {t.footer.disclaimer}
        </div>
        <div className="flex gap-12 opacity-20 grayscale grayscale-100">
           {['AES-256', 'TLS 1.3', 'FIPS 140-2'].map(tag => (
             <span key={tag} className="text-[9px] font-black uppercase tracking-widest">{tag}</span>
           ))}
        </div>
      </div>
    </div>
  </footer>
);
