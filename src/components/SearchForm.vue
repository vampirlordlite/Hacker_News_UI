<script setup>
import { ref } from 'vue';
import { useNewsStore } from '../stores/newsStore.js';

const newsStore = useNewsStore();

const form = ref({
  title: '',
  author: '',
  minScore: null,
  maxScore: null,
  fromDate: '',
  toDate: ''
});

const applyFilters = () => {
  newsStore.setFilters({
    title: form.value.title,
    author: form.value.author,
    minScore: form.value.minScore ? Number(form.value.minScore) : null,
    maxScore: form.value.maxScore ? Number(form.value.maxScore) : null,
    fromDate: form.value.fromDate,
    toDate: form.value.toDate
  });
};

const resetFilters = () => {
  form.value = {
    title: '',
    author: '',
    minScore: null,
    maxScore: null,
    fromDate: '',
    toDate: ''
  };
  newsStore.resetFilters();
};
</script>

<template>
  <form @submit.prevent="applyFilters" class="search-form">
    <h3>Фильтры новостей</h3>

    <div class="form-group">
      <label>Заголовок:</label>
      <input v-model="form.title" type="text" placeholder="Поиск...">
    </div>

    <div class="form-group">
      <label>Автор:</label>
      <input v-model="form.author" type="text" placeholder="Автор...">
    </div>

    <div class="form-group">
      <label>Рейтинг:</label>
      <div class="range-container">
        <div class="range-input">
          <input v-model.number="form.minScore" type="number" placeholder="От" min="0">
        </div>
        <div class="range-separator">-</div>
        <div class="range-input">
          <input v-model.number="form.maxScore" type="number" placeholder="До" :min="form.minScore || 0">
        </div>
      </div>
    </div>

    <div class="form-group">
      <label>Дата:</label>
      <div class="date-container">
        <input v-model="form.fromDate" type="date">
        <span class="date-separator">-</span>
        <input v-model="form.toDate" type="date" :min="form.fromDate">
      </div>
    </div>

    <div class="form-actions">
      <button type="submit" class="btn primary">Применить</button>
      <button type="button" @click="resetFilters" class="btn secondary">Сбросить</button>
    </div>
  </form>
</template>

<style scoped>
.search-form {
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.search-form h3 {
  margin: 0 0 12px 0;
  font-size: 16px;
  color: #333;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 13px;
  color: #555;
  font-weight: 500;
}

input[type="text"],
input[type="number"],
input[type="date"] {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
}

.range-container,
.date-container {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.range-input,
.date-container input {
  flex: 1;
  min-width: 0;
}

.range-separator,
.date-separator {
  flex: 0 0 auto;
}

.form-actions {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.btn {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.btn.primary {
  background-color: #42b983;
  color: white;
}

.btn.secondary {
  background-color: #f1f1f1;
  color: #333;
}

@media (max-width: 768px) {
  .range-container,
  .date-container {
    flex-wrap: wrap;
  }

  .range-input,
  .date-container input {
    flex: 1 1 100%;
  }

  .range-separator,
  .date-separator {
    display: none;
  }
}
</style>