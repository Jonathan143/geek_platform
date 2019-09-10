<template>
  <div id="app">
    <transition name="el-fade-in-linear"
      mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<style lang="scss">
@import '@/theme/index.scss';
@import '@/theme/global.scss';

html,
body,
#app {
  height: 100%;
  color: $--color-text-medium;
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

::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  border-radius: 0;
  background: rgba(0, 0, 0, 0);
}
::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background-color: hsla(223, 3%, 50%, 0.4);
  &:hover {
    background-color: $--color-primary;
  }
}
::-webkit-scrollbar {
  border: none;
  width: 6px;
  height: 4px;
}
</style>
