# AI Toolbox (AI 工具箱)

一个基于 Vue 3 + Vite 构建的 AI 辅助工具集合网站，旨在通过 AI 技术提升内容创作和日常工作的效率。

## 🛠️ 包含工具

### 1. 爆款生成器 (Viral Generator)
专为小红书博主设计的封面与文案生成工具。
- **AI 驱动**：集成 DeepSeek API，一键生成爆款标题、正文和标签。
- **多风格模板**：
  - 🎨 **简约渐变**：清新通透，适合生活分享。
  - 🅰️ **大字报**：醒目冲击，适合强调重点。
  - 💼 **现代商务**：专业干练，适合知识分享。
  - 🌊 **流动科技**：动态光影，适合科技数码。
- **实时编辑**：支持对生成内容的实时修改和预览。
- **一键导出**：支持将生成的封面导出为高清图片。

### 2. 微信公众号文章生成器 (WeChat Article Generator) ✨ NEW
专为公众号运营者设计的文章与封面一体化生成工具。

**核心功能**：
- 🤖 **AI 智能创作**：输入主题，自动生成 1200-1500 字的高质量文章
- 🎨 **4 种精美封面模板**：
  - **彩色强调**：彩色装饰条，清晰易读（默认）
  - **简约白**：瑞士风格网格，极简主义
  - **深色简约**：深灰背景，现代专业
  - **渐变现代**：蓝紫粉渐变，时尚活力
- 📝 **人性化写作**：去 AI 味，口语化表达，像真人在分享
- 📥 **多格式导出**：支持纯文本、Markdown 格式复制
- �️ **封面下载**：一键下载高清封面图（1080x460）

**用户体验优化**：
- ✅ 输入验证（5-200 字限制）
- ✅ 示例主题快速填充
- ✅ 优雅的 Toast 通知
- ✅ 加载状态实时反馈
- ✅ 智能文件名（使用文章标题）

## �🚀 技术栈

- **前端框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **路由管理**: Vue Router
- **样式方案**: TailwindCSS
- **图标库**: Lucide Vue Next
- **图片生成**: html2canvas
- **AI 服务**: DeepSeek API
- **字体**: Google Fonts (Noto Sans SC, Noto Serif SC)

## 📦 快速开始

### 1. 克隆项目

```bash
git clone <repository-url>
cd ai-toolbox
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 配置环境变量

在项目根目录下复制 `.env.example` 为 `.env`，并填入你的 API 配置：

```bash
cp .env.example .env
```

编辑 `.env` 文件：

```env
VITE_DEEPSEEK_API_KEY=your_api_key_here
VITE_DEEPSEEK_ENDPOINT=https://api.siliconflow.cn/v1/chat/completions
VITE_DEEPSEEK_MODEL=deepseek-ai/DeepSeek-V3
```

> 💡 **获取 API 密钥**：访问 [SiliconFlow](https://siliconflow.cn/) 注册并获取 API Key

### 4. 启动开发服务器

```bash
pnpm dev
```

访问 `http://localhost:5173` 即可使用。

### 5. 构建生产版本

```bash
pnpm build
```

## 📄 目录结构

```
src/
├── components/           # 公共组件
│   ├── CardTemplates/    # 爆款生成器的卡片模板
│   └── Toast.vue         # Toast 通知组件
├── composables/          # 组合式函数 (Hooks)
│   ├── useContentGenerator.js    # 爆款生成器逻辑
│   └── useWeChatGenerator.js     # 公众号文章生成逻辑
├── router/               # 路由配置
├── views/                # 页面视图
│   ├── Dashboard.vue              # 首页仪表盘
│   ├── ViralGenerator.vue         # 爆款生成器
│   └── WeChatArticleGenerator.vue # 公众号文章生成器
├── App.vue               # 主布局组件
└── main.js               # 入口文件
```

## 🎯 使用指南

### 微信公众号文章生成器

1. **输入主题**：在左侧输入框填写文章主题（5-200 字）
2. **选择示例**：或点击示例主题快速填充
3. **选择封面风格**：从 4 种模板中选择喜欢的风格
4. **生成文章**：点击"开始生成"按钮
5. **预览与编辑**：查看生成的文章和封面
6. **导出内容**：
   - 点击"复制文本"或"复制 Markdown"
   - 点击"下载封面"保存封面图

### 爆款生成器

1. 输入主题关键词
2. 选择卡片风格模板
3. 点击生成
4. 实时编辑内容
5. 导出封面图片

## ⚙️ 配置说明

### API 配置
- `VITE_DEEPSEEK_API_KEY`: DeepSeek API 密钥（必填）
- `VITE_DEEPSEEK_ENDPOINT`: API 端点地址（必填）
- `VITE_DEEPSEEK_MODEL`: 使用的模型名称（可选，默认 deepseek-chat）

### 注意事项
- ⚠️ API 密钥在前端暴露，仅适用于个人/开发环境
- ⚠️ 生产环境建议使用后端代理隐藏密钥
- ⚠️ 请妥善保管你的 API 密钥，避免泄露

## 🌐 部署到 GitHub Pages

项目支持一键部署到 GitHub Pages，详细步骤请查看 [DEPLOY.md](./DEPLOY.md)。

**快速部署**：

1. 编辑 `deploy.sh` 或 `deploy.bat`，替换仓库信息
2. 编辑 `vite.config.js`，设置正确的 `base` 路径
3. 运行部署命令：
   ```bash
   # Linux/Mac
   pnpm run deploy
   
   # Windows
   pnpm run deploy:win
   ```

## 🔄 最近更新

### v1.1.0 (2025-11-24)
- ✨ 新增微信公众号文章生成器
- ✨ 添加 Toast 通知组件
- ✨ 实现输入验证（5-200 字）
- ✨ 添加示例主题快捷按钮
- ✨ 优化封面下载文件名（使用文章标题）
- ✨ 改进加载状态视觉反馈
- 🐛 修复错误提示体验问题
- 📝 创建 `.env.example` 配置模板

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

## 📝 License

MIT
