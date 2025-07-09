import { defineStore } from 'pinia';
import useHackerNewsApi from '../composables/useHackerNewsApi';

export const useNewsStore = defineStore('news', {
    state: () => ({
        news: [],
        loading: false,
        error: null,
        autoUpdateInterval: null,
        isAutoUpdateActive: false,
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
            this.autoUpdateInterval = setInterval(() => {
                this.fetchNews();
            }, 60000);
            this.isAutoUpdateActive = true;
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
                // Фильтрация по заголовку
                if (state.filters.title &&
                    !item.title.toLowerCase().includes(state.filters.title.toLowerCase())) {
                    return false;
                }

                // Фильтрация по автору
                if (state.filters.author &&
                    !item.by.toLowerCase().includes(state.filters.author.toLowerCase())) {
                    return false;
                }

                // Фильтрация по рейтингу
                if (state.filters.minScore !== null && item.score < state.filters.minScore) {
                    return false;
                }
                if (state.filters.maxScore !== null && item.score > state.filters.maxScore) {
                    return false;
                }

                // Фильтрация по дате
                const itemDate = new Date(item.time * 1000);
                if (state.filters.fromDate && itemDate < new Date(state.filters.fromDate)) {
                    return false;
                }
                if (state.filters.toDate && itemDate > new Date(state.filters.toDate)) {
                    return false;
                }

                return true;
            }).sort((a, b) => b.time - a.time);
        }
    }
});