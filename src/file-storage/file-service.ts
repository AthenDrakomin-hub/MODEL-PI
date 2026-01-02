// src/file-storage/file-service.ts
// Tesla Model Pi 文件存储服务

interface FileMetadata {
  fileId: string;
  fileName: string;
  fileType: 'image' | 'video' | 'document';
  fileSize: number;
  uploadDate: string;
  r2Key: string;
  url: string;
  tags: string[];
  userId?: string;
  modelVariant?: string; // 特定车型变体
  isPublic: boolean; // 是否公开访问
}

interface UploadResult {
  success: boolean;
  fileId?: string;
  url?: string;
  message?: string;
}

interface FileDownload {
  file: R2ObjectBody;
  metadata: FileMetadata;
}

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

  /**
   * 上传图片文件
   */
  async uploadImage(
    file: ArrayBuffer, 
    fileName: string, 
    userId?: string,
    modelVariant?: string,
    tags: string[] = []
  ): Promise<UploadResult> {
    try {
      // 验证文件类型和大小
      if (!this.isValidImageFile(fileName)) {
        return { success: false, message: 'Invalid image file type' };
      }

      if (file.byteLength > 10 * 1024 * 1024) { // 10MB 限制
        return { success: false, message: 'File size exceeds 10MB limit' };
      }

      // 生成唯一文件 ID
      const fileId = `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const r2Key = `images/models/${modelVariant || 'general'}/${fileId}/${fileName}`;
      
      // 上传到 R2
      await this.r2.put(r2Key, file, {
        httpMetadata: {
          contentType: this.getContentType(fileName),
          contentDisposition: `inline; filename="${fileName}"`
        },
        customMetadata: {
          userId: userId || '',
          modelVariant: modelVariant || '',
          uploadDate: new Date().toISOString()
        }
      });

      // 创建文件元数据
      const fileMetadata: FileMetadata = {
        fileId,
        fileName,
        fileType: 'image',
        fileSize: file.byteLength,
        uploadDate: new Date().toISOString(),
        r2Key,
        url: `${this.getPublicUrlPrefix()}/${r2Key}`,
        tags,
        userId,
        modelVariant,
        isPublic: true
      };

      // 存储元数据到 KV
      await this.kv.put(`file:metadata:${fileId}`, JSON.stringify(fileMetadata), {
        expirationTtl: 60 * 60 * 24 * 365 // 1年过期
      });

      return {
        success: true,
        fileId,
        url: fileMetadata.url,
        message: 'Image uploaded successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: `Upload failed: ${(error as Error).message}`
      };
    }
  }

  /**
   * 上传视频文件
   */
  async uploadVideo(
    file: ArrayBuffer, 
    fileName: string, 
    userId?: string,
    tags: string[] = []
  ): Promise<UploadResult> {
    try {
      // 验证文件类型和大小
      if (!this.isValidVideoFile(fileName)) {
        return { success: false, message: 'Invalid video file type' };
      }

      if (file.byteLength > 100 * 1024 * 1024) { // 100MB 限制
        return { success: false, message: 'Video file size exceeds 100MB limit' };
      }

      // 生成唯一文件 ID
      const fileId = `vid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const r2Key = `videos/promotional/${fileId}/${fileName}`;
      
      // 上传到 R2
      await this.r2.put(r2Key, file, {
        httpMetadata: {
          contentType: this.getContentType(fileName),
          contentDisposition: `inline; filename="${fileName}"`
        },
        customMetadata: {
          userId: userId || '',
          uploadDate: new Date().toISOString()
        }
      });

      // 创建文件元数据
      const fileMetadata: FileMetadata = {
        fileId,
        fileName,
        fileType: 'video',
        fileSize: file.byteLength,
        uploadDate: new Date().toISOString(),
        r2Key,
        url: `${this.getPublicUrlPrefix()}/${r2Key}`,
        tags,
        userId,
        isPublic: true
      };

      // 存储元数据到 KV
      await this.kv.put(`file:metadata:${fileId}`, JSON.stringify(fileMetadata), {
        expirationTtl: 60 * 60 * 24 * 365 // 1年过期
      });

      return {
        success: true,
        fileId,
        url: fileMetadata.url,
        message: 'Video uploaded successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: `Upload failed: ${(error as Error).message}`
      };
    }
  }

  /**
   * 获取文件
   */
  async getFile(fileId: string): Promise<FileDownload | null> {
    try {
      // 从 KV 获取元数据
      const metadata = await this.kv.get(`file:metadata:${fileId}`, 'json') as FileMetadata;
      if (!metadata) {
        return null;
      }

      // 从 R2 获取文件
      const file = await this.r2.get(metadata.r2Key);
      if (!file || file.body === null) {
        return null;
      }

      return { file, metadata };
    } catch (error) {
      console.error('Error getting file:', error);
      return null;
    }
  }

  /**
   * 获取公开访问 URL
   */
  async getPublicUrl(fileId: string): Promise<string | null> {
    const metadata = await this.kv.get(`file:metadata:${fileId}`, 'json') as FileMetadata;
    return metadata ? metadata.url : null;
  }

  /**
   * 删除文件
   */
  async deleteFile(fileId: string, userId?: string): Promise<boolean> {
    try {
      // 获取元数据
      const metadata = await this.kv.get(`file:metadata:${fileId}`, 'json') as FileMetadata;
      if (!metadata) {
        return false;
      }

      // 验证权限（如果提供了 userId）
      if (userId && metadata.userId && metadata.userId !== userId) {
        return false; // 无权限删除
      }

      // 从 R2 删除文件
      await this.r2.delete(metadata.r2Key);

      // 从 KV 删除元数据
      await this.kv.delete(`file:metadata:${fileId}`);

      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      return false;
    }
  }

  /**
   * 获取用户文件列表
   */
  async getUserFiles(userId: string): Promise<FileMetadata[]> {
    // 在实际实现中，可能需要使用 R2 列出对象功能
    // 或者在 KV 中维护用户文件索引
    // 这里简化实现，假设我们有索引
    const userFilesKey = `user:files:${userId}`;
    const fileIds = await this.kv.get(userFilesKey, 'json') as string[] || [];
    
    const files: FileMetadata[] = [];
    for (const fileId of fileIds) {
      const metadata = await this.kv.get(`file:metadata:${fileId}`, 'json') as FileMetadata;
      if (metadata) {
        files.push(metadata);
      }
    }
    
    return files;
  }

  /**
   * 验证图片文件类型
   */
  private isValidImageFile(fileName: string): boolean {
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'];
    const ext = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));
    return validExtensions.includes(ext);
  }

  /**
   * 验证视频文件类型
   */
  private isValidVideoFile(fileName: string): boolean {
    const validExtensions = ['.mp4', '.mov', '.avi', '.webm', '.mkv'];
    const ext = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));
    return validExtensions.includes(ext);
  }

  /**
   * 根据文件名获取内容类型
   */
  private getContentType(fileName: string): string {
    const ext = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));
    
    const contentTypeMap: { [key: string]: string } = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
      '.avif': 'image/avif',
      '.mp4': 'video/mp4',
      '.mov': 'video/quicktime',
      '.avi': 'video/x-msvideo',
      '.webm': 'video/webm',
      '.mkv': 'video/x-matroska'
    };
    
    return contentTypeMap[ext] || 'application/octet-stream';
  }

  /**
   * 获取公共 URL 前缀
   */
  private getPublicUrlPrefix(): string {
    // 在实际实现中，这应该是 R2 的公共访问 URL
    // 格式: https://<accountid>.r2.cloudflarestorage.com/<bucketname>
    return `https://pub-${this.getAccountId()}.r2.dev`;
  }

  /**
   * 获取账户 ID（从环境变量或配置中）
   */
  private getAccountId(): string {
    // 在实际 Worker 环境中，可能需要从其他地方获取
    return 'your-account-id'; // 应该从环境配置中获取
  }
}

// 使用示例
/*
// 在 Worker 中使用
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const fileService = new FileService(env);
    
    const url = new URL(request.url);
    if (url.pathname === '/api/upload/image' && request.method === 'POST') {
      const formData = await request.formData();
      const file = formData.get('file') as File;
      const arrayBuffer = await file.arrayBuffer();
      
      const result = await fileService.uploadImage(
        arrayBuffer, 
        file.name,
        'user123',
        'model-pi-standard'
      );
      
      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response('Not Found', { status: 404 });
  }
};
*/