<template>
<VLoading :active="isLoading"></VLoading>
<IncomeModal ref="incomeModalRef" :income="propsData"
:account="accountList" :incomeItem="incomeItemList"
@updateIncome="updateBalanceSheet"></IncomeModal>
<ExpenditureModal ref="ExpenditureModalRef" :expenditure="propsData" :account="accountList"
:expenditureItem="expenditureItemList" @updateExpenditure="updateBalanceSheet"></ExpenditureModal>
<DeleteModal ref="DeleteRef" :deleteDataItem="propsData"
@deleteData="deleteBalanceSheetData"></DeleteModal>
    <div class="container my-5 py-5">
        <div class="row flex-column flex-md-row
        align-items-center align-items-md-start gy-5">
            <div class="col-12 col-md-7">
                <div class="mb-5 d-flex justify-content-around align-items-center">
                    <button type="button" class="btn btn-primary"
                    @click="showIncomeModal(true,'income')">新增收入</button>
                    <button type="button" class="btn btn-danger"
                    @click="showExpenditureModal(true,'expenditure')">新增支出</button>
                </div>
                <div class="text-center detail">
                    <div class="d-flex justify-content-around align-items-center">
                        <button type="button" class="border-0 bg-transparent"
                        @click="toggleDate(-1)">
                            <font-awesome-icon icon="fa-solid fa-angle-left" />
                        </button>
                        <h2><span>{{ date.year }}/{{ date.month }}/{{ date.day }}</span> 收支表 :</h2>
                        <button type="button" class="border-0 bg-transparent"
                        @click="toggleDate(1)">
                            <font-awesome-icon icon="fa-solid fa-angle-right" />
                        </button>
                    </div>
                    <p class="h1 my-5" v-if="balanceSheetList.length === 0">今日尚未有任何資料。</p>
                    <table class="table" v-else>
                      <thead>
                        <tr>
                          <th>時間</th>
                          <th>帳戶</th>
                          <th>項目</th>
                          <th>金額</th>
                          <th>編輯/刪除</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="border-transparent"
                        v-for="item in balanceSheetList" :key="item.id">
                          <td class="text-nowrap">{{ item.time }}</td>
                          <td class="balanceSheetList">{{ item.account }}</td>
                          <td class="balanceSheetList">{{ item.item }}</td>
                          <td class="text-end pe-0 pe-lg-5 text-nowrap"
                          :class="{'text-primary': item.category === 'income',
                            'text-danger': item.category === 'expenditure'}">
                            $ {{ $filters.currency(item.money) }}</td>
                          <td class="text-nowrap">
                            <button type="button" class="border-0 bg-transparent px-1 px-lg-2 me-2"
                            v-if="item.category === 'income'"
                            @click="showIncomeModal(false,'income',item)">
                              <font-awesome-icon icon="fa-solid fa-pen-to-square"
                                    class="text-primary fs-3" />
                            </button>
                            <button type="button" class="border-0 bg-transparent px-1 px-lg-2 me-2"
                            v-else
                            @click="showExpenditureModal(false,'expenditure',item)">
                              <font-awesome-icon icon="fa-solid fa-pen-to-square"
                                    class="text-primary fs-3" />
                            </button>
                              <button type="button" class="border-0 bg-transparent px-1 px-lg-2"
                                @click="showDeleteModal(item)">
                                <font-awesome-icon icon="fa-solid fa-trash-can"
                                    class="text-danger fs-3" />
                              </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                </div>
            </div>
            <div class="col-12 col-md-5 d-flex flex-column
              align-items-center account">
                <div class="card mb-3" style="width: 18rem;"
                v-for="item in accountList" :key="item.id">
                    <img src="" class="card-img-top" alt="">
                    <div class="card-body">
                        <h3>{{ item.title }}</h3>
                        <p class="card-text">${{ $filters.currency(item.currentMoney) }}</p>
                    </div>
                </div>
                <div class="card mb-3" style="width: 18rem;">
                    <img src="" class="card-img-top" alt="">
                    <div class="card-body">
                        <h3>總計</h3>
                        <p class="card-text">${{ $filters.currency(totalAssets) }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    p {
        margin-bottom: 0;
    }
    table {
      table-layout: fixed;
      tbody tr {
        border-color: transparent;
        &:hover {
          background: #b7dbfa;
        }
      }
    }
    .balanceSheetList {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .account {
      height: calc(100vh - 64px - 102.4px);
    }
</style>

<script setup>
import IncomeModal from '@/components/IncomeModal.vue';
import ExpenditureModal from '@/components/ExpenditureModal.vue';
import DeleteModal from '@/components/DeleteModal.vue';
import errorHandler from '@/utils/errorHandler';
import { Api } from '@/api/index';
import { ref, onMounted, inject } from 'vue';

const incomeModalRef = ref({});
const ExpenditureModalRef = ref({});
const DeleteRef = ref({});

const axios = inject('axios');
const swal = inject('$swal');
const isLoading = ref(false);
const isNew = ref(true);
const propsData = ref({});
let beforePropsData = {};
let userId = null;

const balanceSheetList = ref([]);
const accountList = ref([]);
const incomeItemList = ref([]);
const expenditureItemList = ref([]);
const date = ref({});
const totalAssets = ref(0);

const getTodayDate = () => {
  const today = new Date();
  let month = today.getMonth() + 1;
  let day = today.getUTCDate();
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  date.value.year = today.getFullYear();
  date.value.month = month;
  date.value.day = day;
};

const getAllAccount = async () => {
  try {
    isLoading.value = true;
    const config = {
      params: {
        userId,
      },
    };
    const accountData = await Api.getAllAccount(config);
    accountList.value = accountData;
  } catch (error) {
    errorHandler(swal.fire);
    throw new Error(`[getAllAccount] error : ${error.message}`);
  } finally {
    isLoading.value = false;
  }
};

const getAllIncomeItem = async () => {
  try {
    isLoading.value = true;
    const config = {
      params: {
        userId,
      },
    };
    const incomeItemData = await Api.getAllIncomeItem(config);
    incomeItemList.value = incomeItemData;
  } catch (error) {
    errorHandler(swal.fire);
    throw new Error(`[getAllIncomeItem] error : ${error.message}`);
  } finally {
    isLoading.value = false;
  }
};

const getAllExpenditureItem = async () => {
  try {
    isLoading.value = true;
    const config = {
      params: {
        userId,
      },
    };
    const expenditureItemData = await Api.getAllExpenditureItem(config);
    expenditureItemList.value = expenditureItemData;
  } catch (error) {
    errorHandler(swal.fire);
    throw new Error(`[getAllExpenditureItem] error : ${error.message}`);
  } finally {
    isLoading.value = false;
  }
};

const getBalanceSheet = async () => {
  try {
    isLoading.value = true;
    const config = {
      params: {
        userId,
        year: date.value.year,
        month: date.value.month,
        day: date.value.day,
      },
    };
    const balanceSheetData = await Api.getBalanceSheet(config);
    balanceSheetList.value = balanceSheetData;
  } catch (error) {
    errorHandler(swal.fire);
    throw new Error(`[getBalanceSheet] error : ${error.message}`);
  } finally {
    isLoading.value = false;
  }
};

const getTotalAssets = () => {
  for (let i = 0; i < accountList.value.length; i += 1) {
    totalAssets.value += accountList.value[i].currentMoney;
  }
};

const recalculateAccountAmount = async (item) => {
  try {
    const account = accountList.value.find((element) => element.title === item.account);
    if (isNew.value) {
      if (item.category === 'income') {
        account.currentMoney += item.money;
      } else {
        account.currentMoney -= item.money;
      }
    } else {
      const count = item.money - beforePropsData.money;
      account.currentMoney += count;
    }
    await axios.put(`account/${account.id}`, account);
    await getAllAccount();
    totalAssets.value = 0;
    getTotalAssets();
  } catch (error) {
    throw new Error(`[recalculateAccountAmount] error : ${error.message}`);
  }
};

const delDataRecalculateAccountAmount = async (item) => {
  try {
    const account = accountList.value.find((element) => element.title === item.account);
    account.currentMoney -= item.money;
    await axios.put(`account/${account.id}`, account);
    await getAllAccount();
    totalAssets.value = 0;
    getTotalAssets();
  } catch (error) {
    throw new Error(`[delDataRecalculateAccountAmount] error : ${error.message}`);
  }
};

const toggleDate = async (num) => {
  const surface = {
    1: '31',
    2: '28',
    3: '31',
    4: '30',
    5: '31',
    6: '30',
    7: '31',
    8: '31',
    9: '30',
    10: '31',
    11: '30',
    12: '31',
  };
  const beforeDate = { ...date.value };
  beforeDate.month = parseInt(beforeDate.month, 10);
  beforeDate.day = parseInt(beforeDate.day, 10);
  beforeDate.day += num;
  if (beforeDate.day > surface[beforeDate.month]) {
    beforeDate.day = '01';
    beforeDate.month += 1;
    if (beforeDate.month > 12) {
      beforeDate.year += 1;
      beforeDate.month = '01';
      beforeDate.day = '01';
    }
  } else if (beforeDate.day < 1) {
    beforeDate.month -= 1;
    beforeDate.day = surface[beforeDate.month];
    if (beforeDate.month < 1) {
      beforeDate.year -= 1;
      beforeDate.month = '12';
      beforeDate.day = '31';
    }
  }
  if (beforeDate.month < 10 && typeof (beforeDate.month) === 'number') {
    beforeDate.month = `0${beforeDate.month}`;
  } else if (typeof (beforeDate.month) === 'number') {
    beforeDate.month = beforeDate.month.toString();
  }
  if (beforeDate.day < 10 && typeof (beforeDate.day) === 'number') {
    beforeDate.day = `0${beforeDate.day}`;
  } else if (typeof (beforeDate.day) === 'number') {
    beforeDate.day = beforeDate.day.toString();
  }
  date.value = beforeDate;
  await getBalanceSheet();
};

const updateBalanceSheet = async (item) => {
  try {
    isLoading.value = true;
    let httpMethod = 'post';
    let incomeItemUrl = 'balance-sheet';

    if (!isNew.value) {
      httpMethod = 'put';
      incomeItemUrl = `balance-sheet/${item.id}`;
    }
    await axios[httpMethod](incomeItemUrl, item);
    await recalculateAccountAmount(item);
    await getBalanceSheet();
    await getAllAccount();
  } catch (error) {
    errorHandler(swal.fire);
    throw new Error(`[updateBalanceSheet] error : ${error.message}`);
  } finally {
    isLoading.value = false;
    beforePropsData = {};
    propsData.value = {};
    incomeModalRef.value.hideIncomeModal();
    ExpenditureModalRef.value.hideExpenditureModal();
  }
};

const showIncomeModal = (boolean, category, item) => {
  if (boolean) {
    propsData.value = {
      userId,
      category,
      year: date.value.year,
      month: date.value.month,
      day: date.value.day,
    };
  } else {
    propsData.value = { ...item };
    beforePropsData = item;
  }
  isNew.value = boolean;
  incomeModalRef.value.showIncomeModal();
};

const showExpenditureModal = (boolean, category, item) => {
  if (boolean) {
    propsData.value = {
      userId,
      category,
      year: date.value.year,
      month: date.value.month,
      day: date.value.day,
    };
  } else {
    propsData.value = { ...item };
    beforePropsData = item;
  }
  isNew.value = boolean;
  ExpenditureModalRef.value.showExpenditureModal();
};

const showDeleteModal = (item) => {
  propsData.value = { ...item };
  DeleteRef.value.showDeleteModal();
};

const deleteBalanceSheetData = async (item) => {
  try {
    isLoading.value = true;
    await axios.delete(`balance-sheet/${propsData.value.id}`);
    await getBalanceSheet();
    await delDataRecalculateAccountAmount(item);
  } catch (error) {
    errorHandler(swal.fire);
    throw new Error(`[deleteBalanceSheetData] error : ${error.message}`);
  } finally {
    isLoading.value = false;
    DeleteRef.value.hideDeleteModal();
  }
};

const initial = async () => {
  await Promise.all([
    getBalanceSheet(),
    getAllAccount(),
    getAllIncomeItem(),
    getAllExpenditureItem(),
  ]);
};

onMounted(async () => {
  const getIdCookie = document.cookie.replace(/(?:(?:^|.*;\s*)RNWealthId\s*=\s*([^;]*).*$)|^.*$/, '$1');
  userId = parseInt(getIdCookie, 10);
  getTodayDate();
  await initial();
  getTotalAssets();
});

</script>
