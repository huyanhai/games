<template>
  <header
    ref="header"
    class="m-header"
    :style="{ '--top': (positionY * 0.01) / 5 }"
  >
    <div class="header-row">
      <div class="col-l">
        <img src="@/assets/icon.png" alt="" srcset="" />
        <span>Mate</span>
      </div>
      <nav class="col-r">
        <a v-for="(item, index) in nav" :key="index">{{ item.text }}</a>
        <SuiWallet>
          <button class="btn">
            {{ address ? address : 'Connect Wallet' }}
          </button>
        </SuiWallet>
      </nav>
    </div>
  </header>
</template>
<script lang="ts" setup>
import SuiWallet from './sui-wallet/Index.vue';
import { useWallet } from '@game-web/base';
import { onMounted, onUnmounted, ref } from 'vue';
import { debounce } from 'lodash-es';

const { address } = useWallet();
let positionY = ref();

const scroll = debounce((e: any) => {
  const { scrollTop } = e.target;
  positionY.value = scrollTop > 100 ? 100 : scrollTop;
}, 100);

onMounted(() => {
  document
    .querySelector('#scrollContainer')
    ?.addEventListener('scroll', scroll, false);
});

onUnmounted(() => {
  document
    .querySelector('#scrollContainer')
    ?.removeEventListener('scroll', scroll, false);
});

const nav = [
  {
    text: 'Home',
    link: '/'
  },
  {
    text: 'Content',
    link: '/'
  },
  {
    text: 'Market',
    link: '/'
  }
];
</script>

<style lang="scss" scoped>
:root {
  --top: 0;
}
.m-header {
  position: absolute;
  width: 100%;
  background: rgba(255, 255, 255, var(--top));
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  transition: all 0.1s;
  .header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    max-width: 1200px;
    width: 100%;
    margin: 0px auto;
    box-sizing: border-box;
  }
  .col-l,
  .col-r {
    display: flex;
    align-items: center;
    color: #fff;
  }
  .col-l {
    font-size: 20px;
    img {
      width: 40px;
      margin-right: 10px;
    }
  }
  .col-r {
    a {
      margin: 0 10px;
      cursor: pointer;
      font-size: 14px;
      opacity: 0.5;
      transition: all 0.3s;
      &:hover {
        color: #ffc681;
        opacity: 1;
      }
    }
    .btn {
      padding: 0 10px;
      height: 30px;
      line-height: 30px;
      background: linear-gradient(#ffbb96, rgb(238, 135, 104));
      border-radius: 4px;
      font-size: 12px;
      margin-left: 20px;
      max-width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
