<template>
  <div id="app" class="app-container">
    <div class="sidebar">
      <NoteList />
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import NoteList from './components/NoteList.vue';

export default {
  name: 'App',
  components: {
    NoteList
  }
}
</script>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  margin: 0;
  background-color: #f8f9fa;
}

.app-container {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 30%;
  background-color: #f5f5f7;
  border-right: 1px solid #dcdcdc;
  overflow-y: auto;
  padding: 1rem;
}

.content {
  flex-grow: 1;
  padding: 1rem;
  overflow-y: auto;
  background-color: #ffffff;
}
</style>
