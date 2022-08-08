<template>
<VLoading :active="isLoading"></VLoading>
<div class="container-fluid">
    <div class="row mt-5 mt-md-0">
        <div class="col d-none d-md-block">
            <img src="https://images.unsplash.com/photo-1579621970343-21c491b3f363?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" class="signInImg" alt="moneyBox">
        </div>
        <div class="col">
            <h2 class="text-center my-5">RNWealth 會員登入</h2>
            <v-form v-slot="{ errors }" class="signInForm mb-5" @submit="signIn">
                <div class="form-floating mb-3">
                    <v-field type="email" class="form-control"
                    id="signInAccount" name="Email"
                    rules="email|required" :class="{ 'is-invalid': errors['Email'] }"
                    v-model="user.email"></v-field>
                    <!--  eslint-disable-next-line vuejs-accessibility/label-has-for -->
                    <label for="signInAccount">EMail 帳號</label>
                    <error-message class="invalid-feedback" name="Email">
                    </error-message>
                </div>
                <div class="form-floating mb-4">
                    <v-field type="password" class="form-control"
                    id="signInPassword" name="密碼"
                    rules="required" :class="{ 'is-invalid': errors['密碼'] }"
                    v-model="user.password"></v-field>
                    <!--  eslint-disable-next-line vuejs-accessibility/label-has-for -->
                    <label for="signInPassword">密碼</label>
                    <error-message class="invalid-feedback" name="密碼">
                    </error-message>
                </div>
                <button type="submit" class="btn btn-primary mb-2 signInBtn">登入</button>
                <router-link class="btn btn-outline-light signInBtn"
                to="/signup">註冊</router-link>
            </v-form>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
    .signInImg {
        width: 100%;
        height: 100vh;
        object-fit: cover;
        object-position: center bottom;
    }
    .signInForm {
        width: 80%;
        margin: 0 auto;
        border: 1px solid #adb5bd;
        padding: 5%;
        .signInBtn {
            width: 100%;
        }
    }
</style>

<script setup>
import errorHandler from '@/utils/errorHandler';
import { ref, inject, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const axios = inject('axios');
const swal = inject('$swal');
const router = useRouter();
const isLoading = ref(false);

const user = ref({
  email: '',
  password: '',
});

const signIn = async () => {
  try {
    isLoading.value = true;
    const { data } = await axios.post('signin', user.value);

    document.cookie = `RNWealthToken=${data.accessToken}; max-age=86400;`;
    document.cookie = `RNWealthNickname=${data.user.nickname}; max-age=86400;`;
    document.cookie = `RNWealthId=${data.user.id}; max-age=86400;`;
    axios.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;

    swal.fire({
      icon: 'success',
      title: '成功',
      text: '登入成功。',
    });
    setTimeout(() => {
      router.go(0);
    }, 1500);
  } catch (error) {
    if (error.response.status === 400) {
      errorHandler(swal.fire, 'signInError');
    } else {
      errorHandler(swal.fire);
    }
    throw new Error(`[signIn] error : ${error.message}`);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  const getIdCookie = document.cookie.replace(/(?:(?:^|.*;\s*)RNWealthId\s*=\s*([^;]*).*$)|^.*$/, '$1');
  if (getIdCookie) {
    router.push('/dashboard/book');
  }
});
</script>
