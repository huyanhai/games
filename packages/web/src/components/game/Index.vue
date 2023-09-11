<template>
  <div class="m-game">
    <div class="col-l">
      <h3>{{ $t('home.token_model') }}</h3>
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
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { data } from '@/constants/swap';

import Bar from '../echart/Bar.vue';

const { t } = useI18n();

const columns: any = computed(() => [
  {
    title: t('home.project_name'),
    key: 'project_name',
    align: 'center'
  },
  {
    title: t('home.assigned_quantity'),
    key: 'assigned_quantity',
    align: 'right'
  },
  {
    title: t('home.percentage'),
    key: 'percentage',
    align: 'center'
  },
  {
    title: t('home.other'),
    key: 'other',
    align: 'center'
  }
]);
</script>

<style lang="scss" scoped>
.m-game {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  max-width: 1400px;
  margin: 0 auto;
  .col-l {
    width: 60%;
    box-sizing: border-box;
    padding-right: 2vw;
    @include for_breakpoint('min') {
      padding-right: 32px;
    }
    @include for_breakpoint('max', 800px) {
      width: 100%;
      padding: 0 10px;
    }
    h3 {
      color: #272727;
      font-size: 3.4vw;
      margin: 3vw;
      @include for_breakpoint('min') {
        font-size: 55px;
        margin: 48px;
      }
      @include for_breakpoint('max', 800px) {
        font-size: 18px;
        margin: 10px;
      }
    }
  }
  .col-r {
    width: 40%;
    @include for_breakpoint('max', 800px) {
      width: 100%;
    }
    .echart-container {
      width: 100%;
      box-sizing: border-box;
      height: 40vw;
      padding-top: 5vw;
      @include for_breakpoint('min') {
        height: 648px;
        padding-top: 81px;
      }
      @include for_breakpoint('max', 800px) {
        height: 400px;
        padding-top: 20px;
        padding: 20px;
      }
    }
  }
}
</style>
