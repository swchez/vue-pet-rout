<script setup>
import { onMounted,onUnmounted } from 'vue'
const props = defineProps({
    title: String
})
const emit = defineEmits(['close'])
const closeModal = () => emit('close')

const keyHandlerEsc = (e) => {
    if(e.key === 'Escape'){
        closeModal()
    }
}

onMounted(()=>{
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', keyHandlerEsc);
})
onUnmounted(()=>{
    document.body.style.overflow = '';
    window.removeEventListener('keydown', keyHandlerEsc);
})

</script>

<template>
  <!-- Overlay -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center px-4
           bg-black/70 backdrop-blur-sm"
    @click="closeModal"
  >
    <!-- Modal -->
    <div
      class="relative w-full max-w-lg overflow-hidden rounded-3xl
             border border-white/10 bg-white/5 p-6
             shadow-[0_40px_120px_-60px_rgba(0,0,0,0.95)]
             backdrop-blur-xl"
      @click.stop
    >
      <!-- Glow accents -->
      <div class="pointer-events-none absolute inset-0">
        <div class="absolute -top-24 left-1/2 h-56 w-96 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl"></div>
        <div class="absolute -bottom-24 right-0 h-56 w-96 rounded-full bg-rose-400/15 blur-3xl"></div>
      </div>

      <!-- Header -->
      <div class="relative flex items-start justify-between gap-4">
        <h2 class="text-lg font-semibold text-white/90">
          {{ title }}
        </h2>

        <button
          class="inline-flex h-9 w-9 items-center justify-center rounded-xl
                 border border-white/10 bg-white/5 text-white/80
                 transition hover:bg-white/10 hover:text-white
                 active:scale-[0.98]"
          type="button"
          @click="closeModal"
          aria-label="Close modal"
        >
          ✕
        </button>
      </div>

      <!-- Content -->
      <div class="relative mt-4 text-sm text-white/75">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>