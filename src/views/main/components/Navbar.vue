<template>
  <v-toolbar class="toolbar">
    <v-toolbar-title class="toolbar__title">OKR管理系统</v-toolbar-title>

    <div class="toolbar__aims">
      <p class="aims__label">目标时间：</p>
      <el-select class="aims__select"
        v-model="selectTime"
        placeholder="请选择">
        <el-option v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

    <v-tabs class="toolbar__tabs"
      centered
      color="#4c84ff">

      <v-tab>首页</v-tab>
      <v-tab>OKR</v-tab>
      <v-tab>日常报工</v-tab>
      <v-tab>任务管理</v-tab>
      <v-tab>我的消息</v-tab>
    </v-tabs>

    <div class="toolbar__user">
      <el-avatar size="medium"
        src="https://img-1256555015.file.myqcloud.com/2019/05/14/5cda6fee81066.jpg"></el-avatar>

      <el-dropdown class="user__menu">
        <div class="menu__label">
          <span>Jonathan</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><i class="el-icon-user"></i> 个人中心</el-dropdown-item>
          <el-dropdown-item><i class="el-icon-switch-button"></i> 退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>
  </v-toolbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Navbar extends Vue {
  activeIndex: String = '1'

  selectTime: String = 'Q1'
  options: Array<Object> = [
    {
      value: 'Q1',
      label: '2019年第一季度'
    },
    {
      value: 'Q2',
      label: '2019年第二季度'
    },
    {
      value: 'Q项3',
      label: '2019年第三季度'
    },
    {
      value: 'Q4',
      label: '2019年第四季度'
    }
  ]

  handleClick() {}
}
</script>

<style lang="scss" scoped>
@import '~@/theme/variables.scss';

.toolbar {
  box-shadow: 0 1px 4px 0 $--color-shadow;
  &__title {
    color: $--color-text-primary;
    font-weight: 500;
    overflow: unset;
    cursor: pointer;
    &:hover {
      color: $--color-primary;
    }
  }
  &__aims {
    min-width: 320px;
    height: 66px;
    display: flex;
    align-items: center;
    padding: 0 40px;
    border-left: 2px solid $--color-border-2;
    margin-left: 20px;
    box-sizing: border-box;

    .aims {
      &__label {
        color: $--color-text-primary;
        font-size: 14px;
      }
      &__select {
        width: 160px;
      }
    }
  }

  &__tabs {
    border-right: 2px solid $--color-border-2;
  }

  &__user {
    min-width: 160px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 20px;
    box-sizing: border-box;
    .user__menu {
      flex: 1;
      padding-left: 10px;
      .menu__label {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: $--color-text-primary;
      }
    }

    .el-icon-caret-bottom {
      color: $--color-text-placeholder;
    }
  }

  .theme--light.v-tabs .v-tab:not(.v-tab--active) {
    color: $--color-text-primary;
    font-weight: 500;
  }
  ::v-deep .el-input__inner {
    border: none;
  }
}
</style>
