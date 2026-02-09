<script setup>
import Navigation from './components/Navigation.vue';
</script>

<template>
  <!-- GLOBAL SCENE -->
  <div class="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">

    <!-- LIGHTSABER GLOWS -->
    <div class="pointer-events-none absolute inset-0">

      <!-- BLUE SABER -->
      <div
        class="absolute left-[-20%] top-1/3 h-[6px] w-[140%] rotate-[-18deg]
               bg-gradient-to-r from-transparent via-blue-400/90 to-transparent
               blur-sm"
      ></div>

      <div
        class="absolute left-[-25%] top-1/3 h-[120px] w-[150%] rotate-[-18deg]
               bg-blue-500/20 blur-3xl"
      ></div>

      <!-- RED SABER -->
      <div
        class="absolute right-[-20%] top-2/3 h-[6px] w-[140%] rotate-[18deg]
               bg-gradient-to-r from-transparent via-rose-500/90 to-transparent
               blur-sm"
      ></div>

      <div
        class="absolute right-[-25%] top-2/3 h-[120px] w-[150%] rotate-[18deg]
               bg-rose-500/20 blur-3xl"
      ></div>

      <!-- CROSS GLOW CENTER -->
      <div
        class="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2
               rounded-full bg-gradient-to-r from-blue-500/15 to-rose-500/15 blur-3xl"
      ></div>

      <!-- VIGNETTE -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50"></div>
    </div>

    <!-- CONTENT -->
    <div class="relative mx-auto max-w-6xl px-4 py-8">

      <!-- HEADER -->
      <header class="mb-6 flex flex-col items-center gap-4">

        <div
          class="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-6 py-3
                 text-center text-3xl font-extrabold tracking-tight text-white backdrop-blur-xl"
        >
          <!-- glow overlay -->
          <span class="pointer-events-none absolute inset-0">
            <span
              class="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-rose-500/10"
            ></span>
          </span>

          <span class="relative">
            StarWars API
          </span>
        </div>

        <Navigation />
      </header>

      <!-- PAGE -->
      <main class="pb-12">
        <router-view />
      </main>

    </div>
  </div>
</template>

<style scoped>
/* всё на Tailwind */
</style>