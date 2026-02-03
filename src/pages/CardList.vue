<script setup>
import {onMounted, ref} from 'vue';
import { useRouter } from 'vue-router';
import PersoneCard from '../components/PersoneCard.vue';
import axios from 'axios';
const router = useRouter();
const items = ref([]);
const page = ref(1);
const totalPages = ref(0);
const limit = ref(10)

const urlPeople = `https://www.swapi.tech/api/people/`

const loadPersoneData = async(url,page,limit)=>{
    try{
        const response = await axios.get(url+`?page=${page.value}&limit=${limit.value}`);
        items.value = response.data.results;
        totalPages.value = response.data.total_pages;
    } catch (err) {
        console.log('Ошибка загрузка данных',err);
    }
};

const nextPage = () => {
    if (page.value < totalPages.value){
        page.value++;
        loadPersoneData(urlPeople,page,limit);
    }
};
const prevPage = () => {
    if (page.value > 1){
        page.value--;
        loadPersoneData(urlPeople,page,limit);
    }
}

onMounted(()=>{
    loadPersoneData(urlPeople,page,limit);
});
</script>

<template>
    <div class="card-container">
        <PersoneCard v-for="card in items" :key="card.uid" :persone="card"/>
    </div>
    <div class="pagination">
        <span>{{ page }} / {{ totalPages }}</span>
        <button @click="prevPage" :disabled="page===1">Назад</button>
        <button @click="nextPage" :disabled="page===totalPages">Вперёд</button>
    </div>

</template>

<style scoped>
    .card-container{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 20px
    }
    .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 40px;
    font-family: 'Arial', sans-serif;
    color: #000000;
    }
    .pagination span {
    font-size: 16px;
    min-width: 40px;
    text-align: center;
    color: #000000;
    }
    .pagination button {
    background: #4f4f4f;
    border: none;
    border-radius: 6px;
    padding: 6px 12px;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
    }
    .pagination button:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgb(15, 235, 255);
    }
    .pagination button:disabled {
    background: #555;
    cursor: not-allowed;  
    opacity: 0.6;
    }
</style>
