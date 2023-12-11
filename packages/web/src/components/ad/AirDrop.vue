<template>
  <div class="m-air">
    <div class="btc-total">
      <div class="info">
        <div class="item">
          <div class="top">{{ $t("home.airdrop_t") }}</div>
          <div class="bottom">{{ Number(pageData?.total_claim_amount || 0) / unit }} SHUI</div>
        </div>
        <div class="item">
          <div class="top">{{ $t("home.claim_u") }}</div>
          <div class="bottom">{{ Number(pageData?.total_remain_amount || 0) / unit }} SHUI</div>
        </div>
        <div class="item">
          <div class="top">{{ $t("home.current") }}</div>
          <div class="bottom">{{ pageData?.participators_num || 0 }} USER</div>
        </div>
      </div>
      <img src="@/assets/img_swap.png" alt="" srcset="" />
    </div>
    <div class="eth-info">
      <div class="__l">
        <div class="card">
          <p v-html="$t('home.current_txt')"></p>
          <div class="button" :class="!airdropCheckInfo.available ? 'disabled' : ''">
            <SuiWallet v-model:loading="loading" @moveCall="moveCall">
              <slot>
                <button :disabled="!airdropCheckInfo.available">
                  <NCountdown
                    :active="!airdropCheckInfo.available"
                    :duration="airdropCheckInfo.time_diff"
                    :render="
                      ({ hours, minutes, seconds }) => {
                        if (airdropCheckInfo.available) return $t('home.claim_btn');
                        return `${formateTime(hours)}:${formateTime(minutes)}:${formateTime(seconds)}`;
                      }
                    "
                    @finish="onFinish"
                  />
                </button>
              </slot>
            </SuiWallet>
          </div>
        </div>
      </div>
      <div class="__r">
        <NTable bordered>
          <thead>
            <tr>
              <th :colspan="columns.length" class="table-header">390 Million Airdrop Free Claim</th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th v-for="(item, index) in columns" :key="index">
                {{ item.title }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in tableData" :key="index">
              <td>{{ item.phase }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.daily_quantity }}</td>
              <td>{{ item.daily_available_quantity }}</td>
            </tr>
            <!-- <tr>
              <td :colspan="columns.length" style="text-align: center">
                {{ $t('home.reserve') }}
              </td>
            </tr> -->
          </tbody>
        </NTable>
      </div>
    </div>
    <NDivider class="user-divider" dashed>
      {{ $t("home.airdrop_list") }}
    </NDivider>
  </div>
</template>
<script lang="ts" setup>
import { NTable, NDivider, NCountdown } from "naive-ui";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useMessage } from "naive-ui";
import { useBaseStore } from "@/store";

import SuiWallet from "@/components/sui-wallet/Index.vue";

import { SuiTxBlock, useWallet, formateTime } from "@game-web/base";
import { CONTRACT_PACKAGE, AIRDROP_GLOBAL_ADDRESS, MISSION_GLOBAL_ADDRESS } from "@/constants";

const { t } = useI18n();
const { signAndSendTxn, address } = useWallet();

const unit = 1e9;
const loading = ref(false);
const message = useMessage();
const baseStore = useBaseStore();
const pageData = computed(() => baseStore.getAirdropInfo);

const userInfo = computed(() => baseStore.getUserInfo);

const airdropCheckInfo = computed(() => baseStore.airdropCheck);

const onFinish = async () => {
  baseStore.fetchAirdropCheck({ wallet_addr: address.value as string });
};

const moveCall = async () => {
  if (!airdropCheckInfo.value.available) return;
  loading.value = true;
  // 空投地址
  const target = `${CONTRACT_PACKAGE}::airdrop::claim_airdrop`;

  try {
    const tx = new SuiTxBlock();
    const meta_addr = userInfo.value?.id?.id || "";

    // 领取空投
    tx.moveCall(target, [MISSION_GLOBAL_ADDRESS, AIRDROP_GLOBAL_ADDRESS, meta_addr, "0x6"]);

    // 发送签名
    const { digest } = await signAndSendTxn(tx);
    if (digest) {
      message.success(t("home.claimed_success_tips"));
      await baseStore.fetchAirdropCheck({
        wallet_addr: address.value as string,
      });
      loading.value = false;
    }
  } catch (error) {
    loading.value = false;
    console.log(error);
    message.error(t("home.claimed_fail_tips"));
  }
};

const columns = computed(() => [
  {
    title: t("home.phase"),
    key: "phase",
  },
  {
    title: t("home.quantity"),
    key: "quantity",
  },
  {
    title: t("home.daily_quantity"),
    key: "daily_quantity",
  },
  {
    title: t("home.daily_available_quantity"),
    key: "daily_available_quantity",
  },
]);

const quantity = (count: string) => {
  if (count === pageData.value.phase) {
    return `${Number(pageData.value.daily_remain_amount || 0) / unit} SHUI`;
  }
  return "-";
};

const tableData = computed(() => {
  return [
    {
      phase: "1 ~ 30 DAY",
      quantity: "50 SHUI",
      daily_quantity: "1,000,000 SHUI",
      daily_available_quantity: quantity("1"),
    },
    {
      phase: "31 ~ 60 DAY",
      quantity: "40 SHUI",
      daily_quantity: "2,000,000 SHUI",
      daily_available_quantity: quantity("2"),
    },
    {
      phase: "61 ~ 90 DAY",
      quantity: "30 SHUI",
      daily_quantity: "3,000,000 SHUI",
      daily_available_quantity: quantity("3"),
    },
    {
      phase: "91 ~ 120 DAY",
      quantity: "20 SHUI",
      daily_quantity: "4,000,000 SHUI",
      daily_available_quantity: quantity("4"),
    },
    {
      phase: "121 ~ 150 DAYS",
      quantity: "10 SHUI",
      daily_quantity: "5,000,000 SHUI",
      daily_available_quantity: quantity("5"),
    },
    {
      phase: "151 Days Later",
      quantity: "10 SHUI",
      daily_quantity: "1,000,000 SHUI",
      daily_available_quantity: quantity("5"),
    },
  ];
});

onMounted(() => {
  if (address.value) {
    onFinish();
  }
});
</script>

<style lang="scss" scoped>
.m-air {
  width: 100%;
  padding: 2vw;
  .text {
    color: #333333;
    font-size: 1.2vw;
    margin: 1vw;
    text-align: left;
  }
}
.btc-total {
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  box-sizing: border-box;
  padding-top: 6vw;
  @include for_breakpoint("min") {
    padding-top: 97px;
  }
  img {
    height: 13vw;
    width: auto;
    object-fit: contain;
    @include for_breakpoint("min") {
      height: 210px;
    }
  }
  .info {
    display: flex;
    position: absolute;
    width: 100%;
    box-sizing: border-box;
    padding-left: 11vw;
    bottom: 0;
    @include for_breakpoint("min") {
      padding-left: 178px;
    }

    .item {
      display: flex;
      flex-direction: column;
      text-align: center;
      width: calc(100% / 3);
      font-size: 2vw;
      box-sizing: border-box;
      @include for_breakpoint("min") {
        font-size: 32px;
      }
      .top {
        height: 6vw;
        display: flex;
        align-items: center;
        justify-content: center;
        @include for_breakpoint("min") {
          height: vwTopx(6vw);
        }
      }
      &:nth-child(2) {
        padding-left: 5vw;
        @include for_breakpoint("min") {
          padding-left: 81px;
        }
      }
      &:last-child {
        .bottom {
          color: #333333;
        }
      }
      .bottom {
        height: 12.5vw;
        line-height: 12.5vw;
        // margin-top: 2vw;
        color: #fff;
        @include for_breakpoint("min") {
          height: 202px;
          line-height: 202px;
          // margin-top: 32px;
        }
      }
    }
  }
}

.eth-info {
  display: flex;
  margin-top: 4vw;
  width: 100%;
  flex-wrap: wrap;
  @include for_breakpoint("min") {
    margin-top: vwTopx(4vw);
  }
  @include for_breakpoint("max", 800px) {
    margin-top: 20px;
  }
  .__l {
    width: 40%;
    box-sizing: border-box;
    padding-right: 5vw;
    @include for_breakpoint("min") {
      padding-right: vwTopx(5vw);
    }
    @include for_breakpoint("max", 800px) {
      width: 100%;
      padding: 0;
    }
    .card {
      box-shadow: #888888 5px 5px 30px 1px;
      border-radius: 0.8vw;
      background: #fff;
      padding: 2vw;
      box-sizing: border-box;
      @include for_breakpoint("min") {
        padding: vwTopx(2vw);
      }
      @include for_breakpoint("max", 800px) {
        padding: 10px;
      }
      p {
        line-height: 2vw;
        font-size: 1.4vw;
        color: #585858;
        text-align: left;
        margin-bottom: 2vw;
        @include for_breakpoint("min") {
          line-height: vwTopx(2vw);
          font-size: vwTopx(1.4vw);
          margin-bottom: vwTopx(2vw);
        }
        @include for_breakpoint("max", 800px) {
          line-height: 20px;
          font-size: 14px;
          margin-bottom: 5px;
        }
      }
      .button {
        background: #008f38;
        text-align: center;
        color: #fff;
        width: 20vw;
        height: 5vw;
        border-radius: 0.8vw;
        font-size: 1.8vw;
        margin-top: 2vw;
        margin-left: auto;
        margin-right: auto;
        &.disabled {
          background: gray;
          button {
            cursor: not-allowed;
          }
        }
        button {
          width: 100%;
          height: 100%;
        }
        @include for_breakpoint("min") {
          width: vwTopx(20vw);
          height: vwTopx(5vw);
          border-radius: vwTopx(0.8vw);
          font-size: vwTopx(1.8vw);
          margin-top: vwTopx(2vw);
        }
        @include for_breakpoint("max", 800px) {
          width: 100px;
          height: 30px;
          border-radius: 4px;
          font-size: 14px;
          margin-top: 10px;
        }
      }
    }
  }
  .__r {
    width: 60%;
    @include for_breakpoint("max", 800px) {
      width: 100%;
      margin-top: 20px;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
.table-row {
  height: 3vw;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>
