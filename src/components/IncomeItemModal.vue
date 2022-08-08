<template>
    <div class="modal fade" id="staticBackdrop"
    data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" ref="modal">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content bg-info">
      <div class="modal-header justify-content-center border-0">
        <h5 class="modal-title" id="staticBackdropLabel">收入項目</h5>
      </div>
      <v-form v-slot="{ errors }" @submit="updateIncomeItem">
      <div class="modal-body">
        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label for="initialAmount" class="form-label">收入項目</label>
        <v-field type="text" id="initialAmount" placeholder="請輸入收入項目"
        class="form-control d-block w-100 mb-2 text-primary"
        name="項目" rules="required" :class="{ 'is-invalid': errors['項目'] }"
        v-model="incomeItem.title"></v-field>
        <error-message class="invalid-feedback" name="項目">
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
</style>

<script setup>
import modalMixin from '@/mixins/modalMixin';
import { ref, onMounted, watchEffect } from 'vue';

const modal = ref({});
const props = defineProps(['incomeItem']);
const emit = defineEmits(['updateIncomeItem']);
const incomeItem = ref({});

watchEffect(() => {
  incomeItem.value = props.incomeItem;
});

const updateIncomeItem = () => {
  emit('updateIncomeItem', incomeItem.value);
};

onMounted(() => {
  modalMixin.onMounted('IncomeItem', modal.value);
});

const showIncomeItemModal = () => {
  modalMixin.showModal('IncomeItem');
};

const hideIncomeItemModal = () => {
  modalMixin.hideModal('IncomeItem');
};

defineExpose({
  showIncomeItemModal,
  hideIncomeItemModal,
});
</script>
