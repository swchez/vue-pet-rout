<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
const route = useRoute();
const router = useRouter();
const persone = ref({});

function goBackPage(){
    router.back();
}

onMounted(()=>{
    const id = route.params.id;
    axios.get(`https://www.swapi.tech/api/people/${id}`)
    .then(res => {
        persone.value = res.data.result.properties;
    })
})
</script>

<template>
    <div class="person-data-container">
        <div class="person-data" v-if="persone.name">
            <h2> {{  persone.name }}</h2>
            <p v-if="persone.gender" > Пол: {{ persone.gender }}</p>
            <p v-if="persone.mass" > Масса: {{ persone.mass }}</p>
            <p v-if="persone.skin_color" > Цвет кожи: {{ persone.skin_color }}</p>
            <p v-if="persone.hair_color" > Цвет волос: {{ persone.hair_color }}</p>
            <p v-if="persone.eye_color" > Цвет глаз: {{ persone.eye_color }}</p>
            <p v-if="persone.height" > Рост: {{ persone.height }}</p>
            <p v-if="persone.birth_year" > Год рождения: {{ persone.birth_year }}</p>
            <button @click="goBackPage" style="font-size: 20px;border-radius: 10px;padding: 10px 10px;">Назад</button>
        </div>
    </div>
</template>

<style scoped>
    .person-data-container {
        /*display: flex;*/
        justify-content: center;
        align-items: center;
        height: 80vh;
    }

   .person-data {
        text-align: center;
        font-size: 30px;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 15px;
        background-color: rgba(78, 109, 124, 0.2);
}
</style>