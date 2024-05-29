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
// Importation du composant NoteItem
import NoteItem from './NoteItem.vue';

export default {
  // Déclaration des composants utilisés dans ce composant
  components: {
    NoteItem
  },
  // Données du composant
  data() {
    return {
      notes: [] // Tableau vide pour stocker les notes
    }
  },
  // Méthodes du composant
  methods: {
    // Méthode pour créer une nouvelle note
    createNote() {
      // Génération d'un identifiant unique basé sur le timestamp actuel
      const id = Date.now().toString();
      // Création d'un nouvel objet note avec les propriétés initialisées
      const newNote = {
        id, // Identifiant unique
        title: 'New Note', // Titre par défaut
        content: '', // Contenu vide par défaut
        createdAt: new Date(), // Date de création actuelle
        updatedAt: new Date() // Date de mise à jour actuelle
      };
      // Ajout de la nouvelle note au tableau de notes
      this.notes.push(newNote);
      // Sauvegarde des notes dans le localStorage
      this.saveNotes();
      // Navigation vers la page d'édition de la note nouvellement créée
      this.$router.push({ name: 'NoteEdit', params: { id } });
    },
    // Méthode pour supprimer une note
    deleteNote(id) {
      // Filtrer les notes pour exclure celle avec l'identifiant spécifié
      this.notes = this.notes.filter(note => note.id !== id);
      // Sauvegarde des notes mises à jour dans le localStorage
      this.saveNotes();
    },
    // Méthode pour sauvegarder les notes dans le localStorage
    saveNotes() {
      // Conversion du tableau de notes en chaîne JSON et stockage dans le localStorage
      localStorage.setItem('notes', JSON.stringify(this.notes));
    },
    // Méthode pour charger les notes depuis le localStorage
    loadNotes() {
      // Récupération des notes depuis le localStorage
      const notes = localStorage.getItem('notes');
      // Si des notes existent dans le localStorage, les parse et les assigner au tableau notes
      if (notes) {
        this.notes = JSON.parse(notes);
      }
    }
  },
  // Hook de cycle de vie monté, appelé après que le composant soit inséré dans le DOM
  mounted() {
    // Chargement des notes depuis le localStorage lorsque le composant est monté
    this.loadNotes();
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
