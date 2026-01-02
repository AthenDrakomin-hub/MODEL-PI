# Tesla Model π 项目文档

## 项目概述
Tesla Model π 是一个概念性的特斯拉手机产品展示网站，集成了预订系统、支付处理、库存管理和法律合规功能。

## 目录结构
```
Tesla Model π 项目
├── 核心应用
│   ├── 前端组件 (components/)
│   ├── 主应用 (App.tsx)
│   └── 资源文件 (assets/)
├── 后端服务
│   ├── Cloudflare Workers (src/)
│   ├── KV 数据库集成
│   └── R2 对象存储
├── 业务功能
│   ├── 库存管理
│   ├── 支付系统
│   ├── 购物车
│   └── 法律合规
├── 配置文件
├── 文档
└── 部署指南
```

## 1. 核心应用

### 1.1 前端组件
- `App.tsx` - 主应用入口
- `components/` - UI 组件目录
  - `Header.tsx` - 页面头部
  - `HeroSection.tsx` - 英雄区域
  - `BookingSection.tsx` - 预订区域
  - `WhitepaperSection.tsx` - 白皮书区域
  - `VideoShowcase.tsx` - 视频展示
  - `ComparisonSection.tsx` - 对比区域
  - `Modals.tsx` - 模态框组件
  - `LegalDocumentation.tsx` - 法律文档组件
  - `CompliancePage.tsx` - 合规页面
  - `DynamicLegalDocumentation.tsx` - 动态法律文档

### 1.2 系统组件
- `Logo.tsx` - Logo 组件
- `constants.tsx` - 常量定义
- `types.ts` - 类型定义
- `translations.ts` - 多语言翻译
- `metadata.json` - 元数据配置

## 2. 后端服务

### 2.1 Cloudflare Workers
- `src/index.ts` - Worker 主入口
- `src/kv-api.ts` - KV 数据库 API
- `src/main-service.ts` - 主服务集成

### 2.2 库存管理系统
- `src/inventory/inventory-manager.ts` - 库存管理器

### 2.3 支付系统
- `src/payment/payment-processor.ts` - 支付处理器

### 2.4 购物车系统
- `src/cart/shopping-cart.ts` - 购物车服务

### 2.5 法律文档服务
- `src/legal/legal-service.ts` - 法律文档服务
- `src/legal/worker-integration.ts` - 法律服务 Worker 集成

### 2.6 文件存储服务
- `src/file-storage/file-service.ts` - 文件存储服务
- `src/file-storage/worker-integration.ts` - 文件存储 Worker 集成

## 3. 业务功能

### 3.1 库存管理
- `INVENTORY_ALLOCATION.md` - 库存分配方案
- `INVENTORY_MANAGEMENT.md` - 库存管理策略

### 3.2 支付系统
- `PAYMENT_SPEC.md` - 支付系统技术规格

### 3.3 购物车系统
- 实现完整的预订购物车功能

### 3.4 销售规划
- `src/sales-calculator.ts` - 销售目标计算器

## 4. 法律合规

### 4.1 法律文档
- `LEGAL_DOCUMENTATION.md` - 法律文件整合版
- `LEGAL_INTEGRATION.md` - 法律系统集成指南

### 4.2 产品合规
- 包含 FCC、CE、UKCA 认证信息

## 5. 存储系统

### 5.1 KV 数据库
- `KV_SCHEMA.md` - KV 数据库模式设计
- `KV_IMPLEMENTATION.md` - KV 实现方案
- `KV_OPTIMIZATION.md` - KV 优化策略

### 5.2 R2 对象存储
- `FILE_STORAGE_SOLUTION.md` - 文件存储解决方案
- `R2_INTEGRATION.md` - R2 集成指南

## 6. 部署与配置

### 6.1 配置文件
- `wrangler.toml` - Cloudflare Workers 配置
- `package.json` - 项目依赖配置
- `tsconfig.json` - TypeScript 配置
- `tsconfig.worker.json` - Worker TypeScript 配置
- `vite.config.ts` - Vite 构建配置

### 6.2 部署指南
- `IMPLEMENTATION_GUIDE.md` - 实施部署指南
- `API_DOCUMENTATION.md` - API 文档

## 7. 开发工具

### 7.1 开发配置
- `AGENTS.md` - Qoder 开发助手配置
- `.gitignore` - Git 忽略配置

### 7.2 项目文件
- `README.md` - 项目说明
- `index.html` - HTML 入口
- `index.tsx` - React 入口

## 8. 主要功能特性

### 8.1 预订系统
- 支持多种型号和颜色选择
- 定金支付机制（全款30%）
- 库存实时管理

### 8.2 支付处理
- 支持 USDT (ERC20/TRC20)
- 支持 PayPal
- 安全支付验证

### 8.3 物流配送
- 全球免费配送
- 7-15个工作日送达
- 物流追踪功能

### 8.4 法律合规
- GDPR 兼容隐私政策
- 完整服务条款
- 保修和退货政策
- 产品认证合规

### 8.5 用户体验
- 多语言支持
- 响应式设计
- 主题切换（午夜/日光模式）
- 实时数据更新

## 9. 技术栈

### 9.1 前端技术
- React 19
- TypeScript
- Tailwind CSS
- Vite

### 9.2 后端技术
- Cloudflare Workers
- Cloudflare KV
- Cloudflare R2
- Workers AI (已移除)

### 9.3 开发工具
- npm
- TypeScript 编译器
- ESLint (如适用)
- Git

## 10. 项目状态

- **开发状态**: 概念验证阶段
- **部署状态**: 可部署到 Cloudflare Workers
- **功能完整性**: 核心功能已完成
- **合规状态**: 符合主要法规要求