<script setup>
import Navigation from './components/Navigation.vue';
</script>

<template>
    <div class='text-4xl font-medium text-black text-center mt-5'>StarWars API</div>
    <Navigation class="nav-block"/>
    <div class="container-block">
         <router-view />
    </div>
</template>

<style scoped>
.container-block{
    padding: 0 0 0 20px;
}
.nameHeader{
    text-align: center;
    padding: 50px 0;
    font-size: 40px;
    font-weight: 600;
}
.nav-block{
    margin: 25px 20px 40px 20px;
}
</style>
