<script setup>
import { getVehicles } from '../../api/swapi.js';
import { onMounted, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Pagination from '../Pagination.vue';
import Modal from '../Modal.vue';

const selectedItem = ref(null);
const route = useRoute();
const router = useRouter();
const items = ref([]);
const page = ref(1);
const total = ref();
const limit = ref(10)
const isLoaded = ref(false);
const isModalOpen = ref(false);

const openModal = (persone) => {
    selectedItem.value = persone
    isModalOpen.value = true;
}
const closeModal = () => {
    isModalOpen.value = false;
    selectedItem.value = null;
}


const loadVehicleData = async (page, limit) => {
    isLoaded.value = false;
    try {
        const response = await getVehicles(page, limit);
        items.value = response.data.results;
        total.value = response.data.total_records;
        console.log(items.value);
        isLoaded.value = true;
    } catch (err) {
        console.log('Ошибка загрузка данных', err);
    };
}

function openDetails(id) {
    console.log('переход к транспорту', id);
    router.push(`/vehicle/${id}`)
}
watch(()=> route.params.page, (NewPage)=>{
    page.value = +NewPage || 1
    loadVehicleData(+NewPage || 1, limit.value)
})

onMounted(() => {
    page.value = +route.params.page || 1
    loadVehicleData(+route.params.page || 1, limit.value);
});

</script>

<template>
  <div class="relative px-4 py-10">
    <!-- background glows -->
    <div class="pointer-events-none absolute inset-0">
      <div
        class="absolute -top-24 left-1/2 h-64 w-176 -translate-x-1/2 rounded-full
               bg-linear-to-r from-cyan-500/20 via-sky-500/10 to-rose-500/15
               blur-3xl animate-pulse"
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
        <div
          v-for="vehicle in items"
          :key="vehicle.uid"
          class="w-full sm:w-[320px]"
        >
          <div class="relative rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">

            <!-- Delete button -->
            <button
              class="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center
                     rounded-xl border border-white/10 bg-white/5
                     text-white/70 transition
                     hover:bg-rose-500/15 hover:text-white
                     active:scale-[0.95]"
              @click="openModal(vehicle)"
              aria-label="Удалить карточку"
            >
              ✕
            </button>

            <!-- IMAGE -->
            <img
              src="../../assets/VehicleImage.png"
              alt="img vehicle"
              class="mx-auto h-28 w-28 rounded-full object-cover
                     border border-white/10 bg-black/30
                     shadow-[0_18px_50px_-35px_rgba(0,0,0,0.95)]"
            />

            <!-- TEXT -->
            <p v-if="vehicle.name" class="mt-4 text-base font-semibold text-white/90 text-center">
              {{ vehicle.name }}
            </p>

            <p class="mt-1 text-xs uppercase tracking-wider text-white/45 text-center">
              ID: {{ vehicle.uid }}
            </p>

            <!-- ACTION -->
            <button
              class="group/btn relative mt-5 inline-flex w-full items-center justify-center overflow-hidden
                     rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5
                     text-sm font-bold text-white/90 backdrop-blur-xl
                     transition-all duration-300
                     hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-white/10
                     active:translate-y-0 active:scale-[0.98]"
              @click="openDetails(vehicle.uid)"
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

        <!-- MODAL-->
        <Modal
          v-if="isModalOpen"
          title="Удалить карточку?"
          @close="closeModal"
        >
          <p class="text-white/80">
            Точно удалить
            <b class="text-white">{{ selectedItem?.name }}</b>?
          </p>

          <div class="mt-5 flex gap-3">
            <button
              class="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5
                     text-sm font-semibold text-white/80 transition
                     hover:bg-white/10 active:scale-[0.98]"
              @click="closeModal"
            >
              Отмена
            </button>

            <button
              class="flex-1 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-2.5
                     text-sm font-semibold text-white/90 transition
                     hover:bg-rose-500/20 active:scale-[0.98]"
              @click="closeModal"
            >
              Удалить
            </button>
          </div>
        </Modal>

      </div>

      <!-- PAGINATION -->
      <div v-if="total > limit" class="mt-10 flex items-center justify-center gap-3">
        <Pagination :total="total" entity="vehicle" :page="page" :limit="limit" />
      </div>
    </div>
  </div>
</template>


<style scoped></style>