import { createApp } from 'vue';
import App from '@/app/App.vue';
import router from '@/app/providers/router/index.js';
import '@/app/style/main.css';

createApp(App).use(router).mount('#app');
