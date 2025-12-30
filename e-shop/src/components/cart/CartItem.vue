<!-- src/components/cart/CartItem.vue -->
<template>
  <van-swipe-cell>
    <div class="cart-item">
      <van-checkbox v-model="checked" @click.stop="handleCheck" class="item-checkbox" />
      <div class="item-image" @click="handleImageClick">
        <img :src="item.image" :alt="item.name" />
      </div>
      <div class="item-info">
        <h3 class="item-name" @click="handleNameClick">{{ item.name }}</h3>
        <p class="item-desc" v-if="item.description">{{ item.description }}</p>
        <div class="item-bottom">
          <div class="item-price">¥{{ formatPrice(item.price) }}</div>
          <QuantityStepper
            :value="item.quantity"
            @change="handleQuantityChange"
            :min="1"
            :max="99"
          />
        </div>
      </div>
    </div>
    <template #right>
      <van-button square type="danger" text="删除" class="delete-button" @click="handleDelete" />
    </template>
  </van-swipe-cell>
</template>

<script setup>
import { useRouter } from 'vue-router'
import QuantityStepper from './QuantityStepper.vue'

const props = defineProps({
  item: { type: Object, required: true },
  checked: { type: Boolean, default: false }
})

const emit = defineEmits(['update:checked', 'quantity-change', 'delete'])

const router = useRouter()

const handleCheck = () => {
  emit('update:checked', !props.checked)
}

const handleQuantityChange = (newQuantity) => {
  emit('quantity-change', props.item.id, newQuantity)
}

const handleDelete = () => {
  emit('delete', props.item.id)
}

const handleImageClick = () => {
  router.push(`/product/${props.item.id}`)
}

const handleNameClick = () => {
  router.push(`/product/${props.item.id}`)
}

const formatPrice = (price) => {
  return parseFloat(price).toFixed(2)
}
</script>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  padding: 12px;
  background: white;
  margin: 8px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.item-checkbox {
  margin-right: 10px;
  flex-shrink: 0;
}
.item-image {
  width: 80px;
  height: 80px;
  margin-right: 12px;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
  cursor: pointer;
}
.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.item-info {
  flex: 1;
  min-width: 0;
}
.item-name {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px 0;
  line-height: 1.4;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.item-name:hover {
  color: #667eea;
}
.item-desc {
  font-size: 12px;
  color: #666;
  margin: 0 0 8px 0;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.item-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.item-price {
  color: #ff4444;
  font-size: 16px;
  font-weight: bold;
}
.delete-button {
  height: 100%;
}
</style>