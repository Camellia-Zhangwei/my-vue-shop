<template>
  <van-nav-bar
    :title="title"
    :left-arrow="showLeftArrow"
    @click-left="handleLeftClick"
    @click-right="handleRightClick"
    fixed
    placeholder
    safe-area-inset-top
  >
    <!-- 左侧插槽 -->
    <template #left v-if="$slots.left">
      <slot name="left"></slot>
    </template>
    
    <!-- 右侧插槽 -->
    <template #right v-if="$slots.right">
      <slot name="right"></slot>
    </template>
    
    <!-- 默认右侧内容 -->
    <template #right v-else-if="rightText">
      <van-button
        size="small"
        :type="rightType"
        plain
        @click="handleRightClick"
      >
        {{ rightText }}
      </van-button>
    </template>
  </van-nav-bar>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  showLeftArrow: {
    type: Boolean,
    default: true
  },
  leftPath: {
    type: [String, Object],
    default: ''
  },
  leftAction: {
    type: Function,
    default: null
  },
  rightText: {
    type: String,
    default: ''
  },
  rightType: {
    type: String,
    default: 'primary'
  },
  rightAction: {
    type: Function,
    default: null
  }
})

const emit = defineEmits(['left-click', 'right-click'])
const router = useRouter()

const handleLeftClick = () => {
  emit('left-click')
  
  if (props.leftAction && typeof props.leftAction === 'function') {
    props.leftAction()
    return
  }
  
  if (props.leftPath) {
    if (typeof props.leftPath === 'string') {
      router.push(props.leftPath)
    } else if (typeof props.leftPath === 'object') {
      router.push(props.leftPath)
    }
    return
  }
  
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}

const handleRightClick = () => {
  emit('right-click')
  
  if (props.rightAction && typeof props.rightAction === 'function') {
    props.rightAction()
  }
}
</script>

<style scoped>
:deep(.van-nav-bar) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

:deep(.van-nav-bar__title) {
  color: white;
  font-weight: bold;
  font-size: 16px;
}

:deep(.van-nav-bar__arrow) {
  color: white;
  font-size: 20px;
}

:deep(.van-nav-bar__right) {
  padding-right: 12px;
}

:deep(.van-button) {
  height: 28px;
  line-height: 26px;
  font-size: 12px;
}
</style>