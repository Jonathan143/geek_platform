<template>
  <div class="error">
    <section class="error-container">
      <span class="four"><span class="screen-reader-text">4</span></span>
      <span class="zero"><span class="screen-reader-text">0</span></span>
      <span class="four"><span class="screen-reader-text">4</span></span>
    </section>

    <div class="go__home">
      <button @click="$router.replace({ path: '/' })">返回首页</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error {
  &-container {
    text-align: center;
    font-size: 106px;
    font-weight: 800;
    margin: 70px 15px;
    & > span {
      display: inline-block;
      position: relative;
    }
    & > span.four {
      width: 136px;
      height: 43px;
      border-radius: 999px;
      background: linear-gradient(
          140deg,
          rgba(0, 0, 0, 0.1) 0%,
          rgba(0, 0, 0, 0.07) 43%,
          transparent 44%,
          transparent 100%
        ),
        linear-gradient(
          105deg,
          transparent 0%,
          transparent 40%,
          rgba(0, 0, 0, 0.06) 41%,
          rgba(0, 0, 0, 0.07) 76%,
          transparent 77%,
          transparent 100%
        ),
        linear-gradient(to right, #d89ca4, #e27b7e);
    }
    & > span.four:before,
    & > span.four:after {
      content: '';
      display: block;
      position: absolute;
      border-radius: 999px;
    }
    & > span.four:before {
      width: 43px;
      height: 156px;
      left: 60px;
      bottom: -43px;
      background: linear-gradient(
          128deg,
          rgba(0, 0, 0, 0.1) 0%,
          rgba(0, 0, 0, 0.07) 40%,
          transparent 41%,
          transparent 100%
        ),
        linear-gradient(
          116deg,
          rgba(0, 0, 0, 0.1) 0%,
          rgba(0, 0, 0, 0.07) 50%,
          transparent 51%,
          transparent 100%
        ),
        linear-gradient(to top, #99749d, #b895ab, #cc9aa6, #d7969e, #e0787f);
    }
    & > span.four:after {
      width: 137px;
      height: 43px;
      transform: rotate(-49.5deg);
      left: -18px;
      bottom: 36px;
      background: linear-gradient(
        to right,
        #99749d,
        #b895ab,
        #cc9aa6,
        #d7969e,
        #e0787f
      );
    }

    & > span.zero {
      vertical-align: text-top;
      width: 156px;
      height: 156px;
      border-radius: 999px;
      background: linear-gradient(
          -45deg,
          transparent 0%,
          rgba(0, 0, 0, 0.06) 50%,
          transparent 51%,
          transparent 100%
        ),
        linear-gradient(
          to top right,
          #99749d,
          #99749d,
          #b895ab,
          #cc9aa6,
          #d7969e,
          #ed8687,
          #ed8687
        );
      overflow: hidden;
      animation: bgshadow 5s infinite;
    }
    & > span.zero:before {
      content: '';
      display: block;
      position: absolute;
      transform: rotate(45deg);
      width: 90px;
      height: 90px;
      background-color: transparent;
      left: 0px;
      bottom: 0px;
      background: linear-gradient(
          95deg,
          transparent 0%,
          transparent 8%,
          rgba(0, 0, 0, 0.07) 9%,
          transparent 50%,
          transparent 100%
        ),
        linear-gradient(
          85deg,
          transparent 0%,
          transparent 19%,
          rgba(0, 0, 0, 0.05) 20%,
          rgba(0, 0, 0, 0.07) 91%,
          transparent 92%,
          transparent 100%
        );
    }
    & > span.zero:after {
      content: '';
      display: block;
      position: absolute;
      border-radius: 999px;
      width: 70px;
      height: 70px;
      left: 43px;
      bottom: 43px;
      background: #fdfaf5;
      box-shadow: -2px 2px 2px 0px rgba(0, 0, 0, 0.1);
    }
  }
  .screen-reader-text {
    position: absolute;
    top: -9999em;
    left: -9999em;
  }

  @keyframes bgshadow {
    0% {
      box-shadow: inset -160px 160px 0px 5px rgba(0, 0, 0, 0.4);
    }
    45% {
      box-shadow: inset 0px 0px 0px 0px rgba(0, 0, 0, 0.1);
    }
    55% {
      box-shadow: inset 0px 0px 0px 0px rgba(0, 0, 0, 0.1);
    }
    100% {
      box-shadow: inset 160px -160px 0px 5px rgba(0, 0, 0, 0.4);
    }
  }

  .go__home {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  button {
    z-index: 1;
    position: relative;
    font-size: inherit;
    color: white;
    padding: 0.5em 1em;
    outline: none;
    border: none;
    background-color: #d7969e;
    border-radius: 3px;
  }

  button:hover {
    cursor: pointer;
  }

  button::before {
    content: '';
    z-index: -1;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: 4px solid #d7969e;
    transform-origin: center;
    transform: scale(1);
    border-radius: 3px;
  }

  button:hover::before {
    transition: all 0.75s ease-in-out;
    transform-origin: center;
    transform: scale(1.75);
    opacity: 0;
  }
}
</style>
