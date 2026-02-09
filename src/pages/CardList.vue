<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import PersoneCard from '../components/PersoneCard.vue';
import { getPersones } from '../api/swapi.js';
import { getPersoneImagesForPage } from '../api/images.js';
const router = useRouter();
const items = ref([]);
const page = ref(1);
const totalPages = ref(0);
const limit = ref(10)
const images = ref([]);
const isLoaded = ref(false);


const loadPersoneData = async (page, limit) => {
    isLoaded.value = false;
    try {
        const response = await getPersones(page.value, limit.value);
        items.value = response.data.results;
        totalPages.value = response.data.total_pages;
        console.log(items.value);
        images.value = await getPersoneImagesForPage(items.value);
        isLoaded.value = true;
    } catch (err) {
        console.log('Ошибка загрузка данных', err);
    };
}

const nextPage = () => {
    if (page.value < totalPages.value) {
        page.value++;
        loadPersoneData(page, limit);
    }
};
const prevPage = () => {
    if (page.value > 1) {
        page.value--;
        loadPersoneData(page, limit);
    }
}

onMounted(() => {
    loadPersoneData(page, limit);
});
</script>
<template>
  <div class="relative px-4 py-10">
    <!-- background glows -->
    <div class="pointer-events-none absolute inset-0">
      <div
        class="absolute -top-24 left-1/2 h-64 w-[44rem] -translate-x-1/2 rounded-full
               bg-gradient-to-r from-cyan-500/20 via-sky-500/10 to-rose-500/15 blur-3xl animate-pulse"
      ></div>
      <div class="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl"></div>
    </div>

    <div class="relative mx-auto max-w-6xl px-4 pb-12">
      <!-- SKELETON -->
      <div v-if="!isLoaded" class="flex flex-wrap justify-center gap-6">
        <div v-for="i in 10" :key="i" class="w-full sm:w-[320px]">
          <div class="animate-pulse rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <div class="mx-auto h-28 w-28 rounded-full bg-white/10"></div>
            <div class="mt-4 h-4 w-2/3 mx-auto rounded bg-white/10"></div>
            <div class="mt-5 h-9 w-32 mx-auto rounded-xl bg-white/10"></div>
          </div>
        </div>
      </div>

      <!-- REAL CARDS -->
      <div v-else class="flex flex-wrap justify-center gap-6">
        <div v-for="(persone, index) in items" :key="persone.uid" class="w-full sm:w-[320px]">
          <PersoneCard :persone="persone" :image="images[index]" />
        </div>
      </div>

      <!-- PAGINATION (НЕ ПРОПАДАЕТ) -->
      <div v-if="totalPages > 0" class="mt-10 flex items-center justify-center gap-3">
        <div class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur">
          <span class="font-semibold">{{ page }}</span>
          <span class="text-white/40">/</span>
          <span class="font-semibold">{{ totalPages }}</span>
        </div>

        <button
          @click="prevPage"
          :disabled="page === 1 || !isLoaded"
          class="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl
                 border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-bold text-white/90 backdrop-blur-xl
                 transition-all duration-300
                 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-white/10
                 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          <span class="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
            <span class="absolute inset-0 bg-gradient-to-r from-cyan-400/15 via-sky-400/10 to-transparent blur-xl"></span>
          </span>
          <span class="relative flex items-center gap-2">← Назад</span>
        </button>

        <button
          @click="nextPage"
          :disabled="page === totalPages || !isLoaded"
          class="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl
                 border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-bold text-white/90 backdrop-blur-xl
                 transition-all duration-300
                 hover:-translate-y-0.5 hover:border-rose-400/30 hover:bg-white/10
                 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          <span class="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
            <span class="absolute inset-0 bg-gradient-to-r from-transparent via-sky-400/10 to-rose-400/15 blur-xl"></span>
          </span>
          <span class="relative flex items-center gap-2">Вперёд →</span>
        </button>
      </div>
    </div>
  </div>
</template>



<style scoped>
/* всё на Tailwind */
</style>