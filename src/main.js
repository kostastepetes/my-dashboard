import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { setupCalendar } from 'v-calendar';
import 'bootstrap/dist/css/bootstrap.min.css'
import Particles from 'particles.vue3';

import './style.css'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(setupCalendar, {})
app.use(Particles)
app.mount('#app')