<script setup>
import { useNewsStore } from '../stores/newsStore.js';

const newsStore = useNewsStore();

const refresh = () => {
  newsStore.fetchNews();
};
</script>

<template>
  <button @click="refresh" class="refresh-button">
    🔄 Обновить
  </button>
</template>

<style scoped>
.refresh-button {
  padding: 8px 12px;
  background: #747bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;
}
</style>