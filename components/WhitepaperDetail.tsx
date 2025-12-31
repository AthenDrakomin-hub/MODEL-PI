
import React from 'react';
import { 
  X, Zap, Rocket, Smartphone, Cpu, Layers, Camera, 
  BatteryCharging, Satellite, Car, Brain, Sun, 
  Target, Users, Settings, Mountain, Monitor, 
  Network, CheckCircle, Maximize, Search, User, 
  Unlock, Video, Thermometer, List, TrendingUp, 
  Gamepad, Music, Pointer, HeartPulse, Ship, 
  Shield, BarChart3, Flag, Globe, Info
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TRANSLATIONS } from '../translations';

export const WhitepaperDetail = ({ onClose, lang }: { onClose: () => void, lang: string }) => {
  const t = TRANSLATIONS[lang];
  const isRTL = lang === 'ar';
  
  const chargingData = [
    { name: 'Model π', value: 30, color: '#22c55e' },
    { name: 'iPhone 16 Pro Max', value: 65, color: '#9ca3af' },
    { name: 'Galaxy S25 Ultra', value: 55, color: '#9ca3af' },
  ];

  const getHardwareLabel = (l: string) => {
    switch (l) {
      case 'zh': return '核心硬件配置';
      case 'ja': return 'ハードウェア構成';
      case 'ko': return '하드웨어 구성';
      case 'ru': return 'Конфигурация оборудования';
      case 'ar': return 'تكوين الأجهزة';
      case 'it': return 'Configurazione Hardware';
      case 'pt': return 'Configuração de Hardware';
      case 'nl': return 'Hardwareconfiguratie';
      case 'tr': return 'Donanım Yapılandırması';
      case 'pl': return 'Konfiguracja Sprzętowa';
      case 'sv': return 'Hårdvarukonfiguration';
      case 'es': return 'Configuración de Hardware';
      case 'fr': return 'Configuration Matérielle';
      case 'de': return 'Hardware-Konfiguration';
      default: return 'Hardware Configuration';
    }
  };

  const getPositioningLabel = (l: string) => {
    switch (l) {
      case 'zh': return '产品定位';
      case 'ja': return '製品ポジショニング';
      case 'ko': return '제품 포지셔닝';
      case 'ru': return 'Позиционирование продукта';
      case 'ar': return 'موضع المنتج';
      case 'it': return 'Posizionamento del Prodotto';
      case 'pt': return 'Posicionamento do Produto';
      case 'nl': return 'Productpositionering';
      case 'tr': return 'Ürün Konumlandırma';
      case 'pl': return 'Pozycjonowanie Produktu';
      case 'sv': return 'Produktpositionering';
      case 'es': return 'Posicionamiento del Producto';
      case 'fr': return 'Positionnement du Produit';
      case 'de': return 'Produktpositionierung';
      default: return 'Product Positioning';
    }
  };

  const getChargingLabel = (l: string) => {
    switch (l) {
      case 'zh': return '充电速度对比';
      case 'ja': return '充電速度比較';
      case 'ko': return '충전 속도 비교';
      case 'ru': return 'Сравнение зарядки';
      case 'ar': return 'مقارنة الشحن';
      case 'it': return 'Confronto Ricarica';
      case 'pt': return 'Comparativo de Carga';
      case 'nl': return 'Oplaadvergelijking';
      case 'tr': return 'Şarj Karşılaştırması';
      case 'pl': return 'Porównanie Ładowania';
      case 'sv': return 'Laddningsjämförelse';
      case 'es': return 'Comparación de Carga';
      case 'fr': return 'Comparaison de Charge';
      case 'de': return 'Ladevergleich';
      default: return 'Charging Comparison';
    }
  };

  const getConclusionLabel = (l: string) => {
    switch (l) {
      case 'zh': return '总结与展望';
      case 'ja': return '結論と展望';
      case 'ko': return '결론 및 전망';
      case 'ru': return 'Заключение и перспективы';
      case 'ar': return 'الخلاصة والآفاق';
      case 'it': return 'Conclusione e Prospettive';
      case 'pt': return 'Conclusão e Perspetivas';
      case 'nl': return 'Conclusie en Vooruitzichten';
      case 'tr': return 'Sonuç ve Gelecek';
      case 'pl': return 'Podsumowanie i Perspektywy';
      case 'sv': return 'Sammanfattning och Framtid';
      case 'es': return 'Conclusión y Perspectivas';
      case 'fr': return 'Conclusion et Perspectives';
      case 'de': return 'Fazit und Ausblick';
      default: return 'Conclusion and Outlook';
    }
  };

  const getBackLabel = (l: string) => {
    switch (l) {
      case 'zh': return '回到主页';
      case 'ja': return 'ハブに戻る';
      case 'ko': return '홈으로 돌아가기';
      case 'ru': return 'ВЕРНУТЬСЯ НА ГЛАВНУЮ';
      case 'ar': return 'العودة إلى المركز';
      case 'it': return 'TORNA ALLA HOME';
      case 'pt': return 'VOLTAR AO INÍCIO';
      case 'nl': return 'TERUG NAAR HUB';
      case 'tr': return 'ANA SAYFAYA DÖN';
      case 'pl': return 'POWRÓT DO GŁÓWNEJ';
      case 'sv': return 'TILLBAKA TILL HUBBEN';
      case 'es': return 'VOLVER AL INICIO';
      case 'fr': return 'RETOUR À L\'ACCUEIL';
      case 'de': return 'ZURÜCK ZUM HUB';
      default: return 'BACK TO HUB';
    }
  };

  const getPositioningText = (l: string) => {
    switch (l) {
      case 'ru': return 'Важный переход от автопроизводителя к глобальной технологической компании. Хаб нового поколения, объединяющий продукты Tesla, Starlink и Neuralink.';
      case 'ar': return 'تحول حاسم من شركة لتصنيع السيارات إلى شركة تكنولوجية عالمية. مركز من الجيل القادم يدمج منتجات تسلا وستارلينك ونيورالينك.';
      case 'it': return 'Una transizione cruciale da produttore di auto a azienda tecnologica globale. Un hub di nuova generazione che integra Tesla, Starlink e Neuralink.';
      case 'pt': return 'Uma transição crucial de fabricante de automóveis para empresa tecnológica global. Um hub de nova geração que integra produtos Tesla, Starlink e Neuralink.';
      case 'nl': return 'Een cruciale overgang van autofabrikant naar wereldwijd technologiebedrijf. Een hub van de volgende generatie die Tesla, Starlink en Neuralink integreert.';
      case 'tr': return 'Otomobil üreticisinden küresel bir teknoloji şirketine kritik geçiş. Tesla ürünlerini, Starlink\'i ve Neuralink\'i birleştiren yeni nesil bir merkez.';
      case 'pl': return 'Kluczowe przejście od producenta samochodów do globalnej firmy technologicznej. Hub nowej generacji integrujący produkty Tesla, Starlink i Neuralink.';
      case 'sv': return 'En avgörande övergång från biltillverkare till ett globalt teknikföretag. En nästa generations hub som integrerar Teslas produkter, Starlink och Neuralink.';
      case 'ja': return '自動車メーカーから総合テクノロジー企業への重要な転換点。Tesla製品、Starlink、Neuralinkを統合する次世代ハブ。';
      case 'ko': return '자동차 제조업체에서 종합 기술 기업으로의 중요한 전환점입니다. 테슬라 제품, 스타링크, 뉴럴링크를 통합하는 차세대 허브입니다.';
      case 'es': return 'Una transición crucial de fabricante de automóviles a empresa de tecnología integral. Un centro de próxima generación que integra productos Tesla, Starlink y Neuralink.';
      case 'fr': return 'Une transition cruciale de constructeur automobile à entreprise technologique intégrale. Un hub de nouvelle generazione intégrant les produits Tesla, Starlink et Neuralink.';
      case 'de': return 'Ein entscheidender Übergang vom Automobilhersteller zum ganzheitlichen Technologieunternehmen. Ein Hub der nächsten Generation, der Tesla-Produkte, Starlink und Neuralink integriert.';
      default: return 'A crucial transition from automaker to a global technology firm. A next-gen hub integrating Tesla products, Starlink, and Neuralink.';
    }
  };

  const getConclusionText = (l: string) => {
    switch (l) {
      case 'ru': return 'Tesla Model π — это не просто смартфон, а узел взаимодействия с будущим. Интегрируя Starlink и Neuralink, мы открываем новую эру мобильной связи.';
      case 'ar': return 'إن تسلا موديل باي ليس مجرد هاتف ذكي، بل هو مركز تفاعل يربطنا بالمستقبل. من خلال دمج ستارلينك ونيورالينك، نفتح حقبة جوال جديدة.';
      case 'it': return 'Tesla Model π non è solo uno smartphone, ma un centro di interazione per il futuro. Integrando Starlink e Neuralink, apriamo una nuova era mobile.';
      case 'pt': return 'O Tesla Model π não é apenas um smartphone, mas um centro de interação para o futuro. Integrando Starlink e Neuralink, abrimos uma nova era móvel.';
      case 'nl': return 'Tesla Model π is niet zomaار een smartphone, maar een interactiehub voor de toekomst. Door Starlink en Neuralink te integreren, openen we een nieuw mobiel tijdperk.';
      case 'tr': return 'Tesla Model π sadece bir akıllı telefon değil, geleceği birbirine bağlayan bir etkileşim merkezidir. Mobil cihazlarda yeni bir dönem başlatıyoruz.';
      case 'pl': return 'Tesla Model π to nie tylko smartfon, ale centrum interakcji łączące przyszłość. Otwieramy nową erę urządzeń mobilnych.';
      case 'sv': return 'Tesla Model π är inte bara en smartphone, utan en interaktionshubb som kopplar samman framtiden. Vi öppnar en ny era för mobila enheter.';
      case 'ja': return 'は単なるスマートフォンではなく、未来をつなぐインタラクションハブです。Starlink、Neuralink、Teslaエコシステムの融合により、モバイルの新しい时代を切り拓きます。';
      case 'ko': return '는 단순한 스마트폰이 아니라 미래를 연결하는 인터랙션 허브입니다. 스타링크, 뉴럴링크, 테슬라 에코시스템의 결합을 통해 모바일의 새로운 시대를 열어갑니다.';
      case 'es': return 'no es solo un smartphone, sino un centro de interacción que conecta el futuro. A través de la integración profunda de Starlink, Neuralink y el ecosistema Tesla, estamos abriendo una nueva era en dispositivos móviles.';
      case 'fr': return 'n\'est pas seulement un smartphone, maar un hub d\'interaction connectant le futur. Grâce à l\'intégration profonde de Starlink, Neuralink et l\'écosystème Tesla, nous ouvrons une nouvelle ère dans les appareils mobiles.';
      case 'de': return 'ist nicht nur ein Smartphone, sondern ein Interaktions-Hub, der die Zukunft verbindet. Durch die tiefe Integration von Starlink, Neuralink und dem Tesla-Ökosystem eröffnen wir eine neue Ära mobiler Geräte.';
      default: return 'Tesla Model π is not just a smartphone, but an interaction hub connecting the future. By integrating Starlink and Neuralink, we open a new mobile era.';
    }
  };

  return (
    <div className={`fixed inset-0 z-[150] bg-white text-gray-900 overflow-y-auto animate-in fade-in slide-in-from-bottom-10 duration-500 custom-scrollbar ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Top Header */}
      <div className="sticky top-0 z-[160] bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Zap className="text-blue-500" size={24} />
          <h1 className="text-xl font-black uppercase tracking-tighter mx-2">Tesla Model π <span className="text-gray-400 font-medium ml-2">Technical Whitepaper</span></h1>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-black">
          <X size={24} />
        </button>
      </div>

      <div className="max-w-7xl mx-auto p-6 md:p-12">
        {/* Title Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-500/0 to-blue-500/5 border border-gray-100 rounded-[2.5rem] p-8 md:p-12 mb-8">
          <div className="relative z-10">
            <div className="flex items-center mb-6">
              <Zap className="text-4xl md:text-5xl text-blue-500 mx-4" />
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase">Tesla Model π</h2>
            </div>
            <p className="text-2xl md:text-3xl text-gray-600 font-light mb-2">{t.whitepaper.title}</p>
            <p className="text-sm text-gray-400 font-mono tracking-widest uppercase">{t.whitepaper.version}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Executive Summary */}
          <div className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-green-500/0 to-green-500/5 border border-gray-100 rounded-[2.5rem] p-8 flex flex-col">
            <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center uppercase tracking-tight">
              <Rocket className="text-green-500 mx-3" /> {t.whitepaper.tabs[0]}
            </h3>
            <div className="space-y-8 flex-grow">
              <div>
                <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">{getHardwareLabel(lang)}</h4>
                <ul className="space-y-3">
                  {t.whitepaper.specs.map((item: any, i: number) => (
                    <li key={i} className="flex items-center text-gray-700 font-medium">
                      <Zap className="text-green-500 mx-3 shrink-0" size={18} /> {item.label}: {item.value}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">{t.whitepaper.tabs[1]}</h4>
                <ul className="space-y-3">
                  {t.whitepaper.sellingPoints.map((item: any, i: number) => (
                    <li key={i} className="flex items-center text-gray-700 font-medium">
                      <CheckCircle className="text-green-500 mx-3 shrink-0" size={18} /> {item.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Product Positioning */}
          <div className="md:col-span-2 bg-gradient-to-br from-purple-500/0 to-purple-500/5 border border-gray-100 rounded-[2.5rem] p-8">
            <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center uppercase">
              <Target className="text-purple-500 mx-3" /> {getPositioningLabel(lang)}
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              {getPositioningText(lang)}
            </p>
            <div className="flex flex-wrap gap-2">
              {['Performance', 'Ecosystem', 'Future'].map(tag => (
                <span key={tag} className="px-4 py-1.5 bg-purple-50 text-purple-600 rounded-full text-xs font-black uppercase tracking-wider">{tag}</span>
              ))}
            </div>
          </div>

          {/* Charts Section */}
          <div className="md:col-span-2 bg-gradient-to-br from-blue-500/0 to-blue-500/5 border border-gray-100 rounded-[2.5rem] p-8 md:p-12">
            <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center uppercase tracking-tight">
              <BarChart3 className="text-blue-500 mx-3" /> {getChargingLabel(lang)}
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chargingData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={100} fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} orientation={isRTL ? 'right' : 'left'} />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="value" radius={isRTL ? [10, 0, 0, 10] : [0, 10, 10, 0]} barSize={24}>
                    {chargingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Footer Summary */}
          <div className="md:col-span-4 bg-gray-900 text-white rounded-[2.5rem] p-12 text-center space-y-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
               <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent" />
            </div>
            <div className="relative z-10 space-y-6">
              <Flag className="text-green-400 mx-auto mb-4" size={48} />
              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">{getConclusionLabel(lang)}</h3>
              <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl font-light leading-relaxed">
                Tesla Model π {getConclusionText(lang)}
              </p>
              <div className="pt-8">
                <button onClick={onClose} className="px-12 py-5 bg-white text-black rounded-full font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-2xl">
                  {getBackLabel(lang)}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 border-t border-gray-100 text-center">
        <p className="text-xs font-black uppercase tracking-[0.5em] text-gray-300">© 2025 Model Pi Technical Research · Confidential Document</p>
      </div>
    </div>
  );
};
