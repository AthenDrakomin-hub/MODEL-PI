# Tesla Model π 翻译功能增强建议

## 当前状态总结
- 项目声明支持 15 种语言 (zh, en, ja, es, fr, de, ko, it, pt, nl, tr, pl, sv, ru, ar)
- 实际仅在 TRANSLATIONS.ts 中实现了中文和英文
- WhitepaperDetail 组件使用独立的 getLabel 函数，支持 zh/en/ru/ar

## 增强方案

### 1. 完善 TRANSLATIONS.ts 文件

需要为所有声明的语言添加翻译配置：

```typescript
export const TRANSLATIONS: any = {
  // ... 现有的 zh 和 en 配置 ...
  
  // 添加俄语翻译
  ru: {
    common: { 
      loading: 'Загрузка...', 
      assistantTitle: 'Помощник Pi', 
      assistantPlaceholder: 'Спросите что-нибудь...',
      assistantThinking: 'Думаю...',
      back: 'Назад'
    },
    nav: { 
      design: 'Дизайн', 
      features: 'Технологии', 
      order: 'Заказать', 
      action: 'Присоединиться', 
      portal: 'Мой Аккаунт' 
    },
    // ... 其他翻译
  },
  
  // 添加阿拉伯语翻译
  ar: {
    common: { 
      loading: 'جاري التحميل...', 
      assistantTitle: 'مساعد Pi', 
      assistantPlaceholder: 'اسأل عن شيء...',
      assistantThinking: 'أفكر...',
      back: 'رجوع'
    },
    nav: { 
      design: 'التصميم', 
      features: 'المميزات', 
      order: 'طلب', 
      action: 'انضم الآن', 
      portal: 'حسابي' 
    },
    // ... 其他翻译
  },
  
  // 继续添加其他语言...
};
```

### 2. 统一翻译机制

将 WhitepaperDetail 组件中的 getLabel 函数替换为统一的翻译系统：

```typescript
// 替换现有的 getLabel 函数
const getLabel = (key: string) => {
  // 使用 TRANSLATIONS 系统
  const translationKey = `${lang}.${key}`;
  return getNestedValue(TRANSLATIONS, translationKey) || key;
};

// 或者创建一个多语言组件
const MultiLangText = ({ zh, en, ru, ar }: { zh: string, en: string, ru?: string, ar?: string }) => {
  const text = lang === 'zh' ? zh : 
              lang === 'ru' ? (ru || en) : 
              lang === 'ar' ? (ar || en) : en;
  return <span>{text}</span>;
};
```

### 3. 创建翻译上下文

创建一个 React 上下文来管理翻译：

```typescript
// contexts/TranslationContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { TRANSLATIONS } from '../translations';
import { SupportedLang } from '../types';

interface TranslationContextType {
  lang: SupportedLang;
  setLang: (lang: SupportedLang) => void;
  t: any;
  getLabel: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<SupportedLang>('zh');
  
  const value = {
    lang,
    setLang,
    t: TRANSLATIONS[lang] || TRANSLATIONS['en'],
    getLabel: (key: string) => {
      // 实现嵌套键访问逻辑
      return getNestedValue(TRANSLATIONS[lang], key) || key;
    }
  };
  
  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
```

### 4. 创建翻译工具函数

```typescript
// utils/translation.ts
export const getNestedValue = (obj: any, path: string): string => {
  return path.split('.').reduce((current, key) => {
    return current?.[key] || '';
  }, obj);
};

export const interpolate = (template: string, params: Record<string, any>): string => {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return params[key] || match;
  });
};
```

### 5. 更新组件使用新的翻译系统

```typescript
// 在组件中使用
import { useTranslation } from '../contexts/TranslationContext';

const SomeComponent = () => {
  const { t, lang } = useTranslation();
  
  return (
    <div>
      <h1>{t.nav.design}</h1>
      {/* ... */}
    </div>
  );
};
```

### 6. 实现 RTL 语言支持

确保阿拉伯语等 RTL 语言正确显示：

```typescript
// 在 App.tsx 中
const isRTL = lang === 'ar' || lang === 'he' || lang === 'fa'; // 添加其他 RTL 语言

return (
  <div dir={isRTL ? 'rtl' : 'ltr'} className="...">
    {/* ... */}
  </div>
);
```

### 7. 翻译文件管理

创建一个翻译管理系统来管理所有语言文件：

```typescript
// scripts/translation-manager.ts
import fs from 'fs';
import path from 'path';

class TranslationManager {
  private translationsDir = path.join(__dirname, '../translations');
  
  // 验证所有语言文件的完整性
  validateTranslations() {
    const requiredKeys = this.getAllRequiredKeys();
    const languages = this.getAvailableLanguages();
    
    for (const lang of languages) {
      const missingKeys = this.findMissingKeys(lang, requiredKeys);
      if (missingKeys.length > 0) {
        console.warn(`Missing translations for ${lang}:`, missingKeys);
      }
    }
  }
  
  // 生成翻译报告
  generateReport() {
    // 实现报告生成逻辑
  }
}
```

### 8. 实施步骤

1. **短期目标 (1-2 周)**:
   - 为所有声明语言添加基本翻译配置
   - 替换 WhitepaperDetail 中的硬编码翻译
   - 测试 RTL 语言支持

2. **中期目标 (2-4 周)**:
   - 创建翻译上下文和工具函数
   - 统一所有组件的翻译机制
   - 实现翻译验证系统

3. **长期目标 (1-2 个月)**:
   - 集成专业翻译服务
   - 实现动态翻译加载
   - 添加翻译管理系统

通过实施这些建议，Tesla Model π 项目将拥有一个完整、一致且易于维护的多语言支持系统。