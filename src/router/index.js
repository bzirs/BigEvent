/**
 * @Author: bzirs
 * @Date: 2022-12-15 20:15:19
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-17 21:17:40
 * @FilePath: /big-event/src/router/index.js
 * @Description:
 * @
 * @Copyright (c) 2022 by bzirs, All Rights Reserved.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import login from '@/views/login'
import register from '@/views/register'
import main from '@/views/Main.vue'
import home from '@/views/home'
import articlecate from '@/views/article/ArtCate.vue'
import articlelist from '@/views/article/ArtList.vue'
import avatar from '@/views/user/UserAvatar.vue'
import info from '@/views/user/UserInfo.vue'
import passwd from '@/views/user/UserPwd.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/main' },
  { path: '/login', component: login, name: 'login' },
  { path: '/register', component: register, name: 'register' },
  {
    path: '/main',
    component: main,
    name: 'main',
    children: [
      { path: '/', redirect: '/home' },
      { path: '/home', component: home, name: 'home' },
      { path: '/art-cate', component: articlecate, name: 'articlecate' },
      { path: '/art-list', component: articlelist, name: 'articlelist' },
      { path: '/user-avatar', component: avatar, name: 'avatar' },
      { path: '/user-info', component: info, name: 'info' },
      { path: '/user-pwd', component: passwd, name: 'passwd' }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
