<script setup>
import {onMounted, ref} from 'vue';
import PersoneCard from './components/PersoneCard.vue';
import CardList from './components/CardList.vue';

</script>

<template>
    <div class="nameHeader">StarWars API</div>
    <div class="container">
         <router-view />
    </div>
</template>

<style scoped>
.container{
    padding: auto;
}
.nameHeader{
    text-align: center;
    padding: 50px 0;
    font-size: 40px;
    font-weight: 600;
}
</style>
