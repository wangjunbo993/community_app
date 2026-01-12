<script setup>
import { computed } from 'vue'
import cardTip from '@/components/cardTip/index.vue'
import categoryGrid from '@/components/categoryGrid/index.vue'
import hotServices from '@/components/hotServices/index.vue'
import communityNews from '@/components/communityNews/index.vue'
// import content from '/README.md?raw'
import homeSearch from '@/components/homeSerach/index.vue'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

// 从 store 获取地址
const currentAddress = computed(() => userStore.address)

// 分类数据
const categories = [
  {
    icon: '&#xec90;',
    name: '出租租赁',
    kind: 'rent',
    bgColor: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    url: '/pages/categorylist/index',
  },
  {
    icon: '&#xe83f;',
    name: '求职兼职',
    bgColor: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
    kind: 'recycle',
    url: '/pages/categorylist/index',
  },
  {
    icon: '&#xed0a;',
    name: '桶水配送',
    bgColor: 'linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%)',
    kind: 'water',
    url: '/pages/categorylist/index',
  },
  //未
  { 
    icon: '&#xe960;',
    name: '上门维修',
    bgColor: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)',
    kind: 'repair',
    url: '/pages/categorylist/index',
  },
  //未
  {
    icon: '&#xeaff;',
    name: '家政服务',
    bgColor: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
    kind: 'housekeeping',
    url: '/pages/categorylist/index',
  },
  {
    icon: '&#xeb49;',
    name: '二手交易',
    bgColor: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    kind: 'reuse',
    url: '/pages/categorylist/index',
  },
  {
    icon: '&#xe80d;',
    name: '废品回收',
    bgColor: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',
    kind: 'job',
    url: '/pages/categorylist/index',
  },
  {
    icon: '&#xec5e;',
    name: '更多',
    bgColor: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
    kind: 'more',
    url: '/pages/categorylist/index',
  },
]

// 热门服务数据
const hotServicesList = [
  {
    image: 'https://readdy.ai/api/search-image?query=Modern%20furnished%20two-bedroom%20apartment%20interior%20with%20clean%20living%20room%2C%20comfortable%20furniture%2C%20bright%20natural%20lighting%2C%20contemporary%20home%20design%2C%20rental%20property%20photography%2C%20cozy%20living%20space&width=300&height=200&seq=apt1&orientation=landscape',
    name: '精装两室一厅出租',
    price: '3200/月',
    kind: 'rent',
    tags: [
      { text: '精装修', bgColor: '#fff7e6', color: '#fa8c16' },
      { text: '拎包入住', bgColor: '#fff7e6', color: '#fa8c16' },
    ],
    url: '/pages/categorylist/index',
  },
  {
    image: 'https://readdy.ai/api/search-image?query=iPhone%2013%20Pro%20in%20excellent%20condition%2C%20premium%20smartphone%2C%20sleek%20design%2C%20high-quality%20mobile%20device%2C%20technology%20product%20photography%2C%20clean%20background&width=300&height=200&seq=phone1&orientation=landscape',
    name: 'iPhone 13 Pro 九成新',
    price: '4800',
    kind: 'reuse',
    originalPrice: '7999',
    tags: [
      { text: '九成新', bgColor: '#fff7e6', color: '#fa8c16' },
      { text: '个人自用', bgColor: '#fff7e6', color: '#fa8c16' },
    ],
    url: '/pages/categorylist/index',
  },
  {
    image: 'https://readdy.ai/api/search-image?query=Professional%20office%20reception%20area%20with%20modern%20desk%2C%20clean%20corporate%20environment%2C%20business%20setting%2C%20professional%20workplace%2C%20office%20interior%20design&width=300&height=200&seq=office1&orientation=landscape',
    name: '前台接待员',
    price: '4500-6000',
    kind: 'recycle',
    tags: [
      { text: '全职', bgColor: '#fff7e6', color: '#fa8c16' },
      { text: '五险一金', bgColor: '#fff7e6', color: '#fa8c16' },
    ],
    url: '/pages/categorylist/index',
  },
]

// 社区动态数据
const communityNewsList = [
  {
    icon: '&#xe852;',
    iconBg: '#fff7e6',
    iconColor: '#f97316',
    title: '关于小区停水通知',
    description: '因市政管网维修需要，本小区将于明日进行停水作业',
    url: '',
  },
  {
    icon: '&#xe80d;',
    iconBg: '#fff7e6',
    iconColor: '#f97316',
    title: '春节期间物业服务安排',
    description: '春节将至，为确保节日期间小区的正常运行',
    url: '',
  },
]

function handleLocation() {
  uni.navigateTo({
    url: '/pages/common/address-select/index',
  })
}
</script>

<template>
  <view class="h-full overflow-y-auto overflow-hidden">
    <!-- <view class="h-[--safe-top] bg-white"></view> -->
    <homeSearch
      :location-text="currentAddress"
      placeholder="搜索"
      @location-click="handleLocation"
      @search-click="handleLocation"/>
    
    <cardTip title="社区便民服务" dec="服务于社区5km范围的业主、商家、物业." bg="linear-gradient(135deg,rgb(251,191,36) 0%,rgb(245,158,11) 50%,rgb(217,119,6) 100%)"/>
    <categoryGrid :categories="categories" />
    <hotServices :services="hotServicesList" />
    <communityNews :news-list="communityNewsList" />
    <!-- <zero-markdown-view :key="appStore.primaryColor" :markdown="content" :theme-color="appStore.primaryColor" /> -->
    
  </view>
</template>
