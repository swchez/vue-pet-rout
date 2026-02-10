<script setup>
import TitlesHome from '@/components/TitlesHome.vue';
</script>

<template>
  <div class="relative px-4 py-10">

    <!-- background glows -->
    <div class="pointer-events-none absolute inset-0">
      <div
        class="absolute -top-20 left-1/2 h-64 w-176 -translate-x-1/2 rounded-full
               bg-linear-to-r from-cyan-500/15 via-sky-500/10 to-rose-500/10
               blur-3xl animate-pulse"
      ></div>
      <div class="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl"></div>
    </div>

    <div class="relative mx-auto max-w-5xl px-4">
      <!-- HERO -->
      <div class="text-center">
        <h1 class="mt-2 text-3xl font-extrabold tracking-tight text-white">
          StarWars info
        </h1>
        <p class="mt-2 text-sm text-white/70">
          Выбирай сущность и смотри детальную информацию
        </p>
      </div>

      <!-- TILES -->
      <div class="mt-10 flex flex-wrap justify-center gap-6">
        <TitlesHome title="Персонажи" to="/people" />
        <TitlesHome title="Планеты" to="/planet" />
        <TitlesHome title="Транспорт" to="/vehicle" />
      </div>
    </div>
  </div>
</template>


<style scoped>
/* всё на Tailwind */
</style>