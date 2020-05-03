<template>
  <d2-container>
    <vs-tooltip class="d-inline-block">
      <vs-button circle
        icon
        :upload="isPulling"
        floating
        :color="color"
        @click="isPullDrawDialogVisible=true">
        <d2-icon name="bug" />
      </vs-button>
      <template #tooltip>
        pull from unDraw
      </template>
    </vs-tooltip>
    <div id="illustration"
      v-infinite-scroll="load"
      infinite-scroll-disabled="isScrollDisabled">
      <div class="illustration-item"
        v-for="(item,index) of list"
        :key="item.id">
        <div class="illustration-item__svg-wrap d2-pt d2-pb"
          ref="illustration"
          @click="onPreviewClick(index,item)">
          <div class="illustration-item__svg"
            :initialization="initialization"
            v-svg="item.image">
          </div>
        </div>
        <div class="illustration-item__title">{{item.title}}</div>
      </div>
    </div>

    <p class="loading"
      v-show="isLoading"
      :style="{color}"><i class="el-icon-loading" />加载中...</p>
    <p class="loading"
      v-if="isNoMore&&!isLoading">没有更多了</p>

    <draw-dialog v-model="isDrawDialogVisible"
      :data="svgDialogData"></draw-dialog>

    <vs-dialog width="300px"
      not-center
      v-model="isPullDrawDialogVisible">
      <template #header>
        <h4 class="not-margin">
          请输入需要拉取的页码
        </h4>
      </template>

      <el-input-number v-model="pullPageIndex"
        :min="0"
        size="small"
        :max="maxPullPageIndex"
        label="拉取页码"></el-input-number>

      <template #footer>
        <div class="d-flex jc-end">
          <vs-button @click="onPullClick"
            transparent>
            Ok
          </vs-button>
          <vs-button @click="isPullDrawDialogVisible=false"
            dark
            transparent>
            Cancel
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </d2-container>
</template>

<script>
import { mapState } from 'vuex'
import { fetchUnDraw, pullUnDraw } from '@/api/unDraw'
import { changeColor } from './utils'
import drawDialog from '../components/drawDialog'
export default {
  name: 'pictureUnDraw',
  components: { drawDialog },
  props: {},
  data() {
    return {
      list: [],
      params: {
        pageIndex: 1,
        pageSize: 20,
        nameLike: ''
      },
      total: 0,
      isLoading: false,
      isDrawDialogVisible: false,
      svgDialogData: {
        title: '',
        svgHtml: ''
      },
      isPulling: false,
      pullPageIndex: 0,
      maxPullPageIndex: 10000,
      isPullDrawDialogVisible: false
    }
  },
  computed: {
    ...mapState('d2admin/color', {
      color: state => state.value.toLocaleLowerCase()
    }),
    isNoMore() {
      return this.list.length >= this.total
    },
    isScrollDisabled() {
      return this.isNoMore || this.isLoading
    }
  },
  watch: {
    color(val, oldValue) {
      const svgList = document.querySelectorAll(
        '#illustration .illustration-item__svg'
      )
      for (const svg of svgList) {
        changeColor(val, oldValue, svg)
      }
    }
  },
  methods: {
    async onPullClick() {
      this.$message('开始拉取...')
      this.isPullDrawDialogVisible = false
      this.isPulling = true
      try {
        const { pullCount, hasMore } = await pullUnDraw(this.pullPageIndex)
        if (hasMore) {
          this.pullPageIndex++
        } else {
          this.maxPullPageIndex = this.pullPageIndex
        }
        this.$vs.notification({
          title: 'pull success',
          text: `pullCount: ${pullCount}`,
          position: 'bottom-center',
          color: this.color,
          icon: `<i class="fa fa-bug" />`
        })
      } catch (error) {
        this.isPullDrawDialogVisible = true
      }
      this.isPulling = false
    },

    onPreviewClick(index, { title }) {
      this.isDrawDialogVisible = true
      console.log(index)

      const ref = this.$refs.illustration[index]
      this.svgDialogData = {
        svgHtml: ref.children[0].outerHTML,
        title
      }
    },

    async load() {
      try {
        this.isLoading = true
        const data = await fetchUnDraw(this.params)
        this.list = [...this.list, ...data.list]
        this.total = data.total
        this.params.pageIndex = this.params.pageIndex + 1
        this.isLoading = false
        this.keepData()
      } catch (error) {
        this.isLoading = false
      }
    },

    initialization(svg) {
      changeColor(this.color, '#6c63ff', svg)
    },

    keepData() {
      if (
        document.querySelector('#illustration').scrollHeight <
          document.querySelector('.d2-container-full__body').clientHeight &&
        !this.isScrollDisabled
      ) {
        this.load()
      }
    }
  },
  mounted() {
    this.load()
  }
}
</script>

<style lang="scss" scoped>
#illustration {
  display: grid;
  grid-template-columns: repeat(auto-fill, 214px);
  grid-gap: 30px 20px;
  justify-content: space-evenly;
  .illustration-item {
    border-radius: 4px;
    background-color: rgb(253, 253, 253);
    &__svg {
      width: 214px;
      height: 110px;
      transition: 0.3s;
      cursor: pointer;
      &:hover {
        transform: scale(1.1);
      }
      &-wrap {
        overflow: hidden;
      }
    }
    &__title {
      text-align: center;
    }
  }
}

.loading {
  padding: 20px;
  text-align: center;
  .el-icon-loading {
    margin-right: 10px;
  }
}

@keyframes componentAnimate {
  0% {
    transform: translate(0);
  }
  30% {
    transform: translateY(-10px);
  }
  50% {
    transform: translateY(4px);
  }
  70% {
    transform: translateY(-15px);
  }
  100% {
    transform: translate(0);
  }
}
</style>
