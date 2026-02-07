<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
<div class="nav">
    <router-link to="/home" class="link">Главная</router-link>
    <router-link to="/people" class="link">Персонажи</router-link>
</div>
</template>

<style scoped>
.nav {
  display: flex;
  justify-content: center;
  gap: 16px;
}
.link {
  text-decoration: none;
  padding: 8px 12px;
  color: black;
  font-weight: 500;
}
.link:hover{
    transition: 0.1s ease;
    color:brown; 
}
.link.router-link-active {
  border-bottom: 2.5px solid rgb(0, 0, 0);
}

.link.router-link-exact-active {
  border-bottom: 2.5px solid rgb(0, 0, 0);
}
</style>