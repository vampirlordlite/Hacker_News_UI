import { ref } from 'vue';

const API_BASE_URL = 'https://hacker-news.firebaseio.com/v0';
const STORY_LIMIT = 100; // Лимит новостей для загрузки

export default function useHackerNewsApi() {
    const loading = ref(false);
    const error = ref(null);

    // Базовый метод для получения любого элемента (новости, комментария и т.д.)
    const fetchItem = async (id) => {
        try {
            loading.value = true;
            const response = await fetch(`${API_BASE_URL}/item/${id}.json`);
            if (!response.ok) throw new Error('Не удалось загрузить данные');
            return await response.json();
        } catch (err) {
            error.value = err.message;
            throw err;
        } finally {
            loading.value = false;
        }
    };

    // Получение топ-новостей
    const fetchTopStories = async () => {
        try {
            loading.value = true;
            error.value = null;

            // Получаем ID топ-новостей
            const response = await fetch(`${API_BASE_URL}/topstories.json`);
            if (!response.ok) throw new Error('Не удалось загрузить список новостей');

            const ids = await response.json();
            const limitedIds = ids.slice(0, STORY_LIMIT);

            // Загружаем детали для каждой новости
            const stories = await Promise.all(
                limitedIds.map(id => fetchItem(id).catch(e => {
                        console.error(`Ошибка загрузки новости ${id}:`, e);
                        return null;
                    })
                ))

            // Фильтруем только валидные новости
            return stories.filter(story => story && story.type === 'story');
        } catch (err) {
            error.value = err.message;
            throw err;
        } finally {
            loading.value = false;
        }
    };

    // Получение комментария по ID
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
        fetchComment
    };
}
