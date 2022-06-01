
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";
import store from "./store";

library.add(fas,far,fab)

import JwPagination from 'jw-vue-pagination';

createApp(App).use(router).use(VueSweetalert2).use(store).component('font-awesome-icon', FontAwesomeIcon).component('jw-pagination', JwPagination).mount("#app");
import "bootstrap/dist/js/bootstrap.js"
import "bootstrap/dist/css/bootstrap.css";

