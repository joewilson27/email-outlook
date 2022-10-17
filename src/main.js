import { createApp } from 'vue';
import App from './App.vue';
import larasati from './larasati/larasati.js';
import { createPinia } from 'pinia';
const app = createApp(App);
app.use(createPinia())
.use(larasati)
.mount('#app');