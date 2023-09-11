<template>
  <div class="webtop">
    <div class="home">
      <div class="home-slogan">
        <div class="slogan-left">
          <text>{{ $t('home.top_left') }}</text>
        </div>
        <div class="slogan-right">
          <text>{{ $t('home.top_right') }}</text>
        </div>
        <div class="logo">
          <div class="home-gif">
            <TopLogo />
          </div>
        </div>
      </div>
      <div class="home-title-en">
        <img style="width: 25%" src="@/assets/mgame.png" alt="" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import TopLogo from './top-logo/Index.vue';
</script>

<style lang="scss" scoped>
.webtop {
  margin: 0px auto;
  width: 100%;
  height: 45vw;
  background: #333333;
  border-bottom: 10px solid #00c3ff;
  @include for_breakpoint('min') {
    height: 729px;
  }
}
.home {
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
  @include for_breakpoint('max', 800px) {
    padding: 0 10px;
  }
}

.home-slogan {
  margin: 0 auto;
  float: left;
  width: 100%;
  height: 10vw;
  max-height: 100px;
  margin-top: 12vw;
  border-radius: 10vw;
  background: #00c3ff;
  position: relative;
  z-index: 3;
  @include for_breakpoint('min') {
    height: 100px;
    border-radius: 100px;
    margin-top: 194px;
  }
}
.home-gif {
  position: absolute;
  left: 47%;
  top: 35%;
  transform: translate(-50%, -50%);
  width: 30vw;
  height: 30vw;
  @include for_breakpoint('min') {
    width: 486px;
    height: 486px;
  }
  canvas {
    width: 100% !important;
    height: 100% !important;
  }
}

.slogan-left text {
  font-size: 1.8vw;
  color: #fff;
  font-weight: lighter;
  padding-right: 10vw;
  letter-spacing: 0.5px;
  z-index: 2;
  @include for_breakpoint('min') {
    font-size: 29px;
    padding-right: 162px;
  }
}
.slogan-right text {
  font-size: 1.8vw;
  color: #fff;
  font-weight: lighter;
  padding-left: 10vw;
  letter-spacing: 1px;
  z-index: 2;
  @include for_breakpoint('min') {
    font-size: 29px;
    padding-left: 162px;
  }
}
.slogan-left {
  margin: 0 auto;
  float: left;
  width: 50%;
  height: 10vw;
  max-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  @include for_breakpoint('min') {
    height: 100px;
  }
}
.slogan-right {
  margin: 0 auto;
  float: right;
  width: 50%;
  height: 10vw;
  max-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  @include for_breakpoint('min') {
    height: 100px;
  }
}

.logo {
  position: absolute;
  width: 17vw;
  height: 17vw;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: url('@/assets/logos.png');
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: center;
  background-size: cover;
  z-index: 4;
  border: 2vw solid #333333;
  border-radius: 17vw;
  @include for_breakpoint('min') {
    width: 275px;
    height: 275px;
    border: 32px solid #333333;
    border-radius: 275px;
  }
}
.home-title-en {
  width: 100%;
  z-index: 2;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: centere;
  justify-content: center;
  padding-top: 8vw;
  @include for_breakpoint('min') {
    padding-top: 129px;
  }
}
</style>
