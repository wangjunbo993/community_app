import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'
import { appName } from './src/settings/index.js'

export default defineUniPages({
  easycom: {
    autoscan: true,
    custom: {
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)': 'z-paging/components/z-paging$1/z-paging$1.vue',
    },
  },
  pages: [
    {
      path: 'pages/index/index',
      aliasPath: '/index',
      name: 'index',
      style: {
        navigationStyle: 'custom',
        navigationBarTitleText: '主页',
      },
    },
    {
      path: 'pages/index/server/index',
      aliasPath: '/server',
      name: 'server',
      style: {
        navigationStyle: 'custom',
        navigationBarTitleText: '物业服务',
      },
    },
    {
      path: 'pages/index/user/index',
      aliasPath: '/user',
      name: 'user',
      style: {
        navigationStyle: 'custom',
        navigationBarTitleText: '我的',
      },
    },
    {
      path: 'pages/login/index',
      aliasPath: '/login',
      name: 'login',
      style: {
        navigationStyle: 'custom',
        navigationBarTitleText: '登录',
      },
    },
  ],
  subPackages: [
    {
      root: 'pages/categorylist',
      pages: [
        {
          path: 'index',
          aliasPath: '/categorylist',
          name: 'categorylist',
          style: {
            navigationBarTitleText: '',
          },
        },
        {
          path: 'detail',
          aliasPath: '/rent-detail',
          name: 'rent-detail',
          style: {
            // navigationStyle: 'custom',
            navigationBarTitleText: '详情',
          },
        },
      ],
    },
    {
      root: 'pages/common',
      pages: [
        {
          path: 'web-view/index',
          aliasPath: '/web-view',
          name: 'web-view',
          style: {
            navigationBarTitleText: 'web-view',
            transparentTitle: 'auto',
          },
        },
        {
          path: 'rich-view/index',
          aliasPath: '/rich-view',
          name: 'rich-view',
          style: {
            navigationBarTitleText: 'rich-view',
          },
        },
        {
          path: 'address-select/index',
          aliasPath: '/address-select',
          name: 'address-select',
          style: {
            navigationStyle: 'custom',
            navigationBarTitleText: '选择地址',
          },
        },
      ],
    },
    {
      root: 'pages/tips',
      pages: [
        {
          path: 'middleware/index',
          aliasPath: '/tips-middleware',
          name: 'tips-middleware',
          meta: {
            middleware: ['test'],
          },
          style: {
            navigationBarTitleText: '中间件',
          },
        },
      ],
    },
    {
      root: 'pages/template',
      pages: [
        {
          path: 'paging/index',
          aliasPath: '/template-paging',
          name: 'template-paging',
          style: {
            navigationBarTitleText: '通用列表',
          },
        },
      ],
    },
    {
      root: 'pages/personal',
      pages: [
        {
          path: 'index',
          aliasPath: '/personal',
          name: 'personal',
          style: {
            navigationBarTitleText: '个人资料',
            transparentTitle: 'auto',
          },
        },
      ],
    },
    {
      root: 'pages/contact',
      pages: [
        {
          path: 'index',
          aliasPath: '/contact',
          name: 'contact',
          style: {
            navigationBarTitleText: '联系我们',
            transparentTitle: 'auto',
          },
        },
      ],
    },
    {
      root: 'pages/preference',
      pages: [
        {
          path: 'index',
          aliasPath: '/preference',
          name: 'preference',
          style: {
            navigationBarTitleText: '偏好设置',
          },
        },
      ],
    },
  ],
  tabBar: {
    color: '#999999',
    selectedColor: '#000',
    backgroundColor: '#FFFFFF',
    list: [
      {
        iconPath: 'static/images/tabbar/home.png',
        selectedIconPath: 'static/images/tabbar/home-active.png',
        pagePath: 'pages/index/index',
        text: '主页',
      },
      {
        iconPath: 'static/images/tabbar/property.png',
        selectedIconPath: 'static/images/tabbar/property-active.png',
        pagePath: 'pages/index/server/index',
        text: '物业',
      },
      {
        iconPath: 'static/images/tabbar/user.png',
        selectedIconPath: 'static/images/tabbar/user-active.png',
        pagePath: 'pages/index/user/index',
        text: '我的',
      },
    ],
  },
  globalStyle: {
    navigationBarTitleText: appName,
    navigationBarBackgroundColor: '#FFFFFF',
    navigationBarTextStyle: 'black',
    backgroundColor: '#F8F8F8',
  },
})
