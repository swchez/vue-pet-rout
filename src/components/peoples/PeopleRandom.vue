<script setup>
import { getPersoneById } from '../../api/swapi.js';
import { ref, onMounted } from 'vue';
const totalCount = ref(82);
const currentId = ref();
const currentPeople = ref({});
const counter = ref(0);
const isLoading = ref(true);

const fields = [
    { name: 'Возраст', slug: 'birth_year' },
    { name: 'Пол', slug: 'gender' },
    { name: 'Цвет кожи', slug: 'skin_color' },
    { name: 'Цвет волос', slug: 'hair_color' },
    { name: 'Рост', slug: 'height' },
    { name: 'Вес', slug: 'mass' },
]

const getRandomid = () => {
    return currentId.value = Math.floor(Math.random()*totalCount.value+1);
}

const getRandomPeople = async (id) => {
    try {
        const res = await getPersoneById(id);
        currentPeople.value = res.data.result.properties;
        console.log(currentPeople)
        counter.value = 0;
        isLoading.value = false;
    } catch (error) {
        if ( error.response && error.response.status === 404 && counter.value<5 ){
            counter.value++;
            getRandomid();
            getRandomPeople(currentId.value)
        } else {
            console.log(error,'ошибка')
        }
    }
};

const RefreshRandom = () => {
    isLoading.value = true;
    getRandomPeople(getRandomid());
}

onMounted(async()=>{
    await getRandomPeople(getRandomid());
})

</script>

<template>
  <div class="relative mb-10">
    <!-- glow background -->
    <div class="pointer-events-none absolute inset-0">
      <div
        class="absolute -top-16 left-1/2 h-44 w-[28rem] -translate-x-1/2 rounded-full
               bg-linear-to-r from-cyan-500/20 via-sky-500/10 to-rose-500/15 blur-3xl animate-pulse"
      ></div>
    </div>

    <!-- SKELETON -->
    <div
      v-if="isLoading"
      class="relative mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-5
             backdrop-blur-xl animate-pulse"
    >
      <div class="mb-4 flex items-center justify-between">
        <div>
          <div class="h-5 w-40 rounded bg-white/10"></div>
          <div class="mt-2 h-3 w-20 rounded bg-white/10"></div>
        </div>
        <div class="h-9 w-28 rounded-2xl bg-white/10"></div>
      </div>

      <div class="flex flex-col md:flex-row md:items-center gap-6">
        <div class="flex justify-center md:w-[200px]">
          <div class="h-36 w-36 rounded-full bg-white/10"></div>
        </div>

        <div class="flex-1 space-y-3">
          <div class="h-4 w-48 rounded bg-white/10"></div>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div
              v-for="i in 6"
              :key="i"
              class="h-12 rounded-xl bg-white/10"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- RANDOM CARD -->
    <div
      v-else-if="Object.keys(currentPeople).length"
      class="relative mx-auto max-w-3xl rounded-3xl
             border border-white/10 bg-white/5 p-5 backdrop-blur-xl
             shadow-[0_25px_70px_-45px_rgba(0,0,0,0.85)]"
    >
      <!-- header -->
      <div class="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 class="text-xl font-extrabold text-white">
            Случайный персонаж
          </h2>
          <p class="mt-1 text-xs text-white/60">
            ID: {{ currentId }}
          </p>
        </div>

        <button
          @click="RefreshRandom"
          :disabled="isLoading"
          class="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl
                 border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white/90 backdrop-blur-xl
                 transition-all duration-300
                 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-white/10
                 disabled:opacity-40 disabled:cursor-not-allowed
                 disabled:hover:translate-y-0 disabled:hover:border-white/10"
        >
          <span class="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
            <span class="absolute inset-0 bg-linear-to-r from-cyan-400/20 via-sky-400/10 to-rose-400/20 blur-xl"></span>
          </span>
          <span class="relative flex items-center gap-2">
            Обновить
            <span class="transition group-hover:rotate-180">↻</span>
          </span>
        </button>
      </div>

      <div class="flex flex-col md:flex-row md:items-center gap-6">
        <!-- IMAGE -->
        <div class="flex justify-center md:w-[200px] shrink-0">
          <div
            class="h-36 w-36 overflow-hidden rounded-full border border-white/10 bg-black/30
                   shadow-[0_16px_40px_-30px_rgba(0,0,0,0.9)]"
          >
            <img
              :src="`https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${currentId}.jpg`"
              :alt="currentPeople.name"
              class="h-full w-full object-cover opacity-95"
            />
          </div>
        </div>

        <!-- INFO -->
        <div class="flex flex-1 flex-col gap-3">
          <h3 class="text-lg font-semibold text-white text-center md:text-left">
            {{ currentPeople.name }}
          </h3>

          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div
              v-for="field in fields"
              :key="field.slug"
              class="rounded-xl border border-white/10 bg-white/5 px-3 py-2
                     backdrop-blur transition hover:bg-white/10"
            >
              <div class="text-[10px] uppercase tracking-wide text-white/50">
                {{ field.name }}
              </div>
              <div class="text-sm font-semibold text-white/90">
                {{ currentPeople[field.slug] }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- FALLBACK -->
    <div
      v-else
      class="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-5
             text-center text-white/60 backdrop-blur-xl"
    >
      Не удалось загрузить персонажа
    </div>
  </div>
</template>


<style scoped>
</style>