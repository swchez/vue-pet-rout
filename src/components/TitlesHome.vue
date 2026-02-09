<script setup>
import { RouterLink } from 'vue-router';
const props = defineProps({
    title: String,
    to: String
});
</script>

<template>
  <router-link
    :to="to"
    class="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl
           border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white/90
           backdrop-blur-xl transition-all duration-300
           hover:-translate-y-0.5 hover:bg-white/10 hover:border-cyan-400/30"
  >
    <span class="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
      <span class="absolute inset-0 bg-linear-to-r from-cyan-400/20 via-sky-400/10 to-rose-400/15 blur-xl"></span>
    </span>
    <span class="relative">{{ title }}</span>
  </router-link>
</template>

<style scoped>
/* всё на Tailwind */
</style>