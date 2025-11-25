<script setup>
import { Home, Sparkles, Settings, Menu, FileText } from 'lucide-vue-next'
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { name: '首页', path: '/', icon: Home },
  { name: '爆款生成器', path: '/viral-generator', icon: Sparkles },
  { name: '公众号文章', path: '/wechat-article-generator', icon: FileText },
]
</script>

<template>
  <div class="h-screen overflow-hidden bg-gray-50 flex font-sans">
    <!-- Main Navigation Sidebar -->
    <aside class="w-20 bg-gray-900 text-white flex flex-col items-center py-6 gap-8 fixed h-full z-50">
      <!-- Logo -->
      <div class="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20">
        <span class="text-xl font-bold">A</span>
      </div>

      <!-- Nav Items -->
      <nav class="flex-1 flex flex-col gap-4 w-full px-2">
        <router-link 
          v-for="item in navItems" 
          :key="item.path" 
          :to="item.path"
          class="w-full aspect-square rounded-xl flex flex-col items-center justify-center gap-1 text-[10px] transition-all duration-300 group relative"
          :class="route.path === item.path ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'"
        >
          <component :is="item.icon" class="w-6 h-6" :class="route.path === item.path ? 'text-red-400' : 'group-hover:text-red-400 transition-colors'" />
          <span>{{ item.name }}</span>
          
          <!-- Active Indicator -->
          <div v-if="route.path === item.path" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-red-500 rounded-r-full"></div>
        </router-link>
      </nav>

      <!-- Bottom Actions -->
      <div class="w-full px-2 flex flex-col gap-4">
        <button class="w-full aspect-square rounded-xl flex items-center justify-center text-gray-400 hover:bg-white/5 hover:text-white transition-all">
          <Settings class="w-6 h-6" />
        </button>
        <div class="w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-600"></div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="flex-1 ml-20 h-full overflow-hidden">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" class="h-full" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
