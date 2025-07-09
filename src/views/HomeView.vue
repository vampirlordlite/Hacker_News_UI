<script setup>
import NewsList from '../components/NewsList.vue';
import AutoRefreshButton from "../components/AutoRefreshButton.vue";
import HandleRefresh from "../components/HandleRefresh.vue";
import SearchForm from "../components/SearchForm.vue";
</script>

<template>
  <div class="home-view">
    <div class="sidebar">
      <div class="controls">
        <AutoRefreshButton />
        <HandleRefresh />
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
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 320px;
  min-width: 320px;
  background: #f8f9fa;
  border-right: 1px solid #e0e0e0;
  padding: 16px;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}

.controls {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.content {
  flex: 1;
  padding: 20px;
  background: #fff;
  margin-left: 320px;
}

@media (max-width: 992px) {
  .home-view {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    height: auto;
    position: static;
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
  }

  .content {
    margin-left: 0;
  }
}
</style>