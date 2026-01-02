// src/main-service.ts
// 特斯拉 Model π 主服务集成

import { InventoryManager } from './inventory/inventory-manager';
import { PaymentProcessor } from './payment/payment-processor';
import { ShoppingCart } from './cart/shopping-cart';

export interface TeslaModelPiServiceConfig {
  enableInventoryManagement: boolean;
  enablePaymentProcessing: boolean;
  enableShoppingCart: boolean;
  logLevel?: 'debug' | 'info' | 'warn' | 'error';
}

export class TeslaModelPiService {
  private inventoryManager: InventoryManager;
  private paymentProcessor: PaymentProcessor;
  private shoppingCart: ShoppingCart;
  private config: TeslaModelPiServiceConfig;

  constructor(config?: Partial<TeslaModelPiServiceConfig>) {
    this.config = {
      enableInventoryManagement: true,
      enablePaymentProcessing: true,
      enableShoppingCart: true,
      logLevel: 'info',
      ...config
    };

    // 初始化所有服务组件
    this.inventoryManager = new InventoryManager();
    this.paymentProcessor = new PaymentProcessor();
    
    // 购物车依赖于库存和支付服务
    this.shoppingCart = new ShoppingCart(this.inventoryManager, this.paymentProcessor);
  }

  /**
   * 获取库存管理器
   */
  getInventoryManager(): InventoryManager {
    return this.config.enableInventoryManagement ? this.inventoryManager : null;
  }

  /**
   * 获取支付处理器
   */
  getPaymentProcessor(): PaymentProcessor {
    return this.config.enablePaymentProcessing ? this.paymentProcessor : null;
  }

  /**
   * 获取购物车服务
   */
  getShoppingCart(): ShoppingCart {
    return this.config.enableShoppingCart ? this.shoppingCart : null;
  }

  /**
   * 执行完整的预订流程
   */
  async executeFullBookingFlow(userId: string, items: { variantId: string; quantity: number }[], paymentMethod: 'usdt-erc20' | 'usdt-trc20' | 'paypal') {
    try {
      // 1. 创建购物车
      const cart = this.shoppingCart.createCart(userId);
      
      // 2. 添加商品到购物车
      for (const item of items) {
        const addResult = this.shoppingCart.addItem(cart.id, item.variantId, item.quantity);
        if (!addResult.success) {
          throw new Error(`Failed to add item ${item.variantId}: ${addResult.message}`);
        }
      }

      // 3. 预订商品（锁定库存）
      const reserveResult = this.shoppingCart.reserveCart(cart.id, userId);
      if (!reserveResult.success) {
        throw new Error(`Failed to reserve cart: ${reserveResult.message}`);
      }

      // 4. 检出并支付
      const checkoutResult = await this.shoppingCart.checkout(cart.id, userId, paymentMethod);
      if (!checkoutResult.success) {
        throw new Error(`Failed to checkout: ${checkoutResult.message}`);
      }

      return {
        success: true,
        orderId: checkoutResult.orderId,
        paymentUrl: checkoutResult.paymentUrl,
        reservationIds: checkoutResult.reservationIds,
        message: 'Booking completed successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: `Booking failed: ${(error as Error).message}`
      };
    }
  }

  /**
   * 获取系统状态报告
   */
  getSystemStatus() {
    const inventoryReport = this.inventoryManager.getInventoryReport();
    const paymentMethods = this.paymentProcessor.getSupportedPaymentMethods();
    
    return {
      timestamp: new Date().toISOString(),
      services: {
        inventory: this.config.enableInventoryManagement,
        payment: this.config.enablePaymentProcessing,
        cart: this.config.enableShoppingCart
      },
      inventorySummary: {
        totalProducts: inventoryReport.length,
        totalStock: inventoryReport.reduce((sum, item) => sum + item.total, 0),
        totalAvailable: inventoryReport.reduce((sum, item) => sum + item.available, 0),
        totalSold: inventoryReport.reduce((sum, item) => sum + item.sold, 0)
      },
      paymentSupport: paymentMethods.map(method => method.name),
      health: 'operational'
    };
  }

  /**
   * 定期维护任务
   */
  performMaintenance() {
    // 释放过期的预订
    this.inventoryManager.releaseExpiredReservations();
    
    // 可以添加其他维护任务
    console.log(`[${new Date().toISOString()}] Maintenance completed`);
  }

  /**
   * 系统健康检查
   */
  healthCheck() {
    try {
      // 检查各个组件是否正常工作
      const inventoryReport = this.inventoryManager.getInventoryReport();
      const paymentMethods = this.paymentProcessor.getSupportedPaymentMethods();
      
      return {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        checks: {
          inventoryManager: inventoryReport.length > 0,
          paymentProcessor: paymentMethods.length > 0,
          shoppingCart: true // 购物车服务初始化成功
        }
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: (error as Error).message,
        checks: {
          inventoryManager: false,
          paymentProcessor: false,
          shoppingCart: false
        }
      };
    }
  }
}

// 使用示例
/*
const service = new TeslaModelPiService();

// 执行预订流程
const bookingResult = await service.executeFullBookingFlow(
  'user123',
  [
    { variantId: 'model-pi-standard-pearl-white', quantity: 1 },
    { variantId: 'model-pi-foldable-ai-silver-black', quantity: 1 }
  ],
  'usdt-erc20'
);

console.log(bookingResult);

// 获取系统状态
const status = service.getSystemStatus();
console.log(status);
*/