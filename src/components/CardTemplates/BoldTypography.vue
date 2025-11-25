<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

// Split title for visual impact if needed, or just use as is
const titleParts = computed(() => {
  // Simple logic to split title into 2 lines if it's long
  const t = props.data.title
  if (t.length > 8) {
    const mid = Math.floor(t.length / 2)
    return [t.slice(0, mid), t.slice(mid)]
  }
  return [t]
})

const keywords = computed(() => {
  // Extract keywords from tags or just use first few chars of content
  return props.data.tags.slice(0, 2).map(t => t.replace('#', ''))
})
</script>

<template>
  <div 
    id="card-preview"
    class="w-[320px] h-[426px] bg-white flex flex-col relative overflow-hidden shadow-2xl transition-all duration-500"
  >
    <!-- Background Texture (Grid) -->
    <div class="absolute inset-0 opacity-10 pointer-events-none" 
         style="background-image: radial-gradient(#000 1px, transparent 1px); background-size: 20px 20px;">
    </div>

    <!-- Top Icon/Decoration -->
    <div class="p-6 pb-2 flex justify-between items-start">
      <div class="flex flex-col gap-1">
        <div class="w-8 h-8 border-2 border-black rounded-full flex items-center justify-center">
          <span class="text-xl font-bold">!</span>
        </div>
        <span class="text-xs font-bold tracking-widest text-gray-500">NOTES</span>
      </div>
      <div class="text-xs font-mono text-gray-400">
        {{ new Date().toLocaleDateString() }}
      </div>
    </div>

    <!-- Main Title Section -->
    <div class="px-6 py-4 flex-1 flex flex-col justify-center z-10">
      <div class="space-y-2">
        <h1 v-for="(part, index) in titleParts" :key="index"
            class="text-5xl font-black leading-[1.1] tracking-tight text-gray-900"
        >
          <span class="relative inline-block z-10">
            {{ part }}
            <!-- Highlight effect for the first part -->
            <span v-if="index === 0" class="absolute -bottom-1 left-0 w-full h-4 bg-yellow-300 -z-10 -rotate-1"></span>
          </span>
        </h1>
      </div>
      
      <!-- Subtitle / Hook -->
      <p class="mt-6 text-lg font-bold text-gray-700 border-l-4 border-black pl-3 line-clamp-4">
        {{ data.content }}
      </p>
    </div>

    <!-- Bottom Keywords/Tags -->
    <div class="p-6 pt-0 mt-auto">
      <div class="flex flex-wrap gap-3">
        <div v-for="(kw, i) in keywords" :key="i"
             :class="[
               'px-4 py-2 border-2 border-black font-bold text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
               i % 2 === 0 ? 'bg-pink-200' : 'bg-blue-200'
             ]"
        >
          {{ kw }}
        </div>
      </div>
      
      <!-- Emoji decoration -->
      <div class="absolute bottom-4 right-4 text-6xl opacity-20 rotate-12 pointer-events-none">
        🤔
      </div>
    </div>
  </div>
</template>
