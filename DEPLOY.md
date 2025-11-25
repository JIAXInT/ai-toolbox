# GitHub Pages 部署指南

本项目支持部署到 GitHub Pages。

## 📋 部署前准备

### 1. 配置仓库信息

编辑部署脚本，将 `<USERNAME>` 和 `<REPO>` 替换为你的 GitHub 用户名和仓库名：

**Linux/Mac (`deploy.sh`)**:
```bash
git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
```

**Windows (`deploy.bat`)**:
```batch
git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
```

### 2. 配置 base 路径

编辑 `vite.config.js`，将 `base` 设置为你的仓库名：

```javascript
base: process.env.NODE_ENV === 'production' ? '/<REPO>/' : '/',
```

例如，如果你的仓库名是 `ai-toolbox`：
```javascript
base: process.env.NODE_ENV === 'production' ? '/ai-toolbox/' : '/',
```

如果部署到自定义域名或根路径（如 `username.github.io`），设置为：
```javascript
base: '/',
```

## 🚀 部署步骤

### Linux/Mac

1. 给脚本添加执行权限：
```bash
chmod +x deploy.sh
```

2. 运行部署脚本：
```bash
pnpm run deploy
# 或直接运行
./deploy.sh
```

### Windows

直接运行：
```bash
pnpm run deploy:win
# 或双击运行
deploy.bat
```

## ✅ 部署后配置

1. 进入 GitHub 仓库设置
2. 找到 **Pages** 选项
3. **Source** 选择 `gh-pages` 分支
4. 点击 **Save**
5. 等待几分钟，访问 `https://<USERNAME>.github.io/<REPO>/`

## 🔧 自定义域名（可选）

如果要使用自定义域名：

1. 在 `deploy.sh` 或 `deploy.bat` 中取消注释：
```bash
echo 'www.example.com' > CNAME
```

2. 将 `www.example.com` 替换为你的域名

3. 在域名提供商处添加 CNAME 记录指向 `<USERNAME>.github.io`

4. 在 GitHub Pages 设置中填入自定义域名

## ⚠️ 注意事项

- 部署脚本会强制推送到 `gh-pages` 分支，会覆盖该分支的所有内容
- 确保 `.env` 文件不要提交到仓库（已在 `.gitignore` 中）
- API 密钥会暴露在前端代码中，建议使用后端代理或环境变量注入
- 首次部署可能需要等待几分钟才能访问

## 🐛 常见问题

### 1. 页面显示 404
- 检查 `vite.config.js` 中的 `base` 配置是否正确
- 确认 GitHub Pages 设置中选择了 `gh-pages` 分支

### 2. 资源加载失败
- 检查 `base` 路径是否与仓库名匹配
- 清除浏览器缓存后重试

### 3. 推送失败
- 确认 SSH 密钥已配置
- 检查仓库地址是否正确
- 尝试使用 HTTPS 地址：`https://github.com/<USERNAME>/<REPO>.git`

## 📚 参考资源

- [GitHub Pages 官方文档](https://docs.github.com/en/pages)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)
