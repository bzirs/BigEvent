<!--
 * @Author: bzirs
 * @Date: 2022-12-15 20:43:54
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-19 10:59:49
 * @FilePath: /big-event/src/views/Main.vue
 * @Description: 主页
 *
 * Copyright (c) 2022 by bzirs, All Rights Reserved.
-->
<template>
  <el-container class="main-container">
    <!-- 左侧 -->
    <el-aside width="200px">
      <!-- 头像 -->
      <div class="user-box">
        <el-avatar v-if="userInfo.user_pic" :size="50" :src="userInfo.user_pic" class="avatar"></el-avatar>
        <el-avatar v-else :size="50" src="https://cdn.jsdelivr.net/gh/xbzirs/handsome/images/blogavatar.jpg"
          class="avatar"></el-avatar>
        <span>欢迎回家~{{ userInfo.nickname || userInfo.username }}</span>
      </div>
      <!-- 导航菜单 -->
      <el-menu background-color="#23262E" :default-active="$route.path" router unique-opened text-color="#fff">

        <template v-for="it in asideList">
          <!-- 首页 -->
          <el-menu-item :index="it.indexPath" :key="it.title" v-if="!it.children">
            <i :class="it.icon"></i>
            <span slot="title">{{ it.title }}</span>
          </el-menu-item>
          <!-- 文章和用户中心管理 -->
          <el-submenu :key="it.title" :index="it.indexPath" v-else>
            <template slot="title">
              <i :class="it.icon"></i>
              <span>{{ it.title }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index="item.indexPath" v-for="item in it.children" :key="item.indexPath">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </template>
      </el-menu>
    </el-aside>
    <!-- 右侧 -->
    <el-container>
      <!-- 右侧顶部 -->
      <el-header>
        <!-- logo -->
        <div class="logo"></div>
        <!-- 右侧menu菜单 -->
        <el-menu mode="horizontal" router :default-active="$route.path">
          <el-submenu index="">
            <template slot="title">
              <el-avatar v-if="userInfo.user_pic" :size="50" :src="userInfo.user_pic" class="avatar"></el-avatar>
              <el-avatar v-else :size="50" src="https://cdn.jsdelivr.net/gh/xbzirs/handsome/images/blogavatar.jpg"
                class="avatar"></el-avatar>
              个人中心</template>
            <template v-if="asideList[2]">
              <el-menu-item :index="item.indexPath" v-for="item in asideList[2].children" :key="item.indexPath">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
          <el-menu-item index="" @click="logout">
            <i class="el-icon-switch-button"></i>
            <span slot="title">退出</span>
          </el-menu-item>
        </el-menu>
      </el-header>
      <!-- 右侧主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
      <!-- 右侧页脚 -->
      <el-footer>© www.itheima.com - 黑马程序员 . author by&nbsp;<el-link href="https://github.com/bzirs"
          type=" primary">bzirs</el-link>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import { getAside } from '@/api/home'
import { mapState } from 'vuex'
export default {
  name: 'MainPage',
  components: {},
  props: {},
  data () {
    return {
      // 左侧菜单栏列表
      asideList: []
    }
  },
  async created () {
    // 获取左侧列表
    const { data } = await getAside()
    this.asideList = data

    // 获取用户信息
    this.$store.dispatch('user/setUserInfo')
  },
  mounted () {},
  activated () {},
  updated () {},
  methods: {
    // 退出登录
    async logout () {
      try {
        await this.$confirm('真滴要离开偶嘛?', '登出提醒', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })

        this.$router.push('/login')
        this.$store.commit('user/updateToken', null)
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    ...mapState('user', ['userInfo'])
  },
  watch: {},
  directives: {}
}
</script>

<style scoped lang='less'>
.main-container {
  height: 100%;

  .el-aside {
    background-color: #23262e;
  }

  .el-header {
    padding: 0;
    display: flex;
    justify-content: space-between;
  }

  .el-main {
    overflow-y: scroll;
    height: 0;
    background-color: #f2f2f2;
  }

  .el-footer {
    background-color: #eee;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.avatar {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background-color: #fff;
  margin-right: 10px;
  object-fit: cover;
}

//右侧样式
.el-header {
  .logo {
    height: 45px;
    width: 150px;
    padding: 8px 0px;
    user-select: none;
    text-align: center;
    background: url('@/assets/images/logo.png') center center / 100px no-repeat rgb(85, 85, 85);
    border-radius: 3px;
    margin-left: 15px;
  }
}

// 左侧边栏用户信息区域
.user-box {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  user-select: none;

  img,
  .avatar {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 15px;
    object-fit: cover;
  }

  span {
    color: white;
    font-size: 12px;
  }
}

// 侧边栏菜单的样式
.el-aside {

  .el-submenu,
  .el-menu-item {
    width: 200px;
    user-select: none;
  }
}
</style>
