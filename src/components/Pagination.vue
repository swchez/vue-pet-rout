<script setup>
import { ref } from 'vue';
const props = defineProps({
    entity: String,
    total: Number,
    page: Number,
    limit: Number
});
const totalPages = ref();

const getTotalPages = () => {
    return totalPages.value = Math.ceil((props.total || 0)/props.limit);
}

const pageLink = (n) =>{
    return (`/${props.entity}/page/${n}`)
}
const nextPage = () => {
    if (props.page<totalPages.value){
        return (`/${props.entity}/page/${props.page+1}`)
    }
}
const prevPage = () => {
    if (props.page>1){ 
        return (`/${props.entity}/page/${props.page-1}`)
    }
}
</script>

<template>
  <div class="mt-10 flex items-center justify-center">
    <div
      class="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl
             shadow-[0_18px_50px_-35px_rgba(0,0,0,0.95)]"
    >
      <!-- PREV -->
      <router-link
        v-if="props.page > 1"
        :to="prevPage()"
        class="group relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl
               border border-white/10 bg-white/5 text-white/90 backdrop-blur-xl transition-all duration-300
               hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-white/10 active:translate-y-0 active:scale-[0.98]"
        aria-label="Previous page"
      >
        <span class="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
          <span class="absolute inset-0 bg-linear-to-r from-cyan-400/20 via-sky-400/10 to-rose-400/20 blur-xl"></span>
        </span>
        <span class="relative text-lg leading-none">←</span>
      </router-link>

      <span
        v-else
        class="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5
               text-white/30 opacity-60 cursor-not-allowed"
        aria-hidden="true"
      >
        ←
      </span>

      <!-- PAGES -->
      <div class="flex items-center gap-2 px-1">
        <router-link
          v-for="n in totalPages"
          :key="n"
          :to="pageLink(n)"
          class="group relative inline-flex h-10 min-w-10 items-center justify-center overflow-hidden rounded-2xl
                 border border-white/10 bg-white/5 px-3 text-sm font-bold text-white/80 backdrop-blur-xl
                 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:border-white/20
                 active:translate-y-0 active:scale-[0.98]"
          :class="n === props.page
            ? 'border-cyan-400/40 bg-white/10 text-white shadow-[0_0_0_1px_rgba(34,211,238,0.25)]'
            : ''"
          :aria-current="n === props.page ? 'page' : undefined"
        >
          <span class="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
            <span class="absolute inset-0 bg-linear-to-r from-cyan-400/15 via-sky-400/10 to-rose-400/15 blur-xl"></span>
          </span>
          <span class="relative">{{ n }}</span>
        </router-link>
      </div>

      <!-- NEXT -->
      <router-link
        v-if="props.page < getTotalPages()"
        :to="nextPage()"
        class="group relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl
               border border-white/10 bg-white/5 text-white/90 backdrop-blur-xl transition-all duration-300
               hover:-translate-y-0.5 hover:border-rose-400/30 hover:bg-white/10 active:translate-y-0 active:scale-[0.98]"
        aria-label="Next page"
      >
        <span class="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
          <span class="absolute inset-0 bg-linear-to-r from-cyan-400/20 via-sky-400/10 to-rose-400/20 blur-xl"></span>
        </span>
        <span class="relative text-lg leading-none">→</span>
      </router-link>

      <span
        v-else
        class="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5
               text-white/30 opacity-60 cursor-not-allowed"
        aria-hidden="true"
      >
        →
      </span>
    </div>
  </div>
</template>



<style scoped>
</style>