<template>
  <div class="m-game">
    <div class="col-l">
      <h3>Token Economic Model</h3>
      <NDataTable bordered :columns="columns" :data="data"></NDataTable>
    </div>
    <div class="col-r">
      <div class="echart-container">
        <Bar />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { NDataTable } from 'naive-ui';
import { ref } from 'vue';

import Bar from '../echart/Bar.vue';

const columns = ref([
  {
    title: 'Allocation',
    key: 'allocation'
  },
  {
    title: 'Amount',
    key: 'amount'
  },
  {
    title: 'Ratio',
    key: 'ratio'
  },
  {
    title: 'Distribution',
    key: 'distribution'
  },
  {
    title: 'Usage',
    key: 'usage'
  }
]);

const data = ref([
  {
    allocation: 'Meta Game',
    amount: '1,200,000,000 SHUI',
    ratio: '57 %',
    distribution: 'Mining',
    usage: 'Metaverse Economic'
  },
  {
    allocation: 'Meta Game',
    amount: '1,200,000,000 SHUI',
    ratio: '57 %',
    distribution: 'Mining',
    usage: 'Metaverse Economic'
  }
]);
</script>

<style lang="scss" scoped>
.m-game {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 0 2vw;
  .col-l {
    width: 60%;
    box-sizing: border-box;
    padding-right: 2vw;
    h3 {
      font-size: 3.4vw;
      color: #272727;
      margin: 3vw;
    }
  }
  .col-r {
    width: 40%;
    .echart-container {
      width: 100%;
      height: 40vw;
      box-sizing: border-box;
      padding-top: 5vw;
    }
  }
}
</style>
