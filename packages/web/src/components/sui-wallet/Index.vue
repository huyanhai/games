<template>
  <NSpin
    :show="connecting || loading"
    size="small"
    stroke="#fff"
    class="ui-spin"
  >
    <template v-if="!address">
      <div
        v-for="item in configuredWallets"
        :key="item.name"
        @click="select(item)"
      >
        <slot> 连接钱包 </slot>
      </div>
    </template>
    <template v-else>
      <a class="ui-link" @click="moveCall">
        <slot>
          {{ address }}
        </slot>
      </a>
    </template>
  </NSpin>
</template>
<script lang="ts" setup>
import { watch } from 'vue';
import { NSpin } from 'naive-ui';
import { useRegisterStore, useBaseStore } from '@/store/index';

import {
  useWallet,
  useNftsOwnedByAddressInSpecificChain,
  useOwnedCoinsWithBalances
} from '@game-web/base';

import type { IWallet } from '@game-web/base/hooks/useSui/types';
import { computed, onMounted } from 'vue';
import { useMessage } from 'naive-ui';
import { useI18n } from 'vue-i18n';

defineProps<{ loading?: boolean }>();
const emits = defineEmits(['moveCall', 'update:loading']);

const registerStore = useRegisterStore();
const baseStore = useBaseStore();
const message = useMessage();
const { t } = useI18n();

const { getOwnedNfts } = useNftsOwnedByAddressInSpecificChain();
const { getOwnedCoinsAndBalances } = useOwnedCoinsWithBalances();

const { configuredWallets, selectWallet, address, connecting, makAutoConnect } =
  useWallet();

const select = async (wallet: IWallet) => {
  try {
    await selectWallet(wallet.name);
  } catch (error) {
    message.error(t('home.install_tips'));
  }
};

const userInfo = computed(() => baseStore.getUserInfo);

// async function handleExecuteMoveCall(target: string | undefined) {
//   if (!target) return;
//   console.log(getAccounts());

//   const tx = new SuiTxBlock();

//   // tx.transferSui(
//   //   '0xcc2bd176a478baea9a0de7a24cd927661cc6e860d5bacecb9a138ef20dbab231',
//   //   1000000000
//   // );

//   const [coins] = tx.splitSUIFromGas([1]);

//   // 兑换shui
//   tx.moveCall(
//     target,
//     [
//       '0xd68347932a1c4663e771557f4c396e8f8bce8b1a78762e0c281d57467082416e',
//       1,
//       tx.makeMoveVec([coins])
//     ],
//     ['0x2::sui::SUI']
//   );

//   // 发送交易
//   signAndSendTxn(tx);

//   // moveCall({
//   //   target,
//   //   arguments: [
//   //     '0xd68347932a1c4663e771557f4c396e8f8bce8b1a78762e0c281d57467082416e',
//   //     1,
//   //     tx.makeMoveVec([coins])
//   //   ],
//   //   typeArguments: ['0x2::sui::SUI']
//   // });

//   // try {
//   //   const resData = await moveCall({
//   //     target,
//   //     arguments: [
//   //       '0x1eb7ba8dfef48e5d715abb2d4ce4fe56309eb6913d6bde63209d5aaa702894c1',
//   //       ['0x62cf7503381603d73ac97303e5662448d62462bb0870ea862a4b1a24e311d7c0']
//   //     ]
//   //   });

//   //   alert('executeMoveCall succeeded (see response in the console)');
//   // } catch (e) {
//   //   console.error('executeMoveCall failed', e);
//   //   alert('executeMoveCall failed (see response in the console)');
//   // }
// }

watch(address, async (val) => {
  if (val) {
    await getOwnedCoinsAndBalances();
    getOwnedNfts();
  }
});

const moveCall = async () => {
  if (!userInfo.value) {
    const data = await baseStore.fetchUserInfo(address.value!);
    if (!(data as any)?.phone) {
      return registerStore.setRegister(true);
    }
  }
  emits('moveCall');
};

onMounted(() => {
  makAutoConnect();
});
</script>

<style lang="scss" scoped>
.ui-spin {
  width: 100%;
  height: 100%;
  ::v-deep(.n-spin-content) {
    width: 100%;
    height: 100%;
  }
}
.ui-link {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
