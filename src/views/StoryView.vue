<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useNewsStore } from '../stores/newsStore';
import CommentsList from '../components/CommentsList.vue';
import BackButton from '../components/BackButton.vue';

const route = useRoute();
const newsStore = useNewsStore();

const story = computed(() => {
  return newsStore.news.find(item => item.id === Number(route.params.id));
});

// Гарантируем что всегда возвращаем массив
const commentIds = computed(() => {
  return story.value?.kids || [];
});
</script>

<template>
  <div class="story-view">
    <BackButton />

    <template v-if="story">
      <h2>{{ story.title }}</h2>
      <p>Автор: {{ story.by }}</p>
      <p>Дата: {{ new Date(story.time * 1000).toLocaleString() }}</p>
      <a v-if="story.url" :href="story.url" target="_blank">Читать оригинал</a>

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
.not-found {
  text-align: center;
  margin-top: 50px;
}
a {
  color: #42b983;
  display: block;
  margin: 10px 0;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>