/**
 * @Author: bzirs
 * @Date: 2022-12-15 20:15:19
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-15 21:29:06
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

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
