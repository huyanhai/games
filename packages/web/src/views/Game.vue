<template>
  <div class="page-game">
    <!-- <button @click="sendMsg">发送消息</button> -->
    <iframe
      ref="iframe"
      :src="`${origin}/tree/index.html`"
      width="100%"
      height="100%"
      frameborder="0"
    ></iframe>
  </div>
</template>
<script lang="ts" setup>
import { getMessage } from '@game-web/base';
import { ref } from 'vue';
import { useSui } from './test';
import { onMounted } from 'vue';

const iframe = ref<HTMLIFrameElement>();
const origin = ref(window.location.origin);

onMounted(() => {
  const { send } = useSui(iframe.value as HTMLIFrameElement);
  getMessage((data: any) => {
    send(data);
  });
});

// const sendMsg = () => {
//   iframe.value?.contentWindow?.postMessage(
//     {
//       type: 'SUI_MESSAGE',
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
