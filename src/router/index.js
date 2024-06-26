import { createRouter, createWebHistory } from 'vue-router';
import NoteEditView from '../views/NoteEditView.vue';

const routes = [
  {
    path: '/',
    name: 'NoteList',
    component: {
      template: '<NoteList />'
    }
  },
  {
    path: '/note/:id',
    name: 'NoteEdit',
    component: NoteEditView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
