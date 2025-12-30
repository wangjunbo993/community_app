import { defineStore } from 'pinia'
import { getUserInfo, postUserLogin } from '@/api/user/index.js'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref({})

    const token = ref('')

    // 地址相关
    const address = ref('华瑞紫韵城社区')
    const searchHistory = ref([])

    async function login() {
      const res = await postUserLogin()

      token.value = res.token
    }

    function logout() {
      token.value = ''
    }

    async function getUserData() {
      const res = await getUserInfo()

      userInfo.value = res.data
    }

    // 设置地址
    function setAddress(newAddress) {
      address.value = newAddress
      // 添加到搜索历史
      addSearchHistory(newAddress)
    }

    // 添加搜索历史
    function addSearchHistory(item) {
      // 去重
      const index = searchHistory.value.indexOf(item)
      if (index > -1) {
        searchHistory.value.splice(index, 1)
      }
      // 添加到最前面
      searchHistory.value.unshift(item)
      // 最多保留10条
      if (searchHistory.value.length > 10) {
        searchHistory.value = searchHistory.value.slice(0, 10)
      }
    }

    // 清空搜索历史
    function clearSearchHistory() {
      searchHistory.value = []
    }

    return {
      token,
      userInfo,
      address,
      searchHistory,
      login,
      logout,
      getUserData,
      setAddress,
      addSearchHistory,
      clearSearchHistory,
    }
  },
  {
    persist: {
      pick: ['token', 'address', 'searchHistory'],
    },
  },
)
