<template>
  <div class="page-market">
    <div class="operation">
      <NTabs class="market-tabs" type="segment" :value="market" @update-value="(v) => (market = v)">
        <NTab name="gamefi">gameFi</NTab>
        <NTab name="nft">NFT市场</NTab>
      </NTabs>
      <NSelect v-model:value="listType" :options="options" class="market-select" />
    </div>
    <template v-if="listType !== CardType.record">
      <NGrid :x-gap="20" :y-gap="20" cols="2 1000:5 800:5 400:2">
        <NGridItem v-for="item in list" :key="item.owner">
          <MarketCard @updateList="queryMarketList" :item="item" :type="listType" :data-type="item.type" />
        </NGridItem>
      </NGrid>
      <NSpace style="margin: 10px 0" align="center" justify="center">
        <NSpin size="small" v-if="loading" />
        <!-- <NButton text v-else-if="!loading && type === 'Model'" @click="$router.push('/market')">查看更多</NButton> -->
      </NSpace>
    </template>
    <template v-else>
      <NDataTable :columns="columns" :data="recordList" :loading="loading" />
    </template>
  </div>
</template>
<script lang="ts" setup>
import { NTab, NTabs, NSelect, NGrid, NGridItem, NSpace, NSpin, NButton, NDataTable, NImage, NEllipsis, NTag } from "naive-ui";
import { computed, h, ref, watch } from "vue";
import { QueryMarket } from "@/api/index.d";

import MarketCard from "@/components/market/Card.vue";
import { type CardItem, CardType } from "@/components/market/types";

import { IMG_URLS } from "@/constants/img";

import { useWallet } from "@game-web/base";
import { useBaseStore } from "@/store/index";

import { getMarkets, getMySell, getMyTrade, getTransactionRecord } from "@/components/market/userFunc";

type PageType = "Model" | "Page";

withDefaults(defineProps<{ type?: PageType }>(), { type: "Page" });

const market = ref<QueryMarket["type"]>("gamefi");
const listType = ref<CardType>(CardType.all);
const { address } = useWallet();
const baseStore = useBaseStore();

const list = ref<CardItem[]>([]);
const recordList = ref([]);

const columns = ref<any>([
  {
    title: "资产",
    key: "img_url",
    align: "center",
    width: "100px",
    render(row: any) {
      return h(NImage, { src: IMG_URLS[row.name], width: 50 });
    },
  },
  {
    title: "名称",
    key: "name",
    align: "center",
    width: "100px",
  },
  {
    title: "数量",
    key: "num",
    align: "center",
    width: "100px",
  },
  {
    title: "价格",
    key: "price",
    align: "center",
    width: "100px",
  },
  {
    title: "类型",
    key: "type",
    align: "center",
    width: "100px",
  },
  {
    title: "交易类型",
    key: "record_type",
    align: "center",
    width: "100px",
    render: (row: any) => {
      return h(NTag, { size: "small" }, row.record_type === "sell" ? "卖出" : "买入");
    },
  },
  {
    title: "买家/卖家",
    key: "buyer",
    align: "center",
    width: "100px",
    render(row: any) {
      return h(NEllipsis, { style: { "max-width": "100px" } }, row.buyer);
    },
  },
]);

// 获取用户信息
const META_ID_ADDRESS = computed(() => baseStore.getUserInfo?.id?.id);

const options = computed<{ label: string; value: CardType }[]>(() => {
  let list = [
    {
      label: "全部",
      value: CardType.all,
    },
  ];
  if (META_ID_ADDRESS.value) {
    list = [
      ...list,
      {
        label: "交易记录",
        value: CardType.record,
      },
      {
        label: "我的出售",
        value: CardType.sell,
      },
      {
        label: "我的资产",
        value: CardType.asset,
      },
    ];
  }
  return list;
});

const loading = ref(false);

const queryMarketList = async () => {
  let data: any = [];
  loading.value = true;
  if (listType.value === CardType.all) {
    data = await getMarkets();
  }
  if (listType.value === CardType.record) {
    const list = (await getTransactionRecord()) as any;
    recordList.value = list.filter((item: any) => item.type === market.value);
  }
  if (listType.value === CardType.asset) {
    data = (await getMyTrade(address.value!, META_ID_ADDRESS.value)) as any;
  }
  if (listType.value === CardType.sell) {
    data = await getMySell(address.value!);
  }
  loading.value = false;

  list.value = data.filter((item: any) => item.type === market.value) as any;
};

watch(
  () => market.value,
  () => {
    queryMarketList();
  },
  {
    immediate: true,
  }
);

watch(
  () => listType.value,
  () => {
    queryMarketList();
  }
);
</script>

<style lang="scss" scoped>
.page-market {
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;

  @include for_breakpoint("max", 800px) {
    padding: 20px !important;
  }

  .operation {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    padding: 20px 0;

    @include for_breakpoint("max", 800px) {
      padding: 0;
    }

    .market-select {
      color: #fff;
      background-color: rgb(247, 247, 250);
      border-radius: 3px;
      width: 120px;

      @include for_breakpoint("max", 800px) {
        width: 100%;
        margin: 20px 0;
      }

      :deep(.n-base-selection-label) {
        background: none;

        .n-base-selection-input__content {
          color: rgb(51, 54, 57);
        }
      }

      :deep(.n-base-selection__border),
      :deep(.n-base-selection__state-border) {
        display: none;
      }
    }
  }
}

.market-tabs {
  width: 30%;
  min-width: 300px;

  @include for_breakpoint("max", 800px) {
    width: 100%;
  }
}
</style>
