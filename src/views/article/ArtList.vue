<!--
 * @Author: bzirs
 * @Date: 2022-12-15 20:37:22
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-20 14:09:44
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
        <el-button type="primary" size="small" class="btn-pub" @click="toOpenModal">发表文章</el-button>
      </div>

      <!-- 1.2 文章表格区域 -->
      <el-table :data="articleList" border style="width: 100%">
        <el-table-column label="文章标题">
          <template v-slot="{ row: { title, id } }">
            <el-link @click="toArticleDetail(id)">{{ title }}</el-link>
          </template>
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
    <!-- 2.发表文章对话框 -->
    <el-dialog title="发表文章" :visible.sync="dialogVisible" :before-close="handleClose" fullscreen>
      <!-- 对话框内容 -->
      <el-form label-width="100px" :model="formData" :rules="formDataRules" ref="formDataRules">
        <!-- 2.1文章标题 -->
        <el-form-item label="文章标题" prop="title">
          <el-input placeholder="请输入标题" v-model="formData.title"></el-input>
        </el-form-item>
        <!-- 2.2文章分类 -->
        <el-form-item label="文章分类" prop="cate_id">
          <el-select placeholder="请选择分类" style="width: 100%;" v-model="formData.cate_id">
            <el-option v-for="it in articleSortList" :key="it.id" :label="it.cate_name" :value="it.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- 2.3文章内容 -->
        <el-form-item label="文章内容" prop="content">
          <quill-editor v-model="formData.content"></quill-editor>
        </el-form-item>
        <!-- 2.4文章封面 -->
        <el-form-item label="文章封面">
          <!-- 用来显示封面的图片 -->
          <img src="@/assets/images/cover.jpg" alt="" class="cover-img" ref="imgRef" />
          <br />
          <!-- 文件选择框，默认被隐藏 -->
          <input type="file" style="display: none;" accept="image/*" ref="iptFile" @change="changeImg" />
          <!-- 选择封面的按钮 -->
          <el-button type="text" @click="$refs.iptFile.click()">+ 选择封面</el-button>
        </el-form-item>
        <!-- 2.5底部按钮 -->
        <el-form-item>
          <el-button @click="toPublished('已发布')" type="primary">发布</el-button>
          <el-button @click="toPublished('草稿')" type="info">存为草稿</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 3.文章详情对话框 -->
    <el-dialog title="文章预览" :visible.sync="detailVisible" width="80%">
      <h1 class="title">{{ artDetail.title }}</h1>
      <div class="info">
        <span>作者：{{ artDetail.nickname || artDetail.username }}</span>
        <span>发布时间：{{ getReleaseDate(artDetail.pub_date) }}</span>
        <span>所属分类：{{ artDetail.cate_name }}</span>
        <span>状态：{{ artDetail.state }}</span>
      </div>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <img :src="'http://big-event-vue-api-t.itheima.net' + artDetail.cover_img" alt="" />
      <div v-html="artDetail.content"></div>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import { delArticle, getArticleDetail, getArticleList, getArticleSort, publishedArticle } from '@/api/article'
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
      // 发表文章显示隐藏
      dialogVisible: false,
      // form表单内容
      formData: {
        // 标题
        title: '',
        // 文章分类id
        cate_id: '',
        // 内容
        content: '',
        // 封面
        cover_img: '',
        // 状态
        state: ''
      },
      // form表单验证
      formDataRules: {
        // 标题
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { pattern: /^\S{1,30}$/, message: '', trigger: 'blur' }
        ],
        // 文章分类id
        cate_id: [
          { required: true, message: '请选择文章分类', trigger: 'blur' }
        ],
        // 内容
        content: [
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ]
      },
      // 1.7 控制文章详情对话框的显示与隐藏
      detailVisible: false,
      // 1.8 文章的详情信息对象
      artDetail: {}

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
    },
    // 打开全屏模态框
    toOpenModal () {
      this.dialogVisible = true
      this.formData = {
        // 标题
        title: '',
        // 文章分类id
        cate_id: '',
        // 内容
        content: '',
        // 封面
        cover_img: '',
        // 状态
        state: ''
      }
      // 等待form表单出现后重置校验状态
      this.$nextTick(() => {
        this.$refs.formDataRules.clearValidate()
      })
    },
    // 图片改变
    changeImg (e) {
      this.formData.cover_img = e.target.files[0]
      const url = URL.createObjectURL(e.target.files[0])
      this.$refs.imgRef.setAttribute('src', url)
    },
    toPublished (state) {
      console.log(state)
      this.$refs.formDataRules.validate(async (valid) => {
        if (valid) {
          this.formData.state = state
          const fd = new FormData()
          for (const key in this.formData) {
            fd.append(key, this.formData[key])
          }
          const { code, message } = await publishedArticle(fd)
          this.$message({
            showClose: true,
            message,
            type: code ? 'error' : 'success'
          })
          if (!code) {
            this.dialogVisible = false
            // 获取文章列表
            this.toGetArticleList()
          }
        }
      })
    },
    // 获取文章详情
    async toArticleDetail (id) {
      const { data, code, message } = await getArticleDetail(id)
      this.$message({
        showClose: true,
        message,
        type: code ? 'error' : 'success'
      })
      this.detailVisible = true
      this.artDetail = data
    },
    async handleClose (done) {
      await this.$confirm('本次操作将会丢失所有内容,确认关闭？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      done()
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
