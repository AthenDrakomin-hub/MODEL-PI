# 特斯拉 Model π API 文档

## 1. 概述

特斯拉 Model π API 提供了完整的电商功能，包括库存管理、支付处理和购物车功能。

### 基础 URL
```
https://your-worker.your-account.workers.dev/api
```

### 认证
所有 API 端点需要有效的认证令牌（待实现）。

## 2. 购物车 API

### 2.1 创建购物车
```
POST /cart/create
```

**请求体:**
```json
{
  "userId": "string"
}
```

**响应:**
```json
{
  "success": true,
  "cart": {
    "id": "CART-xxx",
    "userId": "user123",
    "items": [],
    "subtotal": 0,
    "totalDeposit": 0,
    "createdAt": "2026-01-16T10:00:00Z",
    "updatedAt": "2026-01-16T10:00:00Z",
    "status": "active"
  }
}
```

### 2.2 获取购物车
```
GET /cart/{cartId}
```

**响应:**
```json
{
  "success": true,
  "cart": { ... }
}
```

### 2.3 添加商品到购物车
```
POST /cart/{cartId}/add
```

**请求体:**
```json
{
  "variantId": "model-pi-standard-pearl-white",
  "quantity": 1
}
```

**响应:**
```json
{
  "success": true,
  "message": "Item added successfully"
}
```

### 2.4 更新购物车商品数量
```
POST /cart/{cartId}/update
```

**请求体:**
```json
{
  "itemId": "ITEM-xxx",
  "quantity": 2
}
```

**响应:**
```json
{
  "success": true,
  "message": "Item quantity updated"
}
```

### 2.5 预订购物车商品
```
POST /cart/{cartId}/reserve
```

**请求体:**
```json
{
  "userId": "user123"
}
```

**响应:**
```json
{
  "success": true,
  "reservationIds": ["RES-xxx", "RES-yyy"]
}
```

### 2.6 购物车结账
```
POST /cart/{cartId}/checkout
```

**请求体:**
```json
{
  "userId": "user123",
  "paymentMethod": "usdt-erc20"
}
```

**响应:**
```json
{
  "success": true,
  "orderId": "ORDER-xxx",
  "paymentUrl": "https://payment-gateway.com/checkout/xxx",
  "reservationIds": ["RES-xxx"]
}
```

## 3. 支付 API

### 3.1 创建支付
```
POST /payment/create
```

**请求体:**
```json
{
  "orderId": "ORDER-xxx",
  "userId": "user123",
  "amount": 89.7,
  "currency": "USD",
  "paymentMethod": "usdt-erc20",
  "returnUrl": "https://model-pi.com/success"
}
```

**响应:**
```json
{
  "success": true,
  "paymentId": "PAY-xxx",
  "status": "pending",
  "redirectUrl": "usdt:0x...?amount=89.7"
}
```

### 3.2 验证支付
```
POST /payment/verify/{paymentId}
```

**响应:**
```json
{
  "success": true,
  "status": "completed",
  "transactionId": "TX-xxx"
}
```

### 3.3 支付回调处理
```
POST /payment/webhook
```

**请求体:**
```json
{
  "paymentId": "PAY-xxx",
  "status": "completed",
  "transactionId": "TX-xxx"
}
```

**响应:**
```json
{
  "success": true
}
```

## 4. 库存 API

### 4.1 检查库存可用性
```
GET /inventory/availability/{variantId}?quantity=1
```

**响应:**
```json
{
  "success": true,
  "available": true,
  "availableQuantity": 1500
}
```

### 4.2 获取库存报告
```
GET /inventory/report
```

**响应:**
```json
{
  "inventory": [
    {
      "variantId": "model-pi-standard-pearl-white",
      "total": 40000,
      "available": 38500,
      "reserved": 1200,
      "sold": 300,
      "percentageSold": 1
    }
  ]
}
```

### 4.3 获取产品变体信息
```
GET /inventory/variant/{variantId}
```

**响应:**
```json
{
  "success": true,
  "product": {
    "id": "model-pi-standard-pearl-white",
    "modelName": "standard",
    "color": "珍珠白",
    "fullPrice": 299,
    "depositAmount": 89.7,
    "quantity": 40000,
    "reserved": 1200,
    "available": 38500
  }
}
```

## 5. 系统 API

### 5.1 系统健康检查
```
GET /health
```

**响应:**
```json
{
  "status": "healthy",
  "timestamp": "2026-01-16T10:00:00Z",
  "checks": {
    "inventoryManager": true,
    "paymentProcessor": true,
    "shoppingCart": true
  }
}
```

### 5.2 系统状态报告
```
GET /status
```

**响应:**
```json
{
  "timestamp": "2026-01-16T10:00:00Z",
  "services": {
    "inventory": true,
    "payment": true,
    "cart": true
  },
  "inventorySummary": {
    "totalProducts": 7,
    "totalStock": 100000,
    "totalAvailable": 95000,
    "totalSold": 3000
  },
  "paymentSupport": [
    "USDT (ERC20)",
    "USDT (TRC20)",
    "PayPal"
  ],
  "health": "operational"
}
```

## 6. 错误处理

所有 API 端点在失败时返回标准错误格式：

```json
{
  "success": false,
  "message": "Error description",
  "errorCode": "ERROR_CODE",
  "timestamp": "2026-01-16T10:00:00Z"
}
```

## 7. 限频策略

- 每个 IP 每分钟最多 100 个请求
- 每个用户每秒最多 10 个请求
- 高频请求将被暂时限制

## 8. 示例请求

### 使用 curl 创建购物车
```bash
curl -X POST https://your-worker.your-account.workers.dev/api/cart/create \
  -H "Content-Type: application/json" \
  -d '{"userId": "user123"}'
```

### 使用 JavaScript
```javascript
const response = await fetch('https://your-worker.your-account.workers.dev/api/cart/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    userId: 'user123'
  })
});

const result = await response.json();
console.log(result);
```