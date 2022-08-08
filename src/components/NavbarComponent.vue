<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary">
    <div class="container-fluid">
      <router-link class="navbar-brand text-secondary" to="/">RNWealth</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto" v-if="!user.id">
          <li class="nav-item">
            <router-link class="nav-link" to="/login">登入</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/signup">註冊</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto align-items-lg-center" v-else>
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard/book">
            <i class="bi bi-book-half"></i>
            我的帳本</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard/graph">
            <i class="bi bi-pie-chart-fill"></i>
            圖表分析</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard/setting">
            <i class="bi bi-gear"></i>
            設定</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="logout">
              <i class="bi bi-box-arrow-right"></i>
              登出</a>
          </li>
          <li class="nav-item">
            <div class="p-2 d-flex flex-lg-column align-items-md-center">
              <img src="https://images.unsplash.com/photo-1639781360241-dadbe5c28dce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bW9uZXl8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" class="avatar" alt="avatar">
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
  .container-fluid .navbar-brand {
    font-weight: bold;
  }
  .navbar-nav .nav-link {
    color: #495057;

    &:hover {
        color: #F2542D;
        }

    &.router-link-active {
        color: #F2542D;
        font-weight: 500;
        }
}
</style>

<script setup>
import { ref, onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';

const axios = inject('axios');
const user = ref({});
const router = useRouter();

const logout = () => {
  document.cookie = 'RNWealthToken=; max-age=1;';
  document.cookie = 'RNWealthNickname=; max-age=1;';
  document.cookie = 'RNWealthId=; max-age=1;';
  axios.defaults.headers.common.Authorization = `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')}`;
  user.value = {};
  router.push('/');
};

onMounted(() => {
  const getNicknameCookie = document.cookie.replace(/(?:(?:^|.*;\s*)RNWealthNickname\s*=\s*([^;]*).*$)|^.*$/, '$1');
  const getIdCookie = document.cookie.replace(/(?:(?:^|.*;\s*)RNWealthId\s*=\s*([^;]*).*$)|^.*$/, '$1');
  if (getIdCookie) {
    user.value.nickname = getNicknameCookie;
    user.value.id = getIdCookie;
  }
});

</script>
