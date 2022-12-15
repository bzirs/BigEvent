<!--
 * @Author: bzirs
 * @Date: 2022-12-15 20:41:20
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-15 21:59:12
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
      <el-form>
        <el-form-item>
          <el-input placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入密码" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请再次确认密码" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-reg">注册</el-button>
          <el-link type="primary" href="./login">有账号了捏?去登录嘛</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage'
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
