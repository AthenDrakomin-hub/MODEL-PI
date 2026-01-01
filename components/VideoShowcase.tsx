
import React from 'react';
import { Package, Shield, Sparkles, Zap, Globe, Cpu } from 'lucide-react';

interface MagicLabelProps {
  icon: React.ElementType;
  title: string;
  desc: string;
}

const MagicLabel = ({ icon: Icon, title, desc }: MagicLabelProps) => (
  <div className="flex flex-col items-center gap-4 text-center group cursor-pointer drop-shadow-2xl">
     <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-red-600 group-hover:scale-125 transition-all border border-white/30">
        <Icon size={24} />
     </div>
     <div className="space-y-1">
        <div className="text-sm font-black uppercase tracking-widest text-white drop-shadow-lg">{title}</div>
        <div className="text-[10px] font-black uppercase tracking-widest text-gray-300 drop-shadow-md">{desc}</div>
     </div>
  </div>
);

export const VideoShowcase = ({ lang, theme }: any) => {
  return (
    <section className="relative w-full py-24 md:py-48 bg-black overflow-hidden">
      {/* 动态星空底纹 */}
      <div className="absolute inset-0 opacity-25">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#ffffff15_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* 开箱仪式感 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
           <div className="relative group">
              <div className="absolute -inset-20 bg-red-600/15 blur-[150px] rounded-full opacity-60" />
              <div className="relative bg-white p-12 md:p-24 rounded-[4rem] shadow-2xl transform -rotate-2 hover:rotate-0 transition-all duration-1000 flex flex-col items-center justify-center text-black border-4 border-gray-100">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg" className="w-16 h-16 mb-8" alt="Tesla" />
                 <div className="text-3xl font-black uppercase tracking-tighter mb-4">BATCH 01</div>
                 <div className="text-5xl font-black text-red-600 drop-shadow-sm">FOUNDER</div>
                 <div className="absolute bottom-10 text-[8px] font-black uppercase tracking-[0.5em] text-black/40">Secured Hardware Container</div>
              </div>
           </div>
           
           <div className="space-y-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-[10px] font-black uppercase text-gray-200">
                 <Package size={14} className="text-red-500" />
                 <span>Exclusive Packaging</span>
              </div>
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-white">
                 Beyond <br/><span className="text-red-600">Hardware.</span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
                 每一部 Model Π 创始版都拥有全球唯一的金属编号，由马斯克亲自签名的钛合金手提箱封装。它是人类向多行星文明迈进的第一步。
              </p>
           </div>
        </div>

        {/* 魔法核心 */}
        <div className="relative w-full aspect-video md:aspect-[21/9] rounded-[4rem] overflow-hidden border border-white/20 group shadow-3xl">
           <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="w-full h-full object-cover grayscale-[0.5] opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
           >
              <source src="https://aka.doubaocdn.sh/s/qmVZ1vl33S" type="video/mp4" />
           </video>
           
           {/* 悬浮在视频上的“魔法”标签 */}
           <div className="absolute inset-0 flex items-center justify-center bg-black/10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-24">
                 <MagicLabel icon={Globe} title="全球同频" desc="无死角覆盖" />
                 <MagicLabel icon={Zap} title="瞬时控制" desc="零延迟感应" />
                 <MagicLabel icon={Cpu} title="智慧生命" desc="自进化系统" />
              </div>
           </div>
           
           <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>
      </div>
    </section>
  );
};
