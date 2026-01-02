# Tesla Model π 文档索引

## 主要文档

### 项目概述
- [项目文档](PROJECT_DOCUMENTATION.md) - 完整项目结构和功能概述
- [快速入门](QUICK_START.md) - 新开发者快速上手指南
- [README](README.md) - 项目基本说明

### 技术文档
- [API 文档](API_DOCUMENTATION.md) - 完整 API 接口说明
- [实施部署指南](IMPLEMENTATION_GUIDE.md) - 部署和配置详细说明
- [Cloudflare Workers 集成](CF_WORKERS.md) - Worker 配置和优化

### 业务功能文档
- [库存分配表](INVENTORY_ALLOCATION.md) - 产品库存和定价策略
- [库存管理系统](INVENTORY_MANAGEMENT.md) - 库存管理策略和流程
- [支付系统规格](PAYMENT_SPEC.md) - 支付系统技术实现
- [销售目标实现方案](KV_IMPLEMENTATION.md) - 销售目标和增长计划

### 存储系统文档
- [KV 数据库方案](KV_SCHEMA.md) - KV 数据库设计和实现
- [KV 优化策略](KV_OPTIMIZATION.md) - KV 使用优化建议
- [文件存储方案](FILE_STORAGE_SOLUTION.md) - 文件存储架构设计
- [R2 集成指南](R2_INTEGRATION.md) - R2 对象存储集成

### 法律合规文档
- [法律文件整合版](LEGAL_DOCUMENTATION.md) - 完整法律文件集合
- [法律系统集成](LEGAL_INTEGRATION.md) - 法律文件系统实现

## 按功能分类

### 前端组件
- [应用主入口](App.tsx)
- [组件目录](components/)

### 后端服务
- [Worker 主入口](src/index.ts)
- [KV API 实现](src/kv-api.ts)
- [库存管理服务](src/inventory/inventory-manager.ts)
- [支付处理服务](src/payment/payment-processor.ts)
- [购物车服务](src/cart/shopping-cart.ts)
- [法律文档服务](src/legal/legal-service.ts)
- [文件存储服务](src/file-storage/file-service.ts)

### 配置文件
- [Cloudflare 配置](wrangler.toml)
- [项目依赖](package.json)
- [TypeScript 配置](tsconfig.json)
- [Worker TypeScript 配置](tsconfig.worker.json)
- [Vite 构建配置](vite.config.ts)

## 开发资源

### 工具配置
- [Qoder 配置](AGENTS.md) - 开发助手配置

### 环境设置
- 环境变量配置 (.env.example - 如存在)
- 本地开发设置
- 生产环境部署

## 维护指南

### 部署流程
1. 检查配置文件
2. 验证环境变量
3. 部署到 Cloudflare
4. 验证部署结果

### 监控和维护
- API 性能监控
- 存储使用情况
- 错误日志分析
- 安全审计

### 更新和升级
- 依赖包更新
- 安全补丁
- 功能增强
- 性能优化

---
*此索引旨在帮助您快速找到所需的文档。如需更多信息，请参阅相应文档或联系项目维护人员。*