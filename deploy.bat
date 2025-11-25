@echo off
REM Windows 部署脚本

REM 确保在 git 仓库根目录运行
if not exist .git (
    echo 错误: 请在 git 仓库根目录运行此脚本
    exit /b 1
)

echo 开始构建项目...
call pnpm run build

if %errorlevel% neq 0 (
    echo 构建失败！
    exit /b %errorlevel%
)

REM 确保 dist 目录存在
if not exist dist (
    echo 错误: dist 目录不存在
    exit /b 1
)

REM 清理 dist 目录中的 .git（如果存在）
if exist dist\.git (
    echo 清理 dist\.git 目录...
    rmdir /s /q dist\.git
)

REM 添加 dist 目录到 git（如果在 .gitignore 中）
git add dist -f

REM 提交 dist 目录的更改
git commit -m "Build: update dist for deployment" || echo 没有新的更改需要提交

REM 使用 git subtree 推送 dist 目录到 gh-pages 分支
echo 推送 dist 目录到 gh-pages 分支...
git subtree push --prefix dist origin gh-pages

echo ✅ 部署完成！
echo 访问: https://jiaxint.github.io/ai-agent/
pause
