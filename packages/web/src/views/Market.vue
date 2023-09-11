<template>
  <div class="page-market">
    <div class="operation">
      <NTabs
        class="market-tabs"
        type="segment"
        :value="market"
        @update-value="(v) => (market = v)"
      >
        <NTab name="meta">元宇宙市场</NTab>
        <NTab name="transaction">交易市场</NTab>
      </NTabs>
      <NSelect
        v-model:value="listType"
        :options="options"
        class="market-select"
      />
    </div>
    <NGrid :x-gap="20" :y-gap="20" cols="2 1000:5 800:5 400:2">
      <NGridItem v-for="item in list" :key="item.title">
        <MarketCard :item="item" :type="listType" />
      </NGridItem>
    </NGrid>
  </div>
</template>
<script lang="ts" setup>
import { NTab, NTabs, NSelect, NGrid, NGridItem } from 'naive-ui';
import { ref } from 'vue';

import MarketCard from '@/components/market/Card.vue';
import { type CardItem, CardType } from '@/components/market/types';
const market = ref('meta');
const listType = ref<CardType>(CardType.transaction);

const img = () => {
  const list = [
    'https://i.seadn.io/gcs/files/ee5c835ca7927237f4dbac8270dc4c0f.png?auto=format&dpr=1&h=500&fr=1',
    'https://i.seadn.io/gcs/files/ab807642e3d13ef82003f5c4e054552e.jpg?auto=format&dpr=1&h=500',
    'https://i.seadn.io/gcs/files/79a613560bd2b8f8976e0aa50ccfa150.png?auto=format&dpr=1&h=500',
    'https://i.seadn.io/gcs/files/d2abb93ad1a91c6269e1dcdc7f12f6e4.png?auto=format&dpr=1&h=500',
    'https://i.seadn.io/gcs/files/ad1e0678638ae7ae9c7eb4ef88c3f409.png?auto=format&dpr=1&h=500'
  ];

  return list[parseInt(`${(Math.random() * 10) / 2}`)];
};

const list = ref<CardItem[]>([
  {
    post: img(),
    title: 'The Sandbox - Turkishverse LAND Sale',
    price: '16,666 SAND'
  },
  {
    post: img(),
    title: 'The Sandbox - Turkishverse LAND Sale',
    price: '16,666 SAND'
  },
  {
    post: img(),
    title: 'The Sandbox - Turkishverse LAND Sale',
    price: '16,666 SAND'
  },
  {
    post: img(),
    title: 'The Sandbox - Turkishverse LAND Sale',
    price: '16,666 SAND'
  },
  {
    post: img(),
    title: 'The Sandbox - Turkishverse LAND Sale',
    price: '16,666 SAND'
  },
  {
    post: img(),
    title: 'The Sandbox - Turkishverse LAND Sale',
    price: '16,666 SAND'
  }
]);

const options = ref<{ label: string; value: CardType }[]>([
  {
    label: '交易市场',
    value: CardType.transaction
  },
  {
    label: '我的出售',
    value: CardType.sell
  },
  {
    label: '我的资产',
    value: CardType.assets
  }
]);
</script>

<style lang="scss" scoped>
.page-market {
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;

  @include for_breakpoint('max', 800px) {
    padding: 20px !important;
  }

  .operation {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    padding: 20px 0;

    @include for_breakpoint('max', 800px) {
      padding: 0;
    }

    .market-select {
      color: #fff;
      background-color: rgb(247, 247, 250);
      border-radius: 3px;
      width: 120px;

      @include for_breakpoint('max', 800px) {
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

  @include for_breakpoint('max', 800px) {
    width: 100%;
  }
}
</style>
