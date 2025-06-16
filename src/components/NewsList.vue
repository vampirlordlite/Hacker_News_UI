<script setup>
import { computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router'; // Добавляем импорт роутера
import { useNewsStore } from '../stores/newsStore.js';
import NewsItem from './NewsItem.vue';
import RefreshButton from './RefreshButton.vue';

const router = useRouter();
const newsStore = useNewsStore();

const goToStory = (id) => {
  router.push(`/story/${id}`);
};

onMounted(() => {
  newsStore.fetchNews();
  newsStore.startAutoUpdate();
});

onUnmounted(() => {
  newsStore.stopAutoUpdate();
});

const handleRefresh = () => {
  newsStore.fetchNews();
};

const loading = computed(() => newsStore.loading);
const error = computed(() => newsStore.error);
const sortedNews = computed(() => newsStore.sortedNews);
</script>

<template>
  <div class="news-list">
    <RefreshButton @refresh="handleRefresh" />

    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error">Ошибка: {{ error }}</div>
    <div v-else>
      <NewsItem
          v-for="item in sortedNews"
          :key="item.id"
          :item="item"
          @click="goToStory(item.id)"
      />
    </div>
  </div>
</template>

<style scoped>

</style>