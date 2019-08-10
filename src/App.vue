<template>
  <div id="app">
    <transition name="el-fade-in-linear">
      <router-view />
    </transition>
  </div>
</template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}

ul {
  list-style: none;
}
html,
body,
#app {
  height: 100%;
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
::-webkit-scrollbar-thumb {
  background-color: hsla(223, 3%, 50%, 0.4);
}
::-webkit-scrollbar-thumb:active {
  background-color: hsla(223, 3%, 50%, 0.6);
}
::-webkit-scrollbar {
  border: none;
  width: 6px;
  height: 6px;
}
</style>
