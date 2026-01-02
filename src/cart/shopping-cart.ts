// src/cart/shopping-cart.ts
// 特斯拉 Model π 预订购物车系统

import { InventoryManager, OrderItem, ProductVariant } from '../inventory/inventory-manager';
import { PaymentProcessor } from '../payment/payment-processor';

export interface CartItem {
  id: string;
  variantId: string;
  quantity: number;
  price: number;
  depositAmount: number;
  modelName: string;
  color: string;
  reserved: boolean;
  reservationId?: string;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  totalDeposit: number;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'reserved' | 'paid' | 'cancelled';
}

export interface CheckoutResult {
  success: boolean;
  orderId?: string;
  paymentUrl?: string;
  reservationIds?: string[];
  message?: string;
}

export class ShoppingCart {
  private carts: Map<string, Cart> = new Map();
  private inventoryManager: InventoryManager;
  private paymentProcessor: PaymentProcessor;

  constructor(inventoryManager: InventoryManager, paymentProcessor: PaymentProcessor) {
    this.inventoryManager = inventoryManager;
    this.paymentProcessor = paymentProcessor;
  }

  /**
   * 创建新的购物车
   */
  createCart(userId: string): Cart {
    const cartId = `CART-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newCart: Cart = {
      id: cartId,
      userId,
      items: [],
      subtotal: 0,
      totalDeposit: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'active'
    };

    this.carts.set(cartId, newCart);
    return newCart;
  }

  /**
   * 获取购物车
   */
  getCart(cartId: string): Cart | null {
    return this.carts.get(cartId) || null;
  }

  /**
   * 添加商品到购物车
   */
  addItem(cartId: string, variantId: string, quantity: number): { success: boolean; message?: string } {
    const cart = this.carts.get(cartId);
    if (!cart) {
      return { success: false, message: 'Cart not found' };
    }

    if (cart.status !== 'active') {
      return { success: false, message: 'Cart is not active' };
    }

    // 获取产品变体信息
    const productVariant = this.inventoryManager.getProductVariant(variantId);
    if (!productVariant) {
      return { success: false, message: 'Product variant not found' };
    }

    // 检查库存
    if (!this.inventoryManager.checkAvailability(variantId, quantity)) {
      return { success: false, message: 'Insufficient inventory' };
    }

    // 检查购物车中是否已存在此商品
    const existingItemIndex = cart.items.findIndex(item => item.variantId === variantId);
    if (existingItemIndex !== -1) {
      const existingItem = cart.items[existingItemIndex];
      const newQuantity = existingItem.quantity + quantity;
      
      // 再次检查库存
      if (!this.inventoryManager.checkAvailability(variantId, newQuantity)) {
        return { success: false, message: 'Insufficient inventory for requested quantity' };
      }
      
      cart.items[existingItemIndex] = {
        ...existingItem,
        quantity: newQuantity
      };
    } else {
      const newItem: CartItem = {
        id: `ITEM-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        variantId,
        quantity,
        price: productVariant.fullPrice,
        depositAmount: productVariant.depositAmount,
        modelName: productVariant.modelName === 'standard' ? 'Model π 标准版' : 'Model π 折叠限量 AI 版',
        color: productVariant.color,
        reserved: false
      };
      cart.items.push(newItem);
    }

    // 更新购物车总计
    this.updateCartTotals(cart);

    return { success: true };
  }

  /**
   * 移除购物车中的商品
   */
  removeItem(cartId: string, itemId: string): { success: boolean; message?: string } {
    const cart = this.carts.get(cartId);
    if (!cart) {
      return { success: false, message: 'Cart not found' };
    }

    const itemIndex = cart.items.findIndex(item => item.id === itemId);
    if (itemIndex === -1) {
      return { success: false, message: 'Item not found in cart' };
    }

    // 如果商品已被预订，需要先释放库存
    const item = cart.items[itemIndex];
    if (item.reserved && item.reservationId) {
      // 这里需要实现释放预订库存的逻辑
      // 暂时返回错误，因为不能移除已预订的商品
      return { success: false, message: 'Cannot remove reserved item' };
    }

    cart.items.splice(itemIndex, 1);
    this.updateCartTotals(cart);

    return { success: true };
  }

  /**
   * 更新购物车中商品的数量
   */
  updateItemQuantity(cartId: string, itemId: string, quantity: number): { success: boolean; message?: string } {
    const cart = this.carts.get(cartId);
    if (!cart) {
      return { success: false, message: 'Cart not found' };
    }

    const itemIndex = cart.items.findIndex(item => item.id === itemId);
    if (itemIndex === -1) {
      return { success: false, message: 'Item not found in cart' };
    }

    const item = cart.items[itemIndex];
    if (item.reserved) {
      return { success: false, message: 'Cannot update quantity of reserved item' };
    }

    if (quantity <= 0) {
      return this.removeItem(cartId, itemId);
    }

    // 检查库存
    if (!this.inventoryManager.checkAvailability(item.variantId, quantity)) {
      return { success: false, message: 'Insufficient inventory for requested quantity' };
    }

    cart.items[itemIndex].quantity = quantity;
    this.updateCartTotals(cart);

    return { success: true };
  }

  /**
   * 更新购物车总计
   */
  private updateCartTotals(cart: Cart): void {
    cart.subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cart.totalDeposit = cart.items.reduce((sum, item) => sum + (item.depositAmount * item.quantity), 0);
    cart.updatedAt = new Date();
  }

  /**
   * 预订购物车中的商品（锁定库存）
   */
  reserveCart(cartId: string, userId: string): { success: boolean; reservationIds?: string[]; message?: string } {
    const cart = this.carts.get(cartId);
    if (!cart) {
      return { success: false, message: 'Cart not found' };
    }

    if (cart.status !== 'active') {
      return { success: false, message: 'Cart is not in active state' };
    }

    const reservationIds: string[] = [];
    const failedItems: string[] = [];

    // 为购物车中的每个项目创建预订
    for (const item of cart.items) {
      const result = this.inventoryManager.reserveStock(item.variantId, item.quantity, userId);
      if (result.success && result.reservationId) {
        // 更新购物车项目状态
        const cartItemIndex = cart.items.findIndex(i => i.id === item.id);
        if (cartItemIndex !== -1) {
          cart.items[cartItemIndex].reserved = true;
          cart.items[cartItemIndex].reservationId = result.reservationId;
        }
        reservationIds.push(result.reservationId);
      } else {
        failedItems.push(`${item.modelName} ${item.color}`);
      }
    }

    if (failedItems.length > 0) {
      // 如果有预订失败，回滚已成功的预订
      for (const reservationId of reservationIds) {
        // 这里需要实现取消预订的逻辑
        // 暂时只记录失败项目
      }
      return { 
        success: false, 
        message: `Failed to reserve: ${failedItems.join(', ')}` 
      };
    }

    // 更新购物车状态
    cart.status = 'reserved';
    cart.updatedAt = new Date();

    return { success: true, reservationIds };
  }

  /**
   * 检出购物车（创建订单并生成支付）
   */
  async checkout(cartId: string, userId: string, paymentMethod: 'usdt-erc20' | 'usdt-trc20' | 'paypal'): Promise<CheckoutResult> {
    const cart = this.carts.get(cartId);
    if (!cart) {
      return { success: false, message: 'Cart not found' };
    }

    if (cart.status !== 'reserved') {
      // 如果尚未预订，先进行预订
      const reserveResult = this.reserveCart(cartId, userId);
      if (!reserveResult.success) {
        return { success: false, message: reserveResult.message };
      }
    }

    // 创建支付请求
    const paymentRequest = {
      orderId: `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId,
      amount: cart.totalDeposit,
      currency: 'USD' as const,
      paymentMethod,
      returnUrl: process.env.PAYMENT_RETURN_URL || 'https://model-pi.com/payment/success',
      webhookUrl: process.env.PAYMENT_WEBHOOK_URL || 'https://model-pi.com/payment/webhook'
    };

    const paymentResult = await this.paymentProcessor.createPayment(paymentRequest);
    
    if (paymentResult.success && paymentResult.paymentId) {
      // 更新购物车状态为已支付
      cart.status = 'paid';
      cart.updatedAt = new Date();

      return {
        success: true,
        orderId: paymentRequest.orderId,
        paymentUrl: paymentResult.redirectUrl,
        reservationIds: cart.items.map(item => item.reservationId).filter(id => id !== undefined) as string[],
        message: 'Checkout successful'
      };
    } else {
      return {
        success: false,
        message: paymentResult.message || 'Payment creation failed'
      };
    }
  }

  /**
   * 获取购物车摘要
   */
  getCartSummary(cartId: string): { totalItems: number; subtotal: number; totalDeposit: number; itemCount: number } | null {
    const cart = this.carts.get(cartId);
    if (!cart) {
      return null;
    }

    return {
      totalItems: cart.items.length,
      itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: cart.subtotal,
      totalDeposit: cart.totalDeposit
    };
  }

  /**
   * 清空购物车
   */
  clearCart(cartId: string): { success: boolean; message?: string } {
    const cart = this.carts.get(cartId);
    if (!cart) {
      return { success: false, message: 'Cart not found' };
    }

    if (cart.status !== 'active') {
      return { success: false, message: 'Cannot clear non-active cart' };
    }

    cart.items = [];
    cart.subtotal = 0;
    cart.totalDeposit = 0;
    cart.updatedAt = new Date();

    return { success: true };
  }

  /**
   * 获取用户的所有购物车
   */
  getUserCarts(userId: string): Cart[] {
    return Array.from(this.carts.values()).filter(cart => cart.userId === userId);
  }
}