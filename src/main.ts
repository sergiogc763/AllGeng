import "bootstrap/dist/css/bootstrap.min.css";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";

createApp(App).use(router, VueSweetalert2).mount("#app");
import "bootstrap/dist/js/bootstrap.js"