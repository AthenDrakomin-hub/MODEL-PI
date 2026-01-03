# Tesla Model π - 启动指南

## 项目概述

这是一个融合了 Model-Pi 前端优势和 Tesla-PiStore 后端功能的完整电商应用。项目包含：
- 先进的 3D UI 界面和动态交互 (来自 Model-Pi)
- 完整的电商系统和数据库持久化 (来自 Tesla-PiStore)

## 环境准备

1. 确保已安装 Node.js (v18 或更高版本)
2. 安装 PostgreSQL 数据库

## 安装步骤

1. 安装依赖包：
   ```bash
   npm install
   ```

2. 配置环境变量：
   - 复制 .env.example 到 .env
   - 填入必要的数据库连接信息

3. 设置数据库：
   ```bash
   npm run db:push
   ```

## 启动项目

开发模式：
```bash
npm run dev
```

## API 端点

- `GET /api/products` - 获取所有产品
- `GET /api/products/:id` - 获取特定产品
- `GET /api/cart/:sessionId` - 获取购物车内容
- `POST /api/cart/:sessionId` - 更新购物车内容

## 项目结构

- `client/` - 前端代码 (React 19, Vite)
- `api/` - Vercel Serverless Functions (API 路由)
- `shared/` - 共享代码 (API 定义, 数据库模式)
- `src/` - 前端源代码 (包含 hooks, components 等)

## 环境变量

- `DATABASE_URL` - PostgreSQL 数据库连接字符串
- `VITE_USDT_ADDR` - USDT 收款地址
- `VITE_PAYPAL_URL` - PayPal 支付链接

## 功能特性

1. **3D 产品展示** - 先进的 3D 模型展示
2. **购物车系统** - 数据持久化存储
3. **多语言支持** - 支持多种语言
4. **响应式设计** - 适配各种设备
5. **动态交互** - 流畅的用户界面体验

## 故障排除

如果遇到数据库连接问题，请检查：
1. PostgreSQL 服务是否已启动
2. .env 文件中的 DATABASE_URL 是否正确
3. 数据库用户是否有足够权限

如需帮助，请参考原始项目的文档或联系开发团队。