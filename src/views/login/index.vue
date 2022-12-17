<!--
 * @Author: bzirs
 * @Date: 2022-12-15 20:41:20
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-17 20:05:38
 * @FilePath: /big-event/src/views/login/index.vue
 * @Description: 登录页
 *
 * Copyright (c) 2022 by bzirs, All Rights Reserved.
-->
<template>
  <!-- 登录页面的整体盒子 -->
  <div class="login-container">
    <!-- 登录的盒子 -->
    <div class="login-box">
      <!-- 标题的盒子 -->
      <div class="title-box"></div>
      <!-- 登录的表单区域 -->
      <el-form :model="loginObj" ref="loginFormRules" :rules="loginObjRules">
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名" prefix-icon="el-icon-user" v-model="loginObj.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input show-password placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="loginObj.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-login" @click="toLogin">登录</el-button>
          <el-link type="primary" href="#/register">没有账号捏?快来注册嘛~</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'LoginPage',
  data () {
    return {
      // 登录
      loginObj: {
        username: 'wh87zhj',
        password: '111111'
      },
      // 登录正则
      loginObjRules: {
        username: [
          { required: true, message: '请输入用户名捏', trigger: 'blur' },
          { pattern: /^\w{1,10}$/, message: '用户名必须1到10个字符捏~giegie', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码捏', trigger: 'blur' },
          { pattern: /^\w{6,15}$/, message: '密码必须6到15个字符捏~giegie', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions('user', ['toUserLogin']),
    toLogin () {
      this.$refs.loginFormRules.validate((valid) => {
        // 登录
        if (valid) {
          console.log(valid)
          console.log(this.loginObj)
          this.toUserLogin(this.loginObj)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  background: url("@/assets/images/login_bg.jpg") center;
  background-size: cover;
  height: 100%;

  .login-box {
    width: 400px;
    height: 270px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0 30px;
    box-sizing: border-box;

    .title-box {
      height: 60px;
      background: url("@/assets/images/login_title.png") center no-repeat;
    }

    .btn-login {
      width: 100%;
    }
  }
}
</style>
