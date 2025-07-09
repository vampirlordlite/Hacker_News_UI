<script setup>
import NewsList from '../components/NewsList.vue';
import AutoRefreshButton from "../components/AutoRefreshButton.vue";
import SearchForm from "../components/SearchForm.vue";
import { useNewsStore } from '../stores/newsStore';
import { onMounted } from 'vue';
import HandleRefresh from "../components/HandleRefresh.vue";

const newsStore = useNewsStore();

onMounted(async () => {
  try {
    await newsStore.fetchNews();
  } catch (err) {
    console.error('Failed to load news:', err);
  }
});
</script>

<template>
  <div class="home-view">
    <div class="sidebar">
      <div class="controls">
        <AutoRefreshButton />
        <HandleRefresh/>
      </div>
      <SearchForm />
    </div>
    <div class="content">
      <NewsList />
    </div>
  </div>
</template>

<style scoped>
.home-view {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.sidebar {
  position: sticky;
  top: 20px;
  height: fit-content;
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.controls {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.content {
  flex: 1;
}

.refresh-btn {
  padding: 8px 16px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  flex: 1;
  transition: background 0.2s;
}

.refresh-btn:hover:not(:disabled) {
  background: #3aa876;
}

.refresh-btn:disabled {
  background: #bdbdbd;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .home-view {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: static;
    margin-bottom: 20px;
  }
}
</style>