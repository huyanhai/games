import type { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from '@/router/routes';

export const router = createRouter({
  history: createWebHashHistory(),
  // history: createWebHistory(import.meta.env.VITE_APP_BASE_ROUTE as string),
  routes,
  strict: true // 禁用尾部的斜线
});

export function setupRoute(app: App) {
  app.use(router);
}
