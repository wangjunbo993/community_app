<script setup>
  import cardTip from '@/components/cardTip/index.vue'
  import { useAppStore } from '@/store/app'
import { setBackgroundColor } from '@uni-helper/uni-promises';
const appStore = useAppStore()
// 物业服务项
const services = [
  { id: 1, name: '物业活动', icon: '\ue600', color: 'bg-blue-500', description: '社区活动、节日庆典' },
  { id: 2, name: '事项办理', icon: '\uee7c', color: 'bg-green-500', description: '户口迁移、证明开具' },
  {
    id: 3,
    name: '投诉建议',
    icon: '\ue8a7',
    color: 'bg-gradient-to-br from-red-400 to-pink-500',
    description: '投诉反馈、人员评分',
    path: '/complaint'
  },
  { id: 4, name: '水电查询', icon: '\ue98c', color: 'bg-purple-500', description: '水电费用、使用查询' },
  { id: 5, name: '报修服务', icon: '\ue960', color: 'bg-indigo-500', description: '设施维修、故障报修' },
  { id: 6, name: '社区公告', icon: '\uee07', color: 'bg-red-500', description: '重要通知、公告信息' },
];

// 公告列表
const notices = [
  {
    id: 1,
    isTop: true,
    type: '重要通知',
    typeColor: '#ff4d4f',
    typeBg: '#fff1f0',
    title: '关于小区停水通知',
    content: '因市政管网维修需要，本小区将于明日上午8:00-18:00进行停水作业...',
    date: '01-15',
  },
  {
    id: 2,
    isTop: false,
    type: '服务公告',
    typeColor: '#1890ff',
    typeBg: '#e6f7ff',
    title: '春节期间物业服务安排',
    content: '春节将至，为确保节日期间小区的正常运行和业主的正常使用...',
    date: '01-14',
  },
  {
    id: 3,
    isTop: false,
    type: '环境改善',
    typeColor: '#52c41a',
    typeBg: '#f6ffed',
    title: '小区绿化改造公告',
    content: '为进一步提升小区环境品质，将对小区中心花园进行绿化改造升级...',
    date: '01-12',
  },
]

// 点击服务项
function handleServiceClick(item) {
  uni.showToast({
    title: `即将进入${item.name}`,
    icon: 'none',
  })
}

// 查看全部公告
function handleViewAll() {
  uni.navigateTo({
    url: '/pages/property/notice-list',
  })
}

// 点击公告
function handleNoticeClick(item) {
  uni.navigateTo({
    url: `/pages/property/notice-detail?id=${item.id}`,
  })
}
</script>

<template>
  <view class="h-full bg-#f5f5f5 overflow-y-auto overflow-hidden flex flex-col">
    <!-- 顶部安全区 -->
    <!-- <view class="h-[--safe-top] bg-white"></view> -->
    <wd-sticky :offset-top="0">
      <view class="rounded-12px px-14px pb-5px bg-white" :style="{ paddingTop: appStore.isNotch ? '65px' : '0' }">
        <view style="width: 100vw" class="flex-between">
          <view class="max-w-180px flex shrink-0 items-center">
            <text class="text-36rpx text-#333 font-bold">物业</text>
          </view>
        </view>
      </view>
    </wd-sticky>
    <!-- 可滚动内容 -->
    <scroll-view class="flex-1" scroll-y>
      <!-- 智慧物业卡片 -->
      <cardTip title="智慧物业" dec="便民服务，让生活更美好." :icon="'\uee49'" bg="linear-gradient(135deg, rgb(59, 130, 246) 0%, rgb(29, 78, 216) 50%, rgb(30, 64, 175) 100%)"/>
      <view class="px-32rpx pt-48rpx text-lg">物业服务</view>
      <!-- 物业服务 -->
      <view class="px-32rpx pt-30rpx">
        <!-- <text class="ttext-26px text-#333 font-bold mb-32rpx">物业服务</text> -->
        <view class="grid grid-cols-3 gap-4">
          <view
            v-for="(service, index) in services"
            :key="service.id"
            class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
            @click="handleServiceClick(service)"
          >
            <!-- icon 背景 -->
            <view
              :class="[
                'w-12 h-12 rounded-xl flex items-center justify-center mb-3',
                service.color
              ]"
            >
              <view class="w-6 h-6 flex items-center justify-center">
                <!-- <i :class="[service.icon, 'text-white text-lg']"></i> -->
                 <text class="iconfont text-white text-lg">
                  {{ service.icon }}
                </text>
              </view>
            </view>

            <h4 class="text-sm font-medium text-gray-900 mb-1">
              {{ service.name }}
            </h4>
            <p class="text-xs text-gray-600">
              {{ service.description }}
            </p>
          </view>
        </view>
      </view>

      <!-- 最新公告 -->
        <view class="mt-6 px-32rpx">
          <view class="flex items-center justify-between mb-4">
            <h3 class="text-lg text-gray-900">最新公告</h3>
            <button 
              class="flex items-center space-x-1 cursor-pointer hover:text-blue-600 transition-colors"
            >
              <text class="text-sm text-gray-600">查看全部</text>
              <view class="w-4 h-4 flex items-center justify-center">
                <text class="iconfont ri-arrow-right-s-line text-gray-400 text-lg">&#xe78f;</text>
              </view>
            </button>
          </view>
          <view class="space-y-3">
            <view v-for="(item,index) in notices" :key="item.id"
              class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
            >
              <view class="flex items-start justify-between">
                <view class="flex-1">
                  <view class="flex items-center space-x-2 mb-2">
                    <view v-if="item.isTop" class="w-4 h-4 flex items-center justify-center">
                      <text class="iconfont ri-pushpin-fill text-red-500 text-sm">&#xea70;</text>
                    </view>
                    <text class="text-xs px-2 py-1 rounded-full" :style="{color:item.typeColor, backgroundColor:item.typeBg}">{{ item.type }}</text>
                  </view>
                  <h4 class="text-sm font-medium text-gray-900 mb-1">{{ item.title }}</h4>
                  <p class="text-xs text-gray-600 line-clamp-2">{{ item.content }}</p>
                </view>
                <text class="text-xs text-gray-400 ml-3">{{ item.date }}</text>
              </view>
            </view>
          </view>
        </view>
    </scroll-view>
  </view>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}

.leading-relaxed {
  line-height: 1.6;
}
</style>
