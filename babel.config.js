/**
 * @Author: bzirs
 * @Date: 2022-12-15 20:15:19
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-15 20:19:13
 * @FilePath: /big-event/babel.config.js
 * @Description:
 * @
 * @Copyright (c) 2022 by bzirs, All Rights Reserved.
 */
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ]
}
