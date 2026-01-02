// src/kv-api.ts - Cloudflare Worker KV API 实现

interface Env {
  MODEL_PI: KVNamespace;
}

// 预订/订单数据接口
interface OrderData {
  orderId: string;
  pioneerId: string;
  email: string;
  fullName: string;
  orderDate: string;
  orderStatus: 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'paid' | 'pending' | 'failed';
  paymentMethod: 'usdt' | 'paypal' | 'credit_card';
  color: 'cyan' | 'black' | 'red';
  depositAmount: number;
  totalAmount: number;
  deliveryAddress?: {
    street: string;
    city: string;
    country: string;
    zipCode: string;
  };
  notes?: string;
}

// 用户偏好设置接口
interface UserPreference {
  userId: string;
  language: string;
  theme: 'midnight' | 'solar';
  notifications: {
    orderUpdates: boolean;
    marketing: boolean;
    system: boolean;
  };
  displayOptions: {
    fontSize: 'normal' | 'large';
    highContrast: boolean;
    animations: boolean;
  };
  lastUpdated: string;
}

// 先锋申请数据接口
interface ApplicationData {
  applicationId: string;
  pioneerId: string;
  fullName: string;
  email: string;
  location: string;
  expertise: string;
  social?: string;
  vision: string;
  hasTesla: boolean;
  hasStarlink: boolean;
  testModules: string[];
  applicationDate: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewer?: string;
  reviewDate?: string;
  notes?: string;
}

// 动态内容接口
interface ContentData {
  contentId: string;
  type: 'announcement' | 'campaign' | 'maintenance' | 'news';
  title: string;
  message: string;
  language: string | 'all';
  priority: 'low' | 'medium' | 'high' | 'critical';
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// 统计数据接口
interface StatsData {
  statsId: string;
  totalBookings: number;
  totalRevenue: number;
  activeUsers: number;
  conversionRate: number;
  pageViews: number;
  uniqueVisitors: number;
  ordersToday: number;
  revenueToday: number;
  lastUpdated: string;
  targetBookings: number;
  progressPercentage: number;
  remainingBookings: number;
}

// 销售目标接口
interface SalesTargetData {
  targetId: string;
  startDate: string;
  endDate: string;
  initialInventory: number;
  targetSales: number;
  currentSales: number;
  remainingInventory: number;
  daysRemaining: number;
  dailyTarget: number;
  growthRate: number;
  dailyGoals: Record<string, { target: number; actual: number }>;
  lastUpdated: string;
}

// 播报消息接口
interface BroadcastData {
  broadcastId: string;
  type: 'purchase' | 'milestone' | 'announcement';
  message: string;
  timestamp: string;
  priority: 'normal' | 'high' | 'flash';
  location?: string;
  userId?: string;
  purchaseAmount?: number;
  showUntil: string;
}

// API 实现类
export class KVAPI {
  private env: Env;

  constructor(env: Env) {
    this.env = env;
  }

  // 预订数据操作
  async getOrder(pioneerId: string): Promise<OrderData | null> {
    const data = await this.env.MODEL_PI.get(`order:${pioneerId}`, 'json');
    return data as OrderData || null;
  }

  async saveOrder(order: OrderData): Promise<void> {
    await this.env.MODEL_PI.put(`order:${order.pioneerId}`, JSON.stringify(order), {
      expirationTtl: 60 * 60 * 24 * 30 // 30天过期
    });
  }

  // 用户偏好设置操作
  async getUserPreference(userId: string): Promise<UserPreference | null> {
    const data = await this.env.MODEL_PI.get(`user:pref:${userId}`, 'json');
    return data as UserPreference || null;
  }

  async saveUserPreference(pref: UserPreference): Promise<void> {
    await this.env.MODEL_PI.put(`user:pref:${pref.userId}`, JSON.stringify(pref), {
      expirationTtl: 60 * 60 * 24 * 90 // 90天过期
    });
  }

  // 先锋申请操作
  async getApplication(applicationId: string): Promise<ApplicationData | null> {
    const data = await this.env.MODEL_PI.get(`application:${applicationId}`, 'json');
    return data as ApplicationData || null;
  }

  async saveApplication(app: ApplicationData): Promise<void> {
    await this.env.MODEL_PI.put(`application:${app.applicationId}`, JSON.stringify(app), {
      expirationTtl: 60 * 60 * 24 * 180 // 180天过期
    });
  }

  // 动态内容操作
  async getContent(contentId: string): Promise<ContentData | null> {
    const data = await this.env.MODEL_PI.get(`content:${contentId}`, 'json');
    return data as ContentData || null;
  }

  async saveContent(content: ContentData): Promise<void> {
    await this.env.MODEL_PI.put(`content:${content.contentId}`, JSON.stringify(content), {
      expirationTtl: 60 * 60 * 24 // 1天过期
    });
  }

  // 统计数据操作
  async getStats(): Promise<StatsData | null> {
    const data = await this.env.MODEL_PI.get('stats:global', 'json');
    return data as StatsData || null;
  }

  async updateStats(stats: StatsData): Promise<void> {
    await this.env.MODEL_PI.put('stats:global', JSON.stringify(stats));
  }

  // 播报消息操作
  async getRecentBroadcasts(): Promise<BroadcastData[]> {
    const data = await this.env.MODEL_PI.get('broadcast:recent_purchases', 'json');
    return (data as BroadcastData[]) || [];
  }

  async addBroadcast(broadcast: BroadcastData): Promise<void> {
    let broadcasts = await this.getRecentBroadcasts();
    broadcasts.unshift(broadcast);
    broadcasts = broadcasts.slice(0, 20); // 保留最新20条
    await this.env.MODEL_PI.put('broadcast:recent_purchases', JSON.stringify(broadcasts), {
      expirationTtl: 60 * 10 // 10分钟过期
    });
  }
}