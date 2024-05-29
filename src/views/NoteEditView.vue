<template>
  <div class="edit-container">
    <div class="edit-header">
      <h1>Edit Note</h1>
      
      <router-link to="/" class="back-button" @click.native="notifyUpdate">Back to Notes</router-link>
    </div>
    
    <input v-model="note.title" @input="saveNote" placeholder="Title" class="title-input" />
   
    <textarea v-model="note.content" @input="saveNote" placeholder="Content" class="content-textarea"></textarea>
    <div class="note-info">
      
      <p>Word Count: {{ wordCount }}</p>
      
      <p>Created At: {{ formatDate(note.createdAt) }}</p>
      
      <p>Updated At: {{ formatDate(note.updatedAt) }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';



export default {
  data() {
    return {
      note: {
        id: '',
        title: '',
        content: '',
        createdAt: '',
        updatedAt: ''
      }
    };
  },
  computed: {
    // Calcul du nombre de mots dans le contenu de la note
    wordCount() {
      return this.note.content.trim().split(/\s+/).length;
    }
  },
  methods: {
    // Sauvegarde de la note dans le localStorage
    saveNote() {
      this.note.updatedAt = new Date(); // Mettre à jour la date de modification
      const notes = JSON.parse(localStorage.getItem('notes')) || []; // Récupérer les notes du localStorage
      const index = notes.findIndex(n => n.id === this.note.id); // Trouver l'index de la note actuelle
      if (index !== -1) {
        notes[index] = this.note; // Mettre à jour la note
        localStorage.setItem('notes', JSON.stringify(notes)); // Sauvegarder les notes mises à jour dans le localStorage
      }
    },
    // Charger la note à partir du localStorage
    loadNote() {
      const notes = JSON.parse(localStorage.getItem('notes')) || []; // Récupérer les notes du localStorage
      const note = notes.find(n => n.id === this.$route.params.id); // Trouver la note correspondante à l'ID de la route
      if (note) {
        this.note = note; // Charger les données de la note
      }
    },
    // Formater la date pour l'affichage
    formatDate(date) {
      return new Date(date).toLocaleString(); // Retourner la date au format local
    },
    // Notifier les autres composants de la mise à jour de la note
    notifyUpdate() {
      eventBus.value.forEach(callback => callback()); // Appeler chaque fonction de rappel dans l'EventBus
    }
  },
  mounted() {
    this.loadNote(); // Charger la note lorsqu'on monte le composant
  },
  watch: {
    // Recharger la note lorsque l'ID de la route change
    '$route.params.id': 'loadNote'
  }
};
</script>

<style scoped>
.edit-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.edit-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.edit-header h1 {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}

.back-button {
  background-color: #007aff;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #005bb5;
}

.title-input {
  width: 100%;
  padding: 0.75rem;
  font-size: 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
}

.content-textarea {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  height: 300px;
  margin-bottom: 1rem;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
}

.note-info {
  font-size: 0.875rem;
  color: #8e8e93;
}
</style>
