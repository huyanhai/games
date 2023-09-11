<template>
  <NModal :show="modelValue" width="80%">
    <NCard
      :title="$t('home.link_waller')"
      closable
      class="card"
      @close="$emit('update:modelValue', false)"
    >
      <NSpace vertical :size="20">
        <NSpace v-for="item in walletList" :key="item.type" vertical :size="20">
          <NSpace justify="space-between">
            <p>{{ item.text }}</p>
            <NButton v-if="item.type === 'Sui'" text>
              <SuiWallet v-if="!info.status">connect</SuiWallet>
              <span v-else @click="logout">DisConnect</span>
            </NButton>
            <template v-if="item.type === 'MetaMask'">
              <NButton v-if="!metaMaskAddress" text @click="connectMeta()">
                connect
              </NButton>
              <NButton v-else text @click="connectMeta()"> DisConnect </NButton>
            </template>
          </NSpace>
          <NSpace v-if="item.type === 'Sui'" justify="space-between">
            <template v-if="info.status">
              <div class="img">
                <img :src="item.logo" alt="" srcset="" />
                <p>{{ item.type }}</p>
              </div>
              <div>
                <NSpace :size="10" align="center" justify="end">
                  <NTag
                    round
                    size="small"
                    :bordered="false"
                    :color="{ color: info.className, textColor: 'white' }"
                  >
                    <SuiWallet v-if="info.status === 'isLogin'">
                      {{ info.btnText }}
                    </SuiWallet>
                    <template v-else>
                      {{ info.btnText }}
                    </template>
                  </NTag>
                  <template v-if="info.status === 'isRegistered'">
                    <NPopover>
                      <template #trigger>
                        <NButton text>
                          {{ info.value }}
                        </NButton>
                      </template>
                      <div class="balance-row">
                        <template
                          v-for="item in userBalance"
                          :key="item.coinType"
                        >
                          <div
                            v-if="item.coinType.includes('sui')"
                            class="line"
                          >
                            <p>
                              <img src="@/assets/img-sui.png" alt="" />
                              {{
                                formatMoney(Number(item.totalBalance) / unit)
                              }}
                            </p>
                            <i>SUI</i>
                          </div>
                          <div v-else class="line">
                            <p>
                              <img src="@/assets/nft2.png" alt="" />
                              {{
                                formatMoney(Number(item.totalBalance) / unit)
                              }}
                            </p>
                            <i>SHUI</i>
                          </div>
                        </template>
                      </div>
                    </NPopover>
                  </template>
                  <p v-else class="text">
                    {{ info.value }}
                  </p>
                </NSpace>
              </div>
            </template>
          </NSpace>
          <NSpace v-else justify="space-between">
            <template v-if="metaMaskAddress">
              <div class="img">
                <img :src="item.logo" alt="" srcset="" />
                <p>{{ item.type }}</p>
              </div>
              <div>
                {{ metaMaskAddress }}
              </div>
            </template>
          </NSpace>
        </NSpace>
      </NSpace>
    </NCard>
  </NModal>
</template>
<script lang="ts" setup>
import { NModal, NCard, NSpace, NButton } from 'naive-ui';
import { ref, watch, computed } from 'vue';
import SuiWallet from '../sui-wallet/Index.vue';

import SuiLogo from '@/assets/img-sui.png';
import MetaMaskLogo from '@/assets/metamask.jpg';

import {
  useWallet,
  useOwnedCoinsWithBalances,
  useEthers
} from '@game-web/base';

import { useBaseStore } from '@/store/index';
import { useI18n } from 'vue-i18n';
import { CONTRACT_PACKAGE } from '@/constants';
import { NPopover, NTag } from 'naive-ui';
import { formatMoney } from '@game-web/base';

defineProps<{ modelValue: boolean }>();
defineEmits(['update:modelValue']);

const { address, disconnect } = useWallet();
const { signer, login: loginMeta } = useEthers();
const baseStore = useBaseStore();
const { t } = useI18n();
const userBalance = ref<any>([]);
const unit = 1e9;

const showMore = ref(false);
const isLogin = computed(() => !!address.value && baseStore.getUserInfo);
const metaMaskAddress = computed(() => signer.value?.address);

const info = computed(() => {
  console.log('address', address.value);

  if (isLogin.value) {
    return {
      status: 'isRegistered',
      btnText: 'MID',
      value: baseStore.getUserInfo!.metaId,
      className: 'blue'
    };
  }
  if (address.value) {
    return {
      status: 'isLogin',
      btnText: t('home.activate'),
      value: address.value,
      className: 'green'
    };
  }
  return {
    status: '',
    btnText: t('home.link_waller'),
    value: null,
    className: 'red'
  };
});

const { balanceProvider, getOwnedCoinsAndBalances } =
  useOwnedCoinsWithBalances();

const connectMeta = () => {
  if (!metaMaskAddress.value) {
    loginMeta();
  }
};

const logout = () => {
  showMore.value = false;
  baseStore.setUserInfo(undefined);
  disconnect();
};

watch(
  () => address.value,
  async () => {
    if (address.value) {
      baseStore.fetchUserInfo(address.value);
      await getOwnedCoinsAndBalances();
      const balanceList =
        await balanceProvider.value?.query.provider.getAllBalances({
          owner: address.value as string
        });
      userBalance.value = balanceList?.filter((item: { coinType: string }) =>
        ['0x2::sui::SUI', `${CONTRACT_PACKAGE}::shui::SHUI`].includes(
          item.coinType
        )
      );
    }
  },
  {
    immediate: true
  }
);

type WalletType = 'Sui' | 'MetaMask';
type WalletItem = { type: WalletType; text: string; logo: string };

const walletList = ref<WalletItem[]>([
  {
    type: 'Sui',
    text: 'Sui Wallet',
    logo: SuiLogo
  }
  //   {
  //     type: 'MetaMask',
  //     text: 'MetaMask Wallet',
  //     logo: MetaMaskLogo
  //   }
]);
</script>

<style lang="scss" scoped>
.img {
  height: 30px;
  display: flex;
  align-items: center;
  img {
    width: 30px;
    height: 30px;
  }
  p {
    margin-left: 10px;
    font-size: 16px;
  }
}
.text {
  width: 50%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
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

.card {
  width: 80%;
  max-width: 700px;
}
</style>
