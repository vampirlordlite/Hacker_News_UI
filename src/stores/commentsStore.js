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

                // Фильтруем невалидные ID
                const validIds = this.currentCommentIds.filter(id =>
                    id !== undefined && id !== null
                );

                if (validIds.length === 0) {
                    this.comments = [];
                    return;
                }

                this.comments = await Promise.all(
                    validIds.map(id =>
                        fetchComment(id).catch(e => {
                            console.error(`Error fetching comment ${id}:`, e);
                            return null;
                        })
                    )
                ).then(comments => comments.filter(Boolean));
            } catch (err) {
                this.error = err.message;
                this.comments = [];
            } finally {
                this.loading = false;
            }
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