import { createApp } from 'vue';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@/assets/main.scss';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import {
  Form, Field, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import { required, email, confirmed } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import { currency } from '@/methods/filters';
import App from './App.vue';
import router from './router';

library.add(fas, fab, far);
defineRule('required', required);
defineRule('email', email);
defineRule('confirmed', confirmed);
configure({
  generateMessage: localize({ zhTW }),
  validateOnInput: true,
});
setLocale('zhTW');

const app = createApp(App);

app.config.globalProperties.$filters = {
  currency,
};

axios.defaults.baseURL = process.env.VUE_APP_API;
axios.defaults.headers.common.Authorization = `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)RNWealthToken\s*=\s*([^;]*).*$)|^.*$/, '$1')}`;

app.use(router);
app.use(VueAxios, axios);
app.use(VueSweetalert2);
app.provide('axios', app.config.globalProperties.axios);

app.component('VLoading', Loading);
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('VForm', Form);
app.component('VField', Field);
app.component('ErrorMessage', ErrorMessage);

app.mount('#app');
