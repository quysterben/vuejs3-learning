import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import {vuetify} from "@/plugins/vuetify"
import axios from "@/plugins/axios";

const app = createApp(App)

app.use(createPinia())
app.use(router).use(vuetify)
app.provide('axios', axios)

app.mount('#app')
