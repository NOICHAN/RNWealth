<template>
<VLoading :active="isLoading"></VLoading>
<div class="container-fluid">
    <div class="row mt-5 mt-md-0">
        <div class="col d-none d-md-block">
            <img src="https://images.unsplash.com/photo-1621504450181-5d356f61d307?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" class="signUpImg" alt="money">
        </div>
        <div class="col">
            <h2 class="text-center my-5">RNWealth 會員註冊</h2>
            <v-form v-slot="{ errors }" class="signUpForm mb-5" @submit="signUp">
                <div class="form-floating mb-3">
                    <v-field type="email" class="form-control"
                    id="signUpAccount" name="Email"
                    rules="email|required" :class="{ 'is-invalid': errors['Email'] }"
                    v-model="user.email"></v-field>
                    <!--  eslint-disable-next-line vuejs-accessibility/label-has-for -->
                    <label for="signUpAccount">EMail 帳號</label>
                    <error-message class="invalid-feedback" name="Email">
                    </error-message>
                </div>
                <div class="form-floating mb-4">
                    <v-field type="password" class="form-control"
                    id="signUpPassword" name="密碼"
                    rules="required" :class="{ 'is-invalid': errors['密碼'] }"></v-field>
                    <!--  eslint-disable-next-line vuejs-accessibility/label-has-for -->
                    <label for="signUpPassword">密碼</label>
                    <error-message class="invalid-feedback" name="密碼">
                    </error-message>
                </div>
                <div class="form-floating mb-4">
                    <v-field type="password" class="form-control"
                    id="signUpConfirmPassword" name="確認密碼"
                    rules="confirmed:@密碼|required"
                    :class="{ 'is-invalid': errors['確認密碼'] }"
                    v-model="user.password"></v-field>
                    <!--  eslint-disable-next-line vuejs-accessibility/label-has-for -->
                    <label for="signUpConfirmPassword">確認密碼</label>
                    <error-message class="invalid-feedback" name="確認密碼">
                    </error-message>
                </div>
                <div class="form-floating mb-4">
                    <v-field type="text" class="form-control"
                    id="signUpName" name="名字"
                    rules="required" :class="{ 'is-invalid': errors['名字'] }"
                    v-model="user.nickname"></v-field>
                    <!--  eslint-disable-next-line vuejs-accessibility/label-has-for -->
                    <label for="signUpName">名字</label>
                    <error-message class="invalid-feedback" name="名字">
                    </error-message>
                </div>
                <button type="submit" class="btn btn-primary mb-2 signUpBtn">註冊</button>
                <router-link class="btn btn-outline-light signUpBtn"
                to="/login">登入</router-link>
            </v-form>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
    .signUpImg {
        width: 100%;
        height: 670px;
        object-fit: cover;
        object-position: center center;
    }
    .signUpForm {
        width: 80%;
        margin: 0 auto;
        border: 1px solid #adb5bd;
        padding: 5%;
        .signUpBtn {
            width: 100%;
        }
    }
</style>

<script setup>
import errorHandler from '@/utils/errorHandler';
import { ref, inject } from 'vue';

const axios = inject('axios');
const swal = inject('$swal');
const isLoading = ref(false);

const user = ref({
  email: '',
  password: '',
  nickname: '',
});

const signUp = async () => {
  try {
    isLoading.value = true;
    const { data } = await axios.post('signup', user.value);
    axios.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
    const body = {
      userId: data.user.id,
      fixedIncome: 0,
      date: '1',
      isEnable: 0,
    };
    await axios.post('monthly-allocation', body);
    axios.defaults.headers.common.Authorization = '';
    swal.fire({
      icon: 'success',
      title: '成功',
      text: '恭喜註冊成功，請移至登入頁面重新登入。',
    });
  } catch (error) {
    if (error.response.status === 400) {
      errorHandler(swal.fire, 'signupError');
    } else {
      errorHandler(swal.fire);
    }
    throw new Error(`[signUp] error : ${error.message}`);
  } finally {
    isLoading.value = false;
  }
};
</script>
