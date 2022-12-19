<!--
 * @Author: bzirs
 * @Date: 2022-12-15 20:38:22
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-19 11:20:29
 * @FilePath: /big-event/src/views/user/UserPwd.vue
 * @Description:
 *
 * Copyright (c) 2022 by bzirs, All Rights Reserved.
-->
<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>重置密码</span>
    </div>
    <!-- 表单 -->
    <el-form label-position="left" label-width="80px" :model="passWd" ref="passWdFormRules" :rules="passWdRules">
      <el-form-item label="原密码:" prop="old_pwd">
        <el-input v-model="passWd.old_pwd" show-password placeholder="输入原密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码:" prop="new_pwd">
        <el-input v-model="passWd.new_pwd" show-password placeholder="输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码:" prop="re_pwd">
        <el-input v-model="passWd.re_pwd" show-password placeholder="输入确认密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="toUpdatePassWd">确认提交</el-button>
        <el-button type="info" @click="$refs.passWdFormRules.resetFields()">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { updatePassword } from '@/api/user'
export default {
  name: 'UserPwd',
  components: {},
  props: {},
  data () {
    return {
      // 密码对象
      passWd: {
        old_pwd: '',
        new_pwd: '',
        re_pwd: ''
      },
      // 密码验证规则
      passWdRules: {
        old_pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: /^\S{6,15}$/,
            message: '密码长度必须是6-15位的非空字符串',
            trigger: 'blur'
          }
        ],
        new_pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: /^\S{6,15}$/,
            message: '密码长度必须是6-15位的非空字符串',
            trigger: 'blur'
          }
        ],
        re_pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: /^\S{6,15}$/,
            message: '密码长度必须是6-15位的非空字符串',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              if (value === this.passWd.new_pwd) {
                callback()
              } else {
                callback(new Error('两次密码不一致捏?就你这废物逼也配改密码?'))
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  async created () {},
  mounted () {},
  activated () {},
  updated () {},
  methods: {
    toUpdatePassWd () {
      this.$refs.passWdFormRules.validate(async (valid) => {
        if (valid) {
          const { code, message } = await updatePassword(this.passWd)

          this.$message({
            showClose: true,
            message,
            type: code ? 'error' : 'success'
          })

          if (!code) {
            this.passWd = {
              old_pwd: '',
              new_pwd: '',
              re_pwd: ''
            }
          }
        }
      })
    }
  },
  computed: {},
  watch: {},
  directives: {}
}
</script>

<style scoped lang='less'>
.el-form {
  width: 500px;
}
</style>
