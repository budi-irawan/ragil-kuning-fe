import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueSweetalert2 from 'vue-sweetalert2'
import AppNavBar from './components/partials/AppNavBar'
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

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHandHoldingDroplet, faHandHoldingDollar, faFaucetDrip, faLayerGroup, faMapLocationDot, faUserGear, faCircleUser, faMap, faRightToBracket, faCalendarPlus, faPaperPlane, faMoneyCheckDollar, faPrint, faNewspaper, faBook, faFileExcel, faDownload } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark, faTrashCan } from '@fortawesome/free-regular-svg-icons';

library.add(faHandHoldingDroplet, faHandHoldingDollar, faFaucetDrip, faCircleXmark, faTrashCan, faLayerGroup, faMapLocationDot, faUserGear, faCircleUser, faMap, faRightToBracket, faCalendarPlus, faPaperPlane, faMoneyCheckDollar, faPrint, faNewspaper, faBook, faFileExcel, faDownload );
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('AppNavBar', AppNavBar)
Vue.component('AppSideBar', AppSideBar)
Vue.component('AppFooter', AppFooter)
Vue.component('ControlSideBar', ControlSideBar)
Vue.use(VueSweetalert2)

var eventBus = new Vue();
Vue.prototype.$eventBus = eventBus

Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
