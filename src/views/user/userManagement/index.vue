<template>
  <el-table :data="userList"
    style="width: 100%">
    <el-table-column prop="avatar"
      label="头像"
      width="80">
      <template v-slot="scope">
        <el-avatar :src="scope.row.avatar"
          fit="cover"></el-avatar>
      </template>
    </el-table-column>
    <el-table-column prop="username"
      label="用户名">
    </el-table-column>
    <el-table-column prop="nickname"
      label="昵称">
      <template v-slot="scope">
        <el-input v-model="scope.row.nickname"
          v-if="scope.row.isEdit"
          placeholder="昵称"
          maxlength="10"></el-input>
        <template v-else>{{scope.row.nickname}}</template>
      </template>
    </el-table-column>
    <el-table-column prop="email"
      label="邮箱">
      <template v-slot="scope">
        <el-input v-model="scope.row.email"
          v-if="scope.row.isEdit"
          type="email"
          placeholder="邮箱"
          @change="onEmailInoutChange(scope.row)"></el-input>
        <template v-else>{{scope.row.email}}</template>
      </template>
    </el-table-column>
    <el-table-column prop="role"
      label="权限">
      <template v-slot="scope">
        <template v-if="scope.row.isEdit">
          <el-select v-model="scope.row.roleId"
            placeholder="请选择">
            <el-option v-for="role in userRoleList"
              :key="role.id"
              :label="role.name"
              :value="role.id">
            </el-option>
          </el-select>
        </template>
        <template v-else>{{scope.row.role&&scope.row.role.name}}</template>
      </template>
    </el-table-column>
    <el-table-column label="最后登录时间"
      width="160">
      <template v-slot="scope">
        {{scope.row.lastLoginDateTime|formatTime}}
      </template>
    </el-table-column>
    <el-table-column label="注册时间"
      width="160">
      <template v-slot="scope">
        {{scope.row.createDateTime|formatTime}}
      </template>
    </el-table-column>
    <el-table-column fixed="right"
      label="操作"
      width="100">
      <template v-slot="scope">
        <el-button v-if="scope.row.isEdit"
          type="text"
          size="small"
          :disabled="scope.row.isError"
          @click="onSaveEditClick(scope.row)">保存</el-button>
        <el-button v-else
          type="text"
          size="small"
          @click="onEditClick(scope.row)">编辑</el-button>

        <el-button type="text"
          style="color:#f57677"
          size="small"
          @click="onDeleteUserClick(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {
  reFetchUserList,
  reDeleteUserById,
  reFetchUserRoleList,
  reUpdateUserById
} from 'api/user'
import { typeOf } from '@/utils/assist'
import isEmail from 'validator/lib/isEmail'
export default {
  components: {},
  props: {},
  data() {
    return {
      userList: [],
      userId: '',
      userRoleList: []
    }
  },
  computed: {},
  methods: {
    onDeleteUserClick(user) {
      this.$confirm(
        `此操作将永久删除 <span style="color:#4c84ff">${
          user.username
        }</span> , 是否继续?`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true,
          type: 'warning'
        }
      )
        .then(async () => {
          const data = await reDeleteUserById(user)
          if (data.deletedCount === 1) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.userList = this.userList.filter(item => item.id !== user.id)
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    onEditClick(user) {
      user.isEdit = true
      console.log(user)
    },

    async onSaveEditClick(user) {
      const { id, email, nickname, roleId } = user

      const { updateDateTime } = await reUpdateUserById({
        id,
        email,
        nickname,
        role: roleId
      })
      user.role = this.userRoleList.find(item => item.id === roleId)
      user.updateDateTime = updateDateTime
      user.isEdit = false
    },

    onEmailInoutChange(user) {
      if (!isEmail(user.email)) {
        user.isError = true
        this.$message.error('请输入正确的邮箱')
      } else {
        user.isError = false
      }
    },

    async fetchUserList() {
      let data = await reFetchUserList(this.userId)
      if (typeOf(data) === 'array') {
        data.forEach(item => {
          item.isEdit = false
          item.isError = false
          item.roleId = item.role && item.role.id
        })
        this.userList = data
      }
    }
  },
  async mounted() {
    this.fetchUserList()
    this.userRoleList = await reFetchUserRoleList()
  }
}
</script>

<style lang="scss" scoped>
</style>
