<!-- src/components/cart/QuantityStepper.vue -->
<template>
  <div class="quantity-stepper">
    <van-button
      :disabled="value <= min"
      size="mini"
      round
      @click="handleDecrease"
      class="stepper-button"
    >
      -
    </van-button>
    <span class="quantity-value">{{ value }}</span>
    <van-button
      :disabled="value >= max"
      size="mini"
      round
      @click="handleIncrease"
      class="stepper-button"
    >
      +
    </van-button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  value: { type: Number, required: true, default: 1 },
  min: { type: Number, default: 1 },
  max: { type: Number, default: 99 },
  step: { type: Number, default: 1 }
})

const emit = defineEmits(['change'])

const handleDecrease = () => {
  const newValue = Math.max(props.min, props.value - props.step)
  if (newValue !== props.value) {
    emit('change', newValue)
  }
}

const handleIncrease = () => {
  const newValue = Math.min(props.max, props.value + props.step)
  if (newValue !== props.value) {
    emit('change', newValue)
  }
}
</script>

<style scoped>
.quantity-stepper {
  display: flex;
  align-items: center;
  gap: 8px;
}
.stepper-button {
  width: 24px;
  height: 24px;
  padding: 0;
  min-width: 0;
  border: 1px solid #e0e0e0;
  background: white;
  color: #333;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}
.stepper-button:not(:disabled):hover {
  border-color: #667eea;
  color: #667eea;
}
.stepper-button:disabled {
  background: #f5f5f5;
  color: #ccc;
  cursor: not-allowed;
}
.quantity-value {
  min-width: 30px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #333;
}
</style>