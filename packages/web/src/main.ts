import { createApp } from 'vue';
import App from './App.vue';

import { setupPinia } from '@/store/index';
import { setupI18n } from '@/locales';
import { setupRoute, router } from '@/router';
import { setupRouterGuard } from '@/router/guard';
import { setupAxios } from '@/plugins/axios';

import { setupNProgress } from '@game-web/base';

import 'tailwindcss/tailwind.css';

async function bootstrap() {
  const app = createApp(App);
  setupPinia(app);
  await setupI18n(app);
  setupAxios();

  setupRoute(app);
  setupRouterGuard(router);
  setupNProgress();

  const meta = document.createElement('meta');
  meta.name = 'naive-ui-style';
  document.head.appendChild(meta);

  app.mount('#app');
}

bootstrap();
