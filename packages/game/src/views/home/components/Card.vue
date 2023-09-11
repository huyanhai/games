<template>
  <div class="home-card">
    <div class="col-l">
      <h3>Meta Game</h3>
      <p>
        Airdrop Activity<br />
        By purchasing a "SHUI TOKEN" NFT through OpenSea, you can become
        "Whitelist" users, and have a chance to get our free 10000 SHUI airdrop.
        NFT limited edition: 9999 pieces, price: 0.025 ETH
        <br />
        Swap Activity<br />
        Purchase a "Meta Game" NFT through OpenSea to be eligible to participate
        "Swap" appointment event. NFT limited edition: 730 pieces, selling
        price: 0.1 ETH
      </p>
      <div class="m-row">
        <NSpace :vertical="true">
          <b>200+</b>
          <p>Total Users</p>
        </NSpace>
        <NSpace :vertical="true">
          <b>200+</b>
          <p>Total Users</p>
        </NSpace>
        <NSpace :vertical="true">
          <b>200+</b>
          <p>Total Users</p>
        </NSpace>
      </div>
      <div class="btn">
        <button class="button" @click="startGame">start meta game</button>
      </div>
    </div>
    <div class="col-r">
      <img src="@/assets/tree.png" alt="" srcset="" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { NSpace, useMessage } from 'naive-ui';

const message = useMessage();

const startGame = () => {
  message.warning('暂未开放');
};
</script>

<style lang="scss" scoped>
.home-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  width: 100%;
  padding: 12% 20px;
  box-sizing: border-box;
  margin: 0 auto;
  .col-l {
    text-align: left;
    color: #ffc681;
    font-size: 16px;
    line-height: 30px;
    margin-right: 50px;
    width: 50%;
    h3 {
      font-size: 40px;
      margin-bottom: 40px;
    }
    .m-row {
      display: flex;
      margin-top: 40px;
      > div {
        margin-right: 40px;
        b {
          font-size: 20px;
        }
        p {
          font-size: 14px;
          opacity: 0.5;
        }
      }
    }
    .btn {
      display: flex;
      justify-content: center;
      width: 100%;
      margin-top: 20px;
      .button {
        width: 60%;
        height: 50px;
        background: linear-gradient(#ffbb96, rgb(238, 135, 104));
        color: #fff;
        border-radius: 4px;
        font-size: 20px;
        text-transform: uppercase;
        font-weight: bold;
      }
    }
  }
  .col-r {
    width: 30%;
    img {
      width: 100%;
    }
  }
}
</style>
