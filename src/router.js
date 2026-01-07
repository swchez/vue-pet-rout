import { createRouter, createWebHashHistory } from "vue-router";
import DetailCardPage from "./components/DetailCardPage.vue"
import CardList from "./components/CardList.vue";

export const router = createRouter({
    history : createWebHashHistory(),
    routes: [
        { path: '/', redirect: '/people'},
        { path: '/people', component: CardList },
        { path: '/people/:id', component: DetailCardPage, props: true }
    ]
});