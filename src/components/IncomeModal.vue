<template>
    <div class="modal fade" id="staticBackdrop"
    data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" ref="modal">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content background">
      <div class="modal-header justify-content-center border-0">
        <h5 class="modal-title text-success fw-bold h3"
        id="staticBackdropLabel">收入</h5>
      </div>
      <v-form v-slot="{ errors }" @submit="updateIncome">
      <div class="modal-body">
        <v-field type="number"
        class="form-control d-block w-100 mb-2 text-end text-success borderColor fw-bold"
        value="0" name="金額" rules="required" :class="{ 'is-invalid': errors['金額'] }"
        v-model="income.money"></v-field>
        <error-message class="invalid-feedback" name="金額">
        </error-message>
        <v-field type="date"
        class="form-control d-block w-100 mb-2 text-end text-success borderColor fw-bold"
        name="日期" rules="required" :class="{ 'is-invalid': errors['日期'] }"
        v-model="date"></v-field>
        <error-message class="invalid-feedback" name="日期">
        </error-message>
        <div class="d-flex justify-content-between align-items-center mb-2">
          <p class="me-3 fs-5">項目</p>
          <v-field class="form-select w-75 text-success borderColor fw-bold"
          aria-label="Default select example"
          as="select" value="請選擇項目"
          name="項目" rules="required" :class="{ 'is-invalid': errors['項目'] }"
          v-model="income.item">
          <option value="請選擇項目" disabled>請選擇項目</option>
            <option class="fw-bold" v-for="item in incomeItem" :key="item.id"
            :value="item.title">{{ item.title }}</option>
          </v-field>
        </div>
        <error-message class="invalid-feedback" name="項目">
        </error-message>
        <div class="d-flex justify-content-between align-items-center mb-2">
          <p class="me-3 fs-5">帳戶</p>
          <v-field class="form-select w-75 text-success borderColor fw-bold"
          aria-label="Default select example"
          as="select" value="請選擇帳戶"
          name="帳戶" rules="required" :class="{ 'is-invalid': errors['帳戶'] }"
          v-model="income.account">
            <option value="請選擇帳戶" disabled>請選擇帳戶</option>
            <option class="fw-bold" v-for="item in account" :key="item.id"
            :value="item.title">{{ item.title }}</option>
          </v-field>
        </div>
        <error-message class="invalid-feedback" name="帳戶">
          </error-message>
        <div class="d-flex justify-content-between align-items-center">
          <p class="me-3 fs-5">備註</p>
          <textarea class="form-control w-75 text-success borderColor fw-bold"
          id="exampleFormControlTextarea1" rows="3"
          v-model="income.content"></textarea>
        </div>
      </div>
      <div class="modal-footer justify-content-around border-0">
        <button type="button" class="btn btn-outline-dark w-25"
        data-bs-dismiss="modal">取消</button>
        <button type="submit" class="btn btn-outline-success w-25">儲存</button>
      </div>
    </v-form>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
 p {
  margin-bottom: 0;
 }
 input[type=number]::-webkit-outer-spin-button,
  input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number] {
  -moz-appearance: textfield;
}
.background {
  background: #BBFFBB;
  border: 4px solid #00DB00;
}
.borderColor {
  border: 3px solid #00DB00;
}

</style>

<script setup>
import modalMixin from '@/mixins/modalMixin';
import {
  ref, onMounted, watchEffect, inject,
} from 'vue';

const modal = ref({});
const swal = inject('$swal');
const props = defineProps(['income', 'account', 'incomeItem']);
const emit = defineEmits(['updateIncome']);
const income = ref({});
const account = ref([]);
const incomeItem = ref([]);
const date = ref('');

watchEffect(() => {
  income.value = props.income;
  account.value = props.account;
  incomeItem.value = props.incomeItem;
  date.value = `${income.value.year}-${income.value.month}-${income.value.day}`;
});

const currentTime = () => {
  const today = new Date();
  let hour = today.getHours();
  let minute = today.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${hour}:${minute}`;
};

const updateIncome = () => {
  if (!income.value.account) {
    swal.fire(
      {
        icon: 'error',
        title: '失敗',
        text: '帳戶為必填。',
      },
    );
    return;
  }
  if (!income.value.item) {
    swal.fire(
      {
        icon: 'error',
        title: '失敗',
        text: '項目為必填。',
      },
    );
    return;
  }
  income.value.money = parseInt(income.value.money, 10);
  const [y, m, d] = date.value.split('-');
  income.value.year = y;
  income.value.month = m;
  income.value.day = d;
  income.value.time = currentTime();
  income.value.title = `${income.value.time} ${income.value.account} ${income.value.item} ${income.value.money}`;
  emit('updateIncome', income.value);
};

onMounted(() => {
  modalMixin.onMounted('income', modal.value);
});

const showIncomeModal = () => {
  modalMixin.showModal('income');
};

const hideIncomeModal = () => {
  modalMixin.hideModal('income');
};

defineExpose({
  showIncomeModal,
  hideIncomeModal,
});
</script>
