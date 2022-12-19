<!--
 * @Author: bzirs
 * @Date: 2022-12-15 20:38:05
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-19 14:53:29
 * @FilePath: /big-event/src/views/user/UserAvatar.vue
 * @Description:
 *
 * Copyright (c) 2022 by bzirs, All Rights Reserved.
-->
<template>
  <!-- 卡片盒子 -->
  <el-card class="box-card">
    <!-- 1.头部插槽 -->
    <div slot="header" class="clearfix">
      <span>更换头像</span>
    </div>
    <!-- 2.内容盒子 -->
    <div>
      <!-- 图片，用来展示用户选择的头像 -->
      <img v-if="avatar" :src="avatar" alt="" class="preview" />
      <img v-else src="@/assets/images/avatar.jpg" alt="" class="preview" />

      <!-- 按钮区域 -->
      <div class="btn-box">
        <!-- 渲染一个被隐藏的文件选择框，只允许选中图片文件 -->
        <input type="file" style="display: none" accept="image/*" ref="iptRef" @change="onFileChange" />
        <el-button type="primary" icon="el-icon-plus" @click="$refs.iptRef.click()">选择图片</el-button>
        <el-button :disabled="!avatar" type="success" icon="el-icon-upload" @click="uploadAvatar">上传头像
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import { updateUserAvatar } from '@/api/user'
export default {
  name: 'UserAvatar',
  components: {},
  props: {},
  data () {
    return {
      // 用户头像  base64字符串
      avatar: ''
    }
  },
  async created () {},
  mounted () {},
  activated () {},
  updated () {},
  methods: {
    // 1.头像预览
    onFileChange (e) {
      const fd = new FileReader()
      fd.readAsDataURL(e.target.files[0])
      fd.onloadend = ({ target: { result } }) => {
        this.avatar = result
      }
    },
    // 2.头像提交
    async uploadAvatar () {
      const { code, message } = await updateUserAvatar(this.avatar)

      this.$message({
        showClose: true,
        message,
        type: code ? 'error' : 'success'
      })

      if (!code) {
        this.$store.dispatch('user/setUserInfo')
        this.avatar = ''
      }
    }
  },
  computed: {},
  watch: {},
  directives: {}
}
</script>

<style scoped lang='less'>
.btn-box {
  margin-top: 10px;
}

.preview {
  object-fit: cover;
  width: 350px;
  height: 350px;
}
</style>
