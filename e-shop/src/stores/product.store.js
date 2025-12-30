// src/stores/product.store.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mockProducts, mockCategories, mockBanners, mockNavIcons } from '@/mock/data'

export const useProductStore = defineStore('product', () => {
  const products = ref([])
  const categories = ref([])
  const banners = ref([])
  const navIcons = ref([])
  const featuredProducts = ref([])
  const hotProducts = ref([])
  const newProducts = ref([])
  const loading = ref(false)

  const categoryMap = computed(() => {
    const map = {}
    categories.value.forEach(category => {
      map[category.id] = category
    })
    return map
  })

  const loadAllData = () => {
    loading.value = true
    return new Promise((resolve) => {
      setTimeout(() => {
        products.value = mockProducts
        categories.value = mockCategories
        banners.value = mockBanners
        navIcons.value = mockNavIcons
        featuredProducts.value = mockProducts.filter(p => p.isFeatured).slice(0, 6)
        hotProducts.value = mockProducts.filter(p => p.isHot).slice(0, 8)
        newProducts.value = mockProducts.filter(p => p.isNew).slice(0, 8)
        loading.value = false
        resolve(true)
      }, 500)
    })
  }

  const getProductById = (id) => {
    const product = products.value.find(p => p.id === parseInt(id))
    if (!product) {
      console.warn(`未找到ID为${id}的商品`)
    }
    return product || null
  }

  const getProductsByCategory = (categoryId) => {
    if (!categoryId) return products.value
    return products.value.filter(p => p.categoryId === parseInt(categoryId))
  }

  const getCategoryById = (categoryId) => {
    return categories.value.find(c => c.id === parseInt(categoryId))
  }

  const searchProducts = (keyword) => {
    if (!keyword.trim()) return []
    const lower = keyword.toLowerCase()
    return products.value.filter(p =>
      p.name.toLowerCase().includes(lower) ||
      (p.description && p.description.toLowerCase().includes(lower))
    )
  }

  const getRandomProducts = (count = 4) => {
    const shuffled = [...products.value].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  return {
    products,
    categories,
    banners,
    navIcons,
    featuredProducts,
    hotProducts,
    newProducts,
    loading,
    categoryMap,
    loadAllData,
    getProductById,
    getProductsByCategory,
    getCategoryById,
    searchProducts,
    getRandomProducts
  }
})