<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div 
    id="card-preview"
    class="w-[320px] h-[426px] bg-slate-50 text-slate-800 flex flex-col relative overflow-hidden shadow-2xl transition-all duration-500 font-sans"
  >
    <!-- Top Brand Bar -->
    <div class="h-2 w-full bg-blue-900"></div>
    
    <!-- Header -->
    <div class="p-6 pb-4 border-b border-slate-200 bg-white">
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 bg-blue-900 rounded flex items-center justify-center text-white font-bold text-xs">
            B
          </div>
          <span class="text-xs font-bold text-slate-500 tracking-wider">BUSINESS INSIGHT</span>
        </div>
        <span class="text-[10px] font-mono text-slate-400">{{ new Date().toLocaleDateString() }}</span>
      </div>
      
      <h1 class="text-2xl font-bold leading-tight text-slate-900 line-clamp-2">
        {{ data.title }}
      </h1>
    </div>

    <!-- Main Content -->
    <div class="p-6 flex-1 bg-slate-50 overflow-hidden flex flex-col">
      <!-- Key Point Box -->
      <div class="mb-4 pl-4 border-l-4 border-blue-600 shrink-0">
        <p class="text-sm font-semibold text-slate-700 leading-relaxed line-clamp-2">
          {{ data.content }}
        </p>
      </div>
      
      <!-- Chart Placeholder (Visual Element) -->
      <div class="w-full h-24 bg-white border border-slate-200 rounded p-3 mb-4 flex items-end gap-2 shrink-0">
        <div class="w-1/5 h-[40%] bg-blue-100 rounded-t"></div>
        <div class="w-1/5 h-[70%] bg-blue-200 rounded-t"></div>
        <div class="w-1/5 h-[50%] bg-blue-300 rounded-t"></div>
        <div class="w-1/5 h-[90%] bg-blue-600 rounded-t"></div>
        <div class="w-1/5 h-[60%] bg-blue-400 rounded-t"></div>
      </div>
      
      <p class="text-xs text-slate-500 leading-relaxed line-clamp-4">
        {{ data.content }}
      </p>
    </div>

    <!-- Footer -->
    <div class="p-6 pt-4 bg-white border-t border-slate-200">
      <div class="flex flex-wrap gap-2">
        <span 
          v-for="tag in data.tags" 
          :key="tag" 
          class="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wide rounded"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>
