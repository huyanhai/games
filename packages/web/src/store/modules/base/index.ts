import { defineStore } from "pinia";
import { queryAirdrop, checkAirDrop, metaStatus } from "@/api";
import { SuiTxBlock, bytesArrayToHex, useProvider } from "@game-web/base";
import { CONTRACT_PACKAGE, META_INFO_GLOBAL_ADDRESS } from "@/constants";
import { culmulateRemainAmount, dailyRemainAmount, queryAirdropPhase, queryMetaByAddress, queryParticipatorNum, swapedShui, swapedSui, totalClaimAmount } from "./query";

export type TBaseStare = {
  lang: "zh" | "en" | "ja";
  loading: boolean;
  userInfo: Record<string, any> | undefined;
  nftInfo: Record<string, any>;
  airdropInfo: Record<string, any>;
  airdropCheck: Record<string, any>;
  imgMap: Record<string, any>;
};

export const useBaseStore = defineStore("base", {
  state: (): TBaseStare => ({
    lang: "en",
    loading: false,
    userInfo: undefined,
    nftInfo: {
      meta: {},
      shui: {},
    },
    airdropInfo: {},
    airdropCheck: {},
    imgMap: {},
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
    },
    getImgMap(state) {
      return state.imgMap;
    },
  },
  actions: {
    setLang(lang: TBaseStare["lang"]) {
      this.lang = lang;
    },
    setUserInfo(info: TBaseStare["userInfo"]) {
      this.userInfo = info;
    },
    setLoading(flag: TBaseStare["loading"]) {
      this.loading = flag;
    },
    setNftInfo(info: Record<string, any>) {
      this.nftInfo = Object.assign(this.nftInfo, info);
    },
    async fetchUserInfo(address: string) {
      const { data } = await metaStatus({ wallet_addr: address });
      console.log("data", data);

      if (Object.keys(data).length) {
        this.setUserInfo(data);
        return;
      }

      try {
        const result = await queryMetaByAddress(address);
        this.setUserInfo(result);
      } catch (error) {
        console.error("获取信息失败", error);
        return Promise.resolve({});
      }
    },
    async fetchAirdropInfo() {
      const phase = await queryAirdropPhase();
      const participators_num = await queryParticipatorNum();
      const total_claim_amount = await totalClaimAmount();
      const total_remain_amount = await culmulateRemainAmount();
      const daily_remain_amount = await dailyRemainAmount();
      const swaped_sui = await swapedSui();
      const swaped_shui = await swapedShui();
      this.airdropInfo = {
        phase,
        participators_num,
        total_claim_amount,
        total_remain_amount,
        daily_remain_amount,
        swaped_sui,
        swaped_shui,
      } as any;
    },
    async fetchAirdropCheck(params: { wallet_addr: string }) {
      const { data } = await checkAirDrop(params);
      this.airdropCheck = data as any;
      return Promise.resolve(true);
    },
    setImgMap(key: string, value: string) {
      this.imgMap[key] = value;
    },
  },
  persist: {
    session: true,
  },
});
