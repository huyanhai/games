<template>
  <div class="user-ad-box">
    <NTabs v-model:value="active" type="segment" class="user-pane" @update:value="(v) => (active = v)">
      <NTab v-for="(item, name, index) in lists" :key="index" :name="name" :tab="item.name"> </NTab>
    </NTabs>
    <component :is="renderComName" type="Model" />
  </div>
</template>
<script lang="ts" setup>
import { NTabs, NTab } from "naive-ui";
import { useI18n } from "vue-i18n";
import { onMounted, ref } from "vue";

import { queryOpenseaNft } from "@/api";
import { useBaseStore } from "@/store";
import { useWallet } from "@game-web/base";

import Home from "./Home.vue";
// import Game from './Game.vue';
// import Nft from './Nft.vue';
import GameTab from "./GameTab.vue";
import Swap from "./Swap.vue";
import AirDrop from "./AirDrop.vue";
import { computed, nextTick } from "vue";
// import Github from './Github.vue';

import Market from "@/views/Market.vue";

const baseStore = useBaseStore();
const { address } = useWallet();

const { t } = useI18n();

const active = ref("home");
const renderComName = computed(() => {
  const name: any = active.value;
  return (lists.value as any)[name].com;
});

const lists = computed(() => {
  return {
    home: {
      name: t("home.home"),
      com: Home,
    },
    meta: {
      name: t("home.meta"),
      com: "meta",
    },
    game: {
      name: t("home.game"),
      com: GameTab,
    },
    market: {
      name: t("home.market"),
      com: Market,
    },
    airdrop: {
      name: t("home.airdrop"),
      com: AirDrop,
    },
    swap: {
      name: t("home.swap"),
      com: Swap,
    },
    dao: {
      name: "DAO",
      com: "DAO",
    },
    // github: {
    //   name: t("home.github"),
    //   com: "Github",
    // },
  };
});

onMounted(() => {
  queryOpenseaNft().then((data: any) => {
    if (data.shui_token) {
      baseStore.setNftInfo({ shui: data.shui_token });
    }

    if (data.meta_game) {
      baseStore.setNftInfo({ meta: data.meta_game });
    }
  });

  setTimeout(() => {
    baseStore.fetchAirdropInfo();
  }, 1000);
});
</script>

<style lang="scss" scoped>
.user-ad-box {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  .page-market {
    padding: 0 20px;
    max-width: inherit;
    box-sizing: border-box;
  }
}
.user-pane {
  ::v-deep(.n-tabs-rail) {
    background: #383838 !important;
    padding: 0;
    overflow-x: scroll;
    border-radius: 0;
    z-index: 10;
    &::-webkit-scrollbar {
      display: none;
    }
    .n-tabs-tab {
      color: #fff;
      padding: 2vw;
      font-size: 1.2vw;
      @include for_breakpoint("min") {
        padding: vwTopx(2vw);
        font-size: vwTopx(1.2vw);
      }
      @include for_breakpoint("max", 800px) {
        padding: 10px 20px;
        font-size: 16px;
      }
      .carousel-box {
        min-height: 10vw;
        @include for_breakpoint("min") {
          min-height: vwTopx(10vw);
        }
      }
      &:hover {
        color: #00c3ff;
      }
      &.n-tabs-tab--active {
        background: #00c3ff;
        color: #383838 !important;
        border-radius: 0;
      }
    }
  }
  .n-tab-pane {
    padding: 0;
  }
}
</style>
