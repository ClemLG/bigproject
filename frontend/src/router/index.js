import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainView from "../views/MainView.vue";
import EventView from "@/views/EventView.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/main',
            name: 'main',
            component: MainView
        },
        {
            path: '/event/:eventId',
            name: 'event',
            component: EventView
        }
    ]
})

export default router