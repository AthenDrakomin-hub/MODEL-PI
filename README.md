
# 🚀 Tesla Model Pi - 全栈电商应用

这个项目是一个融合了 Model-pi 前端优势和 Tesla-PiStore 后端功能的完整电商应用。项目包含：
- 先进的 3D UI 界面和动态交互 (来自 Model-Pi)
- 完整的电商系统和数据库持久化 (来自 Tesla-PiStore)

---

## 🛠️ 第一步：你需要准备什么？

1.  **代码仓库**：把这些代码传到你的 GitHub。
2.  **数据库**：准备一个 PostgreSQL 数据库 URL (如 PlanetScale, Supabase, 或其他提供商)。
3.  **Vercel 账号**：用于部署前端部分。
4.  **后端托管**：由于项目包含 Express.js 后端，建议使用 Railway、Render 或其他支持 Node.js 后端的平台。

---

## 🔑 第二步：环境变量

在部署时，必须设置以下环境变量：

| 名字 | 是否必须 | 干嘛用的 |
| :--- | :--- | :--- |
| `DATABASE_URL` | **是** | PostgreSQL 数据库连接字符串。 |
| `VITE_USDT_ADDR` | **是** | 你的收钱地址（USDT TRC-20），会显示在支付弹窗里。 |
| `VITE_PAYPAL_URL` | 否 | 你的 PayPal 链接，不填的话支付页面会少个选项。 |

---

## 📦 第三步：部署方案

### 方案一：分离部署（推荐）
1. **前端部分**：部署到 Vercel
   - 关联 GitHub 仓库
   - 设置环境变量 (VITE_USDT_ADDR, VITE_PAYPAL_URL)
   - 构建命令：`npm install && npm run build:client`
   - 输出目录：`dist`

2. **后端部分**：部署到 Railway/Render
   - 关联 GitHub 仓库
   - 设置环境变量 (DATABASE_URL)
   - 启动命令：`npm run start`

### 方案二：一体化部署
- 部署到支持 Node.js 后端的平台（如 Railway、Render、DigitalOcean App Platform）
- 设置所有环境变量
- 启动命令：`npm run start`

---

## 🔧 第四步：本地调试（如果你想改代码）

如果你想在自己电脑上先试试：

```bash
# 1. 装插件
npm install

# 2. 建立一个 .env 文件
# 在里面写上所有必要的环境变量

# 3. 启动开发服务器（前后端同时）
npm run dev

# 或分别启动
npm run dev:client  # 前端
npm run dev:server  # 后端
```

---

## ⚠️ 部署注意事项

-   **全栈应用**：由于项目包含 Express.js 后端，不能完全在 Vercel 静态托管上运行
-   **数据库迁移**：部署后需要运行 `npm run db:push` 进行数据库初始化
-   **API 端点**：确保前端正确连接到后端 API 端点
-   **环境变量**：确保所有必需的环境变量在部署环境中都已设置

---

*祝你的 Model Pi 电商应用成功上线！*