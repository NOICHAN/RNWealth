<template>
    <div class="modal fade" id="staticBackdrop"
    data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" ref="modal">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content background">
      <div class="modal-header justify-content-center border-0">
        <h5 class="modal-title fw-bold text-secondary h3" id="staticBackdropLabel">每月分配設定</h5>
      </div>
      <v-form v-slot="{ errors }" @submit="updateMonthlyAllocation">
      <div class="modal-body">
        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label for="initialAmount" class="form-label">固定收入金額</label>
        <v-field type="number" id="initialAmount" placeholder="請輸入固定收入金額"
        class="form-control d-block w-100 mb-2 text-secondary borderColor"
        name="固定收入金額" rules="required" :class="{ 'is-invalid': errors['固定收入金額'] }"
        v-model="monthlyAllocation.fixedIncome"></v-field>
        <error-message class="invalid-feedback" name="固定收入金額">
        </error-message>

        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label for="monthlyAllocation" class="form-label">自動分配日</label>
        <v-field type="number" id="monthlyAllocation"
        class="form-control d-block w-100 mb-2 text-secondary borderColor" placeholder="請輸入自動分配日"
        name="自動分配日" rules="required" :class="{ 'is-invalid': errors['自動分配日'] }"
        v-model="monthlyAllocation.date"></v-field>
        <error-message class="invalid-feedback" name="自動分配日">
        </error-message>
        <label class="form-check-label" for="is_enabled">
            <input class="form-check-input" type="checkbox"
              :true-value="1" :false-value="0"
              id="is_enabled" v-model="monthlyAllocation.isEnable">
                是否啟用
        </label>
      </div>
      <div class="modal-footer justify-content-around border-0">
        <button type="button" class="btn btn-outline-dark w-25"
        data-bs-dismiss="modal">取消</button>
        <button type="submit" class="btn btn-outline-secondary w-25">儲存</button>
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
  background: #FFF8D7;
  border: 4px solid #F5DFBB;
}
.borderColor {
  border: 3px solid #F5DFBB;
}
.form-check-input:checked {
  background-color: #F2542D;
  border-color: #F2542D;
}
</style>

<script setup>
import modalMixin from '@/mixins/modalMixin';
import {
  ref, onMounted, watchEffect, inject,
} from 'vue';

const swal = inject('$swal');
const modal = ref({});
const props = defineProps(['monthlyAllocation']);
const emit = defineEmits(['updateMonthlyAllocation']);
const monthlyAllocation = ref({});

watchEffect(() => {
  monthlyAllocation.value = props.monthlyAllocation;
});

const updateMonthlyAllocation = () => {
  if (monthlyAllocation.value.date < 1 || monthlyAllocation.value.date > 28) {
    swal.fire(
      {
        icon: 'error',
        title: '失敗',
        text: '日期請選擇1日至28日',
      },
    );
    return;
  }
  if (monthlyAllocation.value.isEnable && monthlyAllocation.value.fixedIncome < 1) {
    swal.fire(
      {
        icon: 'error',
        title: '失敗',
        text: `啟用每月分配功能時，固定收入金額不得為 ${monthlyAllocation.value.fixedIncome}。`,
      },
    );
    return;
  }
  if (monthlyAllocation.value.date < 10) {
    monthlyAllocation.value.date = `0${monthlyAllocation.value.date}`;
  }
  monthlyAllocation.value.fixedIncome = parseInt(monthlyAllocation.value.fixedIncome, 10);
  emit('updateMonthlyAllocation', monthlyAllocation.value);
};

onMounted(() => {
  modalMixin.onMounted('MonthlyAllocation', modal.value);
});

const showMonthlyAllocationModal = () => {
  modalMixin.showModal('MonthlyAllocation');
};

const hideMonthlyAllocationModal = () => {
  modalMixin.hideModal('MonthlyAllocation');
};

defineExpose({
  showMonthlyAllocationModal,
  hideMonthlyAllocationModal,
});
</script>
