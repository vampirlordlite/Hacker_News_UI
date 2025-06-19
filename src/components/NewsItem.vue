<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['click']);
</script>

<template>
  <div class="news-item" @click="emit('click')">
    <h3>{{ item.title }}</h3>
    <div class="meta">
      <span class="score">★ {{ item.score }}</span>
      <span class="author">👤 {{ item.by }}</span>
      <span class="date">📅 {{ new Date(item.time * 1000).toLocaleString() }}</span>
    </div>
  </div>
</template>

<style scoped>
.news-item {
  padding: 12px;
  background: white;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 8px;
}

.news-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}

.news-item h3 {
  margin: 0 0 6px 0;
  font-size: 15px;
  color: #333;
  line-height: 1.3;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 13px;
  color: #666;
}

.score {
  color: #ff6600;
  font-weight: 500;
}

@media (max-width: 600px) {
  .news-item {
    padding: 10px;
  }

  .meta {
    gap: 8px;
    font-size: 12px;
  }
}
</style>