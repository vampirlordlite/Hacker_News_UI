<script setup>
import { ref } from 'vue';
import useHackerNewsApi from '../composables/useHackerNewsApi';

const props = defineProps({
  comment: {
    type: Object,
    required: true,
    validator: (c) => c.id && c.by && c.time
  }
});

const { fetchComment } = useHackerNewsApi();
const replies = ref([]);
const showReplies = ref(false);
const loading = ref(false);

const loadReplies = async () => {
  if (!props.comment.kids?.length) return;

  loading.value = true;
  try {
    replies.value = await Promise.all(
        props.comment.kids.map(id =>
            fetchComment(id).catch(() => null)
        )
    ).then(comments => comments.filter(Boolean));

    showReplies.value = true;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="comment">
    <div class="comment-header">
      <span class="author">{{ comment.by }}</span>
      <span class="date">{{ new Date(comment.time * 1000).toLocaleString() }}</span>
    </div>

    <div class="comment-text" v-html="comment.text"></div>

    <button
        v-if="comment.kids?.length && !showReplies"
        @click="loadReplies"
        :disabled="loading"
        class="show-replies-btn"
    >
      {{ loading ? 'Загрузка...' : `Ответы (${comment.kids.length})` }}
    </button>

    <div v-if="showReplies" class="replies">
      <CommentItem
          v-for="reply in replies"
          :key="reply.id"
          :comment="reply"
      />
    </div>
  </div>
</template>

<style scoped>
.comment {
  margin: 15px 0;
  padding: 10px;
  border-left: 2px solid #e0e0e0;
}
.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 0.9em;
  color: #757575;
}
.author {
  font-weight: bold;
  color: #424242;
}
.comment-text {
  line-height: 1.5;
  word-break: break-word;
}
.show-replies-btn {
  background: none;
  border: none;
  color: #1976d2;
  cursor: pointer;
  padding: 5px 0;
  font-size: 0.9em;
}
.show-replies-btn:hover {
  text-decoration: underline;
}
.show-replies-btn:disabled {
  color: #bdbdbd;
  cursor: wait;
}
.replies {
  margin-left: 20px;
  border-left: 1px solid #eee;
  padding-left: 10px;
}
</style>