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
    class="w-[320px] h-[426px] bg-[#0F172A] text-white flex flex-col relative overflow-hidden shadow-2xl transition-all duration-500 font-sans"
  >
    <!-- Dynamic Gradient Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#172554] to-[#1e3a8a]"></div>

    <!-- Abstract Flowing Shapes (Decorations) -->
    <div class="absolute top-[-50px] right-[-50px] w-64 h-64 bg-[#165DFF] rounded-full mix-blend-screen filter blur-[60px] opacity-40 animate-pulse"></div>
    <div class="absolute bottom-[-30px] left-[-30px] w-48 h-48 bg-[#00C6FF] rounded-full mix-blend-screen filter blur-[50px] opacity-30"></div>
    
    <!-- Tech Grid Texture -->
    <div class="absolute inset-0 opacity-10" 
         style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 40px 40px;">
    </div>

    <!-- Glassmorphism Container -->
    <div class="relative z-10 flex-1 flex flex-col p-6 bg-white/5 backdrop-blur-sm border border-white/10 m-4 rounded-2xl shadow-[0_0_15px_rgba(22,93,255,0.3)]">
      
      <!-- Header -->
      <div class="mb-6">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-2 h-2 bg-[#00C6FF] rounded-full shadow-[0_0_5px_#00C6FF]"></div>
          <span class="text-[10px] font-mono tracking-[0.2em] text-[#00C6FF] uppercase">Future Tech</span>
        </div>
        <h1 class="text-3xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00C6FF] to-[#165DFF] drop-shadow-[0_0_2px_rgba(0,198,255,0.5)] line-clamp-3">
          {{ data.title }}
        </h1>
      </div>

      <!-- Content -->
      <div class="flex-1 relative">
        <!-- Decorative Line -->
        <div class="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#00C6FF] to-transparent opacity-50"></div>
        
        <div class="pl-4 h-full flex flex-col justify-center">
          <p class="text-sm font-light leading-relaxed text-gray-200 line-clamp-6 drop-shadow-md">
            {{ data.content }}
          </p>
        </div>
      </div>

      <!-- Footer Tags -->
      <div class="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-2">
        <span 
          v-for="tag in data.tags" 
          :key="tag" 
          class="px-2 py-1 text-[10px] font-mono border border-[#165DFF]/50 rounded text-[#00C6FF] bg-[#165DFF]/10 shadow-[0_0_5px_rgba(22,93,255,0.2)]"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>
