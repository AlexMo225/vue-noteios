<template>
    <li class="note-item">
      <router-link :to="'/note/' + note.id" class="note-link">
        <h2>{{ note.title }}</h2>
        <p>{{ note.content }}</p>
      </router-link>
      <button @click="$emit('delete', note.id)" class="delete-button"> 🗑️</button>
    </li>
  </template>
  
  <script>
  export default {
    props: {
      note: Object
    }
  }
  </script>
  
  <style scoped>
  .note-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #dcdcdc;
  }
  
  .note-link {
    flex-grow: 1;
    text-decoration: none;
    color: inherit;
  }
  
  .note-link h2 {
    margin: 0;
    font-size: 1.25rem;
  }
  
  .note-link p {
    margin: 0.5rem 0 0;
    color: #6c757d;
  }
  
  .delete-button {
    background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  }
  
  .delete-button:hover {
    background-color: #c82333;
  }
  </style>
  