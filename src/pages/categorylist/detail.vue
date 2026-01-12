<script setup>
import { onLoad } from '@dcloudio/uni-app'

const itemData = ref({
  image: '',
  title: '',
  description: '',
  rating: 0,
  sold: 0,
  distance: '',
  price: '',
  unit: '月',
  tags: [],
})

onLoad((options) => {
  // 从全局数据中获取
  const app = getApp()
  if (app.globalData && app.globalData.detailData) {
    itemData.value = app.globalData.detailData
    // 清除全局数据
    delete app.globalData.detailData
  } else {
    // 如果没有数据，显示提示
    uni.showToast({
      title: '数据加载失败',
      icon: 'none',
    })
  }
})

// 返回
// function handleBack() {
//   uni.navigateBack()
// }

// 电话订购
function handleCall() {
  uni.showModal({
    title: '电话订购',
    content: '是否拨打电话？',
    success: (res) => {
      if (res.confirm) {
        uni.makePhoneCall({
          phoneNumber: '10086',
        })
      }
    },
  })
}

// 渲染星星
function renderStars(rating) {
  const fullStars = Math.floor(rating || 0)
  return fullStars
}
</script>

<template>
  <view class="h-full bg-white flex flex-col">
    <!-- 顶部安全区 -->
    <!-- <view class="h-[--safe-top] bg-white"></view> -->

    <!-- 顶部导航栏 -->
    <!-- <view class="flex items-center px-28rpx py-24rpx bg-white border-b border-#f0f0f0">
      <view 
        class="w-80rpx h-80rpx flex items-center justify-center" 
        @click="handleBack"
      >
        <wd-icon name="arrow-left" size="24px" color="#333" />
      </view>
      <text class="flex-1 text-center text-36rpx text-#333 font-bold mr-80rpx">详情</text>
    </view> -->

    <!-- 可滚动内容区 -->
    <scroll-view class="flex-1" scroll-y>
      <!-- 主图 -->
      <image
        v-if="itemData.image"
        :src="itemData.image"
        class="w-full h-500rpx"
        mode="aspectFill"
      />
      <view v-else class="w-full h-500rpx bg-#f5f5f5 flex items-center justify-center">
        <text class="text-32rpx text-#999">暂无图片</text>
      </view>

      <!-- 内容区 -->
      <view class="px-32rpx py-32rpx">
        <!-- 标题 -->
        <text class="text-48rpx text-#333 font-bold block mb-24rpx">
          {{ itemData.title || '暂无标题' }}
        </text>

        <!-- 标签 -->
        <view v-if="itemData.tags && itemData.tags.length > 0" class="flex items-center gap-16rpx mb-32rpx">
          <view
            v-for="(tag, index) in itemData.tags"
            :key="index"
            class="px-24rpx py-12rpx rounded-24rpx"
            :style="{
              background: tag.bgColor || '#fff7e6',
              color: tag.color || '#fa8c16',
            }"
          >
            <text class="text-28rpx">{{ tag.text }}</text>
          </view>
        </view>

        <!-- 评分和销量 -->
        <view v-if="itemData.rating" class="flex items-center mb-32rpx">
          <!-- 评分 -->
          <text class="text-40rpx text-#ff6b35 font-bold mr-12rpx">{{ itemData.rating }}</text>
          
          <!-- 星星 -->
          <view class="flex items-center mr-32rpx">
            <text
              v-for="i in 5"
              :key="i"
              class="text-32rpx"
              :class="i <= renderStars(itemData.rating) ? 'text-#ff6b35' : 'text-#ddd'"
            >★</text>
          </view>

          <!-- 已售 -->
          <text v-if="itemData.sold" class="text-28rpx text-#999 mr-32rpx">已售{{ itemData.sold }}</text>

          <!-- 距离 -->
          <text v-if="itemData.distance" class="text-28rpx text-#999">{{ itemData.distance }}</text>
        </view>

        <!-- 价格 -->
        <view v-if="itemData.price" class="mb-32rpx">
          <view class="flex items-baseline">
            <text class="text-72rpx text-#ff4d4f font-bold">¥{{ itemData.price }}</text>
            <text class="text-36rpx text-#ff4d4f">/{{ itemData.unit || '月' }}</text>
          </view>
        </view>

        <!-- 描述 -->
        <view v-if="itemData.description" class="mb-48rpx">
          <text class="text-32rpx text-#666 leading-relaxed">
            {{ itemData.description }}
          </text>
        </view>
      </view>
    </scroll-view>

    <!-- 底部按钮 -->
    <view class="px-32rpx py-32rpx bg-white">
      <button
        class="w-full h-96rpx bg-#ff6b35 text-white text-36rpx font-bold rounded-full flex items-center justify-center"
        @click="handleCall"
      >
        电话订购
      </button>
    </view>
  </view>
</template>

<style scoped>
.leading-relaxed {
  line-height: 1.8;
}

button {
  border: none;
  padding: 0;
  margin: 0;
  background: transparent;
}

button::after {
  border: none;
}
</style>
