# Cloudflare Workers KV 集成说明（免费额度优化版）

## 配置步骤

1. **安装 Wrangler CLI**
   ```bash
   npm install -g wrangler
   ```

2. **登录 Cloudflare 账户**
   ```bash
   npx wrangler login
   ```

3. **创建 KV 命名空间**
   ```bash
   # 生产环境命名空间
   npx wrangler kv namespace create MODEL_PI
   
   # 预览环境命名空间
   npx wrangler kv namespace create MODEL_PI --preview
   ```

4. **更新 wrangler.toml**
   将生成的命名空间 ID 填入 `wrangler.toml` 文件中的 `id` 和 `preview_id` 字段

## 免费额度说明

Cloudflare Workers KV 免费计划包含：
- **每月 10 万次读取操作**
- **每月 1 万次写入/删除操作**
- **每个键最大 25 MiB 数据**
- **总存储空间无限制**（按使用量计费，但免费额度内无费用）

## 部署命令

```bash
# 部署到 Cloudflare Workers
npx wrangler deploy

# 在本地开发模式下运行
npx wrangler dev

# 管理 KV 数据
npx wrangler kv key put "my-key" "my-value" --binding=MODEL_PI
npx wrangler kv key get "my-key" --binding=MODEL_PI
npx wrangler kv key delete "my-key" --binding=MODEL_PI
```

## API 接口

Worker 提供以下 API 端点：

- `GET /api/kv/get?key=your-key` - 获取 KV 值（计入读取操作）
- `POST /api/kv/set` - 设置 KV 值（计入写入操作），请求体格式：
  ```json
  {
    "key": "your-key",
    "value": "your-value",
    "expiration": 3600  // 可选，过期时间（秒）
  }
  ```

## 免费额度优化建议

为充分利用免费额度，请注意：

1. **缓存策略**：对频繁访问的数据使用客户端缓存，减少不必要的 KV 读取
2. **批量操作**：将多个小数据合并为一个键值对，减少操作次数
3. **数据过期**：设置合理的过期时间，避免长期存储不必要的数据
4. **读写平衡**：优先使用读取操作，因为读取额度是写入的10倍

## 环境变量

在部署时，Worker 会使用以下环境变量：
- `ENVIRONMENT` - 当前环境（production、staging 等）
- `MODEL_PI` - KV 命名空间绑定

## 开发注意事项

- Worker 代码位于 `src/index.ts`
- 使用 TypeScript 编写，类型定义包含在 `@cloudflare/workers-types`
- 遵循 Cloudflare Workers 的限制和最佳实践
- 考虑免费额度限制，优化数据访问模式