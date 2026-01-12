<script setup lang="ts">
import { onMounted } from 'vue'
import { useAppStore } from '@/store/app'

const appStore = useAppStore()

defineProps({
  locationText: {
    type: String,
    default: '请选择位置',
  },
  placeholder: {
    type: String,
    default: '搜索',
  },
  isSticky: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (e: 'locationClick'): void
  (e: 'searchClick'): void
}>()

const onLocationClick = () => emit('locationClick')
const onSearchClick = () => emit('searchClick')

onMounted(() => {
  try {
    // uni-app 同端 API 获取设备信息
    const sys = uni.getSystemInfoSync() as any
    // 如果 statusBarHeight 可用且较高，则视作刘海屏
    if (sys && sys.statusBarHeight && Number(sys.statusBarHeight) >= 44) {
      appStore.setIsNotch(true)
    }
  }
  catch (e) {
    // 无法获取信息则默认不加刘海处理
    appStore.setIsNotch(false)
  }
})
</script>

<template>
  <wd-sticky :offset-top="0">
    <view class="rounded-12px px-16px pb-5px bg-white" :style="{ paddingTop: appStore.isNotch ? '65px' : '0' }">
      <view style="width: 100vw" class="flex-between">
        <view class="max-w-180px flex shrink-0 items-center" @click="onLocationClick">
          <wd-icon name="location" size="18" />
          <text class="ml-6px truncate text-20px text-#1d2129 font-600">
            {{ locationText }}
          </text>
        </view>
        <!-- <view class="ml-12px flex items-center" @click="onSearchClick">
          <wd-icon name="search" size="18" color="#000" />
        </view> -->
      </view>
    </view>
  </wd-sticky>
  <!-- <wd-sticky :offset-top="27">
    <view class="rounded-12px px-14px search-container" :style="{ paddingTop: appStore.isNotch ? '32px' : '0' }">
      <view class="flex-between ">
        <view class="max-w-180px flex shrink-0 items-center" @click="onLocationClick">
          <wd-icon name="location" size="18" />
          <text class="ml-6px truncate text-20px text-#1d2129 font-600">
            {{ locationText }}
          </text>
        </view>
        <view class="ml-12px h-36px flex items-center" @click="onSearchClick">
          <wd-icon name="search" size="18" color="#000" />
        </view>
      </view>
    </view>
  </wd-sticky> -->
</template>

<style scoped>
.search-container {
  width: 70%;
  transition: width 0.3s ease-in-out;
}

.search-container.is-sticky {
  width: 100%;
}
</style>
