<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: '社区便民服务',
  },
  dec: {
    type: String,
    default: '服务于社区5km范围的业主、商家、物业.',
  },
  bg: {
    type: String,
    default:
      'linear-gradient(135deg,rgb(251,191,36) 0%,rgb(245,158,11) 50%,rgb(217,119,6) 100%)',
  },
})
</script>

<template>
  <view class="w-full px-20px">
    <view :style="{ background: bg }" class="relative mt-6 h-30 rounded-20px px-[48rpx] py-[48rpx]">
      <view class="text-30px text-white font-bold tracking-1px">
        {{ title }}
      </view>
      <view class="mt-4 text-16px text-white">
        {{ dec }}
        <!-- <text class="iconfont">&#xe83f;</text> -->
      </view>
      <view class="absolute -bottom-30px -right-18px">
        <wd-icon custom-style="opacity: 0.3;" color="#fff" name="home" size="100px"></wd-icon>
      </view>
    </view>
  </view>
</template>
