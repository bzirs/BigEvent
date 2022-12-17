/**
 * @Author: bzirs
 * @Date: 2022-12-17 17:46:33
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-17 17:57:57
 * @FilePath: /big-event/src/api/user.js
 * @Description:  用户 api
 * @
 * @Copyright (c) 2022 by bzirs, All Rights Reserved.
 */

import request from '@/utils/request'

// 注册
export const userRegister = obj => request.post('/api/reg', obj)