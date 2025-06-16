import { defineStore } from 'pinia';
import useHackerNewsApi from '../composables/useHackerNewsApi';

export const useNewsStore = defineStore('news', {
    state: () => ({
        news: [],
        loading: false,
        error: null,
        autoUpdateInterval: null
    }),
    actions: {
        async fetchNews() {
            this.loading = true;
            this.error = null;
            try {
                const { fetchTopStories } = useHackerNewsApi();
                this.news = await fetchTopStories();
            } catch (err) {
                this.error = err.message;
            } finally {
                this.loading = false;
            }
        },
        startAutoUpdate() {
            this.autoUpdateInterval = setInterval(() => {
                this.fetchNews();
            }, 60000);
        },
        stopAutoUpdate() {
            if (this.autoUpdateInterval) {
                clearInterval(this.autoUpdateInterval);
                this.autoUpdateInterval = null;
            }
        }
    },
    getters: {
        sortedNews: (state) => [...state.news].sort((a, b) => b.time - a.time)
    }
});