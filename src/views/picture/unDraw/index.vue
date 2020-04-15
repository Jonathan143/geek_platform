<template>
  <d2-container>
    <div id="illustration"
      v-infinite-scroll="load"
      infinite-scroll-disabled="isScrollDisabled">
      <div class="illustration-item"
        v-for="(item,index) of list"
        :key="item.id">
        <div class="illustration-item__svg-wrap d2-pt d2-pb"
          ref="illustration"
          @click="onDownloadClick(index,item)">
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
  </d2-container>
</template>

<script>
import { mapState } from 'vuex'
import { fetchUnDraw } from '@/api/unDraw'
import { download } from '@/libs/util.file'
export default {
  name: 'pictureUnDraw',
  components: {},
  props: {},
  data() {
    return {
      list: [],
      params: {
        pageIndex: 1,
        pageSize: 10,
        nameLike: ''
      },
      total: 0,
      isLoading: false
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
        this.changeColor(val, oldValue, svg)
      }
    }
  },
  methods: {
    onDownloadClick(index, { title }) {
      const ref = this.$refs.illustration[index]
      if (ref && ref.children) {
      }
      const blobUrl = URL.createObjectURL(
        new Blob([this.$refs.illustration[index].children[0].outerHTML], {
          type: 'image/svg+xml'
        })
      )

      download(blobUrl, title + '.svg')
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
      this.changeColor(this.color, '#6c63ff', svg)
    },

    changeColor(color, oldColor, svg) {
      if (svg && svg.children) {
        for (const el of svg.children) {
          if (el.getAttribute('fill') === oldColor) {
            el.setAttribute('fill', color)
          }
        }
      }
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
