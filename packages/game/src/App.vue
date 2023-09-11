<template>
  <NConfigProvider :theme-overrides="themeOverrides">
    <NMessageProvider>
      <router-view />
    </NMessageProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import {
  NMessageProvider,
  NConfigProvider,
  type GlobalThemeOverrides
} from 'naive-ui';

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#00c3ff',
    primaryColorHover: '#00c3ff'
  }
};
</script>
<style lang="scss">
body,
html {
  overflow-x: auto;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  font-family: 'Arial', 'sans-serif' !important;
  font-weight: lighter;
  text-align: center;
  transition: background-color;
  position: relative;
}

#app {
  width: 100%;
  height: 100%;
  > div {
    width: 100%;
    height: 100%;
  }
}
</style>
