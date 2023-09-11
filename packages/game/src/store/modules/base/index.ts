import { defineStore } from 'pinia';

export type TBaseStare = {
  lang: 'zh' | 'en' | 'ja';
};

export const useBaseStore = defineStore('base', {
  state: (): TBaseStare => ({
    lang: 'en'
  }),
  getters: {
    getLang(state) {
      return state.lang;
    }
  },
  actions: {
    setLang(lang: TBaseStare['lang']) {
      this.lang = lang;
    }
  },
  persist: {
    session: true
  }
});
