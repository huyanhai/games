<template>
  <div class="carousel-box">
    <NCarousel dot-type="dot" dot-placemen="bottom" show-arrow @update:current-index="indexChange">
      <div class="carousel-item pic-box1">
        <div class="container">
          <Garid>
            <template #left>
              <div class="info">
                <div class="more-info">
                  <div class="info-l">
                    <div class="info-title">Airship - NFT</div>
                    <div class="info-tips">飞船NFT 总量:10,000</div>
                  </div>
                  <div class="info-r">
                    <div class="r-tips">预售:2000</div>
                    <button class="r-btn" @click="getMyNfts">10,000<br />免费领取SHUI</button>
                  </div>
                </div>
                <div class="card">
                  <ul>
                    <li>购买“飞船NFT”前 2000 名用户，每个用户可以领取 10,000 SHUI</li>
                    <li>持有“飞船NFT”即可成为“白名单”用户</li>
                    <li>可以在游戏内兑换一艏“探索者1号”飞船</li>
                    <li>白名单用户享有优先兑换 SHUI 的资格</li>
                    <li>拥有飞船的用户具有通往“浮空城”的载客经营权</li>
                  </ul>
                </div>
              </div>
              <img style="opacity: 0" class="big-img" src="@/assets/img1.png" alt="" />
            </template>
            <template #right>
              <Nft class="m-home-nft" />
              <img style="opacity: 0" class="big-img" src="@/assets/img1.png" alt="" />
            </template>
          </Garid>
        </div>
      </div>
      <div class="carousel-item pic-box2">
        <div class="container">
          <Garid>
            <template #left>
              <img style="opacity: 0" class="big-img" src="@/assets/img1.png" alt="" />
            </template>
            <template #right>
              <img style="opacity: 0" class="big-img" src="@/assets/img1.png" alt="" />
            </template>
          </Garid>
          <div class="container-box">
            <div class="box2-container">
              <div class="col-l">
                <div class="img-box">
                  <img src="@/assets/egg1.jpg" alt="" />
                </div>
                <div class="text-box">DragonEgg(Ice)</div>
                <NSpin :show="loading">
                  <button @click="buy('ice')">10,000 SHUI</button>
                </NSpin>
              </div>
              <div class="col-m">
                <div class="text">{{ total }}</div>
                <div class="sm-text">Dragon Egg</div>
                <div class="jindu">
                  <div class="jindu-ts">
                    <span>Ice</span>
                    <p>Balance:{{ eggData[1] }}</p>
                  </div>
                  <NProgress type="line" :indicator-placement="'inside'" :percentage="parseInt(`${eggData[1] / total}`)" />
                </div>
                <div class="jindu">
                  <div class="jindu-ts">
                    <span>Fire</span>
                    <p>Balance:{{ eggData[0] }}</p>
                  </div>
                  <NProgress type="line" :color="['#d03050', '#d03050']" :indicator-placement="'inside'" :percentage="parseInt(`${eggData[0] / total}`)" />
                </div>
              </div>
              <div class="col-r">
                <div class="img-box">
                  <img src="@/assets/egg2.jpg" alt="" />
                </div>
                <div class="text-box">DragonEgg(Fire)</div>
                <NSpin :show="loading">
                  <button class="red" @click="buy('fire')">10,000 SHUI</button>
                </NSpin>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="carousel-item pic-box3">
        <div class="container">
          <Garid>
            <template #left>
              <img style="opacity: 0" class="big-img" src="@/assets/img1.png" alt="" />
            </template>
            <template #right>
              <img style="opacity: 0" class="big-img" src="@/assets/img1.png" alt="" />
            </template>
          </Garid>
          <div class="container-box">
            <div class="card">
              <h3>3亿空投免费送</h3>
              <ul>
                <li>领取空投需要支付 Gas 费，所以你钱包里的 SUI不能为 0</li>
                <li>领取空投需要激活“Meta ID”和 KYC 认证</li>
                <li>每个用户24小时只能领取一次</li>
                <li>每天发放的空投数量有限，送完为止</li>
                <li>每天剩余空投数量将分配到下一个周期</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="carousel-item pic-box4">
        <div class="container">
          <Garid>
            <template #left>
              <img style="opacity: 0" class="big-img" src="@/assets/img1.png" alt="" />
            </template>
            <template #right>
              <img style="opacity: 0" class="big-img" src="@/assets/img1.png" alt="" />
            </template>
          </Garid>
          <div class="container-box">
            <div class="card">
              <h3>3亿空投免费送</h3>
              <ul>
                <li>“生命之树”浇一次水需要 1SHUI，浇水时间每次间隔 8 小时。浇满十次以后才能进行收获一次果实。</li>
                <li>“生命之树”的果实为盲盒的形式打开</li>
                <li>奖励如下<br />50~5000 SHUITOKEN 、战宠孵化材料五种不同的水元素、元素碎片</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="carousel-item pic-box5">
        <div class="container">
          <Garid>
            <template #left>
              <img style="opacity: 0" class="big-img" src="@/assets/img1.png" alt="" />
            </template>
            <template #right>
              <img style="opacity: 0" class="big-img" src="@/assets/img1.png" alt="" />
            </template>
          </Garid>
          <div class="container-box">
            <div class="card">
              <h3>Android</h3>
              <p>
                Kiwi Browser 浏览器下载https://kiwi-browser.uptodown.com/android/descargar<br />
                安装 SUI Wallet 官方插件，需要打开加速器。<br />
                注意: 必须在 Kiwi Browser 浏览器里输入网址: https:/chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil
              </p>
              <h3>iOS</h3>
              <p>
                注意:不只支持中国大陆用户 Apple ID<br />
                其他国家 ID 可以在 App Store 正常下载 Kiwi Browser 浏览器安装 SUI Wallet 官方插件，需要打开加速器。<br />
                注意:必须在 Kiwi Browser浏览器里输入网址:https:/chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoaipbobppdi
              </p>
              <h3>pc</h3>
              <p>通过 Google Chrome 浏览器安装 SUI Wallet 官方插件，需要打开加速器https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil</p>
            </div>
          </div>
        </div>
      </div>
    </NCarousel>
  </div>
  <NModal v-model:show="showModal">
    <NCard style="max-width: 800px; width: 90%" title="选择NFT" closable @close="showModal = false">
      <NGrid x-gap="12" :cols="2">
        <NGi v-for="item in nfts" :key="item.name">
          <NSpin :show="loading">
            <NImage class="my-nft-item" :preview-disabled="true" :src="item.imgUrl" @click="checkInfo(item)" />
            <p class="my-nft-name">{{ item.objectId }}</p>
          </NSpin>
        </NGi>
      </NGrid>
    </NCard>
  </NModal>
</template>
<script lang="ts" setup>
import { NCarousel, NModal, NImage, NCard, NGi, NGrid, useMessage, NProgress, NSpin } from "naive-ui";
import Garid from "./Garid.vue";
import { ref, computed, onMounted } from "vue";
import { useBaseStore } from "@/store";
import { SuiTxBlock, useProvider, useNftsOwnedByAddressInSpecificChain, useWallet, getAbleCoinsForSell } from "@game-web/base";
import { CONTRACT_PACKAGE, META_INFO_GLOBAL_ADDRESS, AIRDROP_GLOBAL_ADDRESS, DRAGON_EGG_GLOBAL_ADDRESS } from "@/constants";

import Nft from "./Nft.vue";

import { useI18n } from "vue-i18n";

const { t } = useI18n();

const loading = ref(false);
const showModal = ref(false);
const nfts = ref<any>([]);
const message = useMessage();
const total = ref(999);

const eggData = ref<any>([]);

const registerStore = useBaseStore();
const { address, signAndSendTxn } = useWallet();
const userInfo = computed(() => registerStore.getUserInfo);
const META_ID_ADDRESS = computed(() => userInfo.value?.id?.id);

const indexChange = (v: number) => {
  if (v === 1) {
    getEggInfo();
  }
};

const { devInspectTransactionBlock } = useProvider();

const getMyNfts = async () => {
  const { getOwnedNfts, nftsMapByAddressAndChain, addressNftKey } = useNftsOwnedByAddressInSpecificChain();
  await getOwnedNfts();

  nfts.value = nftsMapByAddressAndChain
    .get(addressNftKey.value)
    ?.map((item) => {
      return {
        ...item,
        type: "nft",
        imgUrl: item.url,
      };
    })
    .filter((item) => {
      const pkgName = item.objectType.split("::")[0];
      return pkgName === CONTRACT_PACKAGE;
    });
  if (nfts.value.length) {
    return (showModal.value = true);
  }
  message.error("不符合条件");
};

const buy = async (type: "ice" | "fire") => {
  loading.value = true;
  try {
    const tx = new SuiTxBlock();
    const coin = await getAbleCoinsForSell(1e13, "SHUI", tx, CONTRACT_PACKAGE, address.value!);
    console.log(`${CONTRACT_PACKAGE}::dragon_egg::buy_dragon_egg_${type}`, [DRAGON_EGG_GLOBAL_ADDRESS, coin]);

    tx.moveCall(`${CONTRACT_PACKAGE}::dragon_egg::buy_dragon_egg_${type}`, [DRAGON_EGG_GLOBAL_ADDRESS, coin]);
    const result = await signAndSendTxn(tx);

    console.log(result);
    message.error("领取成功");
    loading.value = false;
  } catch (error) {
    console.log(error);
    loading.value = false;
    message.error("领取失败");
  }
};

const getEggInfo = async () => {
  console.log(`${CONTRACT_PACKAGE}::dragon_egg::get_left_egg_num`, [DRAGON_EGG_GLOBAL_ADDRESS]);

  const tx = new SuiTxBlock();
  tx.moveCall(`${CONTRACT_PACKAGE}::dragon_egg::get_left_egg_num`, [DRAGON_EGG_GLOBAL_ADDRESS]);
  const { results }: any = await devInspectTransactionBlock(tx.txBlock);
  let resultString = results[0].returnValues[0][0]
    .fill(undefined, 0, 1)
    .filter(Boolean)
    .map((item: number) => String.fromCharCode(item));
  const [one, , three] = resultString;
  console.log(one, three);

  eggData.value = [Number(one || 0), Number(three || 0)];
  console.log(eggData.value);
};

const checkInfo = async (item: any) => {
  loading.value = true;
  const tx = new SuiTxBlock();
  tx.moveCall(`${CONTRACT_PACKAGE}::boat_ticket::is_claimed`, [item.objectId]);
  const { results }: any = await devInspectTransactionBlock(tx.txBlock);
  console.log("results", results);
  if (results) {
    const num = results[0].returnValues[0][0];
    if (num === 1) {
      loading.value = false;
      return message.error("已领取");
    }
    try {
      const { signAndSendTxn } = useWallet();
      const tx1 = new SuiTxBlock();
      console.log(`${CONTRACT_PACKAGE}::airdrop::claim_boat_whitelist_airdrop`, [AIRDROP_GLOBAL_ADDRESS, item.objectId, META_ID_ADDRESS.value]);
      tx1.moveCall(`${CONTRACT_PACKAGE}::airdrop::claim_boat_whitelist_airdrop`, [AIRDROP_GLOBAL_ADDRESS, item.objectId, META_ID_ADDRESS.value]);
      await signAndSendTxn(tx1);
      message.success("领取成功");
      showModal.value = false;
      loading.value = false;
    } catch (error) {
      console.log("error", error);
      message.error("领取失败");
      loading.value = false;
    }
  } else {
    loading.value = false;
    message.error("不符合条件");
  }
};
</script>

<style lang="scss" scoped>
.carousel-box {
  height: 100%;
}
.carousel-item {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;

  .container {
    width: 100%;
  }
  .big-img {
    width: 100%;
    object-fit: contain;
  }

  &.pic-box1 {
    background: url("@/assets/bg1.jpg") no-repeat;
    background-size: cover;
    .m-home-nft {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      @include for_breakpoint("max", 800px) {
        transform: translate(-50%, -60%);
      }
    }

    .container {
      width: 100%;
      .info {
        width: 100%;
        height: 100%;
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
      .more-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 80%;
        text-align: center;
        .info-l {
          flex: 1 0 auto;
          width: 50%;
          color: #00c3ff;
          .info-title {
            font-size: 18px;
          }
          .info-tips {
            font-size: 14px;
            border: 1px solid #00c3ff;
            width: 70%;
            margin: 0 auto;
          }
        }
        .info-r {
          text-align: center;
          .r-tips {
            font-size: 14px;
          }
          .r-btn {
            background: #00c3ff;
            padding: 0 10px;
            border-radius: 4px;
            line-height: 20px;
            font-size: 12px;
            position: relative;
            z-index: 10;
            border: none;
            outline: none;
          }
        }
      }
    }
  }
  &.pic-box2 {
    background: url("@/assets/bg2.jpg") no-repeat;
    background-size: cover;
    .box2-container {
      display: flex;
      @include for_breakpoint("max", 800px) {
        flex-direction: column;
        align-items: center;
      }
      .col-m {
        width: 20vw;
        margin: 0 2vw;
        background: rgba($color: #000000, $alpha: 0.5);
        box-sizing: border-box;
        padding: 20px;
        @include for_breakpoint("max", 800px) {
          width: 40%;
          margin: 0;
          padding: 10px;
          margin: 5px 0;
        }
        .text {
          font-size: 50px;
          color: #fff;
        }
        .sm-text {
          font-size: 20px;
          color: #fff;
        }
        .jindu-ts {
          display: flex;
          justify-content: space-between;
          color: #fff;
          margin-top: 20px;
        }
      }
      .col-l,
      .col-r {
        width: 20vw;
        @include for_breakpoint("max", 800px) {
          width: 40%;
          button {
            height: 30px !important;
          }
        }
        .text-box {
          background: white;
          font-size: 14px;
          padding: 10px 0;
        }
        button {
          padding: 0 20px;
          background: #00c3ff;
          height: 40px;
          border-radius: 4px;
          color: #fff;
          font-size: 18px;
          margin-top: 10px;
          &.red {
            background: rgba(233, 64, 95, 1);
          }
        }
        img {
          width: 100%;
        }
      }
    }
  }
  &.pic-box3 {
    background: url("@/assets/bg3.jpg") no-repeat;
    background-size: cover;
  }
  &.pic-box4 {
    background: url("@/assets/bg4.jpg") no-repeat;
    background-size: cover;
  }
  &.pic-box5 {
    background: linear-gradient(45deg, #383838, #5275eb);
  }
  .card {
    background: rgba($color: #000000, $alpha: 0.5);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    padding: 30px;
    line-height: 30px;
    margin: 10px;
    h3 {
      color: #fff;
      font-size: 16px;
      margin-bottom: 10px;
    }
    ul {
      list-style: inside;
      color: #fff;
      font-size: 14px;
      text-align: left;
    }
    p {
      color: #fff;
      font-size: 14px;
      text-align: left;
    }
  }
}
.container-box {
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.my-nft-item {
  width: 100%;
  cursor: pointer;
}
.my-nft-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
