<script setup>
import { RouterLink } from 'vue-router';
const props = defineProps({
    title: String,
    to: String
});
</script>

<template>
    <router-link :to='to' class="title">
        <h2>{{ title }}</h2>
    </router-link>
</template>

<style scoped>
.title{
    border: 1px solid;
    border-radius: 5%;
    padding: 10px 20px;
    text-decoration: none;
    color: black;
}
.title:hover{
    transition: 0.1s all;
    color: grey;
}
</style>