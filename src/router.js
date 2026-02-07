import { createRouter, createWebHashHistory } from "vue-router";
import DetailCardPage from "./pages/DetailCardPage.vue"
import CardList from "./pages/CardList.vue";
import HomePage from "./pages/HomePage.vue";

export const router = createRouter({
    history : createWebHashHistory(),
    routes: [
        { path: '/', redirect: '/home'},
        { path: '/home', component: HomePage },
        { path: '/people', component: CardList },
        { path: '/people/:id', component: DetailCardPage, props: true }
    ]
});