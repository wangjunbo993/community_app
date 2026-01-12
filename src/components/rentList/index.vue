<script setup>
const props = defineProps({
  filters: {
    type: Array,
    default: () => [],
  },
  initialData: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['refresh', 'loadMore', 'filterChange'])

const pagingRef = ref(null)
const dataList = ref([])
const activeFilterIndex = ref(0)

// 切换筛选项
function handleFilterChange(index) {
  activeFilterIndex.value = index
  emit('filterChange', props.filters[index])
  // 重新加载数据
  pagingRef.value?.reload()
}

// 查询数据
async function onQuery(pageNo, pageSize) {
  try {
    // 调用父组件的 loadMore 方法获取数据
    const result = await new Promise((resolve, reject) => {
      emit('loadMore', { 
        pageNo, 
        pageSize, 
        filter: props.filters[activeFilterIndex.value],
        resolve,
        reject
      })
    })
    
    if (result && result.code === 200) {
      if (pageNo === 1) {
        dataList.value = result.data
      } else {
        dataList.value.push(...result.data)
      }
      
      pagingRef.value.complete(result.data)
      
      if (!result.hasMore) {
        pagingRef.value.completeByNoMore(result.data)
      }
    } else {
      throw new Error('数据加载失败')
    }
  } catch (error) {
    console.error('加载失败:', error)
    pagingRef.value.complete(false)
  }
}

// 刷新
function onRefresh() {
  emit('refresh', { filter: props.filters[activeFilterIndex.value] })
}

// 渲染星星
function renderStars(rating) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  return { fullStars, hasHalfStar }
}

function handleClick(item) {
  // 将数据存储到全局，避免 URL 参数过长
  getApp().globalData = getApp().globalData || {}
  getApp().globalData.detailData = item
  
  uni.navigateTo({
    url: `/pages/categorylist/detail?id=${item.id || Date.now()}`,
    fail: (err) => {
      console.log('跳转失败', err)
      uni.showToast({
        title: '页面跳转失败',
        icon: 'none',
      })
    },
  })
}
</script>

<template>
  <view class="h-full flex flex-col bg-#f5f5f5">
    <!-- 顶部筛选栏 -->
    <view class="bg-white">
      <scroll-view scroll-x class="whitespace-nowrap">
        <view class="flex px-28rpx py-24rpx">
          <view
            v-for="(filter, index) in filters"
            :key="index"
            class="inline-block mr-20rpx"
            @click="handleFilterChange(index)"
          >
            <view
              class="px-32rpx py-16rpx rounded-full transition-all"
              :class="activeFilterIndex === index 
                ? 'bg-#ff6b35 text-white' 
                : 'bg-#f5f5f5 text-#666'"
            >
              <text class="text-26rpx font-medium whitespace-nowrap">{{ filter.label }}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 列表区域 -->
    <z-paging
      ref="pagingRef"
      v-model="dataList"
      class="flex-1"
      :fixed="false"
      :refresher-enabled="true"
      :loading-more-enabled="true"
      @query="onQuery"
      @on-refresh="onRefresh"
    >
      <view class="px-28rpx py-24rpx">
        <view
          v-for="(item, index) in dataList"
          :key="index"
          class="bg-white rounded-24rpx mb-24rpx overflow-hidden"
          @click="handleClick(item)"
        >
          <view class="p-32rpx">
            <!-- 顶部：图片和内容 -->
            <view class="flex">
              <!-- 左侧图片 -->
              <image
                :src="item.image"
                class="w-200rpx h-200rpx rounded-20rpx flex-shrink-0"
                mode="aspectFill"
              />

              <!-- 右侧内容 -->
              <view class="flex-1 ml-24rpx flex flex-col justify-between">
                <!-- 标题 -->
                <text class="text-36rpx text-#333 font-bold line-clamp-1 mb-16rpx">
                  {{ item.title }}
                </text>

                <!-- 描述 -->
                <text class="text-26rpx text-#666 line-clamp-2 leading-relaxed mb-16rpx">
                  {{ item.description }}
                </text>
                <!-- 价格 -->
                <view class="flex items-baseline">
                  <text class="text-48rpx text-#ff4d4f font-bold">¥{{ item.price }}</text>
                  <text class="text-28rpx text-#ff4d4f">/{{ item.unit }}</text>
                </view>
                <!-- 评分和销量 -->
                <!-- <view class="flex items-center justify-between">
                  <view class="flex items-center"> -->
                    <!-- 评分 -->
                    <!-- <text class="text-32rpx text-#ff6b35 font-bold mr-8rpx">{{ item.rating }}</text> -->
                    <!-- 星星 -->
                    <!-- <view class="flex items-center mr-16rpx">
                      <text
                        v-for="i in 5"
                        :key="i"
                        class="text-28rpx"
                        :class="i <= renderStars(item.rating).fullStars ? 'text-#ff6b35' : 'text-#ddd'"
                      >★</text>
                    </view>
                  </view> -->

                  <!-- 已售和距离 -->
                  <!-- <view class="flex items-center text-26rpx text-#999">
                    <text>已售{{ item.sold }}</text>
                    <text class="mx-12rpx">|</text>
                    <text>{{ item.distance }}</text>
                  </view> -->
                <!-- </view> -->
              </view>
            </view>

            <!-- 底部：价格和标签 -->
            <view class="flex items-center flex-between mt-24rpx">
              <!-- 价格 -->
              <view class="flex items-baseline">
                <wd-icon name="location color-#000" size="16" />
                <text class="text-28rpx">{{ item.dress }}</text>
              </view> 

              <!-- 标签 -->
              <view class="flex items-center gap-16rpx">
                <view
                  v-for="(tag, tagIndex) in item.tags"
                  :key="tagIndex"
                  class="px-20rpx py-8rpx rounded-20rpx"
                  :style="{
                    background: tag.bgColor || '#fff7e6',
                    color: tag.color || '#fa8c16',
                  }"
                >
                  <text class="text-24rpx">{{ tag.text }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 空状态 -->
      <template #empty>
        <view class="flex flex-col items-center justify-center py-120rpx">
          <text class="text-32rpx text-#999 mb-32rpx">暂无数据</text>
          <button
            class="px-48rpx py-24rpx bg-#ff6b35 text-white rounded-full text-28rpx"
            @click="onRefresh"
          >
            刷新试试
          </button>
        </view>
      </template>
    </z-paging>
  </view>
</template>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}

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
