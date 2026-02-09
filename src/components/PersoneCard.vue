<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const isImageLoaded = ref(false);

const props = defineProps({
    persone: Object,
    image: String
});

const onImageLoaded = () => {
    isImageLoaded.value = true;
}

function openDetails() {
    console.log('переход к персонажу', props.persone.uid);
    router.push(`/people/${props.persone.uid}`)
}

</script>

<template>
  <div
    class="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl
           shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_25px_70px_-45px_rgba(0,0,0,0.9)]
           transition-all duration-300
           hover:-translate-y-1 hover:bg-white/10 hover:border-cyan-400/25"
  >
    <!-- glow -->
    <div class="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
      <div class="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl"></div>
      <div class="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-rose-500/15 blur-3xl"></div>
    </div>

    <div class="relative flex flex-col items-center text-center">
      <p v-if="persone.name" class="text-base font-semibold text-white/90">
        {{ persone.name }}
      </p>
      <p class="mt-1 text-xs uppercase tracking-wider text-white/45">
        ID: {{ persone.uid }}
      </p>

      <!-- Avatar -->
      <div
        class="mt-4 h-28 w-28 overflow-hidden rounded-full border border-white/10 bg-black/30
               shadow-[0_18px_50px_-35px_rgba(0,0,0,0.95)]
               transition duration-300 group-hover:scale-[1.03]"
      >
        <img
          class="h-full w-full object-cover opacity-95 transition duration-300 group-hover:opacity-100"
          :src="`https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${persone.uid}.jpg`"
          :alt="persone.name"
        />
      </div>

      <!-- Button -->
      <button
        @click="openDetails"
        class="group/btn relative mt-5 inline-flex items-center justify-center overflow-hidden
               rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5
               text-sm font-bold text-white/90 backdrop-blur-xl
               transition-all duration-300
               hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-white/10
               active:translate-y-0 active:scale-[0.98]"
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
</template>

<style scoped>
/* всё на Tailwind */
</style>