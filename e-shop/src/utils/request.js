/**
 * HTTP请求封装
 */
import axios from 'axios'
import { Toast } from 'vant'
import { useUserStore } from '@/stores/user.store'
import router from '@/routers'

// 创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 添加token
    const userStore = useUserStore()
    const token = userStore.token || localStorage.getItem('user_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // 显示加载提示（针对长时间请求）
    if (config.showLoading !== false) {
      config.loadingToast = Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 关闭加载提示
    if (response.config.loadingToast) {
      response.config.loadingToast.clear()
    }

    const { data } = response

    // 根据后端返回的数据结构进行调整
    if (data.code === 200 || data.success) {
      return data.data !== undefined ? data.data : data
    } else {
      const errorMessage = data.message || data.msg || '请求失败'
      Toast({
        message: errorMessage,
        duration: 2000,
        position: 'bottom'
      })
      return Promise.reject(new Error(errorMessage))
    }
  },
  (error) => {
    // 关闭加载提示
    if (error.config?.loadingToast) {
      error.config.loadingToast.clear()
    }

    const userStore = useUserStore()

    if (error.response) {
      const { status, data } = error.response
      let message = '请求失败'

      switch (status) {
        case 400:
          message = data.message || '请求参数错误'
          break
        case 401:
          message = '登录已过期，请重新登录'
          userStore.logout()
          Toast(message)
          router.push({
            path: '/login',
            query: { redirect: window.location.pathname }
          })
          break
        case 403:
          message = '没有权限访问'
          break
        case 404:
          message = '请求的资源不存在'
          break
        case 408:
          message = '请求超时'
          break
        case 500:
          message = '服务器内部错误'
          break
        case 502:
          message = '网关错误'
          break
        case 503:
          message = '服务不可用'
          break
        case 504:
          message = '网关超时'
          break
        default:
          message = `请求失败 (${status})`
      }

      Toast({
        message,
        duration: 2000,
        position: 'bottom'
      })

    } else if (error.request) {
      if (error.code === 'ECONNABORTED') {
        Toast('请求超时，请检查网络连接')
      } else {
        Toast('网络错误，请检查网络连接')
      }
    } else {
      Toast('请求配置错误：' + error.message)
    }

    return Promise.reject(error)
  }
)

// 请求方法封装
const createRequestMethod = (method) => (url, data = {}, config = {}) => {
  const defaultConfig = {
    method,
    url,
  }

  Object.assign(defaultConfig, config)

  if (method === 'get' || method === 'delete') {
    defaultConfig.params = data
  } else {
    defaultConfig.data = data
  }

  return request(defaultConfig)
}

export const get = createRequestMethod('get')
export const post = createRequestMethod('post')
export const put = createRequestMethod('put')
export const patch = createRequestMethod('patch')
export const del = createRequestMethod('delete')

export const upload = (url, formData, config = {}) => {
  return request.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: (progressEvent) => {
      if (config.onProgress) {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        config.onProgress(percent)
      }
    },
    ...config
  })
}

export const download = (url, params = {}, filename = 'download') => {
  return request.get(url, {
    params,
    responseType: 'blob'
  }).then(response => {
    const blob = new Blob([response.data])
    const downloadUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(downloadUrl)
  })
}

export default request