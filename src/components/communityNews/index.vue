<script setup>
import { computed } from 'vue'
const props =  defineProps({
  title: {
    type: String,
    default: '社区动态',
  },
  newsList:  {
    type: Array,
    default: () => [],
  },
})

function handleNewsClick(item) {
  if (item.url) {
    uni.navigateTo({
      url: item.url,
    })
  }
}

/**
 * &#xe83f; → 
 */
function decodeIcon(icon) {
  if (!icon) return ''
  return icon.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
    String.fromCharCode(parseInt(hex, 16))
  )
}

/**
 * 在组件内生成“已解析 icon”的数据
 */
const renderCategories = computed(() => {
  return props.newsList.map(item => ({
    ...item,
    _icon: decodeIcon(item.icon),
  }))
})

function handleMoreClick() {
//   uni.navigateTo({
//     url: '/pages/news/index',
//   })
}
</script>

<template>
  <view class="w-full px-20px mt-10 mb-5 mx-0">
    <!-- 标题栏 -->
    <view class="flex items-center justify-between mb-16px">
      <text class="text-23px text-#333">{{ props.title }}</text>
      <view class="flex items-center" @click="handleMoreClick">
        <text class="iconfont text-22px text-#999 ml-4px">&#xe78f;</text>
      </view>
    </view>

    <!-- 动态列表 -->
    <view class="flex flex-col gap-2">
      <view
        v-for="(item, index) in renderCategories"
        :key="index"
        class="bg-white rounded-16px p-10px  flex items-center"
        @click="handleNewsClick(item)"
      >
        <!-- 图标 -->
        <view
          class="w-15 h-15 rounded-20px flex items-center justify-center flex-shrink-0"
          :style="{ background: item.iconBg || '#f97316' }"
        >
          <text class="iconfont text-10" :style="{ color: item.iconColor || '#fa8c16' }">
            {{ item._icon }}
          </text>
        </view>

        <!-- 内容区 -->
        <view class="flex-1 ml-24px">
          <!-- 标题 -->
          <text class="text-21px text-#333 line-clamp-1 mb-12px">{{ item.title }}</text>
          
          <!-- 描述 -->
          <text class="text-16px text-#666 line-clamp-2 leading-relaxed">{{ item.description }}</text>
        </view>
      </view>
    </view>
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
