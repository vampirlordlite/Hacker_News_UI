<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="news-item" @click="$emit('click')">
    <h3>{{ item.title }}</h3>
    <p>Рейтинг: {{ item.score }}</p>
    <p>Автор: {{ item.by }}</p>
    <p>Дата: {{ new Date(item.time * 1000).toLocaleString() }}</p>
  </div>
</template>

<style scoped>
.news-item {
  padding: 15px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}
.news-item:hover {
  background-color: cadetblue;
}
</style>