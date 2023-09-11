<template>
  <div class="m-login" :class="'blue'">
    <button class="ui-button op" @click="showModal = !showModal">
      {{ $t('home.link_waller') }}
    </button>
  </div>
  <Modal v-model="showModal" />
</template>
<script lang="ts" setup>
import Modal from './Modal.vue';
import { ref } from 'vue';

const showModal = ref(false);
</script>

<style lang="scss" scoped>
.m-login {
  position: absolute;
  top: 10px;
  right: 100px;
  z-index: 10;
  color: #fff;
  display: flex;
  align-items: center;
  font-size: 12px;
  @include for_breakpoint('min') {
    right: 120px;
    font-size: 12px;
  }
  @include for_breakpoint('max', 800px) {
    right: 80px;
    font-size: 12px;
  }
  &.red {
    .ui-button {
      background: red;
    }
  }
  &.green {
    .ui-button {
      background: #43974e;
    }
  }
  &.blue {
    .ui-button {
      background: #479ee3;
    }
  }
  .ui-button {
    height: 20px;
    border-radius: 80px;
    padding: 0 10px;
    position: relative;
    white-space: nowrap;
    @include for_breakpoint('min') {
      height: 30px;
      font-size: 12px;
    }
    &.line {
      border: 0.5px solid white;
      background: none;
      margin-left: 5px;
    }
    &.op {
      z-index: 1;
      box-sizing: content-box;
      border: 2px solid #333;
    }
    &.info {
      width: 80px;
      overflow: hidden;
      white-space: normal;
      text-overflow: ellipsis;
      margin-left: -18px;
      padding-left: 25px;
    }
  }
}
.balance-row {
  display: flex;
  flex-direction: column;
  text-align: left;
  .line {
    border-bottom: 1px solid #dedede;
    height: 30px;
    line-height: 30px;
    display: flex;
    align-items: center;
    width: 150px;
    justify-content: space-between;
    &:last-child {
      border: none;
    }
    i {
      font-style: normal;
    }
  }
  p {
    color: #479ee3;
    display: flex;
    align-items: center;
    img {
      flex: 0 0 auto;
      width: 18px;
      height: 18px;
      margin-right: 10px;
    }
  }
}
.account-container {
  width: 200px;
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
    padding: 10px 0;
    &:last-child {
      border: none;
    }
    span {
      flex: 0 0 auto;
      width: 30px;
      height: 30px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .col-r {
      flex: 1 0 auto;
      width: 50%;
      margin-left: 20px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      &::v-deep(.ui-spin) {
        width: auto;
      }
      p {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        text-align: right;
        width: 50%;
        flex: 1 0 auto;
        margin-left: 10px;
      }
    }
  }
}
</style>
