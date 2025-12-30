/**
 * API接口定义
 * 这里定义了所有与后端交互的接口
 */

import { get, post, put, del } from '@/utils/request'

// 商品相关API
export const productApi = {
  // 获取商品列表
  getProducts: (params) => get('/api/products', params),
  
  // 获取商品详情
  getProductDetail: (id) => get(`/api/products/${id}`),
  
  // 搜索商品
  searchProducts: (keyword, params) => get('/api/products/search', { keyword, ...params }),
  
  // 获取分类商品
  getProductsByCategory: (categoryId, params) => 
    get(`/api/categories/${categoryId}/products`, params),
  
  // 获取热门商品
  getHotProducts: (params) => get('/api/products/hot', params),
  
  // 获取新品
  getNewProducts: (params) => get('/api/products/new', params)
}

// 分类相关API
export const categoryApi = {
  // 获取分类列表
  getCategories: () => get('/api/categories'),
  
  // 获取分类详情
  getCategoryDetail: (id) => get(`/api/categories/${id}`),
  
  // 获取子分类
  getSubCategories: (parentId) => get(`/api/categories/${parentId}/sub`)
}

// 购物车相关API
export const cartApi = {
  // 获取购物车
  getCart: () => get('/api/cart'),
  
  // 添加到购物车
  addToCart: (data) => post('/api/cart/items', data),
  
  // 更新购物车商品数量
  updateCartItem: (itemId, quantity) => put(`/api/cart/items/${itemId}`, { quantity }),
  
  // 从购物车删除商品
  removeCartItem: (itemId) => del(`/api/cart/items/${itemId}`),
  
  // 清空购物车
  clearCart: () => del('/api/cart')
}

// 用户相关API
export const userApi = {
  // 登录
  login: (data) => post('/api/auth/login', data),
  
  // 注册
  register: (data) => post('/api/auth/register', data),
  
  // 获取用户信息
  getUserInfo: () => get('/api/user/info'),
  
  // 更新用户信息
  updateUserInfo: (data) => put('/api/user/info', data),
  
  // 获取订单列表
  getOrders: (params) => get('/api/user/orders', params),
  
  // 获取订单详情
  getOrderDetail: (orderId) => get(`/api/user/orders/${orderId}`)
}

// 订单相关API
export const orderApi = {
  // 创建订单
  createOrder: (data) => post('/api/orders', data),
  
  // 取消订单
  cancelOrder: (orderId) => put(`/api/orders/${orderId}/cancel`),
  
  // 确认收货
  confirmOrder: (orderId) => put(`/api/orders/${orderId}/confirm`),
  
  // 获取订单状态
  getOrderStatus: (orderId) => get(`/api/orders/${orderId}/status`)
}

// 上传相关API
export const uploadApi = {
  // 上传图片
  uploadImage: (formData) => post('/api/upload/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export default {
  productApi,
  categoryApi,
  cartApi,
  userApi,
  orderApi,
  uploadApi
}