<script setup>
import { useCommentsStore } from '../stores/commentsStore.js';

const commentsStore = useCommentsStore();

const handleRefresh = () => {
  if (!commentsStore.loading) {
    commentsStore.fetchComments(); // Используем сохраненные IDs
  }
};
</script>

<template>
  <button
      @click="handleRefresh"
      :disabled="commentsStore.loading"
      class="refresh-btn"
  >
    {{ commentsStore.loading ? 'Обновление...' : 'Обновить комментарии' }}
  </button>
</template>

<style scoped>
.refresh-btn {
  padding: 8px 16px;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 15px;
  font-size: 0.9em;
}
.refresh-btn:hover {
  background: #1565c0;
}
.refresh-btn:disabled {
  background: #bdbdbd;
  cursor: not-allowed;
}
</style>