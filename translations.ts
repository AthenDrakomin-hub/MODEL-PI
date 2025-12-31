
import React from 'react';
import { Moon, Fingerprint } from 'lucide-react';

export const TRANSLATIONS: any = {
  zh: {
    nav: { design: '技术白皮书', features: '核心功能', specs: '技术规格', order: '预订', action: '立即预订', portal: '预约者门户' },
    hero: { countdown: '全球交付倒计时', subtitle: '连接全球 60 亿人口的神经终点站。首批先锋版限量 100 万席。', endNote: '抢占仅存的最后份额。', orderNow: '立即预订' },
    marketing: { totalBooked: '全球已预订', fundsRaised: '已筹集定金', activeUsers: '实时在线用户' },
    whitepaper: {
      title: 'Tesla Model π：未来交互中枢技术报告',
      version: 'CONFIDENTIAL v1.0.4 - TECH SPEC',
      tabs: ['核心规格', '概念卖点', '未来展望'],
      specs: [
        { label: '显示屏', value: '6.78" 柔性 OLED', detail: '3200x1440, 1-144Hz LTPO, 3000nits' },
        { label: '处理器', value: 'Tesla NPU 1.0', detail: '集成 AI 核心与安全芯片' },
        { label: '存储', value: '16GB + 1TB/2TB', detail: 'LPDDR5X + UFS 4.0' },
        { label: '摄像头', value: '三重主摄系统', detail: '50MP 1"大底 + 5x 光学变焦' },
        { label: '电池', value: '5200mAh', detail: '100W 有线 / 50W 无线' },
        { label: '耐用性', value: '钛合金与陶瓷', detail: 'IP68 等级, 5 级钛金属' }
      ],
      sellingPoints: [
        { title: 'Starlink 直连', desc: '内置低功耗相控阵天线，在无地面信号区域实现全球无缝通讯。', meta: '卫星原生' },
        { title: 'Tesla 控制中枢', desc: '深度整合，可用手机无感解锁、召唤车辆，控制 Optimus 机器人。', meta: '生态闭环' },
        { title: 'Neuralink 协议', desc: '预留高带宽生物信号接口，为未来非侵入式脑机交互打下基础。', meta: 'BCI Ready' },
        { title: '太阳能充电', desc: '微型光伏矩阵背板，提供持续后备电力，延长户外使用。', meta: '能源自给' }
      ],
      future: [
        { title: 'Mars Mode 概念', desc: '为极端环境（低压、低温）优化的通讯与数据压缩算法储备。', icon: 'Moon' },
        { title: 'DID 与资产托管', desc: '内置安全硬件作为去中心化身份锚点，原生集成 Web3 钱包。', icon: 'Fingerprint' }
      ]
    },
    features: {
      title: '颠覆性功能',
      subtitle: '重新定义智能手机的可能性',
      starlink: { title: '星链直连', desc: '内置星链接收器，在地球任何角落都能实现全球无缝通讯。' },
      tesla: { title: '特斯拉生态控制', desc: '无缝控制您的特斯拉汽车、Powerwall 及 Optimus 机器人。' },
      mars: { title: 'Mars 模式', desc: '支持未来火星殖民地的特殊通信协议，连接多行星文明。' }
    },
    specs: {
      title: '技术规格对比',
      performance: '核心性能指标',
      battery: '24小时续航衰减对比',
      modelName: 'Model Pi',
      competitor: '传统旗舰',
      perfLabels: { p1: '处理速度', p2: 'AI性能', p3: '图形处理', p4: '连接速度' }
    },
    launch: {
      remains: '剩余',
      desc: '全球首发交付进入倒计时。随着时间的流逝，先锋版配额正在被全球意向用户逐步吞噬。',
      intent: '全球实时预约意向',
      seats: '先锋版剩余席位',
      seatsNote: '配额随倒计时实时递减中',
      lock: '锁定先锋席位',
      fullPrice: '全款售价',
      deposit: '预付定金 (30%)',
      checkout: '通过 Stripe 支付定金',
      orderId: '预订编号',
      securedTitle: '席位已锁定',
      estDelivery: '预计发货',
      estTime: '2025年 Q4',
      processing: '正在连接安全支付网关...',
      summary: '订单汇总',
      batch: 'BATCH 01 先锋席位',
      total: '应付金额'
    },
    portal: {
      welcome: '欢迎回来，先锋用户',
      status: '轨道链接状态',
      delivery: '交付进度',
      id: '先锋序列号',
      connected: '已连接 (V3)',
      manufacturing: '生产中',
      syncing: '同步中',
      details: '查看详情'
    },
    footer: {
      links: ['先锋计划', '星链条约', '法律协议', '隐私声明'],
      disclaimer: '© 2025 Model Pi 项目 · model-pi.xyz'
    },
    feedback: {
      title: '意见与反馈',
      subtitle: '您的反馈将直接发送至先锋委员会',
      label: '反馈内容',
      submit: '提交反馈',
      success: '反馈已接收，感谢您的贡献'
    }
  },
  en: {
    nav: { design: 'Whitepaper', features: 'Features', specs: 'Specs', order: 'Order', action: 'Order Now', portal: 'Subscriber Portal' },
    hero: { countdown: 'Global Countdown', subtitle: 'The neural terminal for 6 billion people. First batch limited to 1M seats.', endNote: 'Claim the final quota.', orderNow: 'Order Now' },
    marketing: { totalBooked: 'Global Booked', fundsRaised: 'Funds Raised', activeUsers: 'Active Users' },
    whitepaper: {
      title: 'Tesla Model π: Technical Whitepaper',
      version: 'CONFIDENTIAL v1.0.4 - TECH SPEC',
      tabs: ['CORE SPECS', 'KEY FEATURES', 'FUTURE'],
      specs: [
        { label: 'Display', value: '6.78" Flexible OLED', detail: '3200x1440, 1-144Hz, 3000nits' },
        { label: 'Processor', value: 'Tesla NPU 1.0', detail: 'Integrated AI & Security Enclave' },
        { label: 'Storage', value: '16GB + 1TB/2TB', detail: 'LPDDR5X + UFS 4.0' },
        { label: 'Camera', value: 'Triple Pro System', detail: '50MP 1" Sensor + 5x Optical Zoom' },
        { label: 'Battery', value: '5200mAh', detail: '100W Wired / 50W Wireless' },
        { label: 'Durability', value: 'Titanium & Ceramic', detail: 'IP68 Rating, Grade 5 Titanium' }
      ],
      sellingPoints: [
        { title: 'Native Starlink', desc: 'Integrated phased array antenna for seamless global satellite communication.', meta: 'Satellite Native' },
        { title: 'Tesla Control', desc: 'Deeply integrated vehicle summon and Optimus robot monitoring.', meta: 'Tesla Eco' },
        { title: 'Neuralink Ready', desc: 'High-bandwidth bio-interface for future non-invasive BCI interactions.', meta: 'BCI Ready' },
        { title: 'Solar Backplate', desc: 'Micro-photovoltaic matrix providing backup power in daylight.', meta: 'Energy Auth' }
      ],
      future: [
        { title: 'Mars Mode Concept', desc: 'Compressed protocols optimized for extreme Martian environments.', icon: 'Moon' },
        { title: 'DID & Assets', desc: 'Built-in secure hardware as DID anchor and native Web3 vault.', icon: 'Fingerprint' }
      ]
    },
    features: {
      title: 'Revolutionary Features',
      subtitle: 'Redefining what a smartphone can be',
      starlink: { title: 'Native Starlink', desc: 'Built-in receiver for seamless global communication anywhere on Earth.' },
      tesla: { title: 'Tesla Ecosystem', desc: 'Seamlessly control your Tesla vehicle, Powerwall, and Optimus robots.' },
      mars: { title: 'Mars Mode', desc: 'Supporting future Mars colony protocols, connecting multi-planetary civilizations.' }
    },
    specs: {
      title: 'Specifications',
      performance: 'Core Performance',
      battery: '24h Battery Drain',
      modelName: 'Model Pi',
      competitor: 'Flagships',
      perfLabels: { p1: 'Speed', p2: 'AI Perf', p3: 'Graphics', p4: 'Bandwidth' }
    },
    launch: {
      remains: 'Remains',
      desc: 'Global launch countdown is ticking. Priority quotas are being claimed by users worldwide.',
      intent: 'Global Real-time Interest',
      seats: 'Remaining Quota',
      seatsNote: 'Real-time countdown decreasing',
      progress: 'Quota Lock Progress',
      lock: 'Lock Your Seat',
      fullPrice: 'Full Price',
      deposit: 'Pre-order Deposit (30%)',
      checkout: 'Pay Deposit with Stripe',
      orderId: 'Order ID',
      securedTitle: 'Seat Secured',
      estDelivery: 'Est. Delivery',
      estTime: 'Q4 2025',
      processing: 'Connecting to secure gateway...',
      summary: 'Order Summary',
      batch: 'BATCH 01 Pioneer Seat',
      total: 'Total Due'
    },
    portal: {
      welcome: 'Welcome back, Pioneer',
      status: 'Link Status',
      delivery: 'Delivery Tracking',
      id: 'Pioneer ID',
      connected: 'Connected (V3)',
      manufacturing: 'In Progress',
      syncing: 'Syncing',
      details: 'View Details'
    },
    footer: {
      links: ['Pioneer Plan', 'Starlink Treaty', 'Legal', 'Privacy'],
      disclaimer: '© 2025 Model Pi Project · model-pi.xyz'
    },
    feedback: {
      title: 'Feedback',
      subtitle: 'Your feedback goes directly to the Pioneer Council',
      label: 'Message',
      submit: 'Submit Feedback',
      success: 'Feedback received. Thank you for your contribution.'
    }
  }
};
