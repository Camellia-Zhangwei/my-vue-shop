<!-- src/views/LoginView.vue -->
<script setup>
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.store'
import { Toast } from 'vant'
import AppNavbar from '@/components/AppNavbar.vue'
import { validateUsername, validatePassword } from '@/utils/validators'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const loginForm = reactive({
  username: '',
  password: ''
})
const loading = ref(false)

const handleLogin = async () => {
  if (!loginForm.username.trim() || !loginForm.password.trim()) {
    Toast('请输入完整的登录信息')
    return
  }
  if (!validateUsername(loginForm.username)) {
    Toast('用户名格式不正确')
    return
  }
  if (!validatePassword(loginForm.password)) {
    Toast('密码格式不正确')
    return
  }

  loading.value = true
  try {
    await userStore.login(loginForm)
    Toast.success('登录成功')
    
    // 修正: 更健壮的路由跳转
    const redirect = route.query.redirect;
    if (redirect) {
      router.push(redirect);
    } else if (window.history.state && window.history.state.back) {
      router.back();
    } else {
      router.push('/');
    }
  } catch (error) {
    Toast('登录失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

const handleGuestLogin = () => {
  loginForm.username = 'guest'
  loginForm.password = 'guest123'
  handleLogin()
}

const handleWeChatLogin = () => {
  Toast('微信登录功能开发中')
}

const handleQQLogin = () => {
  Toast('QQ登录功能开发中')
}
</script>

<template>
  <div class="login-view">
    <!-- 导航栏 -->
    <AppNavbar title="登录" />

    <!-- 登录表单 -->
    <div class="login-form">
      <van-form @submit="handleLogin">
        <van-field
          v-model="loginForm.username"
          name="username"
          label="用户名"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="loginForm.password"
          type="password"
          name="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit" :loading="loading">
            登录
          </van-button>
        </div>
      </van-form>

      <!-- 第三方登录 -->
      <div class="third-party-login">
        <p>其他登录方式</p>
        <div class="login-buttons">
          <van-button square type="info" icon="wechat" @click="handleWeChatLogin" />
          <van-button square type="primary" icon="qq" @click="handleQQLogin" />
        </div>
        <div class="guest-login" @click="handleGuestLogin">
          游客登录
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-view {
  padding: 20px;
  min-height: 100vh;
  background: #f5f5f5;
}

.login-form {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.third-party-login {
  text-align: center;
  margin-top: 30px;
}

.third-party-login p {
  color: #999;
  margin-bottom: 15px;
}

.login-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.guest-login {
  color: #1989fa;
  font-size: 14px;
  cursor: pointer;
}
</style>