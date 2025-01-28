import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/components/home/HomeView.vue'
import PeopleView from '@/components/people/PeopleView.vue'
import UsersView from '@/components/users/UsersView.vue'
import ContactsView from '@/components/contacts/ContactsView.vue'
import LogoutView from '@/components/LogoutView.vue'

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
