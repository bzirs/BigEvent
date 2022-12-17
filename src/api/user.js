/**
 * @Author: bzirs
 * @Date: 2022-12-17 17:46:33
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-17 22:22:19
 * @FilePath: /big-event/src/api/user.js
 * @Description:  用户 api
 * @
 * @Copyright (c) 2022 by bzirs, All Rights Reserved.
 */

import request from '@/utils/request'

// 注册
export const userRegister = obj => request.post('/api/reg', obj)

// 登录
export const userLogin = obj => request.post('/api/login', obj)

// 用户信息获取
export const getUserInfo = _ => request.get('/my/userinfo')
