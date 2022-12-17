/**
 * @Author: bzirs
 * @Date: 2022-12-17 19:52:53
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-17 20:08:46
 * @FilePath: /big-event/src/store/user.js
 * @Description:   用户状态管理
 * @
 * @Copyright (c) 2022 by bzirs, All Rights Reserved.
 */

import { userLogin } from '@/api/user'
import router from '@/router'
import { getToken, setToken } from '@/utils/token'
import { Message } from 'element-ui'

export default {
  // 开启命名空间
  namespaced: true,
  state: {
    token: getToken()
  },
  mutations: {
    // 存储登录后的token
    updateToken (state, payload) {
      state.token = payload

      // 同时将token保存本地
      setToken(payload)
    }
  },
  actions: {
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
    }
  }
}
