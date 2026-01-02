# Tesla Model Pi 文件存储方案

## 当前项目分析

从现有项目结构分析，Tesla Model Pi 项目目前主要使用外部资源链接（如透明纹理网站）作为背景图片，但未来可能会需要存储以下类型的文件：

1. **车型图片** - Model π 手机的官方图片
2. **宣传视频** - 产品演示视频
3. **用户上传内容** - 可能的用户评论图片
4. **动态内容** - 营销活动图片/视频

## 存储方案建议

### 1. 机型图片存储

#### 推荐方案：Cloudflare R2 对象存储

**原因：**
- KV 数据库不适合存储大文件（图片）
- KV 单个键值对最大 25MB，不适合图片存储
- R2 专门用于对象存储，成本更低

**配置示例：**
```toml
# 在 wrangler.toml 中添加 R2 配置
[[r2_buckets]]
binding = "MODEL_PI_ASSETS"
bucket_name = "model-pi-assets"
preview_bucket_name = "model-pi-assets-dev"
```

**图片存储策略：**
- 原图：`images/models/model-pi-standard/original.jpg`
- 缩略图：`images/models/model-pi-standard/thumb.jpg`
- 不同尺寸：`images/models/model-pi-standard/800x600.jpg`

### 2. 网站视频存储

#### 推荐方案：Cloudflare Stream + R2

**原因：**
- 视频文件较大，不适合 KV 存储
- Stream 提供视频转码和优化分发
- 与 R2 集成，成本效益高

**替代方案：仅使用 R2**
- 如果不需要复杂转码，直接使用 R2 存储

### 3. 与现有 KV 配置的集成

#### 元数据存储在 KV 中
```typescript
// 存储文件元数据，实际文件存储在 R2
interface FileMetadata {
  fileId: string;
  fileName: string;
  fileType: 'image' | 'video';
  fileSize: number;
  uploadDate: string;
  r2Key: string; // 指向 R2 中的实际文件
  url: string; // 访问 URL
  tags: string[];
}

// 在 MODEL_PI KV 中存储元数据
await MODEL_PI.put(`file:metadata:${fileId}`, JSON.stringify(metadata));
```

#### 文件访问流程
```
用户请求 → Worker → KV 查找元数据 → R2 获取文件 → 返回给用户
```

### 4. 实施步骤

#### 步骤 1：设置 R2 存储桶
```bash
# 创建 R2 存储桶
npx wrangler r2 bucket create model-pi-assets --env production
npx wrangler r2 bucket create model-pi-assets-dev --env development
```

#### 步骤 2：更新 wrangler.toml
```toml
name = "tesla-model-pi"
main = "src/index.ts"
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

#### 步骤 3：创建文件服务类
```typescript
// src/file-service.ts
interface Env {
  MODEL_PI: KVNamespace;
  MODEL_PI_ASSETS: R2Bucket;
}

export class FileService {
  private kv: KVNamespace;
  private r2: R2Bucket;

  constructor(env: Env) {
    this.kv = env.MODEL_PI;
    this.r2 = env.MODEL_PI_ASSETS;
  }

  async uploadImage(file: ArrayBuffer, fileName: string, metadata: any): Promise<string> {
    // 上传到 R2
    const fileId = `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const r2Key = `images/${fileId}/${fileName}`;
    
    await this.r2.put(r2Key, file, {
      httpMetadata: {
        contentType: 'image/jpeg' // 根据实际类型调整
      },
      customMetadata: metadata
    });

    // 存储元数据到 KV
    const fileMetadata = {
      fileId,
      fileName,
      fileType: 'image',
      uploadDate: new Date().toISOString(),
      r2Key,
      url: `https://pub-xxx.r2.dev/${r2Key}`, // R2 公共访问 URL
      ...metadata
    };

    await this.kv.put(`file:metadata:${fileId}`, JSON.stringify(fileMetadata));

    return fileId;
  }

  async getImage(fileId: string): Promise<{ file: R2ObjectBody, metadata: any }> {
    // 从 KV 获取元数据
    const metadata = await this.kv.get(`file:metadata:${fileId}`, 'json');
    if (!metadata) {
      throw new Error('File not found');
    }

    // 从 R2 获取文件
    const file = await this.r2.get(metadata.r2Key);
    if (!file) {
      throw new Error('File not found in R2');
    }

    return { file, metadata };
  }
}
```

### 5. 成本优化建议

#### R2 成本结构
- 存储：$0.015/GB/month
- 下载：$0.01/GB
- 请求：$0.35/10k 请求

#### 优化策略
1. **图片优化**：使用 WebP 格式，压缩图片
2. **CDN 缓存**：利用 Cloudflare CDN 缓存静态资源
3. **生命周期管理**：设置旧文件自动删除
4. **分层存储**：不常访问的文件使用标准类存储

### 6. 安全考虑

#### 访问控制
- 使用预签名 URL 控制访问权限
- 实现访问令牌验证
- 限制文件上传大小和类型

#### 安全实践
```typescript
// 生成临时访问 URL
async generatePresignedUrl(fileId: string, expiryMinutes: number = 60): Promise<string> {
  const metadata = await this.kv.get(`file:metadata:${fileId}`, 'json');
  if (!metadata) {
    throw new Error('File not found');
  }

  // 在实际实现中，使用 R2 的预签名 URL 功能
  // 这里简化为返回 R2 公共 URL（需要配置公共访问权限）
  return metadata.url;
}
```

### 7. 性能优化

#### 缓存策略
- 浏览器缓存：设置长期缓存头
- CDN 缓存：利用 Cloudflare 全球 CDN
- Worker 缓存：在 Worker 中缓存频繁访问的元数据

#### 图片优化
- 响应式图片：提供多种尺寸
- 格式选择：WebP > JPEG > PNG
- 懒加载：延迟加载非关键图片

### 8. 备份和恢复

#### 备份策略
- 定期备份 KV 中的元数据
- R2 版本控制：启用对象版本控制
- 跨区域复制：重要数据跨区域备份

### 9. 监控和日志

#### 监控指标
- 存储使用量
- 访问请求量
- 错误率
- 加载时间

#### 日志记录
- 文件上传/下载日志
- 错误日志
- 访问统计

这个方案提供了可扩展、成本效益高且安全的文件存储解决方案，与现有的 Cloudflare Workers 和 KV 配置完全集成。