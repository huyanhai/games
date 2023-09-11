<template>
  <div class="m-login" :class="info.className">
    <SuiWallet>
      <button class="ui-button op">
        {{ info.btnText }}
      </button>
      <button v-if="info.value" class="ui-button info" @click="changeMore">
        {{ info.value }}
      </button>
    </SuiWallet>
    <template v-if="showMore">
      <NPopover>
        <template #trigger>
          <button class="ui-button line">{{ $t('home.assets') }}</button>
        </template>
        <div class="balance-row">
          <template v-for="item in userBalance" :key="item.coinType">
            <div v-if="item.coinType.includes('sui')" class="line">
              <p>
                <img src="@/assets/img-sui.png" alt="" />
                {{ formatMoney(Number(item.totalBalance) / unit) }}
              </p>
              <i>SUI</i>
            </div>
            <div v-else class="line">
              <p>
                <img src="@/assets/nft2.png" alt="" />
                {{ formatMoney(Number(item.totalBalance) / unit) }}
              </p>
              <i>SHUI</i>
            </div>
          </template>
        </div>
      </NPopover>
      <button class="ui-button line" @click="logout">
        {{ $t('home.change_account') }}
      </button>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { computed, watch, ref } from 'vue';
import SuiWallet from '../sui-wallet/Index.vue';
import { useWallet, useOwnedCoinsWithBalances } from '@game-web/base';
import { useBaseStore } from '@/store/index';
import { useI18n } from 'vue-i18n';
import { CONTRACT_PACKAGE } from '@/constants';
import { NPopover } from 'naive-ui';
import { formatMoney } from '@game-web/base';
const { address } = useWallet();
const baseStore = useBaseStore();
const { t } = useI18n();
const userBalance = ref<any>([]);
const unit = 1e9;

const showMore = ref(false);
const isLogin = computed(() => !!address.value && baseStore.getUserInfo);
const info = computed(() => {
  if (isLogin.value) {
    return {
      btnText: 'MID',
      value: baseStore.getUserInfo!.metaId,
      className: 'blue'
    };
  }
  if (address.value) {
    return {
      btnText: t('home.activate'),
      value: address.value,
      className: 'green'
    };
  }
  return {
    btnText: t('home.link_waller'),
    value: null,
    className: 'red'
  };
});

const { balanceProvider, getOwnedCoinsAndBalances } =
  useOwnedCoinsWithBalances();

const changeMore = () => {
  if (isLogin.value) {
    showMore.value = !showMore.value;
  }
};

const logout = () => {
  showMore.value = false;
  baseStore.setUserInfo(undefined);
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
</style>
