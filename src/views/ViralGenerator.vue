<script setup>
import { ref, shallowRef } from 'vue'
import { Download, Sparkles, LayoutTemplate, Copy } from 'lucide-vue-next'
import html2canvas from 'html2canvas'
import { useContentGenerator } from '../composables/useContentGenerator'
import SimpleGradient from '../components/CardTemplates/SimpleGradient.vue'
import BoldTypography from '../components/CardTemplates/BoldTypography.vue'
import ModernBusiness from '../components/CardTemplates/ModernBusiness.vue'
import FlowingTechBlue from '../components/CardTemplates/FlowingTechBlue.vue'

const { loading, generatedContent, generate, templates, currentTemplate } = useContentGenerator()
const topic = ref('')

// Map component names to actual components
const componentMap = {
  SimpleGradient,
  BoldTypography,
  ModernBusiness,
  FlowingTechBlue
}

const handleGenerate = () => {
  if (!topic.value) return
  generate(topic.value)
}

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    alert('已复制到剪贴板')
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const downloadImage = async () => {
  const element = document.getElementById('card-preview')
  if (!element) return
  
  try {
    const canvas = await html2canvas(element, {
      scale: 2, // High res
      useCORS: true,
      backgroundColor: null
    })
    
    const link = document.createElement('a')
    link.download = `xhs-card-${Date.now()}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  } catch (err) {
    console.error('Download failed:', err)
  }
}
</script>

<template>
  <div class="flex h-full">
    <!-- Tool Sidebar (Controls) -->
    <aside class="w-[420px] bg-white border-r border-gray-200 flex flex-col h-full overflow-hidden shrink-0">
      <div class="p-6 border-b border-gray-100">
        <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Sparkles class="w-5 h-5 text-red-500" />
          配置面板
        </h2>
      </div>

      <div class="p-6 space-y-8 flex-1 overflow-y-auto">
        <!-- Input Section -->
        <div class="space-y-3">
          <label class="text-sm font-bold text-gray-700 block">输入主题</label>
          <div class="relative">
            <input 
              v-model="topic"
              type="text" 
              placeholder="例如：杭州旅游攻略" 
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
              @keyup.enter="handleGenerate"
            />
          </div>
          <button 
            @click="handleGenerate"
            :disabled="loading || !topic"
            class="w-full py-3 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-500/30"
          >
            <Sparkles v-if="!loading" class="w-4 h-4" />
            <span v-if="loading" class="animate-spin">⏳</span>
            {{ loading ? '生成中...' : '一键生成' }}
          </button>
        </div>

        <!-- Content Editor -->
        <div v-if="generatedContent.title" class="space-y-4 border-t border-gray-100 pt-4">
          <!-- Title Input -->
          <div class="space-y-2">
            <div class="flex justify-between items-center">
              <label class="text-sm font-bold text-gray-700">标题</label>
              <div class="flex items-center gap-2">
                <span class="text-xs text-gray-400" :class="{'text-red-500': generatedContent.title.length > 20}">
                  {{ generatedContent.title.length }}/20
                </span>
                <button 
                  @click="copyToClipboard(generatedContent.title)"
                  class="text-xs text-blue-500 hover:text-blue-700 flex items-center gap-1"
                >
                  <Copy class="w-3 h-3" /> 复制
                </button>
              </div>
            </div>
            <input 
              v-model="generatedContent.title"
              type="text" 
              maxlength="20"
              class="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          <!-- Content Input -->
          <div class="space-y-2">
            <div class="flex justify-between items-center">
              <label class="text-sm font-bold text-gray-700">正文</label>
              <div class="flex items-center gap-2">
                <span class="text-xs text-gray-400" :class="{'text-red-500': generatedContent.content.length > 1000}">
                  {{ generatedContent.content.length }}/1000
                </span>
                <button 
                  @click="copyToClipboard(generatedContent.content)"
                  class="text-xs text-blue-500 hover:text-blue-700 flex items-center gap-1"
                >
                  <Copy class="w-3 h-3" /> 复制
                </button>
              </div>
            </div>
            <textarea 
              v-model="generatedContent.content"
              rows="6"
              maxlength="1000"
              class="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none resize-none"
            ></textarea>
          </div>
        </div>

        <!-- Style Selector -->
        <div class="space-y-3">
          <label class="text-sm font-bold text-gray-700 block flex items-center gap-2">
            <LayoutTemplate class="w-4 h-4" />
            选择风格
          </label>
          <div class="grid grid-cols-2 gap-3">
            <div 
              v-for="template in templates" 
              :key="template.id"
              @click="currentTemplate = template"
              :class="[
                'border-2 p-3 rounded-lg cursor-pointer text-center transition-all',
                currentTemplate.id === template.id ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-300'
              ]"
            >
              <!-- Preview Icon (Simplified) -->
              <div class="w-full h-12 rounded mb-2"
                   :class="{
                     'bg-gradient-to-br from-pink-400 to-red-500': template.id === 'simple-gradient',
                     'bg-white border border-gray-300 flex items-center justify-center font-bold text-gray-800': template.id === 'bold-typography',
                     'bg-slate-100 border-t-4 border-blue-900 flex items-center justify-center': template.id === 'modern-business',
                     'bg-slate-900 border border-blue-500 flex items-center justify-center': template.id === 'flowing-tech'
                   }"
              >
                <span v-if="template.id === 'bold-typography'">Aa</span>
                <span v-if="template.id === 'modern-business'" class="text-[10px] font-bold text-blue-900">BIZ</span>
                <span v-if="template.id === 'flowing-tech'" class="text-[10px] font-bold text-[#00C6FF]">TECH</span>
              </div>
              <span 
                class="text-xs font-medium"
                :class="currentTemplate.id === template.id ? 'text-red-700' : 'text-gray-500'"
              >
                {{ template.name }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="p-6 border-t border-gray-100 bg-gray-50/50">
        <button 
          @click="downloadImage"
          class="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <Download class="w-4 h-4" />
          下载封面
        </button>
      </div>
    </aside>

    <!-- Main Preview Area -->
    <main class="flex-1 flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed relative overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 -z-10"></div>
      
      <div class="scale-100 transition-transform duration-300 hover:scale-[1.02]">
        <component :is="componentMap[currentTemplate.componentName]" :data="generatedContent" />
      </div>

      <div class="absolute bottom-8 text-gray-400 text-sm">
        预览模式 • 2:3 比例
      </div>
    </main>
  </div>
</template>
