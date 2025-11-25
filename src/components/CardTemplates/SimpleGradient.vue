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
    :class="['w-[320px] h-[426px] p-8 flex flex-col justify-between text-white shadow-2xl rounded-2xl transition-all duration-500', data.bgStyle]"
  >
    <!-- Header/Title -->
    <div class="space-y-4">
      <div class="w-12 h-1 bg-white/50 rounded-full"></div>
      <h1 class="text-4xl font-bold leading-tight tracking-tight drop-shadow-md line-clamp-3">
        {{ data.title }}
      </h1>
    </div>

    <!-- Content Body -->
    <div class="flex-1 mt-6 overflow-hidden">
      <p class="text-base font-medium opacity-95 leading-relaxed whitespace-pre-wrap drop-shadow-sm line-clamp-[8]">
        {{ data.content }}
      </p>
    </div>

    <!-- Footer/Tags -->
    <div class="mt-6 pt-4 border-t border-white/20">
      <div class="flex gap-2 flex-wrap">
        <span 
          v-for="tag in data.tags" 
          :key="tag" 
          class="text-xs font-bold bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full"
        >
          {{ tag }}
        </span>
      </div>
      <!-- <div class="mt-4 flex items-center gap-2 opacity-80">
        <div class="w-6 h-6 rounded-full bg-white/30"></div>
        <span class="text-xs font-medium">@我的小红书号</span>
      </div> -->
    </div>
  </div>
</template>
