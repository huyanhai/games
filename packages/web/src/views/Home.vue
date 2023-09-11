<template>
  <Login />
  <Lang />
  <HomeTop />
  <Ad />
  <Game />
  <History />
  <Join />
</template>

<script setup lang="ts">
import { genIp } from '@/api';
import { onBeforeMount } from 'vue';

import HomeTop from '@/components/home-top/Index.vue';
import Ad from '@/components/ad/Index.vue';
import Game from '@/components/game/Index.vue';
import History from '@/components/history/Index.vue';
import Join from '@/components/join/Index.vue';
import Lang from '@/components/lang/Index.vue';
import Login from '@/components/login/Index.vue';

// const Game = () => import('@/components/game/Index.vue');
// const History = () => import('@/components/history/Index.vue');
// const Join = () => import('@/components/join/Index.vue');

onBeforeMount(() => {
  genIp();
});
</script>

<style lang="scss"></style>
