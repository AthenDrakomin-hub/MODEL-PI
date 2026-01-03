# Vercel 部署说明

## 重要说明

⚠️ **注意：** 由于融合后的项目包含 Express.js 后端服务器，无法直接部署到 Vercel 的静态托管服务。Vercel 主要支持前端静态内容和 Serverless 函数，而我们的项目使用了传统的 Express.js 服务器架构。

## 部署选项

### 选项 1：Railway（推荐）
1. 访问 [Railway](https://railway.app)
2. 连接你的 GitHub 仓库
3. 选择 Node.js 模板
4. 设置环境变量：
   - DATABASE_URL: PostgreSQL 数据库连接字符串
   - VITE_USDT_ADDR: USDT 收款地址
   - VITE_PAYPAL_URL: PayPal 链接
5. 部署命令：npm run start

### 选项 2：Render
1. 访问 [Render](https://render.com)
2. 创建新的 Web Service
3. 连接你的 GitHub 仓库
4. 环境选择：Node.js
5. 构建命令：npm install
6. 启动命令：npm run start
7. 设置环境变量（同上）

### 选项 3：Docker 部署
如果需要部署到支持 Docker 的平台：
1. 创建 Dockerfile
2. 使用 Node.js 基础镜像
3. 暴露端口 5000
4. 使用 PM2 或类似工具管理进程

## Vercel 替代方案

如果你想使用 Vercel，需要将后端 API 转换为 Vercel Serverless Functions：
1. 将 Express.js 路由转换为 /api 路由
2. 使用 Vercel 的数据库解决方案（如 PlanetScale、Supabase）
3. 重新架构后端逻辑以适应 Serverless 模型

## 本地运行
在本地开发环境中，使用：

> tesla-model-pi@1.0.0 dev
> concurrently "npm run dev:client" "npm run dev:server"

## 数据库设置
部署前确保：
1. PostgreSQL 数据库已创建
2. 运行数据库迁移：npm run db:push
3. 环境变量中正确配置 DATABASE_URL

## 环境变量
确保以下环境变量在部署环境中已设置：
- DATABASE_URL: PostgreSQL 数据库连接字符串
- VITE_USDT_ADDR: USDT 收款地址
- VITE_PAYPAL_URL: PayPal 链接
- PORT: 服务器端口（通常由平台自动设置）

## 支持的平台
此项目适用于以下支持完整 Node.js 后端的平台：
- Railway
- Render
- DigitalOcean App Platform
- AWS Elastic Beanstalk
- Google Cloud Run
- Microsoft Azure App Service