<template>
  <canvas ref="logo"></canvas>
</template>
<script lang="ts" setup>
import renderLogo from '@/utils/renderLogo';
import { onMounted, ref } from 'vue';

const logo = ref();

onMounted(() => {
  renderLogo(logo.value);
});
</script>

<style lang="scss" scoped></style>
