<script setup>
import Navigation from './components/Navigation.vue';


</script>

<template>
    <div class="nameHeader">StarWars API</div>
    <Navigation class="nav-block"/>
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
.nav-block{
    margin: 25px 20px 40px 20px;
}
</style>
