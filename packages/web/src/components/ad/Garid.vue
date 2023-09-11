<template>
  <div class="user-garid">
    <div class="col">
      <slot name="left"></slot>
    </div>
    <div class="col">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script lang="ts" setup></script>

<style lang="scss" scoped>
.user-garid {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .col {
    width: 50%;
    display: flex;
    justify-content: center;
    text-align: left;
    color: #fff;
    box-sizing: border-box;
    position: relative;
    @include for_breakpoint('max', 800px) {
      width: 100%;
    }
  }
}
</style>
