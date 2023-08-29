import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueSweetalert2 from 'vue-sweetalert2'
import iziToast from 'izitoast'
import VueIziToast from 'vue-izitoast';
import moment from 'moment'
import Vuelidate from 'vuelidate'
import datePicker from 'vue-bootstrap-datetimepicker';
import jQuery from 'jquery';
import AppNavBar from './components/partials/AppNavBar'
import AppTopBar from './components/partials/AppTopBar'
import AppSideBar from './components/partials/AppSideBar'
import AppFooter from './components/partials/AppFooter'
import ControlSideBar from './components/partials/ControlSideBar'

import 'admin-lte/plugins/fontawesome-free/css/all.min.css'
import 'admin-lte/plugins/icheck-bootstrap/icheck-bootstrap.min.css'
import 'admin-lte/dist/css/adminlte.min.css?v=3.2.0'
import 'admin-lte/plugins/jquery/jquery.min.js'
import 'admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js'
import 'admin-lte/dist/js/adminlte.min.js?v=3.2.0'
import './style.scss'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'izitoast/dist/css/iziToast.css';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHandHoldingDroplet, faHandHoldingDollar, faFaucetDrip, faLayerGroup, faMapLocationDot, faUserGear, faCircleUser, faMap, faRightToBracket, faCalendarPlus, faPaperPlane, faMoneyCheckDollar, faPrint, faNewspaper, faBook, faFileExcel, faDownload, faFileLines, faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark, faTrashCan } from '@fortawesome/free-regular-svg-icons';

library.add(faHandHoldingDroplet, faHandHoldingDollar, faFaucetDrip, faCircleXmark, faTrashCan, faLayerGroup, faMapLocationDot, faUserGear, faCircleUser, faMap, faRightToBracket, faCalendarPlus, faPaperPlane, faMoneyCheckDollar, faPrint, faNewspaper, faBook, faFileExcel, faDownload, faFileLines, faFileInvoice );
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('AppNavBar', AppNavBar)
Vue.component('AppTopBar', AppTopBar)
Vue.component('AppSideBar', AppSideBar)
Vue.component('AppFooter', AppFooter)
Vue.component('ControlSideBar', ControlSideBar)
Vue.use(VueSweetalert2)
Vue.use(Vuelidate)
Vue.use(VueIziToast);
Vue.use(datePicker);

var eventBus = new Vue();
Vue.prototype.$eventBus = eventBus

Vue.prototype.$axios = axios

Vue.config.productionTip = false

Vue.prototype.$axios = axios
Vue.prototype.$VueIziToast = iziToast
Vue.prototype.moment = moment
moment.locale('id');
window.$ = window.jQuery = require('jquery');
jQuery.extend(true, jQuery.fn.datetimepicker.defaults, {
  icons: {
    time: 'far fa-clock',
    date: 'far fa-calendar',
    up: 'fas fa-arrow-up',
    down: 'fas fa-arrow-down',
    previous: 'fas fa-chevron-left',
    next: 'fas fa-chevron-right',
    clear: faTrashCan,
    close: faCircleXmark
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
