import 'vue-select/dist/vue-select.css'
import './assets/main.css'
import './assets/list.css'
import './assets/register.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueTheMask from 'vue-the-mask'

import App from './App.vue'
import router from '@/router'

const app = createApp(App)

app.use(VueTheMask)
app.use(createPinia())
app.use(router)

app.mount('#app')
