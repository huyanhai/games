<template>
  <div class="market-card">
    <div class="card-hd">
      <img class="empty" src="@/assets/empty-img.svg" />
      <img :src="IMG_URLS[item.name]" class="post" />
    </div>
    <div class="card-bd"></div>
    <div class="card-ft">
      <span class="row">
        <h3 class="title">
          {{ item.name }}
        </h3>
        <!-- <img src="@/assets/xy.svg" alt="" srcset="" /> -->
      </span>
      <p class="price" v-if="type === CardType.asset">{{ item.description }}</p>
      <p class="price" v-else>{{ price }}{{ item.coinType }}</p>
    </div>
    <div class="count" v-if="item.num">{{ item.num }}</div>
    <div class="mask">
      <button v-if="[CardType.all, CardType.asset].includes(type)" class="red" @click="sell">
        {{ type === CardType.asset ? "出售" : "购买" }}
      </button>
      <button v-if="type === CardType.sell" class="red" @click="sell">取消出售</button>
      <!-- <button class="white" v-if="type === CardType.asset">取消</button> -->
    </div>
    <NModal v-model:show="showModal" class="market-modal" :mask-closable="false">
      <NCard closable :title="'我要出售'" @close="close">
        <NForm :model="form" ref="formRef" :show-label="false" :rules="rules">
          <NFormItem path="price">
            <NInput v-model:value="form.price" placeholder="请输入价格" />
          </NFormItem>
          <NFormItem path="type">
            <NSelect style="text-align: left" v-model:value="form.type" placeholder="请选择类型" :options="options" />
          </NFormItem>
          <NFormItem path="num" v-if="dataType === 'gamefi'">
            <NInputNumber v-model:value="form.num" placeholder="请输入数量" :min="0" :max="item.num" style="width: 100%" />
          </NFormItem>
          <NFormItem>
            <NSpace>
              <NButton type="primary" @click="assetHandler" :loading="loading">确定</NButton>
              <NButton @click="close">取消</NButton>
            </NSpace>
          </NFormItem>
        </NForm>
      </NCard>
    </NModal>
  </div>
</template>
<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import { useBaseStore } from "@/store/index";
import { NModal, NCard, NForm, NFormItem, NInput, NInputNumber, NSelect, NButton, NSpace, useMessage } from "naive-ui";
import { type CardItem, CardType } from "./types";
import { checkMoneyDot, checkNum, useWallet } from "@game-web/base";
import { buyGame, buyNft, downGameItem, downNftItem, upGameItem, upNftItem } from "./userFunc";
import { IMG_URLS } from "@/constants/img";

const props = defineProps<{
  item: CardItem;
  type: CardType;
  dataType: "gamefi" | "nft";
}>();

const emits = defineEmits(["updateList"]);

const showModal = ref(false);
const form = reactive({
  type: undefined,
  price: "",
  num: 1,
});

const fixed = ref(0.000000001);
const loading = ref(false);
const message = useMessage();
const formRef = ref();
const rules = {
  // type: { required: true, message: "请选择类型", trigger: "blur" },
  price: {
    required: true,
    trigger: ["blur", "chang"],
    validator(rule: any, value: any) {
      console.log(value);

      if (!value) {
        return new Error("请输入金额");
      } else if (!checkMoneyDot(value)) {
        return new Error("请输入正确的金额");
      }
      return true;
    },
  },
  num: {
    required: true,
    trigger: ["blur", "chang"],
    validator(rule: any, value: any) {
      if (!value) {
        return new Error("请输入数量");
      } else if (!checkNum(value)) {
        return new Error("请输入正确的数量");
      }
      return true;
    },
  },
};

const price = computed(() => {
  const p = Number(props.item.price) * fixed.value;
  if (props.item.coinType === "SUI") {
    return Number.isInteger(Number(p.toFixed(2))) ? p.toFixed(0) : p.toFixed(2);
  } else {
    return Number.isInteger(Number(p.toFixed(3))) ? p.toFixed(0) : p.toFixed(3);
  }
});

const options = [
  { label: "SUI", value: "SUI" },
  { label: "SHUI", value: "SHUI" },
];

const baseStore = useBaseStore();
const { address } = useWallet();

// 获取用户信息
const META_ID_ADDRESS = computed(() => baseStore.getUserInfo?.id?.id);

// 操作
const operationHandler = (result: boolean, successMsg: string, errMsg: string) => {
  if (result) {
    emits("updateList");
    return message.success(successMsg);
  }
  return message.error(errMsg);
};

// 下架操作
const sellHandler = async () => {
  let result = false;
  if (props.dataType === "gamefi") {
    result = (await downGameItem(META_ID_ADDRESS.value, props.item)) as any;
  } else {
    result = (await downNftItem(META_ID_ADDRESS.value, props.item)) as any;
  }

  operationHandler(result, "下架成功", "下架失败");
};

// 购买操作
const bugHandler = async () => {
  let result = false;
  if (props.dataType === "gamefi") {
    result = (await buyGame(address.value!, META_ID_ADDRESS.value, props.item)) as any;
  } else {
    result = (await buyNft(address.value!, META_ID_ADDRESS.value, props.item)) as any;
  }
  operationHandler(result, "购买成功", "购买失败");
};

// 上架操作
const assetHandler = async () => {
  formRef.value?.validate(async (errors: any) => {
    if (!errors) {
      let result = false;
      if (props.dataType === "gamefi") {
        result = (await upGameItem(META_ID_ADDRESS.value, props.item, form)) as any;
      } else {
        result = (await upNftItem(META_ID_ADDRESS.value, props.item, form)) as any;
      }
      operationHandler(result, "上架成功", "上架失败");
      showModal.value = false;
    }
  });
};

const sell = () => {
  if (!META_ID_ADDRESS.value) {
    return message.error("请先登录");
  }
  // 列表 - 购买
  if (props.type === CardType.all) {
    bugHandler();
  }
  // 资产 - 上架
  if (props.type === CardType.asset) {
    showModal.value = true;
  }
  // 出售 -下架
  if (props.type === CardType.sell) {
    sellHandler();
  }
};

const close = () => {
  form.num = 1;
  form.price = "";
  loading.value = false;
  showModal.value = false;
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
  .count {
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 20px;
    background: #00c3ff;
    border-radius: 0 0 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #222;
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
      object-fit: contain;
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
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
.market-modal {
  width: 80%;
  max-width: 700px;
}
</style>
