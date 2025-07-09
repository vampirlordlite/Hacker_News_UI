import { defineStore } from 'pinia';
import useHackerNewsApi from '../composables/useHackerNewsApi';

export const useNewsStore = defineStore('news', {
    state: () => ({
        news: [],
        isAutoUpdateActive: false,
        autoUpdateInterval: null,
        filters: {
            title: '',
            author: '',
            minScore: null,
            maxScore: null,
            fromDate: null,
            toDate: null
        }
    }),

    actions: {
        async fetchNews() {
            const { fetchTopStories } = useHackerNewsApi();
            try {
                this.news = await fetchTopStories();
            } catch (err) {
                console.error('Error fetching news:', err);
                throw err;
            }
        },

        setFilters(newFilters) {
            this.filters = { ...this.filters, ...newFilters };
        },

        resetFilters() {
            this.filters = {
                title: '',
                author: '',
                minScore: null,
                maxScore: null,
                fromDate: null,
                toDate: null
            };
        },

        startAutoUpdate() {
            this.stopAutoUpdate();
            this.isAutoUpdateActive = true;
            this.autoUpdateInterval = setInterval(() => {
                this.fetchNews();
            }, 60000);
            this.fetchNews();
        },

        stopAutoUpdate() {
            if (this.autoUpdateInterval) {
                clearInterval(this.autoUpdateInterval);
                this.autoUpdateInterval = null;
            }
            this.isAutoUpdateActive = false;
        }
    },

    getters: {
        filteredNews(state) {
            return state.news.filter(item => {
                if (state.filters.title &&
                    !item.title.toLowerCase().includes(state.filters.title.toLowerCase())) {
                    return false;
                }

                if (state.filters.author &&
                    !item.by.toLowerCase().includes(state.filters.author.toLowerCase())) {
                    return false;
                }

                if (state.filters.minScore !== null && item.score < state.filters.minScore) {
                    return false;
                }
                if (state.filters.maxScore !== null && item.score > state.filters.maxScore) {
                    return false;
                }

                const itemDate = new Date(item.time * 1000);
                if (state.filters.fromDate && itemDate < new Date(state.filters.fromDate)) {
                    return false;
                }
                if (state.filters.toDate && itemDate > new Date(state.filters.toDate)) {
                    return false;
                }

                return true;
            }).sort((a, b) => b.time - a.time);
        },

        loading() {
            return useHackerNewsApi().loading.value;
        },

        error() {
            return useHackerNewsApi().error.value;
        }
    }
});