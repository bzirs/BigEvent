/**
 * @Author: bzirs
 * @Date: 2022-12-17 17:46:33
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-17 17:49:41
 * @FilePath: /big-event/src/api/register.js
 * @Description:  注册api
 * @
 * @Copyright (c) 2022 by bzirs, All Rights Reserved.
 */

import request from '@/utils/request'

// 注册
export const userRegister = obj => request.post('/api/reg', obj)
