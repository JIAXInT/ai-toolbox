<script setup>
import { Sparkles, ArrowRight, FileText } from 'lucide-vue-next'
</script>

<template>
  <div class="p-8 max-w-6xl mx-auto">
    <header class="mb-12">
      <h1 class="text-4xl font-extrabold text-gray-900 mb-4">欢迎来到 AI 工具箱 👋</h1>
      <p class="text-xl text-gray-500">这里汇集了多种强大的 AI 辅助工具，助你提升效率。</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Viral Generator Card -->
      <router-link to="/viral-generator" class="group block">
        <div class="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group-hover:border-red-200">
          <div class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-500 transition-colors duration-300">
            <Sparkles class="w-6 h-6 text-red-500 group-hover:text-white transition-colors duration-300" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">爆款生成器</h3>
          <p class="text-gray-500 mb-4 line-clamp-2">AI 驱动的小红书封面制作工具，一键生成爆款标题和正文，支持多种风格切换。</p>
          <div class="flex items-center text-red-500 font-medium text-sm">
            立即使用 <ArrowRight class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </router-link>

      <!-- WeChat Article Generator Card -->
      <router-link to="/wechat-article-generator" class="group block">
        <div class="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group-hover:border-blue-200">
          <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors duration-300">
            <FileText class="w-6 h-6 text-blue-500 group-hover:text-white transition-colors duration-300" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">公众号文章</h3>
          <p class="text-gray-500 mb-4 line-clamp-2">一键生成公众号文章和封面，支持 Markdown 导出，轻松打造高质量内容。</p>
          <div class="flex items-center text-blue-500 font-medium text-sm">
            立即使用 <ArrowRight class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </router-link>

      <!-- Placeholder for future tools -->
      <div class="bg-gray-50 border border-gray-200 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center opacity-60">
        <div class="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center mb-4">
          <span class="text-2xl">🚀</span>
        </div>
        <h3 class="text-lg font-bold text-gray-400 mb-1">更多工具开发中</h3>
        <p class="text-sm text-gray-400">敬请期待...</p>
      </div>
    </div>
  </div>
</template>
