<template>
  <div class="cloud-list"
    :class="{ 'cloud-list--border': !isGrid }">
    <el-table ref="cloudListTable"
      v-show="!isGrid"
      :data="list"
      :header-cell-style="{
        'background-color': '#F4F5F9',
        color: '#000',
        padding: '5px 0',
        height: '45px'
      }"
      @selection-change="onSelectionChange"
      @sort-change="onSortChange">
      <el-table-column type="selection"
        width="52px"
        align="center">
      </el-table-column>
      <el-table-column label="名称">
        <div class="cloud-list__file"
          slot-scope="scope">
          <d2-icon-svg size="26px"
            :name="`file${getFileIcon(scope.row)}`"></d2-icon-svg>
          <span class="cloud-list__file-name"
            v-if="!scope.row.isRename"
            @click="onFileClick(scope.row)">{{ scope.row.name }}</span>
          <!-- 重命名输入框 -->
          <div v-else
            class="cloud-list__rename">
            <el-input class="cloud-list__rename-input"
              v-model="scope.row.newName.name"></el-input>
            <div class="cloud-list__rename-icons">
              <el-button type="success"
                icon="el-icon-check"
                size="mini"
                circle
                @click="onSureRenameClick(scope.row)"></el-button>
              <el-button icon="el-icon-close"
                size="mini"
                circle
                @click="onCancelRenameClick(scope.row)"></el-button>
            </div>
          </div>
        </div>
      </el-table-column>
      <el-table-column label="最后修改时间"
        prop="ctime"
        align="center"
        width="160"
        :formatter="formatDate"
        sortable></el-table-column>
      <el-table-column label="大小"
        prop="size"
        align="center"
        width="150"
        sortable>
        <template slot-scope="scope">
          {{ formatSize(scope.row.size) }}
        </template>
      </el-table-column>
      <el-table-column label="所有者"
        prop="owner"
        align="center"
        width="80"></el-table-column>
      <el-table-column v-if="!noAction"
        label="操作"
        align="center"
        width="180">
        <div class="cloud-list__action"
          slot-scope="scope">
          <span v-if="isAdmin || scope.row.uploaderid === userid"
            @click="onRenameClick(scope.row)">重命名</span>
          <span v-if="hasDelete(scope.row)"
            @click="onDeleteClick(scope.row)">删除</span>
        </div>
      </el-table-column>
    </el-table>
    <!-- 缩略图模式 -->
    <div v-show="isGrid">
      <div class="grid-header">
        <el-checkbox label="全选"
          :value="isAllGridChecked"
          :indeterminate="isAllIndeterminate"
          @change="onAllCheckedChange"></el-checkbox>
        <span v-if="gridSelectedList.length"
          class="grid-header__count">（已选择 {{ gridSelectedList.length }}
          项）</span>
      </div>
      <div class="grid">
        <div class="grid__file-wrapper"
          v-for="(item, index) of list"
          :key="index">
          <div class="grid__file"
            :title="item.name"
            @click="onFileClick(item)">
            <template v-if="isGrid&&getGridIcon(item).includes('http')">
              <el-image style="width: 60px; height: 60px"
                :src="getGridIcon(item)"
                fit="cover" />
            </template>
            <d2-icon-svg v-else
              size="60px"
              :name="getGridIcon(item)"></d2-icon-svg>
            <div class="grid__file-name">{{ item.name }}</div>
          </div>
          <el-checkbox v-model="item.isChecked"
            class="grid__file-checkbox"
            @change="onGridCheckedChange(item, $event)"></el-checkbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatFileSize } from '@/libs/util.file'
import { isImage } from '@/libs/util.validator'
import { mapState } from 'vuex'
import fileIcons from './fileIcon'
import dayjs from 'dayjs'
export default {
  name: 'cloudFileList',

  props: {
    // 不需要操作列
    noAction: Boolean,
    // 是否为管理员
    isAdmin: Boolean,
    // 是否为网格
    isGrid: {
      type: Boolean,
      default: false
    },
    // 上传人 显示
    noUploader: Boolean,
    /**
     * name: 名称
     * type: 类型  zone,folder,file
     * lastModifyDate: 最后修改时间
     * memberCount: 人数 (当 type 为 zone 有效)
     * permission: 权限 (当 type 为 zone 有效)
     * isAdmin: 是否为管理员
     * size: 大小
     * uploader: 上传人
     * uploaderid: 上传人 id
     * url: 文件地址 (当 type 为 file 有效)
     */
    list: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      isAllIndeterminate: false,
      isAllGridChecked: false,
      selectedList: []
      // userid: Store.get('user').id,
    }
  },

  computed: {
    gridSelectedList() {
      return this.list.filter(item => item.isChecked)
    }
  },

  methods: {
    isImage,

    getGridIcon(item) {
      const icon = this.getFileIcon(item)
      return (isImage(icon) ? '' : 'file') + icon
    },

    formatDate(...data) {
      return dayjs(data[2]).format('YYYY-MM-DD HH:mm')
    },

    formatSize(size) {
      return size ? formatFileSize(size) : '-'
    },

    getFileExt(name, fileItem) {
      const dotIndex = name.lastIndexOf('.')
      if (dotIndex !== -1) {
        return name.substr(dotIndex + 1)
      }
    },

    getFileIcon(item) {
      if (item.type === 'dir') {
        return '-dir-2'
      } else if (item.type === 'file') {
        const ext = this.getFileExt(item.name)
        if (ext) {
          // 先检查是不是图片，在缩略图模式下图片显示预览图
          if (isImage(item.name)) {
            let baseImgICon = '-image'
            return this.isGrid ? item.url || baseImgICon : baseImgICon
          }
          for (let key of Object.keys(fileIcons)) {
            if (fileIcons[key].includes(ext.toLowerCase())) {
              return key
            }
          }
        }
      }
      return '_unknown'
    },

    hasDelete(item) {
      if (item.type === 'zone') {
        return !item.size && item.isAdmin
      } else {
        return (
          item.type !== 'folder' &&
          (item.isAdmin || this.isAdmin || item.uploaderid === this.userid)
        )
      }
    },

    onSortChange(e) {
      this.$emit('sort', e)
    },

    onSelectionChange(e) {
      this.selectedList = e
      this.$emit('selectionChange', this.selectedList)
    },

    onFileClick(item) {
      this.$emit('fileClick', item)
    },

    onRenameClick(item) {
      let ext = this.getFileExt(item.name, item)
      if (ext) ext = '.' + ext
      this.$set(item, 'isRename', true)
      this.$set(item, 'newName', { name: item.name.replace(ext, ''), ext: ext })
    },

    onSureRenameClick(item) {
      let newName = item.newName.name + item.newName.ext
      if (newName.length > 50) {
        this.$message.error('名称不能超过50个字！')
        return
      }
      this.$emit('rename', item, item.newName.name + item.newName.ext)
      item.isRename = false
    },

    onCancelRenameClick(item) {
      this.$emit('cancelRename')
      item.isRename = false
    },

    onDeleteClick(item) {
      this.$emit('delete', item)
    },

    onAllCheckedChange(isChecked) {
      this.isAllGridChecked = isChecked
      this.list.forEach(item => {
        this.$set(item, 'isChecked', isChecked)
      })
      this.$emit('selectionChange', this.gridSelectedList)
      console.log(isChecked)
    },

    onGridCheckedChange(item, isChecked) {
      // this.$set(item, 'isChecked', isChecked)
      console.log(item, isChecked)

      this.$emit('selectionChange', this.gridSelectedList)
    }
  },

  watch: {
    isGrid(val) {
      this.selectedList = []
      this.gridSelectedList.forEach(item => {
        item.isChecked = false
      })
      this.$emit('selectionChange', [])
    },

    gridSelectedList(val) {
      this.isAllIndeterminate = !!val.length && val.length !== this.list.length
      this.isAllGridChecked =
        val.length === this.list.length && this.list.length !== 0
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/mixins/text.scss';
.cloud-list {
  &--border {
    border: 1px solid #ebeef5;
    border-bottom-width: 0;
  }
  &__file-name,
  &__permission,
  &__action {
    cursor: pointer;
    color: $color-primary;
  }
  &__file-name {
    padding-left: 10px;
    @include test_multiEllipsis;
  }
  &__member-count {
    &::after {
      content: '|';
      margin-left: 5px;
    }
  }
  &__file {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    line-height: 18px;
    img {
      margin-right: 10px;
    }
  }
  &__rename {
    flex-grow: 1;
    display: flex;
    align-items: center;
    &-icons {
      margin: 0 10px;
      flex-shrink: 0;
    }
    &-input {
      flex-grow: 1;
    }
  }
  &__action {
    span {
      margin: 0 5px;
    }
  }
}

.grid {
  display: flex;
  flex-wrap: wrap;
  &-header {
    height: 45px;
    line-height: 45px;
    background-color: #f4f5f9;
    padding: 0 15px;
    margin-bottom: 10px;
    &__count {
      margin-left: 10px;
      font-size: 14px;
      color: $color-primary;
    }
  }
  &__file {
    cursor: pointer;
    padding: 10px;
    flex-shrink: 0;
    width: 100px;
    border-radius: 5px;
    text-align: center;
    &:hover {
      background-color: rgba(229, 233, 242, 0.6);
    }
    &-wrapper {
      position: relative;
    }
    &-name {
      font-size: 14px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      @include test_multiEllipsis;
    }
    &-checkbox {
      position: absolute;
      top: 3px;
      right: 5px;
      z-index: 99;
    }
  }
}
</style>
