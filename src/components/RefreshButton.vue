<script setup>
import { useNewsStore } from '../stores/newsStore.js';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiReload } from '@mdi/js';

const path = mdiReload;

const newsStore = useNewsStore();

const refresh = () => {
  newsStore.fetchNews();
};
</script>

<template>
  <button @click="refresh" class="refresh-button"><svg-icon type="mdi" :path="path"></svg-icon></button>
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
  font-size: 14px;
  white-space: nowrap;
}
</style>