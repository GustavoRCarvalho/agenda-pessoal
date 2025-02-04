import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/components/home/HomeView.vue'
import PeopleView from '@/components/people/PeopleView.vue'
import UsersView from '@/components/users/UsersView.vue'
import ContactsView from '@/components/contacts/ContactsView.vue'
import MyRegisterView from '@/components/myRegister/MyRegisterView.vue'
import LoginView from '@/components/login/LoginView.vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/people',
      name: 'people',
      component: PeopleView,
      meta: { requiresAuth: true },
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: ContactsView,
      meta: { requiresAuth: true },
    },
    {
      path: '/myRegister',
      name: 'myRegister',
      component: MyRegisterView,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, _from, next) => {
  const AuthStore = useAuthStore()
  const { accessToken, userType } = storeToRefs(AuthStore)

  if (to.meta.requiresAuth && accessToken.value === '') {
    next('/login')
  } else if (to.meta.requiresAdmin && userType.value !== 'ROLE_ADMIN') {
    next('/home')
  } else {
    next()
  }
})

export default router
