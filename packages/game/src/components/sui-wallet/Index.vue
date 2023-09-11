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
        <slot> Connect Wallet </slot>
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

import {
  useWallet,
  useNftsOwnedByAddressInSpecificChain,
  useOwnedCoinsWithBalances
} from '@game-web/base';

import type { IWallet } from '@game-web/base/hooks/useSui/types';
import { onMounted } from 'vue';
import { useMessage } from 'naive-ui';
import { useI18n } from 'vue-i18n';

defineProps<{ loading?: boolean }>();
const emits = defineEmits(['moveCall', 'update:loading']);

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

watch(address, async (val) => {
  if (val) {
    await getOwnedCoinsAndBalances();
    getOwnedNfts();
  }
});

const moveCall = async () => {
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
  display: block;
  cursor: pointer;
}
</style>
