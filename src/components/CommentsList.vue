<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useCommentsStore } from '../stores/commentsStore.js';
import CommentItem from './CommentItem.vue';
import CommentsRefreshButton from './CommentsRefreshButton.vue';

const props = defineProps({
  commentIds: {
    type: Array,
    default: () => []
  }
});

const commentsStore = useCommentsStore();
const localComments = ref([]);

const loadComments = async () => {
  await commentsStore.fetchComments(props.commentIds);
  localComments.value = commentsStore.comments;
};

// Инициализация
onMounted(() => {
  loadComments();
  commentsStore.startAutoUpdate();
});

// Очистка
onUnmounted(() => {
  commentsStore.stopAutoUpdate();
});

// Реактивность при изменении commentIds
watch(() => props.commentIds, (newIds) => {
  commentsStore.fetchComments(newIds);
  commentsStore.stopAutoUpdate();
  commentsStore.startAutoUpdate();
});
</script>

<template>
  <div class="comments-container">
    <CommentsRefreshButton @refresh="loadComments" />

    <div v-if="commentsStore.loading" class="loading-state">
      Загрузка комментариев...
    </div>

    <div v-else-if="commentsStore.error" class="error-state">
      Ошибка: {{ commentsStore.error }}
    </div>

    <div v-else-if="localComments.length === 0" class="empty-state">
      Нет комментариев
    </div>

    <div v-else class="comments-list">
      <CommentItem
          v-for="comment in localComments"
          :key="comment.id"
          :comment="comment"
      />
    </div>
  </div>
</template>

<style scoped>
.comments-container {
  margin-top: 20px;
}
.loading-state {
  padding: 10px;
  color: #666;
}
.error-state {
  padding: 10px;
  color: #d32f2f;
}
.empty-state {
  padding: 10px;
  color: #666;
  font-style: italic;
}
.comments-list {
  margin-top: 15px;
}
</style>