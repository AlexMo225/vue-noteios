<template>
  <div>
    <h1 class="title">Notes</h1>
    <button @click="createNote" class="create-note-button">Create Note</button>
    <ul class="note-list">
      <NoteItem v-for="note in notes" :key="note.id" :note="note" @delete="deleteNote" />
    </ul>
  </div>
</template>

<script>
// Import NoteItem from the correct path
import NoteItem from '../components/NoteItem.vue'

export default {
  components: {
    NoteItem
  },
  data() {
    return {
      notes: []
    }
  },
  methods: {
    createNote() {
      const id = Date.now().toString()
      const newNote = {
        id,
        title: 'New Note',
        content: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      this.notes.push(newNote)
      this.saveNotes()
      this.$router.push({ name: 'NoteEdit', params: { id } })
    },
    deleteNote(id) {
      this.notes = this.notes.filter(note => note.id !== id)
      this.saveNotes()
    },
    saveNotes() {
      localStorage.setItem('notes', JSON.stringify(this.notes))
    },
    loadNotes() {
      const notes = localStorage.getItem('notes')
      if (notes) {
        this.notes = JSON.parse(notes)
      }
    }
  },
  mounted() {
    this.loadNotes()
  }
}
</script>

<style scoped>
.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
}

.create-note-button {
  display: block;
  width: 100%;
  padding: 0.5rem;
  background-color: #ffcc00;
  border: none;
  border-radius: 5px;
  color: #000;
  font-size: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
}

.create-note-button:hover {
  background-color: #ffdb4d;
}

.note-list {
  list-style-type: none;
  padding: 0;
}
</style>
