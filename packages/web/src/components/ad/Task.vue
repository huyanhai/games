<template>
  <div class="my-task" v-if="sortMetaId">
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
        <tr v-for="(item, index) in lists" :key="item.user">
          <td>{{ item.user }}</td>
          <td>{{ item.money }}</td>
          <td>
            <NButton v-if="invitedArray[index] === '0'" round type="error" disabled>未达标</NButton>
            <NButton v-if="invitedArray[index] === '1'" round disabled>已领取</NButton>
            <NButton @click="getCoins(item.user)" v-if="invitedArray[index] === '2'" round type="success">领取</NButton>
          </td>
        </tr>
      </tbody>
    </NTable>
    <NDivider class="ui-divider">任务要求</NDivider>
    <div class="tips">
      <NText type="success">邀请人</NText>
      向被<NText type="error">邀请人</NText>转账1SUI
    </div>
    <NInput round size="large" placeholder="输入被邀请的用户SU钱包地址" v-model:value="invitedAddress" />
    <NxButton class="ui-button" size="large" type="error" round @click="invite">邀请</NxButton>
    <!-- <div v-if="invited">
      地址：<a :href="invitedUrl">{{ invitedUrl }}</a>
    </div> -->
    <NDivider class="ui-divider"></NDivider>
    <div class="tips">被邀请用户需要成功注册MetalD</div>
    <NTag type="success" class="ui-tag">已邀请人数 {{ invitedNum }}</NTag>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { NDivider, NTable, NButton, NInput, NText, NxButton, NTag, useMessage } from "naive-ui";
import { CONTRACT_PACKAGE, META_INFO_GLOBAL_ADDRESS, MISSION_GLOBAL_ADDRESS } from "@/constants";
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
const invitedArray = ref([]);
const invitedUrl = computed(() => {
  return `${window.location.href}?metaId=${sortMetaId.value}`;
});

const registerStore = useBaseStore();
const { devInspectTransactionBlock } = useProvider();
const message = useMessage();
const userInfo = computed(() => registerStore.getUserInfo);
const META_ID_ADDRESS = computed(() => userInfo.value?.id?.id);
const sortMetaId = computed(() => userInfo.value?.metaId);

// 可领取的奖励
const getInviteNum = async () => {
  const tx = new SuiTxBlock();
  tx.moveCall(`${CONTRACT_PACKAGE}::mission::query_invite_status`, [MISSION_GLOBAL_ADDRESS, META_INFO_GLOBAL_ADDRESS, sortMetaId.value]);
  const { results }: any = await devInspectTransactionBlock(tx.txBlock);
  let resultString = results[0].returnValues[0][0]
    .fill(undefined, 0, 1)
    .filter(Boolean)
    .map((item: number) => String.fromCharCode(item));
  invitedArray.value = resultString;
};

// 查询已邀请人数
const getInviteInfo = async () => {
  if (sortMetaId.value) {
    const tx = new SuiTxBlock();
    tx.moveCall(`${CONTRACT_PACKAGE}::metaIdentity::query_invited_num`, [META_INFO_GLOBAL_ADDRESS, sortMetaId.value]);
    const { results }: any = await devInspectTransactionBlock(tx.txBlock);
    invitedNum.value = convert(new Uint8Array(results[0].returnValues[0][0]));
  }
};

// 邀请
const invite = async () => {
  if (!invitedAddress.value) {
    return message.error("请输入被邀请人钱包地址");
  }
  const tx = new SuiTxBlock();
  const { signAndSendTxn } = useWallet();
  const coin = await getAbleCoinsForSell(1 * 1_000_000_000, "SUI", tx);
  console.log("参数", [META_INFO_GLOBAL_ADDRESS, Number(sortMetaId.value), invitedAddress.value, coin]);

  try {
    tx.moveCall(`${CONTRACT_PACKAGE}::metaIdentity::inviteSendSui`, [META_INFO_GLOBAL_ADDRESS, Number(sortMetaId.value), tx.pure(invitedAddress.value), coin]);
    await signAndSendTxn(tx);
    invited.value = true;
    getInviteInfo();
    getInviteNum();
    message.success("邀请成功");
  } catch (error) {
    console.log(error);
    
    message.error("邀请失败");
  }
};

// 获取奖励
const getCoins = async (coin: number) => {
  const tx = new SuiTxBlock();
  const { signAndSendTxn } = useWallet();
  console.log("参数", [MISSION_GLOBAL_ADDRESS, META_INFO_GLOBAL_ADDRESS, coin, META_ID_ADDRESS.value]);
  try {
    tx.moveCall(`${CONTRACT_PACKAGE}::mission::claim_invite_mission`, [MISSION_GLOBAL_ADDRESS, META_INFO_GLOBAL_ADDRESS, coin, META_ID_ADDRESS.value]);
    const { digest } = await signAndSendTxn(tx);
    console.log(digest);
    message.success("领取成功");
  } catch (error) {
    message.error("领取失败");
  }
};

onMounted(() => {
  getInviteInfo();
  getInviteNum();
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
