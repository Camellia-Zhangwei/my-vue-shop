<!-- src/views/HomeView.vue -->
<script setup>
defineOptions({ name: 'HomeView' })

import { ref, onMounted, computed } from 'vue'
import { useProductStore } from '@/stores/product.store'
import { useRouter } from 'vue-router'
import AppNavbar from '@/components/AppNavbar.vue'
import AppFooter from '@/components/AppFooter.vue'
import { Search, Swipe, SwipeItem, Grid, GridItem, Tag } from 'vant'

const router = useRouter()
const productStore = useProductStore()

const searchKeyword = ref('')
const banners = computed(() => productStore.banners)
const categories = computed(() => productStore.categories.slice(0, 8))
const hotProducts = computed(() => productStore.products.filter(p => p.isHot).slice(0, 6))
const newProducts = computed(() => productStore.products.filter(p => p.isNew).slice(0, 6))

const handleSearch = () => {
  if (searchKeyword.value.trim()) {
    router.push(`/category?keyword=${encodeURIComponent(searchKeyword.value)}`)
  }
}

const goToCategory = (categoryId) => {
  router.push(`/category/${categoryId}`)
}

const goToProduct = (productId) => {
  router.push(`/product/${productId}`)
}

onMounted(() => {
  console.log('HomeView mounted')
})
</script>

<template>
  <div class="home-view">
    <!-- 导航栏 -->
    <AppNavbar title="E-Shop">
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

    <!-- 轮播图 -->
    <div class="banner-section">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="banner in banners" :key="banner.id">
          <img :src="banner.image" :alt="banner.title" @click="goToProduct(banner.productId)" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 分类导航 -->
    <div class="category-section">
      <h3>商品分类</h3>
      <van-grid :column-num="4" :border="false">
        <van-grid-item
          v-for="category in categories"
          :key="category.id"
          @click="goToCategory(category.id)"
        >
          <img :src="category.icon" :alt="category.name" />
          <span>{{ category.name }}</span>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 热门推荐 -->
    <div class="product-section">
      <div class="section-header">
        <h3>热门推荐</h3>
        <van-tag type="danger" plain>Hot</van-tag>
      </div>
      <div class="product-list">
        <div
          v-for="product in hotProducts"
          :key="product.id"
          class="product-item"
          @click="goToProduct(product.id)"
        >
          <img :src="product.image" :alt="product.name" />
          <h4>{{ product.name }}</h4>
          <p class="price">¥{{ product.price }}</p>
          <van-tag v-if="product.isHot" type="danger">热销</van-tag>
        </div>
      </div>
    </div>

    <!-- 新品上市 -->
    <div class="product-section">
      <div class="section-header">
        <h3>新品上市</h3>
        <van-tag type="primary" plain>New</van-tag>
      </div>
      <div class="product-list">
        <div
          v-for="product in newProducts"
          :key="product.id"
          class="product-item"
          @click="goToProduct(product.id)"
        >
          <img :src="product.image" :alt="product.name" />
          <h4>{{ product.name }}</h4>
          <p class="price">¥{{ product.price }}</p>
          <van-tag v-if="product.isNew" type="primary">新品</van-tag>
        </div>
      </div>
    </div>

    <!-- 底部导航 -->
    <AppFooter />
  </div>
</template>

<style scoped>
.home-view {
  padding-bottom: 50px;
}

.search-bar {
  padding: 10px;
}

.banner-section {
  margin: 10px 0;
}

.banner-section img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}

.category-section {
  padding: 0 10px 20px;
}

.category-section h3 {
  margin: 20px 0 10px;
  font-size: 18px;
}

:deep(.van-grid-item__content) {
  padding: 10px 0;
}

:deep(.van-grid-item__content img) {
  width: 40px;
  height: 40px;
  margin-bottom: 5px;
}

.product-section {
  padding: 0 10px 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 10px;
}

.product-list {
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
  margin-bottom: 5px;
}
</style>