<template>
  <div class="carousel-box">
    <NCarousel dot-type="dot" dot-placemen="bottom" show-arrow>
      <div class="carousel-item pic-box1">
        <div class="container">
          <Garid>
            <template #left>
              <div class="info">
                <div class="card">
                  <h3>NFT- PASS (白名单)</h3>
                  <ul>
                    <li>“火星飞船”GameFi总量为 10,000 售完为止。</li>
                    <li>持有“火星飞船”GameFi的用户才能加入“白名单”并获得一“探索者一号”飞船。</li>
                    <li>只有“白名单”用户才能按照 1 SUI= 100 SHUI比例兑换资格</li>
                    <li>我们还为“白名单”用户预留了 10000~20000 的 Meta 身份ID 编号。</li>
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
            <div class="card">
              <h3>黄金储备”计划</h3>
              <p>为了建立良好的信用体系，我们计划将所有兑换所得 SUI 全部置换成 BTC 进行锁仓，<br />作为项目风险控制资产由 SHUI 基金会和 SHUI DAO 组织共同监管，公开透明,</p>
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
</template>
<script lang="ts" setup>
import { NCarousel } from "naive-ui";
import Garid from "./Garid.vue";
import { ref, computed } from "vue";
import { getAssetsFile } from "@/utils/files";

import Nft from "./Nft.vue";

import { useI18n } from "vue-i18n";

const { t } = useI18n();

const p2Item = computed(() => [
  {
    title: t("home.tree_t1"),
    text: t("home.tree_i1"),
  },
  {
    title: t("home.tree_t2"),
    text: t("home.tree_i2"),
  },
  {
    title: t("home.tree_t3"),
    text: t("home.tree_i3"),
  },
  {
    title: t("home.tree_t4"),
    text: t("home.tree_i4"),
  },
  {
    title: t("home.tree_t5"),
    text: t("home.tree_i5"),
  },
]);

const p3Item = ref([
  {
    text: t("home.magical_1"),
    link: "",
    color: "#d7bf7c",
  },
  {
    text: t("home.magical_2"),
    link: "",
    color: "#747474",
  },
  {
    text: t("home.magical_3"),
    link: "",
    color: "#a83a37",
  },
  {
    text: t("home.magical_4"),
    link: "",
    color: "#449956",
  },
  {
    text: t("home.magical_5"),
    link: "",
    color: "#48a0e4",
  },
]);
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
      }
    }
  }
  &.pic-box2 {
    background: url("@/assets/bg2.jpg") no-repeat;
    background-size: cover;
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
</style>
