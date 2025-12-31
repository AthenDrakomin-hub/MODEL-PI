
import React from 'react';
import { 
  Satellite, 
  Cpu, 
  BatteryCharging, 
  ShieldCheck, 
  Share2, 
  Smartphone,
  Zap,
  Waves,
  Globe,
  Radio
} from 'lucide-react';
import { Feature, SpecItem, ColorOption } from './types';

export const COLORS = {
  teslaRed: '#E82127',
  dark: '#0A0A0A',
  charcoal: '#1A1A1A',
  silver: '#D8D8D8',
};

export const FEATURES: Feature[] = [
  {
    id: 'starlink',
    title: 'Starlink V3 Native',
    description: '无需地面基站，直接连接近地轨道卫星。全球延迟低于 20ms，支持跨星球通讯。',
    icon: 'Satellite',
    image: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'neural',
    title: 'Neuralink 0.1s',
    description: '毫秒级脑机同步。通过思想直接操控应用、车辆及 Optimus 机器人。',
    icon: 'Zap',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'solar',
    title: 'Hyper-Solar Shield',
    description: '采用第三代钙钛矿太阳能涂层。日常光照 30 分钟即可维持 24 小时续航。',
    icon: 'BatteryCharging',
    image: 'https://images.unsplash.com/photo-1509391366360-fe5bb5843e0c?auto=format&fit=crop&q=80&w=800'
  }
];

export const SPECS: SpecItem[] = [
  { name: 'AI 计算力', teslaValue: '3200 TFLOPS', competitorValue: '48 TFLOPS', teslaScore: 100, competitorScore: 12 },
  { name: '下行带宽', teslaValue: '10 Gbps', competitorValue: '1.2 Gbps', teslaScore: 98, competitorScore: 30 },
  { name: '卫星延时', teslaValue: '18ms', competitorValue: 'N/A', teslaScore: 100, competitorScore: 5 },
  { name: '材质强度', teslaValue: 'Grade 5 Titanium', competitorValue: 'Alu-Alloy', teslaScore: 95, competitorScore: 50 }
];

export const COLOR_OPTIONS: ColorOption[] = [
  { id: 'obsidian', name: '曜石黑', hex: '#000000', image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=600' },
  { id: 'crimson', name: '极致红', hex: '#E82127', image: 'https://images.unsplash.com/photo-1556656793-062ff9878258?auto=format&fit=crop&q=80&w=600' },
  { id: 'titanium', name: '原钛色', hex: '#71706E', image: 'https://images.unsplash.com/photo-1592890288564-76628a30a657?auto=format&fit=crop&q=80&w=600' }
];

export const getIcon = (name: string) => {
  switch (name) {
    case 'Satellite': return <Satellite className="w-6 h-6" />;
    case 'Cpu': return <Cpu className="w-6 h-6" />;
    case 'BatteryCharging': return <BatteryCharging className="w-6 h-6" />;
    case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
    case 'Zap': return <Zap className="w-6 h-6" />;
    case 'Globe': return <Globe className="w-6 h-6" />;
    case 'Radio': return <Radio className="w-6 h-6" />;
    default: return <Smartphone className="w-6 h-6" />;
  }
};
