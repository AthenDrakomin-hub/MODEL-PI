// src/file-storage/worker-integration.ts
// Tesla Model Pi 文件存储 Worker 集成示例

import { FileService } from './file-service';
import { InventoryManager } from '../inventory/inventory-manager';
import { PaymentProcessor } from '../payment/payment-processor';
import { ShoppingCart } from '../cart/shopping-cart';

interface Env {
  MODEL_PI: KVNamespace;
  MODEL_PI_ASSETS: R2Bucket;
}

// 扩展 FileService 以集成其他服务
export class IntegratedFileService extends FileService {
  private inventoryManager: InventoryManager;
  private paymentProcessor: PaymentProcessor;
  private shoppingCart: ShoppingCart;

  constructor(env: Env) {
    super(env);
    // 初始化其他服务（在实际应用中可能需要共享实例）
    this.inventoryManager = new InventoryManager();
    this.paymentProcessor = new PaymentProcessor();
    this.shoppingCart = new ShoppingCart(this.inventoryManager, this.paymentProcessor);
  }

  /**
   * 上传车型图片并更新库存记录
   */
  async uploadModelImage(
    file: ArrayBuffer,
    fileName: string,
    modelVariantId: string,
    tags: string[] = []
  ): Promise<import('./file-service').UploadResult> {
    // 首先验证模型变体是否存在
    const productVariant = this.inventoryManager.getProductVariant(modelVariantId);
    if (!productVariant) {
      return {
        success: false,
        message: `Model variant ${modelVariantId} not found in inventory`
      };
    }

    // 上传图片
    const uploadResult = await this.uploadImage(
      file,
      fileName,
      undefined,
      modelVariantId,
      [...tags, 'model-image', productVariant.modelName]
    );

    if (uploadResult.success && uploadResult.fileId) {
      // 可选：更新产品记录以包含图片信息
      // 这里可以将图片 URL 与产品变体关联
      const productImagesKey = `product:images:${modelVariantId}`;
      let existingImages = await this.kv.get(productImagesKey, 'json') as string[] || [];
      existingImages.push(uploadResult.fileId);
      
      // 限制每种产品最多 10 张图片
      if (existingImages.length > 10) {
        existingImages = existingImages.slice(-10);
      }
      
      await this.kv.put(productImagesKey, JSON.stringify(existingImages), {
        expirationTtl: 60 * 60 * 24 * 90 // 90天过期
      });
    }

    return uploadResult;
  }

  /**
   * 获取产品相关图片
   */
  async getModelImages(modelVariantId: string): Promise<string[]> {
    const productImagesKey = `product:images:${modelVariantId}`;
    const imageIds = await this.kv.get(productImagesKey, 'json') as string[] || [];
    
    const urls: string[] = [];
    for (const imageId of imageIds) {
      const url = await this.getPublicUrl(imageId);
      if (url) {
        urls.push(url);
      }
    }
    
    return urls;
  }

  /**
   * 上传产品演示视频
   */
  async uploadProductVideo(
    file: ArrayBuffer,
    fileName: string,
    modelVariantId: string
  ): Promise<import('./file-service').UploadResult> {
    // 验证模型变体
    const productVariant = this.inventoryManager.getProductVariant(modelVariantId);
    if (!productVariant) {
      return {
        success: false,
        message: `Model variant ${modelVariantId} not found in inventory`
      };
    }

    return await this.uploadVideo(
      file,
      fileName,
      undefined,
      [`model-${modelVariantId}`, 'demonstration-video']
    );
  }
}

// Worker 入口点
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const integratedFileService = new IntegratedFileService(env);
    const url = new URL(request.url);
    const path = url.pathname;

    try {
      // 图片上传端点
      if (path === '/api/upload/model-image' && request.method === 'POST') {
        const formData = await request.formData();
        const file = formData.get('file') as Blob;
        const modelVariantId = formData.get('modelVariantId') as string;
        const tags = formData.get('tags') as string;

        if (!file || !modelVariantId) {
          return new Response(JSON.stringify({
            success: false,
            message: 'File and modelVariantId are required'
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        const arrayBuffer = await file.arrayBuffer();
        const result = await integratedFileService.uploadModelImage(
          arrayBuffer,
          file.name,
          modelVariantId,
          tags ? tags.split(',').map(tag => tag.trim()) : []
        );

        return new Response(JSON.stringify(result), {
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // 获取产品图片端点
      if (path.startsWith('/api/model-images/') && request.method === 'GET') {
        const modelVariantId = path.split('/').pop();
        if (!modelVariantId) {
          return new Response(JSON.stringify({
            success: false,
            message: 'Model variant ID is required'
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        const imageUrls = await integratedFileService.getModelImages(modelVariantId);

        return new Response(JSON.stringify({
          success: true,
          modelVariantId,
          imageCount: imageUrls.length,
          imageUrls
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // 视频上传端点
      if (path === '/api/upload/product-video' && request.method === 'POST') {
        const formData = await request.formData();
        const file = formData.get('file') as Blob;
        const modelVariantId = formData.get('modelVariantId') as string;

        if (!file || !modelVariantId) {
          return new Response(JSON.stringify({
            success: false,
            message: 'File and modelVariantId are required'
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        const arrayBuffer = await file.arrayBuffer();
        const result = await integratedFileService.uploadProductVideo(
          arrayBuffer,
          file.name,
          modelVariantId
        );

        return new Response(JSON.stringify(result), {
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // 文件访问端点（如果需要额外的处理）
      if (path.startsWith('/api/file/') && request.method === 'GET') {
        const fileId = path.split('/')[3]; // /api/file/{fileId}
        if (!fileId) {
          return new Response(JSON.stringify({
            success: false,
            message: 'File ID is required'
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        const fileData = await integratedFileService.getFile(fileId);
        if (!fileData) {
          return new Response(JSON.stringify({
            success: false,
            message: 'File not found'
          }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        // 返回文件元数据（不返回文件内容，实际文件通过 R2 URL 直接访问）
        return new Response(JSON.stringify({
          success: true,
          metadata: fileData.metadata
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // 健康检查
      if (path === '/health' && request.method === 'GET') {
        return new Response(JSON.stringify({
          status: 'healthy',
          service: 'file-storage',
          timestamp: new Date().toISOString(),
          features: {
            r2Access: true,
            kvAccess: true,
            imageUpload: true,
            videoUpload: true
          }
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // 返回 404 对于未处理的路径
      return new Response('Not Found', { status: 404 });
    } catch (error) {
      console.error('Worker error:', error);
      return new Response(JSON.stringify({
        success: false,
        message: `Server error: ${(error as Error).message}`
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  },
};

// 使用示例
/*
// 上传车型图片
fetch('/api/upload/model-image', {
  method: 'POST',
  body: formData
});

// 获取产品图片
fetch('/api/model-images/model-pi-standard-pearl-white')
  .then(response => response.json())
  .then(data => console.log(data.imageUrls));
*/