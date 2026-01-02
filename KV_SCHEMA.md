# Cloudflare KV 数据库设计文档 - Tesla Model Pi

## 1. 预订/订单数据存储

### 键命名规范
- `order:<pioneer_id>` - 存储特定订单的详细信息
- `orders:count` - 存储总订单数
- `orders:recent` - 存储最近订单ID列表（最多100个）

### 数据结构
```json
{
  "orderId": "PI-XXXXXX",
  "pioneerId": "PI-123456",
  "email": "user@example.com",
  "fullName": "John Doe",
  "orderDate": "2026-01-15T10:30:00Z",
  "orderStatus": "confirmed|shipped|delivered|cancelled",
  "paymentStatus": "paid|pending|failed",
  "paymentMethod": "usdt|paypal|credit_card",
  "color": "cyan|black|red",
  "depositAmount": 89.70,
  "totalAmount": 299.00,
  "deliveryAddress": {
    "street": "123 Main St",
    "city": "City",
    "country": "Country",
    "zipCode": "12345"
  },
  "notes": "Special delivery instructions"
}
```

### 操作示例
```javascript
// 存储订单
await MODEL_PI.put(`order:${pioneerId}`, JSON.stringify(orderData), { 
  expirationTtl: 60 * 60 * 24 * 30 // 30天过期
});

// 获取订单
const order = await MODEL_PI.get(`order:${pioneerId}`, 'json');
```

## 2. 用户偏好设置存储

### 键命名规范
- `user:pref:<user_id>` - 存储特定用户的偏好设置
- `user:pref:default` - 存储默认偏好设置

### 数据结构
```json
{
  "userId": "user-uuid",
  "language": "zh|en|es|ar",
  "theme": "midnight|solar",
  "notifications": {
    "orderUpdates": true,
    "marketing": false,
    "system": true
  },
  "displayOptions": {
    "fontSize": "normal|large",
    "highContrast": false,
    "animations": true
  },
  "lastUpdated": "2026-01-15T10:30:00Z"
}
```

### 操作示例
```javascript
// 存储用户偏好
await MODEL_PI.put(`user:pref:${userId}`, JSON.stringify(prefData), { 
  expirationTtl: 60 * 60 * 24 * 90 // 90天过期
});
```

## 3. 先锋申请数据存储

### 键命名规范
- `application:<application_id>` - 存储特定申请的详细信息
- `applications:pending` - 存储待处理申请ID列表
- `applications:count` - 存储申请总数

### 数据结构
```json
{
  "applicationId": "APP-XXXXXX",
  "pioneerId": "PI-123456",
  "fullName": "John Doe",
  "email": "user@example.com",
  "location": "City, Country",
  "expertise": "Engineer|Designer|Researcher",
  "social": "@username",
  "vision": "My vision for Model Pi...",
  "hasTesla": true,
  "hasStarlink": false,
  "testModules": ["neuralink", "satellite", "solar"],
  "applicationDate": "2026-01-15T10:30:00Z",
  "status": "pending|approved|rejected",
  "reviewer": "reviewer@example.com",
  "reviewDate": "2026-01-16T10:30:00Z",
  "notes": "Reviewer notes..."
}
```

### 操作示例
```javascript
// 存储申请
await MODEL_PI.put(`application:${applicationId}`, JSON.stringify(appData), { 
  expirationTtl: 60 * 60 * 24 * 180 // 180天过期
});
```

## 4. 动态内容管理

### 键命名规范
- `content:<section_name>` - 存储特定内容区域的数据
- `content:announcements` - 存储公告列表
- `content:active_campaigns` - 存储活跃活动

### 数据结构
```json
{
  "contentId": "hero_message|announcement_001",
  "type": "announcement|campaign|maintenance|news",
  "title": "New Feature Available",
  "message": "We've launched a new feature...",
  "language": "all|zh|en|es|ar",
  "priority": "low|medium|high|critical",
  "startDate": "2026-01-15T00:00:00Z",
  "endDate": "2026-01-31T23:59:59Z",
  "isActive": true,
  "createdBy": "admin",
  "createdAt": "2026-01-15T10:30:00Z",
  "updatedAt": "2026-01-15T10:30:00Z"
}
```

### 操作示例
```javascript
// 存储动态内容
await MODEL_PI.put(`content:announcements`, JSON.stringify(announcementList), { 
  expirationTtl: 60 * 60 * 24 // 1天过期，确保内容及时更新
});
```

## 5. 全局统计数据管理

### 键命名规范
- `stats:global` - 存储全局统计数据
- `stats:daily:<date>` - 存储每日统计数据
- `stats:monthly:<year_month>` - 存储月度统计数据

### 数据结构
```json
{
  "statsId": "global|daily|monthly",
  "totalBookings": 950000,
  "totalRevenue": 284050000,
  "activeUsers": 125000,
  "conversionRate": 0.023,
  "pageViews": 2500000,
  "uniqueVisitors": 890000,
  "ordersToday": 1250,
  "revenueToday": 373750,
  "lastUpdated": "2026-01-15T23:59:59Z",
  "targetBookings": 1000000,
  "progressPercentage": 95.0,
  "remainingBookings": 50000
}
```

### 操作示例
```javascript
// 更新全局统计
const currentStats = await MODEL_PI.get('stats:global', 'json') || {
  totalBookings: 924512,
  totalRevenue: 276428484,
  // ... 其他默认值
};
currentStats.totalBookings += newBookings;
currentStats.totalRevenue += newRevenue;
await MODEL_PI.put('stats:global', JSON.stringify(currentStats));
```

## 6. 销售目标增长计划

### 键命名规范
- `sales:targets` - 存储销售目标和进度
- `sales:daily_goals:<date>` - 存储每日销售目标

### 数据结构
```json
{
  "targetId": "sales_goals_2026",
  "startDate": "2026-01-01T00:00:00Z",
  "endDate": "2026-01-31T23:59:59Z",
  "initialInventory": 50000,
  "targetSales": 50000,
  "currentSales": 12500,
  "remainingInventory": 37500,
  "daysRemaining": 16,
  "dailyTarget": 2353,  // 50000 / 21天 ≈ 2381，考虑增长因素
  "growthRate": 0.02,    // 每日增长2%
  "dailyGoals": [
    {
      "date": "2026-01-16",
      "target": 2000,
      "actual": 1950,
      "cumulativeTarget": 14500,
      "cumulativeActual": 14450,
      "remaining": 35550
    },
    {
      "date": "2026-01-17",
      "target": 2040,
      "actual": 0,
      "cumulativeTarget": 16540,
      "cumulativeActual": 14450,
      "remaining": 33460
    }
    // ... 后续日期
  ],
  "lastUpdated": "2026-01-15T23:59:59Z",
  "healthStatus": "on-track"  // ahead | on-track | behind | critical
}
```

### 计算公式
- 每日目标 = 基础目标 × (1 + 增长率)^天数
- 基础目标 = 剩余库存 / 剩余天数
- 累积销售 = 当前销售 + 每日实际销售
- 增长策略：为确保月底售罄，每日目标逐步递增

### 增长计划实现
使用 SalesCalculator 类实现动态销售目标计算：
- 初始库存：50,000 部
- 目标销量：50,000 部（售罄）
- 计算周期：从当前日期到月底
- 增长率：每日 2%，确保稳步增长
- 健康度评估：根据完成进度与时间进度比较

## 7. 实时消息播报系统

### 键命名规范
- `broadcast:recent_purchases` - 存储最近购买消息
- `broadcast:queue` - 存储待播报消息队列

### 数据结构
```json
{
  "broadcastId": "purchase_alert_001",
  "type": "purchase|milestone|announcement",
  "message": "User from California just purchased Model Pi!",
  "timestamp": "2026-01-15T10:30:00Z",
  "priority": "normal|high|flash",
  "location": "California, USA",
  "userId": "user-anonymous",
  "purchaseAmount": 299.00,
  "showUntil": "2026-01-15T10:35:00Z"  // 显示5分钟
}
```

### 操作示例
```javascript
// 添加购买消息到播报队列
const newPurchase = {
  type: "purchase",
  message: `User from ${location} just purchased Model Pi!`,
  timestamp: new Date().toISOString(),
  location: location,
  priority: "normal"
};

// 获取当前播报列表（最多20条）
let broadcastList = await MODEL_PI.get('broadcast:recent_purchases', 'json') || [];
broadcastList.unshift(newPurchase);
broadcastList = broadcastList.slice(0, 20); // 保留最新20条
await MODEL_PI.put('broadcast:recent_purchases', JSON.stringify(broadcastList), { 
  expirationTtl: 60 * 10 // 10分钟过期
});
```

## 8. KV 操作优化建议

### 读取优化
1. 使用客户端缓存减少不必要的KV读取
2. 批量获取相关数据（如用户偏好+订单状态）
3. 设置合适的缓存时间（根据数据更新频率）

### 写入优化
1. 批量写入操作，减少写入次数
2. 使用 TTL 自动清理过期数据
3. 数据压缩（合并小数据项）

### 免费额度管理
- 读取操作：100,000次/月
- 写入操作：10,000次/月
- 建议读写比例保持在 10:1 左右
- 重要数据使用较长TTL，减少重复写入