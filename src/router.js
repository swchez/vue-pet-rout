import { createRouter, createWebHashHistory } from "vue-router";
import PeopleDetailPage from "./pages/PeopleDetailPage.vue"
import PeoplePage from "./pages/PeoplePage.vue";
import HomePage from "./pages/HomePage.vue";
import PlanetsPage from "./pages/PlanetsPage.vue";
import PlanetDetailPage from "./pages/PlanetDetailPage.vue";
import VehicleDetailPage from "./pages/VehicleDetailPage.vue";
import VehiclePage from "./pages/VehiclePage.vue";

export const router = createRouter({
    history : createWebHashHistory(),
    routes: [
        { path: '/', redirect: '/home'},
        { path: '/home', component: HomePage },
        { path: '/people', redirect: '/people/page/1' },
        { path: '/people/page/:page', component: PeoplePage },
        { path: '/people/:id', component: PeopleDetailPage, props: true },
        { path: '/planet', component: PlanetsPage },
        { path: '/planet/:id', component: PlanetDetailPage },
        { path: '/vehicle', component: VehiclePage },
        { path: '/vehicle/:id', component: VehicleDetailPage }
    ]
});