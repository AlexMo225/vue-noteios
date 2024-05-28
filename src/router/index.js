import { createRouter, createWebHistory } from 'vue-router'
import NoteListView from '../views/NoteListView.vue'
import NoteEditView from '../views/NoteEditView.vue'

const routes = [
  {
    path: '/',
    name: 'NoteList',
    component: NoteListView
  },
  {
    path: '/note/:id',
    name: 'NoteEdit',
    component: NoteEditView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
