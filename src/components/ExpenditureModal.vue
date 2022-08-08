<template>
    <div class="modal fade" id="staticBackdrop"
    data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" ref="modal">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content bg-danger">
      <div class="modal-header justify-content-center border-0">
        <h5 class="modal-title" id="staticBackdropLabel">支出</h5>
      </div>
      <v-form v-slot="{ errors }" @submit="updateExpenditure">
      <div class="modal-body">
        <v-field type="number" class="form-control d-block w-100 mb-2 text-end text-primary"
        value="0" name="金額" rules="required" :class="{ 'is-invalid': errors['金額'] }"
        v-model="expenditure.money"></v-field>
        <error-message class="invalid-feedback" name="金額">
        </error-message>
        <v-field type="date" class="form-control d-block w-100 mb-2 text-end"
        name="日期" rules="required" :class="{ 'is-invalid': errors['日期'] }"
        v-model="date"></v-field>
        <error-message class="invalid-feedback" name="日期">
        </error-message>
        <div class="d-flex justify-content-between align-items-center mb-2">
          <p class="me-3 fs-5">項目</p>
          <v-field class="form-select w-75" aria-label="Default select example"
          as="select" value="請選擇項目"
          name="項目" rules="required" :class="{ 'is-invalid': errors['項目'] }"
          v-model="expenditure.item">
          <option value="請選擇項目" disabled>請選擇項目</option>
           <option v-for="item in expenditureItem" :key="item.id"
            :value="item.title">{{ item.title }}</option>
          </v-field>
        </div>
        <error-message class="invalid-feedback" name="項目">
        </error-message>
        <div class="d-flex justify-content-between align-items-center mb-2">
          <p class="me-3 fs-5">帳戶</p>
          <v-field class="form-select w-75" aria-label="Default select example"
          as="select" value="請選擇帳戶"
          name="帳戶" rules="required" :class="{ 'is-invalid': errors['帳戶'] }"
          v-model="expenditure.account">
          <option value="請選擇帳戶" disabled>請選擇帳戶</option>
          <option v-for="item in account" :key="item.id"
            :value="item.title">{{ item.title }}</option>
          </v-field>
        </div>
        <error-message class="invalid-feedback" name="帳戶">
          </error-message>
        <div class="d-flex justify-content-between align-items-center">
          <p class="me-3 fs-5">備註</p>
          <textarea class="form-control w-75" id="exampleFormControlTextarea1" rows="3"
          v-model="expenditure.content"></textarea>
        </div>
      </div>
      <div class="modal-footer justify-content-around border-0">
        <button type="button" class="btn btn-outline-secondary w-25"
        data-bs-dismiss="modal">取消</button>
        <button type="submit" class="btn btn-primary w-25">儲存</button>
      </div>
    </v-form>
    </div>
  </div>
</div>
</template>

<style lang="scss">
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
</style>

<script setup>
import modalMixin from '@/mixins/modalMixin';
import {
  ref, onMounted, watchEffect, inject,
} from 'vue';

const modal = ref({});
const swal = inject('$swal');
const props = defineProps(['expenditure', 'account', 'expenditureItem']);
const emit = defineEmits(['updateExpenditure']);
const expenditure = ref({});
const account = ref([]);
const expenditureItem = ref([]);
const date = ref('');

watchEffect(() => {
  expenditure.value = props.expenditure;
  account.value = props.account;
  expenditureItem.value = props.expenditureItem;
  date.value = `${expenditure.value.year}-${expenditure.value.month}-${expenditure.value.day}`;
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

const updateExpenditure = () => {
  if (!expenditure.value.account) {
    swal.fire(
      {
        icon: 'error',
        title: '失敗',
        text: '帳戶為必填。',
      },
    );
    return;
  }
  if (!expenditure.value.item) {
    swal.fire(
      {
        icon: 'error',
        title: '失敗',
        text: '項目為必填。',
      },
    );
    return;
  }
  expenditure.value.money = parseInt(expenditure.value.money, 10);
  const [y, m, d] = date.value.split('-');
  expenditure.value.year = y;
  expenditure.value.month = m;
  expenditure.value.day = d;
  expenditure.value.time = currentTime();
  expenditure.value.title = `${expenditure.value.time} ${expenditure.value.account} ${expenditure.value.item} ${expenditure.value.money}`;
  emit('updateExpenditure', expenditure.value);
};

onMounted(() => {
  modalMixin.onMounted('expenditure', modal.value);
});

const showExpenditureModal = () => {
  modalMixin.showModal('expenditure');
};

const hideExpenditureModal = () => {
  modalMixin.hideModal('expenditure');
};

defineExpose({
  showExpenditureModal,
  hideExpenditureModal,
});
</script>
