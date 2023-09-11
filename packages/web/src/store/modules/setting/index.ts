import { defineStore } from 'pinia';

export type TSetting = {
  loading: boolean;
};

export const useSettingStore = defineStore('setting', {
  state: (): TSetting => ({
    loading: false
  }),
  getters: {
    getLoading(state) {
      return state.loading;
    }
  },
  actions: {
    setLoading(flag: TSetting['loading']) {
      this.loading = flag;
    }
  },
  persist: false
});
