import App from './app.vue';
import  'normalize.css';
import 'highlight.js/styles/atom-one-light.css';
import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from '../router/index';

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const app = createApp(App);
app.use(router);
app.mount('#app')


export default app;