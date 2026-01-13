# Hexo 博客 - Cloudflare Pages 部署指南

本项目是基于 Hexo 和 Solitude 主题的博客系统,集成了 Cloudflare Workers 和 KV 数据库。

## 🚀 Cloudflare Pages 部署配置

### 构建设置

在 Cloudflare Pages 项目设置中,使用以下配置:

| 配置项           | 值              |
| ---------------- | --------------- |
| **框架预设**     | None (或 Hexo)  |
| **构建命令**     | `npm run build` |
| **构建输出目录** | `public`        |
| **根目录**       | `/` (默认)      |

### 环境变量

在 **Settings** → **Environment variables** 中添加:

```
NODE_VERSION = 18
```

### KV 命名空间绑定

在 **Settings** → **Functions** → **KV namespace bindings** 中添加:

| 变量名    | KV 命名空间              |
| --------- | ------------------------ |
| `BLOG_KV` | 选择你创建的 KV 命名空间 |

---

## 📋 详细部署步骤

### 1. 准备工作

确保你已经:

- ✅ 创建了 Cloudflare 账户
- ✅ 创建了 KV 命名空间 (ID: `9fdc99ab37b3408c81d6a79198ec4b98`)
- ✅ 代码已推送到 GitHub

### 2. 创建 Pages 项目

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 进入 **Workers & Pages**
3. 点击 **Create application** → **Pages** → **Connect to Git**
4. 选择 GitHub 仓库: `Grails125/blog`
5. 点击 **Begin setup**

### 3. 配置构建设置

在构建配置页面:

```
Project name: blog (或自定义名称)
Production branch: main
```

**Build settings:**

```
Framework preset: None
Build command: npm run build
Build output directory: public
Root directory: /
```

**Environment variables:**

```
NODE_VERSION = 18
```

### 4. 绑定 KV 命名空间

部署完成后:

1. 进入项目 **Settings** → **Functions**
2. 在 **KV namespace bindings** 部分点击 **Add binding**
3. 配置:
   - Variable name: `BLOG_KV`
   - KV namespace: 选择你的 KV 命名空间

### 5. 触发重新部署

绑定 KV 后,需要重新部署:

1. 进入 **Deployments** 标签
2. 点击最新部署右侧的 **...** → **Retry deployment**

---

## 🔧 常见构建问题

### 问题 1: 构建失败 - 找不到 hexo 命令

**原因**: Hexo CLI 未安装

**解决方案**: 已在 `package.json` 中添加 `hexo` 为依赖,无需全局安装

### 问题 2: 构建超时

**原因**: 依赖安装时间过长

**解决方案**:

- 使用 `npm ci` 代替 `npm install` (Cloudflare Pages 默认行为)
- 确保 `package-lock.json` 已提交到仓库

### 问题 3: 主题文件缺失

**原因**: Solitude 主题通过 npm 安装,需要正确配置

**解决方案**:

- 已在 `package.json` 中包含 `hexo-theme-solitude`
- 主题配置文件 `_config.solitude.yml` 已提交

### 问题 4: Functions 不工作

**原因**: KV 命名空间未绑定

**解决方案**:

- 确保在 Settings → Functions 中绑定了 `BLOG_KV`
- 变量名必须完全匹配 `BLOG_KV`

---

## 📝 部署后配置

部署成功后,你会获得一个 Cloudflare Pages 域名,例如:

```
https://blog-xxx.pages.dev
```

### 更新配置文件

1. 编辑 `_config.yml`:

```yaml
url: https://your-actual-domain.pages.dev
```

2. 编辑 `wrangler.toml`:

```toml
[vars]
ALLOWED_ORIGINS = "https://your-actual-domain.pages.dev"
```

3. 提交并推送更改:

```bash
git add _config.yml wrangler.toml
git commit -m "Update domain configuration"
git push
```

Cloudflare Pages 会自动重新部署。

---

## 🌐 自定义域名

在 Cloudflare Pages 项目中:

1. 进入 **Custom domains**
2. 点击 **Set up a custom domain**
3. 输入你的域名
4. 按照提示配置 DNS 记录

Cloudflare 会自动配置 SSL 证书。

---

## 🧪 测试 API 功能

部署完成后,测试 API 是否正常工作:

### 测试访问统计

```bash
curl https://your-domain.pages.dev/api/stats/hello-world
```

### 测试评论系统

```bash
curl -X POST https://your-domain.pages.dev/api/comments/hello-world \
  -H "Content-Type: application/json" \
  -d '{"author":"测试用户","content":"测试评论"}'
```

### 测试点赞功能

```bash
curl -X POST https://your-domain.pages.dev/api/likes/hello-world
```

---

## 📊 监控和日志

在 Cloudflare Pages 项目中:

1. **Deployments**: 查看部署历史和状态
2. **Functions**: 查看 Functions 调用日志
3. **Analytics**: 查看访问统计

---

## 🆘 需要帮助?

如果遇到问题:

1. 检查 **Deployments** 中的构建日志
2. 检查 **Functions** 中的运行时日志
3. 确认 KV 命名空间已正确绑定
4. 验证环境变量配置正确

---

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run server

# 访问 http://localhost:4000

# 构建静态文件
npm run build
```

---

**祝你部署顺利! 🎉**
