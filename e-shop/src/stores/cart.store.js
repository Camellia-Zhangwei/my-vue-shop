// src/stores/cart.store.js
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { Toast } from 'vant'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref([])
  const selectedItemIds = ref([])

  // 计算属性
  const totalItems = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0)
  })

  const totalAmount = computed(() => {
    return cartItems.value.reduce((total, item) => {
      if (selectedItemIds.value.includes(item.id)) {
        return total + (item.price * item.quantity)
      }
      return total
    }, 0)
  })

  const selectedItems = computed(() => {
    return cartItems.value.filter(item => selectedItemIds.value.includes(item.id))
  })

  const isAllSelected = computed(() => {
    return cartItems.value.length > 0 && cartItems.value.every(item => selectedItemIds.value.includes(item.id))
  })

  const hasItems = computed(() => cartItems.value.length > 0)

  // 方法
  const addToCart = (product, quantity = 1) => {
    const existing = cartItems.value.find(item => item.id === product.id)
    if (existing) {
      existing.quantity += quantity
      Toast.success(`已增加 ${quantity} 件商品`)
    } else {
      cartItems.value.push({
        ...product,
        quantity,
        addedTime: Date.now()
      })
      Toast.success('商品已加入购物车')
    }
    if (!selectedItemIds.value.includes(product.id)) {
      selectedItemIds.value.push(product.id)
    }
  }

  const removeFromCart = (itemId) => {
    const index = cartItems.value.findIndex(item => item.id === itemId)
    if (index > -1) {
      cartItems.value.splice(index, 1)
      const selIndex = selectedItemIds.value.indexOf(itemId)
      if (selIndex > -1) {
        selectedItemIds.value.splice(selIndex, 1)
      }
      Toast.success('商品已移除')
    }
  }

  const updateQuantity = (itemId, newQuantity) => {
    const item = cartItems.value.find(item => item.id === itemId)
    if (item) {
      const qty = Math.max(1, Math.min(99, newQuantity))
      if (qty !== item.quantity) {
        item.quantity = qty
        Toast.success('数量已更新')
      }
    }
  }

  const toggleSelectItem = (itemId) => {
    const index = selectedItemIds.value.indexOf(itemId)
    if (index > -1) {
      selectedItemIds.value.splice(index, 1)
    } else {
      selectedItemIds.value.push(itemId)
    }
  }

  const toggleSelectAll = () => {
    if (isAllSelected.value) {
      selectedItemIds.value = []
    } else {
      selectedItemIds.value = cartItems.value.map(item => item.id)
    }
  }

  const clearCart = () => {
    if (cartItems.value.length === 0) {
      Toast('购物车已经是空的')
      return
    }
    cartItems.value = []
    selectedItemIds.value = []
    Toast.success('购物车已清空')
  }

  const checkout = () => {
    if (selectedItemIds.value.length === 0) {
      Toast('请选择要结算的商品')
      return null
    }
    const checkedOutItems = [...selectedItems.value]
    cartItems.value = cartItems.value.filter(item => !selectedItemIds.value.includes(item.id))
    selectedItemIds.value = []
    Toast.success(`结算成功，共 ${checkedOutItems.length} 件商品`)
    return checkedOutItems
  }

  // 从 localStorage 加载
  const loadCart = () => {
    const saved = localStorage.getItem('cart-store')
    if (saved) {
      try {
        const { cartItems: items, selectedItemIds: ids } = JSON.parse(saved)
        cartItems.value = items || []
        selectedItemIds.value = ids || []
      } catch (e) {
        console.error('加载购物车失败', e)
      }
    }
  }

  // 保存到 localStorage
  const saveCart = () => {
    try {
      localStorage.setItem('cart-store', JSON.stringify({
        cartItems: cartItems.value,
        selectedItemIds: selectedItemIds.value
      }))
    } catch (e) {
      console.error('保存购物车失败', e)
    }
  }

  // 自动持久化
  loadCart()
  watch([cartItems, selectedItemIds], saveCart, { deep: true })

  return {
    cartItems,
    selectedItemIds,
    totalItems,
    totalAmount,
    selectedItems,
    isAllSelected,
    hasItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleSelectItem,
    toggleSelectAll,
    clearCart,
    checkout
  }
}, {
  // 注意：如果你安装了 pinia-plugin-persistedstate，可启用此配置
  // 否则上面的手动 load/save 已足够
  persist: {
    key: 'cart-store',
    storage: localStorage,
    paths: ['cartItems', 'selectedItemIds']
  }
})