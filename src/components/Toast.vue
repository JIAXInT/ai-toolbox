<template>
  <Transition name="toast">
    <div
      v-if="visible"
      class="fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 max-w-md"
      :class="typeClasses"
    >
      <component :is="icon" class="w-5 h-5 flex-shrink-0" />
      <p class="text-sm font-medium">{{ message }}</p>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { CheckCircle, XCircle, Info } from 'lucide-vue-next'

const props = defineProps({
  message: String,
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['success', 'error', 'info'].includes(value)
  },
  duration: {
    type: Number,
    default: 3000
  },
  show: Boolean
})

const emit = defineEmits(['close'])

const visible = ref(false)

const typeClasses = computed(() => {
  const classes = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white'
  }
  return classes[props.type]
})

const icon = computed(() => {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info
  }
  return icons[props.type]
})

watch(() => props.show, (newVal) => {
  if (newVal) {
    visible.value = true
    setTimeout(() => {
      visible.value = false
      emit('close')
    }, props.duration)
  }
})
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
