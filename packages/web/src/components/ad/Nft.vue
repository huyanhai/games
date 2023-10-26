<template>
  <div class="m-nft">
    <div v-for="(item, index) in items" :key="index" class="nft-item">
      <div :class="['card', item.theme]">
        <div class="m-logo">
          <img :src="item.cardImg" alt="" />
        </div>
        <div class="m-progress">
          <NProgress type="line" :height="14" :border-radius="0" :fill-border-radius="0" :percentage="item.progress" :indicator-placement="'inside'" :color="item.buttonBgColor" />
        </div>
        <div class="info">
          <div class="col">{{ item.cardTotal }}</div>
          <div class="col">{{ item.cardBalance }}</div>
        </div>
      </div>
      <button :style="{ backgroundColor: item.buttonBgColor }">
        <SuiWallet :loading="loading" @moveCall="moveCall">
          <span class="buy"><img src="@/assets/wlogo.png" /> {{ item.buttonText }}</span>
        </SuiWallet>
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { NProgress, useMessage } from "naive-ui";
import { SuiTxBlock, useWallet } from "@game-web/base";
import { getAssetsFile } from "@/utils/files";
import SuiWallet from "../sui-wallet/Index.vue";

import { useI18n } from "vue-i18n";
import { computed, ref } from "vue";
import { useBaseStore } from "@/store";
import { CONTRACT_PACKAGE, BOAT_GLOBAL_ADDRESS } from "@/constants";

const { t } = useI18n();
const baseStore = useBaseStore();
const message = useMessage();
const { signAndSendTxn } = useWallet();

const loading = ref(false);
const shui = computed(() => baseStore.getNftInfo.shui);
// const meta = computed(() => baseStore.getNftInfo.meta);

const moveCall = async () => {
  try {
    loading.value = true;
    // 兑换的方法
    const target = `${CONTRACT_PACKAGE}::boat_ticket::claim_ticket`;
    const tx = new SuiTxBlock();
    // 兑换shui
    tx.moveCall(target, [BOAT_GLOBAL_ADDRESS]);

    // 发送签名
    const { digest } = await signAndSendTxn(tx);
    loading.value = false;
    if (digest) {
      message.success(t("home.success_tips"));
    }
  } catch (error) {
    loading.value = false;
    message.error(t("home.fail_tips"));
  }
};

const items = computed(() => [
  {
    topLogo: getAssetsFile("nft3-1.png"),
    theme: "",
    title: t("home.buy", { name: "OpenSea" }),
    cardTitle: t("home.shui_token"),
    cardTotal: t("home.total", { num: shui.value.total_num }),
    cardBalance: t("home.balance", { num: shui.value.remain_num }),
    cardImg: "https://bafybeiami7cghfutcuy52qpb5ifmv5d4cxzdfzcnbip7ptggf73zcsss7a.ipfs.nftstorage.link/ship_card.png/",
    progress: parseInt(`${(1 - shui.value.remain_num / shui.value.total_num) * 100}`),
    buttonText: "购买",
    buttonBgColor: "#ff1b72",
    link: "https://opensea.io/zh-CN/assets/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/30942048195930147045271123439947518623642095559354491168003220828348787730192",
  },
  // {
  //   topLogo: getAssetsFile('nft3-1.png'),
  //   theme: '',
  //   title: t('home.buy', { name: 'OpenSea' }),
  //   cardTitle: t('home.meta_game'),
  //   cardTotal: t('home.total', { num: meta.value.total_num }),
  //   cardBalance: t('home.balance', { num: meta.value.remain_num }),
  //   cardImg: getAssetsFile('nft3.png'),
  //   progress: parseInt(
  //     `${(1 - meta.value.remain_num / meta.value.total_num) * 100}`
  //   ),
  //   buttonText: '0.1 ETH',
  //   buttonBgColor: '#00c3ff',
  //   link: 'https://opensea.io/assets/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/30942048195930147045271123439947518623642095559354491168003220826149764465370'
  // }
]);
</script>

<style lang="scss" scoped>
.m-nft {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  .nft-item {
    width: 80%;
    max-width: 400px;
    @include for_breakpoint("min") {
      // width: 356px;
    }
    @include for_breakpoint("max", 800px) {
      width: 90%;
      margin: 0 auto;
    }
    &:nth-child(-1) {
      .title {
        img {
          width: 8vw;
          @include for_breakpoint("min") {
            width: 97px;
          }
          @include for_breakpoint("max", 800px) {
            width: 20%;
          }
        }
      }
    }
    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 1vw;
      height: 4vw;
      @include for_breakpoint("min") {
        margin: 16px;
      }
      @include for_breakpoint("max", 800px) {
        margin: 16px;
      }
      img {
        display: flex;
        width: 8vw;
        margin-right: 0.5vw;
        @include for_breakpoint("min") {
          width: 48px;
          margin-right: 8px;
        }
        @include for_breakpoint("max", 800px) {
          width: 30px;
          margin-right: 8px;
        }
      }
      p {
        font-size: 1.5vw;
        @include for_breakpoint("min") {
          font-size: 24px;
        }
        @include for_breakpoint("max", 800px) {
          font-size: 16px;
        }
      }
    }
    .card {
      width: 100%;
      display: flex;
      flex-direction: column;
      border-radius: 1vw;
      align-items: center;
      background: rgba($color: #fff, $alpha: 0.2);
      overflow: hidden;
      @include for_breakpoint("min") {
        border-radius: 16px;
      }
      @include for_breakpoint("max", 800px) {
        border-radius: 16px;
        width: 100%;
        margin: 0 auto;
      }
      &.dark {
        background: #000;
        p {
          color: #fff;
        }
        .info {
          border-color: #fff;
          .col {
            color: #fff;
            &:first-child {
              border-color: #fff;
            }
          }
        }
      }
      .m-logo {
      }
      p {
        font-size: 1.4vw;
        color: #222;
        @include for_breakpoint("min") {
          font-size: 22px;
        }
        @include for_breakpoint("max", 800px) {
          font-size: 16px;
        }
      }
      .info {
        display: flex;
        width: 100%;
        border-top: 1px solid rgba($color: #fff, $alpha: 0.6);
        background: rgba($color: #fff, $alpha: 0.4);
        .col {
          width: 50%;
          height: 3vw;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1vw;
          color: #222;
          @include for_breakpoint("min") {
            height: 48px;
            font-size: 16px;
          }
          @include for_breakpoint("max", 800px) {
            height: 48px;
            font-size: 14px;
          }
          &:first-child {
            border-right: 1px solid rgba($color: #fff, $alpha: 0.6);
          }
        }
      }
    }
    .m-progress {
      width: 100%;
    }
    button {
      width: 14vw;
      height: 5vw;
      border-radius: 0.8vw;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8vw;
      color: #fff;
      margin: 20px auto 0 auto;
      .buy {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 3px;
        img {
          width: 20px;
          margin-right: 10px;
        }
      }
      @include for_breakpoint("min") {
        width: 200px;
        height: 48px;
        border-radius: 12px;
        font-size: 22px;
      }
      @include for_breakpoint("max", 800px) {
        width: 150px;
        height: 50px;
        border-radius: 4px;
        font-size: 18px;
        margin-top: 20px;
      }
    }
  }
}
</style>
