/**
 * @Author: bzirs
 * @Date: 2022-12-15 20:15:19
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-20 10:33:03
 * @FilePath: /big-event/src/main.js
 * @Description:
 * @
 * @Copyright (c) 2022 by bzirs, All Rights Reserved.
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入elementui
import '@/utils/element'

import '@/assets/global.less'

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
