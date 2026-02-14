<script setup>
import { getPersones } from '../../api/swapi.js';
import { onMounted, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Pagination from '../Pagination.vue';

const router = useRouter();
const route = useRoute();
const items = ref([]);
const page = ref(1);

const limit = ref(10)
const isLoaded = ref(false);
const total = ref()

const loadPersoneData = async (page, limit) => {
    isLoaded.value = false;
    try {
        const response = await getPersones(page, limit);
        items.value = response.data.results;
        //totalPages.value = response.data.total_pages;
        total.value = response.data.total_records;
        console.log(items.value);
        isLoaded.value = true;
    } catch (err) {
        console.log('Ошибка загрузка данных', err);
    };
}

function openDetails(id) {
    console.log('переход к персонажу', id);
    router.push(`/people/${id}`)
}

watch( () => route.params.page, (newPage) => {
    page.value = +newPage || 1
    loadPersoneData(+newPage || 1, limit.value)
})

onMounted(() => {
    page.value = +route.params.page || 1
    loadPersoneData(+route.params.page || 1, limit.value);
});

</script>

<template>
  <div class="relative px-4 py-10">
    <!-- background glows -->
    <div class="pointer-events-none absolute inset-0">
      <div
        class="absolute -top-24 left-1/2 h-64 w-176 -translate-x-1/2 rounded-full
               bg-linear-to-r from-cyan-500/20 via-sky-500/10 to-rose-500/15 blur-3xl animate-pulse"
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
            <div class="mt-2 h-3 w-1/2 mx-auto rounded bg-white/10"></div>
            <div class="mt-5 h-9 w-32 mx-auto rounded-xl bg-white/10"></div>
          </div>
        </div>
      </div>

      <!-- REAL CARDS -->
      <div v-else class="flex flex-wrap justify-center gap-6">
        <div v-for="persone in items" :key="persone.uid" class="w-full sm:w-[320px]">
          <div class="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">

            <!-- IMAGE -->
            <div class="flex justify-center">
              <div
                class="h-28 w-28 overflow-hidden rounded-full border border-white/10 bg-black/30
                       shadow-[0_18px_50px_-35px_rgba(0,0,0,0.95)]
                       transition duration-300"
              >
                <img
                  class="h-full w-full object-cover opacity-95 transition duration-300"
                  :src="`https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${persone.uid}.jpg`"
                  :alt="persone.name"
                />
              </div>
            </div>

            <!-- TEXT -->
            <p v-if="persone.name" class="mt-4 text-base font-semibold text-white/90 text-center">
              {{ persone.name }}
            </p>

            <p class="mt-1 text-xs uppercase tracking-wider text-white/45 text-center">
              ID: {{ persone.uid }}
            </p>

            <!-- ACTION -->
            <button
              class="group/btn relative mt-5 inline-flex w-full items-center justify-center overflow-hidden
                     rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5
                     text-sm font-bold text-white/90 backdrop-blur-xl
                     transition-all duration-300
                     hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-white/10
                     active:translate-y-0 active:scale-[0.98]"
              @click="openDetails(persone.uid)"
            >
              <span class="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover/btn:opacity-100">
                <span class="absolute inset-0 bg-linear-to-r from-cyan-400/20 via-sky-400/10 to-rose-400/20 blur-xl"></span>
              </span>

              <span class="relative flex items-center gap-2">
                Подробнее
                <span class="transition group-hover/btn:translate-x-0.5">→</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- PAGINATION -->
      <div v-if="total > limit" class="mt-10 flex items-center justify-center gap-3">
        <Pagination :total="total" entity="people" :page="page" :limit="limit"/>
      </div>
    </div>
  </div>
</template>



<style scoped></style>