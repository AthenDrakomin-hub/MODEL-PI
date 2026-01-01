
export const TRANSLATIONS: any = {
  zh: {
    nav: { design: '设计美学', features: 'Π 魔法', order: '预订', action: '立即拥有', portal: '车主通道' },
    hero: { 
      countdown: '创始版最后席位', 
      subtitle: '不仅仅是一台手机。它是您与 Tesla 及全球星链的纽带。即使在无人区，您与家人的联系也从未如此紧密。', 
      endNote: '为普通人打造的未来科技，现已触手可及。', 
      orderNow: '立即锁定我的席位',
      batchTitle: 'BATCH 01 创始特权',
      perks: ['全球卫星流量终身免费', '2年全球官方质保', '官方尊享客服 24/7', '马斯克亲签纪念版']
    },
    comparison: {
      title: '跨代级的飞跃',
      subtitle: '不仅仅是参数的提升，更是交互维度的进化',
      oldWay: '传统旗舰',
      piWay: 'MODEL Π',
      signal: { label: '连接性', old: '依赖地面基站，盲区多', pi: '星链直连，全球无死角' },
      power: { label: '续航能力', old: '每日充电，依赖电网', pi: '光能自充，无限续航' },
      key: { label: '生态集成', old: '独立设备，简单App控制', pi: '原生中枢，意念召唤车辆' }
    },
    launch: {
      remains: '创始版仅剩',
      colorSelect: '选择您的涂层工艺',
      deposit: '预订定金',
      terms: '点击预订即表示同意服务协议'
    },
    docs: {
      'Whitepaper': {
        title: 'Model Π 战略白皮书',
        subtitle: 'v1.2.0-Alpha',
        sections: [
          { title: '愿景', type: 'text', content: '建立多行星文明的通讯基础。让每一位地球公民都能享受无边界的连接。' },
          {
            title: '硬件规格',
            type: 'specs',
            items: [
              { label: '处理器', value: 'Tesla NPU 1.0', detail: '4nm / 12核 高性能架构', icon: 'Cpu' },
              { label: '连接性', value: 'Starlink V3', detail: '10Gbps 卫星直连', icon: 'Satellite' }
            ]
          }
        ]
      },
      '服务条款': {
        title: 'Model Π 全球服务协议',
        subtitle: 'Legal V2.1',
        sections: [
          { title: '1. 账户与所有权', type: 'text', content: '您的 Model Π 必须绑定有效的 Tesla 账户。创始版 (Batch 01) 席位不可转让，除非通过官方验证。' },
          { title: '2. 卫星服务', type: 'text', content: 'Starlink V3 连接服务在受监管区域提供。跨行星通讯协议目前仅适用于火星预部署轨道。' },
          { title: '3. 脑机接口', type: 'text', content: '使用 Neuralink 同步功能即表示您同意数据本地化协议，所有脑波数据在本地 T1 芯片加密。' }
        ]
      },
      '退款政策': {
        title: '定金退还与取消政策',
        subtitle: 'Refund V1.5',
        sections: [
          { title: '无理由退款', type: 'text', content: '在产品进入“制造阶段”之前（通常为发货前 30 天），您可以随时申请全额退还 $89.70 定金。' },
          { title: '退款时效', type: 'text', content: '退款将通过原支付路径返还，处理时间通常为 5-10 个工作日。' },
          { title: '权益失效', type: 'text', content: '一旦申请退款，您的 Batch 01 创始席位及相关终身权益将立即释放给排队中的下一位先锋。' }
        ]
      },
      '隐私声明': {
        title: '数据主权与隐私协议',
        subtitle: 'Privacy V3.0',
        sections: [
          { title: '零上传原则', type: 'text', content: '所有生物识别数据（指纹、脑波、虹膜）均存储于设备本地安全隔离区，绝不上传至任何云端。' },
          { title: 'T1 安全芯片', type: 'text', content: '通过端到端 AES-512 加密。您的个人身份和财务传输通过 T1 芯片进行本地加固，在公共星链网络中完全不可见。' },
          { title: '加密通讯', type: 'text', content: '卫星链路采用 AES-256 端到端加密，确保即便在轨道传输过程中也无法被第三方截获。' }
        ]
      },
      '联系支持': {
        title: '先锋指挥中心',
        subtitle: 'Support Node 01',
        sections: [
          { title: '联系方式', type: 'list', items: ['官方邮箱：model-pi@proton.me', '24/7 紧急加密热线：+1 (888) PI-TESLA', '全球售后网点：覆盖 160 个国家'] },
          { title: '常见问题', type: 'list', items: ['如何查看我的排队位置？', '如何申请加入先锋计划？', '太阳能充电效率低如何解决？'] }
        ]
      }
    },
    footer: { disclaimer: '© 2025 Tesla Model Π Strategic. 网页内容仅供预览，最终规格以发售为准。', links: ['联系支持', '服务条款', '退款政策', '隐私声明'] }
  },
  en: {
    nav: { design: 'Design', features: 'Π Magic', order: 'Order', action: 'Join Now', portal: 'Owner Portal' },
    hero: { 
      countdown: 'BATCH 01 COUNTDOWN', 
      subtitle: "More than a phone. It's your bridge to Tesla and the global Starlink mesh. Never lose connection with your loved ones, even in the middle of nowhere.", 
      orderNow: 'Secure My Model Π'
    },
    comparison: {
      title: 'A Generational Leap',
      subtitle: 'Not just better specs, but a new dimension of interaction',
      oldWay: 'Old Way',
      piWay: 'Π Way',
      signal: { label: 'Signal', old: 'Tower-dependent, dead zones', pi: 'Starlink native, global coverage' },
      power: { label: 'Power', old: 'Daily charging, grid dependent', pi: 'Solar self-charging, infinite' },
      key: { label: 'Ecosystem', old: 'Separate device, Basic App', pi: 'Native hub, Mind-summon' }
    },
    launch: {
      remains: 'Founders Left',
      colorSelect: 'Select Your Finish',
      deposit: 'Pioneer Deposit',
      terms: 'By ordering you agree to our Terms'
    },
    docs: {
      'Terms': {
        title: 'Model Π Global Service Agreement',
        subtitle: 'Legal V2.1',
        sections: [
          { title: '1. Account & Ownership', type: 'text', content: 'Your Model Π must be linked to a valid Tesla account. Batch 01 seats are non-transferable unless verified by Tesla Command.' },
          { title: '2. Satellite Usage', type: 'text', content: 'Starlink V3 services are subject to regional regulations. Interplanetary protocols are active for Mars pre-deployment orbits.' }
        ]
      },
      'Refund Policy': {
        title: 'Refund & Cancellation Policy',
        subtitle: 'Refund V1.5',
        sections: [
          { title: 'Unconditional Refund', type: 'text', content: 'You can request a full refund of your $89.70 deposit at any time before the device enters the "Manufacturing Phase".' },
          { title: 'Processing Time', type: 'text', content: 'Refunds are processed back to the original payment method within 5-10 business days.' }
        ]
      },
      'Support': {
        title: 'Pioneer Support Center',
        subtitle: 'Support Node 01',
        sections: [
          { title: 'Connect', type: 'list', items: ['Official Email: model-pi@proton.me', '24/7 Encrypted Line: +1 (888) PI-TESLA', 'Global Service Hubs: 160+ Countries'] },
          { title: 'FAQ', type: 'list', items: ['How to check my queue position?', 'How to join the Pioneer Plan?', 'Optimizing Solar charging?'] }
        ]
      }
    },
    footer: { disclaimer: '© 2025 Tesla Model Π Strategic. Concept showcase. Final specs subject to change.', links: ['Support', 'Terms', 'Refund Policy'] }
  }
};
