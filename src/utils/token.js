/**
 * @Author: bzirs
 * @Date: 2022-12-17 19:53:41
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-17 19:55:00
 * @FilePath: /big-event/src/utils/token.js
 * @Description: localstorage token 管理
 * @
 * @Copyright (c) 2022 by bzirs, All Rights Reserved.
 */

const TOKEN = 'big-event-token'

// 存储token
export const setToken = token => localStorage.setItem(TOKEN, token)

// 读取token
export const getToken = _ => localStorage.getItem(TOKEN)

// 删除token
export const delToken = _ => localStorage.removeItem(TOKEN)
