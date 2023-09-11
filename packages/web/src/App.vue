<template>
  <NConfigProvider :theme-overrides="themeOverrides">
    <NMessageProvider>
      <router-view />
      <Register />
    </NMessageProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import {
  NMessageProvider,
  NConfigProvider,
  type GlobalThemeOverrides
} from 'naive-ui';
import Register from '@/components/register/Index.vue';

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
a {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
input,
.n-input__placeholder,
.n-form-item-feedback__line {
  text-align: left !important;
}

#cco {
  color: aliceblue;
}

.user-divider {
  &.n-divider--dashed {
    .n-divider__line {
      border-color: #333;
    }
  }
  .n-divider__title {
    font-size: 1.2vw;
    color: #333;
    @include for_breakpoint('min') {
      font-size: 19px;
    }
    @include for_breakpoint('max', 800px) {
      font-size: 16px;
    }
  }
}

.table-header {
  text-align: center !important;
  background: #333333;
  color: #fff;
}

select option {
  color: #333333 !important;
  background: #fff !important;
}

select::selection {
  background: #fff !important;
}
</style>
