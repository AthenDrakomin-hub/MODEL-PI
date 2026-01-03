# Vercel 部署说明

## 重要说明

✅ **好消息：** 项目已完全适配 Vercel 平台！通过将后端 API 转换为 Vercel Serverless Functions，现在可以一键部署整个全栈应用到 Vercel。

## 部署选项

### 选项 1：Vercel 一键部署（推荐）
1. 访问 [Vercel](https://vercel.com)
2. 连接你的 GitHub 仓库
3. 设置环境变量：
   - DATABASE_URL: PostgreSQL 数据库连接字符串
   - VITE_USDT_ADDR: USDT 收款地址
   - VITE_PAYPAL_URL: PayPal 链接
4. 构建命令：npm run vercel-build
5. 输出目录：dist

### 选项 2：Railway
1. 访问 [Railway](https://railway.app)
2. 连接你的 GitHub 仓库
3. 选择 Node.js 模板
4. 设置环境变量：
   - DATABASE_URL: PostgreSQL 数据库连接字符串
   - VITE_USDT_ADDR: USDT 收款地址
   - VITE_PAYPAL_URL: PayPal 链接
5. 部署命令：npm run vercel-build

### 选项 3：Render
1. 访问 [Render](https://render.com)
2. 创建新的 Web Service
3. 连接你的 GitHub 仓库
4. 环境选择：Node.js
5. 构建命令：npm install
6. 构建命令：npm run vercel-build
7. 设置环境变量（同上）

## Vercel 部署优势

通过将 Express.js 路由转换为 Vercel Serverless Functions，我们实现了：
1. 前后端一体化部署
2. 自动扩展和高可用性
3. 全球 CDN 加速
4. 简化的部署流程

## 本地运行
在本地开发环境中，使用：

> npm run dev

## 数据库设置
部署前确保：
1. PostgreSQL 数据库已创建
2. 环境变量中正确配置 DATABASE_URL

## 部署后初始化
首次部署后，需要初始化数据库：
1. 访问 `https://your-domain.vercel.app/api/init`
2. 这将初始化产品数据

## 环境变量
确保以下环境变量在部署环境中已设置：
- DATABASE_URL: PostgreSQL 数据库连接字符串
- VITE_USDT_ADDR: USDT 收款地址
- VITE_PAYPAL_URL: PayPal 链接

## 支持的平台
此项目已优化用于以下平台：
- Vercel (推荐) - 完整的 Serverless 架构支持
- Railway - 支持 Node.js 后端
- Render - 支持 Node.js 后端
- DigitalOcean App Platform - 支持 Node.js 后端