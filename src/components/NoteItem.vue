<template>
  <li class="note-item">
    <router-link :to="{ name: 'NoteEdit', params: { id: note.id } }" class="note-link">
      <h2>{{ note.title }}</h2>
      <p>{{ note.content }}</p>
      <small>Updated at: {{ formatDate(note.updatedAt) }}</small>
    </router-link>
    <button @click="$emit('delete', note.id)" class="delete-button">Delete</button>
  </li>
</template>

<script>
export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleString()
    }
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
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
}

.note-link p {
  margin: 0 0 0.5rem 0;
  color: #666;
}

.delete-button {
  background-color: #ff3b30;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #ff1c1c;
}
</style>
