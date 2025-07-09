import { ref } from 'vue';

const API_BASE_URL = 'https://hacker-news.firebaseio.com/v0';
const STORY_LIMIT = 100;
const MAX_CONCURRENT_REQUESTS = 5; // Ограничение параллельных запросов
const REQUEST_DELAY = 200; // Задержка между запросами в мс

export default function useHackerNewsApi() {
    const loading = ref(false);
    const error = ref(null);

    const fetchWithRetry = async (url, retries = 3) => {
        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Не удалось загрузить данные');
                return await response.json();
            } catch (err) {
                if (i === retries - 1) throw err;
                await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Экспоненциальная задержка
            }
        }
    };

    const fetchItem = async (id) => {
        try {
            loading.value = true;
            return await fetchWithRetry(`${API_BASE_URL}/item/${id}.json`);
        } catch (err) {
            error.value = err.message;
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const limitedParallelRequests = async (items, fn) => {
        const results = [];
        const queue = [...items];

        async function processQueue() {
            while (queue.length) {
                const item = queue.shift();
                try {
                    const result = await fn(item);
                    results.push(result);
                } catch (e) {
                    console.error(`Error processing item ${item}:`, e);
                    results.push(null);
                }
                await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY));
            }
        }

        const workers = Array(MAX_CONCURRENT_REQUESTS).fill().map(processQueue);
        await Promise.all(workers);

        return results;
    };

    const fetchTopStories = async () => {
        try {
            loading.value = true;
            error.value = null;

            const response = await fetchWithRetry(`${API_BASE_URL}/topstories.json`);
            const ids = response.slice(0, STORY_LIMIT);

            const stories = await limitedParallelRequests(ids, async (id) => {
                try {
                    const story = await fetchItem(id);
                    return story && story.type === 'story' ? story : null;
                } catch (e) {
                    console.error(`Ошибка загрузки новости ${id}:`, e);
                    return null;
                }
            });

            return stories.filter(Boolean);
        } catch (err) {
            error.value = err.message;
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const fetchComment = async (id) => {
        try {
            const comment = await fetchItem(id);
            if (comment && comment.type === 'comment') {
                return comment;
            }
            throw new Error('Не является валидным комментарием');
        } catch (err) {
            console.error(`Ошибка загрузки комментария ${id}:`, err);
            throw err;
        }
    };

    return {
        loading,
        error,
        fetchTopStories,
        fetchComment,
        fetchItem
    };
}