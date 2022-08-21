<template>
<VLoading :active="isLoading"></VLoading>
    <div class="container my-5">
        <div class="row justify-content-center gy-5">
            <div class="col-10 col-md-6">
                <div class="d-flex justify-content-around align-items-center">
                    <button type="button" class="border-0 bg-transparent"
                    @click="toggleMonth(-1, incomeDate)">
                        <font-awesome-icon icon="fa-solid fa-angle-left" />
                    </button>
                    <h2>{{ incomeDate.year }}年<span>{{ incomeDate.month }}</span>月
                    <span class="text-primary ms-3">收入</span></h2>
                    <button type="button" class="border-0 bg-transparent"
                    @click="toggleMonth(1, incomeDate)">
                        <font-awesome-icon icon="fa-solid fa-angle-right" />
                    </button>
                </div>
                <div class="Chart mb-5">
                    <div ref="incomePieDom" class="ChartContainer"></div>
                </div>
                <ul>
                    <li class="d-flex justify-content-around mb-3"
                    v-for="(item, index) in incomeData.data" :key="index">
                        <p>{{ item.name }} (<span>{{ item.percent }}</span>%)</p>
                        <p>${{ $filters.currency(item.value) }}</p>
                    </li>
                </ul>
            </div>
            <div class="col-10 col-md-6">
                <div class="d-flex justify-content-around align-items-center">
                    <button type="button" class="border-0 bg-transparent"
                    @click="toggleMonth(-1, expenditureDate)">
                        <font-awesome-icon icon="fa-solid fa-angle-left" />
                    </button>
                    <h2>{{ expenditureDate.year }}年<span>{{ expenditureDate.month }}</span>月
                    <span class="text-danger ms-3">支出</span></h2>
                    <button type="button" class="border-0 bg-transparent"
                    @click="toggleMonth(1, expenditureDate)">
                        <font-awesome-icon icon="fa-solid fa-angle-right" />
                    </button>
                </div>
                <div class="Chart mb-5">
                    <div ref="expenditurePieDom" class="ChartContainer"></div>
                </div>
                <ul>
                    <li class="d-flex justify-content-around mb-3"
                    v-for="(item, index) in expenditureData.data" :key="index">
                        <p>{{ item.name }} (<span>{{ item.percent }}</span>%)</p>
                        <p>${{ $filters.currency(item.value) }}</p>
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
        height: 500px;
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
import expenditurePie from '@/library/expenditurePie';

const swal = inject('$swal');
const isLoading = ref(false);
let userId = null;
const incomeDate = ref({
  type: 'income',
});
const expenditureDate = ref({
  type: 'expenditure',
});
const incomePieDom = ref();
const expenditurePieDom = ref();
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

const redistributeData = (data, location) => {
  const item = data;
  const allocationLocation = location;
  const isItem = allocationLocation.data.find((element) => element.name === item.item);
  if (!isItem) {
    allocationLocation.data.push({
      value: item.money,
      name: item.item,
    });
  } else {
    const isIndex = allocationLocation.data.findIndex((element) => element.name === item.item);
    allocationLocation.data[isIndex].value += item.money;
  }
};

const calculatePercentage = (item) => {
  const data = item;
  for (let i = 0; i < data.data.length; i += 1) {
    data.data[i].percent = (Math.round((data.data[i].value / data.total) * 10000)) / 100;
  }
};

const getIncomePie = (data) => {
  const { setOption, resize } = incomePie(incomePieDom.value);
  setOption(data);
  window.addEventListener('resize', () => {
    resize();
  });
};

const getExpenditurePie = (data) => {
  const { setOption, resize } = expenditurePie(expenditurePieDom.value);
  setOption(data);
  window.addEventListener('resize', () => {
    resize();
  });
};

const filterIncomeData = (data, location) => {
  const income = data.filter((element) => element.category === 'income');
  if (income.length === 0) return;
  const incomeRef = location;
  let total = income[0].money;
  incomeRef.data.push({
    value: income[0].money,
    name: income[0].item,
  });
  for (let i = 1; i < income.length; i += 1) {
    redistributeData(income[i], incomeRef);
    total += income[i].money;
  }
  incomeRef.total = total;
  calculatePercentage(incomeRef);
};

const filterExpenditureData = (data, location) => {
  const expenditure = data.filter((element) => element.category === 'expenditure');
  if (expenditure.length === 0) return;
  const expenditureRef = location;
  let total = expenditure[0].money;
  expenditureRef.data.push({
    value: expenditure[0].money,
    name: expenditure[0].item,
  });
  for (let i = 1; i < expenditure.length; i += 1) {
    redistributeData(expenditure[i], expenditureRef);
    total += expenditure[i].money;
  }
  expenditureRef.total = total;
  calculatePercentage(expenditureRef);
};

const getNewBalanceSheet = async (Date) => {
  try {
    isLoading.value = true;
    const config = {
      params: {
        userId,
        year: Date.year,
        month: Date.month,
      },
    };
    const balanceSheetData = await Api.getBalanceSheet(config);
    if (Date.type === 'income') {
      incomeData.value = {
        data: [],
        total: null,
      };
      filterIncomeData(balanceSheetData, incomeData.value);
      getIncomePie(incomeData.value);
    } else {
      expenditureData.value = {
        data: [],
        total: null,
      };
      filterExpenditureData(balanceSheetData, expenditureData.value);
      getExpenditurePie(expenditureData.value);
    }
  } catch (error) {
    errorHandler(swal.fire);
    throw new Error(`[graphAnalysisGetNewBalanceSheet] error : ${error.message}`);
  } finally {
    isLoading.value = false;
  }
};

const getInitBalanceSheet = async () => {
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
    filterIncomeData(balanceSheetData, incomeData.value);
    filterExpenditureData(balanceSheetData, expenditureData.value);
  } catch (error) {
    errorHandler(swal.fire);
    throw new Error(`[graphAnalysisGetInitBalanceSheet] error : ${error.message}`);
  } finally {
    isLoading.value = false;
  }
};

const toggleMonth = async (num, Date) => {
  const dateLocation = Date;
  dateLocation.month = parseInt(dateLocation.month, 10);
  dateLocation.month += num;
  if (dateLocation.month > 12) {
    dateLocation.year += 1;
    dateLocation.month = '01';
  } else if (dateLocation.month < 1) {
    dateLocation.year -= 1;
    dateLocation.month = '12';
  } else if (dateLocation.month < 10 && typeof (dateLocation.month) === 'number') {
    dateLocation.month = `0${dateLocation.month}`;
  } else if (typeof (dateLocation.month) === 'number') {
    dateLocation.month = dateLocation.month.toString();
  }
  await getNewBalanceSheet(dateLocation);
};

onMounted(async () => {
  const getIdCookie = document.cookie.replace(/(?:(?:^|.*;\s*)RNWealthId\s*=\s*([^;]*).*$)|^.*$/, '$1');
  userId = parseInt(getIdCookie, 10);
  getTodayDate();
  await getInitBalanceSheet();
  getIncomePie(incomeData.value);
  getExpenditurePie(expenditureData.value);
});
</script>
