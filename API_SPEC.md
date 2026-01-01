# Tesla Model Pi | 后端 API 接口规范 (V1.0-Alpha)

本自述文件定义了 **Tesla Model Pi Pioneer Portal** 的后端交互标准。所有接口需遵循极简、安全、高并发的设计准则。

---

## 1. 核心业务接口

### 1.1 预订与席位锁定 (Orders)
*   **接口名称**：创建先锋版预订
*   **路径**：`POST /api/v1/orders/pioneer`
*   **功能**：处理 $89.70 的定金支付，锁定 BATCH 01 席位。
*   **请求参数**：
    ```json
    {
      "pioneer_name": "string",
      "email": "string",
      "payment_method": "stripe_token",
      "color_id": "crimson | obsidian | titanium",
      "geo_location": "string"
    }
    ```
*   **响应结果**：返回唯一的 `pioneer_id`（如：PI-XXXXXX）和 `order_status`。

### 1.2 先锋门户数据 (Dashboard)
*   **接口名称**：获取实时连接状态
*   **路径**：`GET /api/v1/portal/status`
*   **认证**：需携带 `Bearer Token`
*   **返回数据**：
    ```json
    {
      "link_status": "V3_ACTIVE",
      "downlink_mbps": 842.1,
      "latency_ms": 18,
      "uplink_target": "Orbital 184-B",
      "production_stage": "MANUFACTURING | TRANSPORT | ARRIVAL"
    }
    ```

---

## 2. AI 视觉助手 (Gemini Proxy)

为了保护 `API_KEY`，前端不直接请求 Google，而是通过后端中转。

*   **路径**：`POST /api/v1/ai/chat`
*   **逻辑**：
    1.  验证用户是否为 BATCH 01 已付费先锋。
    2.  调用 Gemini 3 Pro 接口，注入 **Model Pi 愿景指令**。
    3.  返回流式 (Stream) 或全文本响应。

---

## 3. 全球实时统计 (Marketing Stats)

支持前端 Hero 区域的数据跳动。

*   **路径**：`GET /api/v1/stats/realtime`
*   **功能**：返回全球已预订人数、实时在线先锋数、配额剩余百分比。
*   **缓存策略**：Redis 每秒刷新一次，支持极致响应。

---

## 4. 安全与认证

*   **身份验证**：采用 JWT (JSON Web Tokens) 进行会话管理。
*   **数据加密**：所有敏感生物识别元数据（用于模拟 Neuralink）必须在传输前进行 AES-512 加密。
*   **速率限制**：针对 `api/v1/ai` 接口设置每分钟 20 次请求的频率限制，防止恶意刷量。

---

## 5. 开发建议

建议使用 **Node.js (Fastify)** 或 **Go** 进行开发，以匹配 Starlink V3 原生的高并发需求。数据库推荐使用 **PostgreSQL** 存储订单，**Redis** 存储实时统计。
