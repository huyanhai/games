<template>
  <div class="m-swap">
    <div class="btc-total">
      <div class="info">
        <div class="item">
          <div class="top">{{ $t("home.lock") }}</div>
          <div class="bottom">BTC</div>
        </div>
        <div class="item">
          <div class="top">{{ $t("home.swap1") }}</div>
          <div class="bottom">{{ Number(pageData?.swaped_sui || 0) / unit }} SUI</div>
        </div>
        <div class="item">
          <div class="top">{{ $t("home.super") }}</div>
          <div class="bottom">{{ Number(pageData?.swaped_shui || 0) / unit }} SHUI</div>
        </div>
      </div>
      <img src="@/assets/airdrop_swap.png" alt="" srcset="" />
    </div>
    <!-- <div class="text">
      {{ $t('home.swap1_txt') }}
    </div> -->
    <div class="eth-info">
      <div class="col col-l">
        <NDivider class="user-divider" dashed>白名单特权</NDivider>
        <div class="text">
          <ul>
            <li>白名单用户可以获得1SUI=100SHUI比例进行兑换，每个白名单用户兑换上限为30,000SHUI</li>
            <li>我们还为“白名单”用户预留了10000~20000 的 Meta 身份 ID 编号</li>
          </ul>
        </div>
        <NDataTable bordered :columns="columns" :data="data" />
        <NDivider class="user-divider" dashed>“黄金储备”计划</NDivider>
        <div class="text">为了建立良好的信用体系，我们计划将所有兑换所得SUI 全部置换成 BTC 进行锁仓，作为项目风险控制资产由 SHUI 基金会和 SHUI DAO 组织共同监管，同样公开透明。</div>
        <!-- <NDataTable bordered :columns="columns" :data="data" /> -->
        <NTable bordered>
          <tbody>
            <tr>
              <td>黄金储备</td>
              <td>1 SUI =1 SHUI</td>
              <td>100 million</td>
              <td>Not have</td>
            </tr>
          </tbody>
        </NTable>
      </div>
      <div class="col col-r">
        <div class="card">
          <div class="__title">
            <!-- {{ $t('home.sui1') }} -->
            <select v-model="redemptionType">
              <option v-for="item in optionsInfo" :key="item.id" :value="item.id">
                {{ item.name }}
              </option>
            </select>
          </div>
          <div class="__body">
            <div class="__l l">
              <img src="@/assets/img-sui.png" alt="" srcset="" />
              <div class="input">
                <input v-model="coinNum" type="text" :placeholder="`${max}`" :max="max" @keyup="check" />
                <span>SUI</span>
              </div>
            </div>
            <div class="__m">
              <img src="@/assets/img-swap.png" alt="" srcset="" />
              <span>{{ $t("home.ratio") }}</span>
              <p>1:{{ ratio }}</p>
            </div>
            <div class="__r l">
              <img src="@/assets/img-meta.png" alt="" srcset="" />
              <div class="input">
                <p>
                  {{ formatMoney(parseInt(coinNum || "0") * ratio) }}
                </p>
                <span>SHUI</span>
              </div>
            </div>
          </div>
          <div class="__foot">
            <div class="row">
              {{ $t("home.min", { num: "1 SUI" }) }} |
              {{ $t("home.max", { num: `${max} SUI` }) }}
            </div>
            <div class="button">
              <SuiWallet :loading="loading" @moveCall="moveCall">
                <slot>
                  <button>{{ $t("home.submit") }}</button>
                </slot>
              </SuiWallet>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NDivider class="user-divider" dashed>{{ $t("home.swap_list") }}</NDivider>
  </div>
</template>
<script lang="ts" setup>
import { NDataTable, NDivider, NTable } from "naive-ui";
import { computed } from "vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useMessage } from "naive-ui";
import { useBaseStore } from "@/store";

import SuiWallet from "@/components/sui-wallet/Index.vue";

import { useWallet, SuiTxBlock, formatMoney, checkMoney } from "@game-web/base";
import { CONTRACT_PACKAGE, SWAP_GLOBAL_ADDRESS, SWAP_RULE_INFO_ADDRESS } from "@/constants";
import { watch } from "vue";

type TOptionsInfo = {
  name: string;
  ratio: number;
  id: number;
  fnName: string;
  max: number;
};

const unit = 1e9;
const coinNum = ref("");
const ratio = ref(1);
const loading = ref(false);
const redemptionType = ref(7);
const max = ref(9999);
const baseStore = useBaseStore();

const message = useMessage();
const { t } = useI18n();
const { signAndSendTxn } = useWallet();
const pageData = computed(() => baseStore.getAirdropInfo);

const check = () => {
  coinNum.value = checkMoney(coinNum.value);
  if (parseInt(coinNum.value) > max.value) {
    coinNum.value = `${max.value}`;
  } else if (parseInt(coinNum.value) < 0) {
    coinNum.value = "0";
  }
};

const moveCall = async () => {
  if (!coinNum.value) return message.error(t("home.input_tips"));
  loading.value = true;
  // 兑换的方法
  const target = `${CONTRACT_PACKAGE}::shui::swap`;

  try {
    const tx = new SuiTxBlock();
    const [coins] = tx.splitSUIFromGas([Number(coinNum.value) * 1_000_000_000]);
    // 兑换shui
    tx.moveCall(target, [SWAP_GLOBAL_ADDRESS, SWAP_RULE_INFO_ADDRESS, Number(coinNum.value), tx.makeMoveVec([coins]), Number(redemptionType.value)], ["0x2::sui::SUI"]);

    // 发送签名
    const { digest } = await signAndSendTxn(tx);
    loading.value = false;
    if (digest) {
      message.success(t("home.success_tips"));
    }
  } catch (error) {
    loading.value = false;
    message.error(t("home.fail_tips"));
  }
};

const columns = computed(() => [
  {
    title: "项目",
    key: "exchange_list",
  },
  {
    title: t("home.exchange_radio"),
    key: "exchange_radio",
  },
  {
    title: "限量",
    key: "count",
  },
  // {
  //   title: t('home.share'),
  //   key: 'share'
  // },
  {
    title: t("home.all_amount"),
    key: "all_amount",
  },
  {
    title: t("home.conditions"),
    key: "conditions",
  },
]);

const data = ref([
  {
    exchange_list: "白名单",
    count: "30,000 SHUI",
    exchange_radio: "1 SUI = 100 SHUI",
    // share: '730',
    all_amount: "300 million",
    conditions: "NFT",
  },
]);

const optionsInfo = ref<TOptionsInfo[]>([
  {
    name: "白名单",
    ratio: 100,
    id: 6,
    fnName: "white_list_swap",
    max: 300,
  },
  {
    name: "黄金储备计划",
    ratio: 1,
    id: 7,
    fnName: "gold_reserve_swap",
    max: 9999,
  },
]);

watch(
  () => redemptionType.value,
  (value) => {
    coinNum.value = "";
    const item = optionsInfo.value.find((item) => item.id === value) as TOptionsInfo;
    ratio.value = item.ratio;
    max.value = item.max;
  }
);
</script>

<style lang="scss" scoped>
.m-swap {
  width: 100%;
  padding: 2vw;
  @include for_breakpoint("min") {
    padding: 32px;
  }
  .text {
    color: #333333;
    font-size: 1.2vw;
    margin: 1vw;
    text-align: left;
    @include for_breakpoint("min") {
      font-size: 19px;
      margin: 16px;
    }
    @include for_breakpoint("max", 800px) {
      font-size: 14px;
      margin-bottom: 20px;
    }
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
  margin-top: 2vw;
  flex-wrap: wrap;
  @include for_breakpoint("min") {
    margin-top: 32px;
  }
  @include for_breakpoint("max", 800px) {
    margin-top: 32px;
    flex-direction: column-reverse;
  }
  .col {
    width: 50%;
    @include for_breakpoint("max", 800px) {
      width: 100%;
    }
  }
  .col-l {
    padding-right: 1vw;
    @include for_breakpoint("min") {
      padding-right: 16px;
    }
    @include for_breakpoint("max", 800px) {
      padding-right: 0;
      margin-bottom: 10px;
    }
  }
  .col-r {
    padding-left: 1vw;
    @include for_breakpoint("min") {
      padding-left: 16px;
    }
    @include for_breakpoint("max", 800px) {
      padding: 0;
      margin-bottom: 20px;
    }
    .card {
      box-shadow: #888888 5px 5px 30px 1px;
      background: #fff;
      padding-bottom: 2vw;
      @include for_breakpoint("min") {
        padding-bottom: 32px;
      }
      @include for_breakpoint("max", 800px) {
        padding-bottom: 32px;
      }
      .__title {
        background: dodgerblue;
        text-align: center;
        height: 5vw;
        line-height: 5vw;
        font-size: 1.4vw;
        color: #fff;
        select {
          background: none;
          outline: none;
        }
        @include for_breakpoint("min") {
          height: 81px;
          line-height: 81px;
          font-size: 22px;
        }
        @include for_breakpoint("max", 800px) {
          height: 40px;
          line-height: 40px;
          font-size: 16px;
        }
      }
      .__body {
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 2vw;
        @include for_breakpoint("min") {
          padding: 32px;
        }
        @include for_breakpoint("max", 800px) {
          padding: 20px;
        }
        .l {
          box-sizing: border-box;
          padding: 0 2vw;
          width: 18vw;
          height: 10vw;
          border-radius: 0.4vw;
          border: 1px solid #cccccc;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          @include for_breakpoint("min") {
            padding: 0 32px;
            width: 225px;
            height: 162px;
            border-radius: 6px;
          }
          @include for_breakpoint("max", 800px) {
            padding: 0 10px;
            width: 150px;
            height: 162px;
            border-radius: 6px;
          }
          .input {
            display: flex;
            justify-content: space-between;
            width: 100%;
            margin-top: 1vw;
            font-size: 1.4vw;
            height: 2vw;
            @include for_breakpoint("min") {
              margin-top: 16px;
              font-size: 22px;
              height: 32px;
            }
            @include for_breakpoint("max", 800px) {
              margin-top: 16px;
              font-size: 16px;
              height: 25px;
              line-height: 25px;
            }
          }
          img {
            width: 5vw;
            height: 5vw;
            @include for_breakpoint("min") {
              width: 81px;
              height: 81px;
            }
            @include for_breakpoint("max", 800px) {
              width: 81px;
              height: 81px;
            }
          }
        }
        .__l {
          .input {
            border-bottom: 1px solid #aaaaaa;
          }
          input {
            flex: 1 0 auto;
            width: 50%;
            outline: none;
            font-size: 1.4vw;
            color: dodgerblue;
            @include for_breakpoint("min") {
              font-size: 22px;
            }
            @include for_breakpoint("max", 800px) {
              font-size: 16px;
            }
          }
        }
        .__m {
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
          margin: 0 2vw;
          @include for_breakpoint("min") {
            margin: 0 32px;
          }
          @include for_breakpoint("max", 800px) {
            margin: 0 10px;
          }
          img {
            width: 3vw;
            @include for_breakpoint("min") {
              width: 48px;
            }
            @include for_breakpoint("max", 800px) {
              width: 30px;
            }
          }
          span {
            font-size: 1.2vw;
            margin-top: 0.5vw;
            @include for_breakpoint("min") {
              font-size: 19px;
              margin-top: 8px;
            }
            @include for_breakpoint("max", 800px) {
              font-size: 14px;
              margin-top: 8px;
            }
          }
          p {
            font-size: 1.8vw;
            @include for_breakpoint("min") {
              font-size: 29px;
            }
            @include for_breakpoint("max", 800px) {
              font-size: 24px;
            }
          }
        }
        .__r {
          font-size: 1.4vw;
          @include for_breakpoint("min") {
            font-size: 22px;
          }
          @include for_breakpoint("max", 800px) {
            font-size: 22px;
          }
          p {
            color: dodgerblue;
          }
          .input {
            justify-content: center !important;
          }
        }
      }
      .__foot {
        display: flex;
        flex-direction: column;
        .row {
          text-align: center;
          font-size: 1.4vw;
          margin-bottom: 1vw;
          @include for_breakpoint("min") {
            font-size: 22px;
            margin-bottom: 16px;
          }
          @include for_breakpoint("max", 800px) {
            font-size: 16px;
            margin-bottom: 16px;
          }
        }
        .button {
          width: 12vw;
          height: 5vw;
          margin: 0 auto;
        }
        button {
          width: 12vw;
          height: 5vw;
          margin: 0 auto;
          display: block;
          background: dodgerblue;
          border-radius: 0.8vw;
          font-size: 1.8vw;
          color: #fff;
          @include for_breakpoint("min") {
            width: 194px;
            height: 81px;
            border-radius: 12px;
            font-size: 29px;
          }
          @include for_breakpoint("max", 800px) {
            width: 100px;
            height: 40px;
            border-radius: 8px;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
