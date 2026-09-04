import { createApp } from 'vue'
import App from './App.vue'
import router from './router'  // Make sure this line exists
import { reveal } from './directives/reveal'
import './assets/main.css'      // or your CSS imports

const app = createApp(App)
app.use(router)
app.directive('reveal', reveal)
app.mount('#app')