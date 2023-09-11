/// <reference types="vite/client" />

interface ImportMeta {
  env: any;
  globEager: any;
  glob: any;
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

export declare global {
  interface Window {
    config: any; //全局变量名
  }
}
