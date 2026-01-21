# ToolsNavi - 链接资源聚合站

这是一个基于 Next.js 的链接/资源聚合型网站，用于集中展示和维护各类推荐链接、权益入口或实用资源。

## 功能特性

- ✅ 首页卡片展示和搜索功能
- ✅ 分类页（左侧分类栏 + 右侧列表）
- ✅ 链接详情页（极简展示和跳转）
- ✅ 管理后台（密码保护）
- ✅ 链接管理（新增/编辑/删除/排序）
- ✅ 分类管理（新增/编辑/删除/排序）
- ✅ SEO 友好（支持 sitemap 和 robots.txt）

## 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **语言**: TypeScript
- **数据存储**: JSON 文件（无需数据库）

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

创建 `.env.local` 文件（参考 `.env.example`）：

```env
ADMIN_PASSWORD=your_password_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. 准备数据文件

确保 `data/categories.json` 和 `data/links.json` 文件存在并包含有效数据。

### 4. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

### 5. 访问管理后台

访问 [http://localhost:3000/admin](http://localhost:3000/admin)，使用 `.env.local` 中配置的密码登录。

## 项目结构

```
├── app/                    # Next.js App Router 页面
│   ├── admin/             # 管理后台页面
│   ├── category/          # 分类页
│   ├── link/              # 链接详情页
│   ├── api/               # API 路由
│   └── page.tsx           # 首页
├── data/                  # 数据文件
│   ├── categories.json    # 分类数据
│   └── links.json         # 链接数据
├── lib/                   # 工具函数
│   ├── data.ts           # 数据读写函数
│   └── auth.ts           # 认证函数
└── public/                # 静态资源
```

## 数据格式

### categories.json

```json
[
  {
    "id": "tools",
    "name": "工具",
    "slug": "tools",
    "order": 1
  }
]
```

### links.json

```json
[
  {
    "id": "example-1",
    "title": "示例链接",
    "slug": "example-1",
    "description": "链接描述",
    "url": "https://example.com",
    "categoryId": "tools",
    "icon": "",
    "order": 1
  }
]
```

## 部署

### 构建生产版本

```bash
npm run build
npm start
```

### 环境变量

生产环境需要设置：
- `ADMIN_PASSWORD`: 管理后台密码
- `NEXT_PUBLIC_BASE_URL`: 网站基础 URL（用于生成 sitemap）

## 维护说明

- 所有数据存储在 `data/*.json` 文件中
- 可以通过管理后台或直接编辑 JSON 文件来管理数据
- 修改数据后，Next.js 会在开发模式下自动重新加载
- 生产环境需要重启服务器才能看到数据变更

## 许可证

MIT
