<script setup>
import { ref } from 'vue'

const emit = defineEmits(['filter'])

const form = ref({
  name: '',
  minDay: null,
  maxDay: null,
  minMonth: null,
  maxMonth: null,
  minYear: null,
  maxYear: null
})

const applyFilters = () => {
  emit('filter', {
    name: typeof form.value.name === 'string' ? form.value.name.trim() : '',
    minDay: form.value.minDay !== null ? Number(form.value.minDay) : null,
    maxDay: form.value.maxDay !== null ? Number(form.value.maxDay) : null,
    minMonth: form.value.minDay !== null ? Number(form.value.minDay) : null,
    maxMonth: form.value.maxDay !== null ? Number(form.value.maxDay) : null,
    minYear: form.value.minDay !== null ? Number(form.value.minDay) : null,
    maxYear: form.value.maxDay !== null ? Number(form.value.maxDay) : null
  })
}

const resetFilters = () => {
  form.value = {
    name: '',
    minDay: null,
    maxDay: null,
    minMonth: null,
    maxMonth: null,
    minYear: null,
    maxYear: null
  }
  applyFilters()
}
</script>

<template>
  <form @submit.prevent="applyFilters" class="search-form">
    <div class="form-group">
      <label>Название:</label>
      <input
          v-model="form.name"
          type="text"
          placeholder="Поиск по названию"
      >
    </div>

    <div class="form-group">
      <label>День:</label>
      <div class="date-range">
        <input
            v-model.number="form.minDay"
            type="number"
            placeholder="От"
            min="0"
        >
        <span>-</span>
        <input
            v-model.number="form.maxDay"
            type="number"
            placeholder="До"
            :min="form.minDay || 0"
        >
      </div>
    </div>
    <div class="form-group">
      <label>Месяц:</label>
      <div class="date-range">
        <input
            v-model.number="form.minMonth"
            type="number"
            placeholder="От"
            min="0"
        >
        <span>-</span>
        <input
            v-model.number="form.maxMonth"
            type="number"
            placeholder="До"
            :min="form.minMonth || 0"
        >
      </div>
    </div>
    <div class="form-group">
      <label>Год:</label>
      <div class="date-range">
        <input
            v-model.number="form.minYear"
            type="number"
            placeholder="От"
            min="0"
        >
        <span>-</span>
        <input
            v-model.number="form.maxYear"
            type="number"
            placeholder="До"
            :min="form.minYear || 0"
        >
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
  padding: 20px;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.date-range {
  display: flex;
  align-items: center;
  gap: 10px;
}

.date-range input {
  width: 100px;
  padding: 8px;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn.primary {
  background-color: #42b983;
  color: white;
}

.btn.secondary {
  background-color: red;
}
</style>