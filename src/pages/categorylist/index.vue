<script setup>
import rentList from '@/components/rentList/index.vue'
import { sleep } from '@/utils'
import { onLoad } from '@dcloudio/uni-app'

onLoad((options) => {
  console.log(options.kind)   // '123'
  console.log(options.name) // 'uniapp'
  uni.setNavigationBarTitle({
  title: options.name
})
})
// 筛选项
const filters = [
  { label: '全部', value: 'all' },
  { label: '房屋', value: 'house' },
  { label: '车位', value: 'parking' },
]

// 模拟数据
const mockData = [
  {
    image: 'https://readdy.ai/api/search-image?query=Modern%20furnished%20two-bedroom%20apartment%20interior%20with%20clean%20living%20room%2C%20comfortable%20furniture%2C%20bright%20natural%20lighting%2C%20contemporary%20home%20design%2C%20rental%20property%20photography%2C%20cozy%20living%20space&width=300&height=200&seq=apt1&orientation=landscape',
    title: '精装两室一厅出租',
    description: '精装修两室一厅，家具家电齐全，拎包入住，交通便利',
    price: '3200',
    dress:'星园',
    unit: '月',
    tags: [
      { text: '精装修', bgColor: '#fff7e6', color: '#fa8c16' },
      { text: '拎包入住', bgColor: '#fff7e6', color: '#fa8c16' },
    ],
  },
  {
    image: 'https://readdy.ai/api/search-image?query=Modern%20furnished%20two-bedroom%20apartment%20interior%20with%20clean%20living%20room%2C%20comfortable%20furniture%2C%20bright%20natural%20lighting%2C%20contemporary%20home%20design%2C%20rental%20property%20photography%2C%20cozy%20living%20space&width=300&height=200&seq=apt1&orientation=landscape',
    title: '地下车位长期出租',
    description: '地下停车位，安全便利，24小时监控，长期稳定出租',
    price: '300',
    dress:'福园',
    unit: '月',
    tags: [
      { text: '安全', bgColor: '#fff7e6', color: '#fa8c16' },
      { text: '监控', bgColor: '#fff7e6', color: '#fa8c16' },
    ],
  },
  {
    image: 'https://readdy.ai/api/search-image?query=Modern%20furnished%20two-bedroom%20apartment%20interior%20with%20clean%20living%20room%2C%20comfortable%20furniture%2C%20bright%20natural%20lighting%2C%20contemporary%20home%20design%2C%20rental%20property%20photography%2C%20cozy%20living%20space&width=300&height=200&seq=apt1&orientation=landscape',
    title: '单身公寓出租',
    description: '温馨单身公寓，适合单人居住，设施完善，价格实惠',
    price: '1800',
    unit: '月',
    dress:'雅园',
    tags: [
      { text: '单身公寓', bgColor: '#fff7e6', color: '#fa8c16' },
      { text: '实惠', bgColor: '#fff7e6', color: '#fa8c16' },
    ],
  },
]

// 模拟请求
async function mockRequest(pageNo, pageSize, filter) {
  await sleep(800)
  
  const totalItems = 50
  const start = (pageNo - 1) * pageSize
  const end = Math.min(start + pageSize, totalItems)
  
  // 根据筛选生成数据
  const data = []
  for (let i = start; i < end; i++) {
    const mockItem = mockData[i % mockData.length]
    data.push({
      ...mockItem,
      id: i + 1,
      title: `${mockItem.title} #${i + 1}`,
    })
  }
  
  return {
    code: 200,
    data,
    total: totalItems,
    hasMore: end < totalItems,
  }
}

// 加载更多
async function handleLoadMore({ pageNo, pageSize, filter, resolve, reject }) {
  try {
    const result = await mockRequest(pageNo, pageSize, filter)
    resolve(result)
  } catch (error) {
    uni.showToast({
      title: '加载失败',
      icon: 'none',
    })
    reject(error)
  }
}

// 刷新
function handleRefresh({ filter }) {
  console.log('刷新数据', filter)
}

// 筛选变化
function handleFilterChange(filter) {
  console.log('筛选变化', filter)
}
</script>

<template>
  <view class="h-full">
    <rentList
      :filters="filters"
      :initial-data="[]"
      @load-more="handleLoadMore"
      @refresh="handleRefresh"
      @filter-change="handleFilterChange"
    />
  </view>
</template>
