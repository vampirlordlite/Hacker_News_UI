<script setup>
import { onMounted, onUnmounted } from "vue";
import { useNewsStore } from '../stores/newsStore.js';
import RefreshButton from "./RefreshButton.vue";

const newsStore = useNewsStore();

onMounted(() => {
  newsStore.fetchNews();
});

onUnmounted(() => {
  newsStore.stopAutoUpdate();
});

const handleRefresh = () => {
  newsStore.fetchNews();
};
</script>

<template>
  <RefreshButton @click="handleRefresh" />
</template>