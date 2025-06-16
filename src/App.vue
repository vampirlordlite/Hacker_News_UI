<script setup>
defineOptions({
  name: 'App'
});
</script>

<template>
  <div id="app">
    <header>
      <h1>Hacker News</h1>
    </header>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>