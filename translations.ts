
export const TRANSLATIONS: any = {
  zh: {
    common: { loading: '建立神经连接...', assistantTitle: 'T-OS 助手', assistantPlaceholder: '问问关于 Model Π...', assistantThinking: '处理中...', back: '返回' },
    nav: { design: '设计美学', features: 'Π 魔法', order: '预订', action: '立即拥有', portal: '车主通道' },
    hero: { 
      countdown: '创始版最后席位', 
      subtitle: '不仅仅是一台手机。它是您与 Tesla 及全球星链的纽带。即使在无人区，您与家人的联系也从未如此紧密。', 
      endNote: '为普通人打造的未来科技，现已触手可及。', 
      orderNow: '立即锁定我的席位',
      batchTitle: 'BATCH 01 创始特权',
      perks: ['全球卫星流量终身免费', '2年全球官方质保', '官方尊享客服 24/7', '马斯克亲签纪念版']
    },
    pioneerForm: {
      title: '先锋申请终端',
      identity: '身份认证',
      mission: '任务分配',
      vision: '未来展望',
      fullName: '全名',
      email: '电子邮箱',
      location: '地理位置',
      expertise: '专业领域',
      fields: {
        eng: '软件/硬件工程师',
        res: '科学研究员',
        exp: '极端环境探险家',
        des: '交互设计视觉师',
        owner: 'Tesla 资深车主'
      },
      social: '社交媒体 (X/LinkedIn)',
      testModules: '意向测试模块',
      reasons: '为什么你是最合适的人选？',
      submit: '发送轨道链路',
      success: '任务授权成功',
      idLabel: '先锋序列号',
      waitNote: '您的数据正在通过星链 V3 链路传输至任务控制中心。'
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
              { label: '连接性', value: 'Starlink V3', detail: '10Gbps 极速上行，支持极地、深海、高海拔等全球极端环境全覆盖', icon: 'Satellite' }
            ]
          }
        ]
      },
      '服务条款': {
        title: 'Model Π 全球服务协议',
        subtitle: 'Legal V2.1',
        sections: [
          { title: '1. 账户与所有权', type: 'text', content: '您的 Model Π 必须绑定有效的 Tesla 账户。创始版 (Batch 01) 席位不可转让，除非通过官方验证。' },
          { title: '2. 卫星服务', type: 'text', content: 'Starlink V3 连接服务在受监管区域提供。跨行星通讯协议目前仅适用于火星预部署轨道。' }
        ]
      },
      '退款政策': {
        title: '定金退还与取消政策',
        subtitle: 'Refund V1.5',
        sections: [
          { title: '无理由退款', type: 'text', content: '在产品进入“制造阶段”之前（通常为发货前 30 天），您可以随时申请全额退还 $89.70 定金。' }
        ]
      },
      '隐私声明': {
        title: '数据主权与隐私协议',
        subtitle: 'Privacy V3.0',
        sections: [
          { title: '零上传原则', type: 'text', content: '所有生物识别数据均存储于设备本地安全隔离区数据。' }
        ]
      },
      '联系支持': {
        title: '先锋指挥中心',
        subtitle: 'Support Node 01',
        sections: [
          { title: '联系方式', type: 'list', items: ['官方邮箱：model-pi@proton.me', '24/7 紧急加密热线：+1 (888) PI-TESLA'] }
        ]
      }
    },
    footer: { disclaimer: '© 2025 Tesla Model Π Strategic. 网页内容仅供预览，最终规格以发售为准。', links: ['联系支持', '服务条款', '退款政策', '隐私声明'] }
  },
  en: {
    common: { loading: 'Establishing Neural Link...', assistantTitle: 'T-OS Assistant', assistantPlaceholder: 'Ask about Model Π...', assistantThinking: 'Processing...', back: 'Back' },
    nav: { design: 'Design', features: 'Π Magic', order: 'Order', action: 'Join Now', portal: 'Owner Portal' },
    hero: { 
      countdown: 'BATCH 01 COUNTDOWN', 
      subtitle: "More than a phone. It's your bridge to Tesla and the global Starlink mesh. Never lose connection with your loved ones, even in the middle of nowhere.", 
      orderNow: 'Secure My Model Π',
      batchTitle: 'BATCH 01 PRIVILEGES',
      perks: ['Free Global Satellite Data for Life', '2-Year Global Warranty', '24/7 Priority Support', 'Signed Founder Edition']
    },
    pioneerForm: {
      title: 'Pioneer Application Terminal',
      identity: 'Identity Verification',
      mission: 'Mission Allocation',
      vision: 'Future Vision',
      fullName: 'Full Name',
      email: 'Email Address',
      location: 'Location',
      expertise: 'Expertise',
      fields: {
        eng: 'Software/Hardware Engineer',
        res: 'Scientific Researcher',
        exp: 'Extreme Explorer',
        des: 'UX/UI Designer',
        owner: 'Tesla Owner'
      },
      social: 'Social Handle (X/LinkedIn)',
      testModules: 'Preferred Test Modules',
      reasons: 'Why are you the right fit for Batch 01?',
      submit: 'Transmit via Orbital Link',
      success: 'Mission Authorized',
      idLabel: 'Pioneer ID',
      waitNote: 'Your data is being transmitted to Mission Control via Starlink V3 mesh.'
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
          { title: '1. Account & Ownership', type: 'text', content: 'Your Model Π must be linked to a valid Tesla account. Batch 01 seats are non-transferable unless verified by Tesla Command.' }
        ]
      },
      'Refund Policy': {
        title: 'Refund & Cancellation Policy',
        subtitle: 'Refund V1.5',
        sections: [
          { title: 'Unconditional Refund', type: 'text', content: 'You can request a full refund of your $89.70 deposit at any time before the device enters the "Manufacturing Phase".' }
        ]
      },
      'Support': {
        title: 'Pioneer Support Center',
        subtitle: 'Support Node 01',
        sections: [
          { title: 'Connect', type: 'list', items: ['Official Email: model-pi@proton.me', '24/7 Encrypted Line: +1 (888) PI-TESLA'] }
        ]
      },
      'Privacy Policy': {
        title: 'Privacy & Sovereignty',
        subtitle: 'Privacy V3.0',
        sections: [
          { title: 'Local Storage', type: 'text', content: 'Biometric data remains encrypted on your local T1 security chip.' }
        ]
      },
      'Whitepaper': {
        title: 'Model Π Strategic Whitepaper',
        subtitle: 'v1.2.0-Alpha',
        sections: [
          { title: 'Vision', type: 'text', content: 'Building the communication foundation for a multi-planetary civilization.' },
          {
            title: 'Specs',
            type: 'specs',
            items: [
              { label: 'Processor', value: 'Tesla NPU 1.0', detail: '4nm Architecture', icon: 'Cpu' },
              { label: 'Connectivity', value: 'Starlink V3', detail: '10Gbps Uplink / Global coverage in extreme environments (Polar, Deep Sea, High Altitude)', icon: 'Satellite' }
            ]
          }
        ]
      }
    },
    footer: { disclaimer: '© 2025 Tesla Model Π Strategic. Concept showcase. Final specs subject to change.', links: ['Support', 'Terms', 'Refund Policy', 'Privacy Policy'] }
  },
  ru: {
    common: { loading: 'Установка нейронной связи...', assistantTitle: 'T-OS Помощник', assistantPlaceholder: 'Спросите о Model Π...', assistantThinking: 'Обработка...', back: 'Назад' },
    nav: { design: 'Дизайн', features: 'Π Магия', order: 'Заказ', action: 'Присоединиться', portal: 'Портал владельца' },
    hero: { 
      countdown: 'ОТСЧЕТ ПЕРВОЙ ПАРТИИ', 
      subtitle: 'Больше, чем просто телефон. Это ваш мост к Tesla и глобальной сети Starlink. Никогда не теряйте связь с близкими, даже в самых удаленных уголках мира.', 
      orderNow: 'Забронировать Model Π',
      batchTitle: 'ПРИВИЛЕГИИ BATCH 01',
      perks: ['Спутниковый трафик бесплатно пожизненно', '2 года глобальной гарантии', 'Приоритетная поддержка 24/7', 'Издание Founder с подписью']
    },
    pioneerForm: {
      title: 'Терминал заявки пионера',
      identity: 'Верификация личности',
      mission: 'Распределение миссии',
      vision: 'Видение будущего',
      fullName: 'Полное имя',
      email: 'Электронная почта',
      location: 'Местоположение',
      expertise: 'Специализация',
      fields: {
        eng: 'Инженер ПО/Оборудования',
        res: 'Научный исследователь',
        exp: 'Экстремальный исследователь',
        des: 'UX/UI Дизайнер',
        owner: 'Владелец Tesla'
      },
      social: 'Социальные сети (X/LinkedIn)',
      testModules: 'Модули тестирования',
      reasons: 'Почему вы подходите для Batch 01?',
      submit: 'Передать через орбитальный канал',
      success: 'Миссия авторизована',
      idLabel: 'ID Пионера',
      waitNote: 'Ваши данные передаются в Центр управления миссией через сеть Starlink V3.'
    },
    comparison: {
      title: 'Прыжок через поколения',
      subtitle: 'Не просто характеристики, а новое измерение взаимодействия',
      oldWay: 'Старый путь',
      piWay: 'Путь Π',
      signal: { label: 'Сигнал', old: 'Зависимость от вышек, мертвые зоны', pi: 'Starlink Native, глобальное покрытие' },
      power: { label: 'Питание', old: 'Ежедневная зарядка от сети', pi: 'Солнечная зарядка, бесконечность' },
      key: { label: 'Экосистема', old: 'Отдельное устройство, базовое приложение', pi: 'Центральный хаб, призыв мыслью' }
    },
    launch: {
      remains: 'Мест осталось',
      colorSelect: 'Выберите отделку',
      deposit: 'Депозит пионера',
      terms: 'Делая заказ, вы соглашаетесь с условиями'
    },
    docs: {
      'Юридическая инфо': {
        title: 'Глобальное сервисное соглашение Model Π',
        subtitle: 'Юридическая V2.1',
        sections: [
          { title: '1. Учетная запись', type: 'text', content: 'Ваш Model Π должен быть привязан к действующей учетной записи Tesla.' }
        ]
      },
      'Refund Policy': {
        title: 'Политика возврата',
        subtitle: 'Refund V1.5',
        sections: [
          { title: 'Безусловный возврат', type: 'text', content: 'Вы можете запросить полный возврат депозита в размере $89.70 в любое время.' }
        ]
      },
      'Поддержка': {
        title: 'Центр поддержки пионеров',
        subtitle: 'Узел поддержки 01',
        sections: [
          { title: 'Связь', type: 'list', items: ['Email: model-pi@proton.me', 'Линия: +1 (888) PI-TESLA'] }
        ]
      },
      'Whitepaper': {
        title: 'Model Π Strategic Whitepaper',
        subtitle: 'v1.2.0-Alpha',
        sections: [
          { title: 'Видение', type: 'text', content: 'Строительство коммуникационного фундамента для мультипланетарной цивилизации.' },
          {
            title: 'Спецификации',
            type: 'specs',
            items: [
              { label: 'Процессор', value: 'Tesla NPU 1.0', detail: 'Архитектура 4нм', icon: 'Cpu' },
              { label: 'Связь', value: 'Starlink V3', detail: '10 Гбит/с Uplink / Глобальное покрытие в экстремальных условиях (полюса, глубоководье, высокогорье)', icon: 'Satellite' }
            ]
          }
        ]
      }
    },
    footer: { disclaimer: '© 2025 Tesla Model Π Strategic. Концепт. Финальные спецификации могут измениться.', links: ['Поддержка', 'Юридическая инфо', 'Refund Policy'] }
  },
  ar: {
    common: { loading: 'جاري إنشاء الرابط العصبي...', assistantTitle: 'مساعد T-OS', assistantPlaceholder: 'اسأل عن موديل Π...', assistantThinking: 'جاري المعالجة...', back: 'رجوع' },
    nav: { design: 'التصميم', features: 'Π سحر', order: 'طلب', action: 'انضم الآن', portal: 'بوابة المالك' },
    hero: { 
      countdown: 'العد التنازلي للدفعة 01', 
      subtitle: 'أكثر من مجرد هاتف. إنه جسرك إلى تسلا وشبكة ستارلينك العالمية. لا تفقد الاتصال بأحبائك أبدًا، حتى في أقاصي الأرض.', 
      orderNow: 'احجز موديل Π الخاص بك',
      batchTitle: 'امتيازات الدفعة 01',
      perks: ['بيانات أقمار صناعية مجانية مدى الحياة', 'ضمان عالمي لمدة عامين', 'دعم ذو أولوية 24/7', 'نسخة المؤسس الموقعة']
    },
    pioneerForm: {
      title: 'محطة تقديم طلب الرائد',
      identity: 'التحقق من الهوية',
      mission: 'تخصيص المهمة',
      vision: 'رؤية المستقبل',
      fullName: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      location: 'الموقع',
      expertise: 'الخبرة',
      fields: {
        eng: 'مهندس برمجيات/أجهزة',
        res: 'باحث علمي',
        exp: 'مستكشف الظروف القاسية',
        des: 'مصمم واجهة المستخدم',
        owner: 'مالك تسلا'
      },
      social: 'حساب التواصل (X/LinkedIn)',
      testModules: 'وحدات الاختبار المفضلة',
      reasons: 'لماذا أنت الشخص المناسب للدفعة 01؟',
      submit: 'الإرسال عبر رابط مداري',
      success: 'تم التصريح بالمهمة',
      idLabel: 'رقم الرائد',
      waitNote: 'يتم نقل بياناتك إلى مركز التحكم في المهمة عبر شبكة ستارلينك V3.'
    },
    comparison: {
      title: 'قفزة جيلية',
      subtitle: 'ليست مجرد مواصفات، بل بعد جديد للتفاعل',
      oldWay: 'الطريقة القديمة',
      piWay: 'طريقة Π',
      signal: { label: 'الإشارة', old: 'تعتمد على الأبراج، مناطق ميتة', pi: 'ستارلينك أصلي، تغطية عالمية' },
      power: { label: 'الطاقة', old: 'شحن يومي من الشبكة', pi: 'شحن شمسي ذاتي، لا نهائي' },
      key: { label: 'النظام البيئي', old: 'جهاز منفصل، تطبيق أساسي', pi: 'محور مركزي، استدعاء بالفكر' },
    },
    launch: {
      remains: 'المقاعد المتبقية',
      colorSelect: 'اختر اللون',
      deposit: 'عربون الريادة',
      terms: 'بالطلب أنت توافق على الشروط'
    },
    docs: {
      'قانوني': {
        title: 'اتفاقية الخدمة العالمية لموديل Π',
        subtitle: 'قانوني V2.1',
        sections: [
          { title: '1. الحساب والملكية', type: 'text', content: 'يجب ربط موديل Π الخاص بك بحساب تسلا صالح.' }
        ]
      },
      'Refund Policy': {
        title: 'سياسة الاسترداد',
        subtitle: 'الاسترداد V1.5',
        sections: [
          { title: 'استرداد غير مشروط', type: 'text', content: 'يمكنك طلب استرداد كامل للعربون البالغ 89.70 دولاراً في أي وقت.' }
        ]
      },
      'الدعم': {
        title: 'مركز دعم الرواد',
        subtitle: 'عقدة الدعم 01',
        sections: [
          { title: 'اتصال', type: 'list', items: ['البريد: model-pi@proton.me', 'الخط الساخن: +1 (888) PI-TESLA'] }
        ]
      },
      'Whitepaper': {
        title: 'Model Π Strategic Whitepaper',
        subtitle: 'v1.2.0-Alpha',
        sections: [
          { title: 'الرؤية', type: 'text', content: 'بناء الأساس الاتصالي لحضارة متعددة الكواكب.' },
          {
            title: 'المواصفات',
            type: 'specs',
            items: [
              { label: 'المعالج', value: 'Tesla NPU 1.0', detail: 'معمارية 4 نانومتر', icon: 'Cpu' },
              { label: 'الاتصال', value: 'Starlink V3', detail: 'سرعة رفع 10 جيجابت في الثانية / تغطية عالمية في البيئات القاسية (القطبين، أعماق البحار، المرتفعات)', icon: 'Satellite' }
            ]
          }
        ]
      }
    },
    footer: { disclaimer: '© 2025 Tesla Model Π Strategic. عرض تجريبي. المواصفات النهائية خاضعة للتغيير.', links: ['الدعم', 'قانوني', 'Refund Policy'] }
  }
};
