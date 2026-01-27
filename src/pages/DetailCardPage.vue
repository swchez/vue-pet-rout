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
            <h2>{{  persone.name }}</h2>
            <ul>
                <li v-for="(value,key) in persone" :key="key">
                    {{ key }} :{{ value }}>
                </li>
            </ul>
            <button @click="goBackPage" style="font-size: 20px;border-radius: 10px;padding: 10px 10px;">Назад</button>
        </div>
    </div>
</template>

<style scoped>
    .person-data-container {
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