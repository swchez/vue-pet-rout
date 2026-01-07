<script setup>
import {onMounted, ref} from 'vue';
import { useRouter } from 'vue-router';
import PersoneCard from './PersoneCard.vue';
import axios from 'axios';
const router = useRouter();
const items = ref([]);

const loadPersoneData = ((url = `https://www.swapi.tech/api/people/`)=>{
    axios.get(url)
    .then((res)=>{
        items.value.push(...res.data.results);
        if(res.data.next) { loadPersoneData(res.data.next)}
    })
    .catch( err => {
        console.log(err, 'ошибка')
    })
})
function goToDetails(uid){
    console.log('переход к персонажу', uid);
    router.push(`/people/${uid}`)
}

onMounted(()=>{
    loadPersoneData()
})
</script>

<template>
    <div class="card-container">
        <PersoneCard v-for="card in items" :key="card.uid" :persone="card" @open="goToDetails"/>
    </div>
</template>

<style scoped>
    .card-container{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 20px
    }
</style>
