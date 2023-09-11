<template>
  <div class="m-github">
    <div class="top">
      <div class="col">
        <div class="box">
          <input type="text" />
        </div>
        <button>VERIFY</button>
      </div>
      <div class="col">
        <div class="box">
          <input type="text" />
          <select id="test_select">
            <option value="1">verify</option>
            <option value="2">code</option>
            <option value="3">airdrop</option>
          </select>
        </div>
        <button>setAdmin</button>
      </div>
    </div>
    <div class="bottom">
      <button>check HASH</button>
      <button>check USE</button>
      <input placeholder="Must be activated by the user" />
      <button>Activate ID</button>
      <button>Unactivated USER</button>
    </div>
  </div>
</template>
<script lang="ts" setup></script>

<style lang="scss" scoped>
.m-github {
  width: 100%;
  padding: 0 2vw;
  box-shadow: #585858 5px 5px 30px 1px;
  overflow: hidden;
  .top {
    display: flex;
    align-items: center;
    height: 4vw;
    width: 100%;
    margin: 4vw 0;
    .col {
      display: flex;
      align-items: center;
      width: 50%;
      &:nth-child(1) {
        padding-right: 4vw;
      }
      &:nth-child(2) {
        padding-left: 4vw;
      }
    }
    .box {
      width: 50%;
      flex: 1 0 auto;
      border: 1px solid #cccccc;
      border-radius: 4vw;
      height: 4vw;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 0 2vw;
      input {
        outline: 0;
        width: 50%;
        flex: 1 0 auto;
        font-size: 1.6vw;
      }
      select {
        font-size: 1.6vw;
        border: 1px solid #ccc;
        outline: 0;
      }
    }
    button {
      width: 8vw;
      height: 4vw;
      border-radius: 0.8vw;
      background: #e57d08;
      color: #fff;
      margin-left: 2vw;
      font-size: 1.2vw;
    }
  }
  .bottom {
    display: flex;
    align-items: center;
    button {
      width: 15vw;
      height: 4vw;
      border-radius: 0.8vw;
      background: #e57d08;
      color: #fff;
      margin-right: 2vw;
      margin-bottom: 4vw;
      font-size: 1.2vw;
    }
    input {
      border: 1px solid #cccccc;
      height: 4vw;
      box-sizing: border-box;
      padding: 0 2vw;
      outline: 0;
      margin-right: 2vw;
      width: 30%;
      display: block;
      margin-bottom: 4vw;
    }
  }
}
</style>
