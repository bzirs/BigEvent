/**
 * @Author: bzirs
 * @Date: 2022-12-17 17:47:36
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-17 17:48:39
 * @FilePath: /big-event/src/utils/request.js
 * @Description: axios 第一次封装
 * @
 * @Copyright (c) 2022 by bzirs, All Rights Reserved.
 */

import axios from 'axios'
import { getToken } from './token'

const request = axios.create({
  baseURL: 'http://big-event-vue-api-t.itheima.net',
  timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = getToken()
  if (token) config.headers.Authorization = token
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default request
