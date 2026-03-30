import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import VueAwesomePaginate from 'vue-awesome-paginate'
import "vue-awesome-paginate/dist/style.css";

const app = createApp(App)
app.use(router)
app.use(ToastPlugin)
app.use(VueAwesomePaginate)
app.mount('#app')