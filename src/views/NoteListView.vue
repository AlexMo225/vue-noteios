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
import NoteItem from './NoteItem.vue'; 

export default {
  components: {
    NoteItem
  },
  data() {
    return {
      notes: [] // Initialisation de la liste des notes
    };
  },
  methods: {
    // Méthode pour créer une nouvelle note
    createNote() {
      const id = Date.now().toString(); // Génération d'un ID unique basé sur l'heure actuelle
      const newNote = {
        id,
        title: 'New Note',
        content: '',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.notes.push(newNote); // Ajout de la nouvelle note à la liste
      this.saveNotes(); // Sauvegarde de la liste des notes dans le localStorage
      this.$router.push({ name: 'NoteEdit', params: { id } }); // Redirection vers l'édition de la nouvelle note
    },
    // Méthode pour supprimer une note
    deleteNote(id) {
      this.notes = this.notes.filter(note => note.id !== id); // Filtrer la liste des notes pour exclure la note supprimée
      this.saveNotes(); // Sauvegarde de la liste des notes mise à jour dans le localStorage
    },
    // Méthode pour sauvegarder les notes dans le localStorage
    saveNotes() {
      localStorage.setItem('notes', JSON.stringify(this.notes));
    },
    // Méthode pour charger les notes depuis le localStorage
    loadNotes() {
      const notes = localStorage.getItem('notes'); // Récupération des notes du localStorage
      if (notes) {
        this.notes = JSON.parse(notes); // Parsing des notes et mise à jour de la liste
      }
    }
  },
  mounted() {
    this.loadNotes(); // Chargement des notes lors du montage du composant
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
