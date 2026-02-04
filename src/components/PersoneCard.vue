<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps({
    persone: Object,
    image: String
});

function openDetails() {
    console.log('переход к персонажу', props.persone.uid);
    router.push(`/people/${props.persone.uid}`)
}

</script>

<template>
    <div class="card">
        <p v-if="persone.name" style="font-size: 20px">Имя : {{ persone.name }}</p>
        <p v-if="persone.gender">Пол : {{ persone.gender }}</p>
        <p v-if="persone.eye_color">Цвет глаз: {{ persone.eye_color }}</p>
        <p v-if="persone.mass">Масса: {{ persone.mass }}</p>
        <img v-if="image" :src="image" :alt="persone.name" class="card-image" />
        <button @click="openDetails" style="font-size: 20px;border-radius: 10px;padding: 10px 10px;">Подробнее</button>
    </div>
</template>

<style scoped>
.card {
    width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 15px;
    background-color: rgba(78, 109, 124, 0.44);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 10px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
</style>