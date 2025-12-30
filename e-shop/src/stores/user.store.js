// src/stores/user.store.js
import { defineStore } from 'pinia'
import { get, set, remove } from '@/utils/storage'
import { post } from '@/utils/request'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: get('user_token') || '',
    userInfo: get('user_info') || null
  }),

  getters: {
    isLoggedIn: (state) => !!state.token
  },

  actions: {
    async login(credentials) {
      // 模拟API调用
      // const response = await post('/auth/login', credentials)
      // this.token = response.token
      // this.userInfo = response.user
      
      // 模拟登录成功
      this.token = 'mock-token-12345'
      this.userInfo = {
        id: 1,
        username: credentials.username,
        avatar: 'https://via.placeholder.com/100'
      }
      
      set('user_token', this.token)
      set('user_info', this.userInfo)
    },

    logout() {
      this.token = ''
      this.userInfo = null
      remove('user_token')
      remove('user_info')
    }
  }
})