<template>
  <div class="page-game">
    <!-- <button @click="sendMsg">发送消息</button> -->
    <iframe ref="iframe" :src="`https://shui.game/demo/index.html`" width="100%" height="100%" frameborder="0"></iframe>
  </div>
</template>
<script lang="ts" setup>
import { getMessage, sendMessage } from "@game-web/base";
import { ref } from "vue";
import { useSui } from "./test";
import { onMounted } from "vue";

const iframe = ref<HTMLIFrameElement>();
const origin = ref(window.location.origin);

onMounted(() => {
  const { send } = useSui(iframe.value as HTMLIFrameElement);
  getMessage((data: any) => {
    send(data);
  });

  iframe.value?.addEventListener("load", () => {
    sendMessage(iframe.value as HTMLIFrameElement, { data: "123" });
  });
});

// const sendMsg = () => {
//   iframe.value?.contentWindow?.postMessage(
//     {
//       type: 'SUI_MESSAGE',
//       unityType: 'xx',
//       data: {}
//     },
//     '*'
//   );
// };

// window.addEventListener('message', (e) => {
//   const { type, data } = e.data;
//   if (type === 'suiMessage') {
//     console.log('获取子页面的数据', data);
//   }
//   自定义事件
//   if (type === 'xxx') {
//     console.log('到自定义事件', data);
//   }
// });
</script>

<style lang="scss">
#app,
.n-config-provider,
.page-game {
  width: 100%;
  height: 100%;
}
</style>
