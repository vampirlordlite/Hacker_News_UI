<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useNewsStore } from '../stores/newsStore.js';

const newsStore = useNewsStore();
const state = ref(newsStore.isAutoUpdateActive);

onMounted(() => {
  state.value = newsStore.isAutoUpdateActive;
});

const toggleState = () => {
  state.value = !state.value;
};

watch(state, (newVal) => {
  if (newVal) {
    newsStore.startAutoUpdate();
  } else {
    newsStore.stopAutoUpdate();
  }
});

onUnmounted(() => {
  newsStore.stopAutoUpdate();
});
</script>

<template>
  <button
      @click="toggleState"
      :class="['btn', state ? 'active' : 'disabled']"
  >
    {{ state ? 'Автообновление: ВКЛ' : 'Автообновление: ВЫКЛ' }}
  </button>
</template>

<style scoped>
.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;

}

.btn.active {
  background-color: #4CAF50;
  color: white;
}

.btn.disabled {
  background-color: #d32f2f;
  color: white;
}
</style>