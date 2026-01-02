# Cloudflare R2 配置与集成指南

## 1. R2 存储桶设置

### 1.1 创建存储桶
```bash
# 创建生产环境存储桶
npx wrangler r2 bucket create model-pi-assets

# 创建开发环境存储桶
npx wrangler r2 bucket create model-pi-assets-dev
```

### 1.2 配置 wrangler.toml
```toml
# 在现有 wrangler.toml 中添加 R2 配置
[[r2_buckets]]
binding = "MODEL_PI_ASSETS"
bucket_name = "model-pi-assets"

# 预览环境配置
[[r2_buckets]]
binding = "MODEL_PI_ASSETS"
bucket_name = "model-pi-assets-dev"
preview = true
```

## 2. 权限配置

### 2.1 IAM 权限
确保账户有以下 R2 权限：
- `com.cloudflare.edge.r2.bucket.read`
- `com.cloudflare.edge.r2.bucket.write`
- `com.cloudflare.edge.r2.object.read`
- `com.cloudflare.edge.r2.object.write`

### 2.2 Worker 权限
在 Cloudflare 仪表板中为 Worker 分配 R2 访问权限。

## 3. 文件上传 API

### 3.1 图片上传端点
```typescript
// POST /api/upload/image
// 上传车型图片
const uploadImage = async (request: Request, env: Env) => {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  const modelVariant = formData.get('modelVariant') as string;
  const tags = formData.get('tags') as string;

  if (!file) {
    return new Response(JSON.stringify({ error: 'No file provided' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const fileService = new FileService(env);
  const arrayBuffer = await file.arrayBuffer();
  
  const result = await fileService.uploadImage(
    arrayBuffer,
    file.name,
    undefined, // userId
    modelVariant,
    tags ? tags.split(',') : []
  );

  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' }
  });
};
```

### 3.2 视频上传端点
```typescript
// POST /api/upload/video
// 上传宣传视频
const uploadVideo = async (request: Request, env: Env) => {
  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return new Response(JSON.stringify({ error: 'No file provided' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const fileService = new FileService(env);
  const arrayBuffer = await file.arrayBuffer();
  
  const result = await fileService.uploadVideo(arrayBuffer, file.name);

  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' }
  });
};
```

## 4. 文件访问控制

### 4.1 公共访问配置
```bash
# 设置存储桶为公共读取
npx wrangler r2 object presign --bucket model-pi-assets --method GET --expiry 31536000
```

### 4.2 访问令牌生成
```typescript
// 生成预签名 URL（如果需要临时访问控制）
const generatePresignedUrl = async (fileId: string, expirySeconds: number = 3600) => {
  // 在实际实现中使用 R2 的预签名 URL 功能
  // 这里简化为返回公共 URL
  return await fileService.getPublicUrl(fileId);
};
```

## 5. 文件组织结构

### 5.1 R2 对象键结构
```
model-pi-assets/
├── images/
│   ├── models/
│   │   ├── standard/
│   │   ├── foldable-ai/
│   │   └── variants/
│   ├── users/
│   └── marketing/
├── videos/
│   ├── promotional/
│   ├── tutorials/
│   └── demos/
└── documents/
    ├── manuals/
    └── specs/
```

### 5.2 命名约定
- 文件ID: `type-timestamp-randomstring`
- 例如: `img-1634567890-abc123.jpg`

## 6. 性能优化

### 6.1 CDN 集成
```typescript
// 使用 Cloudflare CDN 缓存静态资源
const getCdnUrl = (r2Key: string) => {
  return `https://cdn.model-pi.com/${r2Key}`;
};
```

### 6.2 图片优化
- 自动转换为 WebP 格式
- 提供多种尺寸版本
- 启用浏览器缓存

## 7. 成本优化

### 7.1 存储类选择
- 热数据：标准存储
- 冷数据：可考虑不频繁访问存储

### 7.2 生命周期规则
```bash
# 配置生命周期规则自动删除旧文件
# 示例：30天后转换为不频繁访问，365天后删除
```

## 8. 安全措施

### 8.1 文件验证
```typescript
// 上传前验证文件类型和大小
const validateFile = (file: File) => {
  // 检查 MIME 类型
  const allowedTypes = [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    'video/mp4', 'video/webm'
  ];
  
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid file type' };
  }
  
  // 检查文件大小
  if (file.size > 100 * 1024 * 1024) { // 100MB
    return { valid: false, error: 'File too large' };
  }
  
  return { valid: true };
};
```

### 8.2 访问限制
- 限制上传频率
- 验证文件内容
- 实现防盗链

## 9. 监控和日志

### 9.1 使用指标
- 存储使用量
- 请求次数
- 错误率
- 带宽使用

### 9.2 日志记录
```typescript
// 记录文件操作日志
const logFileOperation = (operation: string, fileId: string, userId?: string) => {
  console.log(`[${new Date().toISOString()}] ${operation} - File: ${fileId}, User: ${userId || 'anonymous'}`);
};
```

## 10. 备份策略

### 10.1 定期备份
- 每日备份重要文件
- 元数据定期导出
- 跨区域复制

### 10.2 恢复流程
- 版本控制启用
- 删除前保留期设置
- 手动恢复接口

## 11. 集成测试

### 11.1 上传测试
```bash
# 测试图片上传
curl -X POST http://localhost:8787/api/upload/image \
  -F "file=@test-image.jpg" \
  -F "modelVariant=standard"
```

### 11.2 访问测试
```bash
# 测试文件访问
curl -I https://pub-xxx.r2.dev/images/models/standard/fileId/test-image.jpg
```

这个配置提供了完整的 R2 集成方案，与现有的 KV 配置和 Tesla Model Pi 应用程序完全兼容。