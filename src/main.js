import { createApp } from 'vue';
import App from './App.vue';
import store from './services/store';
import './assets/styles.css'; 


const app = createApp(App);
app.use(store);
app.mount('#app');
