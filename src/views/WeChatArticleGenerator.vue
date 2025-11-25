<script setup>
import { ref, nextTick, watch } from 'vue'
import { Copy, Image as ImageIcon, FileText, Loader2, RefreshCw, Check, Download, LayoutTemplate, Sparkles } from 'lucide-vue-next'
import html2canvas from 'html2canvas'
import { useWeChatGenerator } from '../composables/useWeChatGenerator'
import Toast from '../components/Toast.vue'

const { loading: isGenerating, generatedContent, error: apiError, generate } = useWeChatGenerator()

const theme = ref('')
const copyStatus = ref({ text: false, md: false })
const coverTemplateRef = ref(null)
const generatedData = ref(null)
const inputError = ref('')
const toast = ref({ show: false, message: '', type: 'info' })

// Example themes
const exampleThemes = [
  'AI 如何改变我们的工作方式',
  '提升时间管理能力的实用方法',
  '远程办公的优势与挑战',
  '如何培养深度思考的习惯'
]

// Premium Template Definitions
const templates = [
  {
    id: 'accent-color',
    name: '彩色强调',
    description: '彩色装饰，清晰易读',
    previewClass: 'bg-gray-50 border-gray-200 relative overflow-hidden',
    textPreviewClass: 'text-gray-900',
    hasAccent: true
  },
  {
    id: 'clean-white',
    name: '简约白',
    description: '纯白背景，黑色大字',
    previewClass: 'bg-white border-gray-200',
    textPreviewClass: 'text-gray-900'
  },
  {
    id: 'dark-minimal',
    name: '深色简约',
    description: '深色背景，白色标题',
    previewClass: 'bg-gray-900 border-gray-900',
    textPreviewClass: 'text-white'
  },
  {
    id: 'gradient-modern',
    name: '渐变现代',
    description: '渐变背景，居中排版',
    previewClass: 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 border-transparent',
    textPreviewClass: 'text-white'
  }
]

const selectedTemplate = ref(templates[0])

// Watch for generated content updates
watch(generatedContent, async (newContent) => {
  if (newContent) {
    generatedData.value = {
      ...newContent,
      coverUrl: '' // Reset cover URL
    }
    // Generate cover after content is ready
    await nextTick()
    await generateCover()
  }
})

// Watch for template changes to regenerate cover
watch(selectedTemplate, async () => {
  if (generatedData.value) {
    await nextTick()
    await generateCover()
  }
})

const generateArticle = async () => {
  // Input validation
  inputError.value = ''
  const trimmedTheme = theme.value.trim()
  
  if (!trimmedTheme) {
    inputError.value = '请输入文章主题'
    return
  }
  
  if (trimmedTheme.length < 5) {
    inputError.value = '主题至少需要 5 个字'
    return
  }
  
  if (trimmedTheme.length > 200) {
    inputError.value = '主题不能超过 200 个字'
    return
  }
  
  await generate(trimmedTheme)
}

const selectExample = (example) => {
  theme.value = example
  inputError.value = ''
}

const generateCover = async () => {
  if (!coverTemplateRef.value || !generatedData.value) return
  
  try {
    // Wait for fonts to load
    await document.fonts.ready
    
    const canvas = await html2canvas(coverTemplateRef.value, {
      useCORS: true,
      scale: 2, // Higher resolution
      backgroundColor: null,
      logging: false
    })
    
    generatedData.value.coverUrl = canvas.toDataURL('image/png')
  } catch (error) {
    console.error('Error generating cover:', error)
  }
}

const downloadCover = () => {
  if (!generatedData.value?.coverUrl) return
  
  // Generate filename from title
  let filename = 'cover'
  if (generatedData.value.title) {
    // Clean title: keep only Chinese, English, numbers, and underscores
    filename = generatedData.value.title
      .replace(/[^\u4e00-\u9fa5a-zA-Z0-9_]/g, '_')
      .substring(0, 50) // Limit length
  }
  
  const link = document.createElement('a')
  link.href = generatedData.value.coverUrl
  link.download = `${filename}_${Date.now()}.png`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  showToast('封面已下载', 'success')
}

const getMarkdown = () => {
  if (!generatedData.value) return ''
  
  let md = `# ${generatedData.value.title}\n\n`
  md += `![封面图](${generatedData.value.coverUrl})\n\n`
  
  generatedData.value.content.forEach(section => {
    md += `## ${section.heading}\n\n${section.text}\n\n`
  })
  
  return md
}

const getPlainText = () => {
  if (!generatedData.value) return ''
  
  let text = `${generatedData.value.title}\n\n`
  generatedData.value.content.forEach(section => {
    text += `${section.heading}\n${section.text}\n\n`
  })
  
  return text
}

const copyToClipboard = async (type) => {
  const content = type === 'md' ? getMarkdown() : getPlainText()
  
  try {
    await navigator.clipboard.writeText(content)
    copyStatus.value[type] = true
    setTimeout(() => {
      copyStatus.value[type] = false
    }, 2000)
    showToast('已复制到剪贴板', 'success')
  } catch (err) {
    console.error('Failed to copy:', err)
    showToast('复制失败', 'error')
  }
}

const showToast = (message, type = 'info') => {
  toast.value = { show: true, message, type }
}

const closeToast = () => {
  toast.value.show = false
}

// Watch for API errors
watch(apiError, (newError) => {
  if (newError) {
    showToast(newError, 'error')
  }
})
</script>

<template>
  <div class="h-full flex flex-col bg-white font-sans">
    <!-- Header -->
    <header class="border-b border-gray-200 px-8 py-5 flex items-center justify-between bg-white">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
          <FileText class="w-6 h-6" />
        </div>
        <div>
          <h1 class="text-xl font-bold text-gray-900">公众号文章生成器</h1>
          <p class="text-sm text-gray-500">一键生成封面与文章，支持 Markdown 导出</p>
        </div>
      </div>
    </header>

    <div class="flex-1 overflow-hidden flex">
      <!-- Left Panel: Configuration -->
      <div class="w-[360px] border-r border-gray-200 p-6 flex flex-col bg-gray-50/50 overflow-y-auto">
        <div class="space-y-8">
          <div class="space-y-3">
            <label class="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Sparkles class="w-4 h-4 text-blue-500" /> 文章主题
            </label>
            <textarea 
              v-model="theme"
              :disabled="isGenerating"
              placeholder="请输入文章主题，例如：人工智能的发展趋势..." 
              class="w-full h-32 px-4 py-3 rounded-xl border transition-all text-gray-700 placeholder:text-gray-400 bg-white shadow-sm resize-none outline-none"
              :class="inputError ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'"
            ></textarea>
            
            <!-- Input Error -->
            <p v-if="inputError" class="text-sm text-red-600 flex items-center gap-1">
              <span class="w-1 h-1 rounded-full bg-red-600"></span>
              {{ inputError }}
            </p>
            
            <!-- Example Themes -->
            <div class="space-y-2">
              <p class="text-xs text-gray-500">快速填充示例：</p>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="example in exampleThemes"
                  :key="example"
                  @click="selectExample(example)"
                  :disabled="isGenerating"
                  class="text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ example }}
                </button>
              </div>
            </div>
          </div>

          <!-- Template Selection -->
          <div class="space-y-3">
            <label class="text-sm font-bold text-gray-900 flex items-center gap-2">
              <LayoutTemplate class="w-4 h-4 text-blue-500" /> 封面风格
            </label>
            <div class="grid grid-cols-2 gap-3">
              <button 
                v-for="t in templates" 
                :key="t.id"
                @click="selectedTemplate = t"
                class="relative group rounded-xl border-2 transition-all duration-200 overflow-hidden text-left"
                :class="selectedTemplate.id === t.id ? 'border-blue-500 ring-2 ring-blue-200 scale-[1.02] shadow-md' : 'border-transparent hover:border-gray-200 hover:shadow-sm bg-white'"
              >
                <!-- Visual Preview -->
                <div class="h-20 w-full border-b border-gray-100 flex items-center justify-center" :class="t.previewClass">
                  <div v-if="t.hasAccent" class="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-600 to-purple-600"></div>
                  <span class="text-2xl font-black opacity-40 select-none" :class="t.textPreviewClass">Aa</span>
                </div>
                
                <!-- Info -->
                <div class="p-3 bg-white">
                  <div class="flex items-center justify-between mb-1">
                    <span class="font-bold text-gray-900 text-sm">{{ t.name }}</span>
                    <div v-if="selectedTemplate.id === t.id" class="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check class="w-2.5 h-2.5 text-white" />
                    </div>
                  </div>
                  <p class="text-[10px] text-gray-500 leading-tight">{{ t.description }}</p>
                </div>
              </button>
            </div>
          </div>

          <button 
            @click="generateArticle"
            :disabled="!theme || isGenerating"
            class="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-blue-400 disabled:to-indigo-400 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 active:scale-[0.98]"
          >
            <Loader2 v-if="isGenerating" class="w-5 h-5 animate-spin" />
            <span v-else>开始生成</span>
          </button>
          
          <!-- Loading State -->
          <div v-if="isGenerating" class="text-center py-4">
            <p class="text-sm text-gray-600 animate-pulse">正在生成文章，请稍候...</p>
          </div>
        </div>
      </div>

      <!-- Right Panel: Preview -->
      <div class="flex-1 bg-gray-100 p-8 overflow-y-auto relative">
        <!-- Hidden Cover Template Container -->
        <div class="absolute -left-[9999px] top-0">
          <!-- 1. Clean White Template -->
          <div 
            v-if="selectedTemplate.id === 'clean-white'"
            ref="coverTemplateRef"
            class="w-[1080px] h-[460px] bg-white relative overflow-hidden flex items-center justify-center p-20"
          >
            <!-- Swiss Grid Background -->
            <div class="absolute inset-0" style="background-image: linear-gradient(#00000008 1px, transparent 1px), linear-gradient(90deg, #00000008 1px, transparent 1px); background-size: 40px 40px;"></div>
            
            <!-- Geometric Accents -->
            <div class="absolute top-0 left-0 w-32 h-32 border-r border-b border-black/5"></div>
            <div class="absolute bottom-0 right-0 w-32 h-32 border-l border-t border-black/5"></div>
            <div class="absolute top-12 right-12 w-4 h-4 rounded-full bg-black/5"></div>
            
            <div class="w-full max-w-4xl relative z-10">
              <h1 class="text-7xl font-black text-gray-900 leading-[1.15] mb-8 text-center tracking-tight" style="font-family: 'Noto Sans SC', sans-serif;">
                {{ generatedData?.title || '文章标题' }}
              </h1>
              <div class="flex items-center justify-center gap-4">
                <div class="h-0.5 w-12 bg-gray-900"></div>
                <span class="text-gray-500 text-lg font-bold tracking-widest uppercase font-serif">INSIGHT</span>
                <div class="h-0.5 w-12 bg-gray-900"></div>
              </div>
            </div>
          </div>

          <!-- 2. Dark Minimal Template -->
          <div 
            v-if="selectedTemplate.id === 'dark-minimal'"
            ref="coverTemplateRef"
            class="w-[1080px] h-[460px] bg-[#1a1a1a] relative overflow-hidden flex items-center justify-center p-20"
          >
            <!-- Noise Texture -->
            <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
            
            <div class="w-full max-w-4xl relative z-10">
              <div class="text-gray-500 text-sm font-bold tracking-[0.4em] uppercase mb-8 text-center">Featured Article</div>
              <h1 class="text-7xl font-black text-white leading-[1.15] mb-10 text-center tracking-tight" style="font-family: 'Noto Sans SC', sans-serif;">
                {{ generatedData?.title || '文章标题' }}
              </h1>
              <div class="flex items-center justify-center gap-3 opacity-60">
                <div class="w-1.5 h-1.5 rounded-full bg-white"></div>
                <div class="w-1.5 h-1.5 rounded-full bg-white"></div>
                <div class="w-1.5 h-1.5 rounded-full bg-white"></div>
              </div>
            </div>
          </div>

          <!-- 3. Gradient Modern Template -->
          <div 
            v-if="selectedTemplate.id === 'gradient-modern'"
            ref="coverTemplateRef"
            class="w-[1080px] h-[460px] bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden flex items-center justify-center p-20"
          >
            <div class="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            <div class="absolute -top-1/2 -left-1/2 w-full h-full bg-white/10 blur-[120px] rounded-full"></div>
            
            <div class="w-full max-w-4xl relative z-10">
              <h1 class="text-7xl font-black text-white leading-[1.15] mb-10 text-center drop-shadow-xl tracking-tight" style="font-family: 'Noto Sans SC', sans-serif;">
                {{ generatedData?.title || '文章标题' }}
              </h1>
              <!-- <div class="flex items-center justify-center">
                <div class="px-8 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg">
                  <span class="text-white text-base font-bold tracking-widest uppercase">Weekly Best</span>
                </div>
              </div> -->
            </div>
          </div>

          <!-- 4. Accent Color Template -->
          <div 
            v-if="selectedTemplate.id === 'accent-color'"
            ref="coverTemplateRef"
            class="w-[1080px] h-[460px] bg-[#F8F9FA] relative overflow-hidden flex items-center justify-center p-20"
          >
            <div class="absolute left-0 top-0 w-3 h-full bg-blue-600"></div>
            <div class="absolute right-0 bottom-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-0"></div>
            
            <div class="w-full max-w-4xl pl-16 relative z-10">
              <div class="flex items-center gap-3 mb-8">
                <span class="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-md">
                  Recommended
                </span>
                <span class="text-gray-400 text-xs font-medium tracking-wider uppercase">Read time: 5 min</span>
              </div>
              
              <h1 class="text-7xl font-black text-gray-900 leading-[1.1] mb-8 tracking-tight" style="font-family: 'Noto Sans SC', sans-serif;">
                {{ generatedData?.title || '文章标题' }}
              </h1>
              
              <div class="w-20 h-1.5 bg-blue-600 rounded-full"></div>
            </div>
          </div>
        </div>

        <div v-if="generatedData" class="max-w-2xl mx-auto space-y-6">
          <!-- Action Bar -->
          <div class="flex items-center justify-end gap-3 sticky top-0 z-10 bg-gray-100/80 backdrop-blur-sm py-2">
            <button 
              @click="copyToClipboard('text')"
              class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all flex items-center gap-2 shadow-sm"
            >
              <Check v-if="copyStatus.text" class="w-4 h-4" />
              <Copy v-else class="w-4 h-4" />
              {{ copyStatus.text ? '已复制' : '复制正文' }}
            </button>
            <button 
              @click="copyToClipboard('md')"
              class="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-all flex items-center gap-2 shadow-sm"
            >
              <Check v-if="copyStatus.md" class="w-4 h-4" />
              <FileText v-else class="w-4 h-4" />
              {{ copyStatus.md ? '已复制' : '复制 MD' }}
            </button>
          </div>

          <!-- Preview Card -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <!-- Cover Image -->
            <div class="relative aspect-[2.35/1] bg-gray-100 group">
              <img v-if="generatedData.coverUrl" :src="generatedData.coverUrl" class="w-full h-full object-cover" alt="Article Cover" />
              <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                <Loader2 class="w-8 h-8 animate-spin" />
              </div>
              
              <!-- Cover Actions -->
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 gap-3">
                <button @click="generateCover" class="bg-white/90 text-gray-900 px-4 py-2 rounded-lg text-sm font-medium shadow-lg backdrop-blur-sm hover:bg-white transition-all flex items-center gap-2">
                  <RefreshCw class="w-4 h-4" /> 重新生成
                </button>
                <button @click="downloadCover" class="bg-blue-600/90 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg backdrop-blur-sm hover:bg-blue-600 transition-all flex items-center gap-2">
                  <Download class="w-4 h-4" /> 下载封面
                </button>
              </div>
            </div>

            <!-- Article Content -->
            <div class="p-8 md:p-10">
              <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-8 leading-tight font-serif">{{ generatedData.title }}</h2>
              
              <div class="space-y-8">
                <div v-for="(section, index) in generatedData.content" :key="index" class="prose prose-gray max-w-none">
                  <h3 class="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span class="w-1 h-6 bg-blue-600 rounded-full"></span>
                    {{ section.heading }}
                  </h3>
                  <p class="text-gray-600 leading-relaxed whitespace-pre-line">{{ section.text }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="h-full flex flex-col items-center justify-center text-gray-400">
          <div class="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-6">
            <ImageIcon class="w-10 h-10 text-gray-400" />
          </div>
          <p class="text-lg font-medium text-gray-500">在左侧输入主题开始生成</p>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Toast Notification -->
  <Toast 
    :show="toast.show" 
    :message="toast.message" 
    :type="toast.type" 
    @close="closeToast"
  />
</template>
