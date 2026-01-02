# Tesla Model π 法律文件系统集成指南

## 系统概述

Tesla Model π 法律文件系统使用 Cloudflare Workers 和 KV 数据库存储法律文档，使用 R2 对象存储存储合规证书等大文件。

## 架构组件

### 后端组件
- **LegalService** (`/src/legal/legal-service.ts`) - 法律文档管理服务
- **Worker Integration** (`/src/legal/worker-integration.ts`) - Worker API 集成

### 前端组件
- **DynamicLegalDocumentation** (`/components/DynamicLegalDocumentation.tsx`) - 动态法律文档展示组件
- **CompliancePage** (`/components/CompliancePage.tsx`) - 合规页面

## 部署配置

### 1. 更新 wrangler.toml

```toml
name = "tesla-model-pi"
main = "src/legal/worker-integration.ts"  # 更新主入口点
compatibility_date = "2026-01-02"

# Cloudflare 账户配置
account_id = "1f6ac259e674c8327282b3b97b427b5b"
workers_dev = true

# KV 命名空间配置
[[kv_namespaces]]
binding = "MODEL_PI"
id = "589f4a8040d74c95b11525307ffe48d5"
preview_id = "589f4a8040d74c95b11525307ffe48d5"

# R2 存储桶配置
[[r2_buckets]]
binding = "MODEL_PI_ASSETS"
bucket_name = "model-pi-assets"

# 环境变量
[vars]
ENVIRONMENT = "production"
```

### 2. 创建 R2 存储桶

```bash
# 创建生产环境存储桶
npx wrangler r2 bucket create model-pi-assets

# 创建开发环境存储桶
npx wrangler r2 bucket create model-pi-assets-dev
```

## API 端点

### 法律文档端点
- `GET /api/legal/documents` - 获取所有公开法律文档
- `GET /api/legal/document/{id}` - 获取特定法律文档
- `POST /api/legal/init` - 初始化默认法律文档

### 合规证书端点
- `GET /api/legal/certificates` - 获取所有合规证书
- `GET /api/legal/certificate/{id}` - 获取特定合规证书
- `POST /api/legal/upload/certificate` - 上传合规证书

## 前端集成

### 1. 使用动态法律文档组件

```tsx
import DynamicLegalDocumentation from './components/DynamicLegalDocumentation';

function App() {
  return (
    <div>
      {/* 其他组件 */}
      <DynamicLegalDocumentation />
    </div>
  );
}
```

### 2. 使用合规页面

```tsx
import CompliancePage from './components/CompliancePage';

function App() {
  return (
    <div>
      {/* 其他组件 */}
      <CompliancePage />
    </div>
  );
}
```

## 初始化步骤

### 1. 部署 Worker

```bash
# 部署 Worker
wrangler deploy

# 初始化默认法律文档
curl -X POST https://your-worker.your-account.workers.dev/api/legal/init
```

### 2. 上传合规证书

```bash
# 上传合规证书
curl -X POST https://your-worker.your-account.workers.dev/api/legal/upload/certificate \
  -F "file=@certificate.pdf" \
  -F "certificateType=FCC" \
  -F "certificateId=FCC-ID-MPI-202601"
```

## 数据模型

### LegalDocument
```typescript
interface LegalDocument {
  id: string;
  title: string;
  content: string;
  type: 'privacy' | 'terms' | 'warranty' | 'refund' | 'legal' | 'compliance';
  version: string;
  lastUpdated: string;
  language: string;
  isPublic: boolean;
}
```

### ComplianceCertificate
```typescript
interface ComplianceCertificate {
  id: string;
  name: string;
  certificateType: 'FCC' | 'CE' | 'UKCA' | 'OTHER';
  certificateId: string;
  issueDate: string;
  expiryDate?: string;
  documentUrl?: string;
  isPublic: boolean;
}
```

## 存储策略

### KV 存储
- 法律文档元数据和小内容（<10KB）
- 合规证书元数据
- 文档索引和映射

### R2 存储
- 大型法律文档内容（>10KB）
- 合规证书文件
- 其他附件

## 安全措施

### 访问控制
- 所有 API 端点都应验证权限
- 敏感文档标记为非公开
- 使用 HTTPS 传输

### 数据保护
- 敏感信息加密存储
- 访问日志记录
- 定期安全审计

## 监控和维护

### 监控指标
- API 响应时间
- 文档加载成功率
- 存储使用量

### 维护任务
- 定期备份 KV 数据
- 清理过期文档
- 更新法律文件内容

## 故障排除

### 常见问题
1. **文档无法加载**: 检查 Worker 部署状态和 KV 配置
2. **证书上传失败**: 验证 R2 配置和权限设置
3. **API 访问错误**: 检查路由配置和认证设置

### 调试命令
```bash
# 查看 Worker 日志
wrangler tail

# 检查 KV 数据
wrangler kv:key get --namespace-id=YOUR_NAMESPACE_ID "legal:document:privacy-policy"

# 测试 API
curl https://your-worker.your-account.workers.dev/api/legal/documents
```

通过此集成，Tesla Model π 项目现在拥有一个完整的、可扩展的法律文件管理系统，支持动态内容更新、合规证书管理，并与现有的库存、支付和购物车系统集成。