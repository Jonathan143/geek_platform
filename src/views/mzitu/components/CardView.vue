<template>
  <div class="card-mzitu"
    v-infinite-scroll="onMoreLoad"
    :infinite-scroll-disabled="infiniteDisabled">
    <el-card class="card-mzitu__content"
      v-for="(mzitu, index) in data"
      :key="index"
      :body-style="{ padding: '0px' }">
      <el-image :src="mzitu[keys.coverUrl]"
        fit="cover"
        width="100%"
        :alt="mzitu[keys.title]"
        lazy></el-image>
      <div class="content">
        <slot v-bind:mzitu="mzitu">
          <p class="content__title"><i class="el-icon-view el-icon--right"></i>
            {{ mzitu[keys.title] }}</p>
        </slot>
        <div class="content__date">{{ mzitu[keys.date] }}</div>
      </div>
      <el-button class="card-mzitu__right-top-icon"
        circle
        type="primary"
        :icon="rightTopIcon"
        @click="onRightTopIconClick(mzitu)"></el-button>
    </el-card>

    <el-divider><i :class="loadIconClass"></i></el-divider>
  </div>
</template>

<script>
const defaultKeys = () => ({
  coverUrl: 'coverUrl',
  title: 'title',
  date: 'date'
})
export default {
  model: {
    prop: 'value',
    event: 'onMoreLoad'
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => []
    },
    sourceKeys: {
      type: Object,
      default: () => defaultKeys()
    },
    rightTopIcon: {
      type: String,
      default: 'el-icon-upload'
    },
    totalCount: {
      type: Number,
      required: true
    }
    // load: {
    //   type: Function,
    //   required: true
    // }
  },
  data() {
    return {}
  },
  computed: {
    keys() {
      return Object.assign(defaultKeys(), this.sourceKeys)
    },
    infiniteDisabled() {
      return this.value || this.isFinished
    },
    loadIconClass() {
      return this.isLoadAll ? 'el-icon-finished' : 'el-icon-loading'
    },
    isFinished() {
      return this.data.length >= this.totalCount
    }
  },
  methods: {
    onMoreLoad() {
      if (!this.value) {
        // this.load()
        this.$emit('updete:value', true)
        this.$emit('load')
      }
    },

    onRightTopIconClick(mzitu) {
      this.$emit('right-top-icon-click', mzitu)
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
@import '@/theme/index.scss';

.card-mzitu {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-evenly;
  &__content {
    width: 236px;
    position: relative;
    cursor: pointer;
    height: 354px;
    margin: 0 10px 20px;
    &:hover {
      .content {
        opacity: 1;
      }
    }
    .content {
      padding: 10px;
      color: #fff;
      font-size: 14px;
      background: rgba(0, 0, 0, 0.4);
      position: absolute;
      bottom: 0;
      left: 0;
      opacity: 0;
      transition: all 0.5s ease-in-out;
      &__title {
        color: #fff;
        &:hover {
          color: #90caf9;
        }
      }
      &__date {
        text-align: right;
      }
    }
  }
  &__right-top-icon {
    position: absolute;
    top: 6px;
    right: 6px;
  }
}
.el-icon-loading {
  font-size: 28px;
  color: $--color-primary;
}
</style>
