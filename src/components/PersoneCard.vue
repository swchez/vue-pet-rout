<script setup>
import {onMounted, ref,defineEmits} from 'vue';

const props = defineProps({
    persone : Object
});

const emit = defineEmits(['open']);
function openDetails(){
    emit('open', props.persone.uid);
}

</script>

<template>
        <div class="card">
        <p v-if="persone.name" style="font-size: 20px">Имя : {{ persone.name }}</p>
        <p v-if="persone.gender">Пол : {{ persone.gender }}</p>
        <p v-if="persone.eye_color">Цвет глаз: {{ persone.eye_color }}</p>
        <p v-if="persone.mass">Масса: {{ persone.mass }}</p>
        <button @click="openDetails" style="font-size: 20px;border-radius: 10px;padding: 10px 10px;">Подробнее</button>
    </div>
</template>

<style scoped>
    .card{
        flex: 0 0 calc(100%/5 - 16px);
        height: 150px;
        width: 150px;
        border: 1px solid;
        padding: 20px;
        text-align: center;
        border-radius: 15px;
        background-color: rgba(78, 109, 124, 0.444);
        align-content: center;
    }
</style>