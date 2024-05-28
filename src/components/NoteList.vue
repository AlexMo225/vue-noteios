<template>
  <div>
    <!-- Title for the notes list -->
    <h1 class="title">Notes</h1>
    <!-- Button to create a new note -->
    <button @click="createNote" class="create-note-button">Create Note</button>
    <!-- List of notes -->
    <ul class="note-list">
      <NoteItem v-for="note in notes" :key="note.id" :note="note" @delete="deleteNote" />
    </ul>
  </div>
</template>

<script>
// Import NoteItem component
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
    // Method to create a new note
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
    // Method to delete a note
    deleteNote(id) {
      this.notes = this.notes.filter(note => note.id !== id)
      this.saveNotes()
    },
    // Method to save notes to localStorage
    saveNotes() {
      localStorage.setItem('notes', JSON.stringify(this.notes))
    },
    // Method to load notes from localStorage
    loadNotes() {
      const notes = localStorage.getItem('notes')
      if (notes) {
        this.notes = JSON.parse(notes)
      }
    }
  },
  mounted() {
    // Load notes when component is mounted
    this.loadNotes()
  }
}
</script>

<style scoped>
/* Styles for the title */
.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
}

/* Styles for the create note button */
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

/* Styles for the notes list */
.note-list {
  list-style-type: none;
  padding: 0;
}
</style>
