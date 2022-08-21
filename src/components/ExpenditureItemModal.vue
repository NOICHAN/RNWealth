<template>
    <div class="modal fade" id="staticBackdrop"
    data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" ref="modal">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content background">
      <div class="modal-header justify-content-center border-0">
        <h5 class="modal-title fw-bold text-info h3" id="staticBackdropLabel">支出項目</h5>
      </div>
      <v-form v-slot="{ errors }" @submit="updateExpenditureItem">
      <div class="modal-body">
        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label for="initialAmount" class="form-label">支出項目</label>
        <v-field type="text" id="initialAmount" placeholder="請輸入支出項目"
        class="form-control d-block w-100 mb-2 text-info borderColor"
        name="項目" rules="required" :class="{ 'is-invalid': errors['項目'] }"
        v-model="expenditureItem.title"></v-field>
        <error-message class="invalid-feedback" name="項目">
        </error-message>
      </div>
      <div class="modal-footer justify-content-around border-0">
        <button type="button" class="btn btn-outline-dark w-25"
        data-bs-dismiss="modal">取消</button>
        <button type="submit" class="btn btn-outline-info w-25">儲存</button>
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
 .background {
  background: #FFD0FF;
  border: 4px solid #FF77FF;
}
.borderColor {
  border: 3px solid #FF77FF;
}
</style>

<script setup>
import modalMixin from '@/mixins/modalMixin';
import { ref, onMounted, watchEffect } from 'vue';

const modal = ref({});
const props = defineProps(['expenditureItem']);
const emit = defineEmits(['updateExpenditureItem']);
const expenditureItem = ref({});

watchEffect(() => {
  expenditureItem.value = props.expenditureItem;
});

const updateExpenditureItem = () => {
  emit('updateExpenditureItem', expenditureItem.value);
};

onMounted(() => {
  modalMixin.onMounted('ExpenditureItem', modal.value);
});

const showExpenditureItemModal = () => {
  modalMixin.showModal('ExpenditureItem');
};

const hideExpenditureItemModal = () => {
  modalMixin.hideModal('ExpenditureItem');
};

defineExpose({
  showExpenditureItemModal,
  hideExpenditureItemModal,
});
</script>
