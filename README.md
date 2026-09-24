<div align="center">

# ⚡ VibeGuide

**AI 驱动的开发文档生成平台**

把项目想法变成专业文档，只需三步

[![Next.js](https://img.shields.io/badge/Next.js_16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com)
[![DeepSeek](https://img.shields.io/badge/DeepSeek_AI-4D6BFE?style=flat-square)](https://www.deepseek.com)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)

</div>

---

## 什么是 VibeGuide？

VibeGuide 帮助**编程新手和独立开发者**在动手写代码之前，通过 AI 快速生成一套完整的项目开发文档。

很多人有好的项目想法，却不知道如何把它梳理成可执行的技术方案。VibeGuide 通过三步对话，让 AI 深度理解你的需求，一键生成专业级别的文档，让你的想法真正落地。

## 核心功能

### 三步生成全套文档

| 步骤 | 说明 |
|------|------|
| **① 描述项目** | 用自然语言描述你的项目想法（至少 20 字） |
| **② 回答问题** | AI 提出 3-5 个针对性问题，深挖关键细节 |
| **③ 获取文档** | 一键并行生成 5 类专业文档 |

### 生成的 5 类文档

- 🗺️ **用户旅程地图** — 用户角色、使用场景、关键触点、痛点与机会点
- 📋 **产品需求 PRD** — 功能列表、验收标准、非功能性需求
- 🎨 **前端设计文档** — 技术选型、页面结构、组件设计、路由规划
- ⚙️ **后端设计文档** — API 接口设计、系统架构、认证方案
- 🗄️ **数据库设计** — 表结构、ER 图描述、索引设计

### 其他特性

- Markdown 原文 / HTML 预览双模式
- 单文档下载 `.md` + 一键打包 `.zip`
- 项目保存与历史回顾
- 新用户注册赠送 1 点数免费体验
- 支付宝付款，点数永久有效

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | Next.js 16 (App Router + Turbopack) |
| 认证 & 数据库 | Supabase (Auth + PostgreSQL) |
| ORM | Drizzle ORM |
| AI | DeepSeek API (`deepseek-chat`) |
| 支付 | ZPay（支付宝） |
| UI | shadcn/ui + Tailwind CSS |
| 语言 | TypeScript |

## 本地开发

### 前置条件

- Node.js 18+
- pnpm（或 npm / yarn）
- [Supabase](https://supabase.com) 项目（免费）
- [DeepSeek](https://platform.deepseek.com) API Key

### 快速开始

**1. 克隆仓库**

```bash
git clone https://github.com/hippooos/with-supabase-app.git
cd with-supabase-app
```

**2. 安装依赖**

```bash
npm install
```

**3. 配置环境变量**

复制示例文件并填入你的配置：

```bash
cp .env.example .env.local
```

编辑 `.env.local`：

```env
# Supabase（在 Supabase 控制台 Settings > API 获取）
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key

# 数据库连接
DATABASE_URL=postgresql://...
DIRECT_DATABASE_URL=postgresql://...

# DeepSeek AI（在 platform.deepseek.com 获取）
DEEPSEEK_API_KEY=sk-...

# ZPay 支付（可选，用于生产环境）
ZPAY_API_KEY=your-api-key
ZPAY_SECRET_KEY=your-secret-key

# 站点地址
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**4. 推送数据库结构**

```bash
npx drizzle-kit push
```

**5. 创建新用户赠送点数触发器**

在 Supabase SQL Editor 执行：

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_credits (user_id, credits)
  VALUES (NEW.id, 1)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

**6. 启动开发服务器**
🌐 [点击访问 VibeGuide 在线网站](https://vvibeguide.netlify.app/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/08494373-d8f8-4c62-8a61-a666d8d1cec8/deploy-status)](https://vvibeguide.netlify.app/)

## 数据库结构

```
user_credits        — 用户点数（userId, credits）
payment_records     — 支付记录（userId, outTradeNo, amount, status...）
projects            — 项目数据（userId, title, description, questions, documents, status）
```

## 路由结构

```
/                   落地页
/pricing            定价页
/auth/*             登录 / 注册 / 找回密码
/projects           我的项目（需登录）
/projects/new       新建项目（需登录）
/projects/:id       项目详情（需登录）
/my                 账号与点数（需登录）
```

## 定价

| 套餐 | 价格 | 点数 |
|------|------|------|
| 免费体验 | 注册即送 | 1 点 |
| 基础包 | ¥20 | 10 点 |
| 标准包 | ¥40 | 30 点 |

每 1 点数可生成一套完整的项目文档（5 类）。

## License

MIT
