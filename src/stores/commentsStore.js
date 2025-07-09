import { defineStore } from 'pinia';
import useHackerNewsApi from '../composables/useHackerNewsApi';

export const useCommentsStore = defineStore('comments', {
    state: () => ({
        comments: [],
        loading: false,
        error: null,
        autoUpdateInterval: null,
        currentCommentIds: []
    }),

    actions: {
        async fetchComments(ids) {
            // Сохраняем IDs если они переданы
            if (ids) {
                this.currentCommentIds = Array.isArray(ids) ? ids : [];
            }

            this.loading = true;
            this.error = null;

            try {
                const { fetchComment } = useHackerNewsApi();

                const validIds = this.currentCommentIds.filter(id =>
                    id !== undefined && id !== null
                );

                if (validIds.length === 0) {
                    this.comments = [];
                    return;
                }

                this.comments = await this.limitedParallelCommentsFetch(validIds, fetchComment);
            } catch (err) {
                this.error = err.message;
                this.comments = [];
            } finally {
                this.loading = false;
            }
        },

        async limitedParallelCommentsFetch(ids, fetchFn, maxConcurrent = 5) {
            const results = [];
            const queue = [...ids];

            async function processQueue() {
                while (queue.length) {
                    const id = queue.shift();
                    try {
                        const comment = await fetchFn(id);
                        results.push(comment);
                    } catch (e) {
                        console.error(`Error fetching comment ${id}:`, e);
                        results.push(null);
                    }
                    await new Promise(resolve => setTimeout(resolve, 200));
                }
            }

            const workers = Array(Math.min(maxConcurrent, ids.length))
                .fill()
                .map(processQueue);

            await Promise.all(workers);

            return results.filter(Boolean);
        },

        startAutoUpdate() {
            this.stopAutoUpdate();
            if (this.currentCommentIds?.length > 0) {
                this.autoUpdateInterval = setInterval(() => {
                    this.fetchComments(); // Используем сохраненные IDs
                }, 60000);
            }
        },

        stopAutoUpdate() {
            if (this.autoUpdateInterval) {
                clearInterval(this.autoUpdateInterval);
                this.autoUpdateInterval = null;
            }
        }
    }
});