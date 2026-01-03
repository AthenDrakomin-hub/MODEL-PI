# 🚀 Tesla Model π - 全栈电商应用

一个现代化的全栈电商应用，专为 Vercel 平台优化。项目结合了前沿的 UI/UX 设计与完整的电商功能，支持产品展示、购物车管理和订单处理。采用 Serverless 架构，提供高性能和可扩展的用户体验。

## ✨ 核心特性

- **现代化前端**：基于 React 19 + Vite 的高性能前端
- **Serverless 架构**：Vercel Serverless Functions 后端 API
- **数据库集成**：PostgreSQL 数据库与 Drizzle ORM
- **Vercel 优化**：一键部署，全球 CDN 加速
- **响应式设计**：适配各种设备尺寸
- **国际化支持**：多语言界面

## 🛠 技术栈

- **前端**：React 19, TypeScript, Vite, Tailwind CSS
- **后端**：Vercel Serverless Functions
- **数据库**：PostgreSQL, Drizzle ORM
- **部署**：Vercel
- **UI组件**：shadcn/ui, Framer Motion

## 📋 环境变量

部署前需要配置以下环境变量：

| 变量名 | 是否必需 | 说明 |
|--------|----------|------|
| `DATABASE_URL` | 是 | PostgreSQL 数据库连接字符串 |
| `VITE_USDT_ADDR` | 是 | USDT 收款地址，用于支付功能 |
| `VITE_PAYPAL_URL` | 否 | PayPal 支付链接（可选）|

## 🚀 部署到 Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/tesla-model-pi)

### 一键部署

1. 点击上方 "Deploy with Vercel" 按钮
2. 连接你的 GitHub 仓库
3. 添加必要的环境变量
4. 点击 "Deploy"

### 手动部署

1. **克隆仓库**
   ```bash
   git clone https://github.com/your-username/tesla-model-pi.git
   cd tesla-model-pi
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **本地开发**
   ```bash
   npm run dev
   ```

4. **部署到 Vercel**
   - 访问 [Vercel Dashboard](https://vercel.com/dashboard)
   - 创建新项目并连接 GitHub 仓库
   - 设置环境变量
   - 构建命令：`npm run vercel-build`
   - 输出目录：`dist`

### 部署后初始化

首次部署完成后，访问 `https://your-domain.vercel.app/api/init` 初始化数据库。

## 📁 项目结构

```
tesla-model-pi/
├── api/                 # Vercel Serverless Functions
│   ├── products/        # 产品相关 API
│   ├── cart/           # 购物车相关 API
│   └── utils/          # 工具函数
├── components/         # React 组件
├── shared/             # 共享类型和 API 定义
├── src/                # 前端源代码
│   ├── hooks/          # 自定义 hooks
│   └── services/       # 业务逻辑
├── public/             # 静态资源
├── package.json
└── vercel.json        # Vercel 配置
```

## 🔧 本地开发

1. **安装依赖**
   ```bash
   npm install
   ```

2. **启动开发服务器**
   ```bash
   npm run dev
   ```

3. **构建生产版本**
   ```bash
   npm run build
   ```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来帮助改进这个项目！

## 📄 许可证

此项目采用 MIT 许可证。

## 🙏 鸣谢

感谢所有为这个项目做出贡献的开发者。这个项目展示了现代 Web 开发技术栈的强大功能，结合了 Vercel 的 Serverless 架构和现代化的前端技术。