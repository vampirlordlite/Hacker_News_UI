<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goBack = () => router.push('/')
</script>

<template>
  <button @click="goBack" class="back-button">Назад к списку</button>
</template>

<style scoped>
.back-button {
  margin-bottom: 20px;
  padding: 8px 16px;
  background: #747bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>