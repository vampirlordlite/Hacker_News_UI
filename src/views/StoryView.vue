<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useNewsStore } from '../stores/newsStore';
import CommentsList from '../components/CommentsList.vue';
import BackButton from '../components/BackButton.vue';
import useHackerNewsApi from '../composables/useHackerNewsApi';

const route = useRoute();
const newsStore = useNewsStore();
const { fetchItem, loading: apiLoading, error: apiError } = useHackerNewsApi();

const story = ref(null);
const localLoading = ref(false);
const localError = ref(null);

onMounted(async () => {
  const id = Number(route.params.id);

  try {
    localLoading.value = true;

    const cachedStory = newsStore.news.find(item => item.id === id);
    if (cachedStory) {
      story.value = cachedStory;
      return;
    }

    // Если нет в кеше - загружаем
    story.value = await fetchItem(id);
    if (!story.value) {
      throw new Error('Новость не найдена');
    }
  } catch (err) {
    localError.value = err.message;
  } finally {
    localLoading.value = false;
  }
});

const commentIds = computed(() => {
  return story.value?.kids || [];
});

const isLoading = computed(() => localLoading.value || apiLoading.value);
const error = computed(() => localError.value || apiError.value);
</script>

<template>
  <div class="story-view">
    <BackButton />

    <template v-if="isLoading">
      <p>Загрузка новости...</p>
    </template>

    <template v-else-if="error">
      <p class="error">Ошибка: {{ error }}</p>
      <BackButton />
    </template>

    <template v-else-if="story">
      <h2>{{ story.title }}</h2>
      <div class="meta">
        <span>Автор: {{ story.by }}</span>
        <span>Дата: {{ new Date(story.time * 1000).toLocaleString() }}</span>
        <span>Рейтинг: {{ story.score }}</span>
      </div>

      <a v-if="story.url" :href="story.url" target="_blank" class="original-link">
        Читать оригинал
      </a>

      <div v-if="story.text" class="story-text" v-html="story.text"></div>

      <CommentsList :comment-ids="commentIds" />
    </template>

    <div v-else class="not-found">
      <p>Новость не найдена</p>
      <BackButton />
    </div>
  </div>
</template>

<style scoped>
.story-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.meta {
  display: flex;
  gap: 15px;
  margin: 10px 0;
  color: #666;
  font-size: 0.9em;
}

.original-link {
  display: inline-block;
  margin: 10px 0;
  color: #42b983;
  text-decoration: none;
}

.original-link:hover {
  text-decoration: underline;
}

.story-text {
  margin: 15px 0;
  line-height: 1.6;
}

.error {
  color: #d32f2f;
}

.not-found {
  text-align: center;
  margin-top: 50px;
}
</style>