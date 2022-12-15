/**
 * @Author: bzirs
 * @Date: 2022-12-15 20:15:19
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-15 20:31:38
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

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
