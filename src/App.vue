<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <div id="app">
    <header>
      <h1>Hacker News</h1>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #2c3e50;
}

header {
  text-align: center;
  margin-bottom: 30px;
}

header h1 {
  font-size: 2rem;
  color: #42b983;
}

@media (max-width: 768px) {
  #app {
    padding: 10px;
  }
}
</style>