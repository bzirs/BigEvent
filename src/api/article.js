/**
 * @Author: bzirs
 * @Date: 2022-12-19 15:04:04
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-19 17:00:09
 * @FilePath: /big-event/src/api/article.js
 * @Description: 文章相关api
 * @
 * @Copyright (c) 2022 by bzirs, All Rights Reserved.
 */

import request from '@/utils/request'

// 获取文章分类
export const getArticleSort = _ => request.get('/my/cate/list')

// 添加文章分类
export const addArticleSort = obj => request.post('/my/cate/add', obj)

// 获取文章分类详情
export const getArticleSortDetail = id => request.get('/my/cate/info', { params: { id } })

// 修改文章分类
export const editArticleSort = obj => request.put('/my/cate/info', obj)

// 删除文章分类
export const delArticleSort = id => request.delete('/my/cate/del', { params: { id } })