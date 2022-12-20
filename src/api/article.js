/**
 * @Author: bzirs
 * @Date: 2022-12-19 15:04:04
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-20 11:58:41
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

// 获取文章列表
export const getArticleList = obj => request.get('/my/article/list', { params: obj })

// 删除文章
export const delArticle = id => request.delete('/my/article/info', { params: { id } })

// 发布文章
export const publishedArticle = fdObj => request.post('/my/article/add', fdObj)

// 获取文章详情
export const getArticleDetail = id => request.get('/my/article/info', { params: { id } })
