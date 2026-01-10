<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
const route = useRoute();
const router = useRouter();
const persone = ref({});
const detailUrl = `https://www.swapi.tech/api/people/`

function goBackPage(){
    router.back();
}

onMounted(async()=>{
    const id = route.params.id;
    try {
        const res = await axios.get(detailUrl+`${id}`);
        persone.value = res.data.result.properties;
    } catch (error) {
        console.log(error,ошибка)
    }
})
</script>

<template>
    <div class="person-data-container">
        <div class="person-data" v-if="persone.name">
            <!--{{  persone.name }}
            <div v-for="key in ['gender','mass','skin_color','hair_color','eye_color','height','birth_year']" :key="key" v-if="persone[key]">
                <p>{{ persone[key] }}</p>
            </div>-->
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
    <pre>{{ persone }}</pre>
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