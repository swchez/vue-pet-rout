<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPersoneById, getByurl } from '../api/swapi.js'

const route = useRoute();
const router = useRouter();
const persone = ref({});
const films = ref([]);
const isLoaded = ref(false);

const loadFilms = async(urls) =>{
    try {
        const requests = urls.map( url => getByurl(url));
        const responses = await Promise.all(requests);
        films.value = responses.map( response => response.data.result.properties.title);
    } catch (error) {
        console.log('Error loading films', error);
    }
}
function goBackPage(){
    router.back();
}
const fields = [
    {name:'Возраст', slug:'birth_year'},
    {name:'Пол', slug:'gender'},
    {name:'Цвет кожи', slug:'skin_color'},
    {name:'Цвет волос', slug:'hair_color'},
    {name:'Рост', slug:'height'},
    {name:'Вес', slug:'mass'},
]

onMounted(async()=>{
    const id = route.params.id;
    try {
        const res = await getPersoneById(id);
        persone.value = res.data.result.properties;
        if (persone.value.films?.length){
            await loadFilms(persone.value.films)
        }
        isLoaded.value = !isLoaded.value;
    } catch (error) {
        console.log('error',ошибка)
    }
})
</script>

<template>
    <div class="person-data-container">
        <div class="person-data" v-if="isLoaded">
            <h2>{{  persone.name }}</h2>
                <div v-for="field in fields" :key="field.slug">
                    {{ field.name }} - {{ persone[field.slug] }}
                </div>
                <div v-if="films.length">
                    Фильмы:
                    <ul>
                        <li v-for="film in films" :key="film">{{ film }}</li>
                    </ul>
                </div>
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