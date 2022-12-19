<!--
 * @Author: bzirs
 * @Date: 2022-12-15 20:37:13
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-19 17:28:14
 * @FilePath: /big-event/src/views/article/ArtCate.vue
 * @Description: 文章分类
 *
 * Copyright (c) 2022 by bzirs, All Rights Reserved.
-->
<template>
  <div>
    <!-- 卡片 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix header-box">
        <span>文章分类</span>
        <el-button type="primary" size="mini" @click="toOpenModal">添加分类</el-button>
      </div>
      <!-- 文章分类列表表格 -->
      <el-table :data="articleSortList" border style="width: 100%">
        <el-table-column type="index" label="序号" width="100">
        </el-table-column>
        <el-table-column prop="cate_name" label="分类名称"></el-table-column>
        <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row: { id } }">
            <el-button size="mini" @click="handleEdit(id)" type="primary">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 模态框 -->
    <el-dialog :title="modalTitle" :visible.sync="dialogVisible" width="30%">
      <el-form label-position="right" label-width="70px" :model="modalForm" :rules="modalFormRules"
        ref="modalFormRules">
        <el-form-item label="分类名称" prop="cate_name">
          <el-input v-model="modalForm.cate_name"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
          <el-input v-model="modalForm.cate_alias"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="toChangeArticleSort">{{ modalBtn }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { addArticleSort, delArticleSort, editArticleSort, getArticleSort, getArticleSortDetail } from '@/api/article'

export default {
  name: 'ArticleCate',
  components: {},
  props: {},
  data () {
    return {
      // 文章分类列表
      articleSortList: [],
      // 模态框显示隐藏
      dialogVisible: false,
      // 分类标题
      // 判断是添加还是修改
      modalFlag: 'add',
      // 模态框表单
      modalForm: {
        // 名字
        cate_name: '',
        // 别名
        cate_alias: ''
      },
      modalFormRules: {
        cate_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          {
            pattern: /^\S{1,10}$/,
            message: '分类名必须是1-10位的非空字符',
            trigger: 'blur'
          }
        ],
        cate_alias: [
          { required: true, message: '请输入分类别名', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9]{1,15}$/,
            message: '分类别名必须是1-15位的字母数字',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  async created () {
    // 获取文章分类
    this.getArticleList()
  },
  mounted () {},
  activated () {},
  updated () {},
  methods: {
    // 获取文章列表
    async getArticleList () {
      const { data, code, message } = await getArticleSort()
      this.articleSortList = data
      this.promptDialog(code, message)
    },
    // 弹出提示框
    promptDialog (code, message) {
      this.$message({
        showClose: true,
        message,
        type: code ? 'error' : 'success'
      })
    },
    // 打开模态框
    toOpenModal () {
      this.dialogVisible = true
      this.modalFlag = 'add'
      this.modalForm = { cate_name: '', cate_alias: '' }
      // 等待form表单出现后重置校验状态
      this.$nextTick(() => {
        this.$refs.modalFormRules.clearValidate()
      })
    },
    // 添加和编辑文章分类
    toChangeArticleSort () {
      this.$refs.modalFormRules.validate(async (valid) => {
        if (valid) {
          const { code, message } = await (this.modalFlag === 'add'
            ? addArticleSort(this.modalForm)
            : editArticleSort(this.modalForm))

          this.promptDialog(code, message)

          this.dialogVisible = false

          // 获取文章分类
          this.getArticleList()
        }
      })
    },
    // 分类编辑
    async handleEdit (id) {
      // 数据回显
      const { data, code, message } = await getArticleSortDetail(id)
      this.modalForm = data
      this.promptDialog(code, message)
      this.dialogVisible = true

      this.modalFlag = 'edit'
    },
    // 分类删除
    async handleDelete (id) {
      try {
        await this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const { code, message } = await delArticleSort(id)
        this.promptDialog(code, message)

        // 获取文章分类
        this.getArticleList()
      } catch (error) {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      }
    }
  },
  computed: {
    modalBtn () {
      return this.modalFlag === 'add' ? '添加' : '修改'
    },
    modalTitle () {
      return this.modalFlag === 'add' ? '添加文章分类' : '编辑文章分类'
    }
  },
  watch: {},
  directives: {}
}
</script>

<style scoped lang='less'>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
