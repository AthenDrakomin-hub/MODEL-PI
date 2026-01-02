import React from 'react';
import { 
  X, Zap, Rocket, Smartphone, Cpu, Layers, Camera, 
  BatteryCharging, Satellite, Car, Brain, Sun, 
  Target, Users, Settings, Mountain, Monitor, 
  Network, CheckCircle2, Maximize, Search, User, 
  Unlock, Video, Thermometer, List, TrendingUp, 
  Gamepad, Music, Pointer, HeartPulse, Ship, 
  Shield, BarChart3, Flag, Globe, Info, Binary,
  HardDrive
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ModelPiLogo } from '../Logo';
import { TRANSLATIONS } from '../translations';

export const WhitepaperDetail = ({ onClose, lang }: { onClose: () => void, lang: string }) => {
  const isRTL = lang === 'ar';
  const t = TRANSLATIONS[lang] || TRANSLATIONS['en'];
  
  // 硬件性能对比数据
  const performanceData = [
    { name: 'Model Pi', value: 3200, color: '#E82127' },
    { name: 'Generic Flagship', value: 48, color: '#9ca3af' },
  ];

  const getLabel = (zh: string, en: string, ru: string, ar: string) => {
    if (lang === 'zh') return zh;
    if (lang === 'ru') return ru;
    if (lang === 'ar') return ar;
    return en;
  };

  return (
    <div className={`fixed inset-0 z-[250] bg-white text-gray-900 overflow-y-auto animate-in fade-in zoom-in duration-500 custom-scrollbar ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* 强化版关闭按钮 */}
      <button 
        onClick={onClose} 
        className={`fixed top-8 ${isRTL ? 'left-8' : 'right-8'} z-[300] p-5 bg-red-600 text-white rounded-full shadow-[0_15px_40px_rgba(232,33,39,0.4)] hover:scale-110 hover:bg-black transition-all active:scale-95 group`}
        title="Close Whitepaper (Esc)"
      >
        <X size={28} className="group-hover:rotate-90 transition-transform" />
      </button>

      {/* 顶部导航 */}
      <div className="sticky top-0 z-[260] bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 py-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Binary className="text-red-600" size={24} />
          <h1 className="text-xl font-black uppercase tracking-tighter">
            Tesla Model Pi <span className="text-gray-400 font-medium ml-2">v1.2.0 STRATEGIC ARCHIVE</span>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 md:p-16 space-y-24">
        
        {/* 第一部分：核心愿景 */}
        <div className="relative overflow-hidden bg-neutral-50 rounded-[3.5rem] p-10 md:p-20 border border-gray-100">
           <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-red-600/10 border border-red-600/20 rounded-full mb-8">
                 <Zap size={14} className="text-red-600" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-red-600">Confidential / BATCH 01</span>
              </div>
              <h2 className="text-4xl md:text-8xl font-black text-gray-900 tracking-tighter uppercase leading-[0.85] mb-8">
                The Next <br/><span className="text-red-600">{getLabel("文明", "Civilization", "Цивилизация", "حضارة")}</span> Hub.
              </h2>
              <p className="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed">
                {t.docs.Whitepaper.sections[0].content}
              </p>
           </div>
           <div className="absolute right-0 top-0 opacity-5 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
              <Binary size={600} />
           </div>
        </div>

        {/* 第二部分：硬核参数对比 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div className="space-y-10">
              <h3 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
                 <BarChart3 className="text-red-600" /> {getLabel("AI 算力压制", "AI Compute Dominance", "Превосходство AI", "هيمنة الذكاء الاصطناعي")}
              </h3>
              <p className="text-gray-500 leading-relaxed">
                {getLabel(
                  "基于 Tesla NPU 1.0 架构，Model Pi 的本地 AI 处理能力达到惊人的 3200 TFLOPS，是目前市面旗舰手机的 60 倍以上。",
                  "Powered by Tesla NPU 1.0, Model Pi offers 3200 TFLOPS of local AI processing—60x faster than current flagships.",
                  "На базе архитектуры Tesla NPU 1.0 локальная вычислительная мощность ИИ достигает 3200 TFLOPS, что в 60 раз быстрее флагманов.",
                  "بفضل معمارية Tesla NPU 1.0، تصل قدرة المعالجة المحلية للذكاء الاصطناعي إلى 3200 TFLOPS، وهو أسرع بـ 60 مرة من الهواتف الرائدة."
                )}
              </p>
              <div className="h-64 w-full bg-neutral-50 rounded-3xl p-8 border border-gray-100">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData} layout="vertical" margin={{ left: 20 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={100} fontSize={10} fontWeight="900" axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={32}>
                      {performanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <SpecBox label="Processor" val="Tesla NPU 1.0" detail="4nm / 12-Core" icon={<Cpu size={18}/>} />
              <SpecBox label="Display" val="Pro-XDR OLED" detail="1-144Hz LTPO" icon={<Monitor size={18}/>} />
              <SpecBox 
                label="Connectivity" 
                val="Starlink V3" 
                detail={t.docs.Whitepaper.sections[1].items[1].detail} 
                icon={<Satellite size={18}/>} 
              />
              <SpecBox label="Storage" val="2TB NVMe" detail="Mars Hardened" icon={<HardDrive size={18}/>} />
           </div>
        </div>

        {/* 第三部分：四大技术支柱 */}
        <div className="space-y-12">
           <h3 className="text-3xl font-black uppercase tracking-tighter">{getLabel("战略支柱", "Strategic Pillars", "Стратегические столпы", "الركائز الاستراتيجية")}</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <StrategyCard 
                icon={<Satellite className="text-red-600" size={32} />} 
                title="Starlink V3 Native"
                desc={t.docs.Whitepaper.sections[1].items[1].detail}
              />
              <StrategyCard 
                icon={<Brain className="text-purple-600" size={32} />} 
                title="Neuralink Sync"
                desc={getLabel("内置非侵入式脑机接口芯片，支持毫秒级意念控屏。为未来人类进化提供标准接口。", "Non-invasive BCI support for thought-based interaction. Standard interface for human evolution.", "Поддержка неинвазивного нейроинтерфейса для управления мыслями. Стандарт эволюции человека.", "دعم واجهة الدماغ والحاسوب (BCI) غير الجراحية للتفاعل عبر التفكير.")}
              />
              <StrategyCard 
                icon={<BatteryCharging className="text-yellow-500" size={32} />} 
                title="Hyper-Solar Shield"
                desc={getLabel("机身背板采用第三代高效钙钛矿太阳能涂层。阳光下 1 小时即可补充 40% 电量。", "3rd-gen Perovskite solar coating. 1 hour of sunlight recovers 40% battery capacity.", "Солнечное покрытие 3-го поколения. 1 час на солнце восстанавливает 40% заряда.", "طلاء شمسي من الجيل الثالث. ساعة واحدة من ضوء الشمس تستعيد 40% من سعة البطارية.")}
              />
              <StrategyCard 
                icon={<Shield className="text-cyan-500" size={32} />} 
                title="Data Sovereignty"
                desc={getLabel("所有生物识别数据与 T-OS 系统逻辑均在本地 T1 安全芯片运行，完全脱离中心化审查。", "All biometric and OS logic processed locally on the T1 secure chip, free from centralized censorship.", "Вся биометрия и логика ОС обрабатываются локально на чипе T1, без цензуры.", "تتم معالجة جميع القياسات الحيوية ومنطق نظام التشغيل محليًا على شريحة T1 الآمنة.")}
              />
           </div>
        </div>

        {/* 底部：总结 */}
        <div className="pt-12 border-t border-gray-100 text-center space-y-8">
           <ModelPiLogo className="w-16 h-16 text-red-600 mx-auto" />
           <div className="max-w-2xl mx-auto">
              <h4 className="text-2xl font-black uppercase mb-4">{getLabel("改变一切", "Change Everything", "Изменить все", "تغيير كل شيء")}</h4>
              <p className="text-gray-400 text-sm leading-relaxed italic">
                {getLabel(
                  "“地球只是一个开始。Model Pi 是为多行星时代准备的第一个移动控制中心。”",
                  "\"Earth is just the beginning. Model Pi is the first mobile command center prepared for the multi-planetary era.\"",
                  "\"Земля — это только начало. Model Pi — это первый мобильный командный центр эпохи мультипланетарности.\"",
                  "\"الأرض هي مجرد البداية. موديل باي هو أول مركز قيادة متنقل جاهز للعصر المتعدد الكواكب.\""
                )}
              </p>
           </div>
           <button 
            onClick={onClose}
            className="px-16 py-6 bg-black text-white rounded-full font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-2xl"
           >
             {getLabel("了解并返回", "ACKNOWLEDGE & RETURN", "ПОНЯТНО И НАЗАД", "تأكيد والعودة")}
           </button>
        </div>

      </div>
    </div>
  );
};

const SpecBox = ({ label, val, detail, icon }: any) => (
  <div className="bg-neutral-50 border border-gray-100 p-8 rounded-3xl hover:bg-white hover:shadow-xl transition-all">
    <div className="text-red-600 mb-4">{icon}</div>
    <div className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-1">{label}</div>
    <div className="text-xl font-black text-gray-900 leading-tight">{val}</div>
    <div className="text-[10px] font-bold text-gray-400 mt-2 uppercase">{detail}</div>
  </div>
);

const StrategyCard = ({ icon, title, desc }: any) => (
  <div className="p-10 bg-neutral-50 border border-gray-100 rounded-[2.5rem] space-y-6 hover:shadow-2xl hover:bg-white transition-all">
     {icon}
     <h4 className="text-2xl font-black uppercase tracking-tight text-gray-900">{title}</h4>
     <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </div>
);