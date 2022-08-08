import Modal from 'bootstrap/js/dist/modal';

const bsModals = {};

export default {
  showModal(key) {
    bsModals[key].show();
  },
  hideModal(key) {
    bsModals[key].hide();
  },
  onMounted(key, modal) {
    bsModals[key] = new Modal(modal);
  },
};
