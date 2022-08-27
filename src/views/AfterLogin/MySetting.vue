<template>
<VLoading :active="isLoading"></VLoading>
<AccountModal ref="AccountModalRef" :account="propsData"
@updateAccount="updateAccount"></AccountModal>
<MonthlyAllocationModal ref="MonthlyAllocationRef"
:monthlyAllocation="propsData"
@updateMonthlyAllocation="updateMonthlyAllocation"></MonthlyAllocationModal>
<IncomeItemModal ref="IncomeItemRef" :incomeItem="propsData"
@updateIncomeItem="updateIncomeItem"></IncomeItemModal>
<ExpenditureItemModal ref="ExpenditureItemRef" :expenditureItem="propsData"
@updateExpenditureItem="updateExpenditureItem"></ExpenditureItemModal>
<DeleteModal ref="DeleteRef" :deleteDataItem="propsData"
@deleteData="deleteData"></DeleteModal>
<div class="bg-primary bg-opacity-25">
  <div class="container py-5">
        <h2 class="mb-5">
          <font-awesome-icon icon="fa-solid fa-file-invoice-dollar" />
          管理帳戶</h2>
        <div class="mb-5">
            <button type="button" class="btn btn-primary me-5"
            @click="showMonthlyAllocationModal">每月分配設定</button>
            <button type="button" class="btn btn-primary"
            @click="showAccountModal(true)">新增帳戶</button>
        </div>
        <strong v-if="!monthlyAllocation.isEnable" class="fs-5 text-danger">尚未啟用每月自動匯入收入功能</strong>
        <strong v-else class="fs-3">每月<span class="text-secondary">
          {{ monthlyAllocation.date }}</span>
        日自動匯入
          <span class="text-secondary">
            ${{ $filters.currency(monthlyAllocation.fixedIncome) }}</span>
        </strong>
        <div class="row py-5 border-bottom border-dark gy-3">
            <div class="col-12 col-md-6 col-xl-4"
            v-for="item in accountList" :key="item.id">
                <div class="card d-flex me-auto ms-auto mb-3 shadowCard"
                style="width: 18rem;">
                <img src="" class="card-img-top" alt="">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <h3>{{ item.title }}</h3>
                        <p>${{ $filters.currency(item.currentMoney) }}</p>
                    </div>
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <p class="card-text">初始金額 :</p>
                        <p class="card-text">${{ $filters.currency(item.initialMoney) }}</p>
                    </div>
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <p class="card-text">每月分配 :</p>
                        <p class="card-text">${{ $filters.currency(item.monthlyAllocation) }}</p>
                    </div>
                    <div class="d-flex justify-content-between">
                      <button type="button" class="border-0 bg-transparent px-2"
                      @click="showAccountModal(false, item)">
                            <font-awesome-icon icon="fa-solid fa-pen-to-square"
                                    class="fs-3 iconColor" />
                        </button>
                        <button type="button" class="border-0 bg-transparent px-2"
                        @click="showDeleteModal(item, 'account')">
                            <font-awesome-icon icon="fa-solid fa-trash-can"
                                    class="text-danger fs-3" />
                        </button>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <h2 class="my-5">
          <font-awesome-icon icon="fa-solid fa-list-check" />
          管理收支項目</h2>
        <div class="row justify-content-around gy-3">
            <div class="col-10 col-md-4 d-flex flex-column">
                <button type="button" class="btn btn-success mb-3"
                @click="showIncomeItemModal(true)">新增收入項目
                </button>
                <ul class="project py-3">
                    <li class="d-flex justify-content-around mb-2"
                    v-for="item in incomeItemList" :key="item.id">
                        <p class="fs-3">{{ item.title }}</p>
                        <button type="button" class="border-0 bg-transparent px-2"
                        @click="showIncomeItemModal(false, item)">
                            <font-awesome-icon icon="fa-solid fa-pen-to-square"
                                    class="fs-3 text-success" />
                        </button>
                        <button type="button" class="border-0 bg-transparent px-2"
                        @click="showDeleteModal(item, 'incomeItem')">
                            <font-awesome-icon icon="fa-solid fa-trash-can"
                                    class="text-danger fs-3" />
                        </button>
                    </li>
                </ul>
            </div>
            <div class="col-10 col-md-4 d-flex flex-column">
                <button type="button" class="btn btn-info mb-3"
                @click="showExpenditureItemModal(true)">新增支出項目
                </button>
                <ul class="project py-3">
                    <li class="d-flex justify-content-around mb-2"
                    v-for="item in expenditureItemList" :key="item.id">
                        <p class="fs-3">{{ item.title }}</p>
                        <button type="button" class="border-0 bg-transparent px-2"
                        @click="showExpenditureItemModal(false, item)">
                            <font-awesome-icon icon="fa-solid fa-pen-to-square"
                                    class="fs-3 text-info" />
                        </button>
                        <button type="button" class="border-0 bg-transparent px-2"
                        @click="showDeleteModal(item, 'expenditure')">
                            <font-awesome-icon icon="fa-solid fa-trash-can"
                                    class="text-danger fs-3" />
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
    h3,p {
        margin-bottom: 0;
    }
    .project {
        padding-left: 0;
        box-shadow: 0px 3px 6px #00000029;
        border-radius: 0.25rem;
    }
    .iconColor {
      color: #66B3FF;
    }
    .shadowCard {
      box-shadow: 0px 3px 6px #00000029;
      border: none;
    }
    .card:hover {
      background: #fcf7ee;
    }
</style>

<script setup>
import AccountModal from '@/components/AccountModal.vue';
import MonthlyAllocationModal from '@/components/MonthlyAllocationModal.vue';
import IncomeItemModal from '@/components/IncomeItemModal.vue';
import ExpenditureItemModal from '@/components/ExpenditureItemModal.vue';
import DeleteModal from '@/components/DeleteModal.vue';
import errorHandler from '@/utils/errorHandler';
import { Api } from '@/api/index';
import { ref, onMounted, inject } from 'vue';

const AccountModalRef = ref({});
const MonthlyAllocationRef = ref({});
const IncomeItemRef = ref({});
const ExpenditureItemRef = ref({});
const DeleteRef = ref({});

const axios = inject('axios');
const swal = inject('$swal');
const isLoading = ref(false);
const isNew = ref(true);
const propsData = ref({});
let typeCurrentlyDeleted = null;
let userId = null;

const monthlyAllocation = ref({});
const accountList = ref([]);
const incomeItemList = ref([]);
const expenditureItemList = ref([]);

const getMonthlyAllocation = async () => {
  try {
    isLoading.value = true;
    const config = {
      params: {
        userId,
      },
    };
    const { data } = await axios.get('monthly-allocation', config);
    [monthlyAllocation.value] = data;
  } catch (error) {
    errorHandler(swal.fire);
    throw new Error(`[getMonthlyAllocation] error : ${error.message}`);
  } finally {
    isLoading.value = false;
  }
};

const showMonthlyAllocationModal = () => {
  propsData.value = { ...monthlyAllocation.value };
  MonthlyAllocationRef.value.showMonthlyAllocationModal();
};

const updateMonthlyAllocation = async (item) => {
  try {
    isLoading.value = true;
    await axios.put(`monthly-allocation/${item.id}`, item);
    await getMonthlyAllocation();
  } catch (error) {
    throw new Error(`[updateMonthlyAllocation] error : ${error.message}`);
  } finally {
    isLoading.value = false;
    MonthlyAllocationRef.value.hideMonthlyAllocationModal();
  }
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

const showAccountModal = (boolean, item) => {
  if (boolean) {
    propsData.value = {
      userId,
    };
  } else {
    propsData.value = { ...item };
  }
  isNew.value = boolean;
  AccountModalRef.value.showAccountModal();
};

const updateAccount = async (item) => {
  try {
    isLoading.value = true;
    let httpMethod = 'post';
    let incomeItemUrl = 'account';

    if (!isNew.value) {
      httpMethod = 'put';
      incomeItemUrl = `account/${item.id}`;
    }
    await axios[httpMethod](incomeItemUrl, item);
    await getAllAccount();
  } catch (error) {
    errorHandler(swal.fire);
    throw new Error(`[updateAccount] error : ${error.message}`);
  } finally {
    isLoading.value = false;
    AccountModalRef.value.hideAccountModal();
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

const showIncomeItemModal = (boolean, item) => {
  if (boolean) {
    propsData.value = {
      userId,
    };
  } else {
    propsData.value = { ...item };
  }
  isNew.value = boolean;
  IncomeItemRef.value.showIncomeItemModal();
};

const updateIncomeItem = async (item) => {
  try {
    isLoading.value = true;
    let httpMethod = 'post';
    let incomeItemUrl = 'income-item';

    if (!isNew.value) {
      httpMethod = 'put';
      incomeItemUrl = `income-item/${item.id}`;
    }

    await axios[httpMethod](incomeItemUrl, item);
    await getAllIncomeItem();
  } catch (error) {
    errorHandler(swal.fire);
    throw new Error(`[updateIncomeItem] error : ${error.message}`);
  } finally {
    isLoading.value = false;
    IncomeItemRef.value.hideIncomeItemModal();
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

const showExpenditureItemModal = (boolean, item) => {
  if (boolean) {
    propsData.value = {
      userId,
    };
  } else {
    propsData.value = { ...item };
  }
  isNew.value = boolean;
  ExpenditureItemRef.value.showExpenditureItemModal();
};

const updateExpenditureItem = async (item) => {
  try {
    isLoading.value = true;
    let httpMethod = 'post';
    let expenditureItemUrl = 'expenditure-item';

    if (!isNew.value) {
      httpMethod = 'put';
      expenditureItemUrl = `expenditure-item/${item.id}`;
    }

    await axios[httpMethod](expenditureItemUrl, item);
    await getAllExpenditureItem();
  } catch (error) {
    errorHandler(swal.fire);
    throw new Error(`[updateExpenditureItem] error : ${error.message}`);
  } finally {
    isLoading.value = false;
    ExpenditureItemRef.value.hideExpenditureItemModal();
  }
};

const showDeleteModal = (item, type) => {
  propsData.value = { ...item };
  typeCurrentlyDeleted = type;
  DeleteRef.value.showDeleteModal();
};

const deleteData = async () => {
  try {
    isLoading.value = true;
    if (typeCurrentlyDeleted === 'incomeItem') {
      await axios.delete(`income-item/${propsData.value.id}`);
      await getAllIncomeItem();
    } else if (typeCurrentlyDeleted === 'expenditure') {
      await axios.delete(`expenditure-item/${propsData.value.id}`);
      await getAllExpenditureItem();
    } else {
      await axios.delete(`account/${propsData.value.id}`);
      await getAllAccount();
    }
  } catch (error) {
    errorHandler(swal.fire);
    throw new Error(`[delIncomeItem] error : ${error.message}`);
  } finally {
    isLoading.value = false;
    DeleteRef.value.hideDeleteModal();
  }
};

const initial = async () => {
  await Promise.all([
    getMonthlyAllocation(),
    getAllAccount(),
    getAllIncomeItem(),
    getAllExpenditureItem(),
  ]);
};

onMounted(async () => {
  const getIdCookie = document.cookie.replace(/(?:(?:^|.*;\s*)RNWealthId\s*=\s*([^;]*).*$)|^.*$/, '$1');
  userId = parseInt(getIdCookie, 10);
  await initial();
});
</script>
