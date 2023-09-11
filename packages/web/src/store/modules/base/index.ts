import { defineStore } from 'pinia';
import { metaStatus, queryAirdrop, checkAirDrop } from '@/api';

export type TBaseStare = {
  lang: 'zh' | 'en' | 'ja';
  loading: boolean;
  userInfo: Record<string, any> | undefined;
  nftInfo: Record<string, any>;
  airdropInfo: Record<string, any>;
  airdropCheck: Record<string, any>;
};

export const useBaseStore = defineStore('base', {
  state: (): TBaseStare => ({
    lang: 'en',
    loading: false,
    userInfo: undefined,
    nftInfo: {
      meta: {},
      shui: {}
    },
    airdropInfo: {},
    airdropCheck: {}
  }),
  getters: {
    getLang(state) {
      return state.lang;
    },
    getUserInfo(state) {
      return state.userInfo;
    },
    getLoading(state) {
      return state.loading;
    },
    getNftInfo(state) {
      return state.nftInfo;
    },
    getAirdropInfo(state) {
      return state.airdropInfo;
    },
    getAirdropCheck(state) {
      return state.airdropCheck;
    }
  },
  actions: {
    setLang(lang: TBaseStare['lang']) {
      this.lang = lang;
    },
    setUserInfo(info: TBaseStare['userInfo']) {
      this.userInfo = info;
    },
    setLoading(flag: TBaseStare['loading']) {
      this.loading = flag;
    },
    setNftInfo(info: Record<string, any>) {
      this.nftInfo = Object.assign(this.nftInfo, info);
    },
    async fetchUserInfo(address: string) {
      const { data } = await metaStatus({
        wallet_addr: address
      });

      if (data?.metaId) {
        this.setUserInfo(data);
      }

      return Promise.resolve(data);
    },
    async fetchAirdropInfo() {
      const { data } = await queryAirdrop();

      this.airdropInfo = data as any;
    },
    async fetchAirdropCheck(params: { wallet_addr: string }) {
      const { data } = await checkAirDrop(params);
      this.airdropCheck = data as any;
      return Promise.resolve(true);
    }
  },
  persist: {
    session: true
  }
});
