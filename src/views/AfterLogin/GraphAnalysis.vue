<template>
    <div class="container my-5">
        <div class="row">
            <div class="col-8 col-md-5">
                <div class="d-flex justify-content-around align-items-center mb-4">
                    <button type="button" class="border-0 bg-transparent">
                        <font-awesome-icon icon="fa-solid fa-angle-left" />
                    </button>
                    <h2>2022年<span>07</span>月<span class="text-primary ms-3">收入</span></h2>
                    <button type="button" class="border-0 bg-transparent">
                        <font-awesome-icon icon="fa-solid fa-angle-right" />
                    </button>
                </div>

                <ul>
                    <li class="d-flex justify-content-around mb-3">
                        <p>薪資(<span>50</span>%)</p>
                        <p>$8000</p>
                    </li>
                    <li class="d-flex justify-content-around mb-3">
                        <p>投資(<span>50</span>%)</p>
                        <p>$8000</p>
                    </li>
                </ul>
            </div>
            <div class="col-8 col-md-5">
                <div class="d-flex justify-content-around align-items-center mb-4">
                    <button type="button" class="border-0 bg-transparent">
                        <font-awesome-icon icon="fa-solid fa-angle-left" />
                    </button>
                    <h2>2022年<span>07</span>月<span class="text-danger ms-3">支出</span></h2>
                    <button type="button" class="border-0 bg-transparent">
                        <font-awesome-icon icon="fa-solid fa-angle-right" />
                    </button>
                </div>

                <ul>
                    <li class="d-flex justify-content-around mb-3">
                        <p>早餐(<span>33</span>%)</p>
                        <p>$5000</p>
                    </li>
                    <li class="d-flex justify-content-around mb-3">
                        <p>衣服(<span>50</span>%)</p>
                        <p>$10000</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    ul {
        padding-left: 0;
        li {
            list-style: none;
             p {
                margin-bottom: 0;
            }
        }
    }
</style>

<script setup>
import { ref, onMounted } from 'vue';

const userId = ref({});

onMounted(() => {
  userId.value = document.cookie.replace(/(?:(?:^|.*;\s*)RNWealthId\s*=\s*([^;]*).*$)|^.*$/, '$1');
});
</script>
