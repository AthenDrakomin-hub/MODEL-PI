
export const TRANSLATIONS: any = {
  zh: {
    common: { loading: '正在连接卫星...', assistantTitle: 'Pi 助手', assistantPlaceholder: '问点你想知道的...', assistantThinking: '思考中...', back: '返回' },
    nav: { design: '长啥样', features: '黑科技', order: '想买', action: '立即预订', portal: '我的账号' },
    hero: { 
      countdown: '创始版最后名额', 
      subtitle: '这不只是一台手机，它是你连接特斯拉和星链的钥匙。就算你在深山老林没信号，用它也能给家里打通电话。', 
      orderNow: '抢个位子',
      batchTitle: '首批用户特权',
      perks: ['全球卫星流量永久免费', '2年全球保修', '24小时专属人工客服', '马斯克签名版包装箱']
    },
    comparison: {
      title: '这才是未来手机',
      subtitle: '别拿旧时代的手机跟 Model Pi 比，没法比',
      oldWay: '普通高端机',
      piWay: '特斯拉 Model Pi',
      signal: { label: '信号', old: '没基站就没信号，盲区多', pi: '直连星链卫星，全球哪都有信号' },
      power: { label: '电量', old: '一天一充，出门得带充电宝', pi: '背面能晒太阳充电，只要有光就有电' },
      key: { label: '车机联动', old: '打开App点半天', pi: '靠近就解锁，想一下车就过来了' }
    },
    launch: {
      remains: '创始版还剩',
      colorSelect: '选个颜色',
      deposit: '定金',
      terms: '预订即代表同意我们的规矩'
    },
    docs: {
      'Whitepaper': {
        title: 'Model Pi 说明书',
        subtitle: 'v1.2.0',
        sections: [
          { title: '我们的目标', type: 'text', content: '让地球上任何一个角落的人都能上网，不管你在南极还是撒哈拉沙漠。' },
          {
            title: '硬件配置',
            type: 'specs',
            items: [
              { label: '大脑', value: 'Tesla NPU', detail: '目前最强的手机芯片', icon: 'Cpu' },
              { label: '上网', value: 'Starlink V3', detail: '自带卫星天线，速度极快', icon: 'Satellite' }
            ]
          }
        ]
      },
      '服务条款': {
        title: '预订协议',
        subtitle: '简单版',
        sections: [
          { title: '1. 账号', type: 'text', content: '手机得绑定你的特斯拉账号，这批货是给先锋用户的，不能乱转让。' },
          { title: '2. 卫星服务', type: 'text', content: '只要有星链的地方你就能用，有些国家可能有特殊规定。' }
        ]
      },
      '退款政策': {
        title: '后悔了怎么办',
        subtitle: '退款不墨迹',
        sections: [
          { title: '随时退', type: 'text', content: '发货前只要你不想买了，$89.70 定金随时全额退给你。' }
        ]
      },
      '隐私声明': {
        title: '你的隐私',
        subtitle: '绝不乱传',
        sections: [
          { title: '本地存储', type: 'text', content: '你的指纹、脸部数据和脑波信号都存在手机的加密芯片里，我们不上传云端。' }
        ]
      },
      '联系支持': {
        title: '找我们帮忙',
        subtitle: '全天候在线',
        sections: [
          { title: '联系方式', type: 'list', items: ['官方邮箱：model-pi@protonmail.com', '紧急热线：+1 (888) PI-TESLA'] }
        ]
      }
    },
    footer: { disclaimer: '© 2025 Tesla Model Pi. 最终样子和功能以发货为准。', links: ['联系支持', '服务条款', '退款政策', '隐私声明'] }
  },
  en: {
    common: { loading: 'Connecting...', assistantTitle: 'Pi Assistant', assistantPlaceholder: 'Ask something...', assistantThinking: 'Thinking...', back: 'Back' },
    nav: { design: 'Design', features: 'Tech', order: 'Order', action: 'Join Now', portal: 'My Account' },
    hero: { 
      countdown: 'BATCH 01 COUNTDOWN', 
      subtitle: "More than a phone. It's your bridge to Tesla and Starlink. No matter where you are, you stay connected.", 
      orderNow: 'Secure My Seat',
      batchTitle: 'Founder Privileges',
      perks: ['Free Global Satellite Data', '2-Year Warranty', '24/7 Priority Support', 'Signed Edition']
    },
    comparison: {
      title: 'A New Era',
      subtitle: 'Modern flagship vs. The Future',
      oldWay: 'Normal Flagship',
      piWay: 'Model Pi',
      signal: { label: 'Signal', old: 'Tower-dependent', pi: 'Starlink native' },
      power: { label: 'Power', old: 'Daily charging', pi: 'Solar self-charging' },
      key: { label: 'Ecosystem', old: 'Simple App', pi: 'Native integration' }
    },
    launch: {
      remains: 'Remaining',
      colorSelect: 'Select Finish',
      deposit: 'Pioneer Deposit',
      terms: 'By ordering you agree to our Terms'
    },
    docs: {
      'Whitepaper': {
        title: 'Model Pi Guide',
        subtitle: 'v1.2.0',
        sections: [
          { title: 'Vision', type: 'text', content: 'Connect everyone, everywhere, at any time.' },
          {
            title: 'Specs',
            type: 'specs',
            items: [
              { label: 'Brain', value: 'Tesla NPU', detail: 'Fastest chip', icon: 'Cpu' },
              { label: 'Uplink', value: 'Starlink V3', detail: 'Native Satellite', icon: 'Satellite' }
            ]
          }
        ]
      },
      'Support': {
        title: 'Support Center',
        subtitle: 'Always here',
        sections: [
          { title: 'Connect', type: 'list', items: ['Email: model-pi@protonmail.com', 'Line: +1 (888) PI-TESLA'] }
        ]
      }
    },
    footer: { disclaimer: '© 2025 Tesla Model Pi. Final specs subject to change.', links: ['Support', 'Terms', 'Refund Policy', 'Privacy Policy'] }
  }
};
