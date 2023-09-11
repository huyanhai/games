import type { App } from 'vue';
import { createPinia } from 'pinia';
import { persistPlugin } from './plugins/persist';

export * from './modules/base';
export * from './modules/register';
export * from './modules/setting';
// import here

const pinia = createPinia();

export const setupPinia = (app: App) => {
  pinia.use(persistPlugin);
  app.use(pinia);
};

export default pinia;
