<!--
 * @Author: bzirs
 * @Date: 2022-12-15 20:41:20
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-17 19:37:36
 * @FilePath: /big-event/src/views/register/index.vue
 * @Description:
 *
 * Copyright (c) 2022 by bzirs, All Rights Reserved.
-->
<template>
  <!-- 注册页面的整体盒子 -->
  <div class="reg-container">
    <!-- 注册的盒子 -->
    <div class="reg-box">
      <!-- 标题的盒子 -->
      <div class="title-box"></div>
      <!-- 注册的表单区域 -->
      <el-form :model="registerObj" ref="registerFormRules" :rules="registerObjRules">
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名" prefix-icon="el-icon-user" v-model="registerObj.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input show-password placeholder="请输入密码" prefix-icon="el-icon-lock"
            v-model="registerObj.password"></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input show-password placeholder="请再次确认密码" prefix-icon="el-icon-lock"
            v-model="registerObj.repassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-reg" @click="toRegister">注册</el-button>
          <el-link type="primary" href="#/login">有账号了捏?去登录嘛</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { userRegister } from '@/api/user'
export default {
  name: 'RegisterPage',
  data () {
    return {
      // 注册
      registerObj: {
        username: '',
        password: '',
        repassword: ''
      },
      // 注册正则
      registerObjRules: {
        username: [
          { required: true, message: '请输入用户名捏', trigger: 'blur' },
          { pattern: /^\w{1,10}$/, message: '用户名必须1到10个字符捏~giegie', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码捏', trigger: 'blur' },
          { pattern: /^\w{6,15}$/, message: '密码必须6到15个字符捏~giegie', trigger: 'blur' }
        ],
        repassword: [
          { required: true, message: '请再次输入密码捏', trigger: 'blur' },
          { pattern: /^\w{6,15}$/, message: '确认密码必须6到15个字符捏~giegie', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (this.registerObj.password === value) {
                callback()
              } else {
                callback(new Error('两次密码都不一样宁也敢注册账号?'))
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    toRegister () {
      this.$refs.registerFormRules.validate(async (valid) => {
        // 注册
        if (valid) {
          const { message, code } = await userRegister(this.registerObj)

          this.$message({
            showClose: true,
            message,
            type: code ? 'error' : 'success'
          })

          // 根据code判断是否注册成功 跳转
          !code && this.$router.push('/login')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.reg-container {
  background: url("@/assets/images/login_bg.jpg") center;
  background-size: cover;
  height: 100%;

  .reg-box {
    width: 400px;
    height: 335px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .title-box {
      height: 60px;
      background: url("@/assets/images/login_title.png") center no-repeat;
    }
  }

  .el-form {
    padding: 0 25px;
  }

  .btn-reg {
    width: 100%;
  }
}
</style>
