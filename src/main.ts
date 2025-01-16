import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n, { initializeI18n } from './i18n';
import FontAwesomeIcon from './plugins/fontawesome';
import vuetify from './plugins/vuetify';

(async () => {
  await initializeI18n(); // Загружаем переводы перед запуском приложения

  const app = createApp(App);
  app.use(i18n);
  app.use(router);
  app.use(store);
  app.use(vuetify);
  app.component('font-awesome-icon', FontAwesomeIcon);
  app.mount('#app');
})();
