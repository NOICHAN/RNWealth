<template>
<VLoading :active="isLoading"></VLoading>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-10 col-md-6">
                <div class="d-flex justify-content-around align-items-center">
                    <button type="button" class="border-0 bg-transparent">
                        <font-awesome-icon icon="fa-solid fa-angle-left" />
                    </button>
                    <h2>2022年<span>07</span>月<span class="text-primary ms-3">收入</span></h2>
                    <button type="button" class="border-0 bg-transparent">
                        <font-awesome-icon icon="fa-solid fa-angle-right" />
                    </button>
                </div>
                <div class="Chart mb-5">
                    <div ref="incomePieDom" class="ChartContainer"></div>
                </div>
                <ul>
                    <li class="d-flex justify-content-around mb-3"
                    v-for="(item, index) in incomeData.data" :key="index">
                        <p>{{ item.name }}(<span></span>%)</p>
                        <p>${{ $filters.currency(item.value) }}</p>
                    </li>
                </ul>
            </div>
            <div class="col-10 col-md-6">
                <div class="d-flex justify-content-around align-items-center">
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
    .Chart {
        width: 100%;
        height: 450px;
    }
    .ChartContainer {
        width: 100%;
        height: 100%;
    }
</style>

<script setup>
import { ref, onMounted, inject } from 'vue';
import { Api } from '@/api/index';
import errorHandler from '@/utils/errorHandler';
import incomePie from '@/library/incomePie';

const swal = inject('$swal');
const isLoading = ref(false);
let userId = null;
const incomeDate = ref({});
const expenditureDate = ref({});
const incomePieDom = ref();
const incomeData = ref({
  data: [],
  total: null,
});
const expenditureData = ref({
  data: [],
  total: null,
});

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  incomeDate.value.year = year;
  incomeDate.value.month = month;
  expenditureDate.value.year = year;
  expenditureDate.value.month = month;
};

const getIncomePie = (data) => {
  const { setOption, resize } = incomePie(incomePieDom.value);
  setOption(data);
  window.addEventListener('resize', () => {
    resize();
  });
};

const filterIncomeData = (item) => {
  const income = item.filter((element) => element.category === 'income');
  let total = income[0].money;
  incomeData.value.data.push({
    value: income[0].money,
    name: income[0].item,
  });
  for (let i = 1; i < income.length; i += 1) {
    const isItem = incomeData.value.data.find((element) => element.name === income[i].item);
    if (!isItem) {
      incomeData.value.data.push({
        value: income[i].money,
        name: income[i].item,
      });
    } else {
      const isIndex = incomeData.value.data.findIndex((element) => element.name === income[i].item);
      incomeData.value.data[isIndex].value += income[i].money;
    }
    console.log(i, total);
    console.log(i, income[i].money);
    total += income[i].money;
  }
  console.log('total', total);
  incomeData.value.total = total;
};

const filterExpenditureData = (item) => {
  const expenditure = item.filter((element) => element.category === 'expenditure');
  let total = 0;
  for (let i = 0; i < expenditure.length; i += 1) {
    expenditureData.value.data.push({
      value: expenditure[i].money,
      name: expenditure[i].item,
    });
    total += expenditure[i].money;
  }
  expenditureData.value.total = total;
};

const getBalanceSheet = async () => {
  try {
    isLoading.value = true;
    const config = {
      params: {
        userId,
        year: incomeDate.value.year,
        month: incomeDate.value.month,
      },
    };
    const balanceSheetData = await Api.getBalanceSheet(config);
    filterIncomeData(balanceSheetData);
    filterExpenditureData(balanceSheetData);
  } catch (error) {
    errorHandler(swal.fire);
    throw new Error(`[graphAnalysisGetBalanceSheet] error : ${error.message}`);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  const getIdCookie = document.cookie.replace(/(?:(?:^|.*;\s*)RNWealthId\s*=\s*([^;]*).*$)|^.*$/, '$1');
  userId = parseInt(getIdCookie, 10);
  getTodayDate();
  await getBalanceSheet();
  getIncomePie(incomeData.value);
});
</script>
