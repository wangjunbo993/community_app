<script setup>
defineProps({
  title: {
    type: String,
    default: '热门服务',
  },
  services: {
    type: Array,
    default: () => [],
  },
})

function handleServiceClick(item) {
  if (item.url) {
    uni.navigateTo({
      url: item.url,
    })
  }
}

function handleMoreClick() {
  uni.navigateTo({
    url: '/pages/services/index',
  })
}
</script>

<template>
  <view class="w-full px-20px mt-10">
    <!-- 标题栏 -->
    <view class="flex items-center justify-between mb-16px">
      <text class="text-26px text-#333 font-bold">{{ title }}</text>
      <view class="flex items-center" @click="handleMoreClick">
        <text class="iconfont text-24px text-#999 ml-4px">&#xe78f;</text>
      </view>
    </view>

    <!-- 服务列表 -->
    <view class="flex flex-col gap-2">
      <view
        v-for="(item, index) in services"
        :key="index"
        class="bg-white rounded-16px p-10px flex items-center"
        @click="handleServiceClick(item)"
      >
        <!-- 图片 -->
        <image
          :src="item.image"
          class="w-30 h-20 rounded-12px flex-shrink-0"
          mode="aspectFill"
        />

        <!-- 内容区 -->
        <view class="flex-1 ml-20px flex flex-col gap-2">
          <!-- 服务名称 -->
          <view>
            <text class="text-20px text-#333 font-medium line-clamp-2">{{ item.name }}</text>
          </view>

          <!-- 价格区域 -->
          <view class="flex items-baseline gap-1">
            <text class="text-20px text-#ff4d4f font-bold">¥{{ item.price }}</text>
            <text v-if="item.originalPrice" class="text-16px text-#999 line-through">
              ¥{{ item.originalPrice }}
            </text>
          </view>

          <!-- 标签区域 -->
          <view class="flex items-center gap-12px flex-wrap">
            <view
              v-for="(tag, tagIndex) in item.tags"
              :key="tagIndex"
              class="px-16px py-6px rounded-20px text-15px"
              :style="{
                background: tag.bgColor || '#fff7e6',
                color: tag.color || '#fa8c16',
              }"
            >
              {{ tag.text }}
            </view>
          </view>
        </view>
      </view>
    </view>
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
</style>
