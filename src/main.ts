
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import md5 from 'crypto-js/md5';

import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";
import store from "./store";
import i18n from './locales/i18n';

library.add(fas,far,fab)

if (localStorage) {

    if (
      localStorage.getItem("userSession") !== undefined &&
      localStorage.getItem("userSession")
    ) {
      store.dispatch("getUserRemember", localStorage.getItem("userSession"));

    }
  }


createApp(App).use(router).use(VueSweetalert2).use(store).use(md5).use(i18n).component('font-awesome-icon', FontAwesomeIcon).mount("#app");
import "bootstrap/dist/js/bootstrap.js"
import "bootstrap/dist/css/bootstrap.css";


