<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useNewsStore } from '../stores/newsStore';
import NewsItem from './NewsItem.vue';

const router = useRouter();
const newsStore = useNewsStore();

const loading = computed(() => newsStore.loading);
const error = computed(() => newsStore.error);
const filteredNews = computed(() => newsStore.filteredNews);

const goToStory = (id) => {
  router.push(`/story/${id}`);
};
</script>

<template>
  <div class="news-list-container">
    <div v-if="loading" class="status-message">Загрузка новостей...</div>
    <div v-else-if="error" class="status-message error">Ошибка: {{ error }}</div>
    <div v-else-if="filteredNews.length === 0" class="status-message">
      Новости не найдены. Попробуйте изменить параметры фильтрации.
    </div>
    <div v-else class="news-list">
      <NewsItem
          v-for="item in filteredNews"
          :key="item.id"
          :item="item"
          @click="goToStory(item.id)"
      />
    </div>
  </div>
</template>

<style scoped>
.news-list-container {
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}

.status-message {
  padding: 40px;
  text-align: center;
  color: #666;
}

.status-message.error {
  color: #f44336;
}

.news-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>