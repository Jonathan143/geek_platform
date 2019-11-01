<template>
  <d2-container>
    <template #header>
      <el-input placeholder="请输入用户名或昵称搜索"
        prefix-icon="el-icon-search"
        v-model="searchValue"
        @input="onSearchValueChange" />

      <el-button @click="onAddUserClick">新增</el-button>
      <el-button type="primary"
        icon="el-icon-refresh"
        @click="onRefeshClick"
        circle />
    </template>

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
        label="用户名"> </el-table-column>
      <el-table-column prop="nickname"
        label="昵称" />
      <el-table-column prop="email"
        label="邮箱" />
      <el-table-column prop="role"
        label="权限">
        <template v-slot="scope">
          <template>{{ scope.row.role && scope.row.role.name }}</template>
        </template>
      </el-table-column>
      <el-table-column label="最后登录时间"
        width="160">
        <template v-slot="scope">
          {{ scope.row.lastLoginDateTime | formatTime }}
        </template>
      </el-table-column>
      <el-table-column label="注册时间"
        width="160">
        <template v-slot="scope">
          {{ scope.row.createDateTime | formatTime }}
        </template>
      </el-table-column>
      <el-table-column fixed="right"
        label="操作"
        width="100">
        <template v-slot="scope">
          <el-button type="text"
            size="small"
            @click="onEditClick(scope.row)">编辑</el-button>

          <el-button type="text"
            style="color:#f57677"
            size="small"
            @click="onDeleteUserClick(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog width="460px"
      title="编辑用户信息"
      :visible.sync="dialogVisible"
      :before-close="beforeDialogClose">
      <form-create v-model="fApi"
        :rule="fromRule"
        @on-submit="onSubmit"></form-create>
    </el-dialog>
  </d2-container>
</template>

<script>
import {
  reFetchUserList,
  reDeleteUserById,
  reFetchUserRoleList,
  reUpdateUserById
} from '@/api/user'
import { typeOf } from '@/libs/util.assist'
import isEmail from 'validator/lib/isEmail'
import dayjs from 'dayjs'
export default {
  name: 'userManagement',
  components: {},
  props: {},
  data() {
    return {
      userList: [],
      userRoleList: [],
      searchValue: '',

      dialogVisible: false,
      fApi: {},
      currentUser: {},
      timeer: null,
      isUpdate: false
    }
  },
  computed: {
    //表单生成规则
    fromRule() {
      const {
        id = '',
        username = '',
        nickname = '',
        email = '',
        role = {}
      } = this.currentUser
      const maker = this.$maker
      let fromRule = [
        maker.hidden('id', id),
        maker
          .input('用户名', 'username', username)
          .props({
            placeholder: '请输入用户名',
            width: 300,
            readonly: !!id
          })
          .validate([
            {
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            },
            { type: 'string', min: 2, message: '最少2个字', trigger: 'blur' },
            { type: 'string', max: 16, message: '最多8个字', trigger: 'blur' }
          ]),
        maker
          .input('昵称', 'nickname', nickname)
          .props({
            placeholder: '请输入昵称',
            width: 300
          })
          .validate([
            { type: 'string', min: 2, message: '最少2个字', trigger: 'blur' },
            { type: 'string', max: 8, message: '最多8个字', trigger: 'blur' }
          ]),
        maker
          .input('邮箱', 'email', email)
          .props({
            placeholder: '请输入邮箱'
          })
          .validate([
            {
              required: true,
              type: 'email',
              message: '请输入正确的邮箱',
              trigger: 'blur'
            }
          ]),
        maker
          .select('用户权限', 'role', role.id)
          .props({
            placeholder: '请选择用户权限'
          })
          .options(
            this.userRoleList.map(item => {
              return {
                value: item.id,
                label: item.name
              }
            })
          )
          .validate([
            {
              required: true,
              message: '请选择用户权限',
              trigger: 'blur'
            }
          ]),
        maker
          .input('密码', 'password', '')
          .props({
            placeholder: '请输入密码',
            maxlength: 16,
            minlength: 6,
            type: 'password',
            showPassword: true
          })
          .validate([
            { required: !id, message: '请输入密码', trigger: 'blur' },
            { type: 'string', min: 6, message: '最少6位数', trigger: 'blur' },
            { type: 'string', max: 16, message: '最多16位数', trigger: 'blur' }
          ])
      ]
      if (id) {
        fromRule.push(
          maker
            .input('新密码', 'newPasswod', '')
            .props({
              placeholder: '请输入新密码',
              maxlength: 16,
              minlength: 6,
              type: 'password',
              showPassword: true
            })
            .validate([
              { type: 'string', min: 6, message: '最少6位数', trigger: 'blur' },
              {
                type: 'string',
                max: 16,
                message: '最多16位数',
                trigger: 'blur'
              }
            ])
        )
      }
      return fromRule
    }
  },
  methods: {
    onSearchValueChange(value) {
      clearTimeout(this.timeer)
      this.timeer = setTimeout(() => {
        this.fetchUserList('', value)
      }, 300)
    },

    onAddUserClick() {
      this.currentUser = {}
      this.dialogVisible = true
    },

    async onRefeshClick() {
      await this.fetchUserList()
      this.$message.success('刷新成功')
    },

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
      this.currentUser = user
      this.dialogVisible = true
    },

    async onSaveEditClick(user) {
      try {
        const newinfo = await reUpdateUserById(user)
        if (newinfo.message) {
          this.fetchUserList()
        } else {
          newinfo.role = this.userRoleList.find(
            item => item.id === newinfo.role
          )
          const userIndex = this.userList.findIndex(
            item => item.id === newinfo.id
          )
          this.$set(this.userList, userIndex, newinfo)
          this.$message.success('更新用户信息成功')
        }
      } catch (error) {}

      this.fApi.btn.loading(false)
      this.dialogVisible = false
      this.isUpdate = false
    },

    async fetchUserList(id, namelike) {
      let data = await reFetchUserList({ id, namelike })
      if (typeOf(data) === 'array') {
        this.userList = data
      }
    },

    onSubmit(formData) {
      this.isUpdate = true
      this.fApi.btn.loading()
      this.onSaveEditClick(formData)
    },

    beforeDialogClose(done) {
      this.isUpdate ? '' : done()
    }
  },
  async mounted() {
    this.fetchUserList()
    this.userRoleList = await reFetchUserRoleList()
  }
}
</script>

<style lang="scss" scoped></style>
