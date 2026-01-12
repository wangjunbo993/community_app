<script setup>
import { computed } from 'vue'

const props = defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
})

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
  return props.categories.map(item => ({
    ...item,
    _icon: decodeIcon(item.icon),
  }))
})

function handleCategoryClick(item) {
  if (item.url) {
    // 检查页面是否存在，如果不存在则显示提示
    uni.showToast({
      title: `即将进入${item.name}`,
      icon: 'none',
      duration: 2000,
    })
    
    // 尝试跳转，如果页面不存在会静默失败
    uni.navigateTo({
      url: `${item.url}?name=${item.name}&kind=${item.kind}`,
      fail: () => {
        console.log(`页面 ${item.url} 不存在`)
      },
    })
  }
}
</script>


<template>
  <view class="w-full px-14px mt-7">
    <view class="grid grid-cols-4 gap-4">
      <view
        v-for="(item, index) in renderCategories"
        :key="index"
        class="flex flex-col items-center"
        @click="handleCategoryClick(item)"
      >
        <view
          :style="{ background: item.bgColor || '#3b82f6' }"
          class="w-70px h-70px rounded-20px flex items-center justify-center shadow-md"
        >
          <text class="iconfont text-30px text-white">
            {{ item._icon }}
          </text>
        </view>

        <!-- 如需标题 -->
        
        <text class="mt-12px text-14px text-#333">
          {{ item.name }}
        </text>
       
      </view>
    </view>
  </view>
</template>

<style scoped>
.shadow-md {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
</style>
