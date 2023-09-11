<template>
  <div class="m-join">
    <div class="title">{{ $t('home.community') }}</div>
    <div class="card">
      <div class="__title">{{ $t('home.join_dao') }}</div>
      <div class="box">
        <div v-for="(item, index) in lists" :key="index" class="item">
          <div class="logo">
            <img :src="item.img" alt="" srcset="" />
            {{ item.text }}
          </div>
          {{ item.link }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { getAssetsFile } from '@/utils/files';
const lists = ref([
  {
    img: getAssetsFile('twtter.png'),
    text: 'Twitter',
    link: 'https://twitter.com/MetaShui'
  },
  {
    img: getAssetsFile('discord.png'),
    text: 'Discord',
    link: 'https://discord.gg/9jreFbTsS7'
  },
  {
    img: getAssetsFile('telegram.png'),
    text: 'Telegram',
    link: 'https://t.me/MetaShui'
  },
  {
    img: getAssetsFile('github.png'),
    text: 'Github',
    link: 'https://github.com/MetaShui'
  }
]);
</script>

<style lang="scss" scoped>
.m-join {
  width: 100%;
  max-width: 1400px;
  margin: 4vw auto;
  @include for_breakpoint('min') {
    margin: 110px auto;
  }
  @include for_breakpoint('max', 800px) {
    margin: 50px auto;
  }
  .title {
    text-align: center;
    color: #585858;
    font-size: 1.4vw;
    margin-bottom: 2vw;
    @include for_breakpoint('min') {
      font-size: 22px;
      margin-bottom: 32px;
    }
    @include for_breakpoint('max', 800px) {
      font-size: 22px;
      margin-bottom: 32px;
    }
  }
  .card {
    box-shadow: #dddddd 5px 5px 30px 1px;
    background: #fff;
    border-radius: 0.8vw;
    padding: 2vw 2vw 4vw 2vw;
    box-sizing: border-box;
    @include for_breakpoint('min') {
      border-radius: 0.8vw;
      padding: 32px 32px 64px 32px;
    }
    @include for_breakpoint('max', 800px) {
      border-radius: 0.8vw;
      padding: 10px 10px 20px 10px;
      margin: 0 10px;
    }
    .__title {
      font-size: 2vw;
      color: #585858;
      @include for_breakpoint('min') {
        font-size: 32px;
      }
      @include for_breakpoint('max', 800px) {
        font-size: 18px;
      }
    }
    .box {
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 50%;
        display: flex;
        align-items: center;
        color: #585858;
        font-size: 1vw;
        margin-top: 4vw;
        @include for_breakpoint('min') {
          font-size: 16px;
          margin-top: 64px;
        }
        @include for_breakpoint('max', 800px) {
          font-size: 16px;
          margin-top: 20px;
          width: 100%;
        }
        .logo {
          display: flex;
          align-items: center;
          margin-right: 2vw;
          @include for_breakpoint('min') {
            margin-right: 32px;
          }
          @include for_breakpoint('max', 800px) {
            margin-right: 10px;
          }
          img {
            width: 3vw;
            margin-right: 2vw;
            @include for_breakpoint('min') {
              width: 48px;
              margin-right: 32px;
            }
            @include for_breakpoint('max', 800px) {
              width: 20px;
              margin-right: 10px;
            }
          }
          font-size: 1.4vw;
          @include for_breakpoint('min') {
            font-size: vwTopx(1.4vw);
          }
          @include for_breakpoint('max', 800px) {
            font-size: 16px;
          }
          color: #02a4df;
        }
      }
    }
  }
}
</style>
