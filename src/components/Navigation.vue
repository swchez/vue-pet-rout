<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav
    class="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2
           backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
  >
    <router-link
      to="/home"
      class="group relative inline-flex items-center justify-center rounded-xl px-4 py-2
             text-sm font-bold text-white/75 transition-all duration-300
             hover:-translate-y-0.5 hover:bg-white/10 hover:text-white hover:border-cyan-400/30
             border border-transparent"
      active-class="!text-white !border-white/10 !bg-white/10"
    >
      <span class="relative">Главная</span>

      <!-- active underline -->
      <span
        class="pointer-events-none absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full
               bg-linear-to-r from-cyan-400/80 via-sky-400/40 to-rose-400/60
               transition-all duration-300
               group-[.router-link-active]:w-3/4"
      />
    </router-link>

    <router-link
      to="/people"
      class="group relative inline-flex items-center justify-center rounded-xl px-4 py-2
             text-sm font-bold text-white/75 transition-all duration-300
             hover:-translate-y-0.5 hover:bg-white/10 hover:text-white hover:border-rose-400/30
             border border-transparent"
      active-class="!text-white !border-white/10 !bg-white/10"
    >
      <span class="relative">Персонажи</span>

      <!-- active underline -->
      <span
        class="pointer-events-none absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full
               bg-linear-to-r from-cyan-400/80 via-sky-400/40 to-rose-400/60
               transition-all duration-300
               group-[.router-link-active]:w-3/4"
      />
    </router-link>
    <router-link
      to="/planet"
      class="group relative inline-flex items-center justify-center rounded-xl px-4 py-2
             text-sm font-bold text-white/75 transition-all duration-300
             hover:-translate-y-0.5 hover:bg-white/10 hover:text-white hover:border-rose-400/30
             border border-transparent"
      active-class="!text-white !border-white/10 !bg-white/10"
    >
      <span class="relative">Планеты</span>

      <!-- active underline -->
      <span
        class="pointer-events-none absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full
               bg-linear-to-r from-cyan-400/80 via-sky-400/40 to-rose-400/60
               transition-all duration-300
               group-[.router-link-active]:w-3/4"
      />
    </router-link>
    <router-link
      to="/vehicle"
      class="group relative inline-flex items-center justify-center rounded-xl px-4 py-2
             text-sm font-bold text-white/75 transition-all duration-300
             hover:-translate-y-0.5 hover:bg-white/10 hover:text-white hover:border-rose-400/30
             border border-transparent"
      active-class="!text-white !border-white/10 !bg-white/10"
    >
      <span class="relative">Транспорт</span>

      <!-- active underline -->
      <span
        class="pointer-events-none absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full
               bg-linear-to-r from-cyan-400/80 via-sky-400/40 to-rose-400/60
               transition-all duration-300
               group-[.router-link-active]:w-3/4"
      />
    </router-link>
  </nav>
</template>

<style scoped>
/* всё на Tailwind */
</style>