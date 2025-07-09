<script setup>
import { useNewsStore } from '../stores/newsStore.js';

const newsStore = useNewsStore();

const toggleAutoUpdate = () => {
  if (newsStore.isAutoUpdateActive) {
    newsStore.stopAutoUpdate();
  } else {
    newsStore.startAutoUpdate();
  }
};
</script>

<template>
  <button
      @click="toggleAutoUpdate"
      :disabled="newsStore.loading"
      :class="['auto-refresh-btn', newsStore.isAutoUpdateActive ? 'active' : '']"
  >
    {{ newsStore.isAutoUpdateActive ? '🔄 Автообновление: ВКЛ' : '⏸️ Автообновление: ВЫКЛ' }}
  </button>
</template>

<style scoped>
.auto-refresh-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: #f1f1f1;
  color: #333;
  flex: 1;
}
.auto-refresh-btn.active {
  background: #42b983;
  color: white;
}
.auto-refresh-btn:disabled {
  background: #bdbdbd;
  cursor: not-allowed;
}
</style>