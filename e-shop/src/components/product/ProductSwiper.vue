<template>
  <div class="product-swiper">
    <!-- 主图轮播区域 -->
    <van-swipe
      v-model:active="current"
      :loop="images.length > 1"
      :autoplay="images.length > 1 ? 3000 : 0"
      class="main-swiper"
    >
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image" alt="商品图片" class="swipe-image" />
      </van-swipe-item>
    </van-swipe>

    <!-- 视频按钮（可选） -->
    <div v-if="showVideoButton" class="video-button" @click="handleVideoClick">
      <van-icon name="play-circle-o" size="24" />
    </div>

    <!-- 缩略图导航 -->
    <div v-if="images.length > 1" class="thumbnail-container">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="thumbnail-item"
        :class="{ active: current === index }"
        @click="current = index"
      >
        <img :src="image" alt="缩略图" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  images: {
    type: Array,
    required: true,
    default: () => [],
  },
  showVideoButton: {
    type: Boolean,
    default: false,
  },
  // 可扩展：videoUrl 用于跳转或播放
  videoUrl: {
    type: String,
    default: '',
  },
});

const current = ref(0);
const router = useRouter();

const handleVideoClick = () => {
  if (props.videoUrl) {
    // 示例：跳转到视频页面（你可根据实际需求改为弹窗播放等）
    router.push({ name: 'Video', query: { url: props.videoUrl } });
  } else {
    // 或者提示“暂无视频”
    console.log('暂无商品视频');
  }
};

// 外部可通过 v-model:active 控制当前索引（可选）
defineExpose({ current });
</script>

<style scoped>
.product-swiper {
  position: relative;
  width: 100%;
}

.main-swiper {
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
}

.swipe-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-button {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  z-index: 10;
  transition: background-color 0.3s ease;
}

.video-button:hover {
  background: rgba(0, 0, 0, 0.8);
}

.thumbnail-container {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 12px;
}

.thumbnail-item {
  width: 60px;
  height: 60px;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.thumbnail-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-item.active {
  opacity: 1;
  border: 2px solid #1989fa;
  box-sizing: border-box;
}

/* 桌面端优化 */
@media (min-width: 768px) {
  .main-swiper {
    height: 500px;
  }

  .thumbnail-item {
    width: 80px;
    height: 80px;
  }
}
</style>