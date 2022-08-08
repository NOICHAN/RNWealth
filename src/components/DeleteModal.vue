<template>
    <div class="modal fade" id="staticBackdrop"
    data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" ref="modal">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content bg-info">
      <div class="modal-header justify-content-center border-0">
        <h5 class="modal-title" id="staticBackdropLabel">刪除</h5>
      </div>
      <div class="modal-body">
        確認刪除{{ deleteDataItem.title }}，刪除後無法復原。
      </div>
      <div class="modal-footer justify-content-around border-0">
        <button type="button" class="btn btn-outline-secondary w-25"
        data-bs-dismiss="modal">取消</button>
        <button type="submit" class="btn btn-primary w-25" @click="deleteData">刪除</button>
      </div>
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
const props = defineProps(['deleteDataItem']);
const emit = defineEmits(['deleteData']);
const propsData = ref({});

watchEffect(() => {
  propsData.value = props.deleteDataItem;
});

const deleteData = () => {
  emit('deleteData', propsData.value);
};

onMounted(() => {
  modalMixin.onMounted('Delete', modal.value);
});

const showDeleteModal = () => {
  modalMixin.showModal('Delete');
};

const hideDeleteModal = () => {
  modalMixin.hideModal('Delete');
};

defineExpose({
  showDeleteModal,
  hideDeleteModal,
});
</script>
