<template>
  <div id="scrollContainer" class="page-home">
    <HeaderWrapper />
    <Card />
  </div>
</template>

<script setup lang="ts">
import HeaderWrapper from '@/components/Header.vue';
import Card from './components/Card.vue';
</script>

<style lang="scss">
.page-home {
  background: url('@/assets/bg.png') no-repeat center;
  width: 100%;
  height: 100%;
  background-size: cover;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
