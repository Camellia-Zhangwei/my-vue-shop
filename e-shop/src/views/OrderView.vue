<!-- src/views/OrderView.vue -->
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AppNavbar from '@/components/AppNavbar.vue'
import AppFooter from '@/components/AppFooter.vue'
import { Tab, Tabs, List, PullRefresh, Empty, Card } from 'vant'

const route = useRoute()

const activeTab = ref(route.query.status || 'all')
const refreshing = ref(false)
const loading = ref(false)
const finished = ref(false)
const list = ref([])
const page = ref(1)

const tabList = [
  { name: 'all', title: '全部订单' },
  { name: 'pending', title: '待付款' },
  { name: 'shipped', title: '待发货' },
  { name: 'delivered', title: '待收货' },
  { name: 'completed', title: '已完成' }
]

const onLoad = () => {
  setTimeout(() => {
    // 模拟加载更多数据
    for (let i = 0; i < 5; i++) {
      list.value.push({
        id: `${page.value * 5 + i}`,
        status: activeTab.value,
        amount: (Math.random() * 1000).toFixed(2),
        items: [
          { name: '商品' + (page.value * 5 + i), image: 'https://via.placeholder.com/100' }
        ]
      })
    }
    loading.value = false
    if (page.value >= 3) {
      finished.value = true
    }
    page.value++
  }, 1000)
}

const onRefresh = () => {
  setTimeout(() => {
    list.value = []
    page.value = 1
    finished.value = false
    refreshing.value = false
  }, 1000)
}

const onChangeTab = (name) => {
  activeTab.value = name
  list.value = []
  page.value = 1
  finished.value = false
}

onMounted(() => {
  onLoad()
})
</script>

<template>
  <div class="order-view">
    <!-- 导航栏 -->
    <AppNavbar title="我的订单" />

    <!-- 标签页 -->
    <van-tabs v-model:active="activeTab" @change="onChangeTab" color="#1989fa">
      <van-tab v-for="tab in tabList" :key="tab.name" :name="tab.name" :title="tab.title" />
    </van-tabs>

    <!-- 订单列表 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <div class="order-list">
        <div v-if="list.length === 0" class="empty-state">
          <van-empty description="暂无订单" />
        </div>
        <van-card
          v-for="order in list"
          :key="order.id"
          :price="order.amount"
          :title="'订单号: ' + order.id"
          :thumb="order.items[0].image"
        >
          <template #desc>
            <div>共 {{ order.items.length }} 件商品</div>
            <div class="order-status">状态: {{ order.status }}</div>
          </template>
          <template #bottom>
            <div class="order-actions">
              <van-button size="mini" type="primary">查看详情</van-button>
              <van-button size="mini" type="danger">取消订单</van-button>
            </div>
          </template>
        </van-card>
        <van-list
          v-model:loading="loading"
          v-model:finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
        />
      </div>
    </van-pull-refresh>

    <!-- 底部导航 -->
    <AppFooter />
  </div>
</template>

<style scoped>
.order-view {
  padding-bottom: 50px;
}

.order-list {
  padding: 10px;
}

.empty-state {
  padding: 50px 0;
}

:deep(.van-card) {
  margin-bottom: 10px;
}

.order-status {
  color: #999;
  margin-top: 5px;
}

.order-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}
</style>