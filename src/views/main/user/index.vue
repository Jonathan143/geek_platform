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
    </el-table-column>
    <el-table-column prop="email"
      label="邮箱">
    </el-table-column>
    <el-table-column prop="role"
      label="权限">
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
        <el-button type="text"
          size="small">编辑</el-button>
        <el-button type="text"
          style="color:#f57677"
          size="small"
          @click="onDeleteUserClick(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      userList: [],
      userId: ''
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
        .then(() => {
          this.reSaveDeleteUserById(user)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    reFindUserList() {
      this.$callApi({
        api: '/user/find_user_by_id',
        param: { id: this.userId }
      }).then(data => {
        data.forEach(item => {
          item.isEdit = false
        })
        this.userList = data
      })
    },

    reSaveDeleteUserById({ id, username }) {
      this.$callApi({
        api: 'user/delete_user_by_id',
        param: {
          id,
          username
        }
      }).then(data => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    }
  },
  mounted() {
    this.reFindUserList()
  }
}
</script>

<style lang="scss" scoped>
</style>
