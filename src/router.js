import { createRouter, createWebHashHistory } from "vue-router";
import PeopleDetailPage from "./pages/PeopleDetailPage.vue"
import PeoplPage from "./pages/PeoplePage.vue";
import HomePage from "./pages/HomePage.vue";
import PlanetsPage from "./pages/PlanetsPage.vue";
import PlanetDetailPage from "./pages/PlanetDetailPage.vue";

export const router = createRouter({
    history : createWebHashHistory(),
    routes: [
        { path: '/', redirect: '/home'},
        { path: '/home', component: HomePage },
        { path: '/people', component: PeoplPage },
        { path: '/people/:id', component: PeopleDetailPage, props: true },
        { path: '/planet', component: PlanetsPage },
        { path: '/planet/:id', component: PlanetDetailPage },
    ]
});