# 特斯拉 Model π 购物车系统实施部署指南

## 1. 系统架构概述

### 核心组件
- **库存管理系统** (`src/inventory/inventory-manager.ts`) - 管理产品库存和预订
- **支付系统** (`src/payment/payment-processor.ts`) - 处理 USDT 和 PayPal 支付
- **购物车系统** (`src/cart/shopping-cart.ts`) - 处理用户购物车操作

### 技术栈
- **运行环境**: Node.js 18+
- **语言**: TypeScript
- **构建工具**: Vite
- **部署**: Cloudflare Workers + KV

## 2. 环境准备

### 2.1 本地开发环境
```bash
# 确保已安装 Node.js 18+
node --version

# 安装项目依赖
npm install

# 安装额外的依赖（如果需要）
npm install @types/node --save-dev
```

### 2.2 Cloudflare 准备
```bash
# 安装 Wrangler CLI
npm install -g wrangler

# 登录 Cloudflare 账户
wrangler login

# 初始化 KV 命名空间
wrangler kv namespace create MODEL_PI_INVENTORY
wrangler kv namespace create MODEL_PI_PAYMENTS
wrangler kv namespace create MODEL_PI_CARTS
```

## 3. 配置文件设置

### 3.1 环境变量配置
创建 `.env` 文件：
```env
# PayPal 配置
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_MODE=sandbox # 或 live

# USDT 钱包配置
USDT_ERC20_WALLET=your_erc20_wallet_address
USDT_TRC20_WALLET=your_trc20_wallet_address

# 支付回调 URL
PAYMENT_RETURN_URL=https://your-domain.com/payment/success
PAYMENT_CANCEL_URL=https://your-domain.com/payment/cancel
PAYMENT_WEBHOOK_URL=https://your-domain.com/payment/webhook

# 应用配置
APP_ENV=production # 或 development
LOG_LEVEL=info
```

### 3.2 Wrangler 配置
更新 `wrangler.toml`：
```toml
name = "tesla-model-pi"
main = "src/worker.ts"
compatibility_date = "2024-01-01"

account_id = "your-account-id"
workers_dev = true

# KV 命名空间
[[kv_namespaces]]
binding = "INVENTORY_KV"
id = "your-inventory-namespace-id"
preview_id = "your-inventory-preview-id"

[[kv_namespaces]]
binding = "PAYMENTS_KV"
id = "your-payments-namespace-id"
preview_id = "your-payments-preview-id"

[[kv_namespaces]]
binding = "CARTS_KV"
id = "your-carts-namespace-id"
preview_id = "your-carts-preview-id"

# 环境变量
[vars]
APP_ENV = "production"
```

## 4. 代码集成

### 4.1 Worker 入口文件
创建 `src/worker.ts`：
```typescript
import { InventoryManager } from './inventory/inventory-manager';
import { PaymentProcessor } from './payment/payment-processor';
import { ShoppingCart } from './cart/shopping-cart';

interface Env {
  INVENTORY_KV: KVNamespace;
  PAYMENTS_KV: KVNamespace;
  CARTS_KV: KVNamespace;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // 初始化服务
    const inventoryManager = new InventoryManager();
    const paymentProcessor = new PaymentProcessor();
    const shoppingCart = new ShoppingCart(inventoryManager, paymentProcessor);

    // API 路由
    if (path.startsWith('/api/cart')) {
      return handleCartAPI(request, shoppingCart, url);
    } else if (path.startsWith('/api/payment')) {
      return handlePaymentAPI(request, paymentProcessor, url);
    } else if (path.startsWith('/api/inventory')) {
      return handleInventoryAPI(request, inventoryManager, url);
    }

    return new Response('Tesla Model π API', { status: 200 });
  },
};

// API 处理函数
async function handleCartAPI(request: Request, cart: ShoppingCart, url: URL): Promise<Response> {
  // 实现购物车 API 逻辑
  // ...
}

async function handlePaymentAPI(request: Request, payment: PaymentProcessor, url: URL): Promise<Response> {
  // 实现支付 API 逻辑
  // ...
}

async function handleInventoryAPI(request: Request, inventory: InventoryManager, url: URL): Promise<Response> {
  // 实现库存 API 逻辑
  // ...
}
```

### 4.2 API 端点定义
```typescript
// API 端点映射
const API_ENDPOINTS = {
  // 购物车相关
  'POST /api/cart/create': 'createCart',
  'GET /api/cart/:id': 'getCart',
  'POST /api/cart/:id/add': 'addItem',
  'POST /api/cart/:id/remove': 'removeItem',
  'POST /api/cart/:id/update': 'updateItemQuantity',
  'POST /api/cart/:id/reserve': 'reserveCart',
  'POST /api/cart/:id/checkout': 'checkout',
  
  // 支付相关
  'POST /api/payment/create': 'createPayment',
  'POST /api/payment/verify/:id': 'verifyPayment',
  'POST /api/payment/webhook': 'handleWebhook',
  
  // 库存相关
  'GET /api/inventory/availability/:variantId': 'checkAvailability',
  'GET /api/inventory/report': 'getInventoryReport',
  'GET /api/inventory/variant/:variantId': 'getProductVariant'
};
```

## 5. 部署步骤

### 5.1 本地测试
```bash
# 构建项目
npm run build

# 本地开发测试
wrangler dev

# 或使用 Vite 开发服务器
npm run dev
```

### 5.2 部署到 Cloudflare
```bash
# 部署 Worker
wrangler deploy

# 验证部署
curl https://your-subdomain.your-account.workers.dev/api/inventory/report
```

### 5.3 部署验证
```bash
# 测试库存 API
curl -X GET https://your-worker.your-account.workers.dev/api/inventory/report

# 测试创建购物车
curl -X POST https://your-worker.your-account.workers.dev/api/cart/create \
  -H "Content-Type: application/json" \
  -d '{"userId": "user123"}'

# 测试添加商品到购物车
curl -X POST https://your-worker.your-account.workers.dev/api/cart/CART_ID/add \
  -H "Content-Type: application/json" \
  -d '{"variantId": "model-pi-standard-pearl-white", "quantity": 1}'
```

## 6. 监控和维护

### 6.1 日志监控
```typescript
// 添加日志记录
const logEvent = (level: string, message: string, data?: any) => {
  console.log(`[${level}] ${new Date().toISOString()} - ${message}`, data);
};
```

### 6.2 性能监控
- 监控 API 响应时间
- 跟踪支付成功率
- 监控库存变化

### 6.3 健康检查端点
```typescript
// 健康检查 API
if (path === '/health') {
  return new Response(JSON.stringify({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    services: {
      inventory: 'ok',
      payments: 'ok',
      cart: 'ok'
    }
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
```

## 7. 安全措施

### 7.1 输入验证
```typescript
// 验证函数
const validateInput = (data: any, schema: any): boolean => {
  // 实现输入验证逻辑
  return true;
};
```

### 7.2 身份验证
- 实现 JWT 认证
- 用户会话管理
- API 密钥验证

### 7.3 防止滥用
- 请求频率限制
- IP 黑名单
- 异常行为检测

## 8. 扩展和优化

### 8.1 缓存策略
- 实施内存缓存
- 使用 KV 缓存
- CDN 集成

### 8.2 数据库集成
- 考虑使用 D1 进行数据持久化
- 实施数据备份策略
- 数据归档机制

### 8.3 性能优化
- 代码分割
- 懒加载
- 资源压缩

## 9. 故障排除

### 9.1 常见问题
- KV 命名空间未正确配置
- 环境变量缺失
- 支付网关配置错误

### 9.2 调试命令
```bash
# 查看 Worker 日志
wrangler tail

# 检查 KV 数据
wrangler kv:key get --namespace-id=YOUR_NAMESPACE_ID "key_name"

# 本地调试
wrangler dev --local
```

## 10. 生产环境检查清单

- [ ] 所有 API 端点已测试
- [ ] 支付集成已验证
- [ ] 库存管理已验证
- [ ] 安全措施已实施
- [ ] 监控已设置
- [ ] 备份策略已制定
- [ ] 文档已更新

按照此指南，您可以成功部署和运行特斯拉 Model π 的购物车系统。