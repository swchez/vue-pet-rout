<script setup>
import TitlesHome from '@/components/TitlesHome.vue';
</script>

<template>
    <div class="pages">
        <TitlesHome title="Персонажи" to="/people"></TitlesHome>
    </div>
</template>

<style scoped>
.pages{
    display: flex;
    justify-content: center;
}
</style>