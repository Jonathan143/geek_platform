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
  font-family: 'pingFangSC-Medium';
}
@font-face {
  font-family: 'pingFangSC-Medium';
  src: url('./theme/PingFang Medium.ttf');
  font-weight: normal;
  font-style: normal;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
