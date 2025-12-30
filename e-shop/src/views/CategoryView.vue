<!-- src/views/CategoryView.vue -->
<script setup>
defineOptions({ name: 'CategoryView' })

import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/product.store'
import AppNavbar from '@/components/AppNavbar.vue'
import AppFooter from '@/components/AppFooter.vue'
import { Search, Sidebar, SidebarItem, List, PullRefresh, Empty } from 'vant'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()

const activeCategoryId = ref(parseInt(route.params.id) || 0)
const searchKeyword = ref(route.query.keyword || '')
const refreshing = ref(false)
const loading = ref(false)
const finished = ref(false)
const page = ref(1)
const pageSize = ref(10)

const categories = computed(() => productStore.categories)
const products = computed(() => {
  let filtered = productStore.products
  if (activeCategoryId.value > 0) {
    filtered = filtered.filter(p => p.categoryId === activeCategoryId.value)
  }
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(keyword) ||
      p.description.toLowerCase().includes(keyword)
    )
  }
  return filtered
})

const handleSearch = () => {
  if (searchKeyword.value.trim()) {
    router.push(`/category?keyword=${encodeURIComponent(searchKeyword.value)}`)
  }
}

const onCategoryChange = (id) => {
  activeCategoryId.value = id
  router.push(`/category/${id}`)
}

const onLoad = () => {
  // 模拟分页加载
  setTimeout(() => {
    loading.value = false
    if (products.value.length <= page.value * pageSize.value) {
      finished.value = true
    }
    page.value++
  }, 1000)
}

const onRefresh = () => {
  setTimeout(() => {
    page.value = 1
    finished.value = false
    refreshing.value = false
  }, 1000)
}

watch(() => route.params.id, (newId) => {
  activeCategoryId.value = parseInt(newId) || 0
})

watch(() => route.query.keyword, (newKeyword) => {
  searchKeyword.value = newKeyword || ''
})

onMounted(() => {
  console.log('CategoryView mounted')
})
</script>

<template>
  <div class="category-view">
    <!-- 导航栏 -->
    <AppNavbar :title="activeCategoryId ? categories.find(c => c.id === activeCategoryId)?.name || '全部商品' : '商品分类'">
      <template #right>
        <van-icon name="search" size="20" @click="handleSearch" />
      </template>
    </AppNavbar>

    <!-- 搜索框 -->
    <div class="search-bar">
      <van-search
        v-model="searchKeyword"
        placeholder="搜索商品..."
        @search="handleSearch"
        shape="round"
        background="#ffffff"
      />
    </div>

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <div class="category-container">
        <!-- 分类侧边栏 -->
        <van-sidebar v-model="activeCategoryId" @change="onCategoryChange">
          <van-sidebar-item title="全部商品" :value="0" />
          <van-sidebar-item
            v-for="category in categories"
            :key="category.id"
            :title="category.name"
            :value="category.id"
          />
        </van-sidebar>

        <!-- 商品列表 -->
        <div class="product-list">
          <div v-if="products.length === 0" class="empty-state">
            <van-empty description="没有找到相关商品" />
          </div>
          <div v-else class="products">
            <div
              v-for="product in products"
              :key="product.id"
              class="product-item"
              @click="router.push(`/product/${product.id}`)"
            >
              <img :src="product.image" :alt="product.name" />
              <h4>{{ product.name }}</h4>
              <p class="price">¥{{ product.price }}</p>
            </div>
          </div>
          <van-list
            v-model:loading="loading"
            v-model:finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
          />
        </div>
      </div>
    </van-pull-refresh>

    <!-- 底部导航 -->
    <AppFooter />
  </div>
</template>

<style scoped>
.category-view {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: 50px;
}

.search-bar {
  padding: 10px;
}

.category-container {
  display: flex;
  flex: 1;
  overflow: hidden;
}

:deep(.van-sidebar) {
  height: calc(100vh - 120px);
  flex-shrink: 0;
}

.product-list {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  height: calc(100vh - 120px);
}

.empty-state {
  padding: 50px 0;
}

.products {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.product-item {
  background: white;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  cursor: pointer;
}

.product-item img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 8px;
}

.product-item h4 {
  font-size: 14px;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.price {
  color: #ee0a24;
  font-weight: bold;
}
</style>