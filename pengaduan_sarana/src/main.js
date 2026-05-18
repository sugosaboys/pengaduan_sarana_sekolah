import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/style.css'
import App from '@/App.vue'
import router from '@/router/index'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import VueAwesomePaginate from 'vue-awesome-paginate'
import "vue-awesome-paginate/dist/style.css";
import axios from 'axios';

axios.defaults.withCredentials = true; 

const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(ToastPlugin)
app.use(VueAwesomePaginate)
app.use(pinia)
app.mount('#app')