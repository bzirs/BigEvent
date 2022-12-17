/**
 * @Author: bzirs
 * @Date: 2022-12-17 21:22:33
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-17 21:23:44
 * @FilePath: /big-event/src/api/home.js
 * @Description: 布局相关api
 * @
 * @Copyright (c) 2022 by bzirs, All Rights Reserved.
 */

import request from '@/utils/request'

// 获取左侧栏
export const getAside = _ => request.get('/my/menus')
