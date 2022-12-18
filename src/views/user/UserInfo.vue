<!--
 * @Author: bzirs
 * @Date: 2022-12-15 20:38:14
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-18 22:19:56
 * @FilePath: /big-event/src/views/user/UserInfo.vue
 * @Description:
 *
 * Copyright (c) 2022 by bzirs, All Rights Reserved.
-->
<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>基本资料</span>
    </div>
    <!-- 表单 -->
    <el-form label-position="left" label-width="80px" :model="user" ref="userFormRules" :rules="userRules">
      <el-form-item label="用户名">
        <el-input disabled v-model="user.username"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="user.nickname"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="user.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="toSetUserInfo">保存修改</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { setUserInfo } from '@/api/user'
export default {
  name: 'UserInfo',
  components: {},
  props: {},
  data () {
    return {
      user: { ...this.$store.state.user.userInfo },
      // 表单验证规则
      userRules: {
        nickname: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' },
          {
            pattern: /^\S{1,10}$/,
            message: '昵称必须是1-10位的非空字符串',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入用户邮箱', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ]
      }
    }
  },
  beforeCreate () {
    // this.user = { ...this.$store.state.user.userInfo }
    // console.log(this)
  },
  async created () {
    // this.user = { ...this.$store.state.user.userInfo }
  },
  mounted () {},
  activated () {},
  updated () {},
  methods: {
    toSetUserInfo () {
      this.$refs.userFormRules.validate(async (valid) => {
        if (valid) {
          const { code, message } = await setUserInfo(this.user)

          this.$message({
            showClose: true,
            message,
            type: code ? 'error' : 'success'
          })

          this.$store.dispatch('user/setUserInfo')
        }
      })
    },
    resetForm () {
      this.$refs.userFormRules.resetFields()
    }
  },
  computed: {

  },
  watch: {},
  directives: {}
}
</script>

<style scoped lang='less'>
.el-form {
  width: 500px;
}
</style>
