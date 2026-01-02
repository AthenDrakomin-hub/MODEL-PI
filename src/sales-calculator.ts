// src/sales-calculator.ts - 销售目标计算工具

export interface SalesPlan {
  startDate: string;
  endDate: string;
  initialInventory: number;
  targetSales: number;
  currentSales: number;
  remainingInventory: number;
  daysRemaining: number;
  dailyTarget: number;
  growthRate: number;
  dailyGoals: DailyGoal[];
  lastUpdated: string;
}

export interface DailyGoal {
  date: string;
  target: number;
  actual: number;
  cumulativeTarget: number;
  cumulativeActual: number;
  remaining: number;
}

export class SalesCalculator {
  /**
   * 计算月底销售计划
   * @param initialInventory 初始库存
   * @param targetSales 目标销量
   * @param startDate 开始日期
   * @param endDate 结束日期
   * @param currentSales 当前销量
   */
  static calculateSalesPlan(
    initialInventory: number,
    targetSales: number,
    startDate: string,
    endDate: string,
    currentSales: number = 0
  ): SalesPlan {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // 计算剩余天数
    const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const now = new Date();
    const daysPassed = Math.max(0, Math.ceil((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
    const daysRemaining = Math.max(0, totalDays - daysPassed);
    
    // 计算剩余需要销售的数量
    const remainingToSell = Math.max(0, targetSales - currentSales);
    
    // 如果时间已过或目标已达成
    if (daysRemaining <= 0 || remainingToSell <= 0) {
      return {
        startDate,
        endDate,
        initialInventory,
        targetSales,
        currentSales,
        remainingInventory: initialInventory - currentSales,
        daysRemaining: 0,
        dailyTarget: 0,
        growthRate: 0,
        dailyGoals: [],
        lastUpdated: new Date().toISOString()
      };
    }
    
    // 计算基础每日目标
    const baseDailyTarget = remainingToSell / daysRemaining;
    
    // 设定增长率（例如每天增长2%）
    const growthRate = 0.02;
    
    // 生成每日目标
    const dailyGoals: DailyGoal[] = [];
    let cumulativeTarget = currentSales;
    let cumulativeActual = currentSales;
    
    for (let i = 1; i <= daysRemaining; i++) {
      const currentDate = new Date(start);
      currentDate.setDate(start.getDate() + daysPassed + i);
      
      // 计算当日目标（考虑增长）
      const dayMultiplier = Math.pow(1 + growthRate, i - 1);
      const dailyTarget = Math.round(baseDailyTarget * dayMultiplier);
      
      cumulativeTarget += dailyTarget;
      
      dailyGoals.push({
        date: currentDate.toISOString().split('T')[0],
        target: dailyTarget,
        actual: 0, // 实际销量需要从数据源获取
        cumulativeTarget: Math.min(cumulativeTarget, targetSales),
        cumulativeActual: cumulativeActual,
        remaining: Math.max(0, targetSales - cumulativeActual)
      });
    }
    
    return {
      startDate,
      endDate,
      initialInventory,
      targetSales,
      currentSales,
      remainingInventory: initialInventory - currentSales,
      daysRemaining,
      dailyTarget: Math.round(baseDailyTarget),
      growthRate,
      dailyGoals,
      lastUpdated: new Date().toISOString()
    };
  }

  /**
   * 获取今日销售目标
   */
  static getTodayGoal(salesPlan: SalesPlan): DailyGoal | null {
    if (salesPlan.dailyGoals.length === 0) {
      return null;
    }
    
    const today = new Date().toISOString().split('T')[0];
    return salesPlan.dailyGoals.find(goal => goal.date === today) || null;
  }

  /**
   * 计算完成百分比
   */
  static getCompletionPercentage(current: number, target: number): number {
    return target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;
  }

  /**
   * 计算销售节奏健康度
   */
  static getHealthStatus(salesPlan: SalesPlan): 'ahead' | 'on-track' | 'behind' | 'critical' {
    if (salesPlan.daysRemaining <= 0) {
      return salesPlan.currentSales >= salesPlan.targetSales ? 'ahead' : 'critical';
    }
    
    const todayGoal = this.getTodayGoal(salesPlan);
    if (!todayGoal) {
      // 如果今天不在计划中，检查累计进度
      const expectedProgress = salesPlan.targetSales * (1 - salesPlan.daysRemaining / (salesPlan.dailyGoals.length + (new Date().getDate() - 1)));
      return salesPlan.currentSales >= expectedProgress ? 'on-track' : 'behind';
    }
    
    const progress = this.getCompletionPercentage(salesPlan.currentSales, salesPlan.targetSales);
    const timeProgress = this.getCompletionPercentage(
      salesPlan.dailyGoals.length - salesPlan.daysRemaining, 
      salesPlan.dailyGoals.length
    );
    
    if (progress >= timeProgress + 10) return 'ahead';
    if (progress >= timeProgress - 5) return 'on-track';
    if (salesPlan.daysRemaining <= 7) return 'critical';
    return 'behind';
  }
}

// 使用示例
/*
const salesPlan = SalesCalculator.calculateSalesPlan(
  50000, // 初始库存5万
  50000, // 目标销量5万（售罄）
  '2026-01-16', // 从今天开始计算
  '2026-01-31', // 月底结束
  12500  // 当前已售1.25万
);

console.log('销售计划:', salesPlan);
console.log('今日目标:', SalesCalculator.getTodayGoal(salesPlan));
console.log('完成百分比:', SalesCalculator.getCompletionPercentage(salesPlan.currentSales, salesPlan.targetSales));
console.log('健康状态:', SalesCalculator.getHealthStatus(salesPlan));
*/