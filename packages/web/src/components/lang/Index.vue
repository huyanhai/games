<template>
  <div class="m-lang">
    <select :value="lang" @change="(e:any) => setLang(e.target.value)">
      <option v-for="(item, index) in langList" :key="index" :value="item.code">
        {{ item.text }}
      </option>
    </select>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { setAppLang } from '@/locales';
import type { TBaseStare } from '@/store/modules/base';

import { useBaseStore } from '@/store/index';

const baseStore = useBaseStore();

const lang = ref(baseStore.getLang);

const setLang = (lang: TBaseStare['lang']) => {
  setAppLang(lang);
};

const langList = ref([
  {
    text: '中文',
    code: 'zh'
  },
  {
    text: 'English',
    code: 'en'
  }
  //   {
  //     text: '日本语',
  //     code: 'ja'
  //   }
]);
</script>

<style lang="scss" scoped>
.m-lang {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  select {
    width: 80px;
    height: 20px;
    background: none;
    border-radius: 4px;
    outline: none;
    color: #fff;
    border: 1px solid rgba($color: #fff, $alpha: 0.5);
    font-size: 12px;
    box-sizing: border-box;
    padding: 0 0.5vw;
    @include for_breakpoint('min') {
      width: 100px;
      height: 30px;
      font-size: 14px;
      padding: 0 10px;
    }
    @include for_breakpoint('max', 800px) {
      width: 65px;
      height: 20px;
      font-size: 12px;
      padding: 0 5px;
    }
  }
}
</style>
