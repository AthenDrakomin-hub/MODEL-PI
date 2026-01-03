# Vercel 部署指南

本文档详细说明如何将 Tesla Model π 项目部署到 Vercel 平台。

## 部署前准备

### 1. 环境变量配置

在部署到 Vercel 前，需要设置以下环境变量：

| 变量名 | 是否必需 | 说明 |
|--------|----------|------|
| `DATABASE_URL` | 是 | PostgreSQL 数据库连接字符串 |
| `VITE_USDT_ADDR` | 是 | USDT 收款地址，用于支付功能 |
| `VITE_PAYPAL_URL` | 否 | PayPal 支付链接（可选） |

### 2. 数据库设置

项目使用 PostgreSQL 数据库，需要预先创建数据库实例：
- 可使用 Vercel Postgres、Supabase、PlanetScale 或其他兼容的数据库服务
- 确保数据库连接字符串正确配置

## 部署步骤

### 方法一：通过 Vercel Dashboard

1. 访问 [Vercel](https://vercel.com) 并登录
2. 点击 "New Project" 
3. 连接你的 GitHub 仓库
4. 在项目配置中设置环境变量
5. 确保构建设置如下：
   - Framework Preset: 选择 "Other"
   - Build Command: `npm run vercel-build`
   - Output Directory: `dist`
   - Root Directory: 项目根目录

### 方法二：使用 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 部署项目
vercel --env DATABASE_URL=your_db_url --env VITE_USDT_ADDR=your_usdt_addr
```

## API 路由说明

项目已配置以下 Vercel Serverless Functions：

- `GET /api/products` - 获取所有产品
- `GET /api/products/:id` - 获取特定产品
- `GET /api/cart/:sessionId` - 获取购物车内容
- `POST /api/cart/:sessionId` - 更新购物车内容
- `POST /api/init` - 初始化数据库（首次部署时调用）

## 部署后配置

### 1. 数据库初始化

首次部署后，需要初始化数据库：

```bash
# 访问你的部署URL并调用初始化端点
curl -X POST https://your-deployment-url.vercel.app/api/init
```

### 2. 自定义域名（可选）

在 Vercel Dashboard 中可以配置自定义域名。

## 注意事项

1. **数据库连接**：Serverless 函数的数据库连接是临时的，已优化连接池以适应此环境
2. **冷启动**：首次请求可能会有轻微延迟，后续请求会更快
3. **环境变量**：确保所有必需的环境变量都在 Vercel 项目设置中正确配置
4. **API 限制**：Serverless 函数有执行时间限制（最大 60 秒）

## 故障排除

### 常见问题

1. **数据库连接失败**
   - 检查 `DATABASE_URL` 环境变量是否正确
   - 确认数据库服务允许来自 Vercel 的连接

2. **API 路由 404 错误**
   - 确认 API 文件结构是否正确（`api` 目录下的文件会自动映射为路由）
   - 检查函数导出语法是否正确

3. **构建失败**
   - 检查 `vercel-build` 脚本是否正确配置
   - 确认所有依赖项都已正确安装

## 性能优化

1. **数据库连接优化**：使用全局连接池减少连接开销
2. **API 响应缓存**：对于不经常变化的数据，可以添加缓存头
3. **静态资源优化**：Vercel 自动优化静态资源交付

## 扩展建议

1. **数据库迁移**：考虑使用 Vercel 的数据库迁移工具
2. **监控**：集成 Vercel Analytics 进行性能监控
3. **CDN**：利用 Vercel 的全球 CDN 加速内容分发