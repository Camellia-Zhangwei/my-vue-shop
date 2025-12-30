<template>
  <div class="product-card" @click="handleClick">
    <div class="product-image-wrapper">
      <img
        :src="product.image"
        :alt="product.name"
        class="product-image"
        loading="lazy"
        @error="handleImageError"
      />
      <div class="product-tags">
        <van-tag v-if="product.isNew" type="danger" size="small">新品</van-tag>
        <van-tag v-if="product.isHot" type="warning" size="small">热卖</van-tag>
        <van-tag v-if="product.discount" plain type="success" size="small">
          {{ product.discount }}折
        </van-tag>
      </div>
    </div>
    
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-desc" v-if="product.description">
        {{ product.description }}
      </p>
      
      <div class="product-price-section">
        <div class="price-main">
          <span class="price-current">¥{{ formatPrice(product.price) }}</span>
          <span v-if="product.originalPrice" class="price-original">
            ¥{{ formatPrice(product.originalPrice) }}
          </span>
        </div>
        <div class="product-sales" v-if="product.sales">
          已售{{ product.sales }}
        </div>
      </div>
      
      <slot name="actions">
        <div class="product-actions" v-if="showActions">
          <van-button
            size="small"
            type="primary"
            round
            @click.stop="handleAddToCart"
          >
            加入购物车
          </van-button>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { Toast } from 'vant'

const props = defineProps({
  product: {
    type: Object,
    required: true,
    default: () => ({})
  },
  showActions: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['click', 'add-to-cart'])

const handleClick = () => {
  emit('click', props.product)
}

const handleAddToCart = () => {
  emit('add-to-cart', props.product)
  Toast.success('已加入购物车')
}

const handleImageError = (e) => {
  e.target.src = 'https://via.placeholder.com/300x300?text=商品图片'
}

const formatPrice = (price) => {
  return parseFloat(price).toFixed(2)
}
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
}

.product-image-wrapper {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 75%; /* 4:3 比例 */
  overflow: hidden;
  background: #f5f5f5;
}

.product-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-tags {
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 1;
}

.product-info {
  padding: 12px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-name {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 0 0 6px 0;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-desc {
  font-size: 12px;
  color: #666;
  margin: 0 0 8px 0;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  flex: 1;
}

.product-price-section {
  margin-top: auto;
}

.price-main {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 4px;
}

.price-current {
  color: #ff4444;
  font-size: 18px;
  font-weight: bold;
}

.price-original {
  color: #999;
  font-size: 12px;
  text-decoration: line-through;
}

.product-sales {
  font-size: 11px;
  color: #999;
}

.product-actions {
  margin-top: 10px;
}

:deep(.van-button) {
  width: 100%;
}
</style>