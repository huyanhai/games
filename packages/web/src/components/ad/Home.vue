<template>
  <div class="carousel-box">
    <NCarousel dot-type="dot" dot-placemen="bottom" show-arrow>
      <div class="carousel-item pic-box1">
        <div class="container">
          <Garid>
            <template #left>
              <div class="info">
                <div class="top" style="text-align: center">
                  <b>{{ $t('home.stake') }}</b>
                </div>
                <div class="info-items" v-html="$t('home.stake_text1')"></div>
              </div>
            </template>
            <template #right>
              <Nft class="m-home-nft" />
              <img
                style="opacity: 0"
                class="big-img"
                src="@/assets/img1.png"
                alt=""
              />
            </template>
          </Garid>
        </div>
      </div>
      <div class="carousel-item pic-box2">
        <div class="container">
          <Garid>
            <template #left>
              <img class="big-img" src="@/assets/img2.png" alt="" />
            </template>
            <template #right>
              <div class="info">
                <b class="title">{{ $t('home.tree_title') }}</b>
                <div
                  v-for="(item, index) in p2Item"
                  :key="index"
                  class="p2-item"
                >
                  <span>{{ item.title }}</span>
                  <p>
                    {{ item.text }}
                  </p>
                </div>
              </div>
            </template>
          </Garid>
        </div>
      </div>
      <div class="carousel-item pic-box3">
        <div class="container">
          <Garid>
            <template #left>
              <div class="more-link">
                <a v-for="item in 5" :key="item" class="link">
                  <img :src="getAssetsFile(`shui${item}.png`)" alt="" />
                </a>
              </div>
              <img class="big-img" src="@/assets/img3.png" alt="" />
            </template>
            <template #right>
              <div class="info">
                <b class="title">{{ $t('home.magical') }}</b>
                <div class="p3-box">
                  <a
                    v-for="(item, index) in p3Item"
                    :key="index"
                    :style="{ background: item.color }"
                  >
                    {{ item.text }}
                  </a>
                </div>
              </div>
            </template>
          </Garid>
        </div>
      </div>
      <div class="carousel-item pic-box4">
        <div class="container">
          <Garid>
            <template #left>
              <div class="info">
                <p>{{ $t('home.reshape') }}</p>
                <img class="img" src="@/assets/img6.png" alt="" />
              </div>
            </template>
            <template #right>
              <img class="big-img" src="@/assets/img5.png" alt="" />
            </template>
          </Garid>
        </div>
      </div>
    </NCarousel>
  </div>
</template>
<script lang="ts" setup>
import { NCarousel } from 'naive-ui';
import Garid from './Garid.vue';
import { ref, computed } from 'vue';
import { getAssetsFile } from '@/utils/files';

import Nft from './Nft.vue';

import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const p2Item = computed(() => [
  {
    title: t('home.tree_t1'),
    text: t('home.tree_i1')
  },
  {
    title: t('home.tree_t2'),
    text: t('home.tree_i2')
  },
  {
    title: t('home.tree_t3'),
    text: t('home.tree_i3')
  },
  {
    title: t('home.tree_t4'),
    text: t('home.tree_i4')
  },
  {
    title: t('home.tree_t5'),
    text: t('home.tree_i5')
  }
]);

const p3Item = ref([
  {
    text: t('home.magical_1'),
    link: '',
    color: '#d7bf7c'
  },
  {
    text: t('home.magical_2'),
    link: '',
    color: '#747474'
  },
  {
    text: t('home.magical_3'),
    link: '',
    color: '#a83a37'
  },
  {
    text: t('home.magical_4'),
    link: '',
    color: '#449956'
  },
  {
    text: t('home.magical_5'),
    link: '',
    color: '#48a0e4'
  }
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
    background: linear-gradient(45deg, #383838, #5275eb);
    .m-home-nft {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      @include for_breakpoint('max', 800px) {
        transform: translate(-50%, -60%);
      }
    }

    .container {
      width: 100%;
      .info-items {
        ::v-deep(ul) {
          list-style: inside;
        }
      }
      .info {
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0 20px;
        @include for_breakpoint('min') {
        }
        @include for_breakpoint('max', 800px) {
          height: 350px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        h4 {
          font-weight: bold;
          font-size: 20px;
          margin-bottom: 10px;
        }
        p {
          font-size: 16px;
        }
        .top {
          font-size: 3vw;
          margin-bottom: 20px;
          margin-top: 0vw;
          flex-wrap: wrap;
          @include for_breakpoint('min') {
            font-size: 48px;
            margin-bottom: 20px;
            // margin-top: 40px;
          }
          @include for_breakpoint('max', 800px) {
            font-size: 16px;
            margin-bottom: 20px;
            margin-top: 0px;
          }
          b {
            text-align: center;
            margin: 0 auto;
            font-size: 30px;
            @include for_breakpoint('min') {
            }
            @include for_breakpoint('max', 800px) {
              font-size: 30px;
            }
          }
          p {
            font-size: 14px;
          }
          button {
            height: 3vw;
            background: #00c3ff;
            color: #fff;
            font-size: 1.2vw;
            padding: 0 2vw;
            border-radius: 0.4vw;
            display: block;
            @include for_breakpoint('min') {
              height: 48px;
              font-size: 19px;
              padding: 0 32px;
              border-radius: 6px;
            }
            @include for_breakpoint('max', 800px) {
              height: 30px;
              font-size: 12px;
              padding: 0 10px;
              border-radius: 6px;
            }
          }
        }
        p {
          font-size: 14px;
          line-height: 2vw;
          margin-bottom: 1vw;
          @include for_breakpoint('min') {
            font-size: 19px;
            line-height: 32px;
            margin-bottom: 16px;
          }
          @include for_breakpoint('max', 800px) {
            font-size: 12px;
            line-height: 20px;
            margin-bottom: 5px;
          }
        }
      }
    }
  }
  &.pic-box2 {
    background: #333;
    .info {
      margin-top: 2vw;
      overflow: hidden;
      margin-right: 2vw;
      @include for_breakpoint('min') {
        margin-top: 32px;
        margin-right: 32px;
      }
      @include for_breakpoint('max', 800px) {
        margin: 0 2vw;
        height: 350px;
      }
      .title {
        text-align: center;
        display: block;
        font-size: 2vw;
        margin-bottom: 2vw;
        @include for_breakpoint('min') {
          font-size: 32px;
          margin-bottom: 32px;
        }
        @include for_breakpoint('max', 800px) {
          font-size: 16px;
          margin: 10px 0;
        }
      }
      .p2-item {
        margin-bottom: 1vw;
        @include for_breakpoint('min') {
          margin-bottom: 16px;
        }
        @include for_breakpoint('max', 800px) {
          margin-bottom: 10px;
        }
      }
      span {
        display: inline-block;
        border-top-right-radius: 2vw;
        border-bottom-right-radius: 2vw;
        height: 2vw;
        background: #fff;
        color: #383838;
        padding: 0 1vw;
        font-size: 1vw;
        line-height: 2vw;
        margin-bottom: 0.5vw;
        width: 15vw;
        display: block;
        @include for_breakpoint('min') {
          border-top-right-radius: 32px;
          border-bottom-right-radius: 32px;
          height: 32px;
          padding: 0 16px;
          font-size: 16px;
          line-height: 32px;
          margin-bottom: 8px;
          width: 240px;
        }
        @include for_breakpoint('max', 800px) {
          border-radius: 20px;
          height: 20px;
          padding: 0 5px;
          font-size: 14px;
          line-height: 20px;
          margin-bottom: 5px;
          width: 200px;
        }
      }
      p {
        font-size: 0.9vw;
        columns: #fff;
        margin-left: 4vw;
        display: block;
        @include for_breakpoint('min') {
          font-size: 14px;
          margin-left: 64px;
        }
        @include for_breakpoint('max', 800px) {
          font-size: 12px;
          margin-left: 10px;
        }
      }
    }
  }
  &.pic-box3 {
    background: #333;
    .more-link {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      display: flex;
      align-items: center;
      bottom: 6vw;
      justify-content: center;
      @include for_breakpoint('min') {
        bottom: 97px;
      }
      @include for_breakpoint('max', 800px) {
        bottom: 50px;
      }
      .link {
        width: 6vw;
        height: 6vw;
        margin: 0 1vw;
        @include for_breakpoint('min') {
          width: 96px;
          height: 96px;
          margin: 0 16px;
        }
        @include for_breakpoint('max', 800px) {
          width: 40px;
          height: 40px;
          margin: 0 10px;
        }
      }
    }
    .info {
      width: 100%;
      @include for_breakpoint('max', 800px) {
        height: 350px;
      }
      .title {
        display: block;
        text-align: center;
        border-bottom: 2px solid #fff;
        font-size: 2vw;
        padding: 2vw;
        @include for_breakpoint('min') {
          font-size: 32px;
          padding: 32px;
        }
        @include for_breakpoint('max', 800px) {
          font-size: 16px;
          padding: 10px;
        }
      }
      .p3-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        a {
          width: 20vw;
          height: 4vw;
          line-height: 4vw;
          text-align: center;
          border-radius: 4vw;
          margin-top: 2vw;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          @include for_breakpoint('min') {
            width: 280px;
            height: 48px;
            line-height: 48px;
            border-radius: 48px;
            margin-top: 32px;
          }
          @include for_breakpoint('max', 800px) {
            width: 150px;
            height: 30px;
            line-height: 30px;
            border-radius: 30px;
            margin-top: 10px;
          }
        }
      }
    }
  }
  &.pic-box4 {
    background: #333;
    .info {
      box-sizing: border-box;
      padding-top: 6.5vw;
      padding-left: 2vw;
      @include for_breakpoint('min') {
        padding-top: 105px;
        padding-left: 32px;
      }
      @include for_breakpoint('max', 800px) {
        height: 350px;
        padding: 0 15px;
      }
      p {
        font-size: 3vw;
        margin-bottom: 10vw;
        @include for_breakpoint('min') {
          font-size: 48px;
          margin-bottom: 162px;
        }
        @include for_breakpoint('max', 800px) {
          font-size: 48px;
          margin-bottom: 50px;
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
