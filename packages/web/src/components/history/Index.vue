<template>
  <div class="m-history">
    <div class="ui-title">{{ $t('home.play_history') }}</div>
    <div class="box">
      <div class="top">
        <div v-for="(item, index) in top" :key="index" class="item">
          <div class="title">{{ item.title }}</div>
          <div class="info">
            <p v-html="item.text"></p>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div v-for="(item, index) in bottom" :key="index" class="item">
          <div class="title">{{ item.title }}</div>
          <div class="info">
            <p v-html="item.text"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const top = computed(() => [
  {
    title: t('home.history_t_tle1'),
    text: t('home.history_t_txt1')
  },
  {
    title: t('home.history_t_tle2'),
    text: t('home.history_t_txt2')
  }
]);

const bottom = computed(() => [
  {
    title: t('home.history_b_tle1'),
    text: t('home.history_b_txt1')
  },
  {
    title: t('home.history_b_tle2'),
    text: t('home.history_b_txt2')
  },
  {
    title: t('home.history_b_tle3'),
    text: t('home.history_b_txt3')
  }
]);
</script>

<style lang="scss" scoped>
.m-history {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;

  .ui-title {
    font-size: 3vw;
    margin: 4vw auto;
    @include for_breakpoint('min') {
      font-size: vwTopx(3vw);
      margin: vwTopx(4vw) auto;
    }
    @include for_breakpoint('max', 800px) {
      font-size: 20px;
      margin: 0px auto 40px auto;
    }
  }
  .box {
    @include for_breakpoint('max', 800px) {
      display: flex;
    }
  }
  .top,
  .bottom {
    display: flex;
    justify-content: space-between;
    height: 20vw;
    @include for_breakpoint('min') {
      height: 324px;
    }
    @include for_breakpoint('max', 800px) {
      display: flex;
      flex-direction: column;
      width: 50%;
      height: 800px;
    }
    .item {
      width: 25vw;
      background: #fff;
      text-align: left;
      border: 2px solid #00c3ff;
      box-shadow: #cccccc 1px 1px 20px 1px;
      position: relative;
      box-sizing: border-box;
      padding: 1vw;
      height: 18vw;
      p {
        line-height: 15px;
      }
      @include for_breakpoint('min') {
        width: 344px;
        padding: 16px;
        height: 291px;
      }
      @include for_breakpoint('max', 800px) {
        width: 100%;
        padding: 10px;
        height: initial;
      }
      &::before {
        content: '';
        width: 0;
        height: 0;
        display: block;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        @include for_breakpoint('max', 800px) {
          top: 50%;
          transform: translateY(-50%);
          left: initial;
          right: -10px;
        }
      }
      &::after {
        content: '';
        display: block;
        position: absolute;
        width: 1vw;
        height: 1vw;
        background: #fff;
        border: 2px solid #00c3ff;
        border-radius: 1vw;
        left: 50%;
        transform: translateX(-50%);
        @include for_breakpoint('min') {
          width: 16px;
          height: 16px;
          border-radius: 16px;
        }
        @include for_breakpoint('max', 800px) {
          width: 10px;
          height: 10px;
          border-radius: 10px;
          left: initial;
          top: 50%;
          transform: translateY(-50%);
          right: -18px;
        }
      }
      .title {
        font-size: 1.4vw;
        color: #00c3ff;
        @include for_breakpoint('min') {
          font-size: 22px;
        }
        @include for_breakpoint('max', 800px) {
          font-size: 14px;
        }
      }
      .info {
        line-height: 2vw;
        font-size: 0.8vw;
        @include for_breakpoint('min') {
          line-height: 32px;
          font-size: 12px;
        }
        @include for_breakpoint('max', 800px) {
          line-height: 14px;
          font-size: 12px;
        }
      }
    }
  }
  .top {
    border-bottom: 1px solid #c7c7c7;
    padding: 0 14vw 2vw 14vw;
    @include for_breakpoint('min') {
      padding: 0 226px 32px 226px;
    }
    @include for_breakpoint('max', 800px) {
      padding: 200px 10px 160px 10px;
      border: 0;
      border-right: 1px solid #c7c7c7;
    }
    .item {
      &::before {
        border-top: 1vw solid #00c3ff;
        border-right: 1vw solid transparent;
        border-left: 1vw solid transparent;
        bottom: -1vw;
        @include for_breakpoint('min') {
          border-top: 16px solid #00c3ff;
          border-right: 16px solid transparent;
          border-left: 16px solid transparent;
          bottom: -16px;
        }
        @include for_breakpoint('max', 800px) {
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-left: 6px solid #00c3ff;
          bottom: initial;
        }
      }
      &::after {
        bottom: -2.6vw;
        @include for_breakpoint('min') {
          bottom: -42px;
        }
        @include for_breakpoint('max', 800px) {
          bottom: initial;
        }
      }
    }
  }
  .bottom {
    padding-top: 2vw;
    @include for_breakpoint('min') {
      padding-top: 32px;
    }
    @include for_breakpoint('max', 800px) {
      padding: 10px;
    }
    .item {
      &::before {
        border-bottom: 1vw solid #00c3ff;
        border-right: 1vw solid transparent;
        border-left: 1vw solid transparent;
        top: -1vw;
        @include for_breakpoint('min') {
          border-bottom: 16px solid #00c3ff;
          border-right: 16px solid transparent;
          border-left: 16px solid transparent;
          top: -16px;
        }
        @include for_breakpoint('max', 800px) {
          top: 50%;
          left: -10px;
          border-top: 6px solid transparent;
          border-right: 6px solid #00c3ff;
          border-bottom: 6px solid transparent;
          bottom: initial;
        }
      }
      &::after {
        top: -2.6vw;
        @include for_breakpoint('min') {
          top: -42px;
        }
        @include for_breakpoint('max', 800px) {
          top: 50%;
          left: -18px;
        }
      }
    }
  }
}
</style>
