<template>
  <div class="market-card">
    <div class="card-hd">
      <img class="empty" src="@/assets/empty-img.svg" />
      <img :src="item.post" class="post" />
    </div>
    <div class="card-bd"></div>
    <div class="card-ft">
      <span class="row">
        <h3 class="title">
          {{ item.title }}
        </h3>
        <img src="@/assets/xy.svg" alt="" srcset="" />
      </span>
      <p class="price">{{ item.price }}</p>
    </div>
    <div class="mask">
      <button
        v-if="[CardType.transaction, CardType.assets].includes(type)"
        class="red"
        @click="sell"
      >
        {{ type === CardType.transaction ? '购买' : '出售' }}
      </button>
      <button v-if="type === CardType.sell" class="red" @click="sell">
        取消出售
      </button>
      <button class="white">
        {{ type === CardType.transaction ? '取消' : '关闭' }}
      </button>
    </div>
    <NModal
      v-model:show="showModal"
      class="market-modal"
      :mask-closable="false"
    >
      <NCard closable :title="'我要出售'" @close="close">
        <NForm :show-label="false">
          <NFormItem>
            <NInput v-model:value="form.price" placeholder="请输入价格" />
          </NFormItem>
          <NFormItem>
            <NSelect
              v-model:value="form.type"
              placeholder="请选择类型"
              :options="options"
            />
          </NFormItem>
          <NFormItem>
            <NSpace>
              <NButton type="primary" @click="confirm">确定</NButton>
              <NButton @click="close">取消</NButton>
            </NSpace>
          </NFormItem>
        </NForm>
      </NCard>
    </NModal>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import {
  NModal,
  NCard,
  NForm,
  NFormItem,
  NInput,
  NSelect,
  NButton,
  NSpace
} from 'naive-ui';
import { type CardItem, CardType } from './types';
defineProps<{
  item: CardItem;
  type: CardType;
}>();

const showModal = ref(false);
const form = reactive({
  type: undefined,
  price: ''
});

const options = [{ label: 'SUI', value: 'SUI' }];

const sell = () => {
  showModal.value = true;
};

const close = () => {
  showModal.value = false;
};

const confirm = () => {
  close();
};
</script>

<style lang="scss" scoped>
.market-card {
  border-radius: 6px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 16px;
  transition:
    box-shadow 0.25s ease-in-out 0s,
    transform 0.25s ease 0s;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 24px;
    background: rgb(255, 255, 255);
    transform: translate(0px, -4px);
  }
  position: relative;
  &:hover {
    .mask {
      display: flex;
      opacity: 1;
    }
  }
  .mask {
    position: absolute;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: rgba($color: #000000, $alpha: 0.8);
    inset: 0;
    width: initial;
    height: initial;
    display: none;
    transition: all 0.3s;
    opacity: 0;
    button {
      width: 60%;
      height: 40px;
      border-radius: 4px;
      margin-bottom: 10px;
      &.white {
        background: #fff;
      }
      &.red {
        background: red;
        color: white;
      }
      &.blue {
        background: #00c3ff;
      }
    }
  }
  .card-hd {
    position: relative;
    .empty {
      width: 100%;
    }
    .post {
      position: absolute;
      inset: 0;
      object-fit: cover;
      margin: auto;
      display: block;
      width: 0px;
      height: 0px;
      min-width: 100%;
      max-width: 100%;
      min-height: 100%;
      max-height: 100%;
    }
  }
  .card-ft {
    padding: 20px 10px;
    text-align: left;
    .row {
      display: flex;
      justify-content: left;
      align-items: center;
    }
    .title {
      font-size: 16px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    img {
      width: 20px;
      height: 20px;
      display: inline-block;
      flex: 0 0 auto;
      margin: 0 5px;
    }
    .price {
      font-size: 16px;
    }
  }
}
.market-modal {
  width: 80%;
  max-width: 700px;
}
</style>
