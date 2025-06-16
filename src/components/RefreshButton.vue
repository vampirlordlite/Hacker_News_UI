<script setup>
import { useNewsStore } from '../stores/newsStore.js';

const newsStore = useNewsStore();

const refresh = () => {
  newsStore.fetchNews(); // Просто вызываем обновление данных
};
</script>

<template>
  <button @click="refresh" class="refresh-button">Обновить</button>
</template>

<style scoped>
.refresh-button {
  margin-bottom: 20px;
  padding: 8px 16px;
  background: #747bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>