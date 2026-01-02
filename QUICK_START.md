# Tesla Model π 快速入门指南

## 项目简介

Tesla Model π 是一个概念性的特斯拉手机产品展示网站，集成了预订系统、支付处理、库存管理和法律合规功能。该项目使用 React、TypeScript、Cloudflare Workers 和 KV 数据库构建。

## 环境要求

- Node.js 18+
- npm 或 yarn
- Cloudflare Workers CLI (wrangler)
- Git

## 快速开始

### 1. 克隆项目
```bash
git clone <your-repo-url>
cd model-pi
```

### 2. 安装依赖
```bash
npm install
```

### 3. 本地开发
```bash
# 启动本地开发服务器
npm run dev
```

### 4. 构建项目
```bash
# 构建生产版本
npm run build
```

## 项目结构

```
model-pi/
├── components/           # React 组件
├── src/                 # 后端服务 (Cloudflare Workers)
│   ├── inventory/       # 库存管理
│   ├── payment/         # 支付处理
│   ├── cart/           # 购物车系统
│   ├── legal/          # 法律文档服务
│   └── file-storage/   # 文件存储服务
├── public/             # 静态资源
├── package.json        # 项目配置
└── wrangler.toml       # Cloudflare 配置
```

## 核心功能

### 1. 预订系统
- 支持多种型号和颜色选择
- 定金支付机制（全款30%）
- 库存实时管理

### 2. 支付处理
- 支持 USDT (ERC20/TRC20)
- 支持 PayPal
- 安全支付验证

### 3. 库存管理
- 实时库存跟踪
- 预订锁定功能
- 库存预警系统

### 4. 法律合规
- GDPR 兼容隐私政策
- 完整服务条款
- 保修和退货政策

## Cloudflare 配置

### 1. 登录 Cloudflare
```bash
npx wrangler login
```

### 2. 创建 KV 命名空间
```bash
npx wrangler kv namespace create MODEL_PI
```

### 3. 创建 R2 存储桶
```bash
npx wrangler r2 bucket create model-pi-assets
```

### 4. 部署 Worker
```bash
npx wrangler deploy
```

## 主要配置文件

### wrangler.toml
```toml
name = "tesla-model-pi"
main = "src/index.ts"
compatibility_date = "2026-01-02"

account_id = "your-account-id"
workers_dev = true

# KV 命名空间
[[kv_namespaces]]
binding = "MODEL_PI"
id = "your-kv-namespace-id"

# R2 存储桶
[[r2_buckets]]
binding = "MODEL_PI_ASSETS"
bucket_name = "model-pi-assets"
```

## API 端点

### 预订相关
- `POST /api/orders/save` - 保存订单
- `GET /api/orders/get?pioneerId=xxx` - 获取订单

### 支付相关
- `POST /api/payment/create` - 创建支付
- `POST /api/payment/verify/:id` - 验证支付

### 库存相关
- `GET /api/inventory/report` - 获取库存报告
- `GET /api/inventory/availability/:variantId` - 检查库存可用性

### 法律文档相关
- `GET /api/legal/documents` - 获取法律文档
- `GET /api/legal/document/:id` - 获取特定文档

### 文件存储相关
- `POST /api/upload/model-image` - 上传模型图片
- `GET /api/model-images/:modelVariantId` - 获取模型图片

## 开发指南

### 添加新功能
1. 在 `src/` 目录下创建新的功能模块
2. 更新 Worker 路由处理
3. 编写相应的 API 端点
4. 更新文档

### 测试
```bash
# 运行本地测试
npm run dev

# 验证构建
npm run build
```

## 部署流程

### 1. 更新配置
- 确保 `wrangler.toml` 中的 ID 和配置正确
- 检查环境变量

### 2. 部署到 Cloudflare
```bash
# 部署 Worker
npx wrangler deploy

# 验证部署
curl https://your-subdomain.your-account.workers.dev/health
```

## 故障排除

### 常见问题
1. **部署失败**: 检查 `wrangler.toml` 配置和权限
2. **API 错误**: 验证 KV 命名空间和 R2 配置
3. **支付问题**: 确认支付网关配置

### 调试命令
```bash
# 查看 Worker 日志
npx wrangler tail

# 检查 KV 数据
npx wrangler kv:key list --namespace-id=YOUR_NAMESPACE_ID
```

## 维护任务

### 定期维护
- 监控 API 响应时间
- 检查存储使用情况
- 更新法律文档
- 备份重要数据

### 性能优化
- 实施缓存策略
- 优化数据库查询
- 压缩静态资源

## 联系信息

如需技术支持或报告问题，请联系：
- 邮箱: model-pi@protonmail.com
- 项目仓库: [项目链接]

---
本指南提供了 Tesla Model π 项目的快速入门信息，如需更详细的技术文档，请参阅项目中的其他文档文件。