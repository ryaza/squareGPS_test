import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import FontAwesomeIcon from './plugins/fontawesome';

const app = createApp(App);
app
  .use(store)
  .use(router)
  .use(i18n)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
