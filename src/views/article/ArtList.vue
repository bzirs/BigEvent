<!--
 * @Author: bzirs
 * @Date: 2022-12-15 20:37:22
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-19 21:59:41
 * @FilePath: /big-event/src/views/article/ArtList.vue
 * @Description: 文章列表
 *
 * Copyright (c) 2022 by bzirs, All Rights Reserved.
-->
<template>
  <div>
    <!-- 1.页面展示区域 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>文章列表</span>
      </div>
      <!-- 1.1 搜索区域 -->
      <div class="search-box">
        <el-form :inline="true">
          <el-form-item label="文章分类">
            <el-select placeholder="请选择分类" size="small" v-model="requestObj.cate_id">
              <el-option v-for="it in articleSortList" :key="it.id" :label="it.cate_name" :value="it.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布状态" style="margin-left: 15px;">
            <el-select v-model="requestObj.state" placeholder="请选择状态" size="small">
              <el-option label="已发布" value="已发布"></el-option>
              <el-option label="草稿" value="草稿"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="toFilter">筛选</el-button>
            <el-button type="info" size="small" @click="resetFilter">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 发表文章的按钮 -->
        <el-button type="primary" size="small" class="btn-pub">发表文章</el-button>
      </div>

      <!-- 1.2 文章表格区域 -->
      <el-table :data="articleList" border style="width: 100%">
        <el-table-column prop="title" label="文章标题">
        </el-table-column>
        <el-table-column prop="cate_name" label="分类">
        </el-table-column>
        <el-table-column label="发表时间">
          <template v-slot="{ row: { pub_date } }">
            {{ getReleaseDate(pub_date) }}
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态">
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row: { id } }">
            <el-button size="mini" type="danger" @click="handleDelete(id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 1.3 分页区域 -->
      <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="total"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="requestObj.pagenum"
        :page-sizes="[2, 5, 10]" :page-size="requestObj.pagesize">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import moment from 'moment'
import { delArticle, getArticleList, getArticleSort } from '@/api/article'
export default {
  name: 'ArticleList',
  components: {},
  props: {},
  data () {
    return {
      // 列表请求
      requestObj: {
        // 页码数
        pagenum: 1,
        // 条数
        pagesize: 2,
        // 文章分类id
        cate_id: '',
        // 状态
        state: ''
      },
      // 文章列表
      articleList: [],
      // 文章分类列表
      articleSortList: [],
      // 总数量
      total: 0,
      // 当前页
      current: 1,
      // 每页个数
      pageSize: 2

    }
  },
  async created () {
    // 获取文章分类
    const { data } = await getArticleSort()
    this.articleSortList = data

    // 获取文章列表
    this.toGetArticleList()
  },
  computed: {

  },
  methods: {
    // 获取格式化时间
    getReleaseDate (date) {
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },

    // 获取文章列表
    async toGetArticleList () {
      const { data, total } = await getArticleList(this.requestObj)
      this.articleList = data
      this.total = total
    },
    // 删除按钮
    async handleDelete (id) {
      const { message, code } = await delArticle(id)

      this.$message({
        showClose: true,
        message,
        type: code ? 'error' : 'success'
      })

      // 获取文章列表
      this.toGetArticleList()
    },
    handleSizeChange (val) {
      this.requestObj.pagesize = val

      // 获取文章列表
      this.toGetArticleList()
    },
    handleCurrentChange (val) {
      this.requestObj.pagenum = val

      // 获取文章列表
      this.toGetArticleList()
    },
    // 筛选
    toFilter () {
      // 获取文章列表
      this.toGetArticleList()
    },
    // 重置筛选
    resetFilter () {
      this.requestObj = {
        // 页码数
        pagenum: 1,
        // 条数
        pagesize: 2,
        // 文章分类id
        cate_id: '',
        // 状态
        state: ''
      }

      // 获取文章列表
      this.toGetArticleList()
    }
  }
}
</script>

<style scoped lang='less'>
.search-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .btn-pub {
    margin-top: 5px;
  }
}

/deep/ .ql-editor {
  min-height: 300px;
}

// 设置图片封面的宽高
.cover-img {
  width: 400px;
  height: 280px;
  object-fit: cover;
}

.el-pagination {
  margin-top: 15px;
}

.title {
  font-size: 24px;
  text-align: center;
  font-weight: normal;
  color: #000;
  margin: 0 0 10px 0;
}

.info {
  font-size: 12px;

  span {
    margin-right: 20px;
  }
}

// 修改 dialog 内部元素的样式，需要添加样式穿透
/deep/ .detail-box {
  img {
    width: 500px;
  }
}
</style>
