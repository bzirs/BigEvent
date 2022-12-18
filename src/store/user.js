/**
 * @Author: bzirs
 * @Date: 2022-12-17 19:52:53
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-18 20:03:44
 * @FilePath: /big-event/src/store/user.js
 * @Description:   用户状态管理
 * @
 * @Copyright (c) 2022 by bzirs, All Rights Reserved.
 */

import { userLogin, getUserInfo } from '@/api/user'
import router from '@/router'
import { getToken, setToken } from '@/utils/token'
import { Message } from 'element-ui'

export default {
  // 开启命名空间
  namespaced: true,
  state: {
    token: getToken(),
    // 用户信息
    userInfo: {}
  },
  mutations: {
    // 存储登录后的token
    updateToken (state, payload) {
      state.token = payload

      // 同时将token保存本地
      setToken(payload)
    },
    // 更新用户信息
    updateUserInfo (state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
    // 用户登录
    async toUserLogin (context, payload) {
      const { code, message, token } = await userLogin(payload)
      Message({
        showClose: true,
        message,
        type: code ? 'error' : 'success'
      })

      if (!code) {
        context.commit('updateToken', token)
        router.push('/')
      }
    },
    // 获取用户信息
    async setUserInfo (context, payload) {
      const { data } = await getUserInfo()
      context.commit('updateUserInfo', data)
    }
  }
}
