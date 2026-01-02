// src/inventory/inventory-manager.ts
// 特斯拉 Model π 库存管理系统

export interface ProductVariant {
  id: string;
  modelName: 'standard' | 'foldable-ai';
  color: string;
  fullPrice: number;
  depositAmount: number;
  quantity: number;
  reserved: number;
  available: number;
}

export interface InventoryItem {
  variantId: string;
  totalStock: number;
  availableStock: number;
  reservedStock: number;
  soldStock: number;
}

export interface OrderItem {
  variantId: string;
  quantity: number;
  price: number;
  depositPaid: boolean;
}

export interface Reservation {
  reservationId: string;
  variantId: string;
  quantity: number;
  userId: string;
  expiresAt: Date;
  confirmed: boolean;
}

export class InventoryManager {
  private inventory: Map<string, InventoryItem> = new Map();
  private reservations: Map<string, Reservation> = new Map();
  
  constructor() {
    this.initializeInventory();
  }

  /**
   * 初始化库存数据
   */
  private initializeInventory(): void {
    // Model π 标准版库存
    this.inventory.set('model-pi-standard-pearl-white', {
      variantId: 'model-pi-standard-pearl-white',
      totalStock: 40000,
      availableStock: 40000,
      reservedStock: 0,
      soldStock: 0
    });

    this.inventory.set('model-pi-standard-star-purple', {
      variantId: 'model-pi-standard-star-purple',
      totalStock: 11000,
      availableStock: 11000,
      reservedStock: 0,
      soldStock: 0
    });

    this.inventory.set('model-pi-standard-flame-orange', {
      variantId: 'model-pi-standard-flame-orange',
      totalStock: 11000,
      availableStock: 11000,
      reservedStock: 0,
      soldStock: 0
    });

    this.inventory.set('model-pi-standard-deep-sea-blue', {
      variantId: 'model-pi-standard-deep-sea-blue',
      totalStock: 11000,
      availableStock: 11000,
      reservedStock: 0,
      soldStock: 0
    });

    this.inventory.set('model-pi-standard-flame-red', {
      variantId: 'model-pi-standard-flame-red',
      totalStock: 11000,
      availableStock: 11000,
      reservedStock: 0,
      soldStock: 0
    });

    this.inventory.set('model-pi-standard-forest-green', {
      variantId: 'model-pi-standard-forest-green',
      totalStock: 4000,
      availableStock: 4000,
      reservedStock: 0,
      soldStock: 0
    });

    // Model π 折叠限量 AI 版库存
    this.inventory.set('model-pi-foldable-ai-silver-black', {
      variantId: 'model-pi-foldable-ai-silver-black',
      totalStock: 12000,
      availableStock: 12000,
      reservedStock: 0,
      soldStock: 0
    });
  }

  /**
   * 检查特定变体的可用库存
   */
  checkAvailability(variantId: string, quantity: number): boolean {
    const item = this.inventory.get(variantId);
    if (!item) {
      return false;
    }
    return item.availableStock >= quantity;
  }

  /**
   * 预留库存
   */
  reserveStock(variantId: string, quantity: number, userId: string): { success: boolean; reservationId?: string; message?: string } {
    const item = this.inventory.get(variantId);
    if (!item) {
      return { success: false, message: 'Product variant not found' };
    }

    if (item.availableStock < quantity) {
      return { success: false, message: `Insufficient stock. Available: ${item.availableStock}, Requested: ${quantity}` };
    }

    // 更新库存状态
    item.availableStock -= quantity;
    item.reservedStock += quantity;
    this.inventory.set(variantId, item);

    // 创建预订记录
    const reservationId = `RES-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const reservation: Reservation = {
      reservationId,
      variantId,
      quantity,
      userId,
      expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48小时后过期
      confirmed: false
    };

    this.reservations.set(reservationId, reservation);

    return { success: true, reservationId };
  }

  /**
   * 确认预订（支付定金后）
   */
  confirmReservation(reservationId: string): { success: boolean; message?: string } {
    const reservation = this.reservations.get(reservationId);
    if (!reservation) {
      return { success: false, message: 'Reservation not found' };
    }

    if (reservation.expiresAt < new Date()) {
      return { success: false, message: 'Reservation has expired' };
    }

    // 更新预订状态
    reservation.confirmed = true;
    this.reservations.set(reservationId, reservation);

    // 更新库存（从预留转为已售）
    const item = this.inventory.get(reservation.variantId);
    if (item) {
      item.reservedStock -= reservation.quantity;
      item.soldStock += reservation.quantity;
      this.inventory.set(reservation.variantId, item);
    }

    return { success: true };
  }

  /**
   * 释放过期预订
   */
  releaseExpiredReservations(): void {
    const now = new Date();
    const expiredReservations = Array.from(this.reservations.entries())
      .filter(([_, reservation]) => reservation.expiresAt < now && !reservation.confirmed);

    for (const [reservationId, reservation] of expiredReservations) {
      // 释放库存
      const item = this.inventory.get(reservation.variantId);
      if (item) {
        item.reservedStock -= reservation.quantity;
        item.availableStock += reservation.quantity;
        this.inventory.set(reservation.variantId, item);
      }

      // 删除预订记录
      this.reservations.delete(reservationId);
    }
  }

  /**
   * 获取库存状态报告
   */
  getInventoryReport(): { variantId: string; total: number; available: number; reserved: number; sold: number; percentageSold: number }[] {
    return Array.from(this.inventory.entries()).map(([variantId, item]) => ({
      variantId,
      total: item.totalStock,
      available: item.availableStock,
      reserved: item.reservedStock,
      sold: item.soldStock,
      percentageSold: Math.round((item.soldStock / item.totalStock) * 100)
    }));
  }

  /**
   * 获取特定变体的详细信息
   */
  getProductVariant(variantId: string): ProductVariant | null {
    const item = this.inventory.get(variantId);
    if (!item) {
      return null;
    }

    // 根据变体ID确定价格和型号
    let modelName: 'standard' | 'foldable-ai' = 'standard';
    let color = '';
    let fullPrice = 299.00;
    let depositAmount = 89.70;

    if (variantId.includes('foldable-ai')) {
      modelName = 'foldable-ai';
      fullPrice = 1299.00;
      depositAmount = 389.70;
    }

    // 解析颜色
    if (variantId.includes('pearl-white')) color = '珍珠白';
    else if (variantId.includes('star-purple')) color = '星耀紫';
    else if (variantId.includes('flame-orange')) color = '赤焰橙';
    else if (variantId.includes('deep-sea-blue')) color = '深海青';
    else if (variantId.includes('flame-red')) color = '烈焰红';
    else if (variantId.includes('forest-green')) color = '森林绿';
    else if (variantId.includes('silver-black')) color = '黑银配色';

    return {
      id: variantId,
      modelName,
      color,
      fullPrice,
      depositAmount,
      quantity: item.totalStock,
      reserved: item.reservedStock,
      available: item.availableStock
    };
  }
}