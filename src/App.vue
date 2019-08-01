<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {}
</script>

<style>
#app {
  color: #545454;
  font-size: 14px;
  font-family: 'pingFangSC-Bold';
}
@font-face {
  font-family: 'pingFangSC-Bold';
  src: url('https://static.weixiaotong.com.cn/static/icon/appstore/PingFang Bold.ttf');
  /* src: url('./theme/PingFang Bold.ttf'); */
  font-weight: normal;
  font-style: normal;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
