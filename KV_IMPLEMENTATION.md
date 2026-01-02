# Tesla Model Pi - Cloudflare KV 完整实现方案

## 项目概述

本方案为 Tesla Model Pi 项目设计了一套完整的 Cloudflare KV 数据存储解决方案，包括预订系统、用户偏好、申请管理、内容管理、统计和销售目标等功能模块。

## 1. 预订/订单数据存储

### 实现细节
- **键命名**：`order:<pioneer_id>`
- **数据结构**：包含订单ID、用户信息、状态、支付详情等
- **TTL设置**：30天过期
- **API端点**：`/api/orders/get` 和 `/api/orders/save`

### 代码实现
```typescript
// 使用 KVAPI 类进行操作
const orderData: OrderData = {
  orderId: "PI-123456",
  pioneerId: "PI-123456",
  email: "user@example.com",
  // ... 其他字段
};

await kvAPI.saveOrder(orderData);
const order = await kvAPI.getOrder("PI-123456");
```

## 2. 用户偏好设置存储

### 实现细节
- **键命名**：`user:pref:<user_id>`
- **数据结构**：包含语言、主题、通知设置等
- **TTL设置**：90天过期
- **API端点**：`/api/preferences/get` 和 `/api/preferences/save`

## 3. 先锋申请数据存储

### 实现细节
- **键命名**：`application:<application_id>`
- **数据结构**：包含申请人信息、状态、审核详情等
- **TTL设置**：180天过期
- **API端点**：`/api/applications/get` 和 `/api/applications/save`

## 4. 动态内容管理

### 实现细节
- **键命名**：`content:<section_name>`
- **数据结构**：包含公告、活动、维护信息等
- **TTL设置**：1天过期（确保内容及时更新）
- **API端点**：通过通用KV API访问

## 5. 全局统计数据管理

### 实现细节
- **键命名**：`stats:global`
- **数据结构**：包含预订数、收入、用户等统计信息
- **更新策略**：实时更新，无TTL
- **API端点**：`/api/stats/get`

## 6. 销售目标增长计划

### 实现细节
- **计算逻辑**：使用 SalesCalculator 类
- **目标设定**：从5万库存到月底售罄
- **增长策略**：每日目标递增2%
- **健康度评估**：根据进度与时间比较

### 使用 SalesCalculator
```typescript
import { SalesCalculator } from './sales-calculator';

const salesPlan = SalesCalculator.calculateSalesPlan(
  50000, // 初始库存
  50000, // 目标销量
  '2026-01-16', // 开始日期
  '2026-01-31', // 结束日期
  12500  // 当前销量
);
```

## 7. 实时消息播报系统

### 实现细节
- **键命名**：`broadcast:recent_purchases`
- **数据结构**：包含购买消息、时间戳、优先级等
- **TTL设置**：10分钟过期
- **容量限制**：最多保存20条消息
- **API端点**：`/api/broadcast/get` 和 `/api/broadcast/add`

## 8. Cloudflare Worker API

### 主要端点
- `GET /api/kv/get?key=xxx` - 通用KV获取
- `POST /api/kv/set` - 通用KV设置
- `GET /api/orders/get?pioneerId=xxx` - 获取订单
- `POST /api/orders/save` - 保存订单
- `GET /api/preferences/get?userId=xxx` - 获取用户偏好
- `POST /api/preferences/save` - 保存用户偏好
- `GET /api/applications/get?applicationId=xxx` - 获取申请
- `POST /api/applications/save` - 保存申请
- `GET /api/stats/get` - 获取统计数据
- `GET /api/broadcast/get` - 获取播报消息
- `POST /api/broadcast/add` - 添加播报消息

## 9. 免费额度优化策略

### 读取优化
- 使用浏览器缓存减少重复请求
- 批量获取相关数据
- 设置合理的客户端缓存时间

### 写入优化
- 批量操作减少写入次数
- 使用TTL自动清理过期数据
- 数据压缩合并小数据项

### 配额管理
- 读取配额：100,000次/月
- 写入配额：10,000次/月
- 建议保持10:1的读写比例

## 10. 部署和使用

### 部署命令
```bash
# 部署Worker
npx wrangler deploy

# 本地开发
npx wrangler dev
```

### 环境要求
- Node.js 16+
- Wrangler CLI
- Cloudflare 账户

### 配置文件
- `wrangler.toml` - Worker配置
- `src/index.ts` - Worker主入口
- `src/kv-api.ts` - KV API实现
- `src/sales-calculator.ts` - 销售计算工具

## 11. 监控和维护

### 性能监控
- 定期检查API响应时间
- 监控KV操作次数
- 跟踪数据访问模式

### 数据维护
- 定期清理过期数据
- 备份重要数据
- 监控存储使用量

此方案为 Tesla Model Pi 项目提供了一个完整、可扩展且优化的 Cloudflare KV 解决方案，能够在免费额度内高效运行，同时支持所有核心功能需求。