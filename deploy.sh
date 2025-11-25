#!/usr/bin/env sh

# 发生错误时终止
set -e

# 确保在 git 仓库根目录运行
if [ ! -d ".git" ]; then
  echo "错误: 请在 git 仓库根目录运行此脚本"
  exit 1
fi

# 构建项目
echo "开始构建项目..."
pnpm run build

# 确保 dist 目录存在
if [ ! -d "dist" ]; then
  echo "错误: dist 目录不存在"
  exit 1
fi

# 清理 dist 目录中的 .git（如果存在）
if [ -d "dist/.git" ]; then
  echo "清理 dist/.git 目录..."
  rm -rf dist/.git
fi

# 添加 dist 目录到 git（如果在 .gitignore 中）
git add dist -f

# 提交 dist 目录的更改
git commit -m "Build: update dist for deployment" || echo "没有新的更改需要提交"

# 使用 git subtree 推送 dist 目录到 gh-pages 分支
echo "推送 dist 目录到 gh-pages 分支..."
git subtree push --prefix dist origin gh-pages

echo "✅ 部署完成！"
echo "访问: https://jiaxint.github.io/ai-agent/"
