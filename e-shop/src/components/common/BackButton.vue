<template>
  <div 
    :class="['back-button', `back-button--${size}`, mode, { 'round': round }]" 
    @click="handleClick"
  >
    <van-icon name="arrow-left" class="back-icon" />
    <span class="back-text" v-if="showText && !round">{{ text }}</span>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  // 是否显示文字
  showText: {
    type: Boolean,
    default: true
  },
  
  // 返回按钮文字
  text: {
    type: String,
    default: '返回'
  },
  
  // 自定义返回路径
  to: {
    type: [String, Object],
    default: ''
  },
  
  // 自定义点击事件
  customAction: {
    type: Function,
    default: null
  },
  
  // 按钮大小
  size: {
    type: String,
    default: 'normal',
    validator: (value) => ['small', 'normal', 'large'].includes(value)
  },
  
  // 模式
  mode: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'dark', 'light', 'transparent'].includes(value)
  },
  
  // 是否圆形
  round: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])
const router = useRouter()

const handleClick = (event) => {
  // 触发点击事件
  emit('click', event)
  
  // 如果有自定义动作，执行自定义动作
  if (props.customAction && typeof props.customAction === 'function') {
    props.customAction()
    return
  }
  
  // 如果有自定义路径，导航到指定路径
  if (props.to) {
    if (typeof props.to === 'string') {
      router.push(props.to)
    } else if (typeof props.to === 'object') {
      router.push(props.to)
    }
    return
  }
  
  // 默认返回上一页
  if (window.history.length > 1) {
    router.back()
  } else {
    // 如果没有历史记录，返回首页
    router.push('/')
  }
}
</script>

<style scoped>
.back-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease;
  border-radius: 20px;
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.2);
}

.back-button:hover {
  background: rgba(102, 126, 234, 0.2);
  transform: translateX(-2px);
}

.back-button:active {
  transform: translateX(0);
  background: rgba(102, 126, 234, 0.15);
}

.back-icon {
  color: #667eea;
  transition: color 0.3s ease;
}

.back-text {
  color: #667eea;
  font-weight: 500;
  transition: color 0.3s ease;
}

/* 尺寸样式 */
.back-button--small {
  padding: 4px 8px;
  font-size: 12px;
}

.back-button--small .back-icon {
  font-size: 14px;
  margin-right: 2px;
}

.back-button--normal {
  padding: 8px 12px;
  font-size: 14px;
}

.back-button--normal .back-icon {
  font-size: 16px;
  margin-right: 4px;
}

.back-button--large {
  padding: 12px 16px;
  font-size: 16px;
}

.back-button--large .back-icon {
  font-size: 18px;
  margin-right: 6px;
}

/* 模式样式 */
.back-button.dark {
  background: rgba(0, 0, 0, 0.1);
  border-color: rgba(0, 0, 0, 0.2);
}

.back-button.dark .back-icon,
.back-button.dark .back-text {
  color: #333;
}

.back-button.light {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

.back-button.light .back-icon,
.back-button.light .back-text {
  color: white;
}

.back-button.transparent {
  background: transparent;
  border: none;
  padding: 4px;
}

.back-button.transparent .back-icon,
.back-button.transparent .back-text {
  color: #667eea;
}

/* 圆形样式 */
.back-button.round {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 8px;
}

.back-button.round .back-text {
  display: none;
}

.back-button.round.back-button--small {
  width: 32px;
  height: 32px;
  padding: 6px;
}

.back-button.round.back-button--normal {
  width: 40px;
  height: 40px;
  padding: 8px;
}

.back-button.round.back-button--large {
  width: 48px;
  height: 48px;
  padding: 12px;
}

/* 禁用状态 */
.back-button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.back-button.disabled:hover {
  background: rgba(102, 126, 234, 0.1);
  transform: none;
}
</style>

<style>
/* 全局样式，用于在van-nav-bar中使用 */
.back-button-in-navbar {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 12px;
  cursor: pointer;
}

.back-button-in-navbar .back-icon {
  font-size: 20px;
  color: #1989fa;
}

.back-button-in-navbar .back-text {
  margin-left: 4px;
  font-size: 14px;
  color: #1989fa;
}
</style>