<template>
  <div class="my-task">
    <NDivider class="ui-divider">推广活动</NDivider>
    <NTable>
      <thead>
        <tr>
          <th>邀请用户</th>
          <th>代币奖励</th>
          <th>领取奖励</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in lists" :key="item.user">
          <td>{{ item.user }}</td>
          <td>{{ item.money }}</td>
          <td>
            <NButton @click="getCoins(item.user)">领取</NButton>
          </td>
        </tr>
      </tbody>
    </NTable>
    <NDivider class="ui-divider">任务要求</NDivider>
    <div class="tips">
      <NText type="success">邀请人</NText>
      向被<NText type="error">邀请人</NText>转账1SUI
    </div>
    <NInput round size="large" placeholder="输入被邀请的用户SU钱包地址" v-model="invitedAddress" />
    <NxButton class="ui-button" size="large" type="error" round @click="invite">邀请</NxButton>
    <div v-if="invited">
      地址：<a :href="invitedUrl">{{ invitedUrl }}</a>
    </div>
    <NDivider class="ui-divider"></NDivider>
    <div class="tips">被邀请用户需要成功注册MetalD</div>
    <NTag type="success" class="ui-tag">已邀请人数 {{ invitedNum }}</NTag>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { NDivider, NTable, NButton, NInput, NText, NxButton, NTag, useMessage } from "naive-ui";
import { CONTRACT_PACKAGE, META_INFO_GLOBAL_ADDRESS } from "@/constants";
import { SuiTxBlock, convert, getAbleCoinsForSell, useProvider, useWallet } from "@game-web/base";
import { useBaseStore } from "@/store";

const lists = ref([
  {
    user: 2,
    money: "100 SHUI",
  },
  {
    user: 5,
    money: "500 SHUI",
  },
  {
    user: 10,
    money: "1,000 SHUI",
  },
  {
    user: 20,
    money: "3,000 SHUI",
  },
  {
    user: 50,
    money: "10,000 SHUI",
  },
  {
    user: 75,
    money: "25,000 SHUI",
  },
  {
    user: 99,
    money: "50,000 SHUI",
  },
]);

const invitedAddress = ref("");
const invitedNum = ref(0);
const invited = ref(false);
const invitedUrl = computed(() => {
  return `${window.location.href}?metaId=${sortMetaId.value}`;
});

const registerStore = useBaseStore();
const { devInspectTransactionBlock } = useProvider();
const message = useMessage();
const userInfo = computed(() => registerStore.getUserInfo);
const META_ID_ADDRESS = computed(() => userInfo.value?.id?.id);
const sortMetaId = computed(() => userInfo.value?.metaId);

const getInviteInfo = async () => {
  if (META_ID_ADDRESS.value) {
    const tx = new SuiTxBlock();
    tx.moveCall(`${CONTRACT_PACKAGE}::metaIdentity::query_invited_num`, [META_INFO_GLOBAL_ADDRESS, META_ID_ADDRESS.value]);
    const { results }: any = await devInspectTransactionBlock(tx.txBlock);
    invitedNum.value = convert(new Uint8Array(results[0].returnValues[0][0]));
  }
};

const invite = async () => {
  if (!invitedAddress.value) {
    return message.error("请输入被要确认钱包地址");
  }
  const tx = new SuiTxBlock();
  const { signAndSendTxn } = useWallet();
  console.log("参数", [sortMetaId.value, invitedAddress.value, getAbleCoinsForSell(1, "SUI", tx)]);

  tx.moveCall(`${CONTRACT_PACKAGE}::metaIdentity::invite_send_sui`, [sortMetaId.value, invitedAddress.value, getAbleCoinsForSell(1, "SUI", tx)]);
  const { digest } = await signAndSendTxn(tx);
  invited.value = true;
  getInviteInfo();
  console.log(digest);
};

// 获取奖励
const getCoins = async (coin: number) => {
  const tx = new SuiTxBlock();
  const { signAndSendTxn } = useWallet();
  console.log("参数", [coin, META_ID_ADDRESS.value]);
  tx.moveCall(`${CONTRACT_PACKAGE}::metaIdentity::claim_invite_mission`, [coin, META_ID_ADDRESS.value]);
  const { digest } = await signAndSendTxn(tx);
  console.log(digest);
};

onMounted(() => {
  getInviteInfo();
});
</script>

<style lang="scss" scoped>
.my-task {
  margin: 0 auto;
  padding: 0 2vw;
  width: 100%;
  max-width: 700px;
  .ui-divider {
    margin: 40px 0;
    font-size: 28px;
  }
  .tips {
    font-size: 24px;
    margin-bottom: 20px;
  }
  .ui-button {
    margin: 20px;
    width: 140px;
    height: 50px;
  }
  .ui-tag {
    height: 50px;
    text-align: center;
    font-size: 24px;
    padding: 0 20px;
  }
}
</style>
