/**
 * @Author: bzirs
 * @Date: 2022-12-15 20:15:19
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-17 19:56:45
 * @FilePath: /big-event/src/store/index.js
 * @Description: 全局状态管理
 * @
 * @Copyright (c) 2022 by bzirs, All Rights Reserved.
 */
import Vue from 'vue'
import Vuex from 'vuex'

import user from '@/store/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user
  }
})
