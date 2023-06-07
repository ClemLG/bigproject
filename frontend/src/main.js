import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue3 from 'bootstrap-vue-3'
import VueCookies from 'vue-cookies'

import '@/style/style.scss'

const app = createApp(App)

app.use(router)
app.use(VueCookies)
app.use(BootstrapVue3)

app.mount('#app')