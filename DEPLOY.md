# Hexo 博客 - Cloudflare Pages 部署指南

## 🚨 常见问题与故障排除

### 🔴 错误: "Failed: error occurred while updating repository submodules"

如果你在部署日志中看到这个错误，这通常是因为 Git 历史记录被重写（Force Push）导致 Cloudflare 的构建缓存与当前仓库状态不一致。

**解决方案: 重建 Cloudflare Pages 项目**

这是最快、最有效的解决方法：

1. **删除旧项目**:

   - 登录 Cloudflare Dashboard
   - 进入你的 Pages 项目 -> **Settings** -> **Delete project**

2. **重新创建项目**:

   - **Sources**: Connect to Git -> 选择 `Grails125/blog`
   - **Framework preset**: None (或 Hexo)
   - **Build command**: `npm run build`
   - **Build output directory**: `public`
   - **Environment variables**: 添加 `NODE_VERSION` = `18`

3. **重新绑定 KV**:
   - 项目创建后，立即去 **Settings** -> **Functions**
   - 添加 KV binding: `BLOG_KV` -> 你的命名空间 ID

---

## 🚀 标准部署配置

### 构建设置

| 配置项           | 值              |
| ---------------- | --------------- |
| **框架预设**     | None            |
| **构建命令**     | `npm run build` |
| **构建输出目录** | `public`        |

### 环境变量

| 变量名         | 值   |
| -------------- | ---- |
| `NODE_VERSION` | `18` |

### KV 命名空间绑定

| 变量名    | 绑定值           |
| --------- | ---------------- |
| `BLOG_KV` | 你的 KV 命名空间 |

---

## 📝 部署后检查清单

- [ ] `_config.yml` 中的 `url` 已更新为 Pages 域名
- [ ] `wrangler.toml` 中的 `ALLOWED_ORIGINS` 已更新
- [ ] API 功能测试正常 (评论/统计/点赞)
