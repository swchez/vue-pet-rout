<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPlanetById } from '../api/swapi.js'

const route = useRoute();
const router = useRouter();
const planet = ref({});
const isLoaded = ref(false);

function goBackPage() {
    router.back();
}
const fields = [
    { name: 'Климат', slug: 'climate' },
    { name: 'Диаметр', slug: 'diameter' },
    { name: 'Местность', slug: 'terrain' },
    { name: 'Гравитация', slug: 'gravity' },
    { name: 'Население', slug: 'population' },
    { name: 'Орбитальный период', slug: 'orbital_period' },
]

onMounted(async () => {
    const id = route.params.id;
    try {
        const res = await getPlanetById(id);
        planet.value = res.data.result.properties;
        isLoaded.value = !isLoaded.value;
    } catch (error) {
        console.log('ошибка', error)
    }
})
</script>

<template>
  <div class="relative px-4 py-10">
    <!-- Glows -->
    <div class="pointer-events-none absolute inset-0">
      <div
        class="absolute -top-28 left-1/2 h-72 w-176 -translate-x-1/2 rounded-full
               bg-linear-to-r from-cyan-500/25 via-sky-500/15 to-rose-500/20 blur-3xl animate-pulse"
      />
      <div
        class="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl
               animate-[pulse_4s_ease-in-out_infinite]"
      />
      <div
        class="absolute bottom-10 left-0 h-80 w-80 rounded-full bg-fuchsia-400/10 blur-3xl
               animate-[pulse_6s_ease-in-out_infinite]"
      />
    </div>

    <div class="relative mx-auto max-w-5xl">
      <!-- Header -->
      <div class="mb-6 flex items-center justify-between gap-3">
        <button
          @click="goBackPage"
          class="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2
                 text-sm font-semibold text-white/90 backdrop-blur transition
                 hover:bg-white/10 hover:border-cyan-400/30 active:scale-[0.99]"
        >
          <span class="text-base transition group-hover:-translate-x-0.5">←</span>
          Назад
        </button>

        <div
          class="hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5
                 text-xs text-white/70 backdrop-blur"
        >
          <span
            class="inline-block h-2 w-2 rounded-full bg-cyan-400/80 shadow-[0_0_18px_rgba(34,211,238,0.55)]"
          />
          Карточка планеты
        </div>
      </div>

      <!-- Main glass card -->
      <div
        v-if="isLoaded"
        class="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl
               shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_30px_90px_-50px_rgba(0,0,0,0.85)]
               transition hover:border-cyan-400/25"
      >
        <!-- subtle gradient layer inside card -->
        <div
          class="pointer-events-none absolute inset-0 bg-linear-to-br from-cyan-500/10 via-transparent to-fuchsia-500/10"
        />
        <div
          class="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-rose-500/10 blur-3xl"
        />

        <div class="relative flex flex-col gap-6 p-6 lg:flex-row">
          <!-- LEFT -->
          <div class="flex flex-col items-center lg:w-85">
            <h2
              class="mb-4 text-center text-3xl font-extrabold tracking-tight text-white
                     drop-shadow-[0_0_18px_rgba(56,189,248,0.12)]"
            >
              {{ planet.name }}
            </h2>

            <div
              class="w-full overflow-hidden rounded-2xl border border-white/10 bg-black/30
                     shadow-[0_20px_60px_-35px_rgba(0,0,0,0.9)]
                     transition hover:scale-[1.01]"
            >
              <img
                src="../assets/PlanetImage.png"
                alt="image of planet"
                class="aspect-square w-full object-cover opacity-95 transition duration-300 hover:opacity-100"
                loading="lazy"
              />
            </div>

            <!-- mini info chip -->
            <div
              class="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center backdrop-blur
                     transition hover:bg-white/10"
            >
              <div class="text-xs font-semibold uppercase tracking-wider text-white/50">
                Примечание
              </div>
              <div class="mt-1 text-sm text-white/80">
                Наведи на карточки — будет glow ✨
              </div>
            </div>
          </div>

          <!-- RIGHT -->
          <div class="flex flex-1 flex-col gap-6">
            <!-- Fields -->
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div
                v-for="field in fields"
                :key="field.slug"
                class="group flex flex-col rounded-2xl border border-white/10 bg-white/5 px-4 py-3
                       backdrop-blur transition
                       hover:bg-white/10 hover:border-cyan-400/25 hover:-translate-y-0.5"
              >
                <span class="text-xs uppercase tracking-wide text-white/50">
                  {{ field.name }}
                </span>

                <span class="mt-1 text-sm font-semibold text-white/90">
                  {{ planet[field.slug] }}
                </span>

                <span
                  class="mt-3 h-0.5 w-10 rounded-full bg-linear-to-r from-cyan-400/70 via-sky-400/30 to-transparent
                         opacity-60 transition group-hover:w-16 group-hover:opacity-100"
                />
              </div>
            </div>

            <!-- Actions -->
            <div class="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div class="text-xs text-white/45">SWAPI</div>

              <button
                @click="goBackPage"
                class="group relative inline-flex items-center justify-center overflow-hidden
                       rounded-2xl border border-white/10 bg-white/5 px-6 py-3
                       text-sm font-bold text-white backdrop-blur-xl
                       transition-all duration-300
                       hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-white/10
                       active:translate-y-0 active:scale-[0.98]"
              >
                <span
                  class="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
                >
                  <span
                    class="absolute inset-0 bg-linear-to-r from-cyan-400/20 via-sky-400/10 to-rose-400/20 blur-xl"
                  />
                </span>

                <span class="relative flex items-center gap-2">
                  <span class="transition group-hover:-translate-x-1">←</span>
                  Вернуться назад
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading state -->
      <div
        v-else
        class="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl
               shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_30px_90px_-50px_rgba(0,0,0,0.85)]"
      >
        <div class="flex flex-col gap-6 animate-pulse lg:flex-row">
          <div class="lg:w-85">
            <div class="h-8 w-2/3 rounded-lg bg-white/10"></div>
            <div class="mt-4 aspect-square w-full rounded-2xl bg-white/10"></div>
            <div class="mt-4 h-16 w-full rounded-2xl bg-white/10"></div>
          </div>

          <div class="flex-1">
            <div class="h-5 w-40 rounded bg-white/10"></div>
            <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div v-for="i in 6" :key="i" class="h-20 rounded-2xl bg-white/10"></div>
            </div>

            <div class="mt-6 h-5 w-28 rounded bg-white/10"></div>
            <div class="mt-3 flex flex-wrap gap-2">
              <div v-for="i in 5" :key="'c' + i" class="h-8 w-28 rounded-full bg-white/10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>




<style scoped>
</style>