<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/user'
import { useAppStore } from '@/store/app'
const userStore = useUserStore()
const appStore = useAppStore()
// 搜索关键词
const searchKeyword = ref('')

// 热门搜索数据
const hotSearchList = [
  '华瑞紫韵城社区',
  '金色家园社区',
  '阳光花园小区',
  '绿城春江明月',
  '万科城市之光',
  '龙湖天街',
]

// 返回首页
function handleBack() {
  uni.navigateBack()
}

// 选择地址
function selectAddress(address) {
  userStore.setAddress(address)
  uni.showToast({
    title: '地址已选择',
    icon: 'success',
    duration: 1500,
  })
  uni.navigateBack()
}

// 搜索
function handleSearch() {
  if (searchKeyword.value.trim()) {
    selectAddress(searchKeyword.value.trim())
  }
}

// 清空搜索历史
function clearHistory() {
  uni.showModal({
    title: '提示',
    content: '确定清空搜索历史吗？',
    success: (res) => {
      if (res.confirm) {
        userStore.clearSearchHistory()
      }
    },
  })
}
</script>

<template>
  <view class="h-full bg-#f5f5f5 flex flex-col">
    <!-- 顶部安全区 -->
    <view class="h-[--safe-top] bg-white"></view>

    <!-- 顶部搜索栏 -->
    <view class="bg-white px-2 py-2 flex items-center" :style="{ paddingTop: appStore.isNotch ? '24px' : '0' }">
      <!-- 返回按钮 -->
      <view class="w-48px h-48px flex items-center justify-center" @click="handleBack">
        <wd-icon name="thin-arrow-left" size="22px"></wd-icon>
      </view>

      <!-- 搜索框 -->
      <view class="flex-1">
        <view class="bg-#f5f5f5 rounded-24px px-2 py-2 flex items-center w-60vw">
          <!-- <text class="iconfont text-32px text-#999">&#xe615;</text> -->
          <input
            v-model="searchKeyword"
            
            class="flex-1 ml-12px text-16px"
            placeholder="请搜索社区"
            placeholder-style="color: #999"
            confirm-type="search"
            @confirm="handleSearch"
          />
          <!-- <wd-input type="text"  v-model="searchKeyword" placeholder="请输入用户名" @change="handleChange" /> -->
        </view>
      </view>
    </view>

    <!-- 内容区域 -->
    <scroll-view class="flex-1" scroll-y>
      <!-- 热门搜索 -->
      <view class="px-18px py-18px">
        <text class="text-20px text-#333 font-bold">热门搜索</text>
        <view class="mt-14px flex flex-wrap gap-3">
          <view
            v-for="(item, index) in hotSearchList"
            :key="index"
            class="px-16px py-6px bg-white rounded-12px"
            @click="selectAddress(item)"
          >
            <text class="text-18px text-#333">{{ item }}</text>
          </view>
        </view>
      </view>

      <!-- 搜索历史 -->
      <view v-if="userStore.searchHistory.length > 0" class="px-28px py-32px">
        <view class="flex items-center justify-between mb-24px">
          <text class="text-20px text-#333 font-bold">热门搜索</text>
          <view class="flex items-center" @click="clearHistory">
            <wd-icon name="delete text-#999" size="22px"></wd-icon>
            <!-- <text class="text-28px text-#999 ml-8px">清空</text> -->
          </view>
        </view>

        <view class="flex flex-col gap-0">
          <view
            v-for="(item, index) in userStore.searchHistory"
            :key="index"
            class="bg-white px-4px py-10px flex items-center justify-between"
            :class="{ 'rounded-t-12px': index === 0, 'rounded-b-12px': index === userStore.searchHistory.length - 1 }"
            @click="selectAddress(item)"
          >
            <view class="flex items-center flex-1">
              <wd-icon name="location" size="22px"></wd-icon>
              <text class="text-16px text-#333 ml-16px">{{ item }}</text>
            </view>
            <text class="iconfont text-18px text-#ccc">&#xe61a;</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style scoped>
input {
  background: transparent;
}
</style>
