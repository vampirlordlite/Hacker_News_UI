import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/HomeView.vue';
import StoryView from './views/StoryView.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/story/:id',
        name: 'story',
        component: StoryView,
        props: true
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;