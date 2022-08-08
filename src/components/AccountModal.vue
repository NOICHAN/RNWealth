<template>
    <div class="modal fade" id="staticBackdrop"
    data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" ref="modal">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content bg-info">
      <div class="modal-header justify-content-center border-0">
        <h5 class="modal-title" id="staticBackdropLabel">帳戶</h5>
      </div>
      <v-form v-slot="{ errors }" @submit="updateAccount">
      <div class="modal-body">
        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label for="accountName" class="form-label">帳戶名稱</label>
        <v-field type="text" id="accountName" placeholder="請輸入帳戶名稱"
        class="form-control d-block w-100 mb-2 text-primary"
        name="帳戶名稱" rules="required" :class="{ 'is-invalid': errors['帳戶名稱'] }"
        v-model="account.title"></v-field>
        <error-message class="invalid-feedback" name="帳戶名稱">
        </error-message>

        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label for="initialAmount" class="form-label">初始金額</label>
        <v-field type="number" id="initialAmount" placeholder="請輸入初始金額"
        class="form-control d-block w-100 mb-2 text-primary"
        name="初始金額" rules="required" :class="{ 'is-invalid': errors['初始金額'] }"
        v-model="account.initialMoney"></v-field>
        <error-message class="invalid-feedback" name="初始金額">
        </error-message>

        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label for="monthlyAllocation" class="form-label">每月分配金額</label>
        <v-field type="number" id="monthlyAllocation"
        class="form-control d-block w-100 mb-2" placeholder="請輸入每月分配金額"
        name="每月分配金額" rules="required" :class="{ 'is-invalid': errors['每月分配金額'] }"
        v-model="account.monthlyAllocation"></v-field>
        <error-message class="invalid-feedback" name="每月分配金額">
        </error-message>
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
import { ref, onMounted, watchEffect } from 'vue';

const modal = ref({});
const props = defineProps(['account']);
const emit = defineEmits(['updateAccount']);
const account = ref({});

watchEffect(() => {
  account.value = props.account;
});

const updateAccount = () => {
  account.value.monthlyAllocation = parseInt(account.value.monthlyAllocation, 10);
  account.value.initialMoney = parseInt(account.value.initialMoney, 10);
  account.value.currentMoney = account.value.initialMoney;
  emit('updateAccount', account.value);
};

onMounted(() => {
  modalMixin.onMounted('account', modal.value);
});

const showAccountModal = () => {
  modalMixin.showModal('account');
};

const hideAccountModal = () => {
  modalMixin.hideModal('account');
};

defineExpose({
  showAccountModal,
  hideAccountModal,
});
</script>
