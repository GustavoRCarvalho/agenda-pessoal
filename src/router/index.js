import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/view/HomeView.vue'
import PeopleView from '@/view/PeopleView.vue'
import UsersView from '@/view/UsersView.vue'
import ContactsView from '@/view/ContactsView.vue'
import LogoutView from '@/view/LogoutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/people',
      name: 'people',
      component: PeopleView,
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView,
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: ContactsView,
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutView,
    },
  ],
})

export default router
