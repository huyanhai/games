<template>
  <NTabs :value="showItem" type="segment" class="meta-box" @updateValue="change">
    <NTabPane v-for="item in gameList" :key="item.key" :name="item.key" :tab="item.name">
      <div class="btns">
        <NSpace v-if="item.key < 2">
          <NButton color="rgb(31, 34, 37)">游戏介绍</NButton>
          <NButton color="rgb(31, 34, 37)" @click="open" v-if="address"> 开始游戏 </NButton>
        </NSpace>
        <NSpace v-else>
          <NButton color="rgb(31, 34, 37)">游戏介绍</NButton>
          <NButton color="rgb(31, 34, 37)">游戏正在开发</NButton>
        </NSpace>
      </div>
      <img :src="item.img" alt="" srcset="" />
    </NTabPane>
  </NTabs>
  <NModal v-model:show="showModal">
    <div
      class="iframe-container"
      :style="{
        '--iframe-width': `${width * 0.8}px`,
        '--iframe-height': `${height * 0.8}px`,
      }"
    >
      <NButton class="close" circle color="#00c3ff" @click="showModal = false">
        <template #icon>
          <NIcon>
            <MdClose class="icon" />
          </NIcon>
        </template>
      </NButton>
      <NCard :bordered="false" class="iframe-card">
        <iframe :src="iframeUrl" width="100%" height="100%" frameborder="0" ref="iframe"></iframe>
      </NCard>
    </div>
  </NModal>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { NModal, NCard, NButton, NIcon, NTabs, NTabPane, NSpace, useMessage } from "naive-ui";
import { useWindowSize } from "@vueuse/core";
import { MdClose } from "@vicons/ionicons4";
import { useWallet, getMessage, sendMessage, SuiTxBlock, type IframeData, messageType } from "@game-web/base";

import P1 from "@/assets/p1.jpg";
import P2 from "@/assets/p2.jpg";

import { useBaseStore } from "@/store/index";

const { width, height } = useWindowSize();
const { address, signAndSendTxn } = useWallet();

const iframe = ref<HTMLIFrameElement>();
const showModal = ref(false);
const message = useMessage();

const gameList = [
  {
    key: 1,
    name: "火星前哨站",
    img: P1,
    url: "https://shui.one/demo",
  },
  {
    key: 2,
    name: "太空浮岛",
    img: P2,
    url: "https://shui.one/demo",
  },
  {
    key: 3,
    name: "移动矿场",
    img: P1,
    url: "https://shui.one/demo",
  },
  {
    key: 4,
    name: "异星战场",
    img: P1,
    url: "https://shui.one/demo",
  },
  {
    key: 5,
    name: "暗黑森林",
    img: P1,
    url: "https://shui.one/demo",
  },
];
const baseStore = useBaseStore();
const showItem = ref(1);
const iframeUrl = computed(() => {
  return gameList.filter((item) => item.key === showItem.value)[0].url;
});

const userInfo = computed<any>(() => baseStore.getUserInfo);

const change = (v: number) => {
  if (v > 2) {
    return message.error("暂未开放");
  }
  showItem.value = v;
};

const open = () => {
  showModal.value = true;
  const tx = new SuiTxBlock();

  const send = async (data: IframeData, type: messageType) => {
    if (type === messageType.SUI_ADDRESS) {
      return sendMessage(iframe.value as HTMLIFrameElement, { data: { address: address.value, metaId: userInfo.value?.id?.id as any } }, messageType.SUI_ADDRESS_RESPONSE);
    }
    try {
      tx.moveCall(data.target, data.args);
      const { digest } = await signAndSendTxn(tx);
      sendMessage(iframe.value as HTMLIFrameElement, { data: digest });
    } catch (err: any) {
      sendMessage(iframe.value as HTMLIFrameElement, err);
    }
  };

  const getAddress = () => {};

  getMessage((data: any, type: messageType) => {
    send(data, type);
  });
};
</script>

<style lang="scss" scoped>
.iframe-container {
  :root {
    --iframe-width: 100%;
    --iframe-height: 100%;
  }
  width: var(--iframe-width);
  height: var(--iframe-height);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  .iframe-card {
    width: 100%;
    height: 100%;
    :deep(.n-card__content) {
      padding: 0;
    }
  }
  .close {
    position: absolute;
    z-index: 2;
    right: 10px;
    top: 10px;
    background: rgba($color: #000000, $alpha: 0.5);
    .icon {
      fill: #fff;
    }
  }
}
.meta-box {
  padding: 20px;
  position: relative;
  img {
    width: 100%;
  }
  :deep(.n-tab-pane) {
    padding: 0;
    position: relative;
  }
  :deep(.n-tabs-rail) {
    margin-bottom: 20px;
    overflow-x: scroll;
    background: none;
    &::-webkit-scrollbar {
      display: none;
    }
    .n-tabs-tab {
      padding-left: 10px;
      padding-right: 10px;
      &.n-tabs-tab--active {
        background: none;
        box-shadow: none;
        color: #00c3ff;
        background:
          linear-gradient(to left, #00c3ff, #00c3ff) left top no-repeat,
          linear-gradient(to bottom, #00c3ff, #00c3ff) left top no-repeat,
          linear-gradient(to left, #00c3ff, #00c3ff) right top no-repeat,
          linear-gradient(to bottom, #00c3ff, #00c3ff) right top no-repeat,
          linear-gradient(to left, #00c3ff, #00c3ff) left bottom no-repeat,
          linear-gradient(to bottom, #00c3ff, #00c3ff) left bottom no-repeat,
          linear-gradient(to left, #00c3ff, #00c3ff) right bottom no-repeat,
          linear-gradient(to left, #00c3ff, #00c3ff) right bottom no-repeat;
        background-size:
          2px 10px,
          10px 2px,
          2px 10px,
          10px 2px;
      }
    }
  }
  .btns {
    left: 50%;
    bottom: 10%;
    position: absolute;
    transform: translateX(-50%);
  }
}
</style>
