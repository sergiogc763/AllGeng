<template>
  <div class="content" v-if="store.getters.logged">
    <div class="container">
      <div class="menu">
        <ul class="nav">
          <li class="nav-item">
            <button
              type="button"
              class="btn btn-primary btn-lg"
              data-bs-toggle="button"
              autocomplete="off"
              @click="changeOption(1)"
            >
              Datos Personales
            </button>
          </li>
          <li class="nav-item">
            <button
              type="button"
              class="btn btn-primary btn-lg"
              data-bs-toggle="button"
              autocomplete="off"
              @click="changeOption(2)"
            >
              Seguridad
            </button>
          </li>
          <li class="nav-item">
            <button
              type="button"
              class="btn btn-danger btn-lg"
              data-bs-toggle="button"
              autocomplete="off"
              @click="logout()"
            >
              Desconectar
            </button>
          </li>
        </ul>
      </div>
      <div class="options">
        <InfoUser v-if="option === 1" />
        <SegurityUser v-if="option === 2" />
      </div>
    </div>
  </div>
  <Page404 v-else />
</template>

<script lang="ts" setup>
import { ref } from "vue";

import InfoUser from "@/components/useroptions/InfoUser.vue";
import SegurityUser from "@/components/useroptions/SegurityUser.vue";
import { useStore } from "vuex";
import router from "../router/index";
import Swal from "sweetalert2";
import Page404 from "@/components/Page404.vue";

//#region CONST

const store = useStore();
const option = ref<number>(0);

//#endregion

//#region FUNCTIONS
function changeOption(selected: number) {
  option.value = selected;
}

function logout() {
  store.dispatch("logout");
  router.push({ name: "HomeView" });
  Swal.fire({
    icon: "success",
    title: "Se ha desconectado correctamente",
    showConfirmButton: false,
    timer: 2000,
  });
}

//#endregion
</script>

<style lang="scss" scoped>
.content {
  background-color: rgba(255, 255, 255, 0.964);

  .container {
    display: flex;
    justify-content: center;
    .menu {
      margin-top: 5px;
      .nav {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: rgb(214, 214, 214);
        padding: 15px;

        li {
          margin: 4px;
        }
      }
      border-radius: 5px;

      button {
        width: max-content;
      }
    }
  }
}
</style>
