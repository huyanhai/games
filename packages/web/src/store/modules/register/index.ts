import { defineStore } from 'pinia';

export type TRegisterStare = {
  register: boolean;
};

export const useRegisterStore = defineStore('register', {
  state: (): TRegisterStare => ({
    register: false
  }),
  getters: {
    getRegister(state) {
      return state.register;
    }
  },
  actions: {
    setRegister(flag: boolean) {
      this.register = flag;
    }
  }
});
